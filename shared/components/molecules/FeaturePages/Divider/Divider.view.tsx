import { cn } from 'app/lib/utils'
import { DividerProps } from './Divider.types'

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'dashed',
  className,
}) => {
  return (
    <div
      role="separator"
      className={cn(
        'border-signoz_slate-400',
        variant === 'dashed' ? 'border-dashed' : 'border-solid',
        orientation === 'horizontal' ? 'w-full border-t' : 'h-full border-l',
        className
      )}
    />
  )
}

export default Divider
