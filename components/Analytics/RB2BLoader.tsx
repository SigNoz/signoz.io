'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const RB2B_ID = 'VN080HZ24Y6J'
const RB2B_SCRIPT_ID = 'rb2b-script'
const IDLE_INJECT_TIMEOUT_MS = 2000

export default function RB2BLoader() {
  const pathname = usePathname()

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !pathname) return

    let script: HTMLScriptElement | null = null

    // RB2B's Next.js guide reloads the script on each pathname change.
    // https://support.rb2b.com/en/articles/9116902-rb2b-install-guide-for-next-js
    const inject = () => {
      document.getElementById(RB2B_SCRIPT_ID)?.remove()
      script = document.createElement('script')
      script.id = RB2B_SCRIPT_ID
      script.src = `https://ddwl4m2hdecbv.cloudfront.net/b/${RB2B_ID}/${RB2B_ID}.js.gz`
      script.async = true
      document.body.appendChild(script)
    }

    // Defer (re)injection to idle time so re-executing the tracker never
    // competes with hydration or route-transition rendering.
    let idleId: number | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(inject, { timeout: IDLE_INJECT_TIMEOUT_MS })
    } else {
      timeoutId = setTimeout(inject, 0)
    }

    return () => {
      if (idleId !== null) window.cancelIdleCallback(idleId)
      if (timeoutId !== null) clearTimeout(timeoutId)
      script?.remove()
    }
  }, [pathname])

  return null
}
