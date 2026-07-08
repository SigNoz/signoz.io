import { IconTitleDescriptionCardProps } from './IconTitleDescriptionCard.types'

const VARIANT_STYLES = {
  lg: {
    gap: 'gap-4',
    heading: 'text-base',
  },
  xl: {
    gap: 'gap-3',
    heading: 'text-xl',
  },
} as const

const IconTitleDescriptionCard: React.FC<IconTitleDescriptionCardProps> = ({
  icon,
  iconText,
  title,
  description,
  className = '',
  variant = 'lg',
  titleLevel = 'h4',
}) => {
  const Heading = titleLevel
  const styles = VARIANT_STYLES[variant]

  return (
    <div
      className={`relative flex h-full w-full flex-col items-start ${styles.gap} px-8 py-6 ${className}`}
    >
      <div className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.05rem] text-signoz_vanilla-400">
        {icon && (
          <span className="flex h-5 w-5 items-center justify-center text-signoz_vanilla-100">
            {icon}
          </span>
        )}
        {iconText && <span>{iconText}</span>}
      </div>

      {title && (
        <Heading
          className={`m-0 text-left font-semibold text-signoz_vanilla-100 ${styles.heading}`}
        >
          {title}
        </Heading>
      )}

      {description && (
        <div className="m-0 w-full text-left text-sm text-signoz_vanilla-400">{description}</div>
      )}
    </div>
  )
}

export default IconTitleDescriptionCard
