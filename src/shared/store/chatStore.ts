import { create } from 'zustand';
import { ChatMessage, ChatSession, ChatContext } from '../types/chat';
import {
  createChatSession,
  getChatSession,
  updateChatSession,
  sendChatMessage,
  getChatMessages,
  generateAIResponse,
} from '../apis/chat';

const MAX_SESSIONS = 3;
const STORAGE_KEY = 'diy-chat-sessions';

interface ChatStore {
  // 상태
  sessions: ChatSession[];
  currentSessionId: string | null;
  isTyping: boolean;
  isLoading: boolean;

  // Getters
  getCurrentSession: () => ChatSession | null;

  // 액션
  initSession: () => Promise<boolean>;
  loadSession: (sessionId: string) => Promise<void>;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => Promise<void>;
  sendUserMessage: (content: string) => Promise<void>;
  updateLastMessage: (content: string) => void;
  setIsTyping: (isTyping: boolean) => void;
  updateContext: (context: Partial<ChatContext>) => Promise<void>;
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
  isLoading: false,

  // 현재 세션 가져오기
  getCurrentSession: () => {
    const { sessions, currentSessionId } = get();
    return sessions.find(s => s.sessionId === currentSessionId) || null;
  },

  // 세션 초기화 (API 사용)
  initSession: async () => {
    const { sessions } = get();

    // 최대 개수 체크
    if (sessions.length >= MAX_SESSIONS) {
      alert(`최대 ${MAX_SESSIONS}개의 채팅만 생성할 수 있습니다.\n기존 채팅을 삭제해주세요.`);
      return false;
    }

    try {
      set({ isLoading: true });

      // 백엔드에 세션 생성
      const newSession = await createChatSession({
        title: 'New Chat',
        context: {},
      });

      // 로컬 상태 업데이트
      set({
        sessions: [...sessions, {
          ...newSession,
          messages: [],
          createdAt: new Date(newSession.createdAt),
          lastMessageAt: undefined,
        }],
        currentSessionId: newSession.sessionId,
        isLoading: false,
      });

      get().saveToStorage();
      return true;
    } catch (error) {
      console.error('Failed to create session:', error);
      set({ isLoading: false });
      return false;
    }
  },

  // 세션 로드 (API에서 메시지 가져오기)
  loadSession: async (sessionId: string) => {
    try {
      set({ isLoading: true });

      // 백엔드에서 세션 및 메시지 가져오기
      const session = await getChatSession(sessionId);

      const { sessions } = get();
      const existingSessionIndex = sessions.findIndex(s => s.sessionId === sessionId);

      if (existingSessionIndex >= 0) {
        // 기존 세션 업데이트
        const updatedSessions = [...sessions];
        updatedSessions[existingSessionIndex] = {
          ...session,
          createdAt: new Date(session.createdAt),
          lastMessageAt: session.lastMessageAt ? new Date(session.lastMessageAt) : undefined,
          messages: session.messages?.map((m: any) => ({
            ...m,
            timestamp: new Date(m.sentAt),
          })) || [],
        };

        set({
          sessions: updatedSessions,
          currentSessionId: sessionId,
          isLoading: false,
        });
      } else {
        // 새로운 세션 추가
        set({
          sessions: [...sessions, {
            ...session,
            createdAt: new Date(session.createdAt),
            lastMessageAt: session.lastMessageAt ? new Date(session.lastMessageAt) : undefined,
            messages: session.messages?.map((m: any) => ({
              ...m,
              timestamp: new Date(m.sentAt),
            })) || [],
          }],
          currentSessionId: sessionId,
          isLoading: false,
        });
      }

      get().saveToStorage();
    } catch (error) {
      console.error('Failed to load session:', error);
      set({ isLoading: false });
    }
  },

  // 메시지 추가 (로컬만, DB 저장 안함)
  addMessage: async (message) => {
    const { sessions, currentSessionId } = get();
    if (!currentSessionId) return;

    const newMessage: ChatMessage = {
      ...message,
      id: `temp-${Date.now()}`, // 임시 ID
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

  // 사용자 메시지 전송 및 AI 응답 받기
  sendUserMessage: async (content: string) => {
    const { currentSessionId, addMessage, setIsTyping } = get();
    if (!currentSessionId) return;

    try {
      // 1. 사용자 메시지 로컬 추가
      await addMessage({
        role: 'user',
        type: 'text',
        content,
      });

      // 2. AI 응답 생성 요청
      setIsTyping(true);
      const aiMessage = await generateAIResponse(currentSessionId, content);

      // 3. AI 응답 로컬 추가
      const { sessions } = get();
      const updatedSessions = sessions.map(session => {
        if (session.sessionId === currentSessionId) {
          return {
            ...session,
            messages: [...session.messages, {
              ...aiMessage,
              id: aiMessage.messageId || `msg-${Date.now()}`,
              messageId: aiMessage.messageId,
              timestamp: aiMessage.sentAt ? new Date(aiMessage.sentAt) : new Date(),
              sentAt: aiMessage.sentAt ? new Date(aiMessage.sentAt) : undefined,
            }],
            lastMessageAt: new Date(),
          };
        }
        return session;
      });

      set({
        sessions: updatedSessions,
        isTyping: false,
      });

      get().saveToStorage();
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsTyping(false);

      // 에러 메시지 표시
      await addMessage({
        role: 'assistant',
        type: 'system',
        content: '죄송합니다. 메시지 전송 중 오류가 발생했습니다. 다시 시도해주세요.',
      });
    }
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

  // 컨텍스트 업데이트 (API 동기화)
  updateContext: async (newContext) => {
    const { sessions, currentSessionId } = get();
    if (!currentSessionId) return;

    try {
      // 로컬 상태 업데이트
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

      // 백엔드 동기화
      const session = updatedSessions.find(s => s.sessionId === currentSessionId);
      if (session) {
        await updateChatSession(currentSessionId, {
          context: session.context,
        });
      }

      get().saveToStorage();
    } catch (error) {
      console.error('Failed to update context:', error);
    }
  },

  // 현재 세션 초기화
  clearSession: () => {
    set({
      currentSessionId: null,
      isTyping: false,
    });
  },

  // 세션 삭제 (로컬만, DB 삭제는 나중에 추가 가능)
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
