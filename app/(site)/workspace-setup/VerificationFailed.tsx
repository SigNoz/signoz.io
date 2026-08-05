'use client'

import React from 'react'
import { ArrowRight, CheckCircleIcon, Frown, Loader2, MailWarning } from 'lucide-react'
import TrackingButton from '@/components/TrackingButton'
import TrackingLink from '@/components/TrackingLink'
import './workspace-setup.styles.css'

interface VerificationFailedProps {
  variant: 'expired' | 'error'
  email: string
  errorMessage: string | null
  resendStatus: 'idle' | 'sending' | 'sent' | 'failed'
  canResend: boolean
  onResend: () => void
}

function VerificationFailed({
  variant,
  email,
  errorMessage,
  resendStatus,
  canResend,
  onResend,
}: VerificationFailedProps) {
  const isExpired = variant === 'expired'
  const isSending = resendStatus === 'sending'

  return (
    <div className="welcome-container mx-auto flex min-h-[96vh] max-w-[520px] flex-col items-center justify-center py-32">
      <MailWarning className="text-signoz_robin-500" size={56} />

      <div className="mt-[28px] text-center text-xl">
        {isExpired ? 'Your verification link has expired' : "We couldn't verify your email"}
      </div>

      <div className="mt-[28px] w-full rounded-[6px] border border-[#1D212D] bg-signoz_ink-300 p-[24px] text-sm">
        {isExpired
          ? 'This verification link has expired or is no longer valid. Request a new verification email to continue setting up your workspace.'
          : errorMessage ||
            'Something went wrong while verifying your email. Please try again later or contact support for assistance.'}
      </div>

      {resendStatus === 'sent' && (
        <div className="mt-[28px] flex w-full items-center justify-center gap-2 text-center text-xs text-signoz_forest-500">
          <CheckCircleIcon size={16} /> New verification email sent{email ? ` to ${email}` : ''} —
          check your inbox (and spam folder).
        </div>
      )}

      {resendStatus === 'failed' && (
        <div className="mt-[28px] flex w-full items-center justify-center gap-2 text-center text-xs text-signoz_cherry-500">
          <Frown size={16} /> We couldn't resend the verification email. Please try again or contact
          support for assistance.
        </div>
      )}

      <div className="flex w-full flex-col">
        {isExpired && canResend && resendStatus !== 'sent' && (
          <TrackingButton
            type="submit"
            className={`mt-[28px] flex h-[40px] w-full items-center justify-center gap-4 rounded-full bg-signoz_robin-500 px-[16px] py-[8px] text-sm font-medium ${
              isSending ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={onResend}
            disabled={isSending}
            clickType="Primary CTA"
            clickName="Resend Verification Email"
            clickLocation="Workspace Setup Verification Failed"
            clickText="Resend verification email"
          >
            <span className="flex text-xs leading-5">Resend verification email</span>
            {isSending ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
          </TrackingButton>
        )}

        <TrackingLink
          href="mailto:cloud-support@signoz.io"
          className="mt-[12px] flex h-[40px] w-full items-center justify-center gap-4 rounded-full bg-signoz_ink-300 px-[16px] py-[8px] text-sm font-medium"
          clickType="Support Link"
          clickName="Contact Support Link"
          clickLocation="Workspace Setup Verification Failed"
          clickText="Contact cloud support"
        >
          <span className="flex text-xs leading-5">Contact cloud support</span>
          <ArrowRight size={14} />
        </TrackingLink>
      </div>
    </div>
  )
}

export default VerificationFailed
