import React from 'react'
import { ArrowRight } from 'lucide-react'
import Link from '@/components/Link'

interface CardProps {
  title: string
  description: string
  href: string
  icon?: React.ReactNode
}

const DocCard: React.FC<CardProps> = ({ title, description, href, icon }) => {
  if (icon) {
    return (
      <Link
        href={href}
        className="block min-h-[152px] border border-dashed border-[var(--l1-border)] bg-transparent p-4 no-underline outline-none transition-colors hover:bg-[var(--l1-background-hover)] focus-visible:bg-[var(--l1-background-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--l1-border)] active:bg-[var(--l1-background-hover)]"
      >
        <div className="flex min-h-[120px] flex-col justify-between">
          <div className="size-8 shrink-0 overflow-hidden rounded-[4px] text-[var(--l1-foreground)] [&_img]:size-full [&_img]:object-contain [&_svg]:size-full [&_svg]:fill-current [&_svg]:stroke-current">
            {icon}
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-base font-semibold leading-none text-[var(--l1-foreground-hover)]">
              {title}
            </div>
            <p className="m-0 text-[13px] leading-5 tracking-[-0.065px] text-[var(--l2-foreground)]">
              {description}
            </p>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className="group block rounded border border-solid border-[var(--l1-border)] bg-[var(--l2-background)] p-4 no-underline outline-none transition-colors hover:bg-[var(--l1-background-hover)] focus-visible:bg-[var(--l1-background-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--l1-border)] active:bg-[var(--l1-background-hover)]"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-2">
          <div className="text-base font-medium leading-none text-[var(--l1-foreground)] transition-colors group-hover:text-[var(--l1-foreground-hover)] group-focus-visible:text-[var(--l1-foreground-hover)] group-active:text-[var(--l1-foreground-hover)]">
            {title}
          </div>
          <ArrowRight
            aria-hidden="true"
            className="size-4 shrink-0 text-[var(--l2-foreground)] transition-colors group-hover:text-[var(--l1-foreground-hover)] group-focus-visible:text-[var(--l1-foreground-hover)] group-active:text-[var(--l1-foreground-hover)]"
            strokeWidth={1.333}
          />
        </div>
        <p className="m-0 text-[13px] leading-5 tracking-[-0.065px] text-[var(--l2-foreground)] transition-colors group-hover:text-[var(--l1-foreground-hover)] group-focus-visible:text-[var(--l1-foreground-hover)] group-active:text-[var(--l1-foreground-hover)]">
          {description}
        </p>
      </div>
    </Link>
  )
}

export default DocCard
