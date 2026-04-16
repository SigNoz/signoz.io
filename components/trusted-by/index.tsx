import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'
import netappUrl from '@/public/img/users/netapp.svg?url'
import samsungUrl from '@/public/img/users/samsung.svg?url'
import comcastUrl from '@/public/img/users/comcast.svg?url'
import freoUrl from '@/public/img/users/freo.svg?url'
import formanceUrl from '@/public/svgs/icons/formance.svg?url'
import salesforceUrl from '@/public/img/users/salesforce.svg?url'
import rattleUrl from '@/public/img/users/rattle.svg?url'
import sarvamUrl from '@/public/svgs/icons/sarvam.svg?url'
import gokiwiUrl from '@/public/img/users/gokiwi.svg?url'
import lovartUrl from '@/public/svgs/icons/lovart.svg?url'
import blaxelUrl from '@/public/svgs/icons/blaxel.svg?url'
import shapedUrl from '@/public/img/case_study/logos/shaped-logo.svg?url'
import { cn } from '../../app/lib/utils'

export const COMPANIES = [
  { src: netappUrl, imageDesc: 'netapp logo' },
  { src: samsungUrl, imageDesc: 'samsung logo' },
  { src: comcastUrl, imageDesc: 'comcast logo' },
  { src: freoUrl, imageDesc: 'freo logo' },
  { src: formanceUrl, imageDesc: 'formance logo' },
  { src: salesforceUrl, imageDesc: 'salesforce logo' },
  { src: rattleUrl, imageDesc: 'rattle logo' },
  { src: sarvamUrl, imageDesc: 'sarvam logo' },
  { src: gokiwiUrl, imageDesc: 'GoKiwi logo' },
  { src: lovartUrl, imageDesc: 'lovart logo' },
  { src: blaxelUrl, imageDesc: 'blaxel logo' },
  { src: shapedUrl, imageDesc: 'shaped logo' },
]

export const TrustedByTeams = ({ page, className }: { page?: string; className?: string }) => {
  const customerStoriesId = `btn-customer-stories-${page}-hero`

  return (
    <section
      className={cn(
        'm-0 mx-auto grid w-full justify-items-stretch border !border-b-0 border-dashed border-signoz_slate-400 py-6 md:w-[80vw]',
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
            <Image
              key={`${idx}-${company.imageDesc}`}
              src={company.src}
              alt={company.imageDesc}
              width={120}
              height={40}
              className="h-[40px] w-[100px] object-contain md:h-[40px] md:w-[120px]"
            />
          ))}
        </div>
        <div
          className={`${page === 'enterprise' ? '' : "wavy-line relative mx-[-1rem] after:absolute after:top-[50%] after:h-0 after:w-full after:bg-transparent after:content-['']"}`}
        >
          <div className="mb-5 flex flex-col items-center text-center">
            <TrackingLink
              href="/case-study/"
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
