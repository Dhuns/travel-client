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

// 메시지 메타데이터
export interface MessageMetadata {
  estimatePreview?: EstimatePreview;
  quickReplyOptions?: QuickReplyOption[];
  images?: string[];
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
  status: 'active' | 'converted' | 'abandoned';
  messages: ChatMessage[];
  context: ChatContext;
  title?: string; // 대화 제목 (첫 메시지에서 생성)
  createdAt: Date;
  lastMessageAt?: Date;
  updatedAt?: Date; // 백엔드 업데이트 시간
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
