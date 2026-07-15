import React from 'react'
import TrackingLink from '../TrackingLink'

interface SingleLinkCardProps {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  clickName: string
  clickType: string
  clickText: string
  clickLocation: string
}

const SingleLinkCard: React.FC<SingleLinkCardProps> = ({
  title,
  description,
  href,
  icon,
  clickName,
  clickType,
  clickText,
  clickLocation,
}) => {
  return (
    <TrackingLink
      href={href}
      target="_blank"
      className="border-border bg-card hover:border-primary hover:bg-l3-background flex items-center gap-4 rounded-lg border p-4 transition-all"
      clickType={clickType}
      clickName={clickName}
      clickText={clickText}
      clickLocation={clickLocation}
    >
      <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md">
        {icon}
      </div>
      <div>
        <h3 className="text-l1-foreground mb-1 text-base font-bold">{title}</h3>
        <p className="text-muted-foreground mb-0 text-sm">{description}</p>
      </div>
    </TrackingLink>
  )
}

export default SingleLinkCard
