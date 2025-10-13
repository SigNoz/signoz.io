import { SectionLayoutProps } from "./SectionLayout.types"

const SectionLayout: React.FC<SectionLayoutProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  withBackground = false
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'full-width':
        return '!mx-auto !w-[100vw] md:!w-[80vw]'
      case 'bordered':
        return '!mx-auto !w-[100vw] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:!w-[80vw]'
      case 'no-border':
        return '!mx-auto !w-[90vw] border !border-b-0 !border-t-0 border-none border-signoz_slate-400 md:!w-[80vw]'
      case 'border-x':
        return '!mx-auto !w-[90vw] border border-b-1 border-t-1 border-dashed border-signoz_slate-400 md:!w-[80vw]'
      default:
        return '!mx-auto !w-[100vw] border !border-b-0 border-dashed border-signoz_slate-400 md:!w-[80vw]'
    }
  }

  const backgroundClass = withBackground ? 'bg-signoz_ink-500' : ''

  return (
    <div className={`section-container ${getVariantClasses()} ${backgroundClass} ${className}`}>
      {children}
    </div>
  )
}

export default SectionLayout