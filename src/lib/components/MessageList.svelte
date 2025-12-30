<script lang="ts">
  import { onMount, afterUpdate, createEventDispatcher } from "svelte";
  import MessageBubble from "./MessageBubble.svelte";
  import type { Message } from "../types/chat";

  export let messages: Message[] = [];

  const dispatch = createEventDispatcher();
  let scrollContainer: HTMLDivElement;
  let isUserScrolling = false;

  function scrollToBottom() {
    if (scrollContainer && !isUserScrolling) {
      setTimeout(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }, 50);
    }
  }

  function handleScroll() {
    if (scrollContainer) {
      const isAtBottom =
        scrollContainer.scrollHeight -
          scrollContainer.clientHeight -
          scrollContainer.scrollTop <
        100;
      isUserScrolling = !isAtBottom;
    }
  }

  function handleRegenerate(event: CustomEvent) {
    dispatch("regenerate", event.detail);
  }

  onMount(() => {
    scrollToBottom();
  });

  afterUpdate(() => {
    scrollToBottom();
  });
</script>

<div class="chat-body" bind:this={scrollContainer} on:scroll={handleScroll}>
  {#if messages.length === 0}
    <div class="empty-state">
      <p>Start a conversation by sending a message below.</p>
    </div>
  {:else}
    {#each messages as message (message.id)}
      <div class="message-group {message.sender}">
        <MessageBubble
          sender={message.sender}
          text={message.text}
          timestamp={message.timestamp}
          messageId={message.id}
          on:regenerate={handleRegenerate}
        />
      </div>
    {/each}
  {/if}
</div>

<style>
  :global(.chat-body) {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: var(--spacing-xl);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    scroll-behavior: smooth;
  }

  :global(.chat-body::-webkit-scrollbar) {
    width: 10px;
  }

  :global(.chat-body::-webkit-scrollbar-track) {
    background: #f0f0f0;
    border-radius: 10px;
  }

  :global(.chat-body::-webkit-scrollbar-thumb) {
    background: #ccc;
    border-radius: 10px;
  }

  :global(.chat-body::-webkit-scrollbar-thumb:hover) {
    background: #999;
  }

  :global(.chat-body::-webkit-scrollbar-thumb) {
    background: #d1d5db;
    border-radius: var(--radius-md);
  }

  :global(.chat-body::-webkit-scrollbar-thumb:hover) {
    background: #9ca3af;
  }

  :global(.empty-state) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--color-text-secondary);
    font-size: var(--font-size-lg);
    text-align: center;
    padding: var(--spacing-xl);
    gap: var(--spacing-lg);
  }

  :global(.empty-state)::before {
    content: "💬";
    font-size: 3rem;
    opacity: 0.3;
  }

  :global(.message-group) {
    display: flex;
    gap: var(--spacing-md);
    align-items: flex-end;
    animation: slideIn 0.3s ease-out;
  }

  :global(.message-group.user) {
    justify-content: flex-end;
  }

  :global(.message-group.ai) {
    justify-content: flex-start;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
