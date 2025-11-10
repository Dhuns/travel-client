import React, { FC, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { ChatMessage as ChatMessageType } from "@shared/types/chat";
import EstimateCard from "./EstimateCard";
import TypingIndicator from "./TypingIndicator";
import { AUTO_SCROLL_DELAY, UI_TEXT } from "@shared/constants/chat";

interface Props {
  messages: ChatMessageType[];
  isTyping?: boolean;
  hasMessages?: boolean;
  onSend?: (message: string) => void;
}

const ChatMessageList: FC<Props> = ({
  messages,
  isTyping = false,
  hasMessages = true,
  onSend,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 새 메시지가 추가되면 자동 스크롤 (더 부드럽게)
  useEffect(() => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, AUTO_SCROLL_DELAY);
    }
  }, [messages.length, isTyping]);

  return (
    <Container hasMessages={hasMessages}>
      <MessagesList hasMessages={hasMessages}>
        {/* Welcome message and input when no messages */}
        {messages.length === 0 && !isTyping && (
          <WelcomeMessageContainer>
            <WelcomeMessage>
              <WelcomeIcon>✈️</WelcomeIcon>
              <WelcomeText>{UI_TEXT.WELCOME_TITLE}</WelcomeText>
              <WelcomeSubtext>{UI_TEXT.WELCOME_SUBTITLE}</WelcomeSubtext>
            </WelcomeMessage>
            {onSend && (
              <WelcomeInputWrapper>
                <ChatInput onSend={onSend} disabled={isTyping} />
              </WelcomeInputWrapper>
            )}
          </WelcomeMessageContainer>
        )}

        {messages.map((message) => {
          // 견적서 카드 타입
          if (
            message.type === "estimate" &&
            message.metadata?.estimatePreview
          ) {
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
const Container = styled.div<{ hasMessages: boolean }>`
  flex: 1;
  overflow-y: auto;
  background-color: #ffffff;
  min-height: 0;
  ${({ hasMessages }) =>
    !hasMessages &&
    `
    display: flex;
    align-items: start;
    justify-content: center;
    padding-top: 10vh;
  `}
`;

const MessagesList = styled.div<{ hasMessages: boolean }>`
  padding: 0;
  min-height: ${({ hasMessages }) => (hasMessages ? "100%" : "auto")};
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const EstimateCardWrapper = styled.div`
  padding: 16px 24px;
  background-color: #f9f9f9;
`;

const WelcomeMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 32px;
`;

const WelcomeMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px 0;
  text-align: center;
`;

const WelcomeIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const WelcomeText = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
`;

const WelcomeSubtext = styled.p`
  font-size: 15px;
  color: #888;
  margin: 0;
`;

const WelcomeInputWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 0 24px 40px;
`;
