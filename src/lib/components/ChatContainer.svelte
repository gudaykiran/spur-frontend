<script lang="ts">
  import { onMount } from "svelte";
  import MessageList from "./MessageList.svelte";
  import MessageBubble from "./MessageBubble.svelte";
  import ChatInput from "./ChatInput.svelte";
  import TypingIndicator from "./TypingIndicator.svelte";
  import "../styles/chat.css";
  import type { Message, ChatMessageResponse } from "../types/chat";
  import { fetchChatHistory, sendChatMessage } from "../services/chatApi";

  let messages: Message[] = [];
  let isLoading = false;
  let sessionId: string | null = null;
  let error: string | null = null;
  let showMenu = false;

  const SESSION_STORAGE_KEY = "chat_session_id";
  const CHARACTER_LIMIT = 1000;

  // Suggested questions for new users
  const suggestedQuestions = [
    "What are your shipping options?",
    "How do I return an item?",
    "What are your support hours?",
    "Do you ship internationally?",
  ];

  onMount(async () => {
    // Restore session from localStorage
    const savedSessionId = localStorage.getItem(SESSION_STORAGE_KEY);

    if (savedSessionId) {
      sessionId = savedSessionId;
      // Fetch conversation history
      try {
        const history = await fetchChatHistory(sessionId);
        messages = history;
      } catch (err) {
        console.error("Failed to load history:", err);
        error = "Failed to load conversation history";
      }
    }
  });

  async function handleSendMessage(text: string) {
    if (!text.trim()) return;

    // Add user message to UI
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: "user",
      timestamp: Date.now(),
    };

    messages = [...messages, userMessage];
    error = null;
    isLoading = true;

    try {
      const response: ChatMessageResponse = await sendChatMessage(
        text,
        sessionId || undefined,
      );

      // Always update sessionId from response (in case new one was created)
      if (response.sessionId) {
        sessionId = response.sessionId;
        localStorage.setItem(SESSION_STORAGE_KEY, response.sessionId);
      }

      // Add AI response to UI
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: response.reply,
        sender: "ai",
        timestamp: Date.now(),
      };

      messages = [...messages, aiMessage];
    } catch (err) {
      console.error("Failed to send message:", err);
      error =
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again.";

      // Add error message to chat
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: error,
        sender: "ai",
        timestamp: Date.now(),
      };
      messages = [...messages, errorMessage];
    } finally {
      isLoading = false;
    }
  }

  function startNewChat() {
    messages = [];
    sessionId = null;
    localStorage.removeItem(SESSION_STORAGE_KEY);
    showMenu = false;
  }

  function handleSuggestedQuestion(question: string) {
    handleSendMessage(question);
  }
</script>

<div class="chat-container">
  <div class="chat-header">
    <div class="header-content">
      <div class="bot-info">
        <div class="bot-avatar">C</div>
        <h1>Customer Support AI</h1>
      </div>
      <button class="menu-button" on:click={() => (showMenu = !showMenu)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="5" r="2" fill="currentColor" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <circle cx="12" cy="19" r="2" fill="currentColor" />
        </svg>
      </button>
    </div>
    {#if showMenu}
      <div class="dropdown-menu">
        <button on:click={startNewChat}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M12 5v14M5 12h14" stroke-width="2" />
          </svg>
          Start a new chat
        </button>
        <button
          on:click={() => {
            messages = [];
            showMenu = false;
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M18 6L6 18M6 6l12 12" stroke-width="2" />
          </svg>
          Clear chat
        </button>
      </div>
    {/if}
  </div>

  <MessageList {messages} on:regenerate={(e) => handleSendMessage(e.detail)} />

  {#if messages.length === 0}
    <div class="welcome-message">
      <div class="bot-avatar-large">C</div>
      <h2>Hi! I'm your Customer Support Assistant 👋</h2>
      <p>Ask me anything about our products and services!</p>
    </div>
  {/if}

  {#if isLoading}
    <TypingIndicator />
  {/if}

  {#if messages.length === 0}
    <div class="suggested-questions">
      {#each suggestedQuestions as question}
        <button
          class="suggested-chip"
          on:click={() => handleSuggestedQuestion(question)}
        >
          {question}
        </button>
      {/each}
    </div>
  {/if}

  <ChatInput
    on:send={(e) => handleSendMessage(e.detail)}
    disabled={isLoading}
    {CHARACTER_LIMIT}
  />
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  :global(html) {
    height: 100%;
  }

  :global(#svelte) {
    height: 100%;
  }
</style>
