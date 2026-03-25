'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { ArrowRight, Loader2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLogEvent } from '../../hooks/useLogEvent'
import {
  createSubmissionRelayId,
  sendSubmissionRelayInBackground,
} from '@/utils/submissionRelayClient'
import { FaGithub } from 'react-icons/fa'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  prefillEmail?: string
  experimentId?: string
  variantId?: string
}

interface ErrorsProps {
  workEmail?: string
  termsOfService?: string
  apiError?: string
}

const regions = [
  { name: 'United States', id: 'us', iconURL: '/svgs/icons/us.svg' },
  { name: 'Europe', id: 'eu', iconURL: '/svgs/icons/eu.svg' },
  { name: 'India', id: 'in', iconURL: '/svgs/icons/india.svg' },
]

const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onClose,
  prefillEmail = '',
  experimentId,
  variantId,
}) => {
  const [formState, setFormState] = useState({
    workEmail: prefillEmail,
    dataRegion: 'us',
    termsOfServiceAccepted: true,
  })
  const [errors, setErrors] = useState<ErrorsProps>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitFailed, setSubmitFailed] = useState(false)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const logEvent = useLogEvent()

  // Update email when prefillEmail changes
  useEffect(() => {
    if (prefillEmail) {
      setFormState((prev) => ({ ...prev, workEmail: prefillEmail }))
    }
  }, [prefillEmail])

  // Focus email input when modal opens
  useEffect(() => {
    if (isOpen && emailInputRef.current) {
      setTimeout(() => emailInputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    logEvent({
      eventType: 'track',
      eventName: 'Website Click',
      attributes: {
        clickType: 'Button Click',
        clickName: 'Signup Modal Close',
        clickLocation: 'Hero Section',
        clickText: 'Close Modal',
      },
    })
    onClose()
  }, [logEvent, onClose])

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
          clickType: 'Button Click',
          clickName: 'Region Select Button Click',
          clickLocation: 'Signup Modal',
          clickText: 'Select Region',
          dataRegion: selectedRegion,
          email: formState.workEmail,
          region: selectedRegion,
        },
      })
      setFormState((prev) => ({ ...prev, dataRegion: selectedRegion }))
    },
    [logEvent, formState.workEmail]
  )

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleGTMCustomEventTrigger = useCallback((payload: Record<string, any>) => {
    if (window && (window as any).dataLayer && Array.isArray((window as any).dataLayer)) {
      ;(window as any).dataLayer.push({
        event: 'signoz-cloud-signup-form-submit',
        ...payload,
      })
    }
    localStorage.setItem('prevSignupEmail', payload.email)
  }, [])

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault()
      setSubmitFailed(false)

      const newErrors: ErrorsProps = {}
      if (!formState.workEmail.trim()) {
        newErrors.workEmail = 'Work email is required'
      } else if (!isValidEmail(formState.workEmail)) {
        newErrors.workEmail = 'Please enter a valid company email'
      }
      if (!formState.termsOfServiceAccepted) {
        newErrors.termsOfService = 'You must accept the Terms of Service to continue'
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        logEvent({
          eventType: 'track',
          eventName: 'Teams Page Sign Up Validation Failed',
          attributes: { errors: newErrors, email: formState.workEmail },
        })
        return
      }

      setErrors({})
      setIsSubmitting(true)

      logEvent({
        eventType: 'track',
        eventName: 'Website Click',
        attributes: {
          clickType: 'Button Click',
          clickName: 'Sign Up Button Click',
          clickLocation: 'Signup Modal',
          clickText: 'Start Your Free Trial',
          email: formState.workEmail,
          dataRegion: formState.dataRegion,
          experiment_id: experimentId,
          variant_id: variantId,
          is_experiment_conversion: true,
        },
      })

      const payload = {
        email: formState.workEmail,
        region: { name: formState.dataRegion },
        preferences: {
          terms_of_service_accepted: formState.termsOfServiceAccepted,
          opted_email_updates: true,
        },
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONTROL_PLANE_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (response.ok) {
          handleGTMCustomEventTrigger(payload)
          localStorage.setItem('app_user_id', payload.email)

          logEvent({
            eventType: 'identify',
            eventName: 'User Signed Up',
            attributes: {
              email: payload.email,
              dataRegion: payload.region.name,
              method: 'email_signup',
            },
          })

          const domain = payload.email.split('@')[1] || 'unknown_domain'
          logEvent({
            eventType: 'group',
            eventName: 'User Associated with Company',
            groupId: domain,
            attributes: { domain },
          })

          logEvent({
            eventType: 'track',
            eventName: 'SignUp Form Submitted',
            attributes: {
              email: payload.email,
              dataRegion: payload.region.name,
              location: 'Signup Modal',
              method: 'email_signup',
              experiment_id: experimentId,
              variant_id: variantId,
              is_experiment_conversion: true,
            },
          })

          localStorage.setItem('workEmail', payload.email)
          localStorage.setItem('region', payload.region.name)

          sendSubmissionRelayInBackground({
            email: payload.email,
            signupId: createSubmissionRelayId('homepage-modal-email'),
            source: 'homepage-modal-email-signup',
            createdAt: new Date().toISOString(),
            pageLocation: window.location.pathname,
            dataRegion: payload.region.name,
            method: 'email_signup',
          })

          router.push('/verify-email')
        } else {
          const errorData = await response.json()
          logEvent({
            eventType: 'track',
            eventName: 'Teams Page Sign Up API Error',
            attributes: {
              error: errorData.error,
              status: response.status,
              email: payload.email,
              region: payload.region.name,
            },
          })
          setErrors({ apiError: errorData.error })
          setSubmitFailed(true)
        }
      } catch (error) {
        logEvent({
          eventType: 'track',
          eventName: 'Teams Page Sign Up Exception',
          attributes: {
            errorMessage: error instanceof Error ? error.message : String(error),
            email: payload.email,
          },
        })
        setSubmitFailed(true)
      } finally {
        setIsSubmitting(false)
      }
    },
    [formState, logEvent, router, handleGTMCustomEventTrigger]
  )

  const handleSocialSubmit = useCallback(
    (connector: string) => {
      if (!formState.termsOfServiceAccepted) {
        setErrors({ termsOfService: 'You must accept the Terms of Service to continue' })
        return
      }

      logEvent({
        eventType: 'track',
        eventName: 'Teams Page Social Signup Redirect Initiated',
        attributes: {
          connector,
          region: formState.dataRegion,
          clickLocation: 'Signup Modal',
        },
      })

      localStorage.setItem('region', formState.dataRegion)
      window.location.href = `${process.env.NEXT_PUBLIC_CONTROL_PLANE_URL}/connectors/${connector}/url`
    },
    [formState, logEvent]
  )

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        ref={modalRef}
        className="relative mx-4 w-full max-w-md rounded-2xl border border-signoz_slate-200 bg-signoz_ink-400 p-8 shadow-2xl md:mx-0 md:p-10"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-signoz_vanilla-400 transition-colors hover:bg-signoz_slate-400 hover:text-signoz_vanilla-100"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="mb-1 text-xl font-semibold text-white">Get Started for Free</h2>
          <p className="text-sm text-signoz_vanilla-400">
            No credit card required. Start your free 30-day trial.
          </p>
        </div>

        {/* Error state */}
        {submitFailed && (
          <div className="mb-4 rounded-md border border-signoz_cherry-500/30 bg-signoz_cherry-500/10 p-3">
            <p className="text-sm text-signoz_cherry-500">
              {errors.apiError ||
                'Something went wrong. Please try again or contact cloud-support@signoz.io'}
            </p>
          </div>
        )}

        {/* Region selection */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-signoz_vanilla-100">
            Data region
          </label>
          <div className="grid grid-cols-3 gap-2">
            {regions.map((region) => (
              <button
                type="button"
                key={region.id}
                className={`flex items-center justify-center gap-1.5 rounded-lg border-2 border-solid p-2.5 text-sm transition-all ${
                  region.id === formState.dataRegion
                    ? 'border-signoz_robin-500 bg-signoz_robin-500/20 text-signoz_robin-400'
                    : 'border-signoz_slate-400 bg-signoz_ink-300 text-signoz_vanilla-400 hover:border-signoz_slate-300'
                }`}
                onClick={() => handleRegionChange(region.id)}
              >
                <Image
                  loading="lazy"
                  src={region.iconURL}
                  alt={`${region.name} flag`}
                  width={18}
                  height={18}
                />
                {region.name}
              </button>
            ))}
          </div>
        </div>

        {/* Social signup */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2.5 rounded-lg border border-signoz_slate-400 bg-signoz_ink-300 px-4 py-3 text-sm font-medium text-signoz_vanilla-400 transition-colors hover:bg-signoz_ink-200"
            onClick={() => handleSocialSubmit('github')}
          >
            <FaGithub className="h-4 w-4" />
            GitHub
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2.5 rounded-lg border border-blue-600 bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            onClick={() => handleSocialSubmit('google')}
          >
            <Image
              src="/img/icons/google-logo.svg"
              alt="Google logo"
              width={16}
              height={16}
              className="h-4 w-4"
            />
            Google
          </button>
        </div>

        {/* Divider */}
        <div className="mb-5 flex items-center">
          <div className="flex-1 border-t border-signoz_slate-400"></div>
          <span className="px-3 text-xs text-signoz_vanilla-400">or</span>
          <div className="flex-1 border-t border-signoz_slate-400"></div>
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="modal-workEmail"
              className="mb-1.5 block text-sm font-medium text-signoz_vanilla-100"
            >
              Work email
            </label>
            <input
              type="email"
              id="modal-workEmail"
              name="workEmail"
              disabled={isSubmitting}
              value={formState.workEmail}
              autoComplete="email"
              onChange={handleInputChange}
              placeholder="E.g. bart@simpsonmail.com"
              className="w-full rounded-lg border border-signoz_slate-400 bg-signoz_ink-300 px-4 py-3 text-sm text-signoz_vanilla-100 placeholder-signoz_vanilla-400 focus:border-signoz_robin-500 focus:outline-none focus:ring-1 focus:ring-signoz_robin-500"
              ref={emailInputRef}
            />
            {errors?.workEmail && <p className="mt-1 text-xs text-red-400">{errors.workEmail}</p>}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className={`flex w-full items-center justify-center rounded-lg bg-signoz_robin-500 py-3 font-medium transition-colors hover:bg-signoz_robin-600 ${
              isSubmitting ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2 text-sm">
                Starting your free 30-day trial
                <Loader2 size={16} className="animate-spin" />
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-sm">
                Start Your Free Trial
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </button>

          {/* Terms */}
          <div className="flex items-start gap-2.5">
            <input
              type="checkbox"
              id="modal-termsOfServiceAccepted"
              name="termsOfServiceAccepted"
              checked={formState.termsOfServiceAccepted}
              onChange={handleInputChange}
              className="mt-0.5 h-4 w-4 rounded border border-signoz_slate-400 bg-signoz_ink-300 accent-signoz_robin-500"
            />
            <label
              htmlFor="modal-termsOfServiceAccepted"
              className="text-xs leading-relaxed text-signoz_vanilla-400"
            >
              I agree to the{' '}
              <a
                href="https://signoz.io/terms-of-service/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-signoz_robin-500 hover:underline"
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href="https://signoz.io/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-signoz_robin-500 hover:underline"
              >
                Privacy Policy
              </a>
            </label>
          </div>
          {errors?.termsOfService && (
            <p className="text-xs text-red-400">{errors.termsOfService}</p>
          )}
        </form>

        {/* Sign in link */}
        <div className="mt-4 border-t border-signoz_slate-400 pt-4 text-center">
          <p className="text-sm text-signoz_vanilla-400">
            Already have an account?{' '}
            <a
              href="https://signoz.io/login/"
              className="font-medium text-signoz_robin-500 hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupModal
