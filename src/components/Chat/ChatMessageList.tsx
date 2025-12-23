import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { AUTO_SCROLL_DELAY, UI_TEXT } from "@shared/constants/chat";
import { ChatMessage as ChatMessageType, ChatContext } from "@shared/types/chat";
import useChatStore, { GenerationProgress } from "@shared/store/chatStore";
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
  onQuoteAction?: (action: 'looks_good' | 'want_changes', batchId: number) => void;
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
  onQuoteAction,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [quotationHash, setQuotationHash] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get generation progress from store
  const generationProgress = useChatStore((state) => state.generationProgress);
  const isGeneratingEstimate = useChatStore((state) => state.isGeneratingEstimate);

  // Calculate response info for each quote_sent message
  // Key: message.id (not batchId) - each quote_sent tracks its own response status
  // A quote_sent shows "submitted" if there's a response AFTER it (before the next quote_sent)
  const quoteResponseByMessageId = useMemo(() => {
    const responseMap = new Map<string, QuoteResponseInfo>();

    // Collect all quote_sent messages and responses in order
    interface QuoteMessage {
      messageId: string;
      batchId: number;
      timestamp: Date;
      type: 'quote_sent' | 'response';
      responseType?: 'approve' | 'reject' | 'request_changes';
      customerMessage?: string;
    }

    const quoteMessages: QuoteMessage[] = [];

    for (const msg of messages) {
      const parsed = parseSystemMessageContent(msg.content);
      // Use batchId from content, or fallback to metadata.batchId for older messages
      const batchId = parsed?.batchId || (msg.metadata?.batchId as number | undefined);

      if (parsed && batchId) {
        if (parsed.type === 'quote_sent') {
          quoteMessages.push({
            messageId: msg.id,
            batchId,
            timestamp: new Date(msg.timestamp),
            type: 'quote_sent',
          });
        } else if (parsed.type === 'customer_approved' || parsed.type === 'customer_rejected' || parsed.type === 'revision_requested') {
          quoteMessages.push({
            messageId: msg.id,
            batchId,
            timestamp: new Date(msg.timestamp),
            type: 'response',
            responseType: parsed.type === 'customer_approved' ? 'approve'
              : parsed.type === 'customer_rejected' ? 'reject'
              : 'request_changes',
            customerMessage: parsed.customerMessage,
          });
        }
      }
    }

    // Sort by timestamp
    quoteMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    // For each quote_sent, find if there's a response for the same batchId AFTER it
    // but BEFORE the next quote_sent for that batchId
    for (let i = 0; i < quoteMessages.length; i++) {
      const current = quoteMessages[i];
      if (current.type !== 'quote_sent') continue;

      // Look for a response after this quote_sent
      for (let j = i + 1; j < quoteMessages.length; j++) {
        const next = quoteMessages[j];
        if (next.batchId !== current.batchId) continue;

        if (next.type === 'quote_sent') {
          // Found another quote_sent for same batchId - stop looking
          break;
        }

        if (next.type === 'response') {
          // Found a response - this quote_sent has been responded to
          responseMap.set(current.messageId, {
            responseType: next.responseType!,
            message: next.customerMessage,
          });
          break;
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
  }, [messages.length, isTyping, isGeneratingEstimate, generationProgress]);

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

          // Get quote response info for this specific quote_sent message
          // Pass null (not undefined) for quote_sent without response to prevent localStorage fallback
          const msgContent = parseSystemMessageContent(message.content);
          const isQuoteSent = msgContent?.type === 'quote_sent' && msgContent.batchId;
          const quoteResponseInfo = isQuoteSent
            ? (quoteResponseByMessageId.get(message.id) ?? null) // null = checked, no response for THIS quote
            : undefined; // undefined = not a quote_sent message

          // Regular text message (including estimate type)
          return (
            <MessageWrapper key={message.id} delay={index * 0.05}>
              <ChatMessage
                message={message}
                onViewQuote={handleViewQuote}
                isLastMessage={isLastAssistantMessage}
                onUIActionSelect={onUIActionSelect}
                onQuoteAction={onQuoteAction}
                quoteResponseInfo={quoteResponseInfo}
              />
            </MessageWrapper>
          );
        })}

        {/* Typing indicator with optional progress */}
        {(isTyping || isGeneratingEstimate) && (
          <TypingIndicator progress={generationProgress} />
        )}

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
