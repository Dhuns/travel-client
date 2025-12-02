import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9191/api';
const PATH = '/message';

// Types
export interface Message {
  id: number;
  batchId: number;
  senderType: 'customer' | 'admin';
  content: string;
  messageType: 'text' | 'image' | 'file' | 'system';
  attachmentUrl: string | null;
  isRead: boolean;
  createdAt: string;
  sender: {
    type: 'customer' | 'admin';
    name: string;
  };
}

export interface GetMessagesResponse {
  messages: Message[];
  total: number;
  page: number;
  countPerPage: number;
}

// Get auth token from Zustand store
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return useAuthStore.getState().accessToken;
};

// Create axios instance with auth
const createAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * 고객이 메시지 목록 조회
 */
export async function getMessages(
  batchId: number,
  params?: { page?: number; countPerPage?: number }
): Promise<GetMessagesResponse> {
  const response = await axios.get(`${API_URL}${PATH}/customer/messages`, {
    params: { batchId, ...params },
    headers: createAuthHeaders(),
  });
  return response.data;
}

/**
 * 고객이 메시지 발송
 */
export async function sendMessage(payload: {
  batchId: number;
  content: string;
  messageType?: string;
}): Promise<Message> {
  const response = await axios.post(`${API_URL}${PATH}/customer/send`, payload, {
    headers: createAuthHeaders(),
  });
  return response.data;
}

/**
 * 고객이 메시지 읽음 처리
 */
export async function markAsRead(batchId: number): Promise<{ success: boolean }> {
  const response = await axios.post(
    `${API_URL}${PATH}/customer/read`,
    { batchId },
    { headers: createAuthHeaders() }
  );
  return response.data;
}

/**
 * 고객의 읽지 않은 메시지 수 조회
 */
export async function getUnreadCount(batchId: number): Promise<{ unreadCount: number }> {
  const response = await axios.get(`${API_URL}${PATH}/customer/unread-count`, {
    params: { batchId },
    headers: createAuthHeaders(),
  });
  return response.data;
}
