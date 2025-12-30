<script lang="ts">
  import { onMount } from 'svelte';
  import MessageList from './MessageList.svelte';
  import ChatInput from './ChatInput.svelte';
  import type { Message } from '../types/chat';
  import { sendMessage, getChatHistory } from '../services/chatApi';

  const SESSION_ID_KEY = 'chat_session_id';

  let messages: Message[] = [];
  let sessionId: string | null = null;
  let isLoading = false;
  let isTyping = false;
  let errorMessage: string | null = null;

  onMount(async () => {
    if (typeof window !== 'undefined') {
      sessionId = localStorage.getItem(SESSION_ID_KEY);

      if (sessionId) {
        await loadChatHistory(sessionId);
      }
    }
  });

  async function loadChatHistory(sid: string) {
    try {
      const history = await getChatHistory(sid);

      messages = history.messages.map((msg, index) => ({
        id: `${msg.timestamp}-${index}`,
        text: msg.text,
        sender: msg.sender,
        timestamp: msg.timestamp
      }));
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  }

  async function handleSendMessage(event: CustomEvent<string>) {
    const messageText = event.detail;

    if (!messageText.trim() || isLoading) {
      return;
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: messageText,
      sender: 'user',
      timestamp: Date.now()
    };

    messages = [...messages, userMessage];
    isLoading = true;
    isTyping = true;
    errorMessage = null;

    try {
      const response = await sendMessage({
        message: messageText,
        sessionId: sessionId || undefined
      });

      if (response.sessionId && response.sessionId !== sessionId) {
        sessionId = response.sessionId;
        if (typeof window !== 'undefined') {
          localStorage.setItem(SESSION_ID_KEY, response.sessionId);
        }
      }

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: response.reply,
        sender: 'ai',
        timestamp: Date.now()
      };

      messages = [...messages, aiMessage];
    } catch (error) {
      console.error('Failed to send message:', error);

      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        text: 'Sorry, I encountered an error processing your message. Please try again.',
        sender: 'ai',
        timestamp: Date.now()
      };

      messages = [...messages, errorMsg];
    } finally {
      isLoading = false;
      isTyping = false;
    }
  }
</script>

<div class="chat-container">
  <div class="chat-header">
    <h1 class="header-title">Customer Support</h1>
    <p class="header-subtitle">How can we help you today?</p>
  </div>

  <MessageList {messages} {isTyping} />

  <ChatInput on:send={handleSendMessage} disabled={isLoading} />
</div>

<style>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 800px;
    margin: 0 auto;
    background-color: #ffffff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }

  .chat-header {
    background-color: #0066ff;
    color: #ffffff;
    padding: 20px;
    text-align: center;
  }

  .header-title {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }

  .header-subtitle {
    margin: 4px 0 0;
    font-size: 14px;
    opacity: 0.9;
  }
</style>
