import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { AUTO_SCROLL_DELAY, UI_TEXT } from "@shared/constants/chat";
import { ChatMessage as ChatMessageType, ChatContext } from "@shared/types/chat";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage, { QuoteResponseInfo } from "./ChatMessage";
import EstimateCard from "./EstimateCard";
import QuotationModal from "./QuotationModal";
import TypingIndicator from "./TypingIndicator";

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface Props {
  messages: ChatMessageType[];
  isTyping?: boolean;
  hasMessages?: boolean;
  onSend?: (message: string) => void;
  onUIActionSelect?: (value: string | string[] | ChatContext) => void;
}

// Helper to parse system message content
const parseSystemMessageContent = (content: string | undefined): { type?: string; customerMessage?: string; batchId?: number } | null => {
  if (!content) return null;
  try {
    const jsonMatch = content.trim().match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch {
    // Invalid JSON
  }
  return null;
};

const ChatMessageList: FC<Props> = ({
  messages,
  isTyping = false,
  hasMessages = true,
  onSend,
  onUIActionSelect,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [quotationHash, setQuotationHash] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate response info for each batchId
  // This maps batchId -> response info (type, message)
  const batchResponseMap = useMemo(() => {
    const responseMap = new Map<number, QuoteResponseInfo>();

    for (const msg of messages) {
      const parsed = parseSystemMessageContent(msg.content);
      if (parsed && parsed.batchId) {
        // Check if this is a response message
        if (parsed.type === 'customer_approved' || parsed.type === 'customer_rejected' || parsed.type === 'revision_requested') {
          responseMap.set(parsed.batchId, {
            responseType: parsed.type === 'customer_approved' ? 'approve'
              : parsed.type === 'customer_rejected' ? 'reject'
              : 'request_changes',
            message: parsed.customerMessage,
          });
        }
      }
    }

    return responseMap;
  }, [messages]);

  const handleViewQuote = (hash: string) => {
    setQuotationHash(hash);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setQuotationHash(null);
  };

  // Auto-scroll on new messages
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
          <WelcomeContainer>
            <WelcomeContent>
              <WelcomeIcon>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </WelcomeIcon>
              <WelcomeTitle>{UI_TEXT.WELCOME_TITLE}</WelcomeTitle>
              <WelcomeSubtitle>{UI_TEXT.WELCOME_SUBTITLE}</WelcomeSubtitle>
            </WelcomeContent>
            {onSend && (
              <WelcomeInputWrapper>
                <ChatInput onSend={onSend} disabled={isTyping} />
              </WelcomeInputWrapper>
            )}
          </WelcomeContainer>
        )}

        {messages.map((message, index) => {
          // Estimate card type
          if (message.type === "estimate" && message.metadata?.estimatePreview) {
            return (
              <MessageWrapper key={message.id} delay={index * 0.05}>
                <EstimateCardWrapper>
                  <EstimateCard
                    estimate={message.metadata.estimatePreview}
                    batchId={message.metadata?.batchId}
                    onViewQuote={handleViewQuote}
                  />
                </EstimateCardWrapper>
              </MessageWrapper>
            );
          }

          // 마지막 AI 메시지인지 확인 (UI 액션은 마지막 AI 메시지에서만 표시)
          const isLastAssistantMessage = message.role === 'assistant' &&
            index === messages.length - 1 ||
            (message.role === 'assistant' && messages.slice(index + 1).every(m => m.role === 'user'));

          // Get quote response info for this message if it's a quote_sent type
          const msgContent = parseSystemMessageContent(message.content);
          const quoteResponseInfo = msgContent?.type === 'quote_sent' && msgContent.batchId
            ? batchResponseMap.get(msgContent.batchId)
            : undefined;

          // Regular text message (including estimate type)
          return (
            <MessageWrapper key={message.id} delay={index * 0.05}>
              <ChatMessage
                message={message}
                onViewQuote={handleViewQuote}
                isLastMessage={isLastAssistantMessage}
                onUIActionSelect={onUIActionSelect}
                quoteResponseInfo={quoteResponseInfo}
              />
            </MessageWrapper>
          );
        })}

        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}

        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </MessagesList>

      {/* Quotation Modal */}
      {quotationHash && (
        <QuotationModal
          hash={quotationHash}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
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
    align-items: flex-start;
    justify-content: center;
    padding-top: 14vh;
  `}

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const MessagesList = styled.div<{ hasMessages: boolean }>`
  padding: 0;
  min-height: ${({ hasMessages }) => (hasMessages ? "100%" : "auto")};
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
`;

const MessageWrapper = styled.div<{ delay?: number }>`
  animation: ${fadeInUp} 0.4s ease both;
  animation-delay: ${({ delay }) => Math.min(delay || 0, 0.5)}s;
`;

const EstimateCardWrapper = styled.div`
  padding: 16px 24px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 40px;
  padding: 0 24px;
`;

const WelcomeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const WelcomeIcon = styled.div`
  width: 80px;
  height: 80px;
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
  margin-bottom: 24px;
  box-shadow: 0 8px 24px rgba(101, 29, 42, 0.25);
`;

const WelcomeTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const WelcomeSubtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0;
  max-width: 400px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const WelcomeInputWrapper = styled.div`
  width: 100%;
  max-width: 700px;
`;
