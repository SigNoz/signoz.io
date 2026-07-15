import ButtonGroup from '../ButtonGroup'
import { cn } from 'app/lib/utils'
import { CTABannerProps } from './CTABanner.types'

const CTABanner: React.FC<CTABannerProps> = ({ title, buttons, className }) => {
  return (
    <div
      className={cn('bg-background flex flex-col items-center justify-center p-6 py-20', className)}
    >
      <h2 className="text-l1-foreground mb-6 text-center text-4xl">{title}</h2>
      <ButtonGroup buttons={buttons} />
    </div>
  )
}

export default CTABanner
