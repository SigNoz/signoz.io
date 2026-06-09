import ButtonGroup from '../ButtonGroup'
import { cn } from 'app/lib/utils'
import { CTABannerProps } from './CTABanner.types'

const CTABanner: React.FC<CTABannerProps> = ({ title, buttons, className }) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center bg-signoz_ink-500 p-6 py-20',
        className
      )}
    >
      <h2 className="mb-6 text-center text-4xl text-signoz_vanilla-100">{title}</h2>
      <ButtonGroup buttons={buttons} />
    </div>
  )
}

export default CTABanner
