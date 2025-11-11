import React, { FC } from "react";

import dayjs from "dayjs";
import styled from "@emotion/styled";
import useChatStore from "@shared/store/chatStore";
import { useRouter } from "next/navigation";

interface Props {
  onNewChat: () => void;
}

const ChatSidebar: FC<Props> = ({ onNewChat }) => {
  const router = useRouter();
  const { sessions, getCurrentSession, loadSession, deleteSession } =
    useChatStore();
  const currentSession = getCurrentSession();

  const handleDeleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    if (confirm("이 채팅을 삭제하시겠어요?")) {
      deleteSession(sessionId);
    }
  };

  return (
    <Container>
      {/* 로고 */}
      <LogoSection>
        <Logo onClick={() => router.push("/")}>✈️ DIY Travel</Logo>
      </LogoSection>

      {/* 새 채팅 버튼 */}
      <NewChatButton onClick={onNewChat}>
        <PlusIcon>+</PlusIcon>새 채팅 시작
        <SessionCount>({sessions.length}/3)</SessionCount>
      </NewChatButton>

      {/* 대화 목록 */}
      <ChatListSection>
        <SectionTitle>채팅</SectionTitle>
        <ChatList>
          {sessions.length === 0 ? (
            <EmptyState>아직 대화가 없습니다</EmptyState>
          ) : (
            sessions.map((session) => (
              <ChatItem
                key={session.sessionId}
                active={currentSession?.sessionId === session.sessionId}
                onClick={() => loadSession(session.sessionId)}
              >
                <ChatItemLeft>
                  <ChatItemIcon>💬</ChatItemIcon>
                  <ChatItemTextWrapper>
                    <ChatItemText>{session.title || "새 대화"}</ChatItemText>
                    <ChatItemDate>
                      {dayjs(session.createdAt).format("MM/DD HH:mm")}
                    </ChatItemDate>
                  </ChatItemTextWrapper>
                </ChatItemLeft>
                <DeleteButton
                  onClick={(e) => handleDeleteSession(e, session.sessionId)}
                  title="삭제"
                >
                  ×
                </DeleteButton>
              </ChatItem>
            ))
          )}
        </ChatList>
      </ChatListSection>

      {/* 하단 메뉴 */}
      <BottomMenu>
        <MenuItem onClick={() => router.push("/")}>🏠 홈으로</MenuItem>
        <MenuItem onClick={() => router.push("/my-estimates")}>
          📋 내 견적서
        </MenuItem>
      </BottomMenu>
    </Container>
  );
};

export default ChatSidebar;

// Styled Components
const Container = styled.div`
  width: 260px;
  height: 100vh;
  background-color: #f7f7f8;
  border-right: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 0 8px; /* 좌우 여백 추가 */

  @media (max-width: 1024px) {
    display: none;
  }
`;

const LogoSection = styled.div`
  padding: 20px 8px;
  border-bottom: 1px solid #e5e5e5;
`;

const Logo = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #000;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #651d2a;
  }
`;

const NewChatButton = styled.button`
  margin: 16px 4px;
  padding: 12px 16px;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f0f0f0;
    border-color: #651d2a;
  }
`;

const PlusIcon = styled.span`
  font-size: 20px;
  font-weight: 300;
`;

const SessionCount = styled.span`
  font-size: 12px;
  color: #999;
  margin-left: auto;
`;

const ChatListSection = styled.div`
  flex: 1;
  padding: 8px 0;
  overflow-y: auto;
`;

const SectionTitle = styled.div`
  padding: 8px 8px;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const EmptyState = styled.div`
  padding: 20px 12px;
  text-align: center;
  font-size: 13px;
  color: #999;
`;

const ChatItem = styled.div<{ active?: boolean }>`
  padding: 10px 8px;
  border-radius: 8px;
  background-color: ${({ active }) => (active ? "#e8e8e8" : "transparent")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  transition: background-color 0.2s;
  position: relative;

  &:hover {
    background-color: #e8e8e8;
  }

  &:hover button {
    opacity: 1;
  }
`;

const ChatItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
`;

const ChatItemIcon = styled.span`
  font-size: 16px;
  flex-shrink: 0;
`;

const ChatItemTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`;

const ChatItemText = styled.span`
  font-size: 13px;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ChatItemDate = styled.span`
  font-size: 11px;
  color: #999;
`;

const DeleteButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: transparent;
  border: none;
  color: #999;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background-color: #ff4444;
    color: #ffffff;
  }
`;

const BottomMenu = styled.div`
  padding: 16px 4px;
  border-top: 1px solid #e5e5e5;
`;

const MenuItem = styled.div`
  padding: 10px 12px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
  margin-bottom: 4px;

  &:hover {
    background-color: #e8e8e8;
    color: #000;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
