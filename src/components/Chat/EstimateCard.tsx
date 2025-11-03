import React, { FC } from "react";

import { EstimatePreview } from "@shared/types/chat";
import styled from "@emotion/styled";

interface Props {
  estimate: EstimatePreview;
}

const EstimateCard: FC<Props> = ({ estimate }) => {
  const { title, totalAmount, adults, children, infants, items } = estimate;
  const totalPeople = adults + children + infants;

  return (
    <Card>
      <Header>
        <Title>{title}</Title>
        <Amount>{totalAmount.toLocaleString()}원</Amount>
      </Header>
      <Summary>
        <SummaryItem>
          <strong>인원:</strong> 총 {totalPeople}명 (성인 {adults}, 소아{" "}
          {children}, 유아 {infants})
        </SummaryItem>
      </Summary>
      <ItemList>
        {items.slice(0, 3).map((item, index) => (
          <Item key={index}>
            <ItemDay>Day {item.day}</ItemDay>
            <ItemName>{item.name}</ItemName>
            <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
          </Item>
        ))}
        {items.length > 3 && (
          <MoreItems>...외 {items.length - 3}개 항목</MoreItems>
        )}
      </ItemList>
      <Footer>
        <DetailsButton>견적서 상세보기</DetailsButton>
      </Footer>
    </Card>
  );
};

export default EstimateCard;

// Styled Components
const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin: 8px 0;
`;

const Header = styled.div`
  padding: 16px 20px;
  background-color: #007aff;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

const Amount = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Summary = styled.div`
  padding: 12px 20px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #e8e8e8;
`;

const SummaryItem = styled.div`
  font-size: 13px;
  color: #555;
`;

const ItemList = styled.div`
  padding: 8px 20px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;
`;

const ItemDay = styled.span`
  color: #888;
  margin-right: 12px;
  font-size: 12px;
`;

const ItemName = styled.span`
  flex: 1;
`;

const ItemPrice = styled.span`
  font-weight: 500;
  color: #333;
`;

const MoreItems = styled.div`
  text-align: center;
  font-size: 12px;
  color: #888;
  padding: 8px 0;
`;

const Footer = styled.div`
  padding: 12px 20px;
  text-align: right;
  background-color: #f8f8f8;
  border-top: 1px solid #e8e8e8;
`;

const DetailsButton = styled.button`
  background-color: #007aff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #005bb5;
  }
`;
