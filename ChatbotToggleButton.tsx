"use client";

import { MessageSquare, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useChatStore from "@shared/store/chatStore";

export function ChatbotToggleButton() {
  const { isChatOpen, toggleChat } = useChatStore();

  return (
    <Button
      onClick={toggleChat}
      className={cn(
        "fixed bottom-8 right-8 z-50 h-16 w-16 rounded-full shadow-lg transition-transform duration-300 ease-in-out hover:scale-110",
        "bg-[#651d2a] hover:bg-[#7d2534] text-white"
      )}
      aria-label={isChatOpen ? "Close chat" : "Open chat"}
    >
      {isChatOpen ? (
        <X className="h-8 w-8" />
      ) : (
        <MessageSquare className="h-8 w-8" />
      )}
    </Button>
  );
}
