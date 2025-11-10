import React, { FC, useEffect, useState, useCallback } from "react";

import ChatInfoPanel from "@components/Chat/ChatInfoPanel";
import ChatInput from "@components/Chat/ChatInput";
import ChatMessageList from "@components/Chat/ChatMessageList";
import ChatSidebar from "@components/Chat/ChatSidebar";
import styled from "@emotion/styled";
import useChatStore from "@shared/store/chatStore";

const Container: FC = () => {
  const {
    sessions,
    getCurrentSession,
    isTyping,
    isLoading,
    initSession,
    loadSession,
    sendUserMessage,
    clearSession,
    loadFromStorage,
  } = useChatStore();

  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const session = getCurrentSession();
  const context = session?.context || {};

  // localStorage에서 세션 로드 (최초 1회만)
  useEffect(() => {
    if (!isInitialized) {
      loadFromStorage();
      setIsInitialized(true);
    }
  }, [isInitialized, loadFromStorage]);

  // 세션이 없으면 자동으로 새 세션 생성 또는 기존 세션 로드
  useEffect(() => {
    if (isInitialized && !session) {
      // 세션이 없는 경우
      if (sessions.length === 0) {
        // 저장된 세션이 없으면 새로 생성
        initSession();
      } else {
        // 저장된 세션이 있으면 가장 최근 세션 로드
        const latestSession = [...sessions].sort(
          (a, b) =>
            new Date(b.lastMessageAt || b.createdAt).getTime() -
            new Date(a.lastMessageAt || a.createdAt).getTime()
        )[0];
        if (latestSession) {
          loadSession(latestSession.sessionId);
        }
      }
    }
  }, [isInitialized, session, sessions.length]);

  // 새 채팅 시작
  const handleNewChat = useCallback(() => {
    initSession();
  }, [initSession]);

  // 메시지 전송 핸들러
  const handleSendMessage = useCallback(async (content: string) => {
    if (!session) return;

    // 백엔드 API로 메시지 전송 및 AI 응답 받기 (Gemini AI)
    // 컨텍스트 추출은 백엔드에서 자동으로 수행됨
    await sendUserMessage(content);
  }, [session, sendUserMessage]);

  if (!session) {
    return (
      <LoadingContainer>
        <LoadingText>✈️ Preparing your AI travel planner...</LoadingText>
      </LoadingContainer>
    );
  }

  // 메시지가 없고 세션도 없으면 EmptyState 표시 (최초 방문자)
  const hasMessages = session.messages.length > 0;
  const isFirstVisit = sessions.length === 0 && !hasMessages;

  if (isFirstVisit) {
    return (
      <EmptyStateContainer>
        <EmptyStateContent>
          <EmptyStateTitle>✈️ AI Travel Planner for Korea</EmptyStateTitle>
          <EmptyStateSubtitle>Let's plan your perfect Korean adventure!</EmptyStateSubtitle>
          <EmptyStateInputWrapper>
            <ChatInput
              onSend={handleSendMessage}
              disabled={isTyping}
              placeholder="e.g., I want to visit Seoul for 3 days in December (2 adults)"
            />
          </EmptyStateInputWrapper>
          <EmptyStateHints>
            <HintItem>💬 Just chat naturally - tell us your travel dreams</HintItem>
            <HintItem>📅 Rough dates and number of travelers are enough to start</HintItem>
            <HintItem>💰 Share your budget range for better recommendations</HintItem>
            <HintItem>🗣️ We speak Korean too! (한국어도 가능합니다)</HintItem>
          </EmptyStateHints>
        </EmptyStateContent>
      </EmptyStateContainer>
    );
  }

  return (
    <PageContainer>
      {/* 좌측 사이드바 */}
      <ChatSidebar onNewChat={handleNewChat} />

      {/* 메인 영역 */}
      <MainArea>
        {/* 중앙 채팅 영역 */}
        <ChatWrapper>
          <ChatSection hasMessages={hasMessages}>
            {/* Top Bar */}
            <TopBar>
              <TopBarLeft>
                <ModelBadge>🤖 AI Travel Planner</ModelBadge>
              </TopBarLeft>
              <TopBarRight>
                <IconButton
                  onClick={() => setShowInfoPanel(!showInfoPanel)}
                  title="Toggle info panel"
                >
                  {showInfoPanel ? "›" : "‹"}
                </IconButton>
              </TopBarRight>
            </TopBar>

            {/* 메시지 리스트 */}
            <ChatMessageList
              messages={session.messages}
              isTyping={isTyping}
              hasMessages={hasMessages}
              onSend={handleSendMessage}
            />

            {/* Input Area - shown at bottom when messages exist */}
            {hasMessages && (
              <InputArea>
                <ChatInput
                  onSend={handleSendMessage}
                  disabled={isTyping}
                  placeholder={
                    isTyping ? "AI is typing..." : "Type your message..."
                  }
                />
              </InputArea>
            )}
          </ChatSection>
        </ChatWrapper>

        {/* Right Info Panel (toggleable) */}
        {showInfoPanel && <InfoPanelBackdrop onClick={() => setShowInfoPanel(false)} />}
        <InfoPanel isVisible={showInfoPanel}>
          <InfoPanelContent isVisible={showInfoPanel}>
            <InfoPanelHeader>
              <InfoPanelTitle>Trip Details</InfoPanelTitle>
              <CloseButton onClick={() => setShowInfoPanel(false)}>✕</CloseButton>
            </InfoPanelHeader>
            <ChatInfoPanel
              context={context}
              messageCount={session.messages.length}
              batchId={session.batchId}
            />
          </InfoPanelContent>
        </InfoPanel>
      </MainArea>
    </PageContainer>
  );
};

export default Container;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  background-color: #ffffff;
  overflow: hidden;
`;

const MainArea = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
  background-color: #ffffff;
`;

const ChatWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  overflow: hidden;
  background-color: #ffffff;
`;

const ChatSection = styled.div<{ hasMessages: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  position: relative;
  min-height: 0;
  ${({ hasMessages }) => !hasMessages && `
    justify-content: flex-start;
  `}
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px;
  background-color: #ffffff;
  z-index: 10;
  flex-shrink: 0;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ModelBadge = styled.div`
  padding: 6px 14px;
  background-color: #f5f5f5;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  color: #444;
`;

const IconButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background-color: transparent;
  color: #888;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    background-color: #f0f0f0;
    color: #000;
  }
`;

const InputArea = styled.div`
  padding: 16px 24px 24px 24px;
  background-color: #ffffff;
  flex-shrink: 0;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const InfoPanel = styled.div<{ isVisible: boolean }>`
  width: ${({ isVisible }) => (isVisible ? "340px" : "0")};
  background-color: #ffffff;
  overflow: hidden;
  flex-shrink: 0;
  transition: width 0.3s ease-in-out;

  @media (max-width: 1280px) {
    position: fixed;
    right: ${({ isVisible }) => (isVisible ? "0" : "-340px")};
    top: 80px;
    bottom: 0;
    width: 340px;
    max-width: 85vw;
    box-shadow: -4px 0 12px rgba(0, 0, 0, 0.08);
    z-index: 1001;
    transition: right 0.3s ease-in-out;
  }
`;

const InfoPanelContent = styled.div<{ isVisible: boolean }>`
  width: 340px;
  height: 100%;
  opacity: ${({ isVisible }) => (isVisible ? "1" : "0")};
  transition: opacity ${({ isVisible }) => (isVisible ? "0.3s 0.15s" : "0.15s")} ease-in-out;
  display: flex;
  flex-direction: column;
`;

const InfoPanelBackdrop = styled.div`
  display: none;

  @media (max-width: 1280px) {
    display: block;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
`;

const InfoPanelHeader = styled.div`
  display: none;

  @media (max-width: 1280px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #e8e8e8;
    background-color: #ffffff;
  }
`;

const InfoPanelTitle = styled.h3`
  margin: 0;
  font-size: 16px;
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
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    background-color: #f0f0f0;
    color: #000;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 0;
  background-color: #ffffff;
`;

const LoadingText = styled.p`
  font-size: 15px;
  color: #888;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 0;
  background-color: #ffffff;
  padding: 24px;
  overflow-y: auto;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const EmptyStateContent = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const EmptyStateTitle = styled.h1`
  font-size: 48px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const EmptyStateSubtitle = styled.p`
  font-size: 20px;
  color: #888;
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const EmptyStateInputWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
`;

const EmptyStateHints = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
`;

const HintItem = styled.div`
  font-size: 14px;
  color: #aaa;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
