import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from 'app/lib/utils'

// -----------------------------------------------------------------------------
// Variants
// -----------------------------------------------------------------------------
export const cardVariants = cva('relative overflow-hidden rounded-2xl', {
  variants: {
    variant: {
      default: 'border border-signoz_slate-400 bg-signoz_ink-400',
      gradient: 'border border-signoz_robin-500/30 bg-signoz_ink-400',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const glowClass =
  'absolute inset-0 rounded-2xl bg-gradient-to-r from-signoz_robin-500/20 to-signoz_cherry-500/20 blur-xl'

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Adds the standard SigNoz glow gradient behind the card */
  glow?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, glow = false, children, ...props }, ref) => {
    return (
      <div className={cn('relative', className)} ref={ref} {...props}>
        {glow && <div className={glowClass} />}
        <div className={cn(cardVariants({ variant }))}>{children}</div>
      </div>
    )
  },
)
Card.displayName = 'Card'

export { Card }

export default Card 