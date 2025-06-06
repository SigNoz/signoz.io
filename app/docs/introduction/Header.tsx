import React from 'react'
import Heading from '@/components/ui/Heading'
import SubHeading from '@/components/ui/SubHeading'
import SearchBar from '@/components/ui/SearchBar'

export default function Header() {
  return (
    <div className="mx-auto mb-12 w-full max-w-6xl">
      <div className="text-center">
        <Heading type={1} className="mb-4">
          SigNoz Docs
        </Heading>
        <SubHeading className="mx-auto max-w-3xl text-signoz_vanilla-400">
          Learn how to monitor and troubleshoot your applications with SigNoz using step-by-step
          guides, reference docs, and video tutorials.
        </SubHeading>

        {/* Search Bar */}
        <div className="mt-8 flex justify-center">
          <SearchBar className="w-full max-w-2xl" />
        </div>
      </div>
    </div>
  )
}
