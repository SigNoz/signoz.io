import * as React from 'react'
import Link from '@/components/Link'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { ArrowUpRight } from 'lucide-react'

import { cn } from 'app/lib/utils'

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
/**
 * @deprecated Prefer the `variant` prop for new code.
 */
export enum BUTTON_TYPES {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
}

const LEGACY_TYPE_TO_STYLES_MAP = {
  [BUTTON_TYPES.PRIMARY]:
    'h-10 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 bg-signoz_robin-500 text-center font-medium leading-5 text-white no-underline outline-none hover:text-white',
  [BUTTON_TYPES.SECONDARY]:
    'h-10 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 button-background text-center font-medium leading-5 text-white no-underline outline-none hover:text-white',
}

type ButtonElementType = React.ElementType
type ButtonHtmlType = 'button' | 'submit' | 'reset'
type LegacyButtonType = (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES]

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    VariantProps<typeof buttonVariants> {
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
  /**
   * Legacy primary/secondary button variant or native HTML button type.
   */
  type?: ButtonHtmlType | LegacyButtonType
  /**
   * Opt-in split icon treatment used by the homepage redesign CTAs.
   */
  withIcon?: boolean
}

type ButtonComponent = React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
> & {
  TYPES: typeof BUTTON_TYPES
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
      as,
      asChild = false,
      href,
      to,
      isButton = false,
      outlined = false,
      rounded,
      children,
      type,
      withIcon = false,
      ...props
    },
    ref
  ) => {
    // -------------------------------------------------------------------------
    // Legacy prop mapping
    // -------------------------------------------------------------------------
    const legacyButtonClassName =
      type === BUTTON_TYPES.PRIMARY
        ? LEGACY_TYPE_TO_STYLES_MAP[BUTTON_TYPES.PRIMARY]
        : type === BUTTON_TYPES.SECONDARY
          ? LEGACY_TYPE_TO_STYLES_MAP[BUTTON_TYPES.SECONDARY]
          : undefined
    const hasLegacyButtonType = Boolean(legacyButtonClassName)

    let mappedVariant: VariantProps<typeof buttonVariants>['variant'] = variant
    if (outlined) mappedVariant = 'outline'
    if (type === BUTTON_TYPES.PRIMARY) mappedVariant = 'default'
    if (type === BUTTON_TYPES.SECONDARY) mappedVariant = 'secondary'
    if (!mappedVariant && !isButton && !hasLegacyButtonType) mappedVariant = 'link'
    if (!mappedVariant) mappedVariant = 'default'
    const mappedRounded = rounded ?? (hasLegacyButtonType ? 'full' : undefined)

    // Decide which element to render
    const shouldRenderLink = Boolean(href || (!isButton && to))
    const Comp: any = asChild ? Slot : as || (shouldRenderLink ? Link : 'button')

    const extraProps: Record<string, unknown> = {}
    if (Comp === Link) {
      extraProps.href = href ?? to
      if (href && /^https?:\/\//.test(href)) {
        extraProps.target = '_blank'
        extraProps.rel = 'noopener noreferrer'
      }
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
        ? 'homepage-button homepage-button--primary'
        : mappedVariant === 'secondary'
          ? 'homepage-button homepage-button--secondary'
          : ''
    const shouldRenderSplitIcon = withIcon && Boolean(splitIconClass) && !asChild
    const resolvedClassName = hasLegacyButtonType
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
            <span className="homepage-button__label flex min-w-0 items-center justify-center gap-1.5">
              {children}
            </span>
            <span
              className={`homepage-button__icon hidden ${
                mappedVariant === 'default'
                  ? 'homepage-button__icon--primary'
                  : 'homepage-button__icon--secondary'
              }`}
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

Button.TYPES = BUTTON_TYPES

export { Button }

export default Button
