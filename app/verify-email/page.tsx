import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

function verifyemail() {
  return (
    <div className="welcome-container mx-auto flex max-w-[520px] flex-col items-center py-32">
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="28" cy="28" r="20" fill="#7190F9" fill-opacity="0.1" />
        <circle cx="28" cy="28" r="20" fill="#7190F9" fill-opacity="0.1" />
        <path
          d="M28.0003 51.3337C40.8873 51.3337 51.3337 40.8873 51.3337 28.0003C51.3337 15.1133 40.8873 4.66699 28.0003 4.66699C15.1133 4.66699 4.66699 15.1133 4.66699 28.0003C4.66699 40.8873 15.1133 51.3337 28.0003 51.3337Z"
          fill="#4E74F8"
          stroke="#4E74F8"
          stroke-width="4.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16 27L23.9615 36L39 22"
          stroke="#121317"
          stroke-width="4.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <div className="mt-[28px] bg-neutral-950 text-2xl"> Welcome to SigNoz </div>

      <div className="text-md mt-[28px] rounded-[6px] border border-[#1D212D] bg-signoz_ink-300 p-[24px]">
        <div>
          {' '}
          Thank you for signing up for SigNoz Cloud. Please check your email for the next steps.{' '}
        </div>

        <div className="mt-[28px]">
          If you do not find the email in your inbox within the next few minutes, please check your
          spam folder.
        </div>
      </div>

      <a
        type="submit"
        className="mt-[28px] flex w-full items-center justify-center gap-4 rounded-full bg-signoz_robin-500 px-[16px] py-[8px] text-sm font-medium"
        href="mailto:cloud-support@signoz.io"
      >
        <span className="flex text-xs leading-5">Contact cloud support</span>
        <ArrowRight size={14} />
      </a>

      <Link href="/docs" className="w-full">
        <button className="mt-[12px] flex w-full items-center justify-center gap-4 rounded-full bg-signoz_ink-300 px-[16px] py-[8px] text-sm font-medium">
          <span className="flex text-xs leading-5">Read the docs </span>
          <ArrowRight size={14} />
        </button>
      </Link>
    </div>
  )
}

export default verifyemail
