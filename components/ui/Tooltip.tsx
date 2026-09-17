'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import React, { useRef, useState } from 'react'

const OPEN_DELAY_MS = 200
const CLOSE_DELAY_MS = 200

const TRIGGER_CLASS_NAME =
  'border-b border-dashed border-[var(--l3-foreground)] decoration-[var(--l3-foreground)] transition-colors hover:border-[var(--l1-foreground)] hover:text-[var(--l1-foreground)]'

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
    <>
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
              className={`cursor-pointer no-underline ${TRIGGER_CLASS_NAME}`}
              {...hoverHandlers}
              onFocus={() => openPassively(0)}
              onBlur={scheduleClose}
            >
              {text}
            </a>
          </PopoverPrimitive.Anchor>
        ) : (
          <PopoverPrimitive.Trigger asChild>
            <button
              type="button"
              data-glossary-definition={content}
              className={`inline cursor-help appearance-none border-0 bg-transparent p-0 text-inherit [font:inherit] ${TRIGGER_CLASS_NAME}`}
              {...hoverHandlers}
            >
              {text}
            </button>
          </PopoverPrimitive.Trigger>
        )}
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            side="top"
            sideOffset={8}
            avoidCollisions
            collisionPadding={8}
            onOpenAutoFocus={(event) => {
              if (openedPassively.current) event.preventDefault()
            }}
            onPointerEnter={cancelClose}
            onPointerLeave={(event) => {
              if (event.pointerType !== 'touch') scheduleClose()
            }}
            className="z-[200] w-64 rounded-lg border border-[var(--l2-border)] bg-[var(--l2-background)] p-4 text-left text-sm text-[var(--l1-foreground)] shadow-[0_6px_12px_0_color-mix(in_srgb,var(--base-black)_20%,transparent)] outline-none"
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
            <PopoverPrimitive.Arrow className="fill-[var(--l2-background)]" width={10} height={5} />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
      <span>&nbsp;</span>
    </>
  )
}
