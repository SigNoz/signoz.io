import * as React from 'react'
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'

import { cn } from 'app/lib/utils'

// -----------------------------------------------------------------------------
// Variants
// -----------------------------------------------------------------------------
// Inspired by shadcn/ui default button implementation with custom SigNoz palette
export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ring-offset-background',
  {
    variants: {
      variant: {
        default:
          'bg-signoz_robin-500 text-white hover:bg-signoz_robin-600 active:bg-signoz_robin-700',
        outline:
          'border border-signoz_robin-500 bg-transparent text-signoz_robin-500 hover:bg-signoz_robin-500/10',
        secondary: 'bg-signoz_ink-400 button-background text-signoz_vanilla-300 hover:bg-signoz_ink-300', // TODO: the bg color doesn't match any variable in tailwind, check design guidelines
        tertiary: 'bg-signoz_vanilla-200 text-signoz_ink-200 hover:bg-signoz_vanilla-300',
        ghost: 'bg-transparent hover:bg-signoz_ink-400',
        link: 'text-signoz_robin-500',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
      rounded: {
        default: 'rounded-md',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  },
)

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /**
   * When true, uses radix Slot to render children as the underlying element.
   * Useful when wrapping with Link, etc.
   */
  asChild?: boolean
  /**
   * Provide an href to render the button as a Link (anchor tag).
   */
  href?: string
  /**
   * Legacy prop from the previous implementation. When `false`, behaviour
   * matched an inline link. Retained for backwards-compatibility and
   * automatically mapped to the `link` variant.
   */
  isButton?: boolean
  /**
   * Legacy prop that mapped to an outlined button. Overrides `variant`
   * when supplied.
   */
  outlined?: boolean
  /**
   * Legacy prop that accepted a `to` attribute for internal navigation.
   * If provided (and `href` is not), it will be used as the destination.
   */
  to?: string
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      href,
      to = '/',
      isButton = false,
      outlined = false,
      rounded,
      ...props
    },
    ref,
  ) => {
    // -------------------------------------------------------------------------
    // Legacy prop mapping
    // -------------------------------------------------------------------------
    let mappedVariant: VariantProps<typeof buttonVariants>['variant'] = variant
    if (outlined) mappedVariant = 'outline'
    if (!isButton && !variant) mappedVariant = 'link'

    // Decide which element to render
    const Comp: any = asChild ? Slot : href || (!isButton && to) ? Link : 'button'

    const extraProps: Record<string, unknown> = {}
    if (Comp === Link) {
      extraProps.href = href ?? to
      // open external links in new tab
      if (href) {
        extraProps.rel = 'noopener noreferrer nofollow'
        extraProps.target = '_blank'
      }
    }

    return (
      <Comp
        ref={!asChild ? (ref as any) : undefined}
        className={cn(buttonVariants({ variant: mappedVariant, size, rounded }), className)}
        {...extraProps}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button }

export default Button
