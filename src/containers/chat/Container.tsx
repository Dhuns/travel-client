import React, { FC, useEffect, useState, useCallback } from "react";

import ChatInfoPanel from "@components/Chat/ChatInfoPanel";
import ChatInput from "@components/Chat/ChatInput";
import ChatMessageList from "@components/Chat/ChatMessageList";
import ChatSidebar from "@components/Chat/ChatSidebar";
import styled from "@emotion/styled";
import useChatStore from "@shared/store/chatStore";
import { useAuthStore } from "@shared/store/authStore";
import { useRouter } from "next/navigation";

const Container: FC = () => {
  const {
    sessions,
    getCurrentSession,
    isTyping,
    isLoading,
    initSession,
    loadSession,
    loadUserSessions,
    sendUserMessage,
    clearSession,
    loadFromStorage,
    clearAllSessions,
  } = useChatStore();

  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const session = getCurrentSession();
  const context = session?.context || {};

  // 비로그인 사용자 체크 (데이터는 유지, localStorage만 초기화)
  useEffect(() => {
    if (!isAuthenticated) {
      // localStorage 캐시만 초기화 (서버 데이터는 유지)
      const CHAT_STORAGE_KEY = 'chat-sessions-storage';
      if (typeof window !== 'undefined') {
        localStorage.removeItem(CHAT_STORAGE_KEY);
      }
    }
  }, [isAuthenticated]);

  // 로그인 시 서버에서 사용자 세션 불러오기 (최초 1회만)
  useEffect(() => {
    if (!isInitialized && isAuthenticated && user?.id) {
      loadUserSessions(user.id).then(() => {
        setIsInitialized(true);
      });
    }
  }, [isInitialized, isAuthenticated, user, loadUserSessions]);

  // 세션이 없으면 자동으로 새 세션 생성 또는 기존 세션 로드 (로그인한 사용자만)
  useEffect(() => {
    if (isInitialized && !session && isAuthenticated) {
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
  }, [isInitialized, session, sessions.length, isAuthenticated]);

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

  // 비로그인 사용자 로그인 유도
  if (!isAuthenticated) {
    return (
      <PageContainer>
        <LoginPromptContainer>
          <LoginPromptContent>
            <LoginPromptIconWrapper>
              <LoginPromptIcon>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </LoginPromptIcon>
            </LoginPromptIconWrapper>
            <LoginPromptTitle>Plan Your Korea Trip with AI</LoginPromptTitle>
            <LoginPromptSubtitle>
              Sign in to chat with our AI travel assistant and get personalized recommendations for your Korean adventure.
            </LoginPromptSubtitle>
            <LoginButtonGroup>
              <LoginButton onClick={() => router.push("/login")}>
                Sign In
              </LoginButton>
              <SignUpButton onClick={() => router.push("/signup")}>
                Create Account
              </SignUpButton>
            </LoginButtonGroup>
          </LoginPromptContent>
        </LoginPromptContainer>
      </PageContainer>
    );
  }

  if (!session) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Preparing your AI travel planner...</LoadingText>
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
          <EmptyStateIconWrapper>
            <EmptyStateIcon>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </EmptyStateIcon>
          </EmptyStateIconWrapper>
          <EmptyStateTitle>Where would you like to go in Korea?</EmptyStateTitle>
          <EmptyStateSubtitle>I can help you plan the perfect trip - just tell me about your travel dreams.</EmptyStateSubtitle>
          <EmptyStateInputWrapper>
            <ChatInput
              onSend={handleSendMessage}
              disabled={isTyping}
              placeholder="e.g., I want to explore Seoul and Busan for 5 days..."
            />
          </EmptyStateInputWrapper>
          <EmptyStateHints>
            <HintChip>Seoul in December</HintChip>
            <HintChip>Traditional temples tour</HintChip>
            <HintChip>K-food experience</HintChip>
            <HintChip>DMZ visit</HintChip>
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
              <TopBarCenter>
                <ModelBadge>
                  <ModelIcon>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                  </ModelIcon>
                  Korea Travel AI
                </ModelBadge>
              </TopBarCenter>
              <TopBarRight>
                <IconButton
                  onClick={() => setShowInfoPanel(!showInfoPanel)}
                  title="Trip details"
                  active={showInfoPanel}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4M12 8h.01"/>
                  </svg>
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
                <InputContainer>
                  <ChatInput
                    onSend={handleSendMessage}
                    disabled={isTyping}
                    placeholder={
                      isTyping ? "AI is thinking..." : "Message Korea Travel AI..."
                    }
                  />
                  <InputHint>AI can make mistakes. Please verify important travel information.</InputHint>
                </InputContainer>
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
              <CloseButton onClick={() => setShowInfoPanel(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </CloseButton>
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
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  z-index: 10;
  flex-shrink: 0;
  position: relative;
`;

const TopBarCenter = styled.div`
  display: flex;
  align-items: center;
`;

const TopBarRight = styled.div`
  position: absolute;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ModelBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background-color: #fafafa;
  border: 1px solid #e5e5e5;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  color: #333;
`;

const ModelIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #651d2a;
`;

const IconButton = styled.button<{ active?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid ${({ active }) => active ? '#651d2a' : '#e5e5e5'};
  background-color: ${({ active }) => active ? 'rgba(101, 29, 42, 0.05)' : 'transparent'};
  color: ${({ active }) => active ? '#651d2a' : '#666'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    background-color: ${({ active }) => active ? 'rgba(101, 29, 42, 0.1)' : '#f5f5f5'};
    border-color: ${({ active }) => active ? '#651d2a' : '#ddd'};
  }
`;

const InputArea = styled.div`
  padding: 0 24px 24px 24px;
  background: linear-gradient(to bottom, transparent, #ffffff 20%);
  flex-shrink: 0;
`;

const InputContainer = styled.div`
  max-width: 768px;
  margin: 0 auto;
  width: 100%;
`;

const InputHint = styled.div`
  text-align: center;
  font-size: 11px;
  color: #999;
  margin-top: 8px;
`;

const InfoPanel = styled.div<{ isVisible: boolean }>`
  width: ${({ isVisible }) => (isVisible ? "320px" : "0")};
  background-color: #fafafa;
  border-left: 1px solid #f0f0f0;
  overflow: hidden;
  flex-shrink: 0;
  transition: width 0.3s ease-in-out;

  @media (max-width: 1280px) {
    position: fixed;
    right: ${({ isVisible }) => (isVisible ? "0" : "-320px")};
    top: 80px;
    bottom: 0;
    width: 320px;
    max-width: 85vw;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.08);
    z-index: 1001;
    transition: right 0.3s ease-in-out;
  }
`;

const InfoPanelContent = styled.div<{ isVisible: boolean }>`
  width: 320px;
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
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1000;
  }
`;

const InfoPanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e8e8e8;
  background-color: #ffffff;
`;

const InfoPanelTitle = styled.h3`
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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 0;
  background-color: #ffffff;
  gap: 16px;
`;

const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 2px solid #f0f0f0;
  border-top-color: #651d2a;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 14px;
  color: #666;
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
`;

const EmptyStateContent = styled.div`
  width: 100%;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const EmptyStateIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 24px;
  background: linear-gradient(135deg, #651d2a 0%, #8b3a47 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const EmptyStateIcon = styled.div`
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyStateTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const EmptyStateSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
  text-align: center;
  max-width: 480px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const EmptyStateInputWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
`;

const EmptyStateHints = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
`;

const HintChip = styled.button`
  padding: 8px 16px;
  border: 1px solid #e5e5e5;
  border-radius: 20px;
  background-color: #ffffff;
  font-size: 13px;
  color: #555;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #651d2a;
    color: #651d2a;
    background-color: rgba(101, 29, 42, 0.03);
  }
`;

const LoginPromptContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 0;
  background-color: #ffffff;
  padding: 24px;
`;

const LoginPromptContent = styled.div`
  max-width: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
`;

const LoginPromptIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 24px;
  background: linear-gradient(135deg, #651d2a 0%, #8b3a47 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const LoginPromptIcon = styled.div`
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginPromptTitle = styled.h2`
  font-size: 26px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const LoginPromptSubtitle = styled.p`
  font-size: 15px;
  color: #666;
  margin: 0;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const LoginButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
  width: 100%;
  max-width: 320px;
`;

const LoginButton = styled.button`
  flex: 1;
  padding: 14px 24px;
  background-color: #651d2a;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #4a1520;
  }
`;

const SignUpButton = styled.button`
  flex: 1;
  padding: 14px 24px;
  background-color: #ffffff;
  color: #333;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f5;
    border-color: #ddd;
  }
`;
