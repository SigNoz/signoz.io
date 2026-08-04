import React from 'react'
import { ArrowRight } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'
import NetAppLogo from '@/public/img/users/netapp.svg'
import SamsungLogo from '@/public/img/users/samsung.svg'
import HedraLogo from '@/public/svgs/icons/hedra.svg'
import FreoLogo from '@/public/img/users/freo.svg'
import FormanceLogo from '@/public/svgs/icons/formance.svg'
import SalesforceLogo from '@/public/img/users/salesforce.svg'
import RattleLogo from '@/public/img/users/rattle.svg'
import SarvamLogo from '@/public/svgs/icons/sarvam.svg'
import GoKiwiLogo from '@/public/img/users/gokiwi.svg'
import KernelLogo from '@/public/svgs/icons/kernel.svg'
import BlaxelLogo from '@/public/svgs/icons/blaxel.svg'
import ShapedLogo from '@/public/img/case_study/logos/shaped-logo.svg'
import { cn } from '../../app/lib/utils'

export const COMPANIES = [
  { Logo: NetAppLogo, imageDesc: 'netapp logo' },
  { Logo: SamsungLogo, imageDesc: 'samsung logo' },
  { Logo: HedraLogo, imageDesc: 'Hedra logo' },
  { Logo: FreoLogo, imageDesc: 'freo logo' },
  { Logo: FormanceLogo, imageDesc: 'formance logo' },
  { Logo: SalesforceLogo, imageDesc: 'salesforce logo' },
  { Logo: RattleLogo, imageDesc: 'rattle logo' },
  { Logo: SarvamLogo, imageDesc: 'sarvam logo' },
  { Logo: GoKiwiLogo, imageDesc: 'GoKiwi logo' },
  { Logo: KernelLogo, imageDesc: 'kernel logo' },
  { Logo: BlaxelLogo, imageDesc: 'blaxel logo' },
  { Logo: ShapedLogo, imageDesc: 'shaped logo' },
]

type TrustedByTeamsProps = {
  page?: string
  className?: string
  variant?: 'default' | 'marquee'
}

export const TrustedByTeams = ({ page, className, variant = 'default' }: TrustedByTeamsProps) => {
  const customerStoriesId = `btn-customer-stories-${page}-hero`

  if (variant === 'marquee') {
    const marqueeCompanies = [...COMPANIES, ...COMPANIES]

    return (
      <section
        className={cn('m-0 mx-auto w-full overflow-hidden border-0 py-0', className)}
        aria-label="Trusted by platform teams"
      >
        <div className="mb-4 text-center text-xs font-semibold uppercase leading-5 tracking-widest text-signoz_vanilla-400 md:text-sm">
          Trusted by the <span className="text-signoz_vanilla-100">best platform teams</span>
        </div>
        <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent_0%,#000_10%,#000_90%,transparent_100%)]">
          <div className="flex w-max animate-homepage-logo-marquee items-center gap-10 group-hover:[animation-play-state:paused] motion-reduce:translate-x-0 motion-reduce:animate-none md:gap-14">
            {marqueeCompanies.map((company, idx) => (
              <company.Logo
                key={`${idx}-${company.imageDesc}`}
                className="h-8 w-24 shrink-0 opacity-70 grayscale transition-opacity duration-200 hover:opacity-100 md:h-8 md:w-32"
                role="img"
                aria-label={idx < COMPANIES.length ? company.imageDesc : undefined}
                aria-hidden={idx >= COMPANIES.length ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className={cn(
        'm-0 mx-auto grid w-full justify-items-stretch border !border-b-0 border-dashed border-signoz_slate-400 py-6',
        className
      )}
    >
      <div className="section-container">
        <div className="mb-2 flex flex-col items-center text-center md:mb-12">
          <div className="text-sm font-semibold uppercase leading-5 tracking-[0.05em] text-signoz_vanilla-400">
            Trusted by the <span className="text-signoz_vanilla-100">best platform teams</span>
          </div>
        </div>
        <div className="mb-12 mt-12 grid grid-cols-2 place-items-center gap-y-8 px-2 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-14 md:mt-0 lg:grid-cols-6">
          {COMPANIES.map((company, idx) => (
            <company.Logo
              key={`${idx}-${company.imageDesc}`}
              className="h-10 w-24 md:h-10 md:w-32"
              role="img"
              aria-label={company.imageDesc}
            />
          ))}
        </div>
        <div
          className={`${page === 'enterprise' ? '' : "wavy-line relative mx-[-1rem] after:absolute after:top-[50%] after:h-0 after:w-full after:bg-transparent after:content-['']"}`}
        >
          <div className="mb-5 flex flex-col items-center text-center">
            <TrackingLink
              href="/customers/"
              id={customerStoriesId}
              clickType="Secondary CTA"
              clickName="Customer Stories Link"
              clickText="Read customer stories"
              clickLocation="Trusted By Section"
              className="button-background relative z-[1] flex h-8 items-center justify-center gap-1.5 truncate rounded-full px-4 py-2 pr-3 text-center text-sm font-medium not-italic leading-5 text-white no-underline outline-none hover:text-white"
            >
              Read customer stories <ArrowRight size={14} />
            </TrackingLink>
          </div>
        </div>
      </div>
    </section>
  )
}
