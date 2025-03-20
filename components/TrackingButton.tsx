import { Button } from '@headlessui/react'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { trackClick } from '../utils/analytics'

interface TrackingButtonProps {
  children: ReactNode
  clickType: string
  clickName: string
  clickLocation: string
  clickText: string
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