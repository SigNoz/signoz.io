import * as React from 'react'
import Link from '@/components/Link'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { ArrowUpRight } from 'lucide-react'

import { cn } from 'app/lib/utils'
import { HOMEPAGE_BUTTON_CLASSES } from './homepageButtonClasses'

// -----------------------------------------------------------------------------
// Variants
// -----------------------------------------------------------------------------
// Button variants use the shadcn/ui pattern with custom SigNoz palette tokens.
export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ring-offset-background',
  {
    variants: {
      variant: {
        default:
          'bg-signoz_robin-500 text-white hover:bg-signoz_robin-600 active:bg-signoz_robin-700',
        outline:
          'border border-signoz_robin-500 bg-transparent text-signoz_robin-500 hover:bg-signoz_robin-500/10',
        secondary:
          'bg-signoz_ink-400 button-background text-signoz_vanilla-300 hover:bg-signoz_ink-300', // TODO: the bg color doesn't match any variable in tailwind, check design guidelines
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
  }
)

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
const LEGACY_VARIANT_TO_STYLES_MAP = {
  legacyPrimary:
    'h-10 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 bg-signoz_robin-500 text-center font-medium leading-5 !text-white !no-underline outline-none hover:!text-white',
  legacySecondary:
    'h-10 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 button-background text-center font-medium leading-5 !text-white !no-underline outline-none hover:!text-white',
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
        ? cn(HOMEPAGE_BUTTON_CLASSES.root, HOMEPAGE_BUTTON_CLASSES.primary)
        : mappedVariant === 'secondary'
          ? cn(HOMEPAGE_BUTTON_CLASSES.root, HOMEPAGE_BUTTON_CLASSES.secondary)
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
                HOMEPAGE_BUTTON_CLASSES.label,
                mappedVariant === 'default' && HOMEPAGE_BUTTON_CLASSES.primaryLabel
              )}
            >
              {children}
            </span>
            <span
              className={cn(
                HOMEPAGE_BUTTON_CLASSES.icon,
                mappedVariant === 'default'
                  ? HOMEPAGE_BUTTON_CLASSES.primaryIcon
                  : HOMEPAGE_BUTTON_CLASSES.secondaryIcon
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
