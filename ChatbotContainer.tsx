"use client";

import { cn } from "@/lib/utils";
import useChatStore from "@shared/store/chatStore";
import { useAuthStore } from "@/src/shared/store/authStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

export function ChatbotContainer() {
  const { isChatOpen, initSession, getCurrentSession } = useChatStore();
  const { isAuthenticated } = useAuthStore();
  const session = getCurrentSession();
  const router = useRouter();

  // 비로그인 상태에서 localStorage만 초기화 (서버 데이터는 유지)
  useEffect(() => {
    if (!isAuthenticated) {
      const CHAT_STORAGE_KEY = 'chat-sessions-storage';
      if (typeof window !== 'undefined') {
        localStorage.removeItem(CHAT_STORAGE_KEY);
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // 로그인한 사용자만 세션 초기화
    if (isChatOpen && !session && isAuthenticated) {
      initSession().catch((err) => {
        console.error("Failed to initialize chat session:", err);
      });
    }
  }, [isChatOpen, session, isAuthenticated, initSession]);

  if (!isChatOpen) {
    return null;
  }

  // 비로그인 사용자에게 로그인 유도
  if (!isAuthenticated) {
    return (
      <div
        className={cn(
          "fixed bottom-28 right-8 z-40 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200",
          "flex flex-col transition-all duration-300 ease-in-out",
          "h-[400px]",
          isChatOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        {/* 챗봇 헤더 */}
        <div className="p-4 bg-gradient-to-r from-[#651d2a] to-[#7a2433] text-white rounded-t-2xl flex-shrink-0">
          <h2 className="text-lg font-semibold">Travel Assistant</h2>
          <p className="text-sm text-[#f5f3f0]">
            Sign in to start planning your trip
          </p>
        </div>

        {/* 로그인 유도 메시지 */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 bg-[#f5f3f0] rounded-full flex items-center justify-center mb-4">
            <LogIn className="w-8 h-8 text-[#651d2a]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Sign in Required
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Please sign in to use our AI travel assistant and save your conversation history.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="bg-[#651d2a] hover:bg-[#4a1520] text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "fixed bottom-28 right-8 z-40 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200",
        "flex flex-col transition-all duration-300 ease-in-out",
        "max-h-[calc(100vh-10rem)]",
        isChatOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      )}
    >
      {/* 챗봇 헤더 */}
      <div className="p-4 bg-gradient-to-r from-[#651d2a] to-[#7a2433] text-white rounded-t-2xl flex-shrink-0">
        <h2 className="text-lg font-semibold">Travel Assistant</h2>
        <p className="text-sm text-[#f5f3f0]">
          How can I help you plan your trip?
        </p>
      </div>

      {/* 메시지 표시 영역 */}
      <div className="flex-1 p-4 overflow-y-auto min-h-0">
        {/* 여기에 메시지 목록을 렌더링합니다. */}
        <p className="text-gray-500 text-sm">Chat messages will appear here.</p>
      </div>

      {/* 메시지 입력 영역 */}
      <div className="p-4 border-t flex-shrink-0">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-2 border rounded-lg"
        />
      </div>
    </div>
  );
}
