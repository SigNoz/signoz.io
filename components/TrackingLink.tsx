'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { trackClick } from '../utils/analytics'

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
}

// Define a type for the props we'll pass to Link
interface LinkPropsType {
  href: string
  onClick: () => void
  className?: string
  target?: string
  rel?: string
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
}: TrackingLinkProps) {
  const pathname = usePathname()
  
  const handleClick = () => {
    // Track the click event with the explicitly provided clickText
    trackClick(
      clickType,
      clickName,
      clickText,
      clickLocation,
      pathname || ''
    )
    
    // Call the original onClick handler if provided
    if (onClick) {
      onClick()
    }
  }
  
  // Create an object with the required props and explicitly type it
  const linkProps: LinkPropsType = {
    href,
    onClick: handleClick,
  };
  
  if (className) {
    linkProps.className = className;
  }
  
  if (target) {
    linkProps.target = target;
  }
  
  if (rel) {
    linkProps.rel = rel;
  }
  
  return (
    <Link {...linkProps}>
      {children}
    </Link>
  )
} 