'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLogEvent } from '@/hooks/useLogEvent'
import WorkspaceReady from './WorkspaceReady'
import WorkspaceSetup from './WorkspaceSetup'
import VerificationFailed from './VerificationFailed'

type VerificationState = 'verifying' | 'verified' | 'expired' | 'error'
type ResendStatus = 'idle' | 'sending' | 'sent' | 'failed'

function WorkspaceSetupHome() {
  const [isWorkspaceReady, setIsWorkspaceReady] = useState(false)
  const [isWorkspaceSetupDelayed, setIsWorkspaceSetupDelayed] = useState(false)
  const [verificationState, setVerificationState] = useState<VerificationState>('verifying')
  const [verificationError, setVerificationError] = useState<string | null>(null)
  const [resendStatus, setResendStatus] = useState<ResendStatus>('idle')
  const [storedRegion, setStoredRegion] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(1)
  const [workspaceData, setWorkspaceData] = useState(null)
  const searchParams = useSearchParams()
  const logEvent = useLogEvent()

  const code = searchParams.get('code')
  const email = searchParams.get('email')
  const region = searchParams.get('region')
  const decodedEmail = decodeURIComponent(email || '')

  // Region for resend: URL param first (email links carry it), localStorage fallback
  const resendRegion = region || storedRegion
  const canResend = Boolean(email && resendRegion)

  const verifyEmail = async () => {
    logEvent({
      eventName: 'Email Verification Started',
      eventType: 'track',
      attributes: {
        email: decodedEmail,
        region: region,
      },
    })

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CONTROL_PLANE_URL}/users/verify`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({
          code: code,
          email: decodedEmail,
          region: {
            name: region,
          },
        }),
      })

      if (res.ok) {
        // Success is 204 No Content — there is no body to parse
        setVerificationState('verified')
        logEvent({
          eventName: 'Email Verified',
          eventType: 'track',
          attributes: {
            status: 'success',
            email: decodedEmail,
          },
        })
        return
      }

      let data: { type?: string; error?: string } = {}
      try {
        data = await res.json()
      } catch {
        // non-JSON error body — handled by the generic error branch below
      }

      if (data.type === 'already-exists') {
        // Already verified (page refresh or social signup) — continue provisioning
        setVerificationState('verified')
        logEvent({
          eventName: 'Email Verified',
          eventType: 'track',
          attributes: {
            status: 'already-exists',
            email: decodedEmail,
          },
        })
        return
      }

      if (
        (res.status === 400 && data.type === 'invalid-input') ||
        (res.status === 404 && data.type === 'not-found')
      ) {
        // Expired code (400) or stale/regenerated code (404) — offer resend
        setVerificationState('expired')
        logEvent({
          eventName: 'Email Verification Link Expired',
          eventType: 'track',
          attributes: {
            status: res.status,
            type: data.type,
            email: decodedEmail,
          },
        })
        return
      }

      setVerificationState('error')
      setVerificationError(data.error || null)
      logEvent({
        eventName: 'Email Verification Failed',
        eventType: 'track',
        attributes: {
          status: res.status,
          error: data.error,
          type: data.type,
          email: decodedEmail,
        },
      })
    } catch (error) {
      setVerificationState('error')
      logEvent({
        eventName: 'Email Verification Failed',
        eventType: 'track',
        attributes: {
          error: 'network-error',
          email: decodedEmail,
        },
      })
    }
  }

  const verifyWorkspaceSetup = async () => {
    if (!code || !email) {
      return
    }

    // encode params: searchParams.get() returns decoded values, so characters
    // like `+` in the email would otherwise be read as a space by the backend
    const verifyWorkSpaceSetupURL = `${process.env.NEXT_PUBLIC_CONTROL_PLANE_URL}/deployments/cesearch?code=${encodeURIComponent(
      code
    )}&email=${encodeURIComponent(email)}`

    try {
      const res = await fetch(verifyWorkSpaceSetupURL)
      const data = await res.json()

      if (data.status === 'success') {
        setIsWorkspaceReady(true)
        setWorkspaceData(data?.data)
        logEvent({
          eventName: 'Workspace Provisioned',
          eventType: 'track',
          attributes: {
            workspaceData: data?.data,
            email: decodedEmail,
          },
        })
      } else if (data.type === 'invalid-input') {
        // Verification code expired mid-flow — stop polling and offer resend
        setVerificationState('expired')
        logEvent({
          eventName: 'Email Verification Link Expired',
          eventType: 'track',
          attributes: {
            status: res.status,
            type: data.type,
            source: 'cesearch',
            email: decodedEmail,
          },
        })
      } else {
        setRetryCount((currentRetryCount) => currentRetryCount + 1)
      }
    } catch (error) {
      setRetryCount((currentRetryCount) => currentRetryCount + 1)
    }
  }

  const handleResendVerificationEmail = async () => {
    if (!email || !resendRegion) {
      return
    }

    setResendStatus('sending')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CONTROL_PLANE_URL}/users/notify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: decodedEmail,
          region: {
            name: resendRegion,
          },
        }),
      })

      if (res.ok) {
        setResendStatus('sent')
        logEvent({
          eventName: 'Verification Email Resent',
          eventType: 'track',
          attributes: {
            email: decodedEmail,
            region: resendRegion,
          },
        })
      } else {
        setResendStatus('failed')
        logEvent({
          eventName: 'Verification Email Resend Failed',
          eventType: 'track',
          attributes: {
            status: res.status,
            email: decodedEmail,
            region: resendRegion,
          },
        })
      }
    } catch (error) {
      setResendStatus('failed')
      logEvent({
        eventName: 'Verification Email Resend Failed',
        eventType: 'track',
        attributes: {
          error: 'network-error',
          email: decodedEmail,
          region: resendRegion,
        },
      })
    }
  }

  useEffect(() => {
    try {
      setStoredRegion(localStorage.getItem('region'))
    } catch (error) {
      setStoredRegion(null)
    }
  }, [])

  useEffect(() => {
    if (!code || !email) {
      setVerificationState('error')
      logEvent({
        eventName: 'Email Verification Failed',
        eventType: 'track',
        attributes: {
          error: 'missing-params',
          email: decodedEmail,
        },
      })
      return
    }

    verifyEmail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Poll only after the email is verified.
    // poll every 3s for the first minute, then every 15s for the next 4 minutes
    // total polling time is 5 minutes
    // 3s * 20 * 1 = 1 minute (20 polls)
    // 15s * 4 * 4 = 4 minutes (16 polls)
    if (verificationState !== 'verified') {
      return
    }

    if (retryCount <= 36) {
      const interval = retryCount <= 20 ? 3000 : 15000
      const timer = setTimeout(verifyWorkspaceSetup, interval)
      return () => clearTimeout(timer)
    } else {
      setIsWorkspaceSetupDelayed(true)
      logEvent({
        eventName: 'Workspace Provisioning Delayed',
        eventType: 'track',
        attributes: {
          retryCount: retryCount,
          email: decodedEmail,
        },
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retryCount, verificationState])

  return (
    <Suspense>
      {isWorkspaceReady ? (
        <WorkspaceReady workspaceData={workspaceData} userEmail={email} />
      ) : verificationState === 'expired' || verificationState === 'error' ? (
        <VerificationFailed
          variant={verificationState}
          errorMessage={verificationError}
          resendStatus={resendStatus}
          canResend={canResend}
          onResend={handleResendVerificationEmail}
        />
      ) : (
        <WorkspaceSetup
          isEmailVerified={verificationState === 'verified'}
          isWorkspaceSetupDelayed={isWorkspaceSetupDelayed}
          email={decodedEmail}
          workspaceData={workspaceData}
        />
      )}
    </Suspense>
  )
}

export default WorkspaceSetupHome
