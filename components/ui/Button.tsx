import * as React from 'react'
import Link from '@/components/Link'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'

import { cn } from 'app/lib/utils'

import './tactile-button.css'

// -----------------------------------------------------------------------------
// Variants
// -----------------------------------------------------------------------------
// One tactile shell, two fills. Press mechanics: --bh height, --bpd press travel,
// --bbi bottom inset shadow. Each size declares the full set of press vars so no
// two rules ever fight over the same custom property.
const tactileBase = [
  'btn-tactile-noise relative inline-flex cursor-pointer select-none items-center justify-center',
  'whitespace-nowrap rounded-[3px] border-none leading-none tracking-[-0.005em] no-underline',
  '[--bbi:var(--bbi-rest)] active:translate-y-[var(--bpd)] active:[--bbi:-0.5px]',
  'transition-[background-color,box-shadow,transform] duration-100 ease-[ease]',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-background)]',
  'disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-y-0 disabled:active:[--bbi:var(--bbi-rest)]',
  '[&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-150 hover:[&_svg]:translate-x-0.5',
  'motion-reduce:transition-[background-color] motion-reduce:active:translate-y-0 motion-reduce:active:[--bbi:var(--bbi-rest)] motion-reduce:[&_svg]:transition-none motion-reduce:hover:[&_svg]:translate-x-0',
].join(' ')

const primaryFill = cn(
  'bg-[var(--primary-background)] text-[var(--primary-foreground,var(--bg-base-white))] hover:bg-[var(--bg-robin-600)] hover:text-[var(--primary-foreground,var(--bg-base-white))]',
  'shadow-[inset_0_var(--bbi)_0_color-mix(in_srgb,var(--bg-base-black)_20%,transparent),inset_0_1px_0_color-mix(in_srgb,var(--bg-base-white)_14%,transparent),0_1px_3px_color-mix(in_srgb,var(--primary-background)_28%,transparent),0_0_0_0.5px_color-mix(in_srgb,var(--primary-background)_45%,transparent)]'
)

const secondaryFill = cn(
  'bg-[var(--l3-background)] text-[var(--l1-foreground)] hover:bg-[var(--bg-neutral-light-900)] hover:text-[var(--l1-foreground)] dark:hover:bg-[var(--bg-neutral-dark-700)]',
  'shadow-[inset_0_var(--bbi)_0_color-mix(in_srgb,var(--bg-base-black)_18%,transparent),inset_0_1px_0_color-mix(in_srgb,var(--bg-base-white)_10%,transparent),0_1px_2px_color-mix(in_srgb,var(--bg-base-black)_7%,transparent),0_0_0_0.5px_color-mix(in_srgb,var(--bg-base-black)_7%,transparent)]'
)

export const buttonVariants = cva(tactileBase, {
  variants: {
    variant: {
      default: primaryFill,
      secondary: secondaryFill,
      /** @deprecated use `default` */
      tactilePrimary: primaryFill,
      /** @deprecated use `secondary` */
      tactileSecondary: secondaryFill,
    },
    // 32 / 40 / 44. Press travel holds at ~3.1% of height; the bottom inset
    // trails it by ~1.4x. Radius is constant and lives in the base.
    size: {
      sm: 'h-[var(--bh)] gap-[7px] px-[13px] py-0 text-[13px] font-normal [--bh:32px] [--bpd:1px] [--bbi-rest:-1.5px]',
      default:
        'h-[var(--bh)] gap-2 px-4 py-0 text-sm font-medium [--bh:40px] [--bpd:1.25px] [--bbi-rest:-1.75px]',
      lg: 'h-[var(--bh)] gap-2 px-5 py-0 text-sm font-medium [--bh:44px] [--bpd:1.5px] [--bbi-rest:-2px]',
      icon: 'h-[var(--bh)] w-[var(--bh)] gap-0 px-0 py-0 text-sm font-medium [--bh:40px] [--bpd:1.25px] [--bbi-rest:-1.75px]',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
type ButtonHtmlType = 'button' | 'submit' | 'reset'

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    VariantProps<typeof buttonVariants> {
  /** Render the child element instead of a <button>. Use this to wrap TrackingLink. */
  asChild?: boolean
  /** Provide an href to render the button as a Link (anchor tag). */
  href?: string
  type?: ButtonHtmlType
}

type ButtonComponent = React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
>

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, type, children, ...props }, ref) => {
    const Comp: any = asChild ? Slot : href ? Link : 'button'

    const extraProps: Record<string, unknown> = {}
    if (Comp === Link) extraProps.href = href
    if (Comp === 'button') extraProps.type = type ?? 'button'

    return (
      <Comp
        ref={ref as any}
        className={cn(buttonVariants({ variant, size }), className)}
        {...extraProps}
        {...props}
      >
        {children}
      </Comp>
    )
  }
) as ButtonComponent
Button.displayName = 'Button'

export { Button }

export default Button
