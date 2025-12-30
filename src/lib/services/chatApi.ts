import type { ChatMessageRequest, ChatMessageResponse, Message } from '../types/chat';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

/**
 * Send a message to the chat API and get a response
 */
export async function sendChatMessage(
  message: string,
  sessionId?: string
): Promise<ChatMessageResponse> {
  const payload: ChatMessageRequest = {
    message,
    ...(sessionId && { sessionId })
  };

  console.log('Sending message to backend:', payload);
  console.log('API URL:', API_BASE_URL);

  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  console.log('Backend response status:', response.status);

  if (!response.ok) {
    const error = await response.text();
    console.error('Backend error:', error);
    throw new Error(error || `Failed to send message: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Backend response data:', data);
  return data;
}

/**
 * Fetch chat history for a session
 */
export async function fetchChatHistory(sessionId: string): Promise<Message[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/chat/history?sessionId=${encodeURIComponent(sessionId)}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch chat history: ${response.statusText}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

