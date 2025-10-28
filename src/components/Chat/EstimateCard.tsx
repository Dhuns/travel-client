import React, { FC } from 'react';
import styled from '@emotion/styled';
import { EstimatePreview } from '@/shared/types/chat';
import dayjs from 'dayjs';

interface Props {
  estimate: EstimatePreview;
  onViewDetail?: () => void;
}

const EstimateCard: FC<Props> = ({ estimate, onViewDetail }) => {
  const {
    title,
    startDate,
    endDate,
    totalAmount,
    adults,
    children,
    infants,
    items = []
  } = estimate;

  // 총 일수 계산
  const days = dayjs(endDate).diff(dayjs(startDate), 'day') + 1;

  // 인원 표시
  const travelers = [
    adults > 0 && `성인 ${adults}명`,
    children > 0 && `소아 ${children}명`,
    infants > 0 && `유아 ${infants}명`
  ].filter(Boolean).join(', ');

  return (
    <Card>
      <Header>
        <Title>📋 {title}</Title>
      </Header>

      <Content>
        <InfoRow>
          <Label>📅 여행 기간</Label>
          <Value>
            {dayjs(startDate).format('YYYY.MM.DD')} ~ {dayjs(endDate).format('MM.DD')} ({days}일)
          </Value>
        </InfoRow>

        <InfoRow>
          <Label>👥 인원</Label>
          <Value>{travelers}</Value>
        </InfoRow>

        <Divider />

        <InfoRow>
          <Label>💰 총 금액</Label>
          <TotalAmount>{totalAmount.toLocaleString()}원</TotalAmount>
        </InfoRow>

        {items.length > 0 && (
          <>
            <Divider />
            <ItemsPreview>
              <ItemsTitle>포함 내역 ({items.length}개 항목)</ItemsTitle>
              {items.slice(0, 3).map((item, index) => (
                <Item key={index}>
                  <ItemName>• {item.name}</ItemName>
                  <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
                </Item>
              ))}
              {items.length > 3 && (
                <MoreItems>외 {items.length - 3}개 항목...</MoreItems>
              )}
            </ItemsPreview>
          </>
        )}
      </Content>

      {onViewDetail && (
        <Footer>
          <ViewDetailButton onClick={onViewDetail}>
            상세보기
          </ViewDetailButton>
        </Footer>
      )}
    </Card>
  );
};

export default EstimateCard;

// Styled Components
const Card = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const Header = styled.div`
  padding: 14px 16px;
  background-color: #007AFF;
  color: #ffffff;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

const Content = styled.div`
  padding: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  font-size: 14px;
  color: #888;
`;

const Value = styled.span`
  font-size: 14px;
  color: #1a1a1a;
  font-weight: 500;
`;

const TotalAmount = styled.span`
  font-size: 18px;
  color: #007AFF;
  font-weight: 700;
`;

const Divider = styled.hr`
  margin: 10px 0;
  border: none;
  border-top: 1px solid #e8e8e8;
`;

const ItemsPreview = styled.div`
  margin-top: 6px;
`;

const ItemsTitle = styled.div`
  font-size: 13px;
  color: #888;
  margin-bottom: 6px;
  font-weight: 500;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 13px;
`;

const ItemName = styled.span`
  color: #1a1a1a;
`;

const ItemPrice = styled.span`
  color: #888;
`;

const MoreItems = styled.div`
  padding: 4px 0;
  font-size: 13px;
  color: #aaa;
  text-align: center;
`;

const Footer = styled.div`
  padding: 12px 16px;
  background-color: #f8f8f8;
  border-top: 1px solid #e8e8e8;
`;

const ViewDetailButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: #007AFF;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background-color: #0051D5;
  }
`;
