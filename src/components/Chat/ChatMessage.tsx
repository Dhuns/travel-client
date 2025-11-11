import React, { FC } from "react";

import { ChatMessage as ChatMessageType } from "@shared/types/chat";
import { aesEncrypt } from "@shared/utils/crypto";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  message: ChatMessageType;
}

const ChatMessage: FC<Props> = ({ message }) => {
  const { role, content, timestamp, type, metadata } = message;
  const isUser = role === "user";

  // Handle estimate-type messages
  if (type === "estimate" && metadata?.batchId) {
    // Generate encrypted hash for the quotation link
    const hash = aesEncrypt(String(metadata.batchId));
    const quotationLink = `/quotation/${encodeURIComponent(hash)}`;

    return (
      <MessageContainer isUser={false}>
        <MessageBubble isUser={false}>
          <EstimateCard>
            <EstimateHeader>
              <EstimateIcon>✨</EstimateIcon>
              <EstimateTitle>Quotation Generated!</EstimateTitle>
            </EstimateHeader>
            <EstimateContent>
              <EstimateInfo>
                <InfoLabel>Total Amount</InfoLabel>
                <InfoValue>${metadata.totalAmount?.toLocaleString()}</InfoValue>
              </EstimateInfo>
              <EstimateInfo>
                <InfoLabel>Items</InfoLabel>
                <InfoValue>{metadata.itemCount}</InfoValue>
              </EstimateInfo>
            </EstimateContent>
            <EstimateMessage>{content}</EstimateMessage>
            <EstimateActions>
              <ViewQuotationButton
                href={quotationLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Quotation Details →
              </ViewQuotationButton>
            </EstimateActions>
          </EstimateCard>
          <MessageTime>{dayjs(timestamp).format("HH:mm")}</MessageTime>
        </MessageBubble>
      </MessageContainer>
    );
  }

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

export default React.memo(ChatMessage);

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

// Estimate Card Styles
const EstimateCard = styled.div`
  background: linear-gradient(135deg, #651d2a 0%, #8b3a47 100%);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  max-width: 400px;
`;

const EstimateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

const EstimateIcon = styled.span`
  font-size: 28px;
`;

const EstimateTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: white;
`;

const EstimateContent = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
`;

const EstimateInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoLabel = styled.span`
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
`;

const InfoValue = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
`;

const EstimateMessage = styled.p`
  margin: 0;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.9);
  color: #374151;
  font-size: 14px;
  line-height: 1.6;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  white-space: pre-wrap;
`;

const EstimateActions = styled.div`
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.95);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

const ViewQuotationButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 20px;
  background: #651d2a;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(101, 29, 42, 0.3);

  &:hover {
    background: #4a1520;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(101, 29, 42, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;
