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
  clickText?: string
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
    // Try to extract text content from children if clickText is not provided
    let textToTrack = clickText;
    
    if (!textToTrack) {
      // If children is a string, use it directly
      if (typeof children === 'string') {
        textToTrack = children;
      } 
      // If it's a simple element with only text content, try to extract that
      else if (
        typeof children === 'object' && 
        children !== null && 
        'props' in children && 
        typeof children.props.children === 'string'
      ) {
        textToTrack = children.props.children;
      }
      // Fall back to clickName if we couldn't extract text
      else {
        textToTrack = clickName;
      }
    }
    
    // Track the click event
    trackClick(
      clickType,
      clickName,
      textToTrack || '',
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