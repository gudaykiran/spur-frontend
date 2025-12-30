<div class="typing-wrapper">
  <div class="typing-avatar">C</div>
  <div class="typing-indicator">
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  </div>
</div>

<style>
  .typing-wrapper {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding: var(--spacing-lg);
  }

  .typing-avatar {
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

  :global(.typing-indicator) {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 12px 16px;
    background-color: var(--color-ai-bg);
    border: 1px solid var(--color-border);
    border-radius: 16px 16px 16px 4px;
    width: fit-content;
  }

  :global(.typing-dot) {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #6b7280;
    animation: typing 1.4s infinite;
  }

  :global(.typing-dot:nth-child(2)) {
    animation-delay: 0.2s;
  }

  :global(.typing-dot:nth-child(3)) {
    animation-delay: 0.4s;
  }

  @keyframes typing {
    0%,
    60%,
    100% {
      opacity: 0.3;
      transform: scale(1);
    }
    30% {
      opacity: 1;
      transform: scale(1.2);
    }
  }
</style>
