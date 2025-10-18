import { FeatureCardProps } from "./FeatureCard.types"

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  variant = 'default',
  className = '' 
}) => {
  const borderClass = variant === 'combined' ? 'border-none' : 'border-r max-md:border-l border-signoz_slate-400 border-dashed last:border-r-0'
  
  return (
    <div className={`p-0 ${borderClass} bg-transparent ${className}`}>
      <div className="p-8">
        <div className="grid grid-cols-1 gap-4">
          <div className="">{icon}</div>
          <h3 className="text-xl font-semibold text-signoz_vanilla-100 m-0">{title}</h3>
        </div>
        <p className="mt-2 mb-0 text-sm text-signoz_vanilla-400">{description}</p>
      </div>
    </div>
  )
}

export default FeatureCard