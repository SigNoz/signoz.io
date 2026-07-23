import SectionLayout from '../SectionLayout/SectionLayout.view'
import { BookOpen, Mail } from 'lucide-react'
import ButtonGroup from '../ButtonGroup/ButtonGroup.view'
import StatsCard from '@/components/Card/card'

const SigNozStats = () => {
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
      value: '25k+',
    },
  ]

  const PlatformCard: React.FC<{ title: string; description: string }> = ({
    title,
    description,
  }) => (
    <div className="border-border bg-card rounded-md border p-4">
      <h3 className="text-l1-foreground mb-2 text-base font-medium">{title}</h3>
      <p className="text-muted-foreground mb-0 text-sm font-normal">{description}</p>
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
    {
      text: 'Read Our Newsletter',
      href: 'https://newsletter.signoz.io/?utm_source=signoz_website&utm_medium=feature_page&utm_campaign=newsletter',
      variant: 'secondary' as const,
      icon: <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5" />,
    },
  ]

  return (
    <SectionLayout variant="bordered" className="flex flex-col !px-0 md:flex-row">
      <div className="border-border flex-1 border-b border-dashed md:border-b-0">
        <p className="text-l1-foreground pt-10 pl-12 text-left text-4xl !leading-[3.5rem] font-bold sm:text-4xl">
          Developers <br />
          Love
          <br />
          SigNoz
        </p>
      </div>

      <div className="flex min-w-0 flex-[2_2_0%] flex-col">
        <div className="border-border border-l border-dashed bg-transparent p-0">
          <div className="p-10 md:p-6">
            <h2 className="text-l1-foreground text-2xl font-bold">
              Your data stays where you want
            </h2>
            <p className="text-muted-foreground text-base">
              Use SigNoz cloud with your data staying in the US, EU, or India, or self-host.
            </p>
            <div className="flex w-full flex-col gap-4">
              {platformFeatures.map((feature, index) => (
                <PlatformCard key={index} title={feature.title} description={feature.description} />
              ))}
            </div>
          </div>
          <div className="[&>div]:border-border grid grid-cols-1 text-left md:grid-cols-2 [&>div]:!border-r [&>div]:border-l-0">
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
          <div className="border-border border-t border-dashed py-6 md:pl-10">
            <ButtonGroup
              buttons={communityButtons}
              className="flex-col flex-wrap gap-3 sm:flex-row"
            />
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

export default SigNozStats
