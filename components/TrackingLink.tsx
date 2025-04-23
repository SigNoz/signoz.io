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
  ...rest
}: TrackingLinkProps) {
  const pathname = usePathname()
  const logEvent = useLogEvent()

  const handleClick = () => {
    // Log the click event
    logEvent({
      eventName: 'Website Click',
      eventType: 'track',
      attributes: {
        clickType,
        clickName,
        clickLocation,
        clickText,
        pageLocation: pathname,
      },
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
