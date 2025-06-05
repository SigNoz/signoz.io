import React from 'react'
import { SiDocker, SiLinux, SiKubernetes } from 'react-icons/si'
import TrackingLink from '@/components/TrackingLink'

interface InstallOptionData {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  clickName: string
}

const installOptions: InstallOptionData[] = [
  {
    title: 'Docker',
    description: 'Run SigNoz using Docker Compose',
    href: '/docs/install/docker/',
    icon: <SiDocker className="h-7 w-7 text-blue-500" />,
    clickName: 'Docker Install Link',
  },
  {
    title: 'Linux',
    description: 'Install on Debian/Ubuntu systems',
    href: '/docs/install/linux/',
    icon: <SiLinux className="h-7 w-7 text-yellow-500" />,
    clickName: 'Linux Install Link',
  },
  {
    title: 'Kubernetes',
    description: 'Deploy using Helm charts',
    href: '/docs/install/kubernetes/',
    icon: <SiKubernetes className="h-7 w-7 text-blue-600" />,
    clickName: 'Kubernetes Install Link',
  },
]

export default function InstallLocallySection() {
  const sectionName = 'Self-Host Installation Section'

  return (
    <div className="mx-auto w-full max-w-7xl border-signoz_slate-400">
      <div className="mb-6 text-center md:text-left">
        <h2 className="mb-2 text-2xl font-semibold text-signoz_vanilla-100">Self-Host SigNoz</h2>
        <p className="text-signoz_vanilla-400">
          Choose the installation method that works best for your environment
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {installOptions.map((option, index) => (
          <TrackingLink
            key={index}
            href={option.href}
            clickType="Nav Click"
            clickName={option.clickName}
            clickText={option.title}
            clickLocation={sectionName}
            className="flex items-center gap-4 rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 p-4 transition-all hover:border-signoz_robin-500 hover:bg-signoz_ink-300"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-signoz_robin-500/10">
              {option.icon}
            </div>
            <div>
              <h3 className="mb-1 text-base font-bold text-signoz_vanilla-100">{option.title}</h3>
              <p className="mb-0 text-sm text-signoz_vanilla-400">{option.description}</p>
            </div>
          </TrackingLink>
        ))}
      </div>
    </div>
  )
}
