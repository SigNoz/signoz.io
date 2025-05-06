import React from 'react'
import { HelpCircle, MessageSquare } from 'lucide-react'
import { SiSlack, SiGithub } from 'react-icons/si'
import SingleLinkCard from '../../../components/Card/SingleLinkCard'

interface CommunityLinkData {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  clickName: string
  clickType: string
}

const communityLinks: CommunityLinkData[] = [
  {
    title: 'Troubleshooting KB',
    description: 'Find solutions to common issues',
    href: 'https://signoz.io/docs/troubleshooting/signoz-cloud/general-troubleshooting/',
    icon: <HelpCircle size={20} className="text-signoz_robin-500" />,
    clickName: 'Troubleshooting KB Link',
    clickType: 'Nav Click',
  },
  {
    title: 'Join Slack Community',
    description: 'Connect with SigNoz users and developers',
    href: 'https://signoz.io/slack',
    icon: <SiSlack size={20} className="text-signoz_robin-500" />,
    clickName: 'Slack Community Link',
    clickType: 'Nav Click',
  },
  {
    title: 'Check Out GitHub Repo',
    description: 'Explore and contribute to SigNoz',
    href: 'https://github.com/SigNoz/signoz',
    icon: <SiGithub size={20} className="text-signoz_robin-500" />,
    clickName: 'GitHub Repo Link',
    clickType: 'Nav Click',
  },
]

export default function TroubleshootingCommunity() {
  const sectionName = 'Troubleshooting and Community Section'

  return (
    <div className="mx-auto mb-12 w-full max-w-7xl">
      <div className="mb-6 text-left">
        <h2 className="mb-2 text-2xl font-semibold text-signoz_vanilla-100">
          Troubleshooting and Community
        </h2>
        <p className="text-base text-signoz_vanilla-400">
          Get help and connect with the SigNoz community
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {communityLinks.map((link, index) => (
          <SingleLinkCard
            key={index}
            href={link.href}
            title={link.title}
            description={link.description}
            icon={link.icon}
            clickType={link.clickType}
            clickName={link.clickName}
            clickText={link.title}
            clickLocation={sectionName}
          />
        ))}
      </div>
    </div>
  )
}
