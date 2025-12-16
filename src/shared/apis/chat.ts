import axios from 'axios';
import { ChatSession, ChatMessage, ChatContext, MessageMetadata } from '../types/chat';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9191/api';

// Chat Session API
export const createChatSession = async (
  accessToken: string,
  data?: {
    userId?: number;
    title?: string;
    context?: Partial<ChatContext>;
  }
): Promise<ChatSession> => {
  const response = await axios.post(`${API_URL}/chat/sessions`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const getChatSession = async (accessToken: string, sessionId: string): Promise<ChatSession> => {
  const response = await axios.get(`${API_URL}/chat/sessions/${sessionId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const updateChatSession = async (
  accessToken: string,
  sessionId: string,
  data: {
    title?: string;
    status?: 'active' | 'converted' | 'abandoned';
    context?: Partial<ChatContext>;
    batchId?: number;
  }
): Promise<ChatSession> => {
  const response = await axios.put(`${API_URL}/chat/sessions/${sessionId}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// Chat Message API
export const sendChatMessage = async (
  accessToken: string,
  data: {
    sessionId: string;
    content: string;
    role?: 'user' | 'assistant' | 'system';
    type?: 'text' | 'estimate' | 'quick-reply' | 'system';
    metadata?: MessageMetadata;
  }
): Promise<ChatMessage> => {
  const response = await axios.post(`${API_URL}/chat/messages`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const getChatMessages = async (
  accessToken: string,
  sessionId: string,
  page = 1,
  limit = 50
): Promise<ChatMessage[]> => {
  const response = await axios.get(`${API_URL}/chat/messages`, {
    params: { sessionId, page, limit },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// AI Response API
export const generateAIResponse = async (
  accessToken: string,
  sessionId: string,
  userMessage: string,
  useStreaming = false
): Promise<ChatMessage> => {
  const response = await axios.post(
    `${API_URL}/chat/ai/generate`,
    {
      sessionId,
      userMessage,
      useStreaming,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

// AI Estimate Generation API
export const generateEstimate = async (
  accessToken: string,
  sessionId: string
): Promise<{
  batchId: number;
  estimateId: number;
  totalAmount: number;
  itemCount: number;
  timeline: string;
  message: string;
}> => {
  const response = await axios.post(
    `${API_URL}/chat/ai/estimate/generate`,
    { sessionId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

// Get All Sessions API (user's sessions only)
export const getAllChatSessions = async (
  accessToken: string,
  params?: {
    page?: number;
    limit?: number;
  }
): Promise<{
  sessions: ChatSession[];
  total: number;
}> => {
  const response = await axios.get(`${API_URL}/chat/sessions`, {
    params,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  // 백엔드는 { sessions, total, page, limit } 객체를 반환함
  const { sessions, total } = response.data;
  return { sessions, total };
};

// Delete Chat Session API
export const deleteChatSession = async (
  accessToken: string,
  sessionId: string
): Promise<{
  success: boolean;
  message: string;
  sessionId: string;
}> => {
  const response = await axios.delete(`${API_URL}/chat/sessions/${sessionId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
