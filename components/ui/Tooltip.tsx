'use client'

import React from 'react'
import { TooltipProvider, TooltipSimple } from '@signozhq/ui/tooltip'
import { cn } from 'app/lib/utils'

interface TooltipProps {
  /** The text to underline and trigger the tooltip */
  text: string
  /** The definition context to show in the tooltip */
  content: string
  /** Optional URL for "Explore more" link */
  link?: string
  /** Optional text for the link. Defaults to "Explore more ->" */
  linkText?: string
}

export default function Tooltip({
  text,
  content,
  link,
  linkText = 'Explore more →',
}: TooltipProps) {
  const triggerClassName = cn(
    'cursor-pointer border-b border-dashed border-[var(--l2-border)] no-underline',
    'transition-colors hover:border-[var(--l1-foreground)] hover:text-[var(--l1-foreground)]'
  )

  const title = (
    <span className="block max-w-xs text-left">
      <span className="mb-2 block font-medium leading-relaxed text-[var(--l1-foreground)]">
        {content}
      </span>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent-primary)] transition-colors hover:text-[var(--accent-primary-hover)]"
        >
          {linkText}
        </a>
      ) : null}
    </span>
  )

  const trigger = link ? (
    <a href={link} target="_blank" rel="noopener noreferrer nofollow" className={triggerClassName}>
      {text}
    </a>
  ) : (
    <span className={cn(triggerClassName, 'cursor-help')}>{text}</span>
  )

  return (
    <TooltipProvider delayDuration={100} skipDelayDuration={300}>
      <TooltipSimple title={title} arrow side="top" sideOffset={8}>
        <span className="relative inline-block">
          {trigger}
          <span>&nbsp;</span>
        </span>
      </TooltipSimple>
    </TooltipProvider>
  )
}
