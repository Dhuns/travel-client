import React, { FC } from 'react';
import styled from '@emotion/styled';
import { ChatContext } from '@/shared/types/chat';
import dayjs from 'dayjs';

interface Props {
  context: ChatContext;
  messageCount: number;
}

const ChatInfoPanel: FC<Props> = ({ context, messageCount }) => {
  const {
    destination,
    startDate,
    endDate,
    adults = 0,
    children = 0,
    infants = 0,
    budget,
    preferences = []
  } = context;

  // 총 일수 계산
  const days = startDate && endDate
    ? dayjs(endDate).diff(dayjs(startDate), 'day') + 1
    : null;

  // 인원 합계
  const totalPeople = adults + children + infants;

  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <Title>여행 정보</Title>
        <Badge>{messageCount}개 메시지</Badge>
      </Header>

      {/* 추출된 정보 */}
      <Section>
        <SectionTitle>📍 추출된 정보</SectionTitle>

        {destination ? (
          <InfoItem>
            <Label>목적지</Label>
            <Value>{destination}</Value>
          </InfoItem>
        ) : (
          <EmptyState>아직 목적지가 입력되지 않았습니다</EmptyState>
        )}

        {startDate && endDate && (
          <InfoItem>
            <Label>여행 기간</Label>
            <Value>
              {dayjs(startDate).format('YYYY.MM.DD')} ~ {dayjs(endDate).format('MM.DD')}
              {days && ` (${days}일)`}
            </Value>
          </InfoItem>
        )}

        {totalPeople > 0 && (
          <InfoItem>
            <Label>인원</Label>
            <ValueList>
              {adults > 0 && <ValueItem>성인 {adults}명</ValueItem>}
              {children > 0 && <ValueItem>소아 {children}명</ValueItem>}
              {infants > 0 && <ValueItem>유아 {infants}명</ValueItem>}
            </ValueList>
          </InfoItem>
        )}

        {budget && (
          <InfoItem>
            <Label>예산</Label>
            <Value>{budget.toLocaleString()}원</Value>
          </InfoItem>
        )}

        {preferences.length > 0 && (
          <InfoItem>
            <Label>선호도</Label>
            <TagList>
              {preferences.map((pref, index) => (
                <Tag key={index}>{pref}</Tag>
              ))}
            </TagList>
          </InfoItem>
        )}
      </Section>

      {/* 도움말 */}
      <HelpSection>
        <HelpTitle>💡 도움말</HelpTitle>
        <HelpList>
          <HelpItem>여행지, 날짜, 인원을 알려주세요</HelpItem>
          <HelpItem>원하는 여행 스타일을 설명해주세요</HelpItem>
          <HelpItem>예산이 있다면 함께 알려주세요</HelpItem>
          <HelpItem>언제든 견적을 수정할 수 있습니다</HelpItem>
        </HelpList>
      </HelpSection>
    </Container>
  );
};

export default ChatInfoPanel;

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;

const Header = styled.div`
  padding: 18px 4px;
  background-color: transparent;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
`;

const Badge = styled.span`
  padding: 4px 10px;
  background-color: #007AFF;
  color: #ffffff;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
`;

const Section = styled.div`
  padding: 14px;
  background-color: #ffffff;
  margin: 14px 0;
  border-radius: 10px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
`;

const SectionTitle = styled.h3`
  margin: 0 0 14px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
`;

const InfoItem = styled.div`
  margin-bottom: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.div`
  font-size: 12px;
  color: #888;
  margin-bottom: 4px;
`;

const Value = styled.div`
  font-size: 14px;
  color: #1a1a1a;
  font-weight: 500;
`;

const ValueList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const ValueItem = styled.span`
  padding: 4px 8px;
  background-color: #f5f5f5;
  border-radius: 6px;
  font-size: 13px;
  color: #1a1a1a;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  padding: 4px 10px;
  background-color: #007AFF;
  color: #ffffff;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

const EmptyState = styled.div`
  padding: 14px;
  text-align: center;
  color: #aaa;
  font-size: 13px;
  background-color: #f8f8f8;
  border-radius: 8px;
`;

const HelpSection = styled.div`
  padding: 14px;
  margin: 0 4px 16px 4px;
  background-color: #fffbf0;
  border-radius: 10px;
  border: 1px solid #ffe4a3;
`;

const HelpTitle = styled.h4`
  margin: 0 0 10px 0;
  font-size: 14px;
  font-weight: 600;
  color: #f57c00;
`;

const HelpList = styled.ul`
  margin: 0;
  padding: 0 0 0 18px;
  list-style: none;
`;

const HelpItem = styled.li`
  font-size: 13px;
  color: #e67300;
  margin-bottom: 5px;
  position: relative;

  &:before {
    content: '•';
    position: absolute;
    left: -13px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
