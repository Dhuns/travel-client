import React, { FC } from "react";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import useChatStore from "@shared/store/chatStore";
import { useRouter } from "next/navigation";
import { MAX_CHAT_SESSIONS, MESSAGES, UI_TEXT } from "@shared/constants/chat";

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
    if (confirm(MESSAGES.DELETE_SESSION_CONFIRM)) {
      deleteSession(sessionId);
    }
  };

  return (
    <Container>
      {/* Logo */}
      <LogoSection>
        <Logo>✈️ Tumakr AI</Logo>
      </LogoSection>

      {/* New Chat Button */}
      <NewChatButton onClick={onNewChat}>
        <PlusIcon>+</PlusIcon>{UI_TEXT.NEW_CHAT}
        <SessionCount>({sessions.length}/{MAX_CHAT_SESSIONS})</SessionCount>
      </NewChatButton>

      {/* Chat List */}
      <ChatListSection>
        <SectionTitle>{UI_TEXT.CHATS}</SectionTitle>
        <ChatList>
          {sessions.length === 0 ? (
            <EmptyState>{UI_TEXT.NO_CHATS}</EmptyState>
          ) : (
            [...sessions]
              .sort((a, b) => {
                const aTime = a.lastMessageAt || a.createdAt;
                const bTime = b.lastMessageAt || b.createdAt;
                return new Date(bTime).getTime() - new Date(aTime).getTime();
              })
              .map((session) => (
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
                        {dayjs(session.lastMessageAt || session.createdAt).format("MM/DD HH:mm")}
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

      {/* Bottom Menu */}
      <BottomMenu>
        <MenuItem onClick={() => router.push("/")}>🏠 Home</MenuItem>
        <MenuItem onClick={() => router.push("/my-estimates")}>
          📋 My Quotes
        </MenuItem>
      </BottomMenu>
    </Container>
  );
};

export default React.memo(ChatSidebar);

// Styled Components
const Container = styled.div`
  width: 260px;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 12px;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const LogoSection = styled.div`
  padding: 18px 4px;
  flex-shrink: 0;
`;

const Logo = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: #1a1a1a;
`;

const NewChatButton = styled.button`
  margin: 14px 0;
  padding: 11px 14px;
  background-color: #f8f8f8;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const PlusIcon = styled.span`
  font-size: 20px;
  font-weight: 300;
`;

const SessionCount = styled.span`
  font-size: 11px;
  color: #aaa;
  margin-left: auto;
`;

const ChatListSection = styled.div`
  flex: 1;
  padding: 8px 0;
  overflow-y: auto;
  min-height: 0;
`;

const SectionTitle = styled.div`
  padding: 12px 4px 8px 4px;
  font-size: 11px;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const EmptyState = styled.div`
  padding: 32px 12px;
  text-align: center;
  font-size: 13px;
  color: #aaa;
`;

const ChatItem = styled.div<{ active?: boolean }>`
  padding: 10px 8px;
  border-radius: 6px;
  background-color: ${({ active }) => (active ? "#f0f0f0" : "transparent")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  transition: all 0.15s;
  position: relative;

  &:hover {
    background-color: #f5f5f5;
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
  color: #1a1a1a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
`;

const ChatItemDate = styled.span`
  font-size: 11px;
  color: #aaa;
`;

const DeleteButton = styled.button`
  width: 22px;
  height: 22px;
  border-radius: 4px;
  background-color: transparent;
  border: none;
  color: #ccc;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.15s;
  flex-shrink: 0;

  &:hover {
    background-color: #ff4444;
    color: #ffffff;
  }
`;

const BottomMenu = styled.div`
  padding: 14px 0;
  flex-shrink: 0;
`;

const MenuItem = styled.div`
  padding: 10px 8px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s;
  margin-bottom: 2px;

  &:hover {
    background-color: #f5f5f5;
    color: #1a1a1a;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
