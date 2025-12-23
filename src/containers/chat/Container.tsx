import { FC, useCallback, useEffect, useState } from "react";

import ChatInfoSidebar from "@components/Chat/ChatInfoSidebar";
import ChatInput from "@components/Chat/ChatInput";
import ChatMessageList from "@components/Chat/ChatMessageList";
import ChatSidebar from "@components/Chat/ChatSidebar";
import ExpertRequestModal from "@components/Chat/ExpertRequestModal";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { sendToExpert, ExpertRequestFormData } from "@shared/apis/chat";
import { CHAT_STORAGE_KEY } from "@shared/constants/chat";
import { useAuthStore } from "@shared/store/authStore";
import useChatStore from "@shared/store/chatStore";
import { ChatContext } from "@shared/types/chat";
import { Info, Globe, MessageCircle, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const Container: FC = () => {
  const {
    sessions,
    currentSessionId,
    getCurrentSession,
    isTyping,
    isLoading,
    initSession,
    loadSession,
    loadUserSessions,
    sendUserMessage,
    clearSession,
    clearAllSessions,
    fetchEstimateQuota,
    estimateQuota,
  } = useChatStore();

  const { isAuthenticated, user, fetchUser, accessToken } = useAuthStore();
  const router = useRouter();

  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);

  const session = getCurrentSession();
  const context = session?.context || {};

  // 기타 지역 입력 모드
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherDestination, setOtherDestination] = useState("");

  // 비로그인 사용자 체크 (데이터는 유지, localStorage만 초기화)
  useEffect(() => {
    if (!isAuthenticated) {
      if (typeof window !== "undefined") {
        localStorage.removeItem(CHAT_STORAGE_KEY);
      }
      setIsInitialized(false);
    }
  }, [isAuthenticated]);

  // 로그인 시 사용자 정보 가져오고 채팅 세션 불러오기 (통합)
  useEffect(() => {
    if (!isAuthenticated || isInitialized) return;

    const initializeUserAndChat = async () => {
      try {
        // 사용자 정보가 없으면 먼저 가져오기
        if (!user) {
          await fetchUser();
        }

        // localStorage를 먼저 지우고 서버에서 최신 데이터 가져오기
        if (typeof window !== "undefined") {
          localStorage.removeItem(CHAT_STORAGE_KEY);
        }

        // 채팅 세션 불러오기
        await loadUserSessions();

        // 견적 생성 quota 로드
        await fetchEstimateQuota();

        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        setIsInitialized(true); // 실패해도 초기화 완료 표시
      }
    };

    initializeUserAndChat();
  }, [isAuthenticated, isInitialized, user, fetchUser, loadUserSessions]);

  // 기존 세션이 있으면 가장 최근 세션 로드 (자동 생성은 하지 않음 - Zendesk/Intercom 표준)
  useEffect(() => {
    if (isInitialized && !session && isAuthenticated && sessions.length > 0) {
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
  }, [isInitialized, session, sessions.length, isAuthenticated, loadSession]);

  // 새 채팅 시작
  const handleNewChat = useCallback(() => {
    initSession();
  }, [initSession]);

  // 메시지 전송 핸들러
  const handleSendMessage = useCallback(
    async (content: string) => {
      // 세션이 없으면 먼저 생성 (첫 메시지 전송 시)
      if (!session) {
        const success = await initSession();
        if (!success) {
          console.error("Failed to initialize session");
          return;
        }
        // 세션 생성 후 약간의 딜레이를 주고 메시지 전송
        setTimeout(async () => {
          await sendUserMessage(content);
        }, 100);
        return;
      }

      // 백엔드 API로 메시지 전송 및 AI 응답 받기 (Gemini AI)
      // 컨텍스트 추출은 백엔드에서 자동으로 수행됨
      await sendUserMessage(content);
    },
    [session, sendUserMessage, initSession]
  );

  // UI 액션 선택 핸들러 (버튼, 칩, 날짜 선택 등)
  const handleUIActionSelect = useCallback(
    async (value: string | string[] | ChatContext) => {
      // 값을 문자열로 변환하여 메시지로 전송
      let messageContent: string;

      if (typeof value === 'string') {
        // "no_changes" 선택 시 전문가 요청 모달 열기
        if (value === 'no_changes' || value.toLowerCase() === 'looks good') {
          setShowExpertModal(true);
          return;
        }
        // 단일 선택 (버튼, 날짜 등)
        messageContent = value;
      } else if (Array.isArray(value)) {
        // 다중 선택 (칩)
        messageContent = value.join(', ');
      } else {
        // ChatContext (확인 카드에서 confirm/edit)
        messageContent = 'confirm';
      }

      await handleSendMessage(messageContent);
    },
    [handleSendMessage]
  );

  // AI 견적 액션 핸들러 (Looks Good / Want Changes)
  const handleQuoteAction = useCallback(
    async (action: 'looks_good' | 'want_changes', batchId: number) => {
      if (action === 'looks_good') {
        // Looks Good → 간소화된 전문가 모달 열기
        setShowExpertModal(true);
      } else if (action === 'want_changes') {
        // Want Changes → AI에게 수정 요청 질문 메시지 전송
        // 세션이 없으면 먼저 생성
        if (!session) {
          const success = await initSession();
          if (!success) {
            console.error("Failed to initialize session");
            return;
          }
        }
        // AI에게 수정 요청 질문을 유도하는 메시지 전송
        await sendUserMessage("want_changes");
      }
    },
    [session, initSession, sendUserMessage]
  );

  // 전문가 요청 모달 제출 핸들러
  const handleExpertRequestSubmit = useCallback(
    async (formData: ExpertRequestFormData) => {
      if (!currentSessionId || !accessToken) {
        throw new Error('Session or authentication not available');
      }

      await sendToExpert(accessToken, currentSessionId, formData);

      // 성공 메시지를 채팅에 추가
      const { addMessage } = useChatStore.getState();
      await addMessage({
        role: 'assistant',
        type: 'system',
        content: JSON.stringify({
          type: 'sent_to_expert',
          title: 'Request Sent to Expert',
          message: 'Your travel request has been sent to our expert team! They will review your itinerary and preferences, then contact you within 24-48 hours with a detailed quote.',
        }),
      });

      // 세션 다시 로드하여 최신 상태 반영
      await loadSession(currentSessionId);
    },
    [currentSessionId, accessToken, loadSession]
  );

  // 비로그인 사용자 로그인 유도
  if (!isAuthenticated) {
    return (
      <PageContainer>
        <LoginPromptContainer>
          <LoginPromptContent>
            <LoginPromptIconWrapper>
              <LoginPromptIcon>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </LoginPromptIcon>
            </LoginPromptIconWrapper>
            <LoginPromptTitle>Plan Your Korea Trip with AI</LoginPromptTitle>
            <LoginPromptSubtitle>
              Sign in to chat with our AI travel assistant and get personalized
              recommendations for your Korean adventure.
            </LoginPromptSubtitle>
            <LoginButtonGroup>
              <LoginButton onClick={() => router.push("/login")}>Sign In</LoginButton>
              <SignUpButton onClick={() => router.push("/signup")}>
                Create Account
              </SignUpButton>
            </LoginButtonGroup>
          </LoginPromptContent>
        </LoginPromptContainer>
      </PageContainer>
    );
  }

  // 초기화 완료 전에는 로딩 표시
  if (!isInitialized) {
    return (
      <LoadingContainer>
        <LoadingIconWrapper>
          <Globe className="globe-icon" />
          <Sparkles className="sparkle-icon" />
        </LoadingIconWrapper>
        <LoadingText>Loading your travel plans...</LoadingText>
        <LoadingSubtext>Preparing your personalized Korea travel assistant</LoadingSubtext>
      </LoadingContainer>
    );
  }

  // 세션 목록은 있지만 현재 세션이 로드되지 않은 경우 (로딩 중)
  if (sessions.length > 0 && !session) {
    return (
      <LoadingContainer>
        <LoadingIconWrapper>
          <MessageCircle className="globe-icon" />
        </LoadingIconWrapper>
        <LoadingText>Loading conversation...</LoadingText>
        <LoadingSubtext>Retrieving your chat history</LoadingSubtext>
      </LoadingContainer>
    );
  }

  // 메시지가 없는 세션이면 목적지 선택 UI 표시 (새 대화)
  const hasMessages = (session?.messages?.length ?? 0) > 0;
  const showDestinationSelection = !hasMessages;

  // 목적지 선택 핸들러
  const handleDestinationSelect = async (destination: string) => {
    setShowOtherInput(false);
    setOtherDestination("");
    await handleSendMessage(`I want to visit ${destination}`);
  };

  // 기타 지역 입력 제출 핸들러
  const handleOtherDestinationSubmit = async () => {
    if (otherDestination.trim()) {
      await handleSendMessage(`I want to visit ${otherDestination.trim()}`);
      setShowOtherInput(false);
      setOtherDestination("");
    }
  };

  // 목적지 선택 UI 렌더링 함수
  const renderDestinationSelection = () => (
    <DestinationSelectionWrapper>
      <EmptyStateContent>
        <WelcomeBadge>
          <Sparkles className="w-4 h-4" />
          AI-Powered Trip Planning
        </WelcomeBadge>
        <EmptyStateIconWrapper>
          <EmptyStateIcon>
            <Globe className="w-12 h-12" strokeWidth={1.5} />
          </EmptyStateIcon>
        </EmptyStateIconWrapper>
        <EmptyStateTitle>Where would you like to go in Korea?</EmptyStateTitle>
        <EmptyStateSubtitle>
          Choose a popular destination or tell us your dream trip
        </EmptyStateSubtitle>

        {/* 목적지 선택 버튼 그리드 */}
        <DestinationGrid>
          <DestinationCard onClick={() => handleDestinationSelect("Seoul")} disabled={isTyping}>
            <DestinationImageBg style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />
            <DestinationContent>
              <DestinationEmoji>🏙️</DestinationEmoji>
              <DestinationName>Seoul</DestinationName>
              <DestinationDesc>Palaces, shopping, K-culture</DestinationDesc>
            </DestinationContent>
          </DestinationCard>
          <DestinationCard onClick={() => handleDestinationSelect("Busan")} disabled={isTyping}>
            <DestinationImageBg style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }} />
            <DestinationContent>
              <DestinationEmoji>🏖️</DestinationEmoji>
              <DestinationName>Busan</DestinationName>
              <DestinationDesc>Beaches, seafood, temples</DestinationDesc>
            </DestinationContent>
          </DestinationCard>
          <DestinationCard onClick={() => handleDestinationSelect("Jeju")} disabled={isTyping}>
            <DestinationImageBg style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }} />
            <DestinationContent>
              <DestinationEmoji>🌴</DestinationEmoji>
              <DestinationName>Jeju Island</DestinationName>
              <DestinationDesc>Nature, beaches, volcanic</DestinationDesc>
            </DestinationContent>
          </DestinationCard>
          <DestinationCard onClick={() => handleDestinationSelect("Gyeongju")} disabled={isTyping}>
            <DestinationImageBg style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }} />
            <DestinationContent>
              <DestinationEmoji>🏛️</DestinationEmoji>
              <DestinationName>Gyeongju</DestinationName>
              <DestinationDesc>UNESCO sites, history</DestinationDesc>
            </DestinationContent>
          </DestinationCard>
          <DestinationCard onClick={() => handleDestinationSelect("Jeonju")} disabled={isTyping}>
            <DestinationImageBg style={{ background: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)' }} />
            <DestinationContent>
              <DestinationEmoji>🏡</DestinationEmoji>
              <DestinationName>Jeonju</DestinationName>
              <DestinationDesc>Hanok village, traditional food</DestinationDesc>
            </DestinationContent>
          </DestinationCard>
          {/* Other destination option */}
          <DestinationCard
            onClick={() => setShowOtherInput(true)}
            disabled={isTyping}
            style={{ border: showOtherInput ? '2px solid var(--color-tumakr-maroon)' : undefined }}
          >
            <DestinationImageBg style={{ background: 'linear-gradient(135deg, #a8a8a8 0%, #6b6b6b 100%)' }} />
            <DestinationContent>
              <DestinationEmoji>✏️</DestinationEmoji>
              <DestinationName>Other</DestinationName>
              <DestinationDesc>Enter your destination</DestinationDesc>
            </DestinationContent>
          </DestinationCard>
        </DestinationGrid>

        {/* Other destination input field */}
        {showOtherInput && (
          <OtherInputWrapper>
            <OtherInputContainer>
              <OtherInput
                type="text"
                value={otherDestination}
                onChange={(e) => setOtherDestination(e.target.value)}
                placeholder="Enter your destination (e.g., Gangneung, Sokcho, Daegu...)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && otherDestination.trim()) {
                    handleOtherDestinationSubmit();
                  }
                }}
                autoFocus
              />
              <OtherInputButton
                onClick={handleOtherDestinationSubmit}
                disabled={!otherDestination.trim() || isTyping}
              >
                Go
              </OtherInputButton>
            </OtherInputContainer>
          </OtherInputWrapper>
        )}

        {/* 7+ days trip notice */}
        <LongTripNotice>
          <LongTripIcon>📧</LongTripIcon>
          <LongTripText>
            Planning a trip longer than 7 days? Contact us at{" "}
            <LongTripEmail href="mailto:info@onedaykorea.com">info@onedaykorea.com</LongTripEmail>
            {" "}for personalized assistance.
          </LongTripText>
        </LongTripNotice>

        <OrDivider>
          <OrLine />
          <OrText>or describe your ideal trip</OrText>
          <OrLine />
        </OrDivider>

        <EmptyStateInputWrapper>
          <ChatInput
            onSend={handleSendMessage}
            disabled={isTyping}
            placeholder="e.g., I want to explore Seoul and Busan for 5 days..."
            showHint
            sessionId={currentSessionId || undefined}
          />
        </EmptyStateInputWrapper>

        <TrustBadges>
          <TrustBadge>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            Verified local experts
          </TrustBadge>
          <TrustBadge>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            Instant quotes
          </TrustBadge>
          <TrustBadge>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            1000+ happy travelers
          </TrustBadge>
        </TrustBadges>
      </EmptyStateContent>
    </DestinationSelectionWrapper>
  );

  return (
    <PageContainer>
      {/* 모바일 사이드바 오버레이 */}
      {showSidebar && <SidebarOverlay onClick={() => setShowSidebar(false)} />}

      {/* 좌측 사이드바 */}
      <ChatSidebar
        onNewChat={handleNewChat}
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
      />

      {/* 메인 영역 */}
      <MainArea>
        {/* 중앙 채팅 영역 */}
        <ChatWrapper>
          <ChatSection hasMessages={hasMessages}>
            {/* Top Bar */}
            <TopBar>
              <TopBarLeft>
                <MobileMenuButton onClick={() => setShowSidebar(!showSidebar)}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 12h18M3 6h18M3 18h18" />
                  </svg>
                </MobileMenuButton>
              </TopBarLeft>
              <TopBarCenter>
                <ModelBadge>
                  <ModelIcon>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </ModelIcon>
                  Korea Travel AI
                </ModelBadge>
              </TopBarCenter>
              <TopBarRight>
                {estimateQuota && (
                  <QuotaBadge $remaining={estimateQuota.remaining}>
                    <Sparkles className="w-3.5 h-3.5" />
                    {estimateQuota.remaining}/{estimateQuota.limit} quotes left today
                  </QuotaBadge>
                )}
                <IconButton
                  onClick={() => setShowInfoPanel(!showInfoPanel)}
                  title="Trip details"
                  active={showInfoPanel}
                >
                  <Info className="w-5 h-5" />
                </IconButton>
              </TopBarRight>
            </TopBar>

            {/* 메시지가 없으면 목적지 선택 UI, 있으면 메시지 리스트 */}
            {showDestinationSelection ? (
              renderDestinationSelection()
            ) : (
              <>
                <ChatMessageList
                  messages={session?.messages || []}
                  isTyping={isTyping}
                  hasMessages={hasMessages}
                  onSend={handleSendMessage}
                  onUIActionSelect={handleUIActionSelect}
                  onQuoteAction={handleQuoteAction}
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
                        sessionId={currentSessionId || undefined}
                      />
                      <InputHint>
                        AI can make mistakes. Please verify important travel information.
                      </InputHint>
                    </InputContainer>
                  </InputArea>
                )}
              </>
            )}
          </ChatSection>
        </ChatWrapper>

        {/* Right Info Panel (toggleable) */}
        <ChatInfoSidebar
          isOpen={showInfoPanel}
          onClose={() => setShowInfoPanel(false)}
          context={context}
          messageCount={session?.messages?.length || 0}
          batchId={session?.batchId}
        />
      </MainArea>

      {/* Expert Request Modal */}
      <ExpertRequestModal
        isOpen={showExpertModal}
        onClose={() => setShowExpertModal(false)}
        onSubmit={handleExpertRequestSubmit}
        context={context}
      />
    </PageContainer>
  );
};

export default Container;

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const sparkle = keyframes`
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.7; }
  50% { transform: scale(1.2) rotate(10deg); opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const cardHover = keyframes`
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(-4px) scale(1.02); }
`;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex: 1;
  min-height: 100vh;
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
  ${({ hasMessages }) =>
    !hasMessages &&
    `
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

const TopBarLeft = styled.div`
  position: absolute;
  left: 24px;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (min-width: 1025px) {
    display: none; // 데스크톱에서는 햄버거 메뉴 숨김
  }
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

const QuotaBadge = styled.div<{ $remaining: number }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: ${({ $remaining }) =>
    $remaining === 0
      ? "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)"
      : $remaining === 1
      ? "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)"
      : "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"};
  border: 1px solid ${({ $remaining }) =>
    $remaining === 0 ? "#fecaca" : $remaining === 1 ? "#fde68a" : "#bbf7d0"};
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ $remaining }) =>
    $remaining === 0 ? "#dc2626" : $remaining === 1 ? "#d97706" : "#16a34a"};
  white-space: nowrap;

  svg {
    opacity: 0.8;
  }

  @media (max-width: 640px) {
    padding: 4px 8px;
    font-size: 11px;

    svg {
      width: 12px;
      height: 12px;
    }
  }
`;

const MobileMenuButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  background-color: transparent;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    background-color: #f5f5f5;
    border-color: #ddd;
  }

  @media (min-width: 1025px) {
    display: none;
  }
`;

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;

  @media (max-width: 1024px) {
    display: block;
  }
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
  color: var(--color-tumakr-maroon);
`;

const IconButton = styled.button<{ active?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid ${({ active }) => (active ? "var(--color-tumakr-maroon)" : "#e5e5e5")};
  background-color: ${({ active }) =>
    active ? "rgba(101, 29, 42, 0.05)" : "transparent"};
  color: ${({ active }) => (active ? "var(--color-tumakr-maroon)" : "#666")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    background-color: ${({ active }) => (active ? "rgba(101, 29, 42, 0.1)" : "#f5f5f5")};
    border-color: ${({ active }) => (active ? "var(--color-tumakr-maroon)" : "#ddd")};
  }
`;

const InputArea = styled.div`
  padding: 12px 24px 24px 24px;
  background: transparent;
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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
  gap: 20px;
  animation: ${fadeIn} 0.3s ease;
`;

const LoadingIconWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-tumakr-maroon, #651d2a) 0%, #8b2438 100%);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(101, 29, 42, 0.25);
  animation: ${float} 3s ease-in-out infinite;

  .globe-icon {
    width: 40px;
    height: 40px;
    color: white;
    animation: ${spin} 20s linear infinite;
  }

  .sparkle-icon {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 24px;
    height: 24px;
    color: #fbbf24;
    background: white;
    border-radius: 50%;
    padding: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    animation: ${sparkle} 2s ease-in-out infinite;
  }
`;

const LoadingText = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const LoadingSubtext = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const DestinationSelectionWrapper = styled.div`
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
  background: linear-gradient(
    135deg,
    var(--color-tumakr-maroon) 0%,
    var(--color-tumakr-maroon) 100%
  );
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

// Welcome Badge
const WelcomeBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(101, 29, 42, 0.1) 0%, rgba(101, 29, 42, 0.05) 100%);
  border: 1px solid rgba(101, 29, 42, 0.2);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-tumakr-maroon, #651d2a);
  margin-bottom: 8px;
  animation: ${fadeIn} 0.5s ease;

  svg {
    animation: ${sparkle} 2s ease-in-out infinite;
  }
`;

// Hello Vacanze 스타일 목적지 선택 그리드
const DestinationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 28px;
  width: 100%;
  max-width: 580px;
  animation: ${fadeIn} 0.5s ease 0.2s both;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const DestinationCard = styled.button<{ disabled?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 20px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  transition: all 0.3s ease;
  text-align: center;
  overflow: hidden;
  min-height: 140px;

  &:hover:not(:disabled) {
    border-color: var(--color-tumakr-maroon);
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(101, 29, 42, 0.15);

    & > div:first-of-type {
      opacity: 0.25;
    }

    & span:first-of-type {
      transform: scale(1.15);
    }
  }

  &:active:not(:disabled) {
    transform: translateY(-2px);
  }
`;

const DestinationImageBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  opacity: 0.15;
  transition: opacity 0.3s ease;
`;

const DestinationContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px 16px;
  position: relative;
  z-index: 1;
`;

const DestinationEmoji = styled.span`
  font-size: 36px;
  margin-bottom: 10px;
  transition: transform 0.3s ease;
`;

const DestinationName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const DestinationDesc = styled.span`
  font-size: 12px;
  color: #888;
  line-height: 1.4;
`;

// Trust Badges
const TrustBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  animation: ${fadeIn} 0.5s ease 0.4s both;

  @media (max-width: 640px) {
    gap: 12px;
  }
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #666;

  svg {
    color: var(--color-tumakr-maroon, #651d2a);
    opacity: 0.7;
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 400px;
  margin-top: 24px;
`;

const OrLine = styled.div`
  flex: 1;
  height: 1px;
  background: #e5e5e5;
`;

const OrText = styled.span`
  font-size: 13px;
  color: #999;
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
  background: linear-gradient(
    135deg,
    var(--color-tumakr-maroon) 0%,
    var(--color-tumakr-maroon) 100%
  );
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
  background-color: var(--color-tumakr-maroon);
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

// Other destination input components
const OtherInputWrapper = styled.div`
  width: 100%;
  max-width: 580px;
  margin-top: 16px;
  animation: ${fadeIn} 0.3s ease;
`;

const OtherInputContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 4px;
  background: #ffffff;
  border: 2px solid var(--color-tumakr-maroon);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(101, 29, 42, 0.1);
`;

const OtherInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: none;
  outline: none;
  font-size: 15px;
  color: #333;
  background: transparent;

  &::placeholder {
    color: #999;
  }
`;

const OtherInputButton = styled.button<{ disabled?: boolean }>`
  padding: 12px 24px;
  background-color: ${({ disabled }) => (disabled ? '#ccc' : 'var(--color-tumakr-maroon)')};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #4a1520;
  }
`;

// Long trip notice components
const LongTripNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(101, 29, 42, 0.05) 0%, rgba(101, 29, 42, 0.02) 100%);
  border: 1px solid rgba(101, 29, 42, 0.15);
  border-radius: 12px;
  margin-top: 24px;
  max-width: 580px;
  animation: ${fadeIn} 0.5s ease 0.3s both;

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
`;

const LongTripIcon = styled.span`
  font-size: 24px;
  flex-shrink: 0;
`;

const LongTripText = styled.p`
  margin: 0;
  font-size: 13px;
  color: #555;
  line-height: 1.5;
`;

const LongTripEmail = styled.a`
  color: var(--color-tumakr-maroon);
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;
