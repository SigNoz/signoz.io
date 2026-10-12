'use client'

import dynamic from 'next/dynamic'

import { useMediaQuery } from '@/hooks/useMediaQuery'

// Single source of sizing for the terminal, its loading fallback, and the
// mobile placeholder; the sibling NozChatPanel is absolutely positioned on lg,
// so a size mismatch here shifts the section.
const TERMINAL_CLASS_NAME = 'hidden w-full md:flex md:h-[560px] lg:h-[600px] lg:w-[74%]'

function TerminalPlaceholder() {
  return <div className={TERMINAL_CLASS_NAME} aria-hidden />
}

const AgentTerminalLazy = dynamic(() => import('./agent-terminal'), {
  ssr: false,
  loading: () => <TerminalPlaceholder />,
})

// JS render guard: CSS hiding would download and hydrate the terminal on phones.
export default function AgentTerminalGate() {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (!isDesktop) return <TerminalPlaceholder />

  return <AgentTerminalLazy className={TERMINAL_CLASS_NAME} />
}
