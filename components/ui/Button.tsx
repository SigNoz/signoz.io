import * as React from 'react'
import Link from '@/components/Link'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { ArrowUpRight } from 'lucide-react'

import { cn } from 'app/lib/utils'

import './tactile-button.css'

// -----------------------------------------------------------------------------
// Variants
// -----------------------------------------------------------------------------
// Button variants use the shadcn/ui pattern with custom SigNoz palette tokens.
// Tactile press mechanics: --bh height, --bpd press depth, --bbi bottom inset shadow.
const tactileBase = [
  'btn-tactile-noise relative cursor-pointer select-none border-none leading-none tracking-[-0.005em]',
  '[--bh:32px] [--bpd:1px] [--bbi-rest:-1.5px] [--bbi:var(--bbi-rest)]',
  'active:translate-y-[var(--bpd)] active:[--bbi:-0.5px]',
  'transition-[background-color,box-shadow,transform] duration-100 ease-[ease]',
  'focus-visible:ring-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-background)]',
  '[&_svg]:transition-transform [&_svg]:duration-150 hover:[&_svg]:translate-x-0.5',
  'motion-reduce:transition-[background-color] motion-reduce:active:translate-y-0 motion-reduce:active:[--bbi:var(--bbi-rest)] motion-reduce:[&_svg]:transition-none motion-reduce:hover:[&_svg]:translate-x-0',
].join(' ')

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ring-offset-background',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--accent-primary)] text-[var(--base-white)] hover:bg-[color-mix(in_srgb,var(--accent-primary)_80%,var(--base-black))] active:bg-[color-mix(in_srgb,var(--accent-primary)_65%,var(--base-black))]',
        outline:
          'border border-[var(--accent-primary)] bg-transparent text-[var(--accent-primary)] hover:bg-[color-mix(in_srgb,var(--accent-primary)_10%,transparent)]',
        secondary:
          'bg-[var(--secondary-background)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary-background-hover)]',
        tertiary:
          'bg-[var(--l1-foreground)] text-[var(--l1-background)] hover:bg-[color-mix(in_srgb,var(--l1-foreground)_90%,var(--l1-background))]',
        ghost: 'bg-transparent hover:bg-[var(--ghost-background-hover)]',
        link: 'text-[var(--accent-primary)]',
        tactilePrimary: cn(
          tactileBase,
          'bg-[var(--primary-background)] text-[var(--primary-foreground,var(--bg-base-white))] hover:bg-[var(--bg-robin-600)] hover:text-[var(--primary-foreground,var(--bg-base-white))]',
          'shadow-[inset_0_var(--bbi)_0_color-mix(in_srgb,var(--bg-base-black)_20%,transparent),inset_0_1px_0_color-mix(in_srgb,var(--bg-base-white)_14%,transparent),0_1px_3px_color-mix(in_srgb,var(--primary-background)_28%,transparent),0_0_0_0.5px_color-mix(in_srgb,var(--primary-background)_45%,transparent)]'
        ),
        tactileSecondary: cn(
          tactileBase,
          'bg-[var(--l3-background)] text-[var(--l1-foreground)] hover:bg-[var(--bg-neutral-light-900)] hover:text-[var(--l1-foreground)] dark:hover:bg-[var(--bg-neutral-dark-700)]',
          'shadow-[inset_0_var(--bbi)_0_color-mix(in_srgb,var(--bg-base-black)_18%,transparent),inset_0_1px_0_color-mix(in_srgb,var(--bg-base-white)_10%,transparent),0_1px_2px_color-mix(in_srgb,var(--bg-base-black)_7%,transparent),0_0_0_0.5px_color-mix(in_srgb,var(--bg-base-black)_7%,transparent)]'
        ),
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
    compoundVariants: [
      {
        variant: ['tactilePrimary', 'tactileSecondary'],
        size: 'default',
        class: 'h-[var(--bh)] gap-[7px] rounded-[3px] px-[13px] py-0 text-[13px] font-normal',
      },
      {
        variant: ['tactilePrimary', 'tactileSecondary'],
        size: 'lg',
        class:
          'h-[var(--bh)] gap-2 rounded-[3px] px-5 py-0 text-sm font-medium [--bh:44px] [--bpd:1.5px] [--bbi-rest:-2px]',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  }
)

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
const LEGACY_VARIANT_TO_STYLES_MAP = {
  legacyPrimary:
    'h-10 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 bg-[var(--accent-primary)] text-center font-medium leading-5 !text-[var(--base-white)] !no-underline outline-none hover:!text-[var(--base-white)]',
  legacySecondary:
    'h-10 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 bg-[var(--l2-background)] text-center font-medium leading-5 !text-[var(--l1-foreground)] !no-underline outline-none hover:!text-[var(--l1-foreground)]',
} as const

type ButtonElementType = React.ElementType
type ButtonHtmlType = 'button' | 'submit' | 'reset'
type ButtonVariant = Exclude<VariantProps<typeof buttonVariants>['variant'], null | undefined>
type LegacyButtonVariant = keyof typeof LEGACY_VARIANT_TO_STYLES_MAP
type ButtonStyleVariant = ButtonVariant | LegacyButtonVariant

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    Omit<VariantProps<typeof buttonVariants>, 'variant'> {
  variant?: ButtonStyleVariant
  /**
   * Legacy prop from the previous button implementation. Prefer `asChild` for new code.
   */
  as?: ButtonElementType
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
  type?: ButtonHtmlType
  /**
   * Render only the supplied className. Useful for wrappers that already own
   * their full visual styling.
   */
  unstyled?: boolean
  /**
   * Opt-in split icon treatment used by the homepage redesign CTAs.
   */
  withIcon?: boolean
  tactile?: boolean
}

type ButtonComponent = React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
>

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      as,
      asChild = false,
      href,
      to,
      isButton = false,
      outlined = false,
      rounded,
      children,
      type,
      unstyled = false,
      withIcon = false,
      tactile = false,
      ...props
    },
    ref
  ) => {
    // -------------------------------------------------------------------------
    // Legacy prop mapping
    // -------------------------------------------------------------------------
    const legacyButtonClassName =
      variant === 'legacyPrimary'
        ? LEGACY_VARIANT_TO_STYLES_MAP.legacyPrimary
        : variant === 'legacySecondary'
          ? LEGACY_VARIANT_TO_STYLES_MAP.legacySecondary
          : undefined
    const hasLegacyButtonVariant = Boolean(legacyButtonClassName)

    let mappedVariant: ButtonVariant | undefined =
      variant === 'legacyPrimary'
        ? 'default'
        : variant === 'legacySecondary'
          ? 'secondary'
          : variant
    if (outlined) mappedVariant = 'outline'
    if (!mappedVariant && !isButton && !hasLegacyButtonVariant) mappedVariant = 'link'
    if (!mappedVariant) mappedVariant = 'default'
    if (tactile && mappedVariant === 'default') mappedVariant = 'tactilePrimary'
    if (tactile && mappedVariant === 'secondary') mappedVariant = 'tactileSecondary'
    const mappedRounded = rounded

    // Decide which element to render
    const shouldRenderLink = Boolean(href || (!isButton && to))
    const Comp: any = asChild ? Slot : as || (shouldRenderLink ? Link : 'button')

    const extraProps: Record<string, unknown> = {}
    if (Comp === Link) {
      extraProps.href = href ?? to
    }

    if (Comp === 'button') {
      extraProps.type =
        type === 'button' || type === 'submit' || type === 'reset'
          ? type
          : props.onClick
            ? 'button'
            : undefined
    }

    const splitIconClass =
      mappedVariant === 'default'
        ? 'homepage-button !flex !h-8 !gap-0 !overflow-hidden !rounded !bg-[var(--accent-primary)] !p-0 transition-colors duration-200 hover:!bg-[var(--accent-primary-hover)] active:!bg-[color-mix(in_srgb,var(--accent-primary)_80%,var(--base-black))]'
        : mappedVariant === 'secondary'
          ? 'homepage-button !flex !h-8 !gap-0 !overflow-hidden !rounded !p-0 transition-colors duration-200 hover:!bg-[var(--secondary-background-hover)]'
          : ''
    const shouldRenderSplitIcon = !unstyled && withIcon && Boolean(splitIconClass) && !asChild
    const resolvedClassName = unstyled
      ? className
      : hasLegacyButtonVariant
        ? [legacyButtonClassName, shouldRenderSplitIcon && splitIconClass, className]
            .filter(Boolean)
            .join(' ')
        : cn(
            buttonVariants({ variant: mappedVariant, size, rounded: mappedRounded }),
            shouldRenderSplitIcon && splitIconClass,
            className
          )

    return (
      <Comp
        ref={!asChild ? (ref as any) : undefined}
        className={resolvedClassName}
        {...extraProps}
        {...props}
      >
        {shouldRenderSplitIcon ? (
          <>
            <span
              className={cn(
                'homepage-button__label flex !h-full min-w-0 !flex-1 items-center justify-center gap-1.5 !whitespace-nowrap !px-3',
                mappedVariant === 'default' && '[&_svg:not(.animate-spin)]:hidden'
              )}
            >
              {children}
            </span>
            <span
              className={cn(
                'homepage-button__icon hidden !h-full !w-8 !shrink-0 !items-center !justify-center !rounded !text-[var(--base-white)]',
                mappedVariant === 'default' ? '!flex !bg-[var(--accent-primary-hover)]' : '!flex'
              )}
              aria-hidden="true"
            >
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </span>
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
) as ButtonComponent
Button.displayName = 'Button'

export { Button }

export default Button
