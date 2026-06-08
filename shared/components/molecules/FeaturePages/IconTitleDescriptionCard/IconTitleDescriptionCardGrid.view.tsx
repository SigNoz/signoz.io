import IconTitleDescriptionCard from './IconTitleDescriptionCard.view'
import { IconTitleDescriptionCardGridProps } from './IconTitleDescriptionCardGrid.types'
import { cn } from 'app/lib/utils'
import Divider from '../Divider'

const IconTitleDescriptionCardGrid: React.FC<IconTitleDescriptionCardGridProps> = ({
  cards,
  className = '',
  variant = 'lg',
}) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2', className)}>
      {cards.map((card, index) => {
        const isLast = index === cards.length - 1
        const lastDesktopRowStart = Math.floor((cards.length - 1) / 2) * 2
        const isLastDesktopRow = index >= lastDesktopRowStart
        const isLeftDesktopColumn = index % 2 === 0

        return (
          <div key={index} className="relative h-full">
            <IconTitleDescriptionCard
              icon={card.icon}
              iconText={card.iconText || ''}
              title={card.title}
              description={card.description}
              className={card.className}
              variant={variant}
            />
            {!isLast && <Divider className="absolute bottom-0 left-0 md:hidden" />}
            {!isLastDesktopRow && <Divider className="absolute bottom-0 left-0 hidden md:block" />}
            {isLeftDesktopColumn && index + 1 < cards.length && (
              <Divider orientation="vertical" className="absolute right-0 top-0 hidden md:block" />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default IconTitleDescriptionCardGrid
