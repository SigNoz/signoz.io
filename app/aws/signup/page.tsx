'use client'

import React, { useState, Suspense } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import { ExternalLink, Loader2, Mail } from 'lucide-react'
import { VariantNavbar } from '../../teams/TeamsVariant'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import { useLogEvent } from '@/hooks/useLogEvent'

const AWSSignupContent = () => {
  const [licenseKey, setLicenseKey] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const searchParams = useSearchParams()
  const entitlementId = searchParams.get('sugerEntitlementId')
  const logEvent = useLogEvent()
  const pathname = usePathname()

  const handleActivate = async () => {
    setError(null)

    if (!entitlementId) {
      setError('Could not find Entitlement ID.')
      return
    }

    if (!licenseKey.trim()) {
      setError('Please enter your license key.')
      return
    }

    setLoading(true)

    logEvent({
      eventName: 'AWS Activation Initiated',
      eventType: 'track',
      attributes: {
        entitlementId,
        pageLocation: pathname,
      },
    })

    try {
      const endpoint = process.env.NEXT_PUBLIC_CONTROL_PLANE_URL
      const response = await fetch(`${endpoint}/subscriptions/suger`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          suger: {
            entitlement_id: entitlementId,
          },
          license: {
            key: licenseKey,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMessage = data.error || 'Failed to activate subscription'

        logEvent({
          eventName: 'AWS Activation Failed',
          eventType: 'track',
          attributes: {
            entitlementId,
            error: errorMessage,
            pageLocation: pathname,
          },
        })

        setError(errorMessage)
        throw new Error(errorMessage)
      }

      logEvent({
        eventName: 'AWS Activation Success',
        eventType: 'track',
        attributes: {
          entitlementId,
          pageLocation: pathname,
        },
      })

      setSuccess(true)
    } catch (err: any) {
      if (
        !err.message ||
        (err.message !== 'Failed to activate subscription' &&
          !err.message.includes('activate subscription'))
      ) {
        logEvent({
          eventName: 'AWS Activation Exception',
          eventType: 'track',
          attributes: {
            entitlementId,
            error: err.message || 'Unknown error',
            pageLocation: pathname,
          },
        })
      }

      setError((prev) => prev || 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center text-signoz_vanilla-100">
        <h2 className="mb-4 font-bold">Subscription Activated!</h2>
        <p className="m-0 mb-6 text-signoz_vanilla-100/70">
          Your AWS Marketplace subscription has been successfully connected to your SigNoz Cloud
          account.
        </p>
        <Button to="/" variant="default" rounded="default">
          Home
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full space-y-8 py-6">
      <div>
        <h2 className="m-0 text-2xl font-bold text-signoz_vanilla-100">
          Activate Your AWS Marketplace Subscription
        </h2>
        <p className="m-0 mt-2 text-sm text-signoz_vanilla-100/70">
          Connect your SigNoz Cloud account to start billing through AWS marketplace
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-signoz_slate-500 bg-signoz_ink-400/30 p-4">
          <div className="flex items-start gap-4">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signoz_ink-300 text-xs font-medium text-signoz_robin-500">
              1
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="m-0 font-medium text-signoz_vanilla-100">New to SigNoz?</h3>
              <p className="m-0 text-sm text-signoz_vanilla-100/70">
                Most AWS Marketplace customers need to create a SigNoz Cloud account first to get
                their license key.
              </p>
              <Button
                to="/teams/"
                variant="secondary"
                rounded="default"
                className="h-auto max-w-full whitespace-normal py-2"
                onClick={() => {
                  logEvent({
                    eventName: 'Website Click',
                    eventType: 'track',
                    attributes: {
                      clickType: 'Button Click',
                      clickName: 'Create SigNoz Account',
                      clickLocation: 'AWS Signup Content',
                      pageLocation: pathname,
                    },
                  })
                }}
              >
                <span className="flex flex-wrap items-center justify-center gap-2 text-center">
                  Create SigNoz Account
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </span>
              </Button>
            </div>
          </div>
        </div>

        <div className="relative flex items-center py-2">
          <div className="grow border-t border-signoz_slate-500"></div>
          <span className="mx-4 shrink text-xs text-signoz_vanilla-100/50">OR</span>
          <div className="grow border-t border-signoz_slate-500"></div>
        </div>

        <div className="rounded-lg border border-signoz_slate-500 bg-signoz_ink-400/30 p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signoz_robin-500/20 text-xs font-medium text-signoz_robin-500">
                2
              </div>
              <h3 className="m-0 font-medium text-signoz_vanilla-100">
                Already have a license key?
              </h3>
            </div>
            <p className="m-0 pl-8 text-sm text-signoz_vanilla-100/70">
              Enter it below to activate billing through AWS
            </p>

            <div className="space-y-4 pl-8">
              <div className="space-y-1.5">
                <label htmlFor="licenseKey" className="text-sm font-medium text-signoz_vanilla-100">
                  SigNoz Cloud License Key
                </label>
                <input
                  id="licenseKey"
                  type="text"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  placeholder="Enter your license key"
                  className="w-full rounded-md border border-signoz_slate-400 bg-signoz_ink-300 px-4 py-2.5 text-sm text-signoz_vanilla-100 placeholder-signoz_vanilla-100/50 focus:border-signoz_robin-500 focus:outline-none focus:ring-1 focus:ring-signoz_robin-500"
                />
                <p className="m-0 text-xs text-signoz_vanilla-100/50">
                  Find this in Settings → Account Settings → License
                </p>
              </div>

              {error && (
                <div className="rounded border border-red-900/50 bg-red-900/20 p-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <Button
                variant="default"
                rounded="default"
                onClick={handleActivate}
                disabled={loading}
                isButton
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Activating...
                  </>
                ) : (
                  'Activate Subscription'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Instructions = () => {
  const logEvent = useLogEvent()
  const pathname = usePathname()

  return (
    <div className="w-full space-y-8 py-6">
      <div>
        <h2 className="m-0 text-2xl font-bold text-signoz_vanilla-100">
          How to get SigNoz Cloud License Key
        </h2>
        <p className="m-0 mt-2 text-sm text-signoz_vanilla-100/70">
          Follow these steps to retrieve your license key from your SigNoz account
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-signoz_slate-500 bg-signoz_ink-400/30 p-4">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signoz_ink-300 text-xs font-medium text-signoz_robin-500">
              1
            </div>
            <h3 className="m-0 font-medium text-signoz_vanilla-100">Signup for SigNoz Cloud</h3>
          </div>
          <div className="space-y-3 pl-9">
            <p className="m-0 text-sm text-signoz_vanilla-100/70">
              Create a SigNoz Cloud account if you don't have one. If you already have an account
              that you want to bill through AWS Marketplace, proceed to step 2.
            </p>
            <Button
              to="/teams/"
              variant="default"
              rounded="default"
              onClick={() => {
                logEvent({
                  eventName: 'Website Click',
                  eventType: 'track',
                  attributes: {
                    clickType: 'Button Click',
                    clickName: 'Create SigNoz Account',
                    clickLocation: 'AWS Signup Instructions',
                    pageLocation: pathname,
                  },
                })
              }}
            >
              <span className="flex items-center gap-2">
                Create account
                <ExternalLink className="h-3 w-3" />
              </span>
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-signoz_slate-500 bg-signoz_ink-400/30 p-4">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signoz_ink-300 text-xs font-medium text-signoz_robin-500">
              2
            </div>
            <h3 className="m-0 font-medium text-signoz_vanilla-100">Navigate to License Details</h3>
          </div>
          <div className="space-y-3 pl-9">
            <p className="m-0 text-sm text-signoz_vanilla-100/70">
              In your SigNoz account, navigate to the license details by going to Settings → Account
              Settings → License
            </p>
            <div className="flex items-center justify-center">
              <Image
                width={500}
                height={500}
                src="/img/aws/signup/show-account-settings.webp"
                alt="License Details"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-signoz_slate-500 bg-signoz_ink-400/30 p-4">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signoz_ink-300 text-xs font-medium text-signoz_robin-500">
              3
            </div>
            <h3 className="m-0 font-medium text-signoz_vanilla-100">
              Copy and Submit Your License Key
            </h3>
          </div>
          <div className="pl-9">
            <p className="m-0 text-sm text-signoz_vanilla-100/70">
              Copy your license key from the License section and paste it in the activation form on
              the left to complete the setup.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-signoz_slate-500 pt-6">
        <p className="m-0 text-sm text-signoz_vanilla-100/70">
          Need help? Reach out to
          <Button
            href="mailto:cloud-support@signoz.io"
            className="text-signoz_robin-500 hover:text-signoz_robin-400"
            onClick={() => {
              logEvent({
                eventName: 'Website Click',
                eventType: 'track',
                attributes: {
                  clickType: 'Link Click',
                  clickName: 'Contact Support',
                  clickLocation: 'AWS Signup Instructions',
                  pageLocation: pathname,
                  target: 'cloud-support@signoz.io',
                },
              })
            }}
          >
            <span className="flex items-center gap-1">
              cloud-support@signoz.io
              <Mail className="h-3 w-3 text-signoz_robin-500" />
            </span>
          </Button>
        </p>
      </div>
    </div>
  )
}

export default function AWSSignupPage() {
  return (
    <div className="bg-signoz_ink-600 min-h-screen font-sans">
      <VariantNavbar className="bg-signoz_ink-300 px-8" />
      <div className="flex min-h-[calc(100vh-56px)] flex-col lg:flex-row">
        <div className="flex w-full flex-col items-center p-8 px-4 md:px-8 lg:w-5/12 lg:border-r lg:border-signoz_slate-500 lg:px-24">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <Loader2 className="animate-spin text-signoz_robin-500" />
              </div>
            }
          >
            <AWSSignupContent />
          </Suspense>
        </div>

        <div className="flex hidden w-full flex-col p-8 px-4 md:px-8 lg:flex lg:w-7/12 lg:px-24">
          <Instructions />
        </div>
      </div>
    </div>
  )
}
