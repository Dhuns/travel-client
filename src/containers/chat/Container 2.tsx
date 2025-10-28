import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useChatStore from '@/shared/store/chatStore';
import ChatMessageList from '@/components/Chat/ChatMessageList';
import ChatInput from '@/components/Chat/ChatInput';
import ChatInfoPanel from '@/components/Chat/ChatInfoPanel';
import ChatSidebar from '@/components/Chat/ChatSidebar';
import { getMockAIResponse, simulateAITyping } from '@/shared/utils/mockAI';

const Container: FC = () => {
  const { session, context, isTyping, initSession, addMessage, setIsTyping, updateContext, clearSession } = useChatStore();
  const [showInfoPanel, setShowInfoPanel] = useState(true);

  // 새 채팅 시작
  const handleNewChat = () => {
    if (confirm('새 채팅을 시작하시겠어요? 현재 대화 내용이 초기화됩니다.')) {
      clearSession();
      initSession();
      setTimeout(() => {
        addMessage({
          role: 'assistant',
          type: 'text',
          content: '안녕하세요! 원데이코리아 AI 여행 플래너입니다 😊\n어떤 여행을 계획중이세요?',
        });
      }, 500);
    }
  };

  // 세션 초기화 및 웰컴 메시지
  useEffect(() => {
    if (!session) {
      initSession();

      // 웰컴 메시지 추가
      setTimeout(() => {
        addMessage({
          role: 'assistant',
          type: 'text',
          content: '안녕하세요! 원데이코리아 AI 여행 플래너입니다 😊\n어떤 여행을 계획중이세요?',
        });
      }, 500);
    }
  }, []);

  // 메시지 전송 핸들러
  const handleSendMessage = async (content: string) => {
    if (!session) return;

    // 사용자 메시지 추가
    addMessage({
      role: 'user',
      type: 'text',
      content,
    });

    // 컨텍스트 추출 (간단한 키워드 매칭)
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

    // 대화 히스토리 생성
    const conversationHistory = session.messages.map(m => m.content);

    // AI 타이핑 시작
    setIsTyping(true);

    // Mock AI 응답 생성
    await simulateAITyping(() => {
      const response = getMockAIResponse(content, conversationHistory);

      // AI 텍스트 응답
      addMessage({
        role: 'assistant',
        type: 'text',
        content: response.text,
      });

      // 견적서가 포함된 경우
      if (response.estimate) {
        setTimeout(() => {
          addMessage({
            role: 'assistant',
            type: 'estimate',
            content: '이렇게 준비해봤어요!',
            metadata: {
              estimatePreview: response.estimate,
            },
          });
        }, 800);
      }

      setIsTyping(false);
    });
  };

  if (!session) {
    return (
      <LoadingContainer>
        <LoadingText>채팅을 시작하는 중...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <PageContainer>
      {/* 좌측: 채팅 영역 */}
      <ChatSection>
        {/* 헤더 */}
        <Header>
          <HeaderTitle>💬 AI 여행 플래너</HeaderTitle>
          <HeaderSubtitle>원하시는 여행을 알려주세요</HeaderSubtitle>
        </Header>

        {/* 메시지 리스트 */}
        <ChatMessageList
          messages={session.messages}
          isTyping={isTyping}
        />

        {/* 입력창 */}
        <ChatInput
          onSend={handleSendMessage}
          disabled={isTyping}
          placeholder={isTyping ? 'AI가 답변 중입니다...' : '메시지를 입력하세요...'}
        />
      </ChatSection>

      {/* 우측: 정보 패널 */}
      <InfoSection>
        <ChatInfoPanel
          context={context}
          messageCount={session.messages.length}
        />
      </InfoSection>
    </PageContainer>
  );
};

export default Container;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const ChatSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  min-width: 0; /* Allow flex item to shrink below content size */

  @media (max-width: 1024px) {
    height: 60vh;
  }
`;

const InfoSection = styled.div`
  width: 380px;
  background-color: #f8f9fa;

  @media (max-width: 1024px) {
    width: 100%;
    height: 40vh;
  }
`;

const Header = styled.div`
  padding: 20px 24px;
  background-color: #007AFF;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
`;

const HeaderSubtitle = styled.p`
  margin: 6px 0 0 0;
  font-size: 14px;
  opacity: 0.9;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const LoadingText = styled.p`
  font-size: 16px;
  color: #666;
`;
