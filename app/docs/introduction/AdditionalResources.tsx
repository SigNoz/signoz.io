import React from 'react'
import { FileArchive, HeartPulse, BookOpen, Mail } from 'lucide-react'
import SingleLinkCard from '../../../components/Card/SingleLinkCard'

interface ResourceLinkData {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  clickName: string
}

const resourceLinks: ResourceLinkData[] = [
  {
    title: 'Sample Dashboards',
    description: 'Explore pre-built dashboards',
    href: '/dashboards/',
    icon: <FileArchive size={20} className="text-signoz_robin-500" />,
    clickName: 'Sample Dashboards Link',
  },
  {
    title: 'Changelog',
    description: "See what's new in SigNoz",
    href: '/changelog/',
    icon: <HeartPulse size={20} className="text-signoz_robin-500" />,
    clickName: 'Changelog Link',
  },
  {
    title: 'Blog',
    description: 'Read articles and tutorials',
    href: '/blog/',
    icon: <BookOpen size={20} className="text-signoz_robin-500" />,
    clickName: 'Blog Link',
  },
  {
    title: 'Newsletter',
    description: 'Curated technical content in your inbox',
    href: 'https://newsletter.signoz.io/?utm_source=signoz_website&utm_medium=docs_additional_resources&utm_campaign=newsletter',
    icon: <Mail size={20} className="text-signoz_robin-500" />,
    clickName: 'Newsletter Link',
  },
]

export default function AdditionalResources() {
  const sectionName = 'Additional Resources Section'

  return (
    <div className="mx-auto mb-12 w-full max-w-7xl">
      <div className="mb-6 text-left">
        <h2 className="mb-2 text-2xl font-semibold text-signoz_vanilla-100">
          Additional Resources
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {resourceLinks.map((link, index) => (
          <SingleLinkCard
            key={index}
            href={link.href}
            title={link.title}
            description={link.description}
            icon={link.icon}
            clickType="Nav Click"
            clickName={link.clickName}
            clickText={link.title}
            clickLocation={sectionName}
          />
        ))}
      </div>
    </div>
  )
}
