import React from 'react'
import TrackingLink from '../TrackingLink' // Assuming TrackingLink is in the parent directory relative to Card

interface SingleLinkCardProps {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  clickName: string
  clickType: string // e.g., 'Migration Link', 'Security Link'
  clickText: string // Usually the title
  clickLocation: string // Section name
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
      className="flex items-center gap-4 rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 p-4 transition-all hover:border-signoz_robin-500 hover:bg-signoz_ink-300"
      clickType={clickType}
      clickName={clickName}
      clickText={clickText} // Use provided clickText
      clickLocation={clickLocation}
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-signoz_robin-500/10">
        {icon}
      </div>
      <div>
        <h3 className="mb-1 text-base font-bold text-signoz_vanilla-100">{title}</h3>
        <p className="mb-0 text-sm text-signoz_vanilla-400">{description}</p>
      </div>
    </TrackingLink>
  )
}

export default SingleLinkCard
