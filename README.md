# AI Customer Support Chat Widget

A production-grade live chat widget built with SvelteKit and TypeScript for AI-powered customer support.

## Features

- Clean, professional chat interface optimized for customer support
- Persistent session management using localStorage
- Automatic message history loading
- Real-time typing indicators
- Input validation with character limits
- Graceful error handling
- Auto-scroll to latest messages
- Responsive design

## Tech Stack

- **Framework**: SvelteKit 2
- **Language**: TypeScript
- **Styling**: Plain CSS
- **State Management**: Local component state
- **Storage**: localStorage for session persistence

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── ChatContainer.svelte    # Main container with state management
│   │   ├── MessageList.svelte      # Scrollable message list
│   │   ├── MessageBubble.svelte    # Individual message display
│   │   ├── ChatInput.svelte        # Input field with validation
│   │   └── TypingIndicator.svelte  # Animated typing indicator
│   ├── services/
│   │   └── chatApi.ts              # API communication layer
│   └── types/
│       └── chat.ts                 # TypeScript interfaces
├── routes/
│   ├── +layout.svelte              # Global layout
│   └── +page.svelte                # Main chat page
├── app.css                         # Global styles
└── app.html                        # HTML template
```

## API Endpoints

The application expects the following backend endpoints:

### Send Message
```
POST /chat/message
Content-Type: application/json

Request:
{
  "message": "string",
  "sessionId": "string" (optional)
}

Response:
{
  "reply": "string",
  "sessionId": "string"
}
```

### Get Chat History
```
GET /chat/history?sessionId={sessionId}

Response:
{
  "messages": [
    {
      "text": "string",
      "sender": "user" | "ai",
      "timestamp": number
    }
  ]
}
```

## Development

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Configuration

Update the API base URL in `src/lib/services/chatApi.ts` to point to your backend:

```typescript
const API_BASE_URL = 'https://your-api-domain.com';
```

## Session Management

The chat widget automatically:
- Generates and stores a session ID on first use
- Persists the session ID in localStorage
- Loads previous conversation history on page load
- Maintains conversation context across page refreshes

## Error Handling

All network errors are caught and displayed as friendly messages within the chat interface. Failed requests are logged to the console for debugging.

## Browser Support

Modern browsers with ES6+ support and localStorage enabled.
