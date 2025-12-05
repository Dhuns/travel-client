"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  getMessages,
  getUnreadCount,
  markAsRead,
  Message,
  sendMessage,
} from "@/src/shared/apis/message";
import dayjs from "dayjs";
import { ChevronDown, ChevronUp, MessageCircle, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface MessageSectionProps {
  batchId: number;
  quoteTitle?: string;
  isCollapsible?: boolean;
  defaultExpanded?: boolean;
}

export default function MessageSection({
  batchId,
  quoteTitle,
  isCollapsible = true,
  defaultExpanded = false,
}: MessageSectionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [unreadCount, setUnreadCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 메시지 목록 조회
  const fetchMessages = async () => {
    if (!batchId) return;

    try {
      setIsLoading(true);
      setError(null);
      const response = await getMessages(batchId, { page: 1, countPerPage: 100 });
      setMessages(response.messages || []);

      // 읽음 처리
      if (isExpanded) {
        await markAsRead(batchId);
        setUnreadCount(0);
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      setError("Failed to load messages");
    } finally {
      setIsLoading(false);
    }
  };

  // 읽지 않은 메시지 수 조회
  const fetchUnreadCount = async () => {
    if (!batchId) return;

    try {
      const response = await getUnreadCount(batchId);
      setUnreadCount(response.unreadCount);
    } catch (err) {
      console.error("Failed to fetch unread count:", err);
    }
  };

  // 초기 로드
  useEffect(() => {
    if (batchId) {
      fetchUnreadCount();
      if (isExpanded) {
        fetchMessages();
      }
    }
  }, [batchId]);

  // 확장 시 메시지 로드
  useEffect(() => {
    if (isExpanded && batchId) {
      fetchMessages();
    }
  }, [isExpanded, batchId]);

  // 메시지 스크롤
  useEffect(() => {
    if (isExpanded) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isExpanded]);

  // 메시지 전송
  const handleSendMessage = async () => {
    if (!messageInput.trim() || !batchId || isSending) return;

    try {
      setIsSending(true);
      setError(null);
      await sendMessage({ batchId, content: messageInput.trim() });
      setMessageInput("");
      await fetchMessages();
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  // Enter 키로 전송
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateString: string) => dayjs(dateString).format("HH:mm");
  const formatDate = (dateString: string) => dayjs(dateString).format("MMM D, YYYY");

  // 날짜별 메시지 그룹화
  const groupedMessages: { date: string; messages: Message[] }[] = [];
  let currentDate = "";
  messages.forEach((msg) => {
    const msgDate = formatDate(msg.createdAt);
    if (msgDate !== currentDate) {
      currentDate = msgDate;
      groupedMessages.push({ date: msgDate, messages: [msg] });
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(msg);
    }
  });

  return (
    <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className={`flex items-center justify-between p-4 bg-gray-50 ${
          isCollapsible ? "cursor-pointer hover:bg-gray-100" : ""
        } transition-colors`}
        onClick={() => isCollapsible && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <MessageCircle className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-gray-900">
            Messages
            {quoteTitle && <span className="text-gray-500 ml-1">- {quoteTitle}</span>}
          </span>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} new
            </Badge>
          )}
        </div>
        {isCollapsible && (
          <div className="text-gray-400">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>
        )}
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="border-t">
          {/* Messages Area */}
          <div className="h-64 overflow-y-auto p-4 bg-gray-50/50 space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                Loading messages...
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                <MessageCircle className="w-12 h-12 mb-2 opacity-30" />
                <p>No messages yet</p>
                <p className="text-sm">Send a message to start the conversation</p>
              </div>
            ) : (
              groupedMessages.map((group) => (
                <div key={group.date}>
                  {/* Date Divider */}
                  <div className="flex items-center justify-center my-3">
                    <span className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-600">
                      {group.date}
                    </span>
                  </div>

                  {/* Messages */}
                  {group.messages.map((msg) => {
                    const isCustomer = msg.senderType === "customer";
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col mb-3 ${
                          isCustomer ? "items-end" : "items-start"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1 px-2">
                          <span
                            className={`text-xs font-medium ${
                              isCustomer ? "text-blue-600" : "text-green-600"
                            }`}
                          >
                            {isCustomer ? "You" : msg.sender.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatTime(msg.createdAt)}
                          </span>
                        </div>
                        <div
                          className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                            isCustomer
                              ? "bg-blue-600 text-white rounded-br-sm"
                              : "bg-white text-gray-900 border rounded-bl-sm shadow-sm"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words">
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Error Message */}
          {error && (
            <div className="px-4 py-2 bg-red-50 text-red-600 text-sm border-t border-red-100">
              {error}
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <Textarea
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-[44px] max-h-[120px] resize-none"
                rows={1}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim() || isSending}
                className="h-[44px] w-[44px] p-0 shrink-0"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
