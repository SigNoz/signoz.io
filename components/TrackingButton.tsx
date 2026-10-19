'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { useLogEvent } from 'hooks/useLogEvent'
import { buttonVariants } from '@/components/ui/Button'

interface TrackingButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick'
> {
  children: ReactNode
  clickType: string
  clickName: string
  clickLocation: string
  clickText: string
  onClick?: () => void
}

/**
 * A button that tracks clicks using Mixpanel. Styling is the caller's job —
 * pass `buttonVariants({ ... })` if you want the shared button look.
 */
export default function TrackingButton({
  children,
  clickType,
  clickName,
  clickLocation,
  clickText,
  onClick,
  type = 'button',
  ...rest
}: TrackingButtonProps) {
  const pathname = usePathname()
  const logEvent = useLogEvent()

  const handleClick = () => {
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

    if (onClick) {
      onClick()
    }
  }

  return (
    <button onClick={handleClick} type={type} {...rest}>
      {children}
    </button>
  )
}
