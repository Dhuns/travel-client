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
      {/* Collected Information - 최상단 */}
      <Section>
        <SectionTitle>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Collected Info
        </SectionTitle>

        {destination ? (
          <InfoItem>
            <Label>Destination</Label>
            <Value>{destination}</Value>
          </InfoItem>
        ) : (
          <EmptyState>Where would you like to go?</EmptyState>
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
            <Value>${budget.toLocaleString()}</Value>
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
            {isGeneratingEstimate ? (
              <>
                <LoadingSpinner />
                Creating your quote...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
                Generate AI Itinerary
              </>
            )}
          </GenerateButton>
          <EstimateHint>
            Get your AI-suggested daily destinations. Our experts will add accommodations & transport.
          </EstimateHint>
        </EstimateButtonSection>
      )}

      {/* Process Explanation - Collected Info 아래 */}
      <ProcessSection>
        <ProcessHeader>
          <ProcessIcon>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
          </ProcessIcon>
          <ProcessTitle>How It Works</ProcessTitle>
        </ProcessHeader>
        <ProcessSteps>
          <ProcessStep>
            <StepNumber active>1</StepNumber>
            <StepContent>
              <StepLabel active>AI Draft</StepLabel>
              <StepDescription>AI creates a daily itinerary with recommended destinations and activities only. (No pricing yet)</StepDescription>
            </StepContent>
          </ProcessStep>
          <StepConnector />
          <ProcessStep>
            <StepNumber>2</StepNumber>
            <StepContent>
              <StepLabel>Expert Enhancement</StepLabel>
              <StepDescription>Our travel experts review your draft and add accommodations, transportation, tickets, and calculate accurate pricing.</StepDescription>
            </StepContent>
          </ProcessStep>
          <StepConnector />
          <ProcessStep>
            <StepNumber>3</StepNumber>
            <StepContent>
              <StepLabel>Final Quote</StepLabel>
              <StepDescription>Receive your complete, bookable travel package with all details and final pricing via email.</StepDescription>
            </StepContent>
          </ProcessStep>
        </ProcessSteps>
      </ProcessSection>
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
  padding: 0 16px 16px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
`;

// Process Section Styles
const ProcessSection = styled.div`
  margin: 14px 0;
  padding: 16px;
  background: linear-gradient(135deg, #faf5f6 0%, #f5f0f1 100%);
  border-radius: 14px;
  border: 1px solid rgba(101, 29, 42, 0.1);
`;

const ProcessHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
`;

const ProcessIcon = styled.div`
  color: #651d2a;
  display: flex;
  align-items: center;
`;

const ProcessTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
`;

const ProcessSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ProcessStep = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const StepNumber = styled.div<{ active?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ active }) => (active ? "linear-gradient(135deg, #651d2a 0%, #8b3a47 100%)" : "#e5e5e5")};
  color: ${({ active }) => (active ? "#ffffff" : "#888")};
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
  padding-bottom: 8px;
`;

const StepLabel = styled.div<{ active?: boolean }>`
  font-size: 13px;
  font-weight: 600;
  color: ${({ active }) => (active ? "#651d2a" : "#666")};
  margin-bottom: 2px;
`;

const StepDescription = styled.div`
  font-size: 12px;
  color: #888;
  line-height: 1.4;
`;

const StepConnector = styled.div`
  width: 2px;
  height: 12px;
  background: #e0e0e0;
  margin-left: 11px;
`;


// Section Styles
const Section = styled.div`
  padding: 14px;
  background-color: #ffffff;
  margin: 14px 0;
  border-radius: 12px;
  border: 1px solid #e8e8e8;
`;

const SectionTitle = styled.h3`
  margin: 0 0 14px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 8px;
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
  padding: 4px 10px;
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

// Estimate Button Styles
const EstimateButtonSection = styled.div`
  padding: 16px;
  margin: 0 0 14px 0;
  background: linear-gradient(135deg, #651d2a 0%, #8b3a47 100%);
  border-radius: 14px;
  text-align: center;
`;

const GenerateButton = styled.button`
  width: 100%;
  padding: 14px 20px;
  background-color: #ffffff;
  color: #651d2a;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background-color: #f5f5f5;
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background-color: rgba(255, 255, 255, 0.6);
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #651d2a;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const EstimateHint = styled.p`
  margin: 12px 0 0 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
`;

