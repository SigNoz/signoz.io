'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

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
  return (
    <>
      <TooltipPrimitive.Root delayDuration={200}>
        <TooltipPrimitive.Trigger asChild>
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener"
              className="cursor-pointer border-b border-dashed border-[var(--l3-foreground)] no-underline decoration-[var(--l3-foreground)] transition-colors hover:border-[var(--l1-foreground)] hover:text-[var(--l1-foreground)]"
            >
              {text}
            </a>
          ) : (
            <span
              tabIndex={0}
              className="cursor-help border-b border-dashed border-[var(--l3-foreground)] decoration-[var(--l3-foreground)] transition-colors hover:border-[var(--l1-foreground)] hover:text-[var(--l1-foreground)]"
            >
              {text}
            </span>
          )}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side="top"
            sideOffset={8}
            avoidCollisions
            collisionPadding={12}
            className="z-[200] w-64 rounded-lg border border-[var(--l2-border)] bg-[var(--l2-background)] p-4 text-sm text-[var(--l1-foreground)] shadow-[0_6px_12px_0_color-mix(in_srgb,var(--base-black)_20%,transparent)]"
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
            <TooltipPrimitive.Arrow className="fill-[var(--l2-background)]" width={10} height={5} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
      <span>&nbsp;</span>
    </>
  )
}
