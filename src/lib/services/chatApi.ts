import type { ChatMessageRequest, ChatMessageResponse, ChatHistoryResponse } from '../types/chat';

const API_BASE_URL = '';

export async function sendMessage(request: ChatMessageRequest): Promise<ChatMessageResponse> {
  const response = await fetch(`${API_BASE_URL}/chat/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error(`Failed to send message: ${response.statusText}`);
  }

  return response.json();
}

export async function getChatHistory(sessionId: string): Promise<ChatHistoryResponse> {
  const response = await fetch(`${API_BASE_URL}/chat/history?sessionId=${encodeURIComponent(sessionId)}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch chat history: ${response.statusText}`);
  }

  return response.json();
}
