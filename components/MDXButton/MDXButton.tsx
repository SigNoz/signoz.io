import React from 'react'
import TrackingLink from '../TrackingLink'
import Button from '../Button/Button'

interface MDXButtonProps {
  href: string
  clickType?: string
  clickName?: string
  clickLocation?: string
  clickText?: string
  children: React.ReactNode
  className?: string
}

const MDXButton = ({
  href,
  clickType = 'CTA Click',
  clickName,
  clickLocation,
  clickText,
  children,
  className = 'inline-block no-underline',
}: MDXButtonProps) => {
  return (
    <div className="mt-6 self-center">
      <TrackingLink
        href={href}
        clickType={clickType}
        clickName={clickName || String(children)}
        clickLocation={clickLocation || ''}
        clickText={clickText || String(children)}
        className={className}
      >
        <Button>
          <span className="flex items-center gap-2">
            {children}
            &rarr;
          </span>
        </Button>
      </TrackingLink>
    </div>
  )
}

export default MDXButton
