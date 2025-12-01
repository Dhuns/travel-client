import React from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1.0);
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

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #651d2a 0%, #8b3a47 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const DotsWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 18px;
  background-color: #f3f4f6;
  border-radius: 20px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  margin: 0 3px;
  background-color: #9ca3af;
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

const TypingIndicator: React.FC = () => {
  return (
    <Container>
      <Avatar>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      </Avatar>
      <DotsWrapper>
        <Dot />
        <Dot />
        <Dot />
      </DotsWrapper>
    </Container>
  );
};

export default TypingIndicator;
