import { ArrowRight } from 'lucide-react'
import TrackingLink from '../TrackingLink'
import Button from '@/components/ui/Button'
const HOSTING_DECISION_ITEMS = [
  {
    name: 'Compare Self Host vs Cloud',
    href: '/blog/cloud-vs-self-hosted-deployment-guide/',
    clickName: 'Compare Self Host vs Cloud',
  },
  {
    name: 'Get Started - Free',
    href: '/teams/',
    clickName: 'Get Started - Free',
  },
] as const

const [compareHostingOption, getStartedHostingOption] = HOSTING_DECISION_ITEMS

const HostingBanner = () => {
  return (
    <div className="my-4 rounded-lg bg-[var(--l2-background)] p-4">
      <div className="mb-3 text-sm text-[var(--l2-foreground)]">
        Choose SigNoz Cloud for ease, or self-host for control—with the freedom to switch as your
        needs grow.
      </div>

      <div className="flex justify-end">
        <div className="flex flex-wrap items-center gap-3 whitespace-nowrap">
          <TrackingLink
            href={compareHostingOption.href}
            clickType="Secondary CTA"
            clickName={compareHostingOption.clickName}
            clickLocation="Hosting Decision Card"
            clickText={compareHostingOption.name}
            className="group inline-flex items-center gap-1 text-sm font-medium text-[var(--l2-foreground)] no-underline hover:text-[var(--l1-foreground)]"
          >
            <Button variant="legacySecondary" className="!h-8 !px-3 !py-1">
              {compareHostingOption.name}{' '}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </TrackingLink>

          <TrackingLink
            href={getStartedHostingOption.href}
            clickType="Primary CTA"
            clickName={getStartedHostingOption.clickName}
            clickLocation="Hosting Decision Card"
            clickText={getStartedHostingOption.name}
            className="no-underline"
          >
            <Button variant="legacyPrimary" className="!h-8 !px-3 !py-1">
              {getStartedHostingOption.name}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </TrackingLink>
        </div>
      </div>
    </div>
  )
}

export default HostingBanner
