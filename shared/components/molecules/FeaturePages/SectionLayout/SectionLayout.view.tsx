import { SectionLayoutProps } from './SectionLayout.types'
import { cn } from 'app/lib/utils'

const SectionLayout: React.FC<SectionLayoutProps> = ({
  children,
  className = '',
  variant = 'default',
  withBackground = false,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'full-width':
      case 'no-border':
        return '!mx-auto'
      case 'bordered':
        return '!mx-auto border border-dashed !border-b-0 !border-t-0 border-[var(--l2-border)]'
      case 'border-x':
        return '!mx-auto border border-dashed border-[var(--l2-border)]'
      default:
        return '!mx-auto border border-dashed !border-b-0 !border-t-0 border-[var(--l2-border)]'
    }
  }

  const backgroundClass = withBackground ? 'bg-[var(--l1-background)]' : ''

  return (
    <div
      className={cn('w-full px-4', getVariantClasses(), backgroundClass, className, 'max-w-8xl')}
    >
      {children}
    </div>
  )
}

export default SectionLayout
