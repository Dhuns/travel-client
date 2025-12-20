import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

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

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--color-tumakr-maroon, #651d2a) 0%,
    #8b2438 100%
  );
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
  gap: 6px;
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
  background: linear-gradient(135deg, var(--color-tumakr-maroon, #651d2a) 0%, #8b2438 100%);
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

const TypingIndicator: React.FC = () => {
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
