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
        return '!mx-auto'
      case 'bordered':
        return '!mx-auto border border-dashed !border-b-0 !border-t-0 border-signoz_slate-400'
      case 'no-border':
        return '!mx-auto !w-[90vw]'
      case 'border-x':
        return '!mx-auto !w-[90vw] border border-dashed border-signoz_slate-400'
      default:
        return '!mx-auto border border-dashed !border-b-0 !border-t-0 border-signoz_slate-400'
    }
  }

  const backgroundClass = withBackground ? 'bg-signoz_ink-500' : ''

  return (
    <div
      className={cn('w-full px-4', getVariantClasses(), backgroundClass, className, 'max-w-8xl')}
    >
      {children}
    </div>
  )
}

export default SectionLayout
