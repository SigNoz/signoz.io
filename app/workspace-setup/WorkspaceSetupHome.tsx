'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
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

  const code = searchParams.get('code')
  const email = searchParams.get('email')
  const region = searchParams.get('region')

  const verifyEmail = async () => {
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
    } else if (data.status === 'success') {
      setIsEmailVerified(true)
      setIsPollingEnabled(true)
    } else if (data.status === 'error' && data.type === 'already-exists') {
      setIsEmailVerified(true)
      setIsPollingEnabled(true)
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
        <WorkspaceSetup isWorkspaceSetupDelayed={isWorkspaceSetupDelayed} />
      )}
    </Suspense>
  )
}

export default WorkspaceSetupHome
