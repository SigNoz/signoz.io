import React from 'react'
import { Button } from '@signozhq/ui/button'
import TrackingLink from '../TrackingLink'

interface MDXButtonProps {
  href: string
  clickType?: string
  clickName?: string
  clickLocation?: string
  clickText?: string
  children: React.ReactNode
  className?: string
  type?: string
}

const MDXButton = ({
  href,
  clickType = 'Primary CTA',
  clickName,
  clickLocation,
  clickText,
  children,
  type = 'primary',
  className = 'inline-block no-underline',
}: MDXButtonProps) => {
  return (
    <div className="mt-6 self-center">
      <Button asChild variant="solid" color={type === 'primary' ? 'primary' : 'secondary'}>
        <TrackingLink
          href={href}
          clickType={clickType}
          clickName={clickName || String(children)}
          clickLocation={clickLocation || ''}
          clickText={clickText || String(children)}
          className={className}
        >
          <span className="flex items-center gap-2">
            {children}
            &rarr;
          </span>
        </TrackingLink>
      </Button>
    </div>
  )
}

export default MDXButton
