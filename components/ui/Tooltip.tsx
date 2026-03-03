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
      {/* Trigger Text */}
      {link ? (
        <>
          <a
            href={link}
            target="_blank"
            rel="noopener"
            className="cursor-pointer border-b border-dashed border-zinc-500 no-underline decoration-zinc-500 transition-colors hover:border-zinc-200 hover:text-zinc-100"
          >
            {text}
          </a>
          <span>&nbsp;</span>
        </>
      ) : (
        <>
          <span className="cursor-help border-b border-dashed border-zinc-500 decoration-zinc-500 transition-colors hover:border-zinc-200 hover:text-zinc-100">
            {text}
          </span>
          <span>&nbsp;</span>
        </>
      )}

      {/* Tooltip Popup */}
      {isVisible && (
        <div
          className="animate-in fade-in slide-in-from-bottom-1 absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-lg border border-zinc-700 bg-zinc-800 p-4 text-sm text-zinc-100 shadow-xl duration-200"
          role="tooltip"
        >
          {/* Arrow */}
          <div className="absolute left-1/2 top-full -mt-2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800" />

          <p className="mb-2 mt-0 font-medium leading-relaxed">{content}</p>

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-blue-300 transition-colors hover:text-blue-200"
            >
              {linkText}
            </a>
          )}
        </div>
      )}
    </span>
  )
}
