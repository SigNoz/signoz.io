import { FeatureCardProps } from './FeatureCard.types'
import { cn } from 'app/lib/utils'

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className = '' }) => {
  return (
    <div className={cn('bg-transparent p-0', className)}>
      <div className="p-8">
        <div className="grid grid-cols-1 gap-8">
          <div className="">{icon}</div>
          <h3 className="text-l1-foreground m-0 text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-muted-foreground mt-2 mb-0 text-sm">{description}</p>
      </div>
    </div>
  )
}

export default FeatureCard
