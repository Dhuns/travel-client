import { FC } from "react";

import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { GenerationProgress } from "@shared/store/chatStore";
import { ChatContext } from "@shared/types/chat";
import dayjs from "dayjs";
import { Info, Loader2 } from "lucide-react";

interface Props {
  context: ChatContext;
  messageCount: number;
  batchId?: number;
  isGeneratingEstimate?: boolean;
  generationProgress?: GenerationProgress | null;
}

const ChatInfoPanel: FC<Props> = ({
  context,
  messageCount,
  batchId,
  isGeneratingEstimate,
  generationProgress,
}) => {
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

  // Calculate total days
  const days =
    startDate && endDate ? dayjs(endDate).diff(dayjs(startDate), "day") + 1 : null;

  // Total travelers
  const totalPeople = adults + children + infants;

  return (
    <Container>
      {/* Estimate Generation Progress */}
      {isGeneratingEstimate && (
        <ProgressSection>
          <ProgressHeader>
            <ProgressIconWrapper>
              <Loader2 className="w-5 h-5 animate-spin" />
            </ProgressIconWrapper>
            <ProgressTitle>Creating Your Itinerary</ProgressTitle>
          </ProgressHeader>
          <ProgressContent>
            <ProgressBarWrapper>
              <ProgressBar progress={generationProgress?.progress || 0} />
            </ProgressBarWrapper>
            <ProgressStep>
              <ProgressStepIcon active={generationProgress?.step === 'analyzing'}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </ProgressStepIcon>
              <ProgressStepText active={generationProgress?.step === 'analyzing'}>
                Analyzing preferences
              </ProgressStepText>
              {generationProgress?.step === 'analyzing' && <ProgressDots />}
            </ProgressStep>
            <ProgressStep>
              <ProgressStepIcon active={generationProgress?.step === 'creating'}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v18" />
                  <path d="M3 12h18" />
                </svg>
              </ProgressStepIcon>
              <ProgressStepText active={generationProgress?.step === 'creating'}>
                Creating itinerary
              </ProgressStepText>
              {generationProgress?.step === 'creating' && <ProgressDots />}
            </ProgressStep>
            <ProgressStep>
              <ProgressStepIcon active={generationProgress?.step === 'optimizing'}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </ProgressStepIcon>
              <ProgressStepText active={generationProgress?.step === 'optimizing'}>
                Optimizing route
              </ProgressStepText>
              {generationProgress?.step === 'optimizing' && <ProgressDots />}
            </ProgressStep>
            <ProgressStep>
              <ProgressStepIcon active={generationProgress?.step === 'finalizing'}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </ProgressStepIcon>
              <ProgressStepText active={generationProgress?.step === 'finalizing'}>
                Finalizing estimate
              </ProgressStepText>
              {generationProgress?.step === 'finalizing' && <ProgressDots />}
            </ProgressStep>
          </ProgressContent>
          <ProgressHint>This usually takes 10-20 seconds...</ProgressHint>
        </ProgressSection>
      )}

      {/* Collected Information - 최상단 */}
      <Section>
        <SectionTitle>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
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
              {dayjs(startDate).format("YYYY.MM.DD")} ~ {dayjs(endDate).format("MM.DD")}
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

      {/* Process Explanation */}
      <ProcessSection>
        <ProcessHeader>
          <ProcessIcon>
            <Info className="w-5 h-5" />
          </ProcessIcon>
          <ProcessTitle>How It Works</ProcessTitle>
        </ProcessHeader>
        <ProcessSteps>
          <ProcessStep>
            <StepNumber active>1</StepNumber>
            <StepContent>
              <StepLabel active>Chat with AI</StepLabel>
              <StepDescription>
                Tell us about your trip - where you want to go, when, and who's traveling.
                Our AI will guide you through the planning.
              </StepDescription>
            </StepContent>
          </ProcessStep>
          <StepConnector />
          <ProcessStep>
            <StepNumber>2</StepNumber>
            <StepContent>
              <StepLabel>AI Creates Itinerary</StepLabel>
              <StepDescription>
                Once we have your details, AI automatically creates a personalized daily
                itinerary with recommended destinations.
              </StepDescription>
            </StepContent>
          </ProcessStep>
          <StepConnector />
          <ProcessStep>
            <StepNumber>3</StepNumber>
            <StepContent>
              <StepLabel>Expert Review</StepLabel>
              <StepDescription>
                Our travel experts add accommodations, transportation, and calculate
                accurate pricing for your complete package.
              </StepDescription>
            </StepContent>
          </ProcessStep>
          <StepConnector />
          <ProcessStep>
            <StepNumber>4</StepNumber>
            <StepContent>
              <StepLabel>Final Quote</StepLabel>
              <StepDescription>
                Receive your complete, bookable travel package with all details
                via email. Ready to book!
              </StepDescription>
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
  color: var(--color-tumakr-maroon);
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
  background: ${({ active }) =>
    active
      ? "linear-gradient(135deg, var(--color-tumakr-maroon) 0%, var(--color-tumakr-maroon) 100%)"
      : "#e5e5e5"};
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
  color: ${({ active }) => (active ? "var(--color-tumakr-maroon)" : "#666")};
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
  background-color: var(--color-tumakr-maroon);
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

// Progress Section Styles
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const dots = keyframes`
  0%, 20% { content: '.'; }
  40% { content: '..'; }
  60%, 100% { content: '...'; }
`;

const progressPulse = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ProgressSection = styled.div`
  margin: 14px 0;
  padding: 16px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 14px;
  border: 1px solid rgba(59, 130, 246, 0.2);
`;

const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
`;

const ProgressIconWrapper = styled.div`
  color: var(--color-tumakr-maroon);
  display: flex;
  align-items: center;

  svg {
    animation: ${spin} 1s linear infinite;
  }
`;

const ProgressTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
`;

const ProgressContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background: linear-gradient(90deg, var(--color-tumakr-maroon) 0%, #b91c3c 50%, var(--color-tumakr-maroon) 100%);
  background-size: 200% 100%;
  animation: ${progressPulse} 1.5s ease-in-out infinite;
  border-radius: 3px;
  transition: width 0.5s ease;
`;

const ProgressStep = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
`;

const ProgressStepIcon = styled.div<{ active?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ active }) => active ? 'var(--color-tumakr-maroon)' : '#e5e7eb'};
  color: ${({ active }) => active ? 'white' : '#9ca3af'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
`;

const ProgressStepText = styled.span<{ active?: boolean }>`
  font-size: 13px;
  color: ${({ active }) => active ? '#1a1a1a' : '#9ca3af'};
  font-weight: ${({ active }) => active ? '600' : '400'};
  transition: all 0.3s ease;
`;

const ProgressDots = styled.span`
  font-size: 13px;
  color: var(--color-tumakr-maroon);
  font-weight: 600;

  &::after {
    content: '...';
    animation: ${pulse} 1s infinite;
  }
`;

const ProgressHint = styled.div`
  margin-top: 12px;
  font-size: 12px;
  color: #6b7280;
  text-align: center;
`;
