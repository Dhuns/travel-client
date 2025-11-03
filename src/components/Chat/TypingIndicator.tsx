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
  align-items: center;
  padding: 16px 24px;
`;

const Bubble = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 14px;
  background-color: #f0f0f0;
  border-radius: 18px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  margin: 0 2px;
  background-color: #999;
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite ease-in-out both;

  &:nth-of-type(1) {
    animation-delay: -0.32s;
  }

  &:nth-of-type(2) {
    animation-delay: -0.16s;
  }
`;

const TypingIndicator: React.FC = () => {
  return (
    <Container>
      <Bubble>
        <Dot />
        <Dot />
        <Dot />
      </Bubble>
    </Container>
  );
};

export default TypingIndicator;
