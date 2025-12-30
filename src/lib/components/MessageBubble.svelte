<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let sender: "user" | "ai";
  export let text: string;
  export let timestamp: number;
  export let messageId: string;

  const dispatch = createEventDispatcher();
  const isError = text.includes("error") || text.includes("failed");

  let liked: boolean | null = null;
  let copied = false;

  // Enhanced formatting with markdown-like support
  function formatText(str: string): string {
    let formatted = str;

    // Convert **bold** to <strong>
    formatted = formatted.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

    // Convert URLs to clickable links
    formatted = formatted.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>',
    );

    // Convert bullet points
    formatted = formatted.replace(/^[•\-\*]\s/gm, "• ");

    // Preserve line breaks
    formatted = formatted.replace(/\n/g, "<br>");

    return formatted;
  }

  function formatTime(ts: number): string {
    const date = new Date(ts);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  function handleLike() {
    liked = liked === true ? null : true;
  }

  function handleDislike() {
    liked = liked === false ? null : false;
  }

  function handleRegenerate() {
    dispatch("regenerate", { messageId });
  }

  const formattedText = formatText(text);
</script>

<div
  class="message-wrapper"
  class:user={sender === "user"}
  class:ai={sender === "ai"}
>
  {#if sender === "ai"}
    <div class="message-avatar">C</div>
  {/if}
  <div class="message-content">
    <div
      class="message-bubble"
      class:user={sender === "user"}
      class:ai={sender === "ai"}
      class:error={sender === "ai" && isError}
    >
      {@html formattedText}
    </div>
    <div class="message-meta">
      <span class="message-time">{formatTime(timestamp)}</span>
      <div class="message-actions">
        <button class="action-btn" on:click={handleCopy} title="Copy message">
          {#if copied}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M20 6L9 17l-5-5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          {:else}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <rect
                x="9"
                y="9"
                width="13"
                height="13"
                rx="2"
                ry="2"
                stroke-width="2"
              />
              <path
                d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                stroke-width="2"
              />
            </svg>
          {/if}
        </button>
        {#if sender === "ai"}
          <button
            class="action-btn"
            class:active={liked === true}
            on:click={handleLike}
            title="Like"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={liked === true ? "currentColor" : "none"}
              stroke="currentColor"
            >
              <path
                d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            class="action-btn"
            class:active={liked === false}
            on:click={handleDislike}
            title="Dislike"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={liked === false ? "currentColor" : "none"}
              stroke="currentColor"
            >
              <path
                d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            class="action-btn"
            on:click={handleRegenerate}
            title="Regenerate response"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .message-wrapper {
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }

  .message-wrapper.user {
    justify-content: flex-end;
  }

  .message-wrapper.ai {
    justify-content: flex-start;
  }

  .message-avatar {
    width: 32px;
    height: 32px;
    min-width: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .message-content {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-width: 65%;
    min-width: 120px;
  }

  .message-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 4px;
  }

  .message-time {
    font-size: 12px;
    color: var(--color-text-secondary);
  }

  .message-actions {
    display: flex;
    gap: 4px;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .message-wrapper:hover .message-actions {
    opacity: 1;
  }

  .action-btn {
    background: transparent;
    border: none;
    padding: 6px;
    border-radius: 6px;
    cursor: pointer;
    color: var(--color-text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .action-btn:hover {
    background: var(--color-bg-secondary);
    color: var(--color-text-primary);
  }

  .action-btn.active {
    color: #6366f1;
  }

  :global(.message-bubble) {
    padding: 14px 18px;
    border-radius: var(--radius-md);
    line-height: 1.6;
    font-size: 15px;
    animation: fadeIn 0.3s ease-out;
    width: 100%;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  :global(.message-bubble.user) {
    background-color: var(--color-user-bg);
    color: var(--color-user-text);
    border-radius: 16px 16px 4px 16px;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.15);
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    max-width: 100%;
  }

  :global(.message-bubble.ai) {
    background-color: var(--color-ai-bg);
    color: var(--color-ai-text);
    border: 1px solid var(--color-border);
    border-radius: 16px 16px 16px 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    max-width: 100%;
  }

  :global(.message-bubble.ai strong) {
    font-weight: 600;
    color: #1a1a1a;
  }

  :global(.message-bubble.ai a) {
    color: #6366f1;
    text-decoration: none;
    border-bottom: 1px solid #6366f1;
    transition: all 0.2s;
  }

  :global(.message-bubble.ai a:hover) {
    color: #4f46e5;
    border-bottom-color: #4f46e5;
  }

  :global(.message-bubble.error) {
    background-color: var(--color-error-bg);
    color: var(--color-error);
  }
</style>
