import React, { FC, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { ChatMessage as ChatMessageType } from "@shared/types/chat";
import EstimateCard from "./EstimateCard";
import TypingIndicator from "./TypingIndicator";
import QuotationModal from "./QuotationModal";
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
  const [quotationHash, setQuotationHash] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
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

        {messages.map((message) => {
          // Estimate card type
          if (
            message.type === "estimate" &&
            message.metadata?.estimatePreview
          ) {
            return (
              <EstimateCardWrapper key={message.id}>
                <EstimateCard
                  estimate={message.metadata.estimatePreview}
                  batchId={message.metadata?.batchId}
                  onViewQuote={handleViewQuote}
                />
              </EstimateCardWrapper>
            );
          }

          // Regular text message (including estimate type)
          return <ChatMessage key={message.id} message={message} onViewQuote={handleViewQuote} />;
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
    padding-top: 8vh;
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
  background: linear-gradient(135deg, #651d2a 0%, #8b3a47 100%);
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
