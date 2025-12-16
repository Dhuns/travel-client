import styled from "@emotion/styled";
import { MESSAGES } from "@shared/constants/chat";
import useChatStore from "@shared/store/chatStore";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface Props {
  onNewChat: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const ChatSidebar: FC<Props> = ({ onNewChat, isOpen = false, onClose }) => {
  const router = useRouter();
  const { sessions, getCurrentSession, loadSession, deleteSession } = useChatStore();
  const currentSession = getCurrentSession();

  const handleDeleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    if (confirm(MESSAGES.DELETE_SESSION_CONFIRM)) {
      deleteSession(sessionId);
    }
  };

  const handleLoadSession = (sessionId: string) => {
    loadSession(sessionId);
    if (onClose) onClose(); // 모바일에서 세션 선택 시 사이드바 닫기
  };

  const handleNewChatClick = () => {
    onNewChat();
    if (onClose) onClose(); // 모바일에서 새 채팅 시작 시 사이드바 닫기
  };

  return (
    <Container isOpen={isOpen}>
      {/* New Chat Button */}
      <NewChatButton onClick={handleNewChatClick}>
        <NewChatIconWrapper>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </NewChatIconWrapper>
        <span>New Conversation</span>
      </NewChatButton>

      {/* Chat List */}
      <ChatListSection>
        <SectionHeader>
          <SectionLabel>History</SectionLabel>
          <SessionCount>{sessions.length}</SessionCount>
        </SectionHeader>
        <ChatList>
          {sessions.length === 0 ? (
            <EmptyState>
              <EmptyIcon>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </EmptyIcon>
              <EmptyText>Start your first conversation</EmptyText>
            </EmptyState>
          ) : (
            [...sessions]
              .sort((a, b) => {
                const aTime = a.lastMessageAt || a.createdAt;
                const bTime = b.lastMessageAt || b.createdAt;
                return new Date(bTime).getTime() - new Date(aTime).getTime();
              })
              .map((session, index) => (
                <ChatItem
                  key={session.sessionId}
                  active={currentSession?.sessionId === session.sessionId}
                  onClick={() => handleLoadSession(session.sessionId)}
                >
                  <ChatItemIcon active={currentSession?.sessionId === session.sessionId}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </ChatItemIcon>
                  <ChatItemContent>
                    <ChatItemTitle>{session.title || "New Chat"}</ChatItemTitle>
                    <ChatItemMeta>
                      {dayjs(session.lastMessageAt || session.createdAt).format(
                        "MMM D, HH:mm"
                      )}
                    </ChatItemMeta>
                  </ChatItemContent>
                  <DeleteButton
                    onClick={(e) => handleDeleteSession(e, session.sessionId)}
                    title="Delete"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </DeleteButton>
                </ChatItem>
              ))
          )}
        </ChatList>
      </ChatListSection>

      {/* Bottom Navigation */}
      <BottomNav>
        <NavItem onClick={() => router.push("/")}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Home</span>
        </NavItem>
        <NavItem onClick={() => router.push("/orders")}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
            <path d="M9 12h6M9 16h6" />
          </svg>
          <span>Orders</span>
        </NavItem>
      </BottomNav>
    </Container>
  );
};

export default React.memo(ChatSidebar);

// Styled Components
const Container = styled.div<{ isOpen?: boolean }>`
  width: 280px;
  background: linear-gradient(180deg, #fefefe 0%, #f8f7f5 100%);
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
  padding-top: 20px;

  @media (max-width: 1024px) {
    position: fixed;
    top: 80px;
    left: ${({ isOpen }) => (isOpen ? "0" : "-280px")};
    bottom: 0;
    z-index: 1000;
    transition: left 0.3s ease-in-out;
    box-shadow: ${({ isOpen }) => (isOpen ? "4px 0 12px rgba(0, 0, 0, 0.15)" : "none")};
  }
`;

const Header = styled.div`
  padding: 20px 16px 16px;
  flex-shrink: 0;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(101, 29, 42, 0.05);
  }
`;

const LogoIcon = styled.div`
  color: var(--color-tumakr-maroon);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.span`
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    var(--color-tumakr-maroon) 0%,
    var(--color-tumakr-maroon) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const NewChatButton = styled.button`
  margin: 0 16px 20px 16px;
  padding: 14px 18px;
  background: linear-gradient(
    135deg,
    var(--color-tumakr-maroon) 0%,
    var(--color-tumakr-maroon) 100%
  );
  border: none;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(101, 29, 42, 0.25);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(101, 29, 42, 0.35);
  }

  &:active {
    transform: translateY(0);
  }
`;

const NewChatIconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
`;

const ChatListSection = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding: 0 12px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(101, 29, 42, 0.15);
    border-radius: 4px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 8px 12px 8px;
`;

const SectionLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SessionCount = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: var(--color-tumakr-maroon);
  background: rgba(101, 29, 42, 0.1);
  padding: 2px 8px;
  border-radius: 10px;
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  color: #ccc;
  margin-bottom: 12px;
`;

const EmptyText = styled.div`
  font-size: 13px;
  color: #999;
`;

const ChatItem = styled.div<{ active?: boolean }>`
  padding: 12px 14px;
  border-radius: 12px;
  background-color: ${({ active }) =>
    active ? "rgba(101, 29, 42, 0.08)" : "transparent"};
  border: 1px solid
    ${({ active }) => (active ? "rgba(101, 29, 42, 0.15)" : "transparent")};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${({ active }) =>
      active ? "rgba(101, 29, 42, 0.1)" : "rgba(0, 0, 0, 0.03)"};
  }

  &:hover button {
    opacity: 1;
  }
`;

const ChatItemIcon = styled.div<{ active?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: ${({ active }) =>
    active
      ? "linear-gradient(135deg, var(--color-tumakr-maroon) 0%, var(--color-tumakr-maroon) 100%)"
      : "#f0f0f0"};
  color: ${({ active }) => (active ? "white" : "#888")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.15s ease;
`;

const ChatItemContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const ChatItemTitle = styled.span`
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
`;

const ChatItemMeta = styled.span`
  font-size: 11px;
  color: #999;
`;

const DeleteButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background-color: transparent;
  border: none;
  color: #bbb;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background-color: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }
`;

const BottomNav = styled.div`
  padding: 16px;
  border-top: 1px solid #eee;
  flex-shrink: 0;
  display: flex;
  gap: 8px;
`;

const NavItem = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 8px;
  font-size: 11px;
  font-weight: 500;
  color: #666;
  background: #f5f5f5;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: rgba(101, 29, 42, 0.08);
    color: var(--color-tumakr-maroon);
  }

  span {
    letter-spacing: 0.3px;
  }
`;
