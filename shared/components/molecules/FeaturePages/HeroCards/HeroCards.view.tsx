import SectionLayout from '../SectionLayout'
import GridLayout from '../GridLayout'
import FeatureCard from '../FeatureCard'
import Divider from '../Divider'
import { SectionLayoutProps } from '../SectionLayout'

const HeroCards: React.FC<{
  cards: {
    icon?: React.ReactNode
    title: string | React.ReactNode
    description: string | React.ReactNode
  }[]
  variant?: 'default' | 'combined'
  layoutVariant?: SectionLayoutProps['variant']
  cols?: number
  className?: string
}> = ({
  cards,
  variant = 'default',
  layoutVariant = 'border-x' as SectionLayoutProps['variant'],
  cols = 3,
  className = '',
}) => {
  return (
    <SectionLayout variant={layoutVariant} className={`p-0 max-md:mt-8 ${className}`}>
      <GridLayout cols={cols}>
        {cards.map((card, index) => (
          <div key={index} className="relative">
            <FeatureCard icon={card.icon} title={card.title} description={card.description} />
            {variant !== 'combined' && index < cards.length - 1 && (index + 1) % cols !== 0 && (
              <Divider orientation="vertical" className="absolute right-0 top-0 hidden md:block" />
            )}
          </div>
        ))}
      </GridLayout>
    </SectionLayout>
  )
}

export default HeroCards
