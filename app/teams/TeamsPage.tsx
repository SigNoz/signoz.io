'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { FaGithub } from 'react-icons/fa'
import { useSignupForm } from '@/hooks/useSignupForm'
import { REGIONS } from '@/constants/regions'
import { TRUST_BAR_LOGOS } from '@/constants/trustBarLogos'
import { FocusedNavbar } from '@/components/FocusedNavbar/FocusedNavbar'

const VALUE_PROPS = [
  {
    title: 'Open-Source, OTel-native, No lock-in.',
    description: 'OTel-native means your instrumentation stays yours, whatever you decide.',
  },
  {
    title: 'Pricing you can predict',
    description: '$0.30/GB logs & traces. $0.10/mn metrics. No per-host fees. No surprises.',
  },
  {
    title: 'Every signal in one place',
    description: 'Logs, metrics, traces, LLM observability — fully correlated.',
  },
  {
    title: 'First dashboard in under an hour',
    description: '100+ integrations with pre-built dashboards.',
  },
]

interface ErrorsProps {
  fullName?: string
  workEmail?: string
  companyName?: string
  termsOfService?: string
  apiError?: string
}

const ErrorState: React.FC<{ error: string }> = ({ error }) => {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-6 rounded-md border border-signoz_slate-500 bg-signoz_ink-400/30 p-4">
        <div className="text-sm">
          {error ||
            "We're sorry, it looks like something didn't go as planned. Please reach out to us for assistance."}
        </div>
      </div>

      <a
        className="flex w-full items-center justify-center gap-2 rounded-md bg-signoz_cherry-500 py-3 text-sm font-medium"
        href="mailto:cloud-support@signoz.io"
      >
        <span>Contact cloud support</span>
        <ArrowRight size={14} />
      </a>
    </div>
  )
}

interface SignupPayload {
  email: string
  region: { name: string }
  preferences: {
    terms_of_service_accepted: boolean
    opted_email_updates: boolean
  }
}

interface SocialSignupPayload {
  region: { name: string }
  preferences: {
    terms_of_service_accepted: boolean
    opted_email_updates: boolean
  }
  connector: string
}

interface SignupFormIsolatedProps {
  onSignup: (payload: SignupPayload) => Promise<void>
  onSocialSignup: (payload: SocialSignupPayload) => Promise<void>
  isSubmitting: boolean
  errors: ErrorsProps
  logEvent: (event: {
    eventType: 'track'
    eventName: string
    attributes: Record<string, unknown>
  }) => void
}

const SignupFormIsolated: React.FC<SignupFormIsolatedProps> = ({
  onSignup,
  onSocialSignup,
  isSubmitting,
  errors,
  logEvent,
}) => {
  const [formState, setFormState] = useState({
    workEmail: '',
    dataRegion: 'us',
    termsOfServiceAccepted: true,
  })
  const emailInputRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()
  const workEmailFromParams = searchParams.get('q')

  useEffect(() => {
    if (workEmailFromParams) {
      setFormState((prev) => ({
        ...prev,
        workEmail: decodeURIComponent(workEmailFromParams),
      }))
    }
  }, [workEmailFromParams])

  useEffect(() => {
    if (emailInputRef.current) emailInputRef.current.focus()
  }, [])

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target
    const newValue = type === 'checkbox' ? checked : value
    setFormState((prev) => ({ ...prev, [name]: newValue }))
  }, [])

  const handleRegionChange = useCallback(
    (selectedRegion: string) => {
      logEvent({
        eventType: 'track',
        eventName: 'Website Click',
        attributes: {
          location: 'Teams Page',
          clickType: 'Button Click',
          clickName: 'Region Select Button Click',
          clickLocation: 'Teams Form',
          clickText: 'Select Region',
          dataRegion: selectedRegion,
          termsOfServiceAccepted: formState.termsOfServiceAccepted,
          email: formState.workEmail,
          region: selectedRegion,
        },
      })
      setFormState((prev) => ({ ...prev, dataRegion: selectedRegion }))
    },
    [logEvent, formState.termsOfServiceAccepted, formState.workEmail]
  )

  const handleSubmit = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      logEvent({
        eventType: 'track',
        eventName: 'Website Click',
        attributes: {
          clickType: 'Button Click',
          clickName: 'Sign Up Button Click',
          clickLocation: 'Teams Form',
          clickText: 'Start Your Free Trial',
          email: formState.workEmail,
          dataRegion: formState.dataRegion,
        },
      })
      onSignup({
        email: formState.workEmail,
        region: { name: formState.dataRegion },
        preferences: {
          terms_of_service_accepted: formState.termsOfServiceAccepted,
          opted_email_updates: true,
        },
      })
    },
    [formState, onSignup, logEvent]
  )

  const handleSocialSubmit = useCallback(
    (connector: string) => {
      logEvent({
        eventType: 'track',
        eventName: 'Website Click',
        attributes: {
          clickType: 'Button Click',
          clickName: 'Social Sign Up Button Click',
          clickLocation: 'Teams Form',
          clickText: 'Start Your Free Trial',
          connector: connector,
          dataRegion: formState.dataRegion,
        },
      })
      onSocialSignup({
        region: { name: formState.dataRegion },
        preferences: {
          terms_of_service_accepted: formState.termsOfServiceAccepted,
          opted_email_updates: true,
        },
        connector: connector,
      })
    },
    [logEvent, formState.dataRegion, formState.termsOfServiceAccepted, onSocialSignup]
  )

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-medium text-white">Get started with SigNoz</h1>
        <p className="text-sm text-signoz_vanilla-100/70">
          Experience SigNoz with 30-day free trial. No credit card required.
        </p>
      </div>

      <div className="mb-8 space-y-6">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-signoz_vanilla-100" htmlFor="dataRegion">
            Data region{' '}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {REGIONS.map((region) => (
              <button
                type="button"
                key={region.id}
                className={`flex items-center justify-center gap-2 rounded-md border-2 border-solid p-2.5 text-sm transition-all duration-200
            ${
              region.id === formState.dataRegion
                ? 'border-signoz_robin-500 bg-signoz_robin-500/20 text-signoz_robin-400 shadow-lg shadow-signoz_robin-500/25 ring-2 ring-signoz_robin-500/30'
                : 'border-signoz_slate-400 bg-signoz_ink-300 text-signoz_vanilla-100/70 hover:border-signoz_slate-300 hover:bg-signoz_ink-200'
            }`}
                onClick={() => handleRegionChange(region.id)}
              >
                <Image
                  loading="lazy"
                  src={region.iconURL}
                  alt={`${region.name} flag`}
                  width={20}
                  height={20}
                />
                {region.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-center text-sm text-signoz_vanilla-100/70">
            Sign up with your work account
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-md border border-signoz_slate-400 bg-signoz_ink-400 px-4 py-3 text-sm font-medium text-white transition-colors hover:border-signoz_slate-400"
              onClick={() => handleSocialSubmit('google')}
            >
              <Image
                src="/img/icons/google-logo.svg"
                alt="Google logo"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              Continue with Google
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-md border border-signoz_slate-400 bg-signoz_ink-400 px-4 py-3 text-sm font-medium text-white transition-colors hover:border-signoz_slate-400"
              onClick={() => handleSocialSubmit('github')}
            >
              <FaGithub className="h-5 w-5" />
              Continue with GitHub
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex-1 border-t border-signoz_slate-400"></div>
          <span className="px-4 text-sm text-signoz_vanilla-100/50">Or use your work email</span>
          <div className="flex-1 border-t border-signoz_slate-400"></div>
        </div>
      </div>

      <form className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="workEmail" className="block text-sm font-medium text-signoz_vanilla-100">
            Email
          </label>
          <input
            type="email"
            id="workEmail"
            disabled={isSubmitting}
            name="workEmail"
            value={formState.workEmail}
            autoComplete="email"
            onChange={handleInputChange}
            placeholder="E.g. bart@simpsonmail.com"
            className="w-full rounded-md border border-signoz_slate-400 bg-signoz_ink-300 px-4 py-3 text-sm text-signoz_vanilla-100 placeholder-signoz_vanilla-100/50 focus:border-signoz_robin-500 focus:outline-none focus:ring-1 focus:ring-signoz_robin-500"
            ref={emailInputRef}
          />
          {errors?.workEmail && <div className="mt-1 text-xs text-red-400">{errors.workEmail}</div>}
        </div>

        <button
          disabled={isSubmitting}
          onClick={handleSubmit}
          type="submit"
          className={`flex w-full items-center justify-center rounded-md bg-signoz_robin-500 py-3 font-medium transition-colors hover:bg-signoz_robin-600 ${isSubmitting ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2 text-sm">
              Starting your free 30-day trial
              <Loader2 size={16} className="animate-spin" />
            </div>
          ) : (
            <span className="flex items-center gap-1.5 text-sm">
              Start Your Free Trial
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </button>

        <p className="text-center text-xs text-signoz_vanilla-100/50">
          By signing up, you agree to our{' '}
          <a
            href="https://signoz.io/terms-of-service/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-signoz_robin-500 hover:underline"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="https://signoz.io/privacy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-signoz_robin-500 hover:underline"
          >
            Privacy Policy
          </a>
          .
        </p>

        <div className="text-center">
          <p className="text-sm text-signoz_vanilla-100/70">
            Already have an account?{' '}
            <a
              href="https://signoz.io/login/"
              className="font-medium text-signoz_robin-500 hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}

const TeamsPage: React.FC = () => {
  const searchParams = useSearchParams()
  const authCode = searchParams.get('code')
  const ssoError = searchParams.get('has_sso_error')

  const {
    errors,
    isSubmitting,
    submitFailed,
    handleSignUp,
    handleSocialSignup,
    handleSocialSignupCallback,
    handleError,
    logEvent,
  } = useSignupForm({ source: 'teams' })

  useEffect(() => {
    if (authCode) handleSocialSignupCallback({ code: authCode })
  }, [authCode, handleSocialSignupCallback])

  useEffect(() => {
    if (ssoError) handleError()
  }, [handleError, ssoError])

  const formSection = (
    <div className="w-full">
      {(!isSubmitting && submitFailed) || ssoError ? (
        <ErrorState error={errors.apiError || ''} />
      ) : (
        <SignupFormIsolated
          onSignup={handleSignUp}
          onSocialSignup={handleSocialSignup}
          isSubmitting={isSubmitting}
          errors={errors}
          logEvent={logEvent}
        />
      )}
    </div>
  )

  return (
    <div className="ml-[calc(100%-100vw)] flex w-screen flex-col bg-signoz_ink-400">
      <FocusedNavbar />
      <div className="mx-auto flex w-full max-w-[1440px] flex-col lg:mt-[8px] lg:h-[calc(100vh-56px)] lg:flex-row">
        {/* Left section — copy + checkmarks + logos (desktop only) */}
        <div className="hidden w-full flex-col justify-center p-8 lg:flex lg:w-5/12 lg:py-12 lg:pl-[72px] lg:pr-14">
          <div className="flex max-w-[420px] flex-col gap-8">
            {/* Headline */}
            <h1 className="text-[36px] font-bold leading-[1.2] tracking-[-1px] text-white">
              One Stop Observability
              <br />
              at Scale
            </h1>

            {/* Value props */}
            <div className="flex flex-col gap-3">
              {VALUE_PROPS.map((prop) => (
                <div key={prop.title} className="flex items-start gap-2.5">
                  <CheckCircle className="mt-[3px] h-3.5 w-3.5 flex-shrink-0 text-signoz_forest-500" />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-semibold leading-[1.4] text-white">
                      {prop.title}
                    </span>
                    <span className="text-[13px] leading-[1.5] text-gray-500">
                      {prop.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust bar */}
            <div className="flex flex-col gap-3">
              <p className="mb-0 text-[11px] font-semibold uppercase tracking-[1.2px] text-gray-500">
                Trusted by
              </p>
              <div className="grid grid-cols-3 gap-x-12 gap-y-6 opacity-60">
                {TRUST_BAR_LOGOS.map((logo) => (
                  <Image
                    key={logo.src}
                    src={logo.src}
                    alt={logo.alt}
                    width={100}
                    height={28}
                    className="h-6 w-[88px] object-contain"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:flex lg:items-center lg:py-16">
          <div className="h-full w-px bg-signoz_slate-400" />
        </div>

        {/* Right section — sign up form */}
        <div className="relative flex w-full flex-col items-center justify-center p-8 pt-[calc(56px+5vh)] lg:w-7/12 lg:px-16 lg:py-14">
          <div className="w-full max-w-[560px] rounded-[12px] border border-signoz_slate-400 bg-signoz_ink-500 px-10 py-10">
            {formSection}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamsPage
