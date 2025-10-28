import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useChatStore from '@/shared/store/chatStore';
import ChatMessageList from '@/components/Chat/ChatMessageList';
import ChatInput from '@/components/Chat/ChatInput';
import ChatInfoPanel from '@/components/Chat/ChatInfoPanel';
import ChatSidebar from '@/components/Chat/ChatSidebar';

const Container: FC = () => {
  const {
    sessions,
    getCurrentSession,
    isTyping,
    isLoading,
    initSession,
    loadSession,
    sendUserMessage,
    updateContext,
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

  // 세션이 없으면 자동으로 새 세션 생성 (메시지는 추가하지 않음)
  useEffect(() => {
    if (isInitialized && !session) {
      initSession();
    }
  }, [isInitialized, session]);

  // 새 채팅 시작
  const handleNewChat = () => {
    initSession();
  };

  // 메시지 전송 핸들러
  const handleSendMessage = async (content: string) => {
    if (!session) return;

    // 컨텍스트 추출 (간단한 키워드 매칭 - UI 즉시 업데이트용)
    const lowerContent = content.toLowerCase();

    // 목적지 추출
    if (lowerContent.includes('제주')) {
      updateContext({ destination: '제주도' });
    } else if (lowerContent.includes('부산')) {
      updateContext({ destination: '부산' });
    } else if (lowerContent.includes('서울')) {
      updateContext({ destination: '서울' });
    }

    // 기간 추출
    const dayMatch = lowerContent.match(/(\d+)박\s*(\d+)일/);
    if (dayMatch) {
      const nights = parseInt(dayMatch[1]);
      const days = parseInt(dayMatch[2]);
      // 임시로 오늘부터 계산
      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + days - 1);
      updateContext({
        startDate: today.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      });
    }

    // 인원 추출
    const adultMatch = lowerContent.match(/성인\s*(\d+)/);
    const childMatch = lowerContent.match(/소아|아이\s*(\d+)/);
    const infantMatch = lowerContent.match(/유아\s*(\d+)/);

    if (adultMatch) updateContext({ adults: parseInt(adultMatch[1]) });
    if (childMatch) updateContext({ children: parseInt(childMatch[1]) });
    if (infantMatch) updateContext({ infants: parseInt(infantMatch[1]) });

    // 선호도 추출
    if (lowerContent.includes('관광')) {
      updateContext({ preferences: [...(context.preferences || []), '관광형'] });
    } else if (lowerContent.includes('휴양')) {
      updateContext({ preferences: [...(context.preferences || []), '휴양형'] });
    } else if (lowerContent.includes('체험')) {
      updateContext({ preferences: [...(context.preferences || []), '체험형'] });
    }

    // 백엔드 API로 메시지 전송 및 AI 응답 받기 (Gemini AI)
    await sendUserMessage(content);
  };

  if (!session) {
    return (
      <LoadingContainer>
        <LoadingText>채팅을 시작하는 중...</LoadingText>
      </LoadingContainer>
    );
  }

  // 메시지가 없으면 EmptyState 표시
  const hasMessages = session.messages.length > 0;

  if (!hasMessages) {
    return (
      <EmptyStateContainer>
        <EmptyStateContent>
          <EmptyStateTitle>✈️ AI 여행 플래너</EmptyStateTitle>
          <EmptyStateSubtitle>어떤 여행을 계획중이세요?</EmptyStateSubtitle>
          <EmptyStateInputWrapper>
            <ChatInput
              onSend={handleSendMessage}
              disabled={isTyping}
              placeholder="예: 제주도 2박 3일 여행 계획 부탁해"
            />
          </EmptyStateInputWrapper>
          <EmptyStateHints>
            <HintItem>💬 자연어로 편하게 말씀해주세요</HintItem>
            <HintItem>📅 날짜와 인원을 알려주시면 더 정확해요</HintItem>
            <HintItem>💰 예산이 있다면 함께 말씀해주세요</HintItem>
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
          <ChatSection>
            {/* 상단 툴바 */}
            <TopBar>
              <TopBarLeft>
                <ModelBadge>🤖 AI 여행 플래너</ModelBadge>
              </TopBarLeft>
              <TopBarRight>
                <IconButton
                  onClick={() => setShowInfoPanel(!showInfoPanel)}
                  title="정보 패널 토글"
                >
                  {showInfoPanel ? '›' : '‹'}
                </IconButton>
              </TopBarRight>
            </TopBar>

            {/* 메시지 리스트 */}
            <ChatMessageList
              messages={session.messages}
              isTyping={isTyping}
            />

            {/* 입력창 */}
            <InputArea>
              <ChatInput
                onSend={handleSendMessage}
                disabled={isTyping}
                placeholder={isTyping ? 'AI가 답변 중입니다...' : '메시지를 입력하세요...'}
              />
            </InputArea>
          </ChatSection>
        </ChatWrapper>

        {/* 우측 정보 패널 (토글 가능) */}
        {showInfoPanel && (
          <InfoPanel>
            <ChatInfoPanel
              context={context}
              messageCount={session.messages.length}
            />
          </InfoPanel>
        )}
      </MainArea>
    </PageContainer>
  );
};

export default Container;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
`;

const MainArea = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
  background-color: #fafafa;
`;

const ChatWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  overflow: hidden;
  background-color: #fafafa;
`;

const ChatSection = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  position: relative;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px;
  border-bottom: 1px solid #e8e8e8;
  background-color: #ffffff;
  z-index: 10;
  flex-shrink: 0;
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
  border-top: 1px solid #e8e8e8;
  flex-shrink: 0;
`;

const InfoPanel = styled.div`
  width: 340px;
  background-color: #fafafa;
  overflow-y: auto;
  flex-shrink: 0;

  @media (max-width: 1280px) {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    box-shadow: -4px 0 12px rgba(0, 0, 0, 0.08);
    z-index: 20;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fafafa;
`;

const LoadingText = styled.p`
  font-size: 15px;
  color: #888;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;
  padding: 24px;
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
