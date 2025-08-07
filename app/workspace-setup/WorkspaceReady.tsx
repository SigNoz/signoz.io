import {
  CheckCircleIcon,
  ArrowRight,
  Link2,
  AtSignIcon,
  CopyIcon,
} from 'lucide-react'
import React from 'react'
import Link from 'next/link'

function WorkspaceReady({
  workspaceData,
  userEmail,
}: {
  workspaceData: any
  userEmail: string | null
}) {
  const decodedEmail = decodeURIComponent(userEmail || '')

  const handleCopyWorkspaceLink = () => {
    navigator.clipboard.writeText(workspaceData?.invite_link)
  }

  return (
    <div className="welcome-container mx-auto flex max-w-[640px] flex-col items-center py-32">
      <CheckCircleIcon size={56} className="text-signoz_robin-500" />

      <div className="mt-[28px] bg-neutral-950 text-2xl"> Your workspace is provisioned! </div>

      <div className="text-md mt-[28px] rounded-[6px] border border-[#1D212D] bg-signoz_ink-300 p-[24px]">
        <div className="flex items-center gap-4 text-sm">
          Your SigNoz cloud account has been created. The final step is to set a password to secure your account and access your workspace.
        </div>
      </div>

      <div className="text-md mt-[28px] w-full rounded-[6px] border border-[#1D212D] bg-signoz_ink-300">
        <div className="flex items-center gap-4 border-b border-[#1D212D] p-[16px] text-sm">
          Workspace details
        </div>

        <div className="flex w-full flex-col items-center gap-4 px-[16px] py-[24px] text-sm">
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-1 items-center gap-2 text-sm">
              <Link2 size={16} /> Workspace URL
            </div>

            <div className="flex flex-1 items-center gap-4 text-sm text-signoz_robin-500">
              <a className="flex-1" href={workspaceData?.invite_link} target="_blank">
                {workspaceData?.invite_link}
              </a>

              <span className="cursor-pointer" onClick={handleCopyWorkspaceLink}>
                <CopyIcon size={16} />
              </span>
            </div>
          </div>

          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <AtSignIcon size={16} /> Sign-up email
            </div>
            <div className="text-sm text-signoz_robin-500">{decodedEmail}</div>
          </div>
        </div>
      </div>

      <div className="text-md mt-[28px] rounded-[6px] border border-[#1D212D] bg-signoz_ink-300 p-[24px] text-sm">
        If you face any issues with sending data to your cloud instance or getting started, please
        write to{' '}
        <a href="mailto:cloud-support@signoz.io" className="text-signoz_robin-500">
          cloud-support@signoz.io
        </a>
        .
      </div>

      <div className="mt-[28px] flex w-full max-w-[480px] flex-col items-center justify-center gap-4 py-[8px] text-sm font-medium">
        <a
          type="submit"
          className="mt-[28px] flex h-[40px] w-full items-center justify-center gap-4 rounded-full bg-signoz_robin-500 px-[16px] py-[8px] text-sm font-medium"
          href={workspaceData?.invite_link}
        >
          <span className="flex text-xs leading-5">Set password & go to workspace</span>
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

export default WorkspaceReady
