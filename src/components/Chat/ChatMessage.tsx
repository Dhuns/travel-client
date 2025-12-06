import React, { FC } from "react";

import styled from "@emotion/styled";
import { ChatMessage as ChatMessageType } from "@shared/types/chat";
import { aesEncrypt } from "@shared/utils/crypto";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  message: ChatMessageType;
  onViewQuote?: (hash: string) => void;
}

const ChatMessage: FC<Props> = ({ message, onViewQuote }) => {
  const { role, content, timestamp, type, metadata } = message;
  const isUser = role === "user";

  // Handle estimate-type messages
  if (type === "estimate" && metadata?.batchId) {
    // Generate encrypted hash for the quotation link
    const hash = aesEncrypt(String(metadata.batchId));
    const encodedHash = encodeURIComponent(hash);

    const handleViewClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (onViewQuote) {
        onViewQuote(encodedHash);
      }
    };

    return (
      <MessageContainer isUser={false}>
        <AvatarWrapper>
          <AssistantAvatar>
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
          </AssistantAvatar>
        </AvatarWrapper>
        <MessageContent>
          <EstimateCard>
            <EstimateHeader>
              <EstimateIcon>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </EstimateIcon>
              <EstimateTitle>Quotation Ready</EstimateTitle>
            </EstimateHeader>
            <EstimateBody>
              <EstimateInfo>
                <InfoRow>
                  <InfoLabel>Total Amount</InfoLabel>
                  <InfoValue>${metadata.totalAmount?.toLocaleString()}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Items</InfoLabel>
                  <InfoValue>{metadata.itemCount}</InfoValue>
                </InfoRow>
              </EstimateInfo>
              {content && <EstimateMessage>{content}</EstimateMessage>}
            </EstimateBody>
            <EstimateActions>
              <ViewQuotationButton onClick={handleViewClick}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                </svg>
                View Details
              </ViewQuotationButton>
            </EstimateActions>
          </EstimateCard>
          <MessageTime>{dayjs(timestamp).format("HH:mm")}</MessageTime>
        </MessageContent>
      </MessageContainer>
    );
  }

  return (
    <MessageContainer isUser={isUser}>
      {!isUser && (
        <AvatarWrapper>
          <AssistantAvatar>
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
          </AssistantAvatar>
        </AvatarWrapper>
      )}
      <MessageContent>
        <MessageBubble isUser={isUser}>
          {isUser ? (
            content
          ) : (
            <MarkdownContent>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </MarkdownContent>
          )}
        </MessageBubble>
        {!isUser && <MessageTime>{dayjs(timestamp).format("HH:mm")}</MessageTime>}
      </MessageContent>
    </MessageContainer>
  );
};

export default React.memo(ChatMessage);

// Styled Components
const MessageContainer = styled.div<{ isUser: boolean }>`
  display: flex;
  justify-content: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  gap: 12px;
  padding: 16px 24px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

const AvatarWrapper = styled.div`
  flex-shrink: 0;
  padding-top: 4px;
`;

const AssistantAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--color-tumakr-maroon) 0%,
    var(--color-tumakr-maroon) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 85%;
  min-width: 0;
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  padding: ${({ isUser }) => (isUser ? "12px 16px" : "0")};
  background-color: ${({ isUser }) => (isUser ? "#f3f4f6" : "transparent")};
  border-radius: ${({ isUser }) => (isUser ? "20px 4px 20px 20px" : "0")};
  font-size: 15px;
  line-height: 1.65;
  white-space: ${({ isUser }) => (isUser ? "pre-wrap" : "normal")};
  color: #1a1a1a;
  word-break: break-word;
`;

const MarkdownContent = styled.div`
  p {
    margin: 0 0 12px 0;
    &:last-child {
      margin-bottom: 0;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 20px 0 10px 0;
    font-weight: 600;
    line-height: 1.4;
    color: #111827;
    &:first-of-type {
      margin-top: 0;
    }
  }

  h1 {
    font-size: 24px;
  }
  h2 {
    font-size: 20px;
  }
  h3 {
    font-size: 18px;
  }
  h4 {
    font-size: 16px;
  }
  h5 {
    font-size: 15px;
  }
  h6 {
    font-size: 14px;
  }

  ul,
  ol {
    margin: 10px 0;
    padding-left: 24px;
  }

  li {
    margin: 6px 0;
  }

  code {
    background-color: #f3f4f6;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: "Monaco", "Menlo", "Courier New", monospace;
    font-size: 13px;
    color: #1f2937;
  }

  pre {
    background-color: #1f2937;
    color: #e5e7eb;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 16px 0;

    code {
      background-color: transparent;
      padding: 0;
      color: inherit;
    }
  }

  blockquote {
    border-left: 3px solid var(--color-tumakr-maroon);
    padding-left: 16px;
    margin: 16px 0;
    color: #4b5563;
    font-style: italic;
  }

  a {
    color: var(--color-tumakr-maroon);
    text-decoration: none;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }

  hr {
    border: none;
    border-top: 1px solid #e5e7eb;
    margin: 20px 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 16px 0;
    font-size: 14px;
  }

  th,
  td {
    border: 1px solid #e5e7eb;
    padding: 10px 14px;
    text-align: left;
  }

  th {
    background-color: #f9fafb;
    font-weight: 600;
    color: #374151;
  }

  strong {
    font-weight: 600;
  }

  em {
    font-style: italic;
  }
`;

const MessageTime = styled.span`
  font-size: 11px;
  color: #9ca3af;
  margin-left: 4px;
`;

// Estimate Card Styles
const EstimateCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
  max-width: 380px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const EstimateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: linear-gradient(
    135deg,
    var(--color-tumakr-maroon) 0%,
    var(--color-tumakr-maroon) 100%
  );
`;

const EstimateIcon = styled.span`
  color: white;
  display: flex;
  align-items: center;
`;

const EstimateTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const EstimateBody = styled.div`
  padding: 20px;
`;

const EstimateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoLabel = styled.span`
  font-size: 13px;
  color: #6b7280;
`;

const InfoValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const EstimateMessage = styled.p`
  margin: 16px 0 0 0;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
  color: #4b5563;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const EstimateActions = styled.div`
  padding: 16px 20px;
  background: #f9fafb;
  border-top: 1px solid #f3f4f6;
`;

const ViewQuotationButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 20px;
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2d2d2d;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
