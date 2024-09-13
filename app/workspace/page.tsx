'use client'
import Heading from '@/components/ui/Heading'
import {
  ArrowRight,
  AtSign,
  AtSignIcon,
  CheckCircle,
  CheckCircle2,
  Copy,
  House,
  LoaderCircle,
  LoaderIcon,
} from 'lucide-react'
import React, { useState } from 'react'

export default function WorkspaceSetup() {
  const [isWorkspaceSetupComplete, setIsWorkspaceSetupComplete] = useState(true)
  const [workspaceProvisingDelayed, setWorkspaceProvisingDelayed] = useState(true)

  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-center py-32">
      {!isWorkspaceSetupComplete && (
        <div className="setting-workspace">
          <div className="header mb-[12px] flex flex-col items-center gap-[12px]">
            <House size={36} />
            <Heading type={5}>Setting up your workspace</Heading>
          </div>

          <div className="w-full rounded border border-signoz_slate-500 bg-signoz_ink-500 p-4">
            <div className="mb-4 flex items-center gap-[12px]">
              <div className="py-1">
                <CheckCircle size={16} color="#fff" />
              </div>
              <div className="flex flex-col ">
                <p className="font-small mb-0 text-sm text-signoz_vanilla-100">
                  Email verified! Looking good.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-[12px]">
              <div className="py-1">
                <LoaderCircle animate-spin size={16} color="#fff" />
              </div>
              <div className="flex flex-col">
                <p
                  className={`font-small mb-0 text-sm ${workspaceProvisingDelayed ? 'text-signoz_amber-400' : 'text-signoz_vanilla-100'}`}
                >
                  Preparing your cloud workspace,{' '}
                  {workspaceProvisingDelayed
                    ? 'This usually takes up to 5 mins ...'
                    : 'This may take a few minutes...'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 w-full rounded border border-signoz_slate-500 bg-signoz_ink-500 p-4">
            <div className=" flex items-center gap-[12px]">
              <div className="flex flex-col">
                <p className="font-small mb-0 text-sm text-signoz_vanilla-100">
                  Looks like it's taking a bit longer. Need help? Reach out on{' '}
                  <a className="text-signoz_robin-500" href="/">
                    {' '}
                    Slack Community{' '}
                  </a>{' '}
                  or email us at{' '}
                  <a className="text-signoz_robin-500" href="mailto:cloud-support@signoz.io.">
                    {' '}
                    cloud-support@signoz.io.{' '}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto my-8 max-w-[540px]">
            <button
              className={`mb-[12px] flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-signoz_robin-500 py-2 pl-4 pr-3 font-medium`}
            >
              <span className="flex items-center gap-1.5 px-px text-sm">
                Contact Support <ArrowRight size={14} />
              </span>{' '}
            </button>

            <button
              className={`gap mb-[16px] flex w-full cursor-pointer items-center justify-center rounded-full bg-signoz_ink-400 p-4 py-2 pl-4 pr-3 font-medium`}
            >
              <span className="flex items-center gap-1.5 px-px text-sm">
                Read the docs <ArrowRight size={14} />
              </span>{' '}
            </button>
          </div>
        </div>
      )}

      {isWorkspaceSetupComplete && (
        <div className="tenant-info">
          <div className="header mb-[12px] flex flex-col items-center gap-[12px]">
            <CheckCircle2 size={36} />
            <Heading type={5}>Your workspace is ready!</Heading>
          </div>

          <div className="w-full rounded border border-signoz_slate-500 bg-signoz_ink-500 p-4">
            <div className="mb-4 flex flex-col gap-[12px]">
              <div className="flex flex-col ">
                <p className="font-small mb-0 text-sm text-signoz_vanilla-100">Hey ,</p>
              </div>

              <div className="flex flex-col ">
                <p className="font-small mb-0 text-sm text-signoz_vanilla-100">
                  Your SigNoz cloud account is ready to be used. The following details have also
                  been emailed to you.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-[16px] w-full rounded border border-signoz_slate-500 bg-signoz_ink-500">
            <div className="mb-4 flex flex-col gap-[12px]">
              <div className="flex flex-col border-b-1 border-signoz_slate-400 p-4">
                <p className="font-small mb-0 text-sm text-signoz_vanilla-100 ">
                  Workspace details{' '}
                </p>
              </div>

              <div className="p-4">
                <div className="mb-2 flex flex-row items-center justify-between gap-[12px]">
                  <div className="flex flex-1 flex-row items-center gap-2 py-1 text-sm">
                    <CheckCircle size={16} color="#fff" /> Tenant URL{' '}
                  </div>
                  <div className="font-small flex flex-1 flex-row items-center justify-end gap-2 text-sm text-signoz_robin-400">
                    <p className="mb-0">https://tenant.us.signoz.cloud</p>
                    <Copy size={14} className="mb-0" />
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between gap-[12px]">
                  <div className="flex flex-1 flex-row items-center gap-2 py-1 text-sm">
                    <AtSignIcon size={16} color="#fff" /> Sign-up email
                  </div>
                  <div className="font-small flex flex-1 flex-row items-center justify-end gap-2 text-sm text-signoz_robin-400">
                    <p className="mb-0">https://tenant.us.signoz.cloud</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 w-full rounded border border-signoz_slate-500 bg-signoz_ink-500 p-4">
            <div className=" flex items-center gap-[12px]">
              <div className="flex flex-col">
                <p className="font-small mb-0 text-sm text-signoz_vanilla-100">
                  If you face any issues with sending data to your cloud instance or getting
                  started, please write to
                  <a className="text-signoz_robin-500" href="mailto:cloud-support@signoz.io.">
                    {' '}
                    cloud-support@signoz.io.{' '}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto my-8 max-w-[540px]">
            <button
              className={`mb-[12px] flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-signoz_robin-500 py-2 pl-4 pr-3 font-medium`}
            >
              <span className="flex items-center gap-1.5 px-px text-sm">
                Go to my workspace <ArrowRight size={14} />
              </span>{' '}
            </button>

            <button
              className={`gap mb-[16px] flex w-full cursor-pointer items-center justify-center rounded-full bg-signoz_ink-400 p-4 py-2 pl-4 pr-3 font-medium`}
            >
              <span className="flex items-center gap-1.5 px-px text-sm">
                Read the docs <ArrowRight size={14} />
              </span>{' '}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
