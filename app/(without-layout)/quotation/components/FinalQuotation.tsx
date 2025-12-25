"use client";

import DayMap from "@/src/components/Chat/DayMap";
import { EstimateDetail, QuotationResponse } from "@/src/shared/apis/estimate";
import { getItemImg } from "@/src/shared/utils/base";
import { draftToHtml } from "@/src/shared/utils/draftjs";
import { sanitizeHtml } from "@/src/shared/utils/sanitize";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

// Korean to English type mapping
const typeMapping: Record<string, string> = {
  여행지: "Place",
  이동수단: "Transportation",
  컨텐츠: "Activity",
  숙박: "Accommodation",
};

interface FinalQuotationProps {
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

// Adjustment item type
interface AdjustmentItem {
  description?: string;
  amount: number;
}

const FinalQuotation: React.FC<FinalQuotationProps> = ({ quotation }) => {
  const { batchInfo, estimateInfo, estimateDetails } = quotation;
  const [mapData, setMapData] = useState<MapDataResponse | null>(null);
  const [loadingMap, setLoadingMap] = useState(false);

  // Parse timeline string to object if needed
  const timelineByDay: Record<string, string> = React.useMemo(() => {
    if (!estimateInfo.timeline) return {};

    // If already an object, check if it's new JSON format or legacy Record format
    if (typeof estimateInfo.timeline === "object") {
      // New JSON format has 'days' array - skip for FinalQuotation (uses legacy format)
      if ("days" in estimateInfo.timeline) {
        return {};
      }
      return estimateInfo.timeline as Record<string, string>;
    }

    // If string, parse it (format: "day1#@#day2#@#day3...")
    if (typeof estimateInfo.timeline === "string") {
      const days = (estimateInfo.timeline as string).split("#@#");
      const result: Record<string, string> = {};
      days.forEach((content, index) => {
        if (content.trim()) {
          result[(index + 1).toString()] = content.trim();
        }
      });
      return result;
    }

    return {};
  }, [estimateInfo.timeline]);

  // Parse adjustment items
  const adjustmentItems = React.useMemo(() => {
    if (!batchInfo.adjustmentReason) return [];
    try {
      return JSON.parse(batchInfo.adjustmentReason);
    } catch (e) {
      console.error("Failed to parse adjustment reason:", e);
      return [];
    }
  }, [batchInfo.adjustmentReason]);

  // Calculate totals
  const itemsSubtotal = estimateDetails.reduce(
    (sum, detail) => sum + (Number(detail.price) || 0),
    0
  );
  const manualAdjustment = Number(batchInfo.manualAdjustment) || 0;
  const totalPrice = itemsSubtotal + manualAdjustment;
  const totalTravelers =
    batchInfo.adultsCount + batchInfo.childrenCount + batchInfo.infantsCount;
  const pricePerPerson = totalTravelers > 0 ? totalPrice / totalTravelers : 0;
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

    // Show nothing if no filter is selected
    return [];
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
        totalPrice: 0,
      };
    }
    acc[key].days.push(detail.days);
    acc[key].quantity += detail.quantity;
    acc[key].totalPrice += Number(detail.price) || 0;
    return acc;
  }, {} as Record<number, any>);

  const commonServicesArray = Object.values(groupedCommonServices);

  // Fetch map data
  useEffect(() => {
    const fetchMapData = async () => {
      if (!batchInfo.id) return;

      setLoadingMap(true);
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/batch/${batchInfo.id}/map-data`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMapData(data);
      } catch (err) {
        console.error("[FinalQuotation] Failed to load map data:", err);
      } finally {
        setLoadingMap(false);
      }
    };

    fetchMapData();
  }, [batchInfo.id]);

  return (
    <PageContainer>
      {/* Header */}
      <Header>
        <HeaderContent>
          <Logo>✈️ OneDay Korea</Logo>
          <Badge>FINAL QUOTATION</Badge>
        </HeaderContent>
      </Header>

      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <TripTitle>{batchInfo.title || "Travel Plan"}</TripTitle>
          <TripMeta>
            <MetaItem>
              <MetaIcon>📅</MetaIcon>
              <MetaText>
                {dayjs(batchInfo.startDate).format("MMM D")} - {dayjs(batchInfo.endDate).format("MMM D, YYYY")}
                <MetaHighlight>{tripDays} days</MetaHighlight>
              </MetaText>
            </MetaItem>
            <MetaItem>
              <MetaIcon>👥</MetaIcon>
              <MetaText>
                {totalTravelers} travelers
                <MetaHighlight>
                  {batchInfo.adultsCount} adults
                  {batchInfo.childrenCount > 0 && `, ${batchInfo.childrenCount} children`}
                  {batchInfo.infantsCount > 0 && `, ${batchInfo.infantsCount} infants`}
                </MetaHighlight>
              </MetaText>
            </MetaItem>
            {batchInfo.recipient && (
              <MetaItem>
                <MetaIcon>✉️</MetaIcon>
                <MetaText>For: {batchInfo.recipient}</MetaText>
              </MetaItem>
            )}
          </TripMeta>
          {batchInfo.validDate && (
            <ValidUntil>Valid until {dayjs(batchInfo.validDate).format("MMMM D, YYYY")}</ValidUntil>
          )}
        </HeroContent>
      </HeroSection>

      {/* Main Content */}
      <MainContent>
        {/* Common Services */}
        {commonServicesArray.length > 0 && (
          <Section>
            <SectionHeader>
              <SectionIcon>🚗</SectionIcon>
              <SectionTitle>Transportation & Services</SectionTitle>
            </SectionHeader>
            <ServicesGrid>
              {commonServicesArray.map((service, index) => (
                <ServiceCard key={index}>
                  <ServiceName>{service.item.nameEng}</ServiceName>
                  <ServiceDays>
                    {service.days
                      .sort((a: number, b: number) => a - b)
                      .map((d: number) => (
                        <DayChip key={d}>Day {d}</DayChip>
                      ))}
                  </ServiceDays>
                  <ServiceDetails>
                    <ServiceDetailRow>
                      <span>Days Used</span>
                      <span>{service.days.length} days</span>
                    </ServiceDetailRow>
                    <ServiceDetailRow>
                      <span>Quantity</span>
                      <span>{service.quantity} pax</span>
                    </ServiceDetailRow>
                    {!batchInfo.hidePrice && service.totalPrice > 0 && service.quantity > 0 && (
                      <ServiceDetailRow>
                        <span>Unit Price</span>
                        <span>${Math.round(service.totalPrice / service.quantity).toLocaleString()} /pax</span>
                      </ServiceDetailRow>
                    )}
                    {!batchInfo.hidePrice && service.totalPrice > 0 && (
                      <ServiceDetailRow className="price">
                        <span>Total</span>
                        <span>${Number(service.totalPrice).toLocaleString()}</span>
                      </ServiceDetailRow>
                    )}
                  </ServiceDetails>
                </ServiceCard>
              ))}
            </ServicesGrid>
          </Section>
        )}

        {/* Daily Itinerary */}
        <Section>
          <SectionHeader>
            <SectionIcon>🗓️</SectionIcon>
            <SectionTitle>Daily Itinerary</SectionTitle>
          </SectionHeader>

          <Timeline>
            {Object.keys(itemsByDay)
              .sort((a, b) => Number(a) - Number(b))
              .map((day, dayIndex) => {
                const dayNumber = Number(day);
                const items = itemsByDay[dayNumber];
                const dayDate = dayjs(batchInfo.startDate).add(dayNumber - 1, "day");
                const isLastDay = dayIndex === Object.keys(itemsByDay).length - 1;

                return (
                  <TimelineDay key={day} isLast={isLastDay}>
                    <TimelineMarker>
                      <TimelineDot>{dayNumber}</TimelineDot>
                      {!isLastDay && <TimelineLine />}
                    </TimelineMarker>

                    <DayContent>
                      <DayHeader>
                        <DayLabel>Day {day}</DayLabel>
                        <DayDate>{dayDate.format("ddd, MMM D")}</DayDate>
                      </DayHeader>

                      <PlacesList>
                        {items.map((detail, idx) => {
                          const thumbnail = detail.item.files?.find(
                            (f) => f.type === "썸네일"
                          );
                          const showPrice = !batchInfo.hidePrice;

                          return (
                            <PlaceCard key={detail.id}>
                              <PlaceNumber>{idx + 1}</PlaceNumber>
                              <PlaceInfo>
                                <PlaceHeader>
                                  <PlaceType>{typeMapping[detail.item.type] || detail.item.type}</PlaceType>
                                  <PlaceName>{detail.item.nameEng}</PlaceName>
                                </PlaceHeader>
                                {detail.item.description && (
                                  <PlaceDescription
                                    dangerouslySetInnerHTML={{
                                      __html: sanitizeHtml(
                                        draftToHtml(detail.item.description)
                                      ),
                                    }}
                                  />
                                )}
                                <PlaceFooter>
                                  <PlaceQuantity>
                                    {detail.quantity} pax
                                    {showPrice && detail.originPrice && (
                                      <span> × ${Number(detail.originPrice).toLocaleString()}</span>
                                    )}
                                  </PlaceQuantity>
                                  {showPrice && (
                                    <PlacePrice>${Number(detail.price).toLocaleString()}</PlacePrice>
                                  )}
                                </PlaceFooter>
                              </PlaceInfo>
                              {thumbnail && (
                                <PlaceImage
                                  src={getItemImg(thumbnail.itemSrc)}
                                  alt={detail.item.nameEng}
                                />
                              )}
                            </PlaceCard>
                          );
                        })}
                      </PlacesList>

                      {timelineByDay[day] && (
                        <DayNotes>
                          <NotesIcon>📝</NotesIcon>
                          <NotesText>{timelineByDay[day]}</NotesText>
                        </DayNotes>
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
                    </DayContent>
                  </TimelineDay>
                );
              })}
          </Timeline>
        </Section>

        {/* Price Summary */}
        {!batchInfo.hidePrice && (
          <Section>
            <SectionHeader>
              <SectionIcon>💰</SectionIcon>
              <SectionTitle>Price Summary</SectionTitle>
            </SectionHeader>

            <PriceCard>
              <PriceRow>
                <PriceLabel>Items Subtotal</PriceLabel>
                <PriceValue>${itemsSubtotal.toLocaleString()}</PriceValue>
              </PriceRow>

              {adjustmentItems.length > 0 && (
                <AdjustmentsSection>
                  <AdjustmentsTitle>Adjustments</AdjustmentsTitle>
                  {(adjustmentItems as AdjustmentItem[]).map((item, index) => (
                    <AdjustmentRow key={index}>
                      <span>{item.description || "Adjustment"}</span>
                      <AdjustmentValue isPositive={item.amount >= 0}>
                        {item.amount >= 0 ? "+" : ""}${item.amount.toLocaleString()}
                      </AdjustmentValue>
                    </AdjustmentRow>
                  ))}
                </AdjustmentsSection>
              )}

              <TotalSection>
                <TotalRow>
                  <TotalLabel>Total Amount</TotalLabel>
                  <TotalValue>${totalPrice.toLocaleString()}</TotalValue>
                </TotalRow>
                {totalTravelers > 0 && (
                  <PerPersonRow>
                    <span>Per Person</span>
                    <span>${Math.round(pricePerPerson).toLocaleString()}</span>
                  </PerPersonRow>
                )}
              </TotalSection>
            </PriceCard>
          </Section>
        )}

        {/* Additional Information */}
        {estimateInfo.comment && (
          <Section>
            <SectionHeader>
              <SectionIcon>ℹ️</SectionIcon>
              <SectionTitle>Additional Information</SectionTitle>
            </SectionHeader>
            <InfoBox
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(draftToHtml(estimateInfo.comment)),
              }}
            />
          </Section>
        )}

        {/* Contact Information */}
        {(batchInfo.email || batchInfo.officeNumber || batchInfo.emergencyNumber) && (
          <Section>
            <SectionHeader>
              <SectionIcon>📞</SectionIcon>
              <SectionTitle>Contact Us</SectionTitle>
            </SectionHeader>
            <ContactGrid>
              {batchInfo.preparedBy && (
                <ContactItem>
                  <ContactLabel>Prepared By</ContactLabel>
                  <ContactValue>{batchInfo.preparedBy}</ContactValue>
                </ContactItem>
              )}
              {batchInfo.email && (
                <ContactItem>
                  <ContactLabel>Email</ContactLabel>
                  <ContactValue>{batchInfo.email}</ContactValue>
                </ContactItem>
              )}
              {batchInfo.officeNumber && (
                <ContactItem>
                  <ContactLabel>Office</ContactLabel>
                  <ContactValue>{batchInfo.officeNumber}</ContactValue>
                </ContactItem>
              )}
              {batchInfo.emergencyNumber && (
                <ContactItem>
                  <ContactLabel>Emergency</ContactLabel>
                  <ContactValue>{batchInfo.emergencyNumber}</ContactValue>
                </ContactItem>
              )}
              {batchInfo.officeHours && (
                <ContactItem>
                  <ContactLabel>Hours</ContactLabel>
                  <ContactValue>{batchInfo.officeHours}</ContactValue>
                </ContactItem>
              )}
              {batchInfo.address && (
                <ContactItem fullWidth>
                  <ContactLabel>Address</ContactLabel>
                  <ContactValue>{batchInfo.address}</ContactValue>
                </ContactItem>
              )}
            </ContactGrid>
          </Section>
        )}
      </MainContent>

      {/* Footer */}
      <Footer>
        <FooterText>Thank you for choosing OneDay Korea</FooterText>
      </Footer>
    </PageContainer>
  );
};

export default FinalQuotation;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

const Header = styled.header`
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: var(--color-tumakr-maroon);
`;

const Badge = styled.div`
  background: var(--color-tumakr-maroon);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, var(--color-tumakr-maroon) 0%, #4a1a3d 100%);
  color: white;
  padding: 48px 24px;
`;

const HeroContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const TripTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 24px 0;

  @media (max-width: 640px) {
    font-size: 24px;
  }
`;

const TripMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const MetaIcon = styled.span`
  font-size: 20px;
`;

const MetaText = styled.div`
  font-size: 14px;
  opacity: 0.95;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MetaHighlight = styled.span`
  font-size: 13px;
  opacity: 0.8;
`;

const ValidUntil = styled.div`
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 13px;
  opacity: 0.8;
`;

const MainContent = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px 24px;
`;

const Section = styled.section`
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const SectionIcon = styled.span`
  font-size: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

const ServiceCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e5e7eb;
`;

const ServiceName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
`;

const ServiceDays = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
`;

const DayChip = styled.span`
  background: #f3f4f6;
  color: #4b5563;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

const ServiceDetails = styled.div`
  border-top: 1px solid #f3f4f6;
  padding-top: 12px;
`;

const ServiceDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }

  &.price {
    color: var(--color-tumakr-maroon);
    font-weight: 600;
  }
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimelineDay = styled.div<{ isLast: boolean }>`
  display: flex;
  gap: 24px;

  @media (max-width: 640px) {
    gap: 16px;
  }
`;

const TimelineMarker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`;

const TimelineDot = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-tumakr-maroon);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
`;

const TimelineLine = styled.div`
  width: 2px;
  flex: 1;
  background: #e5e7eb;
  min-height: 40px;
`;

const DayContent = styled.div`
  flex: 1;
  padding-bottom: 32px;
`;

const DayHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 16px;
`;

const DayLabel = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const DayDate = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const PlacesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PlaceCard = styled.div`
  display: flex;
  gap: 16px;
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const PlaceNumber = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f3f4f6;
  color: #4b5563;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 13px;
  flex-shrink: 0;
`;

const PlaceInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const PlaceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  flex-wrap: wrap;
`;

const PlaceType = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: var(--color-tumakr-maroon);
  background: rgba(128, 0, 64, 0.08);
  padding: 3px 8px;
  border-radius: 4px;
  text-transform: uppercase;
`;

const PlaceName = styled.h4`
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

const PlaceDescription = styled.div`
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 12px;

  p { margin: 0 0 8px 0; &:last-child { margin: 0; } }
  h1, h2, h3, h4, h5, h6 { font-size: 14px; font-weight: 600; margin: 8px 0; }
  ul, ol { margin: 4px 0; padding-left: 20px; }
`;

const PlaceFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid #f3f4f6;
`;

const PlaceQuantity = styled.span`
  font-size: 13px;
  color: #6b7280;

  span {
    opacity: 0.8;
  }
`;

const PlacePrice = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: var(--color-tumakr-maroon);
`;

const PlaceImage = styled.img`
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;

  @media (max-width: 640px) {
    width: 100%;
    height: 160px;
    order: -1;
  }
`;

const DayNotes = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  padding: 14px;
  background: #fffbeb;
  border-radius: 8px;
  border-left: 3px solid #f59e0b;
`;

const NotesIcon = styled.span`
  font-size: 16px;
  flex-shrink: 0;
`;

const NotesText = styled.p`
  font-size: 13px;
  color: #92400e;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const PriceCard = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f3f4f6;
`;

const PriceLabel = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const PriceValue = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
`;

const AdjustmentsSection = styled.div`
  padding: 16px 20px;
  background: #f9fafb;
  border-bottom: 1px solid #f3f4f6;
`;

const AdjustmentsTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const AdjustmentRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const AdjustmentValue = styled.span<{ isPositive: boolean }>`
  font-weight: 600;
  color: ${props => props.isPositive ? '#059669' : '#dc2626'};
`;

const TotalSection = styled.div`
  background: var(--color-tumakr-maroon);
  padding: 20px;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const TotalValue = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: white;
`;

const PerPersonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
`;

const InfoBox = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  color: #4b5563;
  line-height: 1.6;

  p { margin: 0 0 12px 0; &:last-child { margin: 0; } }
  h1, h2, h3 { font-size: 16px; font-weight: 600; color: #1f2937; margin: 16px 0 8px; &:first-child { margin-top: 0; } }
  ul, ol { margin: 8px 0; padding-left: 24px; }
  li { margin-bottom: 4px; }
  strong { font-weight: 600; color: #1f2937; }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e5e7eb;
`;

const ContactItem = styled.div<{ fullWidth?: boolean }>`
  ${props => props.fullWidth && 'grid-column: 1 / -1;'}
`;

const ContactLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const ContactValue = styled.div`
  font-size: 14px;
  color: #1f2937;
  font-weight: 500;
`;

const Footer = styled.footer`
  background: #1f2937;
  padding: 32px 24px;
  text-align: center;
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin: 0;
`;
