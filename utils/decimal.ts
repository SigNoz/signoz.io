// Decimal chat widget configuration and loader.
// These values come from the Decimal dashboard (Setup tab). The public-config
// token is safe to expose in the client — it only encodes the widget id and a
// timestamp, and the widget is rejected on domains not allow-listed in Decimal.
export const DECIMAL_WIDGET_ID = 'wgt_mUjvpIptdhjk60ngaT59GyI2G7gM1qZJ'
export const DECIMAL_PUBLIC_CONFIG =
  'eyJhbGciOiJIUzI1NiJ9.eyJ3aWQiOiJ3Z3RfbVVqdnBJcHRkaGprNjBuZ2FUNTlHeUkyRzdnTTFxWkoiLCJkb21haW5zIjpbXSwiaWF0IjoxNzgyMTEzMzkzfQ.cRozMWLXlU4vsiXd_N21ZIcMCtp47c6pss_DN9MNaQE'

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
  if (document.getElementById(DECIMAL_SCRIPT_ID)) return

  const script = document.createElement('script')
  script.id = DECIMAL_SCRIPT_ID
  script.src = DECIMAL_SCRIPT_SRC
  script.setAttribute('data-widget-id', DECIMAL_WIDGET_ID)
  script.setAttribute('data-public-config', DECIMAL_PUBLIC_CONFIG)
  script.setAttribute('data-display-mode', DECIMAL_DISPLAY_MODE)
  script.async = true
  document.head.appendChild(script)
}

/**
 * Opens the Decimal chat panel. Ensures the widget is loaded first (so this
 * works even on pages where the bubble isn't already mounted), then waits for
 * the widget API to be ready before showing it.
 */
export function openDecimalChat(): void {
  if (typeof window === 'undefined') return
  ensureDecimalScript()

  const tryShow = (attempt: number): void => {
    if (window.Decimal?.show) {
      window.Decimal.show()
      return
    }
    if (attempt >= 50) return // give up after ~5s
    window.setTimeout(() => tryShow(attempt + 1), 100)
  }

  tryShow(0)
}

declare global {
  interface Window {
    Decimal?: {
      show: () => void
      hide: () => void
      shutdown?: () => void
      boot?: (opts: { user_token?: string }) => void
      update?: (data: Record<string, unknown>) => void
      theme?: (opts: Record<string, unknown>) => void
    }
  }
}
