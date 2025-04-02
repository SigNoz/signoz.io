'use client'

import React from 'react'
import { Lock, ShieldCheck, Settings } from 'lucide-react' // Using relevant lucide icons
// import InfoCard from '../../../components/Card/InfoCard' // Use relative path
import SingleLinkCard from '../../../components/Card/SingleLinkCard' // Updated import

interface SecurityLinkData {
  title: string
  description: string
  href: string // Update with actual links later
  icon: React.ReactNode
  clickName: string
}

const securityLinks: SecurityLinkData[] = [
  {
    title: 'Authentication',
    description: 'Configure user authentication',
    href: '/docs/userguide/authentication/',
    icon: <Lock size={20} className="text-signoz_robin-500" />,
    clickName: 'Authentication Link',
  },
  {
    title: 'SSO SAML',
    description: 'Set up Single Sign-On with SAML',
    href: '/docs/userguide/sso-authentication//',
    icon: <Settings size={20} className="text-signoz_robin-500" />,
    clickName: 'SSO SAML Link',
  },
  {
    title: 'Retention Period',
    description: 'Learn about data retention period',
    href: '/docs/userguide/retention-period/',
    icon: <ShieldCheck size={20} className="text-signoz_robin-500" />,
    clickName: 'Retention Period Link',
  },
]

export default function SecurityCompliance() {
  const sectionName = 'Security and Compliance Section'

  return (
    <div className="mx-auto mb-12 w-full max-w-7xl">
      <div className="mb-6 text-left">
        <h2 className="mb-2 text-2xl font-semibold text-signoz_vanilla-100">
          Security and Compliance
        </h2>
        <p className="text-base text-signoz_vanilla-400">
          Secure your SigNoz deployment and ensure compliance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {securityLinks.map((link, index) => (
          <SingleLinkCard // Updated component name
            key={index}
            href={link.href}
            title={link.title}
            description={link.description}
            icon={link.icon}
            clickType="Security Link" // Specific clickType
            clickName={link.clickName}
            clickText={link.title} // Using title as clickText
            clickLocation={sectionName}
          />
        ))}
      </div>
    </div>
  )
}
