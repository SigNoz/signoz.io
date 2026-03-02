'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLogEvent } from '../../hooks/useLogEvent'
import WorkspaceReady from './WorkspaceReady'
import WorkspaceSetup from './WorkspaceSetup'

function WorkspaceSetupHome() {
  const [isWorkspaceReady, setIsWorkspaceReady] = useState(false)
  const [isWorkspaceSetupDelayed, setIsWorkspaceSetupDelayed] = useState(false)
  const [isPollingEnabled, setIsPollingEnabled] = useState(false)
  const [pollingInterval, setPollingInterval] = useState(3000) // initial polling interval - 3 seconds
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [retryCount, setRetryCount] = useState(1)
  const [workspaceData, setWorkspaceData] = useState(null)
  const searchParams = useSearchParams()
  const logEvent = useLogEvent()

  const code = searchParams.get('code')
  const email = searchParams.get('email')
  const region = searchParams.get('region')

  const verifyEmail = async () => {
    logEvent({
      eventName: 'Email Verification Started',
      eventType: 'track',
      attributes: {
        email: decodeURIComponent(email || ''),
        region: region,
      },
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_CONTROL_PLANE_URL}/users/verify`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({
        code: code,
        email: decodeURIComponent(email || ''),
        region: {
          name: region,
        },
      }),
    })

    const data = await res.json()

    if (data.status === 'error' && data.type !== 'already-exists') {
      setIsEmailVerified(false)
      logEvent({
        eventName: 'Email Verification Failed',
        eventType: 'track',
        attributes: {
          error: data.error,
          type: data.type,
          email: decodeURIComponent(email || ''),
        },
      })
    } else if (data.status === 'success') {
      setIsEmailVerified(true)
      setIsPollingEnabled(true)
      logEvent({
        eventName: 'Email Verified',
        eventType: 'track',
        attributes: {
          status: 'success',
          email: decodeURIComponent(email || ''),
        },
      })
    } else if (data.status === 'error' && data.type === 'already-exists') {
      setIsEmailVerified(true)
      setIsPollingEnabled(true)
      logEvent({
        eventName: 'Email Verified',
        eventType: 'track',
        attributes: {
          status: 'already-exists',
          email: decodeURIComponent(email || ''),
        },
      })
    }
  }

  const verifyWorkspaceSetup = async () => {
    if (!code || !email) {
      return
    }

    const verifyWorkSpaceSetupURL = `${process.env.NEXT_PUBLIC_CONTROL_PLANE_URL}/deployments/cesearch?code=${code}&email=${email}`

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
          email: decodeURIComponent(email || ''),
        },
      })
    } else if (data.status === 'error') {
      setRetryCount((currentRetryCount) => currentRetryCount + 1)
    }
  }

  useEffect(() => {
    // poll every 3s for the first minute, then every 15s for the next 4 minutes
    // total polling time is 5 minutes
    // 3s * 20 * 1 = 1 minute (20 polls)
    // 15s * 4 * 4 = 4 minutes (16 polls)
    if (retryCount <= 36) {
      if (retryCount <= 20) {
        setPollingInterval(3000)
      } else {
        setPollingInterval(15000)
      }

      setTimeout(verifyWorkspaceSetup, pollingInterval)
    } else {
      setIsWorkspaceSetupDelayed(true)
      logEvent({
        eventName: 'Workspace Provisioning Delayed',
        eventType: 'track',
        attributes: {
          retryCount: retryCount,
          email: decodeURIComponent(email || ''),
        },
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retryCount])

  useEffect(() => {
    verifyEmail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isEmailVerified && isPollingEnabled) {
      verifyWorkspaceSetup()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmailVerified])

  return (
    <Suspense>
      {isWorkspaceReady ? (
        <WorkspaceReady workspaceData={workspaceData} userEmail={email} />
      ) : (
        <WorkspaceSetup
          isWorkspaceSetupDelayed={isWorkspaceSetupDelayed}
          email={decodeURIComponent(email || '')}
          workspaceData={workspaceData}
        />
      )}
    </Suspense>
  )
}

export default WorkspaceSetupHome
