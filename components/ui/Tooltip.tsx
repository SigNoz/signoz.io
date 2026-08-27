'use client'

import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import CustomLink from '@/components/Link'

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

// The dashed underline and colors follow the current text and the design-system
// tokens, so the tooltip works in both light and dark mode.
const TRIGGER_CLASSES =
  'border-b border-dashed border-current/40 transition-colors hover:border-current'

// Width of the tooltip card, in pixels. Matches the `w-64` class below.
const TOOLTIP_WIDTH = 256
// Keep the tooltip this far from the edge of the viewport.
const EDGE_PADDING = 8
// Gap between the trigger and the tooltip.
const GAP = 8
// Keep the tooltip below the sticky top navigation, which is about 64px tall.
const NAV_SAFE_TOP = 72

interface Position {
  top: number
  left: number
  placement: 'top' | 'bottom'
  // Arrow offset from the tooltip's left edge, so it stays over the trigger.
  arrowLeft: number
}

export default function Tooltip({
  text,
  content,
  link,
  linkText = 'Explore more →',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState<Position | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const triggerRef = useRef<HTMLSpanElement>(null)
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const tooltipId = useId()

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsVisible(true)
  }

  const hideTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 300)
  }

  // Clear the pending hide on unmount so it cannot fire against a gone component.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // The tooltip renders in a portal on `document.body`, so it escapes every
  // `overflow` ancestor (the docs content column, Admonitions, tables, code
  // blocks) that would otherwise clip it. Because it is detached from the
  // trigger's box, position it against the viewport with `position: fixed` and
  // recompute on scroll and resize while it is open.
  useLayoutEffect(() => {
    if (!isVisible) {
      setPosition(null)
      return undefined
    }

    const place = () => {
      const trigger = triggerRef.current
      const tooltip = tooltipRef.current
      if (!trigger || !tooltip) return
      const triggerRect = trigger.getBoundingClientRect()
      const height = tooltip.offsetHeight
      const width = tooltip.offsetWidth || TOOLTIP_WIDTH

      const centerX = triggerRect.left + triggerRect.width / 2
      const maxLeft = window.innerWidth - width - EDGE_PADDING
      const left = Math.min(
        Math.max(centerX - width / 2, EDGE_PADDING),
        Math.max(maxLeft, EDGE_PADDING)
      )

      const spaceAbove = triggerRect.top - NAV_SAFE_TOP
      const placement: 'top' | 'bottom' = height + GAP > spaceAbove ? 'bottom' : 'top'
      const top = placement === 'top' ? triggerRect.top - height - GAP : triggerRect.bottom + GAP

      setPosition({ top, left, placement, arrowLeft: centerX - left })
    }

    place()
    window.addEventListener('scroll', place, true)
    window.addEventListener('resize', place)
    return () => {
      window.removeEventListener('scroll', place, true)
      window.removeEventListener('resize', place)
    }
    // Re-measuring depends only on visibility; content is stable per instance.
     
  }, [isVisible])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isVisible) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setIsVisible(false)
    }
  }

  const isTop = position?.placement === 'top'

  return (
    <span
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      onKeyDown={handleKeyDown}
    >
      {link ? (
        <CustomLink
          href={link}
          aria-describedby={isVisible ? tooltipId : undefined}
          className={`cursor-pointer no-underline ${TRIGGER_CLASSES}`}
        >
          {text}
        </CustomLink>
      ) : (
        // Focusable so the definition is reachable without a mouse.
        <span
          tabIndex={0}
          role="button"
          aria-describedby={isVisible ? tooltipId : undefined}
          className={`cursor-help ${TRIGGER_CLASSES}`}
        >
          {text}
        </span>
      )}

      {isVisible &&
        typeof document !== 'undefined' &&
        createPortal(
          <span
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            // Keep the tooltip open while the pointer or focus is on it, so its
            // link stays reachable. The trigger's 300ms hide delay bridges the gap.
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
            onKeyDown={handleKeyDown}
            style={{
              top: position?.top ?? 0,
              left: position?.left ?? 0,
              // Hide until measured, so it does not flash at the corner.
              visibility: position ? 'visible' : 'hidden',
            }}
            className={`animate-in fade-in fixed z-50 block w-64 rounded-lg border border-[var(--l2-border)] bg-[var(--l2-background)] p-4 text-sm text-[var(--l1-foreground)] shadow-xl duration-200 ${
              isTop ? 'slide-in-from-bottom-1' : 'slide-in-from-top-1'
            }`}
          >
            {/* Arrow points at the trigger and is positioned over it. */}
            <span
              style={{ left: position?.arrowLeft ?? 0 }}
              className={`absolute block -translate-x-1/2 border-4 border-transparent ${
                isTop
                  ? 'top-full -mt-2 border-t-[var(--l2-background)]'
                  : 'bottom-full -mb-2 border-b-[var(--l2-background)]'
              }`}
            />

            <span className="mb-2 block font-medium leading-relaxed">{content}</span>

            {link && (
              <CustomLink
                href={link}
                className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-signoz_robin-400 transition-colors hover:text-signoz_robin-300"
              >
                {linkText}
              </CustomLink>
            )}
          </span>,
          document.body
        )}
    </span>
  )
}
