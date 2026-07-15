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
      <div className="text-muted-foreground flex items-center gap-1 text-xs font-medium tracking-[0.05rem] uppercase">
        {icon && (
          <span className="text-foreground flex h-5 w-5 items-center justify-center">{icon}</span>
        )}
        {iconText && <span>{iconText}</span>}
      </div>

      {title && (
        <Heading className={`text-l1-foreground m-0 text-left font-semibold ${styles.heading}`}>
          {title}
        </Heading>
      )}

      {description && (
        <div className="text-muted-foreground m-0 w-full text-left text-sm">{description}</div>
      )}
    </div>
  )
}

export default IconTitleDescriptionCard
