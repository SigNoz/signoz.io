'use client'

import React, { useState } from 'react'
import { sendTestEvent } from '../../utils/analytics'
import SectionContainer from '../../components/SectionContainer'

export default function MixpanelTestPage() {
  const [testResult, setTestResult] = useState<string | null>(null)

  const handleTestEvent = () => {
    const result = sendTestEvent()
    if (result) {
      setTestResult('Test event sent successfully! Check your Mixpanel dashboard.')
    } else {
      setTestResult('Failed to send test event. Check the console for errors.')
    }
  }

  return (
    <SectionContainer>
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="mb-8 text-3xl font-bold">Mixpanel Test Page</h1>

        <div className="mb-8 max-w-xl text-center">
          <p className="text-lg">
            This page allows you to test your Mixpanel implementation by sending a test event.
          </p>
          <p className="mt-4 text-sm opacity-80">
            Make sure you have set the NEXT_PUBLIC_MIXPANEL_TOKEN environment variable.
          </p>
        </div>

        <button
          onClick={handleTestEvent}
          className="h-10 rounded-full bg-signoz_robin-500 px-6 py-2 text-center text-base font-medium text-white transition duration-150 hover:bg-signoz_robin-600"
        >
          Send Test Event
        </button>

        {testResult && (
          <div className="mt-8 max-w-xl rounded-lg bg-green-800 bg-opacity-20 p-4 text-center">
            <p>{testResult}</p>
          </div>
        )}
      </div>
    </SectionContainer>
  )
}
