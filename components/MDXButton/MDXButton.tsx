import React from 'react'
import TrackingLink from '../TrackingLink'
import Button from '@/components/ui/Button'

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
  const buttonVariant = type === 'primary' ? 'legacyPrimary' : 'legacySecondary'
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
        <Button as="span" variant={buttonVariant}>
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
