<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let disabled: boolean = false;

  const dispatch = createEventDispatcher<{ send: string }>();
  const MAX_LENGTH = 1000;

  let inputValue = '';

  function handleSubmit() {
    const trimmedValue = inputValue.trim();

    if (trimmedValue && !disabled) {
      dispatch('send', trimmedValue);
      inputValue = '';
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }

  $: isValid = inputValue.trim().length > 0 && inputValue.length <= MAX_LENGTH;
</script>

<div class="chat-input">
  <div class="input-container">
    <input
      type="text"
      bind:value={inputValue}
      on:keydown={handleKeydown}
      placeholder="Type your message..."
      maxlength={MAX_LENGTH}
      disabled={disabled}
      class="text-input"
    />
    <button
      on:click={handleSubmit}
      disabled={disabled || !isValid}
      class="send-button"
      type="button"
    >
      Send
    </button>
  </div>
  {#if inputValue.length > MAX_LENGTH * 0.9}
    <div class="char-count">
      {inputValue.length} / {MAX_LENGTH}
    </div>
  {/if}
</div>

<style>
  .chat-input {
    border-top: 1px solid #e0e0e0;
    background-color: #ffffff;
    padding: 16px;
  }

  .input-container {
    display: flex;
    gap: 8px;
  }

  .text-input {
    flex: 1;
    padding: 12px 16px;
    border: 1px solid #d0d0d0;
    border-radius: 8px;
    font-size: 15px;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s;
  }

  .text-input:focus {
    border-color: #0066ff;
  }

  .text-input:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }

  .send-button {
    padding: 12px 24px;
    background-color: #0066ff;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    white-space: nowrap;
  }

  .send-button:hover:not(:disabled) {
    background-color: #0052cc;
  }

  .send-button:disabled {
    background-color: #c0c0c0;
    cursor: not-allowed;
  }

  .char-count {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
    text-align: right;
  }
</style>
