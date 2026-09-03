import FeatureButton from '../FeatureButton'
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
  button,
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
      <div className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.05rem] text-[var(--l2-foreground)]">
        {icon && (
          <span className="flex h-5 w-5 items-center justify-center text-[var(--l1-foreground)]">
            {icon}
          </span>
        )}
        {iconText && <span>{iconText}</span>}
      </div>

      {title && (
        <Heading
          className={`m-0 text-left font-semibold text-[var(--l1-foreground)] ${styles.heading}`}
        >
          {title}
        </Heading>
      )}

      {description && (
        <div className="m-0 w-full text-left text-sm text-[var(--l2-foreground)]">
          {description}
        </div>
      )}

      {button && <FeatureButton button={button} className="mt-2 flex w-fit items-center gap-2" />}
    </div>
  )
}

export default IconTitleDescriptionCard
