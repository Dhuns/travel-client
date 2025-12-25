import styled from "@emotion/styled";
import { MESSAGES } from "@shared/constants/chat";
import useChatStore from "@shared/store/chatStore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Home, Plane } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC, useMemo } from "react";

dayjs.extend(relativeTime);

interface Props {
  onNewChat: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

type SessionStatus =
  | "active"
  | "converted"
  | "abandoned"
  | "estimate_ready"
  | "inprogress"
  | "pending_review"
  | "quote_sent"
  | "completed"
  | "declined"
  | "closed";

const getStatusConfig = (status: SessionStatus) => {
  const configs: Record<
    SessionStatus,
    { label: string; color: string; bg: string; icon: React.ReactNode }
  > = {
    active: {
      label: "Active",
      color: "var(--color-tumakr-sage-green)",
      bg: "#eff6ff",
      icon: null,
    },
    inprogress: {
      label: "In Progress",
      color: "#555",
      bg: "#e7e7e7",
      icon: (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ),
    },
    estimate_ready: {
      label: "Quote Ready",
      color: "var(--color-tumakr-dark-blue)",
      bg: "#e4f0ff",
      icon: (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    pending_review: {
      label: "Awaiting Review",
      color: "var(--color-tumakr-mustard)",
      bg: "#fffbeb",
      icon: (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
    },
    quote_sent: {
      label: "Quote Sent",
      color: "var(--color-tumakr-dark-blue)",
      bg: "#e4f0ff",
      icon: (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      ),
    },
    completed: {
      label: "Completed",
      color: "#00692c",
      bg: "#def1e8",
      icon: (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
    },
    declined: {
      label: "Declined",
      color: "var(--color-tumakr-maroon)",
      bg: "#f6eae9",
      icon: (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      ),
    },
    converted: {
      label: "Booked",
      color: "#00692c",
      bg: "#def1e8",
      icon: (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    abandoned: { label: "Inactive", color: "#9ca3af", bg: "#f9fafb", icon: null },
    closed: { label: "Closed", color: "#6b7280", bg: "#f3f4f6", icon: null },
  };
  return configs[status] || configs.active;
};

const ChatSidebar: FC<Props> = ({ onNewChat, isOpen = false, onClose }) => {
  const router = useRouter();

  // Selector pattern - 필요한 상태만 구독
  const sessions = useChatStore((state) => state.sessions);
  const currentSessionId = useChatStore((state) => state.currentSessionId);
  const loadSession = useChatStore((state) => state.loadSession);
  const deleteSession = useChatStore((state) => state.deleteSession);

  // 현재 세션 계산
  const currentSession = sessions.find((s) => s.sessionId === currentSessionId) || null;

  const handleDeleteSession = async (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    if (confirm(MESSAGES.DELETE_SESSION_CONFIRM)) {
      await deleteSession(sessionId);
    }
  };

  const handleLoadSession = (sessionId: string) => {
    loadSession(sessionId);
    if (onClose) onClose();
  };

  const handleNewChatClick = () => {
    onNewChat();
    if (onClose) onClose();
  };

  const handleNavClick = (path: string) => {
    router.push(path);
    if (onClose) onClose();
  };

  const sortedSessions = useMemo(() => {
    return [...sessions].sort((a, b) => {
      const aTime = a.lastMessageAt || a.createdAt;
      const bTime = b.lastMessageAt || b.createdAt;
      const timeDiff = new Date(bTime).getTime() - new Date(aTime).getTime();
      if (timeDiff === 0) {
        return a.sessionId.localeCompare(b.sessionId);
      }
      return timeDiff;
    });
  }, [sessions]);

  const formatTime = (date: Date | string | undefined) => {
    if (!date) return "";
    const d = dayjs(date);
    return d.format("MMM D, HH:mm");
  };

  const shouldShowBadge = (status: SessionStatus) => {
    return [
      "pending_review",
      "quote_sent",
      "estimate_ready",
      "completed",
      "declined",
      "inprogress",
    ].includes(status);
  };

  return (
    <Container isOpen={isOpen}>
      {/* Header Section */}
      <Header>
        <LogoWrapper onClick={() => handleNavClick("/")}>
          <LogoIcon>
            <Image src="/tumakr-logo(no-text).png" alt="tumakr" width={32} height={32} />
          </LogoIcon>
          <LogoTextWrapper>
            <LogoTitle>tumakr</LogoTitle>
            <LogoSubtitle>by OnedayKorea</LogoSubtitle>
          </LogoTextWrapper>
        </LogoWrapper>
      </Header>

      {/* New Chat Button */}
      <NewChatSection>
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
      </NewChatSection>

      {/* Chat List */}
      <ChatListSection>
        <SectionHeader>
          <SectionLabel>Conversations</SectionLabel>
          <SessionCount>{sessions.length}</SessionCount>
        </SectionHeader>
        <ChatList>
          {sessions.length === 0 ? (
            <EmptyState>
              <EmptyIcon>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </EmptyIcon>
              <EmptyTitle>No conversations yet</EmptyTitle>
              <EmptyText>
                Start planning your Korea trip by clicking the button above
              </EmptyText>
            </EmptyState>
          ) : (
            sortedSessions.map((session) => {
              const isActive = currentSession?.sessionId === session.sessionId;

              // batch.status를 우선적으로 확인 (declined 상태 등)
              let status: SessionStatus;
              if (session.batch?.status === "declined") {
                status = "declined";
              } else if (session.batch?.status === "accepted") {
                status = "completed";
              } else {
                status = (session.status || "active") as SessionStatus;
              }

              const statusConfig = getStatusConfig(status);

              return (
                <ChatItem
                  key={session.sessionId}
                  active={isActive}
                  onClick={() => handleLoadSession(session.sessionId)}
                >
                  <ChatItemContent>
                    <ChatItemTitleRow>
                      <ChatItemTitle>{session.title || "New Chat"}</ChatItemTitle>
                      {shouldShowBadge(status) && (
                        <StatusBadge $color={statusConfig.color} $bg={statusConfig.bg}>
                          {statusConfig.icon}
                          {statusConfig.label}
                        </StatusBadge>
                      )}
                    </ChatItemTitleRow>
                    <ChatItemMetaRow>
                      <ChatItemTime>
                        {formatTime(session.lastMessageAt || session.createdAt)}
                      </ChatItemTime>
                    </ChatItemMetaRow>
                  </ChatItemContent>
                  <DeleteButton
                    onClick={(e) => handleDeleteSession(e, session.sessionId)}
                    title="Delete conversation"
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
              );
            })
          )}
        </ChatList>
      </ChatListSection>

      {/* Bottom Navigation */}
      <BottomNav>
        <NavItem onClick={() => router.push("/")}>
          <Home size={18} />
          <span>Home</span>
        </NavItem>
        <NavItem onClick={() => router.push("/tours")}>
          <Plane size={18} />
          <span>Tours</span>
        </NavItem>
      </BottomNav>
    </Container>
  );
};

export default React.memo(ChatSidebar);

// Styled Components
const Container = styled.div<{ isOpen?: boolean }>`
  width: 300px;
  min-height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    left: ${({ isOpen }) => (isOpen ? "0" : "-300px")};
    bottom: 0;
    z-index: 1000;
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${({ isOpen }) => (isOpen ? "4px 0 24px rgba(0, 0, 0, 0.12)" : "none")};
  }
`;

const Header = styled.div`
  padding: 20px 16px;
  flex-shrink: 0;
  border-bottom: 1px solid #e5e7eb;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 10px 12px;
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(101, 29, 42, 0.05);
  }
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const LogoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const LogoTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
  letter-spacing: -0.5px;
`;

const LogoSubtitle = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: #9ca3af;
  line-height: 1;
`;

const NewChatSection = styled.div`
  padding: 16px;
  flex-shrink: 0;
`;

const NewChatButton = styled.button`
  width: 100%;
  padding: 14px 18px;
  background: linear-gradient(135deg, var(--color-tumakr-maroon) 0%, #8b1a2d 100%);
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
  width: 30px;
  height: 30px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
`;

const ChatListSection = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding: 0 12px 12px 12px;

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

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 8px;
  position: sticky;
  top: 0;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.9) 100%);
  backdrop-filter: blur(8px);
  z-index: 1;
`;

const SectionLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SessionCount = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: var(--color-tumakr-maroon);
  background: rgba(101, 29, 42, 0.1);
  padding: 3px 10px;
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
  padding: 48px 24px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  color: #d1d5db;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 6px;
`;

const EmptyText = styled.div`
  font-size: 13px;
  color: #9ca3af;
  line-height: 1.5;
`;

const ChatItem = styled.div<{ active?: boolean }>`
  padding: 12px 14px;
  border-radius: 12px;
  background-color: ${({ active }) =>
    active ? "rgba(101, 29, 42, 0.06)" : "transparent"};
  border: 1px solid
    ${({ active }) => (active ? "rgba(101, 29, 42, 0.12)" : "transparent")};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${({ active }) =>
      active ? "rgba(101, 29, 42, 0.08)" : "rgba(0, 0, 0, 0.03)"};
  }

  &:hover button {
    opacity: 1;
  }
`;

const ChatItemContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ChatItemTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

const ChatItemTitle = styled.span`
  font-size: 14px;
  color: #1f2937;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  flex-shrink: 1;
  min-width: 0;
`;

const ChatItemMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ChatItemTime = styled.span`
  font-size: 12px;
  color: #9ca3af;
  white-space: nowrap;
`;

const StatusBadge = styled.span<{ $color: string; $bg: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  font-size: 10px;
  font-weight: 600;
  border-radius: 6px;
  flex-shrink: 0;
  white-space: nowrap;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};

  svg {
    flex-shrink: 0;
  }
`;

const DeleteButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background-color: transparent;
  border: none;
  color: #d1d5db;
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
  border-top: 1px solid #e5e7eb;
  flex-shrink: 0;
  display: flex;
  gap: 10px;
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
  color: #6b7280;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: rgba(101, 29, 42, 0.06);
    border-color: rgba(101, 29, 42, 0.15);
    color: var(--color-tumakr-maroon);
  }

  span {
    letter-spacing: 0.3px;
  }
`;
