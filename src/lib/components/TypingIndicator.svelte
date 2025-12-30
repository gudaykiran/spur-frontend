<div class="typing-indicator">
  <span class="dot"></span>
  <span class="dot"></span>
  <span class="dot"></span>
</div>

<style>
  .typing-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 12px 16px;
    background-color: #f0f0f0;
    border-radius: 12px;
    border-bottom-left-radius: 4px;
    width: fit-content;
    margin-bottom: 12px;
  }

  .dot {
    width: 8px;
    height: 8px;
    background-color: #999;
    border-radius: 50%;
    animation: typing 1.4s infinite;
  }

  .dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes typing {
    0%, 60%, 100% {
      opacity: 0.3;
      transform: translateY(0);
    }
    30% {
      opacity: 1;
      transform: translateY(-4px);
    }
  }
</style>
