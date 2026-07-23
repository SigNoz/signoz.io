import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import { FeatureButtonConfig } from './FeatureButton.types'

const FeatureButton: React.FC<{ button: FeatureButtonConfig; className?: string }> = ({
  button,
  className = 'flex w-fit items-center gap-2',
}) => {
  if (button.tracking) {
    return (
      <Button variant="secondary" rounded="full" className={className} asChild>
        <TrackingLink
          href={button.href}
          clickType={button.tracking.clickType}
          clickName={button.tracking.clickName || `${button.text} Button`}
          clickLocation={button.tracking.clickLocation || 'Feature Page'}
          clickText={button.tracking.clickText || button.text}
        >
          {button.text}
          <ArrowRight size={14} />
        </TrackingLink>
      </Button>
    )
  }

  return (
    <Button variant="secondary" rounded="full" className={className} to={button.href}>
      {button.text}
      <ArrowRight size={14} />
    </Button>
  )
}

export default FeatureButton
