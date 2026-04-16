'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'
import { Github } from '@/components/social-icons/SolidIcons'

const NavGitHubStars: React.FC = () => {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    fetch('https://api.github.com/repos/SigNoz/signoz')
      .then((r) => r.json())
      .then((d) => setStars(d.stargazers_count))
      .catch(() => {})
  }, [])

  if (!stars) return null

  const formatted = stars >= 1000 ? (stars / 1000).toFixed(1) + 'k' : stars.toString()

  return (
    <span className="flex items-center gap-1.5 px-1.5 py-1 text-sm font-normal text-gray-400">
      <Github className="h-3.5 w-3.5 fill-gray-400" />
      {formatted} Stars
    </span>
  )
}

export const FocusedNavbar = ({ className }: { className?: string }) => {
  return (
    <div
      className={`fixed left-0 right-0 top-0 z-[30] mx-auto flex h-[56px] w-full items-center text-signoz_vanilla-100 backdrop-blur-[20px] ${className}`}
    >
      <div className="bg-signoz_ink-500 flex h-full w-full items-center px-4 md:pl-12 lg:w-5/12 lg:pl-16">
        <div className="flex justify-start">
          <Link href="/" className="-m-1.5 flex items-center gap-2 p-1.5">
            <Image
              className="h-5 w-auto"
              src="/img/SigNozLogo-orange.svg"
              width={160}
              height={60}
              alt="SigNoz Logo"
            />
            <span className="text-[17.111px] font-medium">SigNoz</span>
          </Link>
        </div>
      </div>
      <div className="hidden h-full items-center justify-end gap-3 bg-signoz_ink-500 px-4 md:pr-12 lg:flex lg:w-7/12 lg:pr-16">
        <NavGitHubStars />
        <TrackingLink
          target="_blank"
          clickType="Nav Click"
          clickName="Docs Link"
          clickLocation="focused_navbar"
          clickText="Documentation"
          href="/docs"
          className="flex items-center truncate px-1.5 py-1 text-sm font-normal text-gray-400 hover:text-signoz_robin-500"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Documentation
        </TrackingLink>
        <TrackingLink
          target="_blank"
          clickType="Nav Click"
          clickName="Pricing Link"
          clickLocation="focused_navbar"
          clickText="Pricing"
          href="/pricing/"
          className="flex items-center truncate px-1.5 py-1 text-sm font-normal text-gray-400 hover:text-signoz_robin-500"
        >
          Pricing
        </TrackingLink>
      </div>
      <div className="bg-signoz_ink-500 flex h-full items-center justify-end px-4 md:px-8 lg:hidden">
        <TrackingLink
          target="_blank"
          clickType="Nav Click"
          clickName="Docs Link"
          clickLocation="focused_navbar"
          clickText="Docs"
          href="/docs"
          className="flex items-center truncate px-1.5 py-1 text-sm font-normal text-gray-400 hover:text-signoz_robin-500"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Docs
        </TrackingLink>
      </div>
    </div>
  )
}

export default FocusedNavbar
