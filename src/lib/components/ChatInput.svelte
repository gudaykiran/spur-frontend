<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let disabled: boolean = false;
  export let CHARACTER_LIMIT: number = 1000;

  const dispatch = createEventDispatcher<{ send: string }>();

  let inputValue = "";
  let inputElement: HTMLTextAreaElement;

  function handleSubmit() {
    const trimmedValue = inputValue.trim();

    if (trimmedValue && !disabled && trimmedValue.length > 0) {
      dispatch("send", trimmedValue);
      inputValue = "";
      if (inputElement) {
        inputElement.focus();
      }
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey && !disabled) {
      event.preventDefault();
      handleSubmit();
    }
  }

  function handleInput() {
    // Trim if exceeds limit
    if (inputValue.length > CHARACTER_LIMIT) {
      inputValue = inputValue.slice(0, CHARACTER_LIMIT);
    }
  }

  $: canSubmit = inputValue.trim().length > 0 && !disabled;
  $: charCount = inputValue.length;
  $: isNearLimit = charCount > CHARACTER_LIMIT * 0.8;
</script>

<div class="chat-input-wrapper">
  <div class="chat-input-container">
    <textarea
      bind:this={inputElement}
      bind:value={inputValue}
      on:keydown={handleKeydown}
      on:input={handleInput}
      placeholder="Type your message..."
      maxlength={CHARACTER_LIMIT}
      {disabled}
      class="chat-input-field"
      rows="1"
      style="width: 100%;"
    />
    <button
      on:click={handleSubmit}
      disabled={!canSubmit}
      class="send-button"
      type="button"
    >
      Send
    </button>
  </div>
  {#if isNearLimit}
    <div
      class="char-count"
      class:warning={charCount > CHARACTER_LIMIT * 0.9}
      class:error={charCount >= CHARACTER_LIMIT}
    >
      {charCount} / {CHARACTER_LIMIT}
    </div>
  {/if}
</div>

<style>
  :global(.chat-input-wrapper) {
    padding: var(--spacing-lg);
    border-top: 1px solid var(--color-border);
    background: linear-gradient(
      180deg,
      var(--color-bg-secondary) 0%,
      var(--color-bg-primary) 100%
    );
    box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.05);
  }

  :global(.chat-input-container) {
    display: flex;
    gap: var(--spacing-md);
    align-items: flex-end;
  }

  :global(.chat-input-field) {
    flex: 1;
    padding: var(--spacing-md) var(--spacing-lg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    font-size: var(--font-size-base);
    font-family: inherit;
    color: var(--color-text-primary);
    background-color: var(--color-bg-primary);
    resize: none;
    max-height: 120px;
    min-height: 48px;
    transition: var(--transition-base);
    box-shadow: var(--shadow-sm);
    line-height: 1.5;
    overflow-y: auto;
    overflow-x: hidden;
    word-break: break-word;
    overflow-wrap: break-word;
  }

  :global(.chat-input-field::placeholder) {
    color: var(--color-text-secondary);
  }

  :global(.chat-input-field:focus) {
    outline: none;
    border-color: #3b82f6;
    box-shadow:
      0 0 0 3px rgba(59, 130, 246, 0.1),
      var(--shadow-sm);
  }

  :global(.chat-input-field:disabled) {
    background-color: var(--color-bg-secondary);
    color: var(--color-text-secondary);
    cursor: not-allowed;
  }

  :global(.send-button) {
    padding: var(--spacing-md) var(--spacing-xl);
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    font-size: var(--font-size-base);
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition-base);
    white-space: nowrap;
    box-shadow: var(--shadow-md);
  }

  :global(.send-button:hover:not(:disabled)) {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 12px rgba(59, 130, 246, 0.3);
  }

  :global(.send-button:active:not(:disabled)) {
    transform: translateY(0);
  }

  :global(.send-button:disabled) {
    background: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
    box-shadow: var(--shadow-sm);
  }

  :global(.char-count) {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin-top: var(--spacing-xs);
    text-align: right;
  }

  :global(.char-count.warning) {
    color: #f59e0b;
    font-weight: 500;
  }

  :global(.char-count.error) {
    color: var(--color-error);
    font-weight: 600;
  }
</style>
