import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { GenerationProgress } from "@shared/store/chatStore";
import React from "react";

interface Props {
  progress?: GenerationProgress | null;
}

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.4;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(101, 29, 42, 0.3);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(101, 29, 42, 0);
  }
`;

const sparkle = keyframes`
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.1) rotate(5deg);
  }
`;

const progressPulse = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 24px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  animation: ${fadeIn} 0.3s ease;

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

const Avatar = styled.div<{ isGenerating?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ isGenerating }) =>
    isGenerating
      ? "linear-gradient(135deg, var(--color-tumakr-dark-blue) 0%, #2161c8 100%)"
      : "linear-gradient(135deg, var(--color-tumakr-maroon, #651d2a) 0%, #8b2438 100%)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  animation: ${pulse} 2s infinite;

  svg {
    animation: ${sparkle} 3s ease-in-out infinite;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  max-width: 350px;
`;

const DotsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 16px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #f3f4f6 100%);
  border-radius: 20px;
  border-top-left-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background: linear-gradient(
    135deg,
    var(--color-tumakr-maroon, #651d2a) 0%,
    #8b2438 100%
  );
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite ease-in-out both;

  &:nth-of-type(1) {
    animation-delay: -0.32s;
  }

  &:nth-of-type(2) {
    animation-delay: -0.16s;
  }

  &:nth-of-type(3) {
    animation-delay: 0s;
  }
`;

const ThinkingText = styled.span`
  font-size: 12px;
  color: #9ca3af;
  padding-left: 4px;
`;

// Progress-specific components
const ProgressCard = styled.div`
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-radius: 16px;
  padding: 16px 20px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
`;

const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;

const ProgressIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--color-tumakr-dark-blue) 0%, #2161c8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  svg {
    animation: ${sparkle} 2s ease-in-out infinite;
  }
`;

const ProgressMessage = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1e40af;
`;

const ProgressBarWrapper = styled.div`
  height: 6px;
  background: rgba(59, 130, 246, 0.2);
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background: linear-gradient(
    90deg,
    var(--color-tumakr-dark-blue) 0%,
    #2161c8 50%,
    var(--color-tumakr-dark-blue) 100%
  );
  background-size: 200% 100%;
  animation: ${progressPulse} 2s linear infinite;
  border-radius: 3px;
  transition: width 0.5s ease;
`;

const ProgressSteps = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const ProgressStep = styled.span<{ active?: boolean; completed?: boolean }>`
  font-size: 10px;
  color: ${({ active, completed }) =>
    active ? "#2563eb" : completed ? "#10b981" : "#9ca3af"};
  font-weight: ${({ active }) => (active ? "600" : "400")};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TypingIndicator: React.FC<Props> = ({ progress }) => {
  // If we have progress info, show detailed progress UI
  if (progress) {
    const steps = ["analyzing", "creating", "optimizing", "finalizing"];
    const currentIndex = steps.indexOf(progress.step);

    return (
      <Container>
        <Avatar isGenerating>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </Avatar>
        <ContentWrapper>
          <ProgressCard>
            <ProgressHeader>
              <ProgressIcon>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </ProgressIcon>
              <ProgressMessage>{progress.message}</ProgressMessage>
            </ProgressHeader>
            <ProgressBarWrapper>
              <ProgressBar progress={progress.progress} />
            </ProgressBarWrapper>
            <ProgressSteps>
              <ProgressStep
                completed={currentIndex > 0}
                active={progress.step === "analyzing"}
              >
                {currentIndex > 0 ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                ) : null}
                Analyze
              </ProgressStep>
              <ProgressStep
                completed={currentIndex > 1}
                active={progress.step === "creating"}
              >
                {currentIndex > 1 ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                ) : null}
                Create
              </ProgressStep>
              <ProgressStep
                completed={currentIndex > 2}
                active={progress.step === "optimizing"}
              >
                {currentIndex > 2 ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                ) : null}
                Optimize
              </ProgressStep>
              <ProgressStep
                completed={currentIndex > 3}
                active={progress.step === "finalizing"}
              >
                Finalize
              </ProgressStep>
            </ProgressSteps>
          </ProgressCard>
        </ContentWrapper>
      </Container>
    );
  }

  // Default typing indicator
  return (
    <Container>
      <Avatar>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </Avatar>
      <ContentWrapper>
        <DotsWrapper>
          <Dot />
          <Dot />
          <Dot />
        </DotsWrapper>
        <ThinkingText>AI is thinking...</ThinkingText>
      </ContentWrapper>
    </Container>
  );
};

export default TypingIndicator;
