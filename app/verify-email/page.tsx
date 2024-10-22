'use client'

import React, { useState } from 'react'
import { ArrowRight, Loader2, Mail } from 'lucide-react'

function VerifyEmail() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitFailed, setSubmitFailed] = useState(false)

  const workEmail = localStorage.getItem('workEmail')

  const handleResendVerificationEmail = async () => {
    setIsSubmitting(true)
    setSubmitFailed(false)

    const payload = {
      email: workEmail,
    }

    try {
      const response = await fetch('https://api.signoz.cloud/v2/users/notify', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setSubmitSuccess(true)

        setTimeout(() => {
          setSubmitSuccess(false)
          setSubmitFailed(false)
        }, 5000)
      } else {
        // To do, handle other errors apart from invalid email
        if (response.status === 400) {
          setSubmitFailed(true)

          setTimeout(() => {
            setSubmitSuccess(false)
            setSubmitFailed(false)
          }, 5000)
        }
      }
    } catch (error) {
      setSubmitFailed(true)

      setTimeout(() => {
        setSubmitSuccess(false)
        setSubmitFailed(false)
      }, 5000)
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
        <div className="mt-[28px] w-full text-center text-xs text-signoz_cherry-500">
          We're sorry, it looks like something didn't go as planned. <br /> Please reach out to us
          for assistance.
        </div>
      )}

      {submitSuccess && (
        <div className="mt-[28px] w-full text-center text-xs text-signoz_forest-500">
          Verification email sent! Please check your email for the next steps.
        </div>
      )}

      <div className="flex w-full flex-col">
        <button
          type="submit"
          className="mt-[28px] flex h-[40px] w-full items-center justify-center gap-4 rounded-full bg-signoz_ink-300 px-[16px] py-[8px]"
          onClick={handleResendVerificationEmail}
          disabled={isSubmitting}
        >
          <span className="flex text-xs leading-5">Resend verification email</span>

          {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
        </button>

        <a
          type="submit"
          className="mt-[12px] flex h-[40px] w-full items-center justify-center gap-4 rounded-full bg-signoz_ink-300 px-[16px] py-[8px]"
          href="mailto:cloud-support@signoz.io"
        >
          <span className="flex text-xs leading-5">Contact cloud support</span>
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  )
}

export default VerifyEmail
