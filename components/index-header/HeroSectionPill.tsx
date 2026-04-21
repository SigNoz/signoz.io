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
      rel="nofollow"
    >
      <span className="flex h-10 items-center justify-center gap-1.5 rounded-full border border-signoz_slate-200 bg-signoz_slate-400 px-4 py-2 text-xs font-medium leading-5 text-white shadow-[0_0_14px_0_rgba(78,116,248,0.40)] sm:gap-2 sm:text-sm">
        {text}
      </span>
    </TrackingLink>
  )
}
