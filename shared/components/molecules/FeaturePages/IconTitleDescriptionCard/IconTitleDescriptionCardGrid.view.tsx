import IconTitleDescriptionCard from './IconTitleDescriptionCard.view'
import { IconTitleDescriptionCardGridProps } from './IconTitleDescriptionCardGrid.types'

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
