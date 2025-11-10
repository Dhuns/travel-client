import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { EstimatePreview } from "@shared/types/chat";
import styled from "@emotion/styled";
import CryptoJS from 'crypto-js';

interface Props {
  estimate: EstimatePreview;
  batchId?: number;
}

const EstimateCard: FC<Props> = ({ estimate, batchId }) => {
  const { title, totalAmount, adults, children, infants, items } = estimate;
  const totalPeople = adults + children + infants;
  const router = useRouter();

  const handleViewDetails = () => {
    if (!batchId) {
      console.error('[EstimateCard] No batchId provided');
      return;
    }

    // Encrypt batchId using same method as backend
    const ENCRYPTION_KEY = 'ONE_DAY_KOREA';
    const key = ENCRYPTION_KEY.padEnd(32, ' ');
    const cipher = CryptoJS.AES.encrypt(batchId.toString(), CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(''),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });
    const hash = cipher.toString();
    const encodedHash = encodeURIComponent(hash);

    console.log('[EstimateCard] Navigating to quotation:', {
      batchId,
      hash,
      encodedHash,
      url: `/quotation/${encodedHash}`
    });

    router.push(`/quotation/${encodedHash}`);
  };

  return (
    <Card>
      <Header>
        <Title>{title}</Title>
        <Amount>${totalAmount.toLocaleString()}</Amount>
      </Header>
      <Summary>
        <SummaryItem>
          <strong>Travelers:</strong> Total {totalPeople} people (Adults {adults}, Children {children}, Infants {infants})
        </SummaryItem>
      </Summary>
      <ItemList>
        {items.slice(0, 3).map((item, index) => (
          <Item key={index}>
            <ItemDay>Day {item.day}</ItemDay>
            <ItemName>{item.name}</ItemName>
            <ItemPrice>${item.price.toLocaleString()}</ItemPrice>
          </Item>
        ))}
        {items.length > 3 && (
          <MoreItems>...and {items.length - 3} more items</MoreItems>
        )}
      </ItemList>

      <Footer>
        <DetailsButton onClick={handleViewDetails}>
          View My Quote
        </DetailsButton>
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
  text-align: center;
  background-color: #f8f8f8;
  border-top: 1px solid #e8e8e8;
`;

const DetailsButton = styled.button`
  background-color: #007aff;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;

  &:hover {
    background-color: #005bb5;
  }
`;
