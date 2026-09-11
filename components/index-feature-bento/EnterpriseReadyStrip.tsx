import { ArrowRight } from 'lucide-react'

import TrackingLink from '@/components/TrackingLink'
import Eyebrow from '@/components/homepage/Eyebrow'
import HipaaLogo from '@/public/svgs/icons/hipaa.svg'
import Soc2Logo from '@/public/svgs/icons/SOC-2.svg'

export default function EnterpriseReadyStrip() {
  const compliances = [
    {
      Logo: Soc2Logo,
      label: 'SOC 2 Type II',
    },
    {
      Logo: HipaaLogo,
      label: 'HIPAA',
    },
  ]

  return (
    <div className="rule-fade-x mt-14 border-y border-[var(--l2-border)] md:mt-20">
      <div className="grid gap-0 md:grid-cols-3">
        <div className="rule-fade-x flex items-center border-b border-[var(--l2-border)] py-8 md:border-b-0 md:pr-8">
          <div>
            <Eyebrow>Enterprise ready</Eyebrow>
            <h3 className="m-0 mt-3 max-w-xs text-2xl font-medium leading-tight tracking-tight text-[var(--l1-foreground)] md:max-w-xs md:text-3xl">
              Built secure, from day one.
            </h3>
            <TrackingLink
              className="btn-tactile btn-tactile--secondary mt-6 no-underline"
              clickLocation="Homepage Enterprise Ready Strip"
              clickName="Trust Center Link"
              clickText="Trust Center"
              clickType="Secondary CTA"
              href="https://trust.signoz.io/"
              target="_blank"
            >
              Trust Center
              <ArrowRight size={12} aria-hidden="true" />
            </TrackingLink>
          </div>
        </div>

        {compliances.map(({ Logo, label }, index) => (
          <div
            key={label}
            className="rule-fade-x md:vrule-solid flex min-h-44 flex-col justify-between gap-5 border-t border-[var(--l2-border)] py-7 md:min-h-56 md:border-t-0 md:px-12"
          >
            <Logo className="h-20 w-auto opacity-80 md:h-24" />
            <p className="m-0 text-base font-medium leading-6 text-[var(--l2-foreground)] md:text-lg md:leading-7">
              {label} compliance
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
