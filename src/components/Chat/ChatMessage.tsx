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
        <MessageTime>{dayjs(timestamp).format("HH:mm")}</MessageTime>
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
  background-color: ${({ isUser }) => (isUser ? "transparent" : "#fafafa")};
  transition: background-color 0.15s;

  &:hover {
    background-color: ${({ isUser }) => (isUser ? "#f9f9f9" : "#f5f5f5")};
  }
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  max-width: 85%;
  display: flex;
  flex-direction: column;
  gap: 6px;
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
