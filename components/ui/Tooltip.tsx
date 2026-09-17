'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { SolidInfoCircle } from '@signozhq/icons'
import React, { useRef, useState } from 'react'

const OPEN_DELAY_MS = 200
const CLOSE_DELAY_MS = 200

const TRIGGER_CLASS_NAME = 'content-link'

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
  const [open, setOpen] = useState(false)
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  // hover/focus opens must not steal focus into the card; click/keyboard opens should
  const openedPassively = useRef(false)

  const cancelOpen = () => {
    if (openTimer.current) clearTimeout(openTimer.current)
  }
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  const openPassively = (delay: number) => {
    cancelClose()
    cancelOpen()
    openTimer.current = setTimeout(() => {
      openedPassively.current = true
      setOpen(true)
    }, delay)
  }

  const scheduleClose = () => {
    cancelOpen()
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS)
  }

  const hoverHandlers = {
    onPointerEnter: (event: React.PointerEvent) => {
      if (event.pointerType !== 'touch') openPassively(OPEN_DELAY_MS)
    },
    onPointerLeave: (event: React.PointerEvent) => {
      if (event.pointerType !== 'touch') scheduleClose()
    },
  }

  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        openedPassively.current = false
        cancelOpen()
        cancelClose()
        setOpen(next)
      }}
    >
      {link ? (
        // Anchor, not Trigger: the term navigates on click; the card is a hover/focus preview
        <PopoverPrimitive.Anchor asChild>
          <a
            href={link}
            target="_blank"
            rel="noopener"
            data-glossary-definition={content}
            className={`cursor-pointer ${TRIGGER_CLASS_NAME}`}
            {...hoverHandlers}
            onFocus={() => openPassively(0)}
            onBlur={scheduleClose}
          >
            {text}
            <SolidInfoCircle className="glossary-info-icon" size={12} aria-hidden />
          </a>
        </PopoverPrimitive.Anchor>
      ) : (
        <PopoverPrimitive.Trigger asChild>
          <button
            type="button"
            data-glossary-definition={content}
            className={`inline cursor-help appearance-none border-0 bg-transparent [font:inherit] ${TRIGGER_CLASS_NAME}`}
            {...hoverHandlers}
          >
            {text}
            <SolidInfoCircle className="glossary-info-icon" size={12} aria-hidden />
          </button>
        </PopoverPrimitive.Trigger>
      )}
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="top"
          sideOffset={4}
          avoidCollisions
          collisionPadding={8}
          onOpenAutoFocus={(event) => {
            if (openedPassively.current) event.preventDefault()
          }}
          onPointerEnter={cancelClose}
          onPointerLeave={(event) => {
            if (event.pointerType !== 'touch') scheduleClose()
          }}
          className="z-[200] w-max max-w-[min(26.25rem,calc(100vw-2rem))] rounded border border-[var(--l3-border)] bg-[var(--popover)] p-4 text-left text-sm text-[var(--popover-foreground)] shadow-[0_6px_12px_0_color-mix(in_srgb,var(--base-black)_20%,transparent)] outline-none dark:border-[var(--l2-border)]"
        >
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
          <PopoverPrimitive.Arrow
            className="fill-[var(--popover)] [filter:drop-shadow(0_1px_0_var(--l3-border))] dark:[filter:drop-shadow(0_1px_0_var(--l2-border))]"
            width={10}
            height={5}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
