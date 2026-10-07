import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import { ArrowRight } from 'lucide-react'
import { ButtonGroupProps } from './ButtonGroup.types'

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 md:flex-row ${className}`}>
      {buttons.map((button, index) =>
        button.tracking ? (
          <Button
            key={`${button.text}-${index}`}
            asChild
            variant={button.variant}
            size={button.size}
            className={`flex !w-fit items-center ${button.className || ''}`}
          >
            <TrackingLink
              href={button.href}
              clickType={button.tracking.clickType}
              clickName={button.tracking.clickName || `${button.text} Button`}
              clickLocation={button.tracking.clickLocation || 'Feature Page Button Group'}
              clickText={button.tracking.clickText || button.text}
            >
              {button.text}
              {button.icon || <ArrowRight size={14} />}
            </TrackingLink>
          </Button>
        ) : (
          <Button
            key={`${button.text}-${index}`}
            href={button.href}
            variant={button.variant}
            size={button.size}
            className={`flex !w-fit items-center ${button.className || ''}`}
          >
            {button.text}
            {button.icon || <ArrowRight size={14} />}
          </Button>
        )
      )}
    </div>
  )
}

export default ButtonGroup
