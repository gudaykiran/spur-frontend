<script lang="ts">
  export let sender: 'user' | 'ai';
  export let text: string;
</script>

<div class="message-bubble" class:user={sender === 'user'} class:ai={sender === 'ai'}>
  <div class="message-text">{text}</div>
</div>

<style>
  .message-bubble {
    max-width: 70%;
    margin-bottom: 12px;
    padding: 12px 16px;
    border-radius: 12px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.5;
  }

  .message-bubble.user {
    background-color: #0066ff;
    color: #ffffff;
    margin-left: auto;
    margin-right: 0;
    border-bottom-right-radius: 4px;
  }

  .message-bubble.ai {
    background-color: #f0f0f0;
    color: #1a1a1a;
    margin-right: auto;
    margin-left: 0;
    border-bottom-left-radius: 4px;
  }

  .message-text {
    font-size: 15px;
  }
</style>
