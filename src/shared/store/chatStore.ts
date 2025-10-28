import { create } from 'zustand';
import { ChatMessage, ChatSession, ChatContext } from '../types/chat';
import { v4 as uuidv4 } from 'uuid';

const MAX_SESSIONS = 3;
const STORAGE_KEY = 'diy-chat-sessions';

interface ChatStore {
  // 상태
  sessions: ChatSession[];
  currentSessionId: string | null;
  isTyping: boolean;

  // Getters
  getCurrentSession: () => ChatSession | null;

  // 액션
  initSession: () => boolean;
  loadSession: (sessionId: string) => void;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  updateLastMessage: (content: string) => void;
  setIsTyping: (isTyping: boolean) => void;
  updateContext: (context: Partial<ChatContext>) => void;
  clearSession: () => void;
  deleteSession: (sessionId: string) => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

const useChatStore = create<ChatStore>((set, get) => ({
  // 초기 상태
  sessions: [],
  currentSessionId: null,
  isTyping: false,

  // 현재 세션 가져오기
  getCurrentSession: () => {
    const { sessions, currentSessionId } = get();
    return sessions.find(s => s.sessionId === currentSessionId) || null;
  },

  // 세션 초기화
  initSession: () => {
    const { sessions } = get();

    // 최대 개수 체크
    if (sessions.length >= MAX_SESSIONS) {
      alert(`최대 ${MAX_SESSIONS}개의 채팅만 생성할 수 있습니다.\n기존 채팅을 삭제해주세요.`);
      return false;
    }

    const sessionId = uuidv4();
    const newSession: ChatSession = {
      sessionId,
      status: 'active',
      messages: [],
      context: {},
      createdAt: new Date(),
    };

    set({
      sessions: [...sessions, newSession],
      currentSessionId: sessionId,
    });

    get().saveToStorage();
    return true;
  },

  // 세션 로드
  loadSession: (sessionId: string) => {
    const { sessions } = get();
    const session = sessions.find(s => s.sessionId === sessionId);
    if (session) {
      set({ currentSessionId: sessionId });
    }
  },

  // 메시지 추가
  addMessage: (message) => {
    const { sessions, currentSessionId } = get();
    if (!currentSessionId) return;

    const newMessage: ChatMessage = {
      ...message,
      id: uuidv4(),
      timestamp: new Date(),
    };

    const updatedSessions = sessions.map(session => {
      if (session.sessionId === currentSessionId) {
        const updatedMessages = [...session.messages, newMessage];

        // 제목 자동 생성 (첫 사용자 메시지)
        let title = session.title;
        if (!title && message.role === 'user' && updatedMessages.length > 0) {
          title = message.content.slice(0, 30) + (message.content.length > 30 ? '...' : '');
        }

        return {
          ...session,
          messages: updatedMessages,
          title,
          lastMessageAt: new Date(),
        };
      }
      return session;
    });

    set({ sessions: updatedSessions });
    get().saveToStorage();
  },

  // 마지막 메시지 업데이트 (스트리밍용)
  updateLastMessage: (content) => {
    const { sessions, currentSessionId } = get();
    if (!currentSessionId) return;

    const updatedSessions = sessions.map(session => {
      if (session.sessionId === currentSessionId && session.messages.length > 0) {
        const messages = [...session.messages];
        const lastIndex = messages.length - 1;
        messages[lastIndex] = {
          ...messages[lastIndex],
          content,
        };
        return { ...session, messages };
      }
      return session;
    });

    set({ sessions: updatedSessions });
  },

  // 타이핑 상태 설정
  setIsTyping: (isTyping) => {
    set({ isTyping });
  },

  // 컨텍스트 업데이트
  updateContext: (newContext) => {
    const { sessions, currentSessionId } = get();
    if (!currentSessionId) return;

    const updatedSessions = sessions.map(session => {
      if (session.sessionId === currentSessionId) {
        return {
          ...session,
          context: {
            ...session.context,
            ...newContext,
          },
        };
      }
      return session;
    });

    set({ sessions: updatedSessions });
    get().saveToStorage();
  },

  // 현재 세션 초기화
  clearSession: () => {
    set({
      currentSessionId: null,
      isTyping: false,
    });
  },

  // 세션 삭제
  deleteSession: (sessionId: string) => {
    const { sessions, currentSessionId } = get();
    const updatedSessions = sessions.filter(s => s.sessionId !== sessionId);

    set({
      sessions: updatedSessions,
      currentSessionId: currentSessionId === sessionId ? null : currentSessionId,
    });

    get().saveToStorage();
  },

  // localStorage에서 로드
  loadFromStorage: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Date 객체 복원
        const sessions = parsed.map((s: any) => ({
          ...s,
          createdAt: new Date(s.createdAt),
          lastMessageAt: s.lastMessageAt ? new Date(s.lastMessageAt) : undefined,
          messages: s.messages.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          })),
        }));
        set({ sessions });
      }
    } catch (error) {
      console.error('Failed to load chat sessions:', error);
    }
  },

  // localStorage에 저장
  saveToStorage: () => {
    try {
      const { sessions } = get();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (error) {
      console.error('Failed to save chat sessions:', error);
    }
  },
}));

export default useChatStore;
