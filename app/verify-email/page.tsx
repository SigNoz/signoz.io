'use client'

import React, { useEffect, useState } from 'react'
import { ArrowRight, CheckCircleIcon, Frown, Loader2, Mail } from 'lucide-react'
import TrackingButton from '@/components/TrackingButton'
import TrackingLink from '@/components/TrackingLink'

function VerifyEmail() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitFailed, setSubmitFailed] = useState(false)

  const [workEmail, setWorkEmail] = useState<string | null>(null)
  const [region, setRegion] = useState<string | null>(null)

  useEffect(() => {
    try {
      const workEmailFromLocalStorage = localStorage.getItem('workEmail')
      const region = localStorage.getItem('region')

      if (workEmailFromLocalStorage && region) {
        setWorkEmail(workEmailFromLocalStorage)
        setRegion(region)
      } else {
        setSubmitFailed(true)
      }
    } catch (error) {
      console.error('Error fetching work email or region from local storage', error)
      setWorkEmail(null)
      setSubmitFailed(true)
    }
  }, [])

  const handleResendVerificationEmail = async () => {
    setIsSubmitting(true)
    setSubmitFailed(false)

    const payload = {
      email: workEmail,
      region: {
        name: region,
      },
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CONTROL_PLANE_URL}/users/notify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setSubmitSuccess(true)

        // show the success message for 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false)
          setSubmitFailed(false)
        }, 5000)
      } else {
        if (response.status === 400) {
          setSubmitFailed(true)
        }
      }
    } catch (error) {
      setSubmitFailed(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="welcome-container mx-auto flex min-h-[96vh] max-w-[520px] flex-col items-center justify-center py-32">
      <Mail className="text-signoz_robin-500" size={56} />
      <div className="mt-[28px] text-xl"> First, let's verify your email </div>

      <div className="mt-[28px] rounded-[6px] border border-[#1D212D] bg-signoz_ink-300 p-[24px] text-sm">
        Check your email for the next steps. If you don't see the email, check your spam folder or
        try resending the verification email.
      </div>

      {submitFailed && (
        <div className="mt-[28px] flex w-full items-center justify-center gap-2 text-center text-xs text-signoz_cherry-500">
          <Frown size={16} /> Resend failed. Please check your internet connection or try again
          later. If the issue persists, contact support for assistance.
        </div>
      )}

      {submitSuccess && (
        <div className="mt-[28px] flex w-full items-center justify-center gap-2 text-center text-xs text-signoz_forest-500">
          <CheckCircleIcon size={16} /> Verification email resent! Please check your inbox (and spam
          folder) for the new verification link.
        </div>
      )}

      <div className="flex w-full flex-col">
        <TrackingButton
          type="submit"
          className={`mt-[28px] flex h-[40px] w-full items-center justify-center gap-4 rounded-full bg-signoz_ink-300 px-[16px] py-[8px] ${
            isSubmitting || !workEmail || submitFailed ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={handleResendVerificationEmail}
          disabled={isSubmitting || !workEmail || submitFailed}
          clickType="Secondary CTA"
          clickName="Resend Verification Email"
          clickLocation="Verify Email Page"
          clickText="Resend verification email"
        >
          <span className="flex text-xs leading-5">Resend verification email</span>

          {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
        </TrackingButton>

        <TrackingLink
          href="mailto:cloud-support@signoz.io"
          className="mt-[12px] flex h-[40px] w-full items-center justify-center gap-4 rounded-full bg-signoz_ink-300 px-[16px] py-[8px]"
          clickType="Support Link"
          clickName="Contact Support Link"
          clickLocation="Verify Email Page"
          clickText="Contact cloud support"
        >
          <span className="flex text-xs leading-5">Contact cloud support</span>
          <ArrowRight size={14} />
        </TrackingLink>
      </div>
    </div>
  )
}

export default VerifyEmail
