<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import MessageBubble from './MessageBubble.svelte';
  import TypingIndicator from './TypingIndicator.svelte';
  import type { Message } from '../types/chat';

  export let messages: Message[] = [];
  export let isTyping: boolean = false;

  let scrollContainer: HTMLDivElement;

  function scrollToBottom() {
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }

  onMount(() => {
    scrollToBottom();
  });

  afterUpdate(() => {
    scrollToBottom();
  });
</script>

<div class="message-list" bind:this={scrollContainer}>
  <div class="messages-container">
    {#each messages as message (message.id)}
      <MessageBubble sender={message.sender} text={message.text} />
    {/each}
    {#if isTyping}
      <TypingIndicator />
    {/if}
  </div>
</div>

<style>
  .message-list {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #ffffff;
  }

  .messages-container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .message-list::-webkit-scrollbar {
    width: 8px;
  }

  .message-list::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .message-list::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }

  .message-list::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
</style>
