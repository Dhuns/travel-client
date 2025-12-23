// 채팅 메시지 역할
export type MessageRole = 'user' | 'assistant' | 'system';

// 메시지 타입
export type MessageType = 'text' | 'estimate' | 'quick-reply' | 'system';

// 퀵 리플라이 옵션
export interface QuickReplyOption {
  label: string;
  value: string;
}

// 견적서 미리보기 데이터
export interface EstimatePreview {
  id?: number;
  title: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  adults: number;
  children: number;
  infants: number;
  items: {
    day: number;
    name: string;
    type: string;
    price: number;
  }[];
}

// 대화 컨텍스트 (추출된 정보)
export interface ChatContext {
  destination?: string;
  startDate?: string;
  endDate?: string;
  adults?: number;
  children?: number;
  infants?: number;
  budget?: number;
  preferences?: string[];
}

/**
 * Hello Vacanze 스타일 구조화된 대화 단계
 */
export enum ConversationStep {
  GREETING = 'greeting',
  DESTINATION = 'destination',
  DATES = 'dates',
  TRAVELERS = 'travelers',
  PREFERENCES = 'preferences',
  CONFIRM = 'confirm',
  ESTIMATE_READY = 'estimate_ready',
  MODIFICATION_CHECK = 'modification_check', // 수정사항 확인
  SEND_TO_EXPERT = 'send_to_expert', // 전문가 전송 확인
  WAITING_EXPERT = 'waiting_expert', // 전문가 검토 대기
  FREE_CHAT = 'free_chat',
}

/**
 * UI 액션 타입
 */
export type UIActionType =
  | 'buttons'
  | 'date_picker'
  | 'number_input'
  | 'chips'
  | 'confirm_card'
  | 'text_input';

/**
 * UI 액션 옵션 (버튼, 칩 등)
 */
export interface UIActionOption {
  id: string;
  label: string;
  value: string;
  emoji?: string;
  description?: string;
}

/**
 * UI 액션 정의
 */
export interface UIAction {
  type: UIActionType;
  options?: UIActionOption[];
  min?: number;
  max?: number;
  placeholder?: string;
  multiSelect?: boolean;
  contextData?: ChatContext;
}

/**
 * 구조화된 AI 응답
 */
export interface StructuredAIResponse {
  message: string;
  currentStep: ConversationStep;
  nextStep: ConversationStep;
  uiAction?: UIAction;
  extractedData?: Partial<ChatContext>;
  isComplete?: boolean;
}

// 메시지 메타데이터
export interface MessageMetadata {
  estimatePreview?: EstimatePreview;
  quickReplyOptions?: QuickReplyOption[];
  images?: string[];
  // Estimate generation metadata
  batchId?: number;
  estimateId?: number;
  totalAmount?: number;
  itemCount?: number;
  timeline?: string;
  isFirstEstimate?: boolean; // 1차 견적서 여부 (가격 없음)
  // 구조화된 대화 UI 액션
  uiAction?: UIAction;
  conversationStep?: ConversationStep;
  // Error handling metadata
  isError?: boolean;
  isRetryable?: boolean;
  retryAfter?: number; // seconds
  lastUserMessage?: string; // for retry
}

// 채팅 메시지
export interface ChatMessage {
  id: string;
  messageId?: string; // 백엔드 ID
  role: MessageRole;
  type: MessageType;
  content: string;
  metadata?: MessageMetadata;
  timestamp: Date;
  sentAt?: Date; // 백엔드 전송 시간
  isStreaming?: boolean;
}

// 채팅 세션
export interface ChatSession {
  sessionId: string;
  status: 'active' | 'converted' | 'abandoned' | 'estimate_ready' | 'inprogress' | 'pending_review' | 'quote_sent' | 'completed' | 'closed';
  messages: ChatMessage[];
  context: ChatContext;
  batchId?: number; // 생성된 견적서 배치 ID
  hasShownEstimatePrompt?: boolean; // 견적서 생성 안내를 보여줬는지 여부
  title?: string; // 대화 제목 (첫 메시지에서 생성)
  createdAt: Date;
  lastMessageAt?: Date;
  updatedAt?: Date; // 백엔드 업데이트 시간
  currentStep?: ConversationStep; // 현재 대화 단계
}
