import axios from 'axios';
import { ChatSession, ChatMessage, ChatContext } from '../types/chat';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9191/api';

// Chat Session API
export const createChatSession = async (data?: {
  userId?: number;
  title?: string;
  context?: Partial<ChatContext>;
}): Promise<ChatSession> => {
  const response = await axios.post(`${API_URL}/chat/sessions`, data);
  return response.data;
};

export const getChatSession = async (sessionId: string): Promise<ChatSession> => {
  const response = await axios.get(`${API_URL}/chat/sessions/${sessionId}`);
  return response.data;
};

export const updateChatSession = async (
  sessionId: string,
  data: {
    title?: string;
    status?: 'active' | 'converted' | 'abandoned';
    context?: Partial<ChatContext>;
    batchId?: number;
  }
): Promise<ChatSession> => {
  const response = await axios.put(`${API_URL}/chat/sessions/${sessionId}`, data);
  return response.data;
};

// Chat Message API
export const sendChatMessage = async (data: {
  sessionId: string;
  content: string;
  role?: 'user' | 'assistant' | 'system';
  type?: 'text' | 'estimate' | 'quick-reply' | 'system';
  metadata?: any;
}): Promise<ChatMessage> => {
  const response = await axios.post(`${API_URL}/chat/messages`, data);
  return response.data;
};

export const getChatMessages = async (
  sessionId: string,
  page = 1,
  limit = 50
): Promise<ChatMessage[]> => {
  const response = await axios.get(`${API_URL}/chat/messages`, {
    params: { sessionId, page, limit },
  });
  return response.data;
};

// AI Response API
export const generateAIResponse = async (
  sessionId: string,
  userMessage: string,
  useStreaming = false
): Promise<ChatMessage> => {
  const response = await axios.post(`${API_URL}/chat/ai/generate`, {
    sessionId,
    userMessage,
    useStreaming,
  });
  return response.data;
};
