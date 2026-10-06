'use client'

import dynamic from 'next/dynamic'
import { useSyncExternalStore } from 'react'

const DESKTOP_MEDIA_QUERY = '(min-width: 768px)'

// Mirrors the call site's sizing; the sibling NozChatPanel is absolutely
// positioned on lg, so collapsing here would shift the section.
const PLACEHOLDER_CLASS_NAME = 'hidden w-full md:flex md:h-[560px] lg:h-[600px] lg:w-[74%]'

function TerminalPlaceholder() {
  return <div className={PLACEHOLDER_CLASS_NAME} aria-hidden />
}

const AgentTerminalLazy = dynamic(() => import('./agent-terminal'), {
  ssr: false,
  loading: () => <TerminalPlaceholder />,
})

// JS render guard: CSS hiding would download and hydrate the terminal on phones.
function subscribeToDesktopViewport(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY)
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

function getDesktopViewportSnapshot() {
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches
}

function getServerViewportSnapshot() {
  return false
}

export default function AgentTerminalGate({ className }: { className?: string }) {
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopViewport,
    getDesktopViewportSnapshot,
    getServerViewportSnapshot
  )

  if (!isDesktop) return <TerminalPlaceholder />

  return <AgentTerminalLazy className={className} />
}
