'use client'

import React, { useState } from 'react'

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
  const [isVisible, setIsVisible] = useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsVisible(true)
  }

  const hideTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 300)
  }

  return (
    <span
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {/* Trigger Text */}
      {link ? (
        <>
          <a
            href={link}
            target="_blank"
            rel="noopener"
            className="cursor-pointer border-b border-dashed border-[var(--l3-foreground)] no-underline decoration-[var(--l3-foreground)] transition-colors hover:border-[var(--l1-foreground)] hover:text-[var(--l1-foreground)]"
          >
            {text}
          </a>
          <span>&nbsp;</span>
        </>
      ) : (
        <>
          <span className="cursor-help border-b border-dashed border-[var(--l3-foreground)] decoration-[var(--l3-foreground)] transition-colors hover:border-[var(--l1-foreground)] hover:text-[var(--l1-foreground)]">
            {text}
          </span>
          <span>&nbsp;</span>
        </>
      )}

      {/* Tooltip Popup */}
      {isVisible && (
        <div
          className="animate-in fade-in slide-in-from-bottom-1 absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-lg border border-[var(--l2-border)] bg-[var(--l2-background)] p-4 text-sm text-[var(--l1-foreground)] shadow-[0_6px_12px_0_color-mix(in_srgb,var(--base-black)_20%,transparent)] duration-200"
          role="tooltip"
        >
          {/* Arrow */}
          <div className="absolute left-1/2 top-full -mt-2 -translate-x-1/2 border-4 border-transparent border-t-[var(--l2-background)]" />

          <p className="mb-2 mt-0 font-medium leading-relaxed">{content}</p>

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent-primary)] transition-colors hover:text-[var(--accent-primary-hover)]"
            >
              {linkText}
            </a>
          )}
        </div>
      )}
    </span>
  )
}
