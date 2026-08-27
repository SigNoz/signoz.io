'use client'

import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
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

// Keep the tooltip this far from the edge of the content column.
const EDGE_PADDING = 8
// Gap between the trigger and the tooltip.
const GAP = 8
// Keep the tooltip below the sticky top navigation, which is about 64px tall.
const NAV_SAFE_TOP = 72

// Find the nearest ancestor that clips its content. The docs content column uses
// `overflow-clip`, so the tooltip must stay inside it or the text gets cut off.
function getClipAncestor(element: HTMLElement | null): HTMLElement | null {
  let node = element?.parentElement ?? null
  while (node && node !== document.body) {
    const style = getComputedStyle(node)
    if ([style.overflow, style.overflowX, style.overflowY].some((value) => value !== 'visible')) {
      return node
    }
    node = node.parentElement
  }
  return null
}

export default function Tooltip({
  text,
  content,
  link,
  linkText = 'Explore more →',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [offsetX, setOffsetX] = useState(0)
  const [placement, setPlacement] = useState<'top' | 'bottom'>('top')
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

  // Position the tooltip once it is shown. Two problems get fixed here:
  //   1. A trigger at the start or end of a line pushes the box past the content
  //      column, where `overflow-clip` cuts it off. Shift it back inside the column.
  //   2. A trigger near the top has no room above, so the box would cover the top
  //      navigation. Flip it below the trigger when the space above is too small.
  useLayoutEffect(() => {
    if (!isVisible || !tooltipRef.current) {
      return
    }
    const clip = getClipAncestor(triggerRef.current)
    const bound = clip
      ? clip.getBoundingClientRect()
      : { left: 0, right: window.innerWidth, top: 0 }
    const triggerRect = triggerRef.current?.getBoundingClientRect()
    // offsetX is already baked into the current rect, so start from the unshifted box.
    const rect = tooltipRef.current.getBoundingClientRect()

    const left = rect.left - offsetX
    const right = rect.right - offsetX
    let shift = 0
    if (left < bound.left + EDGE_PADDING) {
      shift = bound.left + EDGE_PADDING - left
    } else if (right > bound.right - EDGE_PADDING) {
      shift = bound.right - EDGE_PADDING - right
    }
    setOffsetX(shift)

    if (triggerRect) {
      const spaceAbove = triggerRect.top - Math.max(bound.top, NAV_SAFE_TOP)
      setPlacement(rect.height + GAP > spaceAbove ? 'bottom' : 'top')
    }
    // offsetX is read as the unshift baseline, not a trigger. Adding it here loops.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isVisible) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setIsVisible(false)
    }
  }

  const isTop = placement === 'top'

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

      {isVisible && (
        <span
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          style={{ marginLeft: offsetX }}
          className={`animate-in fade-in absolute left-1/2 z-50 block w-64 -translate-x-1/2 rounded-lg border border-[var(--l2-border)] bg-[var(--l2-background)] p-4 text-sm text-[var(--l1-foreground)] shadow-xl duration-200 ${
            isTop ? 'slide-in-from-bottom-1 bottom-full mb-2' : 'slide-in-from-top-1 top-full mt-2'
          }`}
        >
          {/* Arrow points at the trigger and is counter-shifted to stay over it. */}
          <span
            style={{ marginLeft: -offsetX }}
            className={`absolute left-1/2 block -translate-x-1/2 border-4 border-transparent ${
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
        </span>
      )}
    </span>
  )
}
