import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "app/lib/utils"

export const cardVariants = cva("relative", {
  variants: {
    variant: {
      default: "",
      gradient: "shadow-[-4px_0_20px_rgba(78,116,248,0.3),5px_0_20px_rgba(229,72,77,0.2)]",
      amber: "shadow-[0_0_40px_rgba(255,205,86,0.3),0_0_80px_rgba(213,170,69,0.2)]",
      primary: "shadow-[0_0_40px_rgba(78,116,248,0.3),0_0_80px_rgba(63,94,204,0.2)]",
      cherry: "shadow-[0_0_40px_rgba(229,72,77,0.3),0_0_80px_rgba(184,58,62,0.2)]",
      aqua: "shadow-[0_0_20px_rgba(78,116,248,0.2)]",
      sakura: "shadow-[0_0_40px_rgba(242,71,105,0.3),0_0_80px_rgba(197,57,85,0.2)]",
      forest: "shadow-[0_0_40px_rgba(37,225,146,0.3),0_0_80px_rgba(30,180,117,0.2)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})  
export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div
        className={cn('bg-signoz_ink-400', cardVariants({ variant }), className)}
        ref={ref}
        {...props}
      >
        <div className="relative rounded-md border-2 border-dashed border-signoz_slate-200/50 h-full">
          {children}
        </div>
      </div>
    )
  },
)

Card.displayName = "Card"

export { Card }
