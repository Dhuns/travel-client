'use client';

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { QuotationResponse, EstimateDetail } from '@/src/shared/apis/estimate';
import { getItemImg } from '@/src/shared/utils/base';
import { draftToHtml } from '@/src/shared/utils/draftjs';
import dayjs from 'dayjs';
import DayMap from '@/src/components/Chat/DayMap';

// Korean to English type mapping
const typeMapping: Record<string, string> = {
  '여행지': 'Place',
  '이동수단': 'Transportation',
  '컨텐츠': 'Activity',
  '숙박': 'Accommodation',
};

interface FinalQuotationProps {
  quotation: QuotationResponse;
}

const FinalQuotation: React.FC<FinalQuotationProps> = ({ quotation }) => {
  const { batchInfo, estimateInfo, estimateDetails } = quotation;
  const [mapData, setMapData] = useState<any>(null);
  const [loadingMap, setLoadingMap] = useState(false);

  // Parse timeline string to object if needed
  const timelineByDay: Record<string, string> = React.useMemo(() => {
    if (!estimateInfo.timeline) return {};

    // If already an object, return as-is
    if (typeof estimateInfo.timeline === 'object') {
      return estimateInfo.timeline;
    }

    // If string, parse it (format: "day1#@#day2#@#day3...")
    if (typeof estimateInfo.timeline === 'string') {
      const days = estimateInfo.timeline.split('#@#');
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

  // Calculate totals
  const totalPrice = estimateDetails.reduce((sum, detail) => sum + (Number(detail.price) || 0), 0);
  const totalTravelers = batchInfo.adultsCount + batchInfo.childrenCount + batchInfo.infantsCount;
  const pricePerPerson = totalTravelers > 0 ? totalPrice / totalTravelers : 0;
  const tripDays = dayjs(batchInfo.endDate).diff(dayjs(batchInfo.startDate), 'day') + 1;

  // Separate common services (transportation and contents) from day-specific items
  const commonServiceTypes = ['이동수단', '컨텐츠'];

  const daySpecificDetails = estimateDetails.filter(
    detail => !commonServiceTypes.includes(detail.item.type) && detail.days !== 0
  );

  const commonServices = estimateDetails.filter(
    detail => commonServiceTypes.includes(detail.item.type) && detail.days !== 0
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
        console.error('[FinalQuotation] Failed to load map data:', err);
      } finally {
        setLoadingMap(false);
      }
    };

    fetchMapData();
  }, [batchInfo.id]);

  return (
    <FinalContainer>
      <FinalHeader>
        <FinalLogo>✈️ OneDay Korea</FinalLogo>
        <QuotationBadge>FINAL QUOTATION</QuotationBadge>
      </FinalHeader>

      <FinalContent>
        <FinalCard>
          <FinalTitle>{batchInfo.title || 'Travel Plan'}</FinalTitle>
          <ValidUntilFinal>Valid until: {dayjs(batchInfo.validDate).format('YYYY-MM-DD')}</ValidUntilFinal>

          <FinalSection>
            <FinalSectionTitle>Travel Information</FinalSectionTitle>
            <FinalInfoGrid>
              <FinalInfoItem>
                <FinalLabel>Travel Period</FinalLabel>
                <FinalValue>
                  {dayjs(batchInfo.startDate).format('YYYY-MM-DD')} ~ {dayjs(batchInfo.endDate).format('YYYY-MM-DD')}
                  {' '}({tripDays} days)
                </FinalValue>
              </FinalInfoItem>
              <FinalInfoItem>
                <FinalLabel>Travelers</FinalLabel>
                <FinalValue>
                  {batchInfo.adultsCount > 0 && `Adults: ${batchInfo.adultsCount}`}
                  {batchInfo.childrenCount > 0 && `, Children: ${batchInfo.childrenCount}`}
                  {batchInfo.infantsCount > 0 && `, Infants: ${batchInfo.infantsCount}`}
                  {' '}(Total: {totalTravelers})
                </FinalValue>
              </FinalInfoItem>
              {batchInfo.recipient && (
                <FinalInfoItem>
                  <FinalLabel>Recipient</FinalLabel>
                  <FinalValue>{batchInfo.recipient}</FinalValue>
                </FinalInfoItem>
              )}
            </FinalInfoGrid>
          </FinalSection>

          {/* Common Services Section */}
          {commonServicesArray.length > 0 && (
            <FinalSection>
              <FinalSectionTitle>Common Services</FinalSectionTitle>
              <CommonServicesGrid>
                {commonServicesArray.map((service, index) => (
                  <CommonServiceCard key={index}>
                    <CommonServiceHeader>
                      <CommonServiceName>{service.item.nameEng}</CommonServiceName>
                    </CommonServiceHeader>
                    <CommonServiceDetails>
                      <CommonServiceRow style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                        <CommonServiceLabel style={{ width: '100%', marginBottom: '0.25rem' }}>Used on:</CommonServiceLabel>
                        <DayBadgesContainer>
                          {service.days.sort((a: number, b: number) => a - b).map((d: number) => (
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
                          <CommonServiceValue>${Number(service.originPrice).toLocaleString()}</CommonServiceValue>
                        </CommonServiceRow>
                      )}
                      {!batchInfo.hidePrice && (
                        <CommonServiceRow>
                          <CommonServiceLabel>Total:</CommonServiceLabel>
                          <CommonServiceTotal>${Number(service.price).toLocaleString()}</CommonServiceTotal>
                        </CommonServiceRow>
                      )}
                    </CommonServiceDetails>
                  </CommonServiceCard>
                ))}
              </CommonServicesGrid>
            </FinalSection>
          )}

          <FinalSection>
            <FinalSectionTitle>Itinerary Details</FinalSectionTitle>
            {Object.keys(itemsByDay)
              .sort((a, b) => Number(a) - Number(b))
              .map((day) => {
                const dayNumber = Number(day);
                const items = itemsByDay[dayNumber];
                const dayDate = dayjs(batchInfo.startDate).add(dayNumber - 1, 'day');

                return (
                  <FinalDaySection key={day}>
                    <FinalDayHeader>
                      <FinalDayTitle>Day {day}</FinalDayTitle>
                      <FinalDayDate>{dayDate.format('YYYY-MM-DD (ddd)')}</FinalDayDate>
                    </FinalDayHeader>
                    <FinalItemList>
                      {items.map((detail, idx) => {
                        const thumbnail = detail.item.files?.find((f) => f.type === '썸네일');
                        const showPrice = !batchInfo.hidePrice;

                        return (
                          <FinalItemCard key={detail.id}>
                            <FinalItemNumber>{idx + 1}</FinalItemNumber>
                            {thumbnail && (
                              <FinalItemImage src={getItemImg(thumbnail.itemSrc)} alt={detail.item.nameEng} />
                            )}
                            <FinalItemContent>
                              <FinalItemHeader>
                                <FinalItemType>{typeMapping[detail.item.type] || detail.item.type}</FinalItemType>
                                <FinalItemName>{detail.item.nameEng}</FinalItemName>
                              </FinalItemHeader>
                              {detail.item.description && (
                                <FinalItemDescription
                                  dangerouslySetInnerHTML={{ __html: draftToHtml(detail.item.description) }}
                                />
                              )}
                              <FinalItemFooter>
                                <FinalItemQuantity>
                                  Quantity: {detail.quantity}
                                  {showPrice && detail.originPrice && (
                                    <span style={{ marginLeft: '8px', color: '#999' }}>
                                      @ ${Number(detail.originPrice).toLocaleString()}
                                    </span>
                                  )}
                                </FinalItemQuantity>
                                {showPrice && (
                                  <FinalItemPrice>${Number(detail.price).toLocaleString()}</FinalItemPrice>
                                )}
                              </FinalItemFooter>
                            </FinalItemContent>
                          </FinalItemCard>
                        );
                      })}
                    </FinalItemList>

                    {timelineByDay[day] && (
                      <FinalTimelineSection>
                        <FinalTimelineContent>{timelineByDay[day]}</FinalTimelineContent>
                      </FinalTimelineSection>
                    )}

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
                  </FinalDaySection>
                );
              })}
          </FinalSection>

          {!batchInfo.hidePrice && (
            <FinalTotalSection>
              <FinalTotalRow>
                <FinalTotalLabel>Total Amount</FinalTotalLabel>
                <FinalTotalAmount>${totalPrice.toLocaleString()}</FinalTotalAmount>
              </FinalTotalRow>
              {totalTravelers > 0 && (
                <FinalPerPersonRow>
                  <FinalPerPersonLabel>Per Person</FinalPerPersonLabel>
                  <FinalPerPersonAmount>${Math.round(pricePerPerson).toLocaleString()}</FinalPerPersonAmount>
                </FinalPerPersonRow>
              )}
            </FinalTotalSection>
          )}

          {estimateInfo.comment && (
            <FinalSection>
              <FinalSectionTitle>Additional Information</FinalSectionTitle>
              <FinalCommentBox dangerouslySetInnerHTML={{ __html: draftToHtml(estimateInfo.comment) }} />
            </FinalSection>
          )}

          {(batchInfo.email || batchInfo.officeNumber || batchInfo.emergencyNumber) && (
            <FinalSection>
              <FinalSectionTitle>Contact Information</FinalSectionTitle>
              <FinalInfoGrid>
                {batchInfo.preparedBy && (
                  <FinalInfoItem>
                    <FinalLabel>Prepared By</FinalLabel>
                    <FinalValue>{batchInfo.preparedBy}</FinalValue>
                  </FinalInfoItem>
                )}
                {batchInfo.email && (
                  <FinalInfoItem>
                    <FinalLabel>Email</FinalLabel>
                    <FinalValue>{batchInfo.email}</FinalValue>
                  </FinalInfoItem>
                )}
                {batchInfo.officeNumber && (
                  <FinalInfoItem>
                    <FinalLabel>Office Number</FinalLabel>
                    <FinalValue>{batchInfo.officeNumber}</FinalValue>
                  </FinalInfoItem>
                )}
                {batchInfo.emergencyNumber && (
                  <FinalInfoItem>
                    <FinalLabel>Emergency Number</FinalLabel>
                    <FinalValue>{batchInfo.emergencyNumber}</FinalValue>
                  </FinalInfoItem>
                )}
                {batchInfo.officeHours && (
                  <FinalInfoItem>
                    <FinalLabel>Office Hours</FinalLabel>
                    <FinalValue>{batchInfo.officeHours}</FinalValue>
                  </FinalInfoItem>
                )}
                {batchInfo.address && (
                  <FinalInfoItem>
                    <FinalLabel>Address</FinalLabel>
                    <FinalValue>{batchInfo.address}</FinalValue>
                  </FinalInfoItem>
                )}
              </FinalInfoGrid>
            </FinalSection>
          )}
        </FinalCard>
      </FinalContent>
    </FinalContainer>
  );
};

export default FinalQuotation;

// Styled Components
const FinalContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #651d2a 0%, #8b3a47 100%);
  padding: 0;
`;

const FinalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 5%;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const FinalLogo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(135deg, #651d2a 0%, #8b3a47 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const QuotationBadge = styled.div`
  padding: 0.5rem 1.5rem;
  background: linear-gradient(135deg, #651d2a 0%, #8b3a47 100%);
  color: white;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 1px;
`;

const FinalContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const FinalCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
`;

const FinalTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #651d2a 0%, #8b3a47 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ValidUntilFinal = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin: 0 0 2rem 0;
  padding-bottom: 1.5rem;
  border-bottom: 3px solid #f0f0f0;
`;

const FinalSection = styled.section`
  margin-bottom: 2.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FinalSectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #651d2a;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #651d2a;
`;

const FinalInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const FinalInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FinalLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FinalValue = styled.span`
  font-size: 1.05rem;
  color: #333;
  font-weight: 600;
`;

const FinalDaySection = styled.div`
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FinalDayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
`;

const FinalDayTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: #651d2a;
  margin: 0;
`;

const FinalDayDate = styled.span`
  font-size: 1rem;
  color: #6b7280;
  font-weight: 600;
`;

const FinalItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FinalItemCard = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;

  &:hover {
    border-color: #651d2a;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  }
`;

const FinalItemNumber = styled.div`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #651d2a 0%, #8b3a47 100%);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.9rem;
`;

const FinalItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
`;

const FinalItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FinalItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const FinalItemType = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  background: #651d2a;
  padding: 4px 10px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FinalItemName = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
`;

const FinalItemDescription = styled.div`
  font-size: 0.95rem;
  color: #666;
  margin: 0;
  line-height: 1.6;

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

const FinalItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const FinalItemQuantity = styled.span`
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 600;
`;

const FinalItemPrice = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: #651d2a;
`;

const FinalTimelineSection = styled.div`
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: white;
  border-radius: 8px;
  border-left: 4px solid #651d2a;
`;

const FinalTimelineContent = styled.p`
  font-size: 0.95rem;
  color: #4b5563;
  margin: 0;
  white-space: pre-wrap;
  line-height: 1.6;
`;

const FinalTotalSection = styled.div`
  background: linear-gradient(135deg, #651d2a 0%, #8b3a47 100%);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  margin-bottom: 2.5rem;
`;

const FinalTotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const FinalTotalLabel = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
`;

const FinalTotalAmount = styled.span`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
`;

const FinalPerPersonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 2px solid rgba(255, 255, 255, 0.3);
`;

const FinalPerPersonLabel = styled.span`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 600;
`;

const FinalPerPersonAmount = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
`;

const FinalCommentBox = styled.div`
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  font-size: 0.95rem;
  color: #4b5563;
  line-height: 1.7;
  word-wrap: break-word;

  /* Paragraphs */
  p {
    margin: 0 0 1rem 0;

    &:last-child {
      margin: 0;
    }
  }

  /* Lists */
  ul, ol {
    margin: 0 0 1rem 0;
    padding-left: 1.5rem;

    &:last-child {
      margin: 0;
    }

    li {
      margin-bottom: 0.5rem;

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
    margin: 1.5rem 0 1rem 0;
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
    margin: 1rem 0;
    padding-left: 1rem;
    border-left: 4px solid #651d2a;
    color: #6b7280;
    font-style: italic;

    &:last-child {
      margin-bottom: 0;
    }
  }

  /* Links */
  a {
    color: #651d2a;
    text-decoration: underline;
    transition: color 0.2s;

    &:hover {
      color: #8b3a47;
    }
  }

  /* Code */
  code {
    padding: 0.2rem 0.4rem;
    background: #e5e7eb;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }

  pre {
    margin: 1rem 0;
    padding: 1rem;
    background: #1f2937;
    color: #f3f4f6;
    border-radius: 8px;
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
    margin: 1.5rem 0;
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
  margin: 0;
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
  color: #651d2a;
  font-weight: 700;
`;
