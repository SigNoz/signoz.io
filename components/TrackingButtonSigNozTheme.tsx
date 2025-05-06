'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Button from './Button/Button'
import { useLogEvent } from 'hooks/useLogEvent'

// Use Button's types
const BUTTON_TYPES = Button.TYPES

interface TrackingButtonSigNozThemeProps {
  children: React.ReactNode
  clickType: string
  clickName: string
  clickLocation: string
  clickText: string
  className?: string
  type?: (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES]
  onClick?: () => void
  id?: string
  [key: string]: any
}

const TYPE_TO_STYLES_MAP = {
  [BUTTON_TYPES.PRIMARY]:
    'h-10 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 bg-signoz_robin-500 text-center font-medium leading-5 text-white no-underline outline-none hover:text-white',
  [BUTTON_TYPES.SECONDARY]:
    'h-10 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 button-background text-center font-medium leading-5 text-white no-underline outline-none hover:text-white',
}

/**
 * A themed tracking button component that uses SigNoz button styles with tracking capabilities
 */
export default function TrackingButtonSigNozTheme({
  children,
  clickType,
  clickName,
  clickLocation,
  clickText,
  className = '',
  type = BUTTON_TYPES.PRIMARY,
  onClick,
  id,
  ...rest
}: TrackingButtonSigNozThemeProps) {
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

  const style = `${TYPE_TO_STYLES_MAP[type]} ${className}`

  return (
    <button className={style} onClick={handleClick} id={id} {...rest}>
      {children}
    </button>
  )
}
