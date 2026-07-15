import TrackingLink from '@/components/TrackingLink'

interface HeroSectionPillProps {
  href: string
  text: string
}

export function HeroSectionPill({ href, text }: HeroSectionPillProps) {
  return (
    <TrackingLink
      href={href}
      clickType="Pill CTA"
      clickName="Hero Section Pill"
      clickText={text}
      clickLocation="Hero Section"
      target="_blank"
    >
      <span className="border-l2-border bg-muted text-foreground flex h-10 items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-xs leading-5 font-medium shadow-[0_0_14px_0_rgba(78,116,248,0.40)] sm:gap-2 sm:text-sm">
        {text}
      </span>
    </TrackingLink>
  )
}
