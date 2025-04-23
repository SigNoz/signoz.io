'use client'

import { Button } from '@headlessui/react'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { useLogEvent } from 'hooks/useLogEvent'

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
