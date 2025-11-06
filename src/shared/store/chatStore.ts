import { ChatContext, ChatMessage, ChatSession } from "../types/chat";
import {
  createChatSession,
  generateAIResponse,
  generateEstimate,
  getChatMessages,
  getChatSession,
  sendChatMessage,
  updateChatSession,
} from "../apis/chat";

import { create } from "zustand";

const MAX_SESSIONS = 3;
const STORAGE_KEY = "diy-chat-sessions";

interface ChatStore {
  // 상태
  sessions: ChatSession[];
  currentSessionId: string | null;
  isTyping: boolean;
  isLoading: boolean;
  isChatOpen: boolean;
  isGeneratingEstimate: boolean;

  // Getters
  getCurrentSession: () => ChatSession | null;
  canGenerateEstimate: () => boolean;

  // 액션
  initSession: () => Promise<boolean>;
  loadSession: (sessionId: string) => Promise<void>;
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => Promise<void>;
  sendUserMessage: (content: string) => Promise<void>;
  updateLastMessage: (content: string) => void;
  setIsTyping: (isTyping: boolean) => void;
  updateContext: (context: Partial<ChatContext>) => Promise<void>;
  generateEstimateForSession: (userId?: number) => Promise<boolean>;
  clearSession: () => void;
  deleteSession: (sessionId: string) => void;
  loadFromStorage: () => void;
  toggleChat: () => void;
  saveToStorage: () => void;
}

const useChatStore = create<ChatStore>((set, get) => ({
  // 초기 상태
  sessions: [],
  currentSessionId: null,
  isTyping: false,
  isLoading: false,
  isChatOpen: false,
  isGeneratingEstimate: false,

  // 현재 세션 가져오기
  getCurrentSession: () => {
    const { sessions, currentSessionId } = get();
    return sessions.find((s) => s.sessionId === currentSessionId) || null;
  },

  // 견적서 생성 가능 여부 확인
  canGenerateEstimate: () => {
    const session = get().getCurrentSession();
    if (!session || session.batchId) return false; // 이미 견적서가 있으면 불가

    const ctx = session.context;
    // 필수 정보: 목적지, 출발/도착일, 성인 수 (모두 유효한 값이어야 함)
    const hasDestination = ctx.destination && ctx.destination.trim().length > 0;
    const hasStartDate = ctx.startDate && ctx.startDate.trim().length > 0;
    const hasEndDate = ctx.endDate && ctx.endDate.trim().length > 0;
    const hasAdults = ctx.adults && ctx.adults > 0;

    return !!(hasDestination && hasStartDate && hasEndDate && hasAdults);
  },

  // 세션 초기화 (API 사용)
  initSession: async () => {
    const { sessions } = get();

    // 최대 개수 체크
    if (sessions.length >= MAX_SESSIONS) {
      alert(
        `최대 ${MAX_SESSIONS}개의 채팅만 생성할 수 있습니다.\n\n` +
          `💡 좌측 사이드바에서 기존 채팅을 선택하거나\n` +
          `불필요한 채팅을 삭제한 후 새 채팅을 시작해주세요.`
      );
      return false;
    }

    try {
      set({ isLoading: true });

      // 백엔드에 세션 생성
      const newSession = await createChatSession({
        title: "New Chat",
        context: {},
      });

      // 로컬 상태 업데이트
      set({
        sessions: [
          ...sessions,
          {
            ...newSession,
            messages: [],
            createdAt: new Date(newSession.createdAt),
            lastMessageAt: undefined,
          },
        ],
        currentSessionId: newSession.sessionId,
        isLoading: false,
      });

      get().saveToStorage();
      return true;
    } catch (error) {
      // Failed to create session - silent fail
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
      const existingSessionIndex = sessions.findIndex(
        (s) => s.sessionId === sessionId
      );

      if (existingSessionIndex >= 0) {
        // 기존 세션 업데이트
        const updatedSessions = [...sessions];
        updatedSessions[existingSessionIndex] = {
          ...session,
          createdAt: new Date(session.createdAt),
          lastMessageAt: session.lastMessageAt
            ? new Date(session.lastMessageAt)
            : undefined,
          messages:
            session.messages?.map((m) => ({
              ...m,
              timestamp: new Date(m.sentAt || m.timestamp),
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
          sessions: [
            ...sessions,
            {
              ...session,
              createdAt: new Date(session.createdAt),
              lastMessageAt: session.lastMessageAt
                ? new Date(session.lastMessageAt)
                : undefined,
              messages:
                session.messages?.map((m) => ({
                  ...m,
                  timestamp: new Date(m.sentAt || m.timestamp),
                })) || [],
            },
          ],
          currentSessionId: sessionId,
          isLoading: false,
        });
      }

      get().saveToStorage();
    } catch (error) {
      // Failed to load session - silent fail
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

    const updatedSessions = sessions.map((session) => {
      if (session.sessionId === currentSessionId) {
        const updatedMessages = [...session.messages, newMessage];

        // 제목 자동 생성 (컨텍스트 기반)
        let title = session.title;
        if (!title || title === "New Chat") {
          // 컨텍스트 정보를 기반으로 제목 생성
          const ctx = session.context;
          const parts: string[] = [];

          if (ctx.destination) {
            parts.push(ctx.destination);
          }

          if (ctx.startDate && ctx.endDate) {
            const start = new Date(ctx.startDate);
            const end = new Date(ctx.endDate);
            const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
            const days = nights + 1;
            parts.push(`${nights}박${days}일`);
          }

          const totalPeople = (ctx.adults || 0) + (ctx.children || 0) + (ctx.infants || 0);
          if (totalPeople > 0) {
            parts.push(`${totalPeople}명`);
          }

          // 컨텍스트 기반 제목이 있으면 사용
          if (parts.length > 0) {
            title = parts.join(" ");
          } else if (message.role === "user" && updatedMessages.length > 0) {
            // 컨텍스트가 없으면 첫 메시지 사용
            title =
              message.content.slice(0, 30) +
              (message.content.length > 30 ? "..." : "");
          }
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
        role: "user",
        type: "text",
        content,
      });

      // 2. AI 응답 생성 요청
      setIsTyping(true);
      const aiMessage = await generateAIResponse(currentSessionId, content);

      // 3. AI 응답 로컬 추가 및 백엔드에서 업데이트된 컨텍스트 반영
      const { sessions } = get();
      const updatedSessions = sessions.map((session) => {
        if (session.sessionId === currentSessionId) {
          return {
            ...session,
            messages: [
              ...session.messages,
              {
                ...aiMessage,
                id: aiMessage.messageId || `msg-${Date.now()}`,
                messageId: aiMessage.messageId,
                timestamp: aiMessage.sentAt
                  ? new Date(aiMessage.sentAt)
                  : new Date(),
                sentAt: aiMessage.sentAt
                  ? new Date(aiMessage.sentAt)
                  : undefined,
              },
            ],
            // 백엔드가 추출한 컨텍스트 반영
            context: (aiMessage as any).updatedContext || session.context,
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

      // AI 응답 후 필수 정보가 모두 채워졌는지 체크
      const currentSession = updatedSessions.find(
        (s) => s.sessionId === currentSessionId
      );
      if (currentSession && !currentSession.hasShownEstimatePrompt && !currentSession.batchId) {
        const ctx = currentSession.context;
        const hasAllRequiredInfo = !!(
          ctx.destination &&
          ctx.startDate &&
          ctx.endDate &&
          ctx.adults &&
          ctx.adults > 0
        );

        if (hasAllRequiredInfo) {
          // 안내 메시지 표시
          await addMessage({
            role: "assistant",
            type: "text",
            content:
              "모든 정보가 수집되었습니다! 😊\n\n오른쪽 패널의 **'견적서 생성하기'** 버튼을 눌러주시면\n맞춤 견적서를 생성해드리겠습니다.\n\n담당자가 24시간 이내에 최종 견적서를 보내드립니다.",
          });

          // 플래그 업데이트
          const finalSessions = updatedSessions.map((s) => {
            if (s.sessionId === currentSessionId) {
              return { ...s, hasShownEstimatePrompt: true };
            }
            return s;
          });

          set({ sessions: finalSessions });
          get().saveToStorage();
        }
      }
    } catch (error) {
      // Failed to send message - silent fail
      setIsTyping(false);

      // 에러 메시지 표시
      await addMessage({
        role: "assistant",
        type: "system",
        content:
          "Sorry, an error occurred while sending the message. Please try again.",
      });
    }
  },

  // 마지막 메시지 업데이트 (스트리밍용)
  updateLastMessage: (content) => {
    const { sessions, currentSessionId } = get();
    if (!currentSessionId) return;

    const updatedSessions = sessions.map((session) => {
      if (
        session.sessionId === currentSessionId &&
        session.messages.length > 0
      ) {
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
    const { sessions, currentSessionId, addMessage } = get();
    if (!currentSessionId) return;

    try {
      // 로컬 상태 업데이트
      const updatedSessions = sessions.map((session) => {
        if (session.sessionId === currentSessionId) {
          const updatedContext = {
            ...session.context,
            ...newContext,
          };

          // 컨텍스트 기반 제목 자동 생성
          let title = session.title;
          if (!title || title === "New Chat" || title.endsWith("...")) {
            const parts: string[] = [];

            if (updatedContext.destination) {
              parts.push(updatedContext.destination);
            }

            if (updatedContext.startDate && updatedContext.endDate) {
              const start = new Date(updatedContext.startDate);
              const end = new Date(updatedContext.endDate);
              const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
              const days = nights + 1;
              parts.push(`${nights}박${days}일`);
            }

            const totalPeople = (updatedContext.adults || 0) + (updatedContext.children || 0) + (updatedContext.infants || 0);
            if (totalPeople > 0) {
              parts.push(`${totalPeople}명`);
            }

            if (parts.length > 0) {
              title = parts.join(" ");
            }
          }

          return {
            ...session,
            context: updatedContext,
            title,
          };
        }
        return session;
      });

      set({ sessions: updatedSessions });

      // 백엔드 동기화
      const session = updatedSessions.find(
        (s) => s.sessionId === currentSessionId
      );
      if (session) {
        await updateChatSession(currentSessionId, {
          context: session.context,
          title: session.title,
        });
      }

      get().saveToStorage();

      // 필수 정보가 모두 채워졌는지 체크하고 안내 메시지 표시
      if (session && !session.hasShownEstimatePrompt && !session.batchId) {
        const ctx = session.context;
        const hasAllRequiredInfo = !!(
          ctx.destination &&
          ctx.startDate &&
          ctx.endDate &&
          ctx.adults &&
          ctx.adults > 0
        );

        if (hasAllRequiredInfo) {
          // 안내 메시지 표시
          await addMessage({
            role: "assistant",
            type: "text",
            content:
              "모든 정보가 수집되었습니다! 😊\n\n오른쪽 패널의 **'견적서 생성하기'** 버튼을 눌러주시면\n맞춤 견적서를 생성해드리겠습니다.\n\n담당자가 24시간 이내에 최종 견적서를 보내드립니다.",
          });

          // 플래그 업데이트
          const finalSessions = updatedSessions.map((s) => {
            if (s.sessionId === currentSessionId) {
              return { ...s, hasShownEstimatePrompt: true };
            }
            return s;
          });

          set({ sessions: finalSessions });
          get().saveToStorage();
        }
      }
    } catch (error) {
      // Failed to update context - silent fail
    }
  },

  // 견적서 생성 (세션 기반)
  generateEstimateForSession: async (userId) => {
    const { currentSessionId, sessions, addMessage } = get();
    if (!currentSessionId) return false;

    try {
      set({ isGeneratingEstimate: true });

      // AI 견적서 생성 API 호출
      const result = await generateEstimate(currentSessionId, userId);

      // 세션에 batchId 업데이트
      const updatedSessions = sessions.map((session) => {
        if (session.sessionId === currentSessionId) {
          return {
            ...session,
            batchId: result.batchId,
          };
        }
        return session;
      });

      set({ sessions: updatedSessions, isGeneratingEstimate: false });

      // 백엔드에 batchId 동기화
      await updateChatSession(currentSessionId, {
        batchId: result.batchId,
        status: 'active',
      });

      // 견적서 생성 완료 메시지 추가
      await addMessage({
        role: "assistant",
        type: "estimate",
        content: `Your quotation has been generated!\n\nTotal Amount: $${result.totalAmount.toLocaleString()}\nNumber of Items: ${result.itemCount}\n\nOur staff will review and send you the final quotation within 24 hours.`,
        metadata: {
          batchId: result.batchId,
          estimateId: result.estimateId,
          totalAmount: result.totalAmount,
          itemCount: result.itemCount,
          timeline: result.timeline,
        },
      });

      get().saveToStorage();
      return true;
    } catch (error) {
      // Failed to generate estimate - show error details
      set({ isGeneratingEstimate: false });

      const errorMessage = error.response?.data?.message || error.message || "알 수 없는 오류가 발생했습니다.";

      await addMessage({
        role: "assistant",
        type: "system",
        content: `견적서 생성 중 오류가 발생했습니다.\n\n${errorMessage}\n\n잠시 후 다시 시도해주세요.`,
      });

      return false;
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
    const updatedSessions = sessions.filter((s) => s.sessionId !== sessionId);

    set({
      sessions: updatedSessions,
      currentSessionId:
        currentSessionId === sessionId ? null : currentSessionId,
    });

    get().saveToStorage();
  },

  // 채팅창 토글
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),

  // localStorage에서 로드
  loadFromStorage: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ChatSession[];
        // Date 객체 복원
        const sessions = parsed.map((s) => ({
          ...s,
          createdAt: new Date(s.createdAt),
          lastMessageAt: s.lastMessageAt
            ? new Date(s.lastMessageAt)
            : undefined,
          messages: s.messages.map((m) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          })),
        }));
        set({ sessions });
      }
    } catch (error) {
      // Failed to load chat sessions - silent fail
    }
  },

  // localStorage에 저장
  saveToStorage: () => {
    try {
      const { sessions } = get();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (error) {
      // Failed to save chat sessions - silent fail
    }
  },
}));

export default useChatStore;
