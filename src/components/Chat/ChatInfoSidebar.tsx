import styled from "@emotion/styled";
import { ChatContext } from "@shared/types/chat";
import useChatStore, { GenerationProgress } from "@shared/store/chatStore";
import { FC } from "react";
import ChatInfoPanel from "./ChatInfoPanel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  context: ChatContext;
  messageCount: number;
  batchId?: number;
}

const ChatInfoSidebar: FC<Props> = ({ isOpen, onClose, context, messageCount, batchId }) => {
  const { isGeneratingEstimate, generationProgress } = useChatStore();
  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && <Backdrop onClick={onClose} />}

      {/* Info Panel */}
      <Container isOpen={isOpen}>
        <Content isOpen={isOpen}>
          {/* Header */}
          <Header>
            <Title>Trip Details</Title>
            <CloseButton onClick={onClose}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </CloseButton>
          </Header>

          {/* Info Panel Content */}
          <ChatInfoPanel
            context={context}
            messageCount={messageCount}
            batchId={batchId}
            isGeneratingEstimate={isGeneratingEstimate}
            generationProgress={generationProgress}
          />
        </Content>
      </Container>
    </>
  );
};

export default ChatInfoSidebar;

// Styled Components
const Container = styled.div<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (isOpen ? "320px" : "0")};
  min-height: 100vh;
  background-color: #fafafa;
  border-left: 1px solid #f0f0f0;
  overflow: hidden;
  flex-shrink: 0;
  transition: width 0.3s ease-in-out;

  @media (max-width: 1280px) {
    position: fixed;
    right: ${({ isOpen }) => (isOpen ? "0" : "-320px")};
    top: 0;
    bottom: 0;
    width: 320px;
    max-width: 85vw;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.08);
    z-index: 1001;
    transition: right 0.3s ease-in-out;
  }
`;

const Content = styled.div<{ isOpen: boolean }>`
  width: 320px;
  height: 100%;
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transition: opacity ${({ isOpen }) => (isOpen ? "0.3s 0.15s" : "0.15s")} ease-in-out;
  display: flex;
  flex-direction: column;
`;

const Backdrop = styled.div`
  display: none;

  @media (max-width: 1280px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1000;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e8e8e8;
  background-color: #ffffff;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background-color: transparent;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    background-color: #f0f0f0;
    color: #333;
  }
`;
