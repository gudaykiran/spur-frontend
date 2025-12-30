export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

export interface ChatMessageRequest {
  message: string;
  sessionId?: string;
}

export interface ChatMessageResponse {
  reply: string;
  sessionId: string;
}

