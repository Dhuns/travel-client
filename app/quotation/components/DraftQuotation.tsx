'use client';

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { QuotationResponse, EstimateDetail } from '@/src/shared/apis/estimate';
import { getItemImg } from '@/src/shared/utils/base';
import dayjs from 'dayjs';
import DayMap from '@/src/components/Chat/DayMap';

// Korean to English type mapping
const typeMapping: Record<string, string> = {
  '여행지': 'Place',
  '이동수단': 'Transportation',
  '컨텐츠': 'Activity',
  '숙박': 'Accommodation',
};

interface DraftQuotationProps {
  quotation: QuotationResponse;
}

const DraftQuotation: React.FC<DraftQuotationProps> = ({ quotation }) => {
  const { batchInfo, estimateInfo, estimateDetails } = quotation;
  const [mapData, setMapData] = useState<any>(null);
  const [loadingMap, setLoadingMap] = useState(false);

  // Calculate totals
  const totalPrice = estimateDetails.reduce((sum, detail) => sum + (Number(detail.price) || 0), 0);
  const totalTravelers = batchInfo.adultsCount + batchInfo.childrenCount + batchInfo.infantsCount;
  const pricePerPerson = totalTravelers > 0 ? totalPrice / totalTravelers : 0;
  const tripDays = dayjs(batchInfo.endDate).diff(dayjs(batchInfo.startDate), 'day') + 1;

  // Group items by day
  const itemsByDay = estimateDetails.reduce((acc, detail) => {
    const day = detail.days;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(detail);
    return acc;
  }, {} as Record<number, EstimateDetail[]>);

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
        console.error('[DraftQuotation] Failed to load map data:', err);
      } finally {
        setLoadingMap(false);
      }
    };

    fetchMapData();
  }, [batchInfo.id]);

  return (
    <Container>
      <Header>
        <Title>Draft Quotation - {batchInfo.title || 'Travel Plan'}</Title>
        <ValidUntil>Valid until: {dayjs(batchInfo.validDate).format('YYYY-MM-DD')}</ValidUntil>
      </Header>

      <Section>
        <SectionTitle>Travel Information</SectionTitle>
        <InfoGrid>
          <InfoItem>
            <Label>Travel Period</Label>
            <Value>
              {dayjs(batchInfo.startDate).format('YYYY-MM-DD')} ~ {dayjs(batchInfo.endDate).format('YYYY-MM-DD')}
              {' '}({tripDays} days)
            </Value>
          </InfoItem>
          <InfoItem>
            <Label>Travelers</Label>
            <Value>
              {batchInfo.adultsCount > 0 && `Adults: ${batchInfo.adultsCount}`}
              {batchInfo.childrenCount > 0 && `, Children: ${batchInfo.childrenCount}`}
              {batchInfo.infantsCount > 0 && `, Infants: ${batchInfo.infantsCount}`}
              {' '}(Total: {totalTravelers})
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
            const dayDate = dayjs(batchInfo.startDate).add(dayNumber - 1, 'day');

            return (
              <DaySection key={day}>
                <DayHeader>
                  <DayTitle>Day {day}</DayTitle>
                  <DayDate>{dayDate.format('YYYY-MM-DD (ddd)')}</DayDate>
                </DayHeader>
                <ItemList>
                  {items.map((detail) => {
                    const thumbnail = detail.item.files?.find((f) => f.type === '썸네일');
                    const showPrice = !batchInfo.hidePrice;

                    return (
                      <ItemCard key={detail.id}>
                        {thumbnail && (
                          <ItemImage src={getItemImg(thumbnail.itemSrc)} alt={detail.item.nameEng} />
                        )}
                        <ItemContent>
                          <ItemHeader>
                            <ItemType>{typeMapping[detail.item.type] || detail.item.type}</ItemType>
                            <ItemName>{detail.item.nameEng}</ItemName>
                          </ItemHeader>
                          {detail.item.description && (
                            <ItemDescription>{detail.item.description}</ItemDescription>
                          )}
                          <ItemFooter>
                            <ItemQuantity>
                              Quantity: {detail.quantity}
                              {showPrice && detail.originPrice && (
                                <span style={{ marginLeft: '8px', color: '#666' }}>
                                  @ ${Number(detail.originPrice).toLocaleString()}
                                </span>
                              )}
                            </ItemQuantity>
                            {showPrice && (
                              <ItemPrice>${Number(detail.price).toLocaleString()}</ItemPrice>
                            )}
                          </ItemFooter>
                        </ItemContent>
                      </ItemCard>
                    );
                  })}
                </ItemList>

                {estimateInfo.timeline?.[day] && (
                  <TimelineSection>
                    <TimelineContent>{estimateInfo.timeline[day]}</TimelineContent>
                  </TimelineSection>
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
              <PerPersonAmount>${Math.round(pricePerPerson).toLocaleString()}</PerPersonAmount>
            </PerPersonRow>
          )}
        </TotalSection>
      )}

      {estimateInfo.comment && (
        <Section>
          <SectionTitle>Additional Information</SectionTitle>
          <CommentBox dangerouslySetInnerHTML={{ __html: estimateInfo.comment }} />
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
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
`;

const DayTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
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
  gap: 16px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

const ItemImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
`;

const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
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

const ItemDescription = styled.p`
  font-size: 14px;
  color: #4b5563;
  margin: 0;
  line-height: 1.5;
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

  p {
    margin: 0 0 12px 0;

    &:last-child {
      margin: 0;
    }
  }

  ul, ol {
    margin: 0 0 12px 0;
    padding-left: 24px;

    &:last-child {
      margin: 0;
    }
  }
`;
