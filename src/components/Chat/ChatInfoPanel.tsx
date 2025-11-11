import React, { FC } from "react";

import { ChatContext } from "@shared/types/chat";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import useChatStore from "@shared/store/chatStore";

interface Props {
  context: ChatContext;
  messageCount: number;
  batchId?: number;
}

const ChatInfoPanel: FC<Props> = ({ context, messageCount, batchId }) => {
  const {
    canGenerateEstimate,
    generateEstimateForSession,
    isGeneratingEstimate,
  } = useChatStore();

  const {
    destination,
    startDate,
    endDate,
    adults = 0,
    children = 0,
    infants = 0,
    budget,
    preferences = [],
  } = context;

  const handleGenerateEstimate = async () => {
    if (isGeneratingEstimate) return;
    const success = await generateEstimateForSession();
    if (success) {
      // Success message is now shown in chat, no need for alert
    }
  };

  // Calculate total days
  const days =
    startDate && endDate
      ? dayjs(endDate).diff(dayjs(startDate), "day") + 1
      : null;

  // Total travelers
  const totalPeople = adults + children + infants;

  return (
    <Container>
      {/* Header - Desktop only */}
      <Header>
        <Title>Trip Details</Title>
        <Badge>{messageCount} messages</Badge>
      </Header>

      {/* Collected Information */}
      <Section>
        <SectionTitle>📍 Collected Info</SectionTitle>

        {destination ? (
          <InfoItem>
            <Label>Destination</Label>
            <Value>{destination}</Value>
          </InfoItem>
        ) : (
          <EmptyState>Where would you like to go? 😊</EmptyState>
        )}

        {startDate && endDate && (
          <InfoItem>
            <Label>Travel Period</Label>
            <Value>
              {dayjs(startDate).format("YYYY.MM.DD")} ~{" "}
              {dayjs(endDate).format("MM.DD")}
              {days && ` (${days} days)`}
            </Value>
          </InfoItem>
        )}

        {totalPeople > 0 && (
          <InfoItem>
            <Label>Travelers</Label>
            <ValueList>
              {adults > 0 && (
                <ValueItem>
                  {adults} Adult{adults > 1 ? "s" : ""}
                </ValueItem>
              )}
              {children > 0 && (
                <ValueItem>
                  {children} Child{children > 1 ? "ren" : ""}
                </ValueItem>
              )}
              {infants > 0 && (
                <ValueItem>
                  {infants} Infant{infants > 1 ? "s" : ""}
                </ValueItem>
              )}
            </ValueList>
          </InfoItem>
        )}

        {budget && (
          <InfoItem>
            <Label>Budget</Label>
            <Value>₩{budget.toLocaleString()}</Value>
          </InfoItem>
        )}

        {preferences.length > 0 && (
          <InfoItem>
            <Label>Preferences</Label>
            <TagList>
              {preferences.map((pref, index) => (
                <Tag key={index}>{pref}</Tag>
              ))}
            </TagList>
          </InfoItem>
        )}
      </Section>

      {/* Generate Quote Button */}
      {canGenerateEstimate() && !batchId && (
        <EstimateButtonSection>
          <GenerateButton
            onClick={handleGenerateEstimate}
            disabled={isGeneratingEstimate}
          >
            {isGeneratingEstimate
              ? "Creating your quote..."
              : "Generate My Quote"}
          </GenerateButton>
          <EstimateHint>
            All set! Click to create your personalized travel plan
          </EstimateHint>
        </EstimateButtonSection>
      )}

      {/* View Generated Quote */}
      {batchId && (
        <EstimateButtonSection>
          <ViewQuotationButton
            onClick={() => window.open(`/quotation/${batchId}`, "_blank")}
          >
            📋 View My Quote
          </ViewQuotationButton>
          <EstimateHint>
            Our travel experts are reviewing ✨<br />
            Final quote will be sent within 24 hours
          </EstimateHint>
        </EstimateButtonSection>
      )}

      {/* Help Section */}
      <HelpSection>
        <HelpTitle>💡 How It Works</HelpTitle>
        <HelpList>
          <HelpItem>📍 Tell us where, when, and how many travelers</HelpItem>
          <HelpItem>
            🎨 Share what kind of experience you're looking for
          </HelpItem>
          <HelpItem>💰 Let us know your budget range (optional)</HelpItem>
          <HelpItem>✏️ You can update or add info anytime during chat</HelpItem>
          <HelpItem>🗣️ We support both English and Korean</HelpItem>
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
  background-color: #ffffff;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;

const Header = styled.div`
  padding: 18px 4px;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1280px) {
    display: none;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
`;

const Badge = styled.span`
  padding: 4px 10px;
  background-color: #651d2a;
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
  background-color: #651d2a;
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
    content: "•";
    position: absolute;
    left: -13px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const EstimateButtonSection = styled.div`
  padding: 16px;
  margin: 0 4px 16px 4px;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  text-align: center;
`;

const GenerateButton = styled.button`
  width: 100%;
  padding: 14px 20px;
  background-color: #651d2a;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(101, 29, 42, 0.2);

  &:hover:not(:disabled) {
    background-color: #4a1520;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(101, 29, 42, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #ccc;
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const ViewQuotationButton = styled.button`
  width: 100%;
  padding: 14px 20px;
  background-color: #ffffff;
  color: #9ca3af;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    color: #6b7280;
  }

  &:active {
    transform: translateY(0);
  }
`;

const EstimateCreatedBadge = styled.div`
  padding: 14px 20px;
  background-color: #ffffff;
  color: #9ca3af;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const EstimateHint = styled.p`
  margin: 12px 0 0 0;
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
`;
