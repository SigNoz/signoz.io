import { GridLayoutProps } from "./GridLayout.types"

const GridLayout: React.FC<GridLayoutProps> = ({ 
  children, 
  cols = 3, 
  className = '', 
  variant = 'default' 
}) => {
  const getGridClasses = () => {
    const baseClasses = 'grid'
    
    switch (variant) {
      case 'equal':
        return `${baseClasses} grid-cols-1 md:grid-cols-${cols}`
      case 'split':
        return `${baseClasses} grid-cols-1 lg:grid-cols-2`
      default:
        return `${baseClasses} grid-cols-1 md:grid-cols-${cols}`
    }
  }

  return (
    <div className={`${getGridClasses()} ${className}`}>
      {children}
    </div>
  )
}

export default GridLayout