import { Button } from '@headlessui/react'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { trackClick } from '../utils/analytics'

interface TrackingButtonProps {
  children: ReactNode
  clickType: string
  clickName: string
  clickLocation: string
  clickText?: string
  className?: string
  onClick?: () => void
  // Additional button props
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  id?: string
}

/**
 * A wrapper around Button component that tracks clicks using Mixpanel
 */
export default function TrackingButton({
  children,
  clickType,
  clickName,
  clickLocation,
  clickText,
  className,
  onClick,
  type = 'button',
  disabled,
  id,
  ...rest
}: TrackingButtonProps) {
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
  
  return (
    <Button
      className={className}
      onClick={handleClick}
      type={type}
      disabled={disabled}
      id={id}
      {...rest}
    >
      {children}
    </Button>
  )
} 