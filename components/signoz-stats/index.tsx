import React from 'react'
import Button from '@/components/Button/Button'
import { cn } from '../../app/lib/utils'
import { ArrowRight, BookOpen, Mail } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'
import DownloadIcon from '@/public/img/index_features/download.svg'
import GithubIcon from '@/public/img/index_features/github.svg'
import ContributionsIcon from '@/public/img/index_features/contributions.svg'
import CommunityIcon from '@/public/img/index_features/community.svg'

const SigNozStats = ({ className }: { className?: string }) => {
  const STATS_LIST = [
    {
      id: 1,
      logo: <DownloadIcon className="h-6 w-6" aria-hidden="true" />,
      name: 'OSS Downloads',
      value: '10 million+',
    },
    {
      id: 2,
      logo: <GithubIcon className="h-6 w-6" aria-hidden="true" />,
      name: 'GitHub Stars',
      value: '25k+',
    },
    {
      id: 3,
      logo: <ContributionsIcon className="h-6 w-6" aria-hidden="true" />,
      name: 'Contributors',
      value: '140+',
    },
    {
      id: 4,
      logo: <CommunityIcon className="h-6 w-6" aria-hidden="true" />,
      name: 'Community Members',
      value: '4.5k+',
    },
  ]
  return (
    <section>
      <div
        className={cn(
          'section-container mx-auto grid w-full grid-cols-1 border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 !px-0 sm:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:w-[80vw]',
          className
        )}
      >
        <div className="min-w-0 border !border-b-0 !border-l-0 !border-r-0 border-dashed border-signoz_slate-400">
          <p className="px-4 pt-4 text-left text-3xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-4xl lg:px-8 lg:pt-10">
            Developers <br className="hidden sm:block" />
            Love <br className="hidden sm:block" />
            SigNoz
          </p>
        </div>

        <div className="grid min-w-0 grid-cols-1 grid-rows-[auto_auto]">
          <div className="grid grid-cols-1 text-left sm:grid-cols-2">
            {STATS_LIST.map((stat) => (
              <div
                key={stat.name}
                className={cn(
                  'col-span-2 border !border-b-0 !border-r-0 border-dashed border-signoz_slate-400 bg-signoz_ink-500 sm:col-span-1',
                  'p-4 xl:p-9'
                )}
              >
                <div className="mb-4 flex items-center">
                  <span className="mr-2.5 h-6 w-6 fill-signoz_vanilla-400">{stat.logo}</span>
                </div>
                <p className="mb-2 block pt-4 font-mono text-[32px] font-semibold leading-10 text-signoz_vanilla-100">
                  {stat.value}
                </p>
                <p className="mb-3 mt-2 text-base font-normal leading-9 text-signoz_vanilla-400">
                  {stat.name}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 border !border-b-0 !border-r-0 border-dashed border-signoz_slate-400 p-6 xl:flex-row">
            <TrackingLink
              href="https://signoz.io/slack/"
              className="inline-block"
              clickType="Primary CTA"
              clickName="Join Community Link"
              clickText="Join the community"
              clickLocation="Stats Section"
              target="_blank"
            >
              <Button className="flex-center text-xs sm:text-sm" id="btn-join-community-homepage">
                <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                Join the community
                <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </Button>
            </TrackingLink>
            <TrackingLink
              href="https://github.com/SigNoz/signoz/"
              className="inline-block"
              clickType="Secondary CTA"
              clickName="GitHub Repository Link"
              clickText="GitHub Repository"
              clickLocation="Stats Section"
              target="_blank"
            >
              <Button
                type={Button.TYPES.SECONDARY}
                className="flex-center text-xs sm:text-sm"
                id="btn-github-repo-homepage"
              >
                <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                GitHub Repository
                <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </Button>
            </TrackingLink>
            <TrackingLink
              href="https://newsletter.signoz.io/?utm_source=signoz_website&utm_medium=homepage&utm_campaign=newsletter"
              className="inline-block"
              clickType="Secondary CTA"
              clickName="Newsletter Link"
              clickText="Read Our Newsletter"
              clickLocation="Stats Section"
              target="_blank"
            >
              <Button
                type={Button.TYPES.SECONDARY}
                className="flex-center text-xs sm:text-sm"
                id="btn-newsletter-homepage"
              >
                <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                Read Our Newsletter
                <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </Button>
            </TrackingLink>
          </div>
        </div>
      </div>
    </section>
  )
}
export default SigNozStats
