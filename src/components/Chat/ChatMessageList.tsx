import React, { FC, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { ChatMessage as ChatMessageType } from '@/shared/types/chat';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import EstimateCard from './EstimateCard';

interface Props {
  messages: ChatMessageType[];
  isTyping?: boolean;
}

const ChatMessageList: FC<Props> = ({ messages, isTyping = false }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 새 메시지가 추가되면 자동 스크롤 (더 부드럽게)
  useEffect(() => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    }
  }, [messages.length, isTyping]);

  return (
    <Container>
      <MessagesList>
        {messages.map((message) => {
          // 견적서 카드 타입
          if (message.type === 'estimate' && message.metadata?.estimatePreview) {
            return (
              <EstimateCardWrapper key={message.id}>
                <EstimateCard estimate={message.metadata.estimatePreview} />
              </EstimateCardWrapper>
            );
          }

          // 일반 텍스트 메시지
          return <ChatMessage key={message.id} message={message} />;
        })}

        {/* 타이핑 인디케이터 */}
        {isTyping && <TypingIndicator />}

        {/* 자동 스크롤용 더미 엘리먼트 */}
        <div ref={messagesEndRef} />
      </MessagesList>
    </Container>
  );
};

export default ChatMessageList;

// Styled Components
const Container = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #ffffff;
`;

const MessagesList = styled.div`
  padding: 0;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const EstimateCardWrapper = styled.div`
  padding: 16px 24px;
  background-color: #f9f9f9;
`;
