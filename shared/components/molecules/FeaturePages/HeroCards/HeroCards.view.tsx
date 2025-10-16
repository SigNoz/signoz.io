import SectionLayout from "../SectionLayout"
import GridLayout from "../GridLayout"
import FeatureCard from "../FeatureCard"
import { SectionLayoutProps } from "../SectionLayout"

const HeroCards: React.FC<{ cards: { icon: React.ReactNode, title: string, description: string }[]; variant?: 'default' | 'combined'; layoutVariant?: SectionLayoutProps['variant'] }> = ({ 
  cards, 
  variant = 'default',
  layoutVariant = 'border-x' as SectionLayoutProps['variant']
}) => {
  return (
    <SectionLayout variant={layoutVariant} className="max-md:mt-8 p-0">
      <GridLayout cols={3}>
        {cards.map((card, index) => (
          <FeatureCard 
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            variant={variant}
          />
        ))}
      </GridLayout>
    </SectionLayout>
  )
}

export default HeroCards