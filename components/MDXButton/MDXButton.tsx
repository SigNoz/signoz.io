import React from 'react'
import { ArrowRight } from 'lucide-react'
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
  className = 'w-fit',
}: MDXButtonProps) => {
  const buttonVariant = type === 'primary' ? 'default' : 'secondary'
  return (
    <div className="mt-6 self-center">
      <Button asChild variant={buttonVariant} className={className}>
        <TrackingLink
          href={href}
          clickType={clickType}
          clickName={clickName || String(children)}
          clickLocation={clickLocation || ''}
          clickText={clickText || String(children)}
        >
          {children}
          <ArrowRight size={14} aria-hidden="true" />
        </TrackingLink>
      </Button>
    </div>
  )
}

export default MDXButton
