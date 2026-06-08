import { FeatureCardProps } from './FeatureCard.types'
import { cn } from 'app/lib/utils'

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className = '' }) => {
  return (
    <div className={cn('bg-transparent p-0', className)}>
      <div className="p-8">
        <div className="grid grid-cols-1 gap-8">
          <div className="">{icon}</div>
          <h3 className="m-0 text-xl font-semibold text-signoz_vanilla-100">{title}</h3>
        </div>
        <p className="mb-0 mt-2 text-sm text-signoz_vanilla-400">{description}</p>
      </div>
    </div>
  )
}

export default FeatureCard
