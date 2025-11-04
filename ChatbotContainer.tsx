"use client";

import { cn } from "@/lib/utils";
import useChatStore from "@shared/store/chatStore";
import { useEffect } from "react";

export function ChatbotContainer() {
  const { isChatOpen, initSession, getCurrentSession } = useChatStore();
  const session = getCurrentSession();

  useEffect(() => {
    // 채팅창이 처음 열릴 때 세션을 초기화합니다.
    if (isChatOpen && !session) {
      initSession().catch((err) => {
        console.error("Failed to initialize chat session:", err);
      });
    }
  }, [isChatOpen, session, initSession]);

  if (!isChatOpen) {
    return null;
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
      <div className="p-4 bg-sky-600 text-white rounded-t-2xl flex-shrink-0">
        <h2 className="text-lg font-semibold">Travel Assistant</h2>
        <p className="text-sm text-sky-100">
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
