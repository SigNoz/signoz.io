// Decimal chat widget configuration and loader.
// Config comes from the Decimal dashboard (Setup tab) and is supplied via env
// vars — no hardcoded fallbacks, so a missing/misconfigured value fails loudly
// instead of silently using a baked-in default. Set these in Vercel for every
// environment:
//   NEXT_PUBLIC_DECIMAL_WIDGET_ID
//   NEXT_PUBLIC_DECIMAL_PUBLIC_CONFIG
// Both are NEXT_PUBLIC_ (exposed to the browser); the public-config token is
// public by design — it only encodes the widget id + a timestamp, and the
// widget is rejected on domains not allow-listed in Decimal.
export const DECIMAL_WIDGET_ID = process.env.NEXT_PUBLIC_DECIMAL_WIDGET_ID
export const DECIMAL_PUBLIC_CONFIG = process.env.NEXT_PUBLIC_DECIMAL_PUBLIC_CONFIG

// Theme applied once the widget script loads (values from the Decimal dashboard).
const DECIMAL_THEME = {
  colorScheme: 'dark',
  primaryColor: 'rgb(255, 68, 32)',
  backgroundColor: 'oklch(0.141 0.005 285.823)',
  textColor: '#FAFAFA',
  textColorSecondary: '#FFFFFF',
  textColorMuted: '#A1A1AA',
  borderColor: '#27272A',
  headerTitle: 'SigNoz Support',
  greeting: "👋 Hey! I'm SigNoz AI. Ask me about docs, pricing, or anything else!",
  suggestedMessages: [
    'How to start with SigNoz?',
    'Why use OpenTelemetry?',
    'How SigNoz pricing works?',
    'Migrate from Grafana or Datadog',
  ],
}

// Display mode controls how the chat opens:
//   'floating'        -> corner popup (matches the previous Chatbase bubble)
//   'push-sidebar'    -> full-height sidebar that pushes page content left
//   'overlay-sidebar' -> full-height sidebar overlaying content on the right
export const DECIMAL_DISPLAY_MODE: 'floating' | 'push-sidebar' | 'overlay-sidebar' = 'floating'

const DECIMAL_SCRIPT_SRC = 'https://app.getdecimal.ai/widget/v1/widget.js'
const DECIMAL_SCRIPT_ID = 'decimal-widget'

/**
 * Injects the Decimal widget script once. Safe to call repeatedly and from any
 * page — subsequent calls are no-ops.
 */
export function ensureDecimalScript(): void {
  if (typeof window === 'undefined') return
  if (!DECIMAL_WIDGET_ID || !DECIMAL_PUBLIC_CONFIG) {
    console.warn(
      '[Decimal] NEXT_PUBLIC_DECIMAL_WIDGET_ID / NEXT_PUBLIC_DECIMAL_PUBLIC_CONFIG are not set; chat widget disabled'
    )
    return
  }
  if (document.getElementById(DECIMAL_SCRIPT_ID)) return

  const script = document.createElement('script')
  script.id = DECIMAL_SCRIPT_ID
  script.src = DECIMAL_SCRIPT_SRC
  script.setAttribute('data-widget-id', DECIMAL_WIDGET_ID)
  script.setAttribute('data-public-config', DECIMAL_PUBLIC_CONFIG)
  script.setAttribute('data-display-mode', DECIMAL_DISPLAY_MODE)
  script.async = true
  script.onload = () => {
    // Apply SigNoz branding once the widget API is available.
    window.Decimal?.theme?.(DECIMAL_THEME)
  }
  document.head.appendChild(script)
}

/**
 * Opens the Decimal chat panel. Ensures the widget is loaded first (so this
 * works even on pages where the bubble isn't already mounted), then waits for
 * the widget API to be ready before showing it. Pass `{ presentation: 'modal' }`
 * to open it as a centered modal (used by the search surfaces).
 */
export function openDecimalChat(options?: { presentation?: 'modal' | 'sidebar' }): void {
  if (typeof window === 'undefined') return
  ensureDecimalScript()

  const tryShow = (attempt: number): void => {
    if (window.Decimal?.show) {
      window.Decimal.show(options)
      return
    }
    if (attempt >= 50) {
      // Give up after ~5s — the script likely failed to load (network error,
      // ad-blocker, etc.). Surface it so failures are diagnosable.
      console.warn('[Decimal] chat widget did not become ready after ~5s; ignoring open request')
      return
    }
    window.setTimeout(() => tryShow(attempt + 1), 100)
  }

  tryShow(0)
}

export function isDecimalChatOpen(): boolean {
  if (typeof document === 'undefined') return false
  return !!document.querySelector('.decimal-widget-container.open')
}

declare global {
  interface Window {
    Decimal?: {
      show: (options?: { presentation?: 'modal' | 'sidebar' }) => void
      hide: () => void
      shutdown?: () => void
      boot?: (opts: { user_token?: string }) => void
      update?: (data: Record<string, unknown>) => void
      theme?: (opts: Record<string, unknown>) => void
    }
  }
}
