import React, { FC } from "react";

import { ChatMessage as ChatMessageType } from "@shared/types/chat";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  message: ChatMessageType;
}

const ChatMessage: FC<Props> = ({ message }) => {
  const { role, content, timestamp } = message;
  const isUser = role === "user";

  return (
    <MessageContainer isUser={isUser}>
      <MessageBubble isUser={isUser}>
        <MessageContent isUser={isUser}>
          {isUser ? (
            content
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          )}
        </MessageContent>
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

const MessageContent = styled.div<{ isUser: boolean }>`
  margin: 0;
  font-size: 15px;
  line-height: 1.65;
  white-space: ${({ isUser }) => (isUser ? "pre-wrap" : "normal")};
  color: #1a1a1a;
  word-break: break-word;

  /* Markdown 스타일링 (assistant 메시지에만 적용) */
  ${({ isUser }) => !isUser && `
    p {
      margin: 0 0 12px 0;
      &:last-child {
        margin-bottom: 0;
      }
    }

    h1, h2, h3, h4, h5, h6 {
      margin: 16px 0 8px 0;
      font-weight: 600;
      line-height: 1.4;
      &:first-of-type {
        margin-top: 0;
      }
    }

    h1 { font-size: 24px; }
    h2 { font-size: 20px; }
    h3 { font-size: 18px; }
    h4 { font-size: 16px; }
    h5 { font-size: 15px; }
    h6 { font-size: 14px; }

    ul, ol {
      margin: 8px 0;
      padding-left: 24px;
    }

    li {
      margin: 4px 0;
    }

    code {
      background-color: #f5f5f5;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
      font-size: 14px;
    }

    pre {
      background-color: #f5f5f5;
      padding: 12px;
      border-radius: 6px;
      overflow-x: auto;
      margin: 12px 0;

      code {
        background-color: transparent;
        padding: 0;
      }
    }

    blockquote {
      border-left: 3px solid #ddd;
      padding-left: 12px;
      margin: 12px 0;
      color: #666;
    }

    a {
      color: #0066cc;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }

    hr {
      border: none;
      border-top: 1px solid #e0e0e0;
      margin: 16px 0;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin: 12px 0;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 8px 12px;
      text-align: left;
    }

    th {
      background-color: #f5f5f5;
      font-weight: 600;
    }

    strong {
      font-weight: 600;
    }

    em {
      font-style: italic;
    }
  `}
`;

const MessageTime = styled.span`
  font-size: 11px;
  color: #aaa;
  margin-top: 2px;
`;
