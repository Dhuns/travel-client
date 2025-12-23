"use client";

import { EstimateDetail, QuotationResponse } from "@/src/shared/apis/estimate";
import React, { useEffect, useState, useMemo } from "react";

import DayMap from "@/src/components/Chat/DayMap";
import { getItemImg } from "@/src/shared/utils/base";
import { draftToHtml } from "@/src/shared/utils/draftjs";
import { sanitizeHtml } from "@/src/shared/utils/sanitize";
import styled from "@emotion/styled";
import dayjs from "dayjs";

// Korean to English type mapping
const typeMapping: Record<string, string> = {
  여행지: "Place",
  이동수단: "Transportation",
  컨텐츠: "Activity",
  숙박: "Accommodation",
};

interface DraftQuotationProps {
  quotation: QuotationResponse;
}

// Map data types
interface MapLocation {
  itemId: number;
  name: string;
  lat: number;
  lng: number;
  description?: string;
  price?: number;
  type?: string;
}

interface MapDayData {
  day: number;
  locations: MapLocation[];
  center: { lat: number; lng: number };
}

interface MapDataResponse {
  mapData?: MapDayData[];
}

// New JSON timeline types (친구가 짜준 것 같은 일정)
interface TimelinePlace {
  itemId: number;
  nameKor: string;
  nameEng: string;
  description: string;
  lat?: number;
  lng?: number;
}

interface TimelineDay {
  day: number;
  date?: string;
  theme: string;
  places: TimelinePlace[];
}

interface TimelineData {
  days: TimelineDay[];
}

const DraftQuotation: React.FC<DraftQuotationProps> = ({ quotation }) => {
  const { batchInfo, estimateInfo, estimateDetails } = quotation;
  const [mapData, setMapData] = useState<MapDataResponse | null>(null);
  const [loadingMap, setLoadingMap] = useState(false);

  // Parse timeline - supports both new JSON format and legacy #@# format
  const { jsonTimeline, legacyTimeline, isJsonFormat } = useMemo(() => {
    if (!estimateInfo.timeline) {
      return { jsonTimeline: null, legacyTimeline: {}, isJsonFormat: false };
    }

    let timelineStr = estimateInfo.timeline;

    // If already an object (from API), convert to string first
    if (typeof timelineStr === "object") {
      // Check if it's already the new JSON format
      if ("days" in (timelineStr as object)) {
        return {
          jsonTimeline: timelineStr as unknown as TimelineData,
          legacyTimeline: {},
          isJsonFormat: true,
        };
      }
      // Legacy object format
      return {
        jsonTimeline: null,
        legacyTimeline: timelineStr as Record<string, string>,
        isJsonFormat: false,
      };
    }

    // Try parsing as JSON first
    if (typeof timelineStr === "string") {
      try {
        const parsed = JSON.parse(timelineStr);
        if (parsed && parsed.days && Array.isArray(parsed.days)) {
          return {
            jsonTimeline: parsed as TimelineData,
            legacyTimeline: {},
            isJsonFormat: true,
          };
        }
      } catch {
        // Not JSON, try legacy format
      }

      // Legacy format: "day1#@#day2#@#day3..."
      const days = timelineStr.split("#@#");
      const result: Record<string, string> = {};
      days.forEach((content, index) => {
        if (content.trim()) {
          result[(index + 1).toString()] = content.trim();
        }
      });
      return { jsonTimeline: null, legacyTimeline: result, isJsonFormat: false };
    }

    return { jsonTimeline: null, legacyTimeline: {}, isJsonFormat: false };
  }, [estimateInfo.timeline]);

  // Generate map data from JSON timeline (no API call needed)
  const timelineMapData = useMemo<MapDayData[] | null>(() => {
    if (!isJsonFormat || !jsonTimeline?.days) return null;

    return jsonTimeline.days
      .filter((day) => day.places?.length > 0)
      .map((day) => {
        const validPlaces = day.places.filter(
          (p) => p.lat && p.lng && !isNaN(p.lat) && !isNaN(p.lng)
        );

        if (validPlaces.length === 0) return null;

        const locations: MapLocation[] = validPlaces.map((place) => ({
          itemId: place.itemId,
          name: place.nameEng || place.nameKor,
          lat: place.lat!,
          lng: place.lng!,
          description: place.description,
        }));

        // Calculate center as average of all coordinates
        const avgLat = locations.reduce((sum, l) => sum + l.lat, 0) / locations.length;
        const avgLng = locations.reduce((sum, l) => sum + l.lng, 0) / locations.length;

        return {
          day: day.day,
          locations,
          center: { lat: avgLat, lng: avgLng },
        };
      })
      .filter((d): d is MapDayData => d !== null);
  }, [isJsonFormat, jsonTimeline]);

  // Calculate totals
  const totalTravelers =
    batchInfo.adultsCount + batchInfo.childrenCount + batchInfo.infantsCount;
  const tripDays = dayjs(batchInfo.endDate).diff(dayjs(batchInfo.startDate), "day") + 1;

  // Separate common services (transportation and contents) from day-specific items
  const commonServiceTypes = ["이동수단", "컨텐츠"];

  // Apply item filter based on selected types
  const filteredDetails = React.useMemo(() => {
    // Parse itemFilter if available
    let selectedTypes: string[] = [];
    if (batchInfo.itemFilter) {
      try {
        selectedTypes = JSON.parse(batchInfo.itemFilter);
      } catch (e) {
        console.error("Failed to parse itemFilter:", e);
      }
    }

    // If itemFilter has selections, use it
    if (selectedTypes.length > 0) {
      return estimateDetails.filter((detail) => selectedTypes.includes(detail.item.type));
    }

    // Fall back to onlyPlace for backward compatibility
    if (batchInfo.onlyPlace) {
      return estimateDetails.filter((detail) => detail.item.type === "여행지");
    }

    // Show all items if no filter is set
    return estimateDetails;
  }, [batchInfo.itemFilter, batchInfo.onlyPlace, estimateDetails]);

  const daySpecificDetails = filteredDetails.filter(
    (detail) => !commonServiceTypes.includes(detail.item.type) && detail.days !== 0
  );

  const commonServices = filteredDetails.filter(
    (detail) => commonServiceTypes.includes(detail.item.type) && detail.days !== 0
  );

  // Group day-specific items by day
  const itemsByDay = daySpecificDetails.reduce((acc, detail) => {
    const day = detail.days;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(detail);
    return acc;
  }, {} as Record<number, EstimateDetail[]>);

  // Group common services by item (combine same items used on different days)
  const groupedCommonServices = commonServices.reduce((acc, detail) => {
    const key = detail.itemId;
    if (!acc[key]) {
      acc[key] = {
        item: detail.item,
        days: [],
        quantity: 0,
        price: Number(detail.price) || 0,
        originPrice: Number(detail.originPrice) || 0,
      };
    }
    acc[key].days.push(detail.days);
    acc[key].quantity += detail.quantity;
    return acc;
  }, {} as Record<number, any>);

  const commonServicesArray = Object.values(groupedCommonServices);

  // Initialize all days as collapsed
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>(() => {
    return Object.keys(itemsByDay).reduce((acc, day) => {
      acc[day] = false;
      return acc;
    }, {} as Record<string, boolean>);
  });

  // Toggle day expansion
  const toggleDay = (day: string) => {
    setExpandedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  // Fetch map data only for legacy format (JSON format has coordinates in timeline)
  useEffect(() => {
    // Skip API call if using JSON timeline format with coordinates
    if (isJsonFormat && timelineMapData && timelineMapData.length > 0) {
      return;
    }

    const fetchMapData = async () => {
      if (!batchInfo.id) return;

      setLoadingMap(true);
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/batch/${batchInfo.id}/map-data`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMapData(data);
      } catch (err) {
        console.error("[DraftQuotation] Failed to load map data:", err);
      } finally {
        setLoadingMap(false);
      }
    };

    fetchMapData();
  }, [batchInfo.id, isJsonFormat, timelineMapData]);

  return (
    <Container>
      {/* Hero Header for JSON Timeline Format */}
      {isJsonFormat ? (
        <HeroHeader>
          <HeroTitle>{batchInfo.title || "Your Korea Trip"}</HeroTitle>
          {estimateInfo.summary && <HeroSummary>{estimateInfo.summary}</HeroSummary>}
          <HeroMeta>
            <MetaItem>
              <MetaIcon>&#x1F4C5;</MetaIcon>
              <MetaText>
                {dayjs(batchInfo.startDate).format("MMM D")} - {dayjs(batchInfo.endDate).format("MMM D, YYYY")} ({tripDays} days)
              </MetaText>
            </MetaItem>
            <MetaItem>
              <MetaIcon>&#x1F465;</MetaIcon>
              <MetaText>
                {batchInfo.adultsCount > 0 && `${batchInfo.adultsCount} adults`}
                {batchInfo.childrenCount > 0 && `, ${batchInfo.childrenCount} children`}
                {batchInfo.infantsCount > 0 && `, ${batchInfo.infantsCount} infants`}
              </MetaText>
            </MetaItem>
          </HeroMeta>
        </HeroHeader>
      ) : (
        <>
          <Header>
            <Title>Draft Quotation - {batchInfo.title || "Travel Plan"}</Title>
            <ValidUntil>
              Valid until: {dayjs(batchInfo.validDate).format("YYYY-MM-DD")}
            </ValidUntil>
          </Header>

          <Section>
            <SectionTitle>Travel Information</SectionTitle>
            <InfoGrid>
              <InfoItem>
                <Label>Travel Period</Label>
                <Value>
                  {dayjs(batchInfo.startDate).format("YYYY-MM-DD")} ~{" "}
                  {dayjs(batchInfo.endDate).format("YYYY-MM-DD")} ({tripDays} days)
                </Value>
              </InfoItem>
              <InfoItem>
                <Label>Travelers</Label>
                <Value>
                  {batchInfo.adultsCount > 0 && `Adults: ${batchInfo.adultsCount}`}
                  {batchInfo.childrenCount > 0 && `, Children: ${batchInfo.childrenCount}`}
                  {batchInfo.infantsCount > 0 && `, Infants: ${batchInfo.infantsCount}`}{" "}
                  (Total: {totalTravelers})
                </Value>
              </InfoItem>
              {batchInfo.recipient && (
                <InfoItem>
                  <Label>Recipient</Label>
                  <Value>{batchInfo.recipient}</Value>
                </InfoItem>
              )}
            </InfoGrid>
          </Section>
        </>
      )}

      {/* Common Services Section */}
      {commonServicesArray.length > 0 && (
        <Section>
          <SectionTitle>Common Services</SectionTitle>
          <CommonServicesGrid>
            {commonServicesArray.map((service, index) => (
              <CommonServiceCard key={index}>
                <CommonServiceHeader>
                  <CommonServiceName>{service.item.nameEng}</CommonServiceName>
                </CommonServiceHeader>
                <CommonServiceDetails>
                  <CommonServiceRow style={{ flexWrap: "wrap", gap: "0.5rem" }}>
                    <CommonServiceLabel
                      style={{ width: "100%", marginBottom: "0.25rem" }}
                    >
                      Used on:
                    </CommonServiceLabel>
                    <DayBadgesContainer>
                      {service.days
                        .sort((a: number, b: number) => a - b)
                        .map((d: number) => (
                          <DayBadge key={d}>Day {d}</DayBadge>
                        ))}
                    </DayBadgesContainer>
                  </CommonServiceRow>
                  <CommonServiceRow>
                    <CommonServiceLabel>Quantity:</CommonServiceLabel>
                    <CommonServiceValue>{service.quantity}</CommonServiceValue>
                  </CommonServiceRow>
                  {!batchInfo.hidePrice && service.originPrice > 0 && (
                    <CommonServiceRow>
                      <CommonServiceLabel>Unit Price:</CommonServiceLabel>
                      <CommonServiceValue>
                        ${Number(service.originPrice).toLocaleString()}
                      </CommonServiceValue>
                    </CommonServiceRow>
                  )}
                  {!batchInfo.hidePrice && (
                    <CommonServiceRow>
                      <CommonServiceLabel>Total:</CommonServiceLabel>
                      <CommonServiceTotal>
                        ${Number(service.price).toLocaleString()}
                      </CommonServiceTotal>
                    </CommonServiceRow>
                  )}
                </CommonServiceDetails>
              </CommonServiceCard>
            ))}
          </CommonServicesGrid>
        </Section>
      )}

      {/* Itinerary Section - New JSON Format */}
      {isJsonFormat && jsonTimeline?.days && (
        <Section>
          <SectionTitle>Your Itinerary</SectionTitle>
          {jsonTimeline.days.map((dayData) => {
            const dayDate = dayjs(batchInfo.startDate).add(dayData.day - 1, "day");
            const dayMapData = timelineMapData?.find((m) => m.day === dayData.day);

            return (
              <FriendlyDaySection key={dayData.day}>
                <FriendlyDayHeader>
                  <FriendlyDayNumber>Day {dayData.day}</FriendlyDayNumber>
                  <FriendlyDayInfo>
                    <FriendlyDayDate>{dayDate.format("MMMM D, YYYY (ddd)")}</FriendlyDayDate>
                    {dayData.theme && <FriendlyDayTheme>{dayData.theme}</FriendlyDayTheme>}
                  </FriendlyDayInfo>
                </FriendlyDayHeader>

                <FriendlyPlacesList>
                  {dayData.places.map((place, index) => (
                    <FriendlyPlaceCard key={`${place.itemId}-${index}`}>
                      <PlaceOrderNumber>{index + 1}</PlaceOrderNumber>
                      <PlaceContent>
                        <PlaceNameRow>
                          <PlaceName>{place.nameEng}</PlaceName>
                          <PlaceNameKor>{place.nameKor}</PlaceNameKor>
                        </PlaceNameRow>
                        <PlaceDescription>{place.description}</PlaceDescription>
                      </PlaceContent>
                    </FriendlyPlaceCard>
                  ))}
                </FriendlyPlacesList>

                {/* Map from JSON timeline coordinates */}
                {dayMapData && dayMapData.locations.length > 0 && (
                  <DayMap
                    day={dayData.day}
                    locations={dayMapData.locations}
                    center={dayMapData.center}
                  />
                )}
              </FriendlyDaySection>
            );
          })}
        </Section>
      )}

      {/* Itinerary Section - Legacy Format */}
      {!isJsonFormat && Object.keys(itemsByDay).length > 0 && (
        <Section>
          <SectionTitle>Itinerary Details</SectionTitle>
          {Object.keys(itemsByDay)
            .sort((a, b) => Number(a) - Number(b))
            .map((day) => {
              const dayNumber = Number(day);
              const items = itemsByDay[dayNumber];
              const dayDate = dayjs(batchInfo.startDate).add(dayNumber - 1, "day");

              const isExpanded = expandedDays[day];

              return (
                <DaySection key={day}>
                  <DayHeader onClick={() => toggleDay(day)}>
                    <DayHeaderLeft>
                      <ToggleIcon isExpanded={isExpanded}>
                        {isExpanded ? "▼" : "▶"}
                      </ToggleIcon>
                      <DayTitle>Day {day}</DayTitle>
                    </DayHeaderLeft>
                    <DayDate>{dayDate.format("YYYY-MM-DD (ddd)")}</DayDate>
                  </DayHeader>

                  {isExpanded && (
                    <>
                      <ItemList>
                        {items.map((detail) => {
                          const thumbnail = detail.item.files?.find(
                            (f) => f.type === "썸네일"
                          );
                          const showPrice = !batchInfo.hidePrice;

                          // Fallback image based on item type
                          const getFallbackImage = () => {
                            const type = detail.item.type;
                            if (type === "여행지" || type === "Place")
                              return "/beautiful-korean-traditional-palace-with-tourists.jpg";
                            if (type === "숙박" || type === "Accommodation")
                              return "/beautiful-korean-traditional-hanbok-dress.jpg";
                            if (type === "이동수단" || type === "Transportation")
                              return "/busan-coastal-temple.jpg";
                            if (type === "컨텐츠" || type === "Activity")
                              return "/korean-skincare-beauty-products-set.jpg";
                            return "/beautiful-korean-traditional-palace-with-tourists.jpg";
                          };

                          const imageSrc = thumbnail
                            ? getItemImg(thumbnail.itemSrc)
                            : getFallbackImage();

                          return (
                            <ItemCard key={detail.id}>
                              <ItemImage
                                src={imageSrc}
                                alt={detail.item.nameEng}
                                onError={(e) => {
                                  e.currentTarget.src = getFallbackImage();
                                }}
                              />
                              <ItemContent>
                                <ItemHeader>
                                  <ItemType>
                                    {typeMapping[detail.item.type] || detail.item.type}
                                  </ItemType>
                                  <ItemName>{detail.item.nameEng}</ItemName>
                                </ItemHeader>
                                {detail.item.description && (
                                  <ItemDescription
                                    dangerouslySetInnerHTML={{
                                      __html: sanitizeHtml(
                                        draftToHtml(detail.item.description)
                                      ),
                                    }}
                                  />
                                )}
                                <ItemFooter>
                                  <ItemQuantity>
                                    Quantity: {detail.quantity}
                                    {showPrice && detail.originPrice && (
                                      <span
                                        style={{
                                          marginLeft: "8px",
                                          color: "#666",
                                        }}
                                      >
                                        @ ${Number(detail.originPrice).toLocaleString()}
                                      </span>
                                    )}
                                  </ItemQuantity>
                                  {showPrice && (
                                    <ItemPrice>
                                      ${Number(detail.price).toLocaleString()}
                                    </ItemPrice>
                                  )}
                                </ItemFooter>
                              </ItemContent>
                            </ItemCard>
                          );
                        })}
                      </ItemList>

                      {/* Route Summary */}
                      <RouteSummary>
                        <RouteSummaryTitle>
                          Day {day} Route Summary ({items.length} locations)
                        </RouteSummaryTitle>
                        <RouteSummaryList>
                          {items.map((detail, index) => (
                            <RouteSummaryItem key={detail.id}>
                              <RouteSummaryNumber>{index + 1}</RouteSummaryNumber>
                              <RouteSummaryName>{detail.item.nameEng}</RouteSummaryName>
                            </RouteSummaryItem>
                          ))}
                        </RouteSummaryList>
                      </RouteSummary>

                      {/* Legacy Timeline Section */}
                      {(legacyTimeline as Record<string, string>)[day] && (
                        <TimelineSection>
                          <TimelineContent>{(legacyTimeline as Record<string, string>)[day]}</TimelineContent>
                        </TimelineSection>
                      )}

                      {/* Map Section */}
                      {!loadingMap && mapData && mapData.mapData && (
                        <>
                          {mapData.mapData
                            .filter((dayData: MapDayData) => dayData.day === dayNumber)
                            .map((dayData: MapDayData) => (
                              <DayMap
                                key={dayData.day}
                                day={dayData.day}
                                locations={dayData.locations}
                                center={dayData.center}
                              />
                            ))}
                        </>
                      )}
                    </>
                  )}
                </DaySection>
              );
            })}
        </Section>
      )}


      {estimateInfo.comment && (
        <Section>
          <SectionTitle>Additional Information</SectionTitle>
          <CommentBox
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(draftToHtml(estimateInfo.comment)),
            }}
          />
        </Section>
      )}

      {(batchInfo.email || batchInfo.officeNumber || batchInfo.emergencyNumber) && (
        <Section>
          <SectionTitle>Contact Information</SectionTitle>
          <InfoGrid>
            {batchInfo.preparedBy && (
              <InfoItem>
                <Label>Prepared By</Label>
                <Value>{batchInfo.preparedBy}</Value>
              </InfoItem>
            )}
            {batchInfo.email && (
              <InfoItem>
                <Label>Email</Label>
                <Value>{batchInfo.email}</Value>
              </InfoItem>
            )}
            {batchInfo.officeNumber && (
              <InfoItem>
                <Label>Office Number</Label>
                <Value>{batchInfo.officeNumber}</Value>
              </InfoItem>
            )}
            {batchInfo.emergencyNumber && (
              <InfoItem>
                <Label>Emergency Number</Label>
                <Value>{batchInfo.emergencyNumber}</Value>
              </InfoItem>
            )}
            {batchInfo.officeHours && (
              <InfoItem>
                <Label>Office Hours</Label>
                <Value>{batchInfo.officeHours}</Value>
              </InfoItem>
            )}
            {batchInfo.address && (
              <InfoItem>
                <Label>Address</Label>
                <Value>{batchInfo.address}</Value>
              </InfoItem>
            )}
          </InfoGrid>
        </Section>
      )}
    </Container>
  );
};

export default DraftQuotation;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f9fafb;
  min-height: 100vh;
`;

const Header = styled.header`
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 12px 0;
`;

const ValidUntil = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const Section = styled.section`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Value = styled.span`
  font-size: 15px;
  color: #1a1a1a;
  font-weight: 500;
`;

const DaySection = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 6px;

  &:hover {
    background-color: #f9fafb;
  }
`;

const DayHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ToggleIcon = styled.span<{ isExpanded: boolean }>`
  font-size: 14px;
  color: var(--color-tumakr-maroon);
  transition: transform 0.2s ease;
  user-select: none;
`;

const DayTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  user-select: none;
`;

const DayDate = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ItemCard = styled.div`
  display: flex;
  gap: 0;
  padding: 0;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

    h4 {
      color: var(--color-tumakr-maroon);
    }
  }
`;

const ItemImage = styled.img`
  width: 280px;
  height: 200px;
  object-fit: cover;
  flex-shrink: 0;
`;

const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 24px;
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ItemType = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  background: #e5e7eb;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ItemName = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const ItemDescription = styled.div`
  font-size: 14px;
  color: #4b5563;
  margin: 0;
  line-height: 1.5;

  /* HTML tags styling */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0.5em 0;
    font-weight: 600;
    color: #1a1a1a;
  }

  h1 {
    font-size: 1.5em;
  }
  h2 {
    font-size: 1.3em;
  }
  h3 {
    font-size: 1.1em;
  }

  p {
    margin: 0.5em 0;
  }

  strong {
    font-weight: 600;
    color: #1a1a1a;
  }

  em {
    font-style: italic;
  }

  u {
    text-decoration: underline;
  }

  ul,
  ol {
    margin: 0.5em 0;
    padding-left: 1.5em;
  }

  li {
    margin: 0.25em 0;
  }

  blockquote {
    margin: 0.5em 0;
    padding-left: 1em;
    border-left: 3px solid #ddd;
    color: #666;
  }

  code {
    background-color: #f5f5f5;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: monospace;
    font-size: 0.9em;
  }

  pre {
    background-color: #f5f5f5;
    padding: 1em;
    border-radius: 5px;
    overflow-x: auto;

    code {
      background-color: transparent;
      padding: 0;
    }
  }

  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 1em 0;
  }

  a {
    color: #3b82f6;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const ItemQuantity = styled.span`
  font-size: 13px;
  color: #6b7280;
`;

const ItemPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
`;

const TimelineSection = styled.div`
  margin-top: 16px;
  padding: 16px;
  background: white;
  border-radius: 6px;
  border-left: 4px solid #3b82f6;
`;

const TimelineContent = styled.p`
  font-size: 14px;
  color: #4b5563;
  margin: 0;
  white-space: pre-wrap;
  line-height: 1.6;
`;

const RouteSummary = styled.div`
  margin-top: 24px;
  padding: 20px;
  background: rgba(101, 29, 42, 0.05);
  border: 1px solid rgba(101, 29, 42, 0.2);
  border-radius: 8px;
`;

const RouteSummaryTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RouteSummaryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RouteSummaryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
`;

const RouteSummaryNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-tumakr-maroon);
  color: white;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
`;

const RouteSummaryName = styled.span`
  color: #1a1a1a;
  font-weight: 500;
`;

const CommentBox = styled.div`
  padding: 16px;
  background: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  color: #4b5563;
  line-height: 1.6;
  word-wrap: break-word;

  /* Paragraphs */
  p {
    margin: 0 0 12px 0;

    &:last-child {
      margin: 0;
    }
  }

  /* Lists */
  ul,
  ol {
    margin: 0 0 12px 0;
    padding-left: 24px;

    &:last-child {
      margin: 0;
    }

    li {
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  /* Text formatting */
  strong,
  b {
    font-weight: 700;
    color: #1f2937;
  }

  em,
  i {
    font-style: italic;
  }

  u {
    text-decoration: underline;
  }

  /* Headings */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 20px 0 12px 0;
    font-weight: 700;
    color: #1f2937;
    line-height: 1.3;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  h1 {
    font-size: 1.5rem;
  }
  h2 {
    font-size: 1.3rem;
  }
  h3 {
    font-size: 1.15rem;
  }
  h4 {
    font-size: 1.05rem;
  }
  h5 {
    font-size: 1rem;
  }
  h6 {
    font-size: 0.95rem;
  }

  /* Blockquotes */
  blockquote {
    margin: 12px 0;
    padding-left: 12px;
    border-left: 4px solid #667eea;
    color: #6b7280;
    font-style: italic;

    &:last-child {
      margin-bottom: 0;
    }
  }

  /* Links */
  a {
    color: #667eea;
    text-decoration: underline;
    transition: color 0.2s;

    &:hover {
      color: #5568d3;
    }
  }

  /* Code */
  code {
    padding: 2px 6px;
    background: #e5e7eb;
    border-radius: 4px;
    font-family: "Courier New", monospace;
    font-size: 0.9em;
  }

  pre {
    margin: 12px 0;
    padding: 12px;
    background: #1f2937;
    color: #f3f4f6;
    border-radius: 6px;
    overflow-x: auto;

    code {
      background: transparent;
      color: inherit;
      padding: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  /* Horizontal rule */
  hr {
    margin: 20px 0;
    border: none;
    border-top: 2px solid #e5e7eb;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const CommonServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const CommonServiceCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const CommonServiceHeader = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
`;

const CommonServiceName = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0.5rem 0 0 0;
`;

const CommonServiceDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CommonServiceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommonServiceLabel = styled.span`
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
`;

const CommonServiceValue = styled.span`
  font-size: 0.95rem;
  color: #1f2937;
  font-weight: 600;
`;

const CommonServiceTotal = styled.span`
  font-size: 1.1rem;
  color: var(--color-tumakr-maroon);
  font-weight: 700;
`;

const DayBadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const DayBadge = styled.span`
  display: inline-block;
  background: #f3f4f6;
  color: #374151;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
`;

// ===== New JSON Timeline Styled Components =====

const FriendlyDaySection = styled.div`
  margin-bottom: 40px;
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FriendlyDayHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f3f4f6;
`;

const FriendlyDayNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--color-tumakr-maroon) 0%, #8b3a4a 100%);
  color: white;
  font-size: 16px;
  font-weight: 700;
  border-radius: 12px;
  flex-shrink: 0;
`;

const FriendlyDayInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const FriendlyDayDate = styled.span`
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
`;

const FriendlyDayTheme = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.3;
`;

const FriendlyPlacesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FriendlyPlaceCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 20px;
  background: #fafafa;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
    border-color: #d1d5db;
  }
`;

const PlaceOrderNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--color-tumakr-maroon);
  color: white;
  font-size: 14px;
  font-weight: 700;
  border-radius: 50%;
  flex-shrink: 0;
`;

const PlaceContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PlaceNameRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
`;

const PlaceName = styled.h4`
  font-size: 17px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const PlaceNameKor = styled.span`
  font-size: 14px;
  color: #6b7280;
  font-weight: 400;
`;

const PlaceDescription = styled.p`
  font-size: 15px;
  color: #4b5563;
  margin: 0;
  line-height: 1.65;
`;

// ===== Hero Header Styled Components =====

const HeroHeader = styled.header`
  background: linear-gradient(135deg, var(--color-tumakr-maroon) 0%, #8b3a4a 50%, #5a2430 100%);
  padding: 48px 40px;
  border-radius: 16px;
  margin-bottom: 32px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(101, 29, 42, 0.3);
`;

const HeroTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin: 0 0 16px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const HeroSummary = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 auto 24px;
  max-width: 600px;
  line-height: 1.6;
`;

const HeroMeta = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.15);
  padding: 10px 20px;
  border-radius: 30px;
`;

const MetaIcon = styled.span`
  font-size: 18px;
`;

const MetaText = styled.span`
  font-size: 15px;
  color: white;
  font-weight: 500;
`;
