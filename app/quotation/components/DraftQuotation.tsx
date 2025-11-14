"use client";

import { EstimateDetail, QuotationResponse } from "@/src/shared/apis/estimate";
import React, { useEffect, useState } from "react";

import DayMap from "@/src/components/Chat/DayMap";
import dayjs from "dayjs";
import { getItemImg } from "@/src/shared/utils/base";
import { draftToHtml } from "@/src/shared/utils/draftjs";
import styled from "@emotion/styled";

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

const DraftQuotation: React.FC<DraftQuotationProps> = ({ quotation }) => {
  const { batchInfo, estimateInfo, estimateDetails } = quotation;
  const [mapData, setMapData] = useState<any>(null);
  const [loadingMap, setLoadingMap] = useState(false);

  // Calculate totals
  const totalPrice = estimateDetails.reduce(
    (sum, detail) => sum + (Number(detail.price) || 0),
    0
  );
  const totalTravelers =
    batchInfo.adultsCount + batchInfo.childrenCount + batchInfo.infantsCount;
  const pricePerPerson = totalTravelers > 0 ? totalPrice / totalTravelers : 0;
  const tripDays =
    dayjs(batchInfo.endDate).diff(dayjs(batchInfo.startDate), "day") + 1;

  // Group items by day
  const itemsByDay = estimateDetails.reduce((acc, detail) => {
    const day = detail.days;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(detail);
    return acc;
  }, {} as Record<number, EstimateDetail[]>);

  // Initialize all days as collapsed
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>(
    () => {
      return Object.keys(itemsByDay).reduce((acc, day) => {
        acc[day] = false;
        return acc;
      }, {} as Record<string, boolean>);
    }
  );

  // Toggle day expansion
  const toggleDay = (day: string) => {
    setExpandedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

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
        console.error("[DraftQuotation] Failed to load map data:", err);
      } finally {
        setLoadingMap(false);
      }
    };

    fetchMapData();
  }, [batchInfo.id]);

  return (
    <Container>
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
              {batchInfo.childrenCount > 0 &&
                `, Children: ${batchInfo.childrenCount}`}
              {batchInfo.infantsCount > 0 &&
                `, Infants: ${batchInfo.infantsCount}`}{" "}
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

      <Section>
        <SectionTitle>Itinerary Details</SectionTitle>
        {Object.keys(itemsByDay)
          .sort((a, b) => Number(a) - Number(b))
          .map((day) => {
            const dayNumber = Number(day);
            const items = itemsByDay[dayNumber];
            const dayDate = dayjs(batchInfo.startDate).add(
              dayNumber - 1,
              "day"
            );

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
                            return "/beautiful-korean-traditional-palace-with-tourists-.jpg";
                          if (type === "숙박" || type === "Accommodation")
                            return "/beautiful-korean-traditional-hanbok-dress.jpg";
                          if (type === "이동수단" || type === "Transportation")
                            return "/busan-coastal-temple.jpg";
                          if (type === "컨텐츠" || type === "Activity")
                            return "/korean-skincare-beauty-products-set.jpg";
                          return "/beautiful-korean-traditional-palace-with-tourists-.jpg";
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
                                  {typeMapping[detail.item.type] ||
                                    detail.item.type}
                                </ItemType>
                                <ItemName>{detail.item.nameEng}</ItemName>
                              </ItemHeader>
                              {detail.item.description && (
                                <ItemDescription
                                  dangerouslySetInnerHTML={{ __html: draftToHtml(detail.item.description) }}
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
                                      @ $
                                      {Number(
                                        detail.originPrice
                                      ).toLocaleString()}
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
                            <RouteSummaryName>
                              {detail.item.nameEng}
                            </RouteSummaryName>
                          </RouteSummaryItem>
                        ))}
                      </RouteSummaryList>
                    </RouteSummary>
                    {/* Map Section */}
                    {!loadingMap && mapData && mapData.mapData && (
                      <>
                        {mapData.mapData
                          .filter((dayData: any) => dayData.day === dayNumber)
                          .map((dayData: any) => (
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

      {!batchInfo.hidePrice && (
        <TotalSection>
          <TotalRow>
            <TotalLabel>Total Amount</TotalLabel>
            <TotalAmount>${totalPrice.toLocaleString()}</TotalAmount>
          </TotalRow>
          {totalTravelers > 0 && (
            <PerPersonRow>
              <PerPersonLabel>Per Person</PerPersonLabel>
              <PerPersonAmount>
                ${Math.round(pricePerPerson).toLocaleString()}
              </PerPersonAmount>
            </PerPersonRow>
          )}
        </TotalSection>
      )}

      {estimateInfo.comment && (
        <Section>
          <SectionTitle>Additional Information</SectionTitle>
          <CommentBox
            dangerouslySetInnerHTML={{ __html: draftToHtml(estimateInfo.comment) }}
          />
        </Section>
      )}

      {(batchInfo.email ||
        batchInfo.officeNumber ||
        batchInfo.emergencyNumber) && (
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
  color: #651d2a;
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
      color: #651d2a;
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
  h1, h2, h3, h4, h5, h6 {
    margin: 0.5em 0;
    font-weight: 600;
    color: #1a1a1a;
  }

  h1 { font-size: 1.5em; }
  h2 { font-size: 1.3em; }
  h3 { font-size: 1.1em; }

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

  ul, ol {
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
  background: #651d2a;
  color: white;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
`;

const RouteSummaryName = styled.span`
  color: #1a1a1a;
  font-weight: 500;
`;

const TotalSection = styled.div`
  background: linear-gradient(135deg, #651d2a 0%, #8b3a47 100%);
  padding: 24px 32px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 24px;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const TotalLabel = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: white;
`;

const TotalAmount = styled.span`
  font-size: 32px;
  font-weight: 700;
  color: white;
`;

const PerPersonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
`;

const PerPersonLabel = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
`;

const PerPersonAmount = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: white;
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
  strong, b {
    font-weight: 700;
    color: #1f2937;
  }

  em, i {
    font-style: italic;
  }

  u {
    text-decoration: underline;
  }

  /* Headings */
  h1, h2, h3, h4, h5, h6 {
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

  h1 { font-size: 1.5rem; }
  h2 { font-size: 1.3rem; }
  h3 { font-size: 1.15rem; }
  h4 { font-size: 1.05rem; }
  h5 { font-size: 1rem; }
  h6 { font-size: 0.95rem; }

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
    font-family: 'Courier New', monospace;
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
