// Chat message constraints
export const MAX_MESSAGE_LENGTH = 2000;
export const MESSAGE_LENGTH_WARNING_THRESHOLD = 0.8; // Show warning at 80% of max length

// Chat session constraints
export const MAX_CHAT_SESSIONS = 50; // Maximum number of chat sessions to display
export const MIN_MESSAGES_FOR_ESTIMATE = 3; // Minimum messages required before generating estimate

// Storage keys
export const CHAT_STORAGE_KEY = "tumakr_chat_sessions"; // localStorage key for chat sessions

// UI behavior settings
export const AUTO_SCROLL_DELAY = 100; // Delay in ms before auto-scrolling to new messages

// User-facing messages
export const MESSAGES = {
  MESSAGE_TOO_LONG: (maxLength: number) =>
    `Message is too long. Maximum ${maxLength} characters allowed.`,
  SEND_FAILED: "Failed to send message. Please try again.",
  CONNECTION_ERROR: "Connection error. Please check your internet connection.",
  SESSION_EXPIRED: "Your session has expired. Please refresh the page.",
  DELETE_SESSION_CONFIRM: "Are you sure you want to delete this chat session? This action cannot be undone.",
  SESSION_LIMIT_EXCEEDED: "You have reached the maximum number of chat sessions. Please delete an old session to create a new one.",
};

// UI text labels
export const UI_TEXT = {
  TYPE_MESSAGE: "Type a message...",
  GENERATING_RESPONSE: "Agent is typing...",
  SEND: "Send",
  RETRY: "Retry",
  DELETE: "Delete",
  EDIT: "Edit",
  COPY: "Copy",
  NEW_CHAT: "New Chat",
  CHATS: "Chats",
  NO_CHATS: "No chats yet. Start a new conversation!",
  WELCOME_TITLE: "Welcome to Tumakr AI Travel Assistant",
  WELCOME_SUBTITLE: "Ask me anything about planning your perfect trip!",
};

// Chat status
export const CHAT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  TYPING: "typing",
  ERROR: "error",
} as const;

// Message types
export const MESSAGE_TYPE = {
  USER: "user",
  AGENT: "agent",
  SYSTEM: "system",
} as const;

export type ChatStatus = typeof CHAT_STATUS[keyof typeof CHAT_STATUS];
export type MessageType = typeof MESSAGE_TYPE[keyof typeof MESSAGE_TYPE];
