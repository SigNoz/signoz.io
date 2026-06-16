'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { useLogEvent } from 'hooks/useLogEvent'
import Button, { ButtonProps } from '@/components/ui/Button'

interface TrackingButtonProps extends Omit<ButtonProps, 'onClick'> {
  children: ReactNode
  clickType: string
  clickName: string
  clickLocation: string
  clickText: string
  onClick?: () => void
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
  title,
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
      isButton
      className={className}
      onClick={handleClick}
      type={type}
      disabled={disabled}
      id={id}
      title={title}
      {...rest}
    >
      {children}
    </Button>
  )
}
