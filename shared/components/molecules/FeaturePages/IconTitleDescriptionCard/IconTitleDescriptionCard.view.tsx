import { IconTitleDescriptionCardProps } from './IconTitleDescriptionCard.types'

const IconTitleDescriptionCard: React.FC<IconTitleDescriptionCardProps> = ({
  icon,
  iconText,
  title,
  description,
  className = '',
}) => {
  return (
    <div
      className={`relative flex w-full flex-col items-start gap-4 border border-dashed border-signoz_slate-400/50 px-8 py-6 ${className}`}
    >
      <div className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.05rem] text-signoz_vanilla-400">
        <span className="flex h-5 w-5 items-center justify-center text-signoz_vanilla-100">
          {icon}
        </span>
        <span>{iconText}</span>
      </div>

      <h4 className="m-0 text-left font-semibold text-signoz_vanilla-100">{title}</h4>

      <p className="m-0 text-left text-sm text-signoz_vanilla-400">{description}</p>
    </div>
  )
}

export default IconTitleDescriptionCard
