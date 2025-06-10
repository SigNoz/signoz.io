# Bot Detection System

This document describes the bot detection system implemented to track AI bots and crawlers that don't execute JavaScript.

## Overview

The bot detection system works at multiple levels:

1. **Server-side tracking (Middleware)** - Detects bots that don't execute JavaScript
2. **Client-side tracking (React Hook)** - Enhanced detection for browsers that do execute JavaScript
3. **Unified logging** - Both systems use the same logging infrastructure

## How It Works

### Server-Side Detection (middleware.ts)

The Next.js middleware intercepts all requests and:

- Extracts the user agent from request headers
- Checks against known bot patterns (AI bots, crawlers, etc.)
- Logs bot requests with event name `Bot Page Request`
- Continues request processing without blocking

**Key Benefits:**
- Works for curl, wget, and other non-browser requests
- Captures AI bots that don't execute JavaScript
- No performance impact on legitimate users
- Runs before any JavaScript execution

### Client-Side Detection (useLogEvent hook)

Enhanced client-side detection includes:

- User agent pattern matching
- WebDriver detection
- Headless browser indicators
- Missing browser features
- Screen dimension checks

## Bot Patterns Detected

The system detects these types of bots:

### AI/LLM Bots
- GPT, OpenAI, Claude, Anthropic
- Bard, ChatGPT, LLaMA, PaLM, Gemini

### Search Engine Crawlers
- GoogleBot, BingBot, Yahoo Slurp
- DuckDuckBot, BaiduSpider, YandexBot
- Social media crawlers (Facebook, Twitter, LinkedIn)

### Development Tools
- curl, wget, Python requests
- Postman, HTTPie, Insomnia
- Node.js fetch, Axios

## Testing the System

### Test with curl

```bash
# Test bot detection
curl "https://your-domain.com/api/test-bot-detection" \
  -H "User-Agent: curl/7.68.0"

# Expected response:
{
  "userAgent": "curl/7.68.0",
  "isBot": true,
  "botType": "curl",
  "ip": "...",
  "timestamp": "..."
}
```

### Test with specific bot user agents

```bash
# Test GPT bot detection
curl "https://your-domain.com/api/test-bot-detection" \
  -H "User-Agent: GPTBot/1.0"

# Test ChatGPT bot detection  
curl "https://your-domain.com/api/test-bot-detection" \
  -H "User-Agent: ChatGPT-User/1.0"

# Test Claude bot detection
curl "https://your-domain.com/api/test-bot-detection" \
  -H "User-Agent: Claude-Web/1.0"
```

### Test in browser

Visit `/api/test-bot-detection` in your browser to see how legitimate browser requests are handled.

## Event Data Structure

### Server-Side Bot Events

```typescript
{
  eventName: 'Bot Page Request',
  eventType: 'track',
  attributes: {
    pageLocation: '/path/visited',
    custom_user_agent: 'curl/7.68.0',
    custom_bot_type: 'curl',
    custom_os: 'Linux',
    custom_referrer: 'direct',
    custom_ip: '192.168.1.1',
    custom_source: 'server',
    custom_is_bot: true,
    custom_request_method: 'GET',
    custom_has_javascript: false
  },
  anonymousId: 'uuid-generated-id'
}
```

### Client-Side Enhanced Events

Regular events now include additional bot detection attributes:

```typescript
{
  // ... existing attributes
  custom_is_bot_client: false,
  custom_bot_type_client: null,
  custom_bot_detection_reason: null,
  custom_has_javascript: true
}
```

## Configuration

### Environment Variables

Ensure `NEXT_PUBLIC_TUNNEL_ENDPOINT` is set for logging to work.

### Middleware Configuration

The middleware runs on all routes except:
- API routes (`/api/*`)
- Static files (`/_next/static/*`)
- Image optimization (`/_next/image/*`)
- Favicon (`/favicon.ico`)

To modify which routes are monitored, update the `matcher` in `middleware.ts`:

```typescript
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

### Adding New Bot Patterns

To detect additional bots, add patterns to `BOT_USER_AGENT_PATTERNS` in `utils/logEvent.ts`:

```typescript
export const BOT_USER_AGENT_PATTERNS = [
  // ... existing patterns
  /your-new-bot-pattern/i,
]
```

## Monitoring and Analytics

Bot events are sent to your logging endpoint with:

- `eventName: 'Bot Page Request'` for server-side detection
- Enhanced attributes for all client-side events
- Consistent anonymousId tracking across both systems

You can query these events to understand:
- Which AI bots are accessing your site
- What pages they're requesting
- Traffic patterns and volumes
- Bot vs human traffic ratios

## Performance Considerations

- Server-side logging is fire-and-forget (non-blocking)
- Client-side detection adds minimal overhead
- Bot patterns are cached in memory
- No external API calls for detection

## Privacy and Compliance

The system:
- Uses anonymous IDs for tracking
- Logs only publicly available request headers
- Doesn't store personal information
- Follows your existing privacy policies 