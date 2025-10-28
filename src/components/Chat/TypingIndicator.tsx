import React, { FC } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const TypingIndicator: FC = () => {
  return (
    <Container>
      <Bubble>
        <Dot delay="0s" />
        <Dot delay="0.2s" />
        <Dot delay="0.4s" />
      </Bubble>
    </Container>
  );
};

export default TypingIndicator;

// Animations
const bounce = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-8px);
  }
`;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 12px 24px;
  background-color: #fafafa;
  transition: background-color 0.15s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Bubble = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 14px;
  border-radius: 8px;
  background-color: #f0f0f0;
`;

const Dot = styled.div<{ delay: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #aaa;
  animation: ${bounce} 1.4s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay};
`;
