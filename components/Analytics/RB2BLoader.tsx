'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const RB2B_ID = 'VN080HZ24Y6J'

export default function RB2BLoader() {
  const pathname = usePathname()

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !pathname) return

    // RB2B's Next.js guide reloads the script on each pathname change.
    // https://support.rb2b.com/en/articles/9116902-rb2b-install-guide-for-next-js
    document.getElementById('rb2b-script')?.remove()

    const script = document.createElement('script')
    script.id = 'rb2b-script'
    script.src = `https://ddwl4m2hdecbv.cloudfront.net/b/${RB2B_ID}/${RB2B_ID}.js.gz`
    script.async = true
    document.body.appendChild(script)

    return () => script.remove()
  }, [pathname])

  return null
}
