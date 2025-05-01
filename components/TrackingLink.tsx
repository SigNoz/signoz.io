'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { useLogEvent } from 'hooks/useLogEvent'

interface TrackingLinkProps {
  href: string
  children: ReactNode
  clickType: string
  clickName: string
  clickLocation: string
  clickText: string
  className?: string
  onClick?: () => void
  target?: string
  rel?: string
  style?: React.CSSProperties
  // Optional experiment tracking props
  experimentId?: string
  variantId?: string
  [key: string]: any
}

// Define a type for the props we'll pass to Link
interface LinkPropsType {
  href: string
  onClick: () => void
  className?: string
  target?: string
  rel?: string
  style?: React.CSSProperties
  [key: string]: any
}

/**
 * A wrapper around Next.js Link component that tracks clicks using Mixpanel
 * Includes experiment data in the click event when experiment props are provided
 */
export default function TrackingLink({
  href,
  children,
  clickType,
  clickName,
  clickLocation,
  clickText,
  className,
  onClick,
  target,
  rel,
  style,
  experimentId,
  variantId,
  ...rest
}: TrackingLinkProps) {
  const pathname = usePathname()
  const logEvent = useLogEvent()

  const handleClick = () => {
    // Create event attributes object with click data
    const eventAttributes: Record<string, any> = {
      clickType,
      clickName,
      clickLocation,
      clickText,
      pageLocation: pathname,
    }

    // Add experiment data to click event if available
    if (experimentId && variantId) {
      eventAttributes.experiment_id = experimentId
      eventAttributes.variant_id = variantId
      eventAttributes.button_type = clickType
      // Flag this as a conversion event
      eventAttributes.is_experiment_conversion = true
    }

    // Log a single unified event
    logEvent({
      eventName: 'Website Click',
      eventType: 'track',
      attributes: eventAttributes,
    })

    // Call the original onClick handler if provided
    if (onClick) {
      onClick()
    }
  }

  // Create an object with the required props and explicitly type it
  const linkProps: LinkPropsType = {
    href,
    onClick: handleClick,
    ...rest,
  }

  if (className) {
    linkProps.className = className
  }

  if (target) {
    linkProps.target = target
  }

  if (rel) {
    linkProps.rel = rel
  }

  if (style) {
    linkProps.style = style
  }

  return <Link {...linkProps}>{children}</Link>
}
