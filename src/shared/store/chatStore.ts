import { ChatContext, ChatMessage, ChatSession } from "../types/chat";
import { useAuthStore } from "./authStore";
import {
  createChatSession,
  generateAIResponse,
  generateEstimate,
  getChatMessages,
  getChatSession,
  sendChatMessage,
  updateChatSession,
  getAllChatSessions,
  deleteChatSession,
} from "../apis/chat";
import {
  MAX_CHAT_SESSIONS,
  CHAT_STORAGE_KEY,
  MIN_MESSAGES_FOR_ESTIMATE,
  MESSAGES,
} from "../constants/chat";

import { create } from "zustand";

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
  loadUserSessions: () => Promise<void>;
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => Promise<void>;
  sendUserMessage: (content: string) => Promise<void>;
  updateLastMessage: (content: string) => void;
  setIsTyping: (isTyping: boolean) => void;
  updateContext: (context: Partial<ChatContext>) => Promise<void>;
  generateEstimateForSession: () => Promise<boolean>;
  clearSession: () => void;
  clearAllSessions: () => void;
  deleteSession: (sessionId: string) => Promise<void>;
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

  /**
   * 견적서 생성 가능 여부 확인
   * @returns {boolean} 견적서 생성 가능 여부
   */
  canGenerateEstimate: () => {
    const session = get().getCurrentSession();

    // 세션이 없거나 이미 견적서가 생성된 경우
    if (!session || session.batchId) {
      return false;
    }

    const ctx = session.context;

    // 필수 정보 확인
    const hasDestination = Boolean(ctx.destination?.trim());
    const hasStartDate = Boolean(ctx.startDate?.trim());
    const hasEndDate = Boolean(ctx.endDate?.trim());
    const hasAdults = Boolean(ctx.adults && ctx.adults > 0);
    const hasEnoughMessages = session.messages.length >= MIN_MESSAGES_FOR_ESTIMATE;

    return hasDestination && hasStartDate && hasEndDate && hasAdults && hasEnoughMessages;
  },

  /**
   * 새 세션 초기화
   * @returns {Promise<boolean>} 초기화 성공 여부
   */
  initSession: async () => {
    const { sessions } = get();

    // 로그인 여부 확인
    const authState = useAuthStore.getState();
    if (!authState.isAuthenticated) {
      console.warn("User must be logged in to start a chat session");
      return false;
    }

    // 최대 세션 수 확인
    if (sessions.length >= MAX_CHAT_SESSIONS) {
      alert(MESSAGES.SESSION_LIMIT_EXCEEDED);
      return false;
    }

    try {
      set({ isLoading: true });

      // 로그인한 사용자 정보 가져오기
      const accessToken = authState.accessToken;
      if (!accessToken) {
        console.warn("No access token available");
        set({ isLoading: false });
        return false;
      }

      // 백엔드에 세션 생성
      const newSession = await createChatSession(accessToken, {
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

      // localStorage 제거: 항상 서버에서 최신 데이터 가져오기
      // get().saveToStorage();
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
      console.log('[chatStore] loadSession called with sessionId:', sessionId);
      set({ isLoading: true });

      // 로그인 확인 및 accessToken 가져오기
      const authState = useAuthStore.getState();
      const accessToken = authState.accessToken;
      if (!accessToken) {
        console.warn("[chatStore] No access token available");
        set({ isLoading: false });
        return;
      }

      console.log('[chatStore] Fetching session from API...');
      // 백엔드에서 세션 및 메시지 가져오기
      const session = await getChatSession(accessToken, sessionId);
      console.log('[chatStore] Session loaded:', session);

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

      // localStorage 제거: 항상 서버에서 최신 데이터 가져오기
      // get().saveToStorage();
    } catch (error) {
      // Failed to load session
      const axiosError = error as { response?: { status?: number } };

      // 404 에러 (세션이 삭제되었거나 존재하지 않음)
      if (axiosError?.response?.status === 404) {
        // 로컬 세션 목록에서도 제거
        const { sessions, currentSessionId } = get();
        const updatedSessions = sessions.filter((s) => s.sessionId !== sessionId);

        set({
          sessions: updatedSessions,
          currentSessionId: currentSessionId === sessionId ? null : currentSessionId,
          isLoading: false,
        });

        // localStorage 제거: 항상 서버에서 최신 데이터 가져오기
      // get().saveToStorage();
      } else {
        // 다른 에러는 조용히 무시
        set({ isLoading: false });
      }
    }
  },

  // 사용자의 모든 세션 불러오기 (서버에서)
  loadUserSessions: async () => {
    try {
      set({ isLoading: true });

      // 로그인 확인 및 accessToken 가져오기
      const authState = useAuthStore.getState();
      const accessToken = authState.accessToken;
      console.log('[chatStore] loadUserSessions - accessToken:', accessToken ? 'Present' : 'Missing');

      if (!accessToken) {
        console.warn("[chatStore] No access token available");
        set({ isLoading: false });
        return;
      }

      console.log('[chatStore] Calling getAllChatSessions API...');
      // 서버에서 사용자의 세션 목록 가져오기 (userId는 JWT에서 추출됨)
      const response = await getAllChatSessions(accessToken, {
        page: 1,
        limit: 50, // 최근 50개 세션
      });

      console.log('[chatStore] API Response:', response);
      const { sessions: serverSessions, total } = response;
      console.log(`[chatStore] Loaded ${serverSessions?.length || 0} sessions (total: ${total})`);

      if (!serverSessions || !Array.isArray(serverSessions)) {
        console.error('[chatStore] Invalid sessions data:', serverSessions);
        set({ sessions: [], isLoading: false });
        return;
      }

      // 세션 데이터 변환
      const formattedSessions: ChatSession[] = serverSessions.map((session: any) => ({
        ...session,
        createdAt: new Date(session.createdAt),
        lastMessageAt: session.lastActivityAt
          ? new Date(session.lastActivityAt)
          : undefined,
        messages: [], // 메시지는 세션 선택 시 로드
      }));

      console.log('[chatStore] Formatted sessions:', formattedSessions.length);

      set({
        sessions: formattedSessions,
        isLoading: false,
      });

      // localStorage 제거: 항상 서버에서 최신 데이터 가져오기
      // get().saveToStorage();
    } catch (error) {
      console.error("[chatStore] Failed to load user sessions:", error);
      const axiosError = error as any;
      if (axiosError?.response) {
        console.error('[chatStore] API Error Response:', {
          status: axiosError.response.status,
          data: axiosError.response.data,
        });
      }
      set({ isLoading: false, sessions: [] });
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

        // 제목은 백엔드에서 자동 생성됨 (예: "Seoul Trip")
        // AI 응답 후 백엔드에서 업데이트된 제목이 반영됨
        // 클라이언트에서는 제목을 변경하지 않음

        return {
          ...session,
          messages: updatedMessages,
          lastMessageAt: new Date(),
        };
      }
      return session;
    });

    set({ sessions: updatedSessions });
    // localStorage 제거: 항상 서버에서 최신 데이터 가져오기
    // get().saveToStorage();
  },

  // 사용자 메시지 전송 및 AI 응답 받기
  sendUserMessage: async (content: string) => {
    const { currentSessionId, addMessage, setIsTyping } = get();
    if (!currentSessionId) return;

    try {
      // 로그인 확인 및 accessToken 가져오기
      const authState = useAuthStore.getState();
      const accessToken = authState.accessToken;
      if (!accessToken) {
        console.warn("No access token available");
        return;
      }

      // 1. 사용자 메시지 로컬 추가
      await addMessage({
        role: "user",
        type: "text",
        content,
      });

      // 2. AI 응답 생성 요청
      setIsTyping(true);
      const aiMessage = await generateAIResponse(accessToken, currentSessionId, content);

      // 3. AI 응답 로컬 추가 및 백엔드에서 업데이트된 컨텍스트/제목 반영
      const { sessions } = get();
      const aiResponse = aiMessage as ChatMessage & { updatedContext?: ChatContext; updatedTitle?: string };
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
            context: aiResponse.updatedContext || session.context,
            // 백엔드에서 업데이트된 제목 반영 (예: "Seoul Trip")
            title: aiResponse.updatedTitle || session.title,
            lastMessageAt: new Date(),
          };
        }
        return session;
      });

      set({
        sessions: updatedSessions,
        isTyping: false,
      });

      // localStorage 제거: 항상 서버에서 최신 데이터 가져오기
      // get().saveToStorage();

      // AI 응답 후 견적서 생성이 가능한지 체크 (enhanced conditions)
      const currentSession = updatedSessions.find(
        (s) => s.sessionId === currentSessionId
      );
      if (currentSession && !currentSession.hasShownEstimatePrompt && !currentSession.batchId) {
        // Update current session temporarily to check canGenerateEstimate
        set({ sessions: updatedSessions });

        // Use the enhanced canGenerateEstimate function
        const canGenerate = get().canGenerateEstimate();

        if (canGenerate) {
          // Show notification that quote generation is now available
          await addMessage({
            role: "assistant",
            type: "text",
            content:
              "Great! I have all the information needed to create your personalized travel quote.\n\nYou can now click the **'Generate My Quote'** button on the right panel to get started. Our AI will create a detailed itinerary based on our conversation, and our travel experts will review and send you the final quote within 24 hours.",
          });

          // 플래그 업데이트
          const finalSessions = updatedSessions.map((s) => {
            if (s.sessionId === currentSessionId) {
              return { ...s, hasShownEstimatePrompt: true };
            }
            return s;
          });

          set({ sessions: finalSessions });
          // localStorage 제거: 항상 서버에서 최신 데이터 가져오기
      // get().saveToStorage();
        }
      }
    } catch (error) {
      // Failed to send message - silent fail
      setIsTyping(false);

      // Show error message
      await addMessage({
        role: "assistant",
        type: "system",
        content:
          "Sorry, a temporary error occurred 😥\nPlease try again in a moment.\n\nIf the problem persists, try refreshing the page!",
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
      // 로그인 확인 및 accessToken 가져오기
      const authState = useAuthStore.getState();
      const accessToken = authState.accessToken;
      if (!accessToken) {
        console.warn("No access token available");
        return;
      }

      // 로컬 상태 업데이트
      const updatedSessions = sessions.map((session) => {
        if (session.sessionId === currentSessionId) {
          const updatedContext = {
            ...session.context,
            ...newContext,
          };

          // 제목 자동 생성: destination이 있으면 "{Destination} Trip" 형식
          let title = session.title;
          if ((!title || title === "New Chat") && updatedContext.destination) {
            title = `${updatedContext.destination} Trip`;
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
        await updateChatSession(accessToken, currentSessionId, {
          context: session.context,
          title: session.title,
        });
      }

      // localStorage 제거: 항상 서버에서 최신 데이터 가져오기
      // get().saveToStorage();

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
          // Show guidance message
          await addMessage({
            role: "assistant",
            type: "text",
            content:
              "Perfect! ✨ All required information is ready.\n\nYou can now **generate your customized quote**!\nClick the purple button on the right panel 👉\n\n📋 Our AI will create a draft first,\nthen our travel experts will review and send\nyou the final quote within 24 hours.",
          });

          // 플래그 업데이트
          const finalSessions = updatedSessions.map((s) => {
            if (s.sessionId === currentSessionId) {
              return { ...s, hasShownEstimatePrompt: true };
            }
            return s;
          });

          set({ sessions: finalSessions });
          // localStorage 제거: 항상 서버에서 최신 데이터 가져오기
      // get().saveToStorage();
        }
      }
    } catch (error) {
      // Failed to update context - silent fail
    }
  },

  // 견적서 생성 (세션 기반)
  generateEstimateForSession: async () => {
    const { currentSessionId, sessions, addMessage } = get();
    if (!currentSessionId) return false;

    try {
      // 로그인 확인 및 accessToken 가져오기
      const authState = useAuthStore.getState();
      const accessToken = authState.accessToken;
      if (!accessToken) {
        console.warn("No access token available");
        return false;
      }

      set({ isGeneratingEstimate: true });

      // AI 견적서 생성 API 호출 (userId는 JWT에서 추출됨)
      const result = await generateEstimate(accessToken, currentSessionId);

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

      // 백엔드에 batchId 동기화 (실패해도 로컬에는 유지)
      try {
        await updateChatSession(accessToken, currentSessionId, {
          batchId: result.batchId,
          status: 'active',
        });
      } catch (syncError) {
        // 백엔드 동기화 실패는 로그만 출력 (사용자 경험에 영향 없음)
        console.error('Failed to sync batchId to backend:', syncError);
      }

      // Add quote generation success message
      await addMessage({
        role: "assistant",
        type: "estimate",
        content: `🎉 Your quote has been generated!\n\n💰 Estimated Cost: ₩${result.totalAmount.toLocaleString()}\n📦 Included Items: ${result.itemCount}\n\nYou can now click the **'View My Quote'** button\nin the right panel to see the detailed itinerary!\n\n✨ Our travel experts will review and send\nyou the final quote within 24 hours.`,
        metadata: {
          batchId: result.batchId,
          estimateId: result.estimateId,
          totalAmount: result.totalAmount,
          itemCount: result.itemCount,
          timeline: result.timeline,
        },
      });

      // localStorage 제거: 항상 서버에서 최신 데이터 가져오기
      // get().saveToStorage();
      return true;
    } catch (error) {
      // Failed to generate estimate - show error details
      set({ isGeneratingEstimate: false });

      const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
      const errorMessage = axiosError?.response?.data?.message || axiosError?.message || "An unknown error occurred.";

      await addMessage({
        role: "assistant",
        type: "system",
        content: `😥 A problem occurred while generating your quote.\n\nError details: ${errorMessage}\n\n💡 How to resolve:\n• Please try again in a moment\n• Try refreshing the page\n• If the issue persists, start a new chat`,
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

  // 모든 세션 초기화 (로그아웃 시 사용)
  clearAllSessions: () => {
    set({
      sessions: [],
      currentSessionId: null,
      isTyping: false,
      isLoading: false,
      isGeneratingEstimate: false,
    });
    
    // localStorage에서도 삭제
    if (typeof window !== "undefined") {
      localStorage.removeItem(CHAT_STORAGE_KEY);
    }
  },

  // 세션 삭제 (로컬 및 서버)
  deleteSession: async (sessionId: string) => {
    // 인증 토큰 확인
    const authState = useAuthStore.getState();
    const accessToken = authState.accessToken;
    if (!accessToken) {
      console.warn("No access token available");
      alert("로그인이 필요합니다.");
      return;
    }

    // Optimistic update: 즉시 로컬 상태에서 세션 제거
    const { sessions, currentSessionId } = get();
    const sessionToDelete = sessions.find((s) => s.sessionId === sessionId);
    const updatedSessions = sessions.filter((s) => s.sessionId !== sessionId);

    set({
      sessions: updatedSessions,
      currentSessionId:
        currentSessionId === sessionId ? null : currentSessionId,
    });

    // localStorage 제거: 항상 서버에서 최신 데이터 가져오기
    // get().saveToStorage();

    try {
      // 백엔드 API 호출하여 서버에서 세션 삭제
      await deleteChatSession(accessToken, sessionId);
      console.log(`Session ${sessionId} deleted successfully`);
    } catch (error) {
      // 서버 삭제 실패 시 에러 처리
      console.error("Failed to delete session from server:", error);
      const axiosError = error as { response?: { status?: number; data?: { message?: string } } };

      // 404 에러면 이미 삭제된 것이므로 그냥 무시 (로컬에서는 이미 제거됨)
      if (axiosError?.response?.status === 404) {
        console.log("Session not found on server, already removed from local state");
      } else {
        // 다른 에러면 롤백하고 사용자에게 알림
        const errorMessage = axiosError?.response?.data?.message || "채팅 삭제에 실패했습니다.";
        alert(`삭제 실패: ${errorMessage}\n\n페이지를 새로고침한 후 다시 시도해주세요.`);

        // 롤백: 삭제된 세션을 다시 추가
        if (sessionToDelete) {
          const { sessions: currentSessions } = get();
          set({
            sessions: [...currentSessions, sessionToDelete],
          });
          // localStorage 제거: 항상 서버에서 최신 데이터 가져오기
      // get().saveToStorage();
        }
      }
    }
  },

  // 채팅창 토글
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),

  /**
   * localStorage에서 세션 데이터 로드
   */
  loadFromStorage: () => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored) as ChatSession[];

      // Date 객체 복원
      const sessions = parsed.map((s) => ({
        ...s,
        createdAt: new Date(s.createdAt),
        lastMessageAt: s.lastMessageAt ? new Date(s.lastMessageAt) : undefined,
        messages: s.messages.map((m) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        })),
      }));

      set({ sessions });
    } catch (error) {
      console.error("Failed to load chat sessions from storage:", error);
    }
  },

  /**
   * 세션 데이터를 localStorage에 저장
   */
  saveToStorage: () => {
    if (typeof window === "undefined") return;

    try {
      const { sessions } = get();
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(sessions));
    } catch (error) {
      console.error("Failed to save chat sessions to storage:", error);
    }
  },
}));

export default useChatStore;
