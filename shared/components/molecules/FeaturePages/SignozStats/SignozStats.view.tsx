import SectionLayout from '../SectionLayout/SectionLayout.view'
import { BookOpen } from 'lucide-react'
import ButtonGroup from '../ButtonGroup/ButtonGroup.view'
import StatsCard from '@/components/Card/card'

const SigNozStats: React.FC = () => {
  const STATS_LIST = [
    {
      id: 1,
      logo: '/img/index_features/download.svg',
      name: 'OSS Downloads',
      value: '10 million+',
    },
    {
      id: 2,
      logo: '/img/index_features/github.svg',
      name: 'GitHub Stars',
      value: '24k+',
    },
  ]

  const PlatformCard: React.FC<{ title: string; description: string }> = ({
    title,
    description,
  }) => (
    <div className="rounded-md border border-signoz_slate-500 bg-signoz_ink-400 p-4">
      <h3 className="mb-2 text-base font-medium text-signoz_vanilla-100">{title}</h3>
      <p className="mb-0 text-sm font-normal text-signoz_vanilla-400">{description}</p>
    </div>
  )

  const platformFeatures = [
    {
      title: 'Cloud',
      description:
        'Fully managed, SOC 2-compliant, ideal for teams who want to start quickly without managing infrastructure.',
    },
    {
      title: 'Self-Host',
      description:
        'For tighter security & data residency requirements. It is Apache 2.0 open source, built on open standards.',
    },
  ]

  const communityButtons = [
    {
      text: 'Join the community',
      href: 'https://signoz.io/slack/',
      variant: 'default' as const,
      icon: <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />,
    },
    {
      text: 'GitHub Repository',
      href: 'https://github.com/SigNoz/signoz/',
      variant: 'secondary' as const,
      icon: <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />,
    },
  ]

  return (
    <section>
      <SectionLayout variant="bordered" className="flex flex-col !px-0 sm:flex-row">
        <div className="!w-[300px] flex-1 border !border-b-1 !border-l-0 !border-r-0 border-dashed border-signoz_slate-400">
          <p className="pl-12 pt-10 text-left text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px]">
            Developers <br />
            Love
            <br />
            SigNoz
          </p>
        </div>

        <div className="flex flex-[2_2_0%] flex-col">
          <div className="border-b border-l border-dashed border-signoz_slate-400 bg-transparent p-0">
            <div className="p-6">
              <div className="flex w-full flex-col gap-4">
                {platformFeatures.map((feature, index) => (
                  <PlatformCard
                    key={index}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 text-left sm:grid-cols-2 [&>div]:!border-r-1 [&>div]:border-l-0 [&>div]:border-signoz_slate-400">
              {STATS_LIST.map((stat, index) => (
                <StatsCard
                  logo={stat.logo}
                  stats={stat.value}
                  description={stat.name}
                  logoSize={24}
                  key={index}
                />
              ))}
            </div>
            <div className="border-t border-dashed border-signoz_slate-400 py-6 sm:py-6 sm:pl-10">
              <ButtonGroup buttons={communityButtons} className="flex-col gap-3 sm:flex-row" />
            </div>
          </div>
        </div>
      </SectionLayout>
    </section>
  )
}

export default SigNozStats
