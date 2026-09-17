'use client'

import { AppTooltip } from './AppTooltip'

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
      <AppTooltip
        side="top"
        sideOffset={8}
        delayDuration={200}
        contentClassName="w-64 rounded-lg p-4 text-sm"
        content={
          <>
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
          </>
        }
      >
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
      </AppTooltip>
      <span>&nbsp;</span>
    </>
  )
}
