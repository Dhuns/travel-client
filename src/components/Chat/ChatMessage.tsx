import React, { FC } from "react";

import { ChatMessage as ChatMessageType } from "@shared/types/chat";
import dayjs from "dayjs";
import styled from "@emotion/styled";

interface Props {
  message: ChatMessageType;
}

const ChatMessage: FC<Props> = ({ message }) => {
  const { role, content, timestamp } = message;
  const isUser = role === "user";

  return (
    <MessageContainer isUser={isUser}>
      <MessageBubble isUser={isUser}>
        <MessageContent>{content}</MessageContent>
        {!isUser && <MessageTime>{dayjs(timestamp).format("HH:mm")}</MessageTime>}
      </MessageBubble>
    </MessageContainer>
  );
};

export default ChatMessage;

// Styled Components
const MessageContainer = styled.div<{ isUser: boolean }>`
  display: flex;
  justify-content: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  padding: 12px 24px;
  background-color: transparent;
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  max-width: 85%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: ${({ isUser }) => (isUser ? "12px 16px" : "0")};
  background-color: ${({ isUser }) => (isUser ? "#f0f0f0" : "transparent")};
  border-radius: ${({ isUser }) => (isUser ? "18px 4px 18px 18px" : "0")};
`;

const MessageContent = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.65;
  white-space: pre-wrap;
  color: #1a1a1a;
  word-break: break-word;
`;

const MessageTime = styled.span`
  font-size: 11px;
  color: #aaa;
  margin-top: 2px;
`;
