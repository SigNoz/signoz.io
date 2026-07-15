'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from 'app/lib/utils'

/**
 * Temporary floating theme control for dark/light VQA.
 * Replace with TopNav integration in a follow-up.
 */
export function FloatingThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        type="button"
        aria-hidden
        className="border-border bg-card text-foreground fixed right-4 bottom-4 z-[100] flex h-10 w-10 items-center justify-center rounded-full border shadow-lg"
        tabIndex={-1}
      />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'border-border bg-card text-foreground fixed right-4 bottom-4 z-[100] flex h-10 w-10 items-center justify-center rounded-full border shadow-lg',
        'hover:bg-muted focus-visible:ring-ring transition-colors focus-visible:ring-2 focus-visible:outline-none'
      )}
    >
      {isDark ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
    </button>
  )
}
