import { ArrowRight } from 'lucide-react'
import { CheckCircleIcon, HouseIcon, Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import './workspace-setup.styles.css'

function WorkspaceSetup({ isWorkspaceSetupDelayed }) {
  return (
    <div className="welcome-container mx-auto flex max-w-[640px] flex-col items-center py-32">
      <HouseIcon size={56} className="text-signoz_robin-500" />

      <div className="mt-[28px] bg-neutral-950 text-2xl"> Setting up your workspace </div>

      <div className="text-md mt-[28px] w-full rounded-[6px] border border-[#1D212D] bg-signoz_ink-300 p-[24px]">
        <div className="flex items-center gap-4 text-sm">
          <CheckCircleIcon size={24} /> Email verified! Looking good.
        </div>

        <div
          className={`mt-[28px] flex items-center gap-4 text-sm ${
            isWorkspaceSetupDelayed ? 'text-signoz_amber-500' : ''
          }`}
        >
          <Loader2 size={24} className="animate-spin" /> Preparing your cloud workspace, This may
          take a few minutes ...
        </div>
      </div>

      {isWorkspaceSetupDelayed && (
        <div className="text-md workspace-setup-delay-message-container mt-[28px] w-full rounded-[6px] border border-[#1D212D] bg-signoz_ink-300 p-[24px] text-sm">
          Looks like it's taking a bit longer. Need help? Reach out on{' '}
          <a href="https://signoz.io/slack'" className="text-signoz_robin-500">
            Slack Community
          </a>{' '}
          or email us at{' '}
          <a href="mailto:cloud-support@signoz.io" className="text-signoz_robin-500">
            cloud-support@signoz.io
          </a>
          .
        </div>
      )}

      <div className="mt-[28px] flex w-full max-w-[480px] flex-col items-center justify-center gap-4 py-[8px] text-sm font-medium">
        <a
          type="submit"
          className="mt-[28px] flex h-[40px] w-full items-center justify-center gap-4 rounded-full bg-signoz_robin-500 px-[16px] py-[8px] text-sm font-medium"
          href="mailto:cloud-support@signoz.io"
        >
          <span className="flex text-xs leading-5">Contact cloud support</span>
          <ArrowRight size={14} />
        </a>

        <Link href="/docs" className="w-full">
          <button className="flex h-[40px] w-full items-center justify-center gap-4 rounded-full bg-signoz_ink-300 px-[16px] py-[8px] text-sm font-medium">
            <span className="flex text-xs leading-5">Read the docs </span>
            <ArrowRight size={14} />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default WorkspaceSetup
