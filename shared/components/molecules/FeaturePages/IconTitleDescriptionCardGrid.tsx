import React from 'react'
import IconTitleDescriptionCard from './IconTitleDescriptionCard'

export type IconTitleDescriptionCardData = {
  icon: React.ReactNode
  iconText: string
  title: string
  description: string
}

type IconTitleDescriptionCardGridProps = {
  cards: IconTitleDescriptionCardData[]
  className?: string
}

const IconTitleDescriptionCardGrid: React.FC<IconTitleDescriptionCardGridProps> = ({
  cards,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${className}`}>
      {cards.map((card, index) => (
        <IconTitleDescriptionCard
          key={index}
          icon={card.icon}
          iconText={card.iconText}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  )
}

export default IconTitleDescriptionCardGrid
