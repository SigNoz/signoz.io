'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { ArrowRight, Loader2, X } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { useSignupForm } from '@/hooks/useSignupForm'
import { useLogEvent } from '@/hooks/useLogEvent'
import { REGIONS } from '@/constants/regions'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  prefillEmail?: string
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, prefillEmail = '' }) => {
  const [formState, setFormState] = useState({
    workEmail: prefillEmail,
    dataRegion: 'us',
    termsOfServiceAccepted: true,
  })
  const emailInputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const logEvent = useLogEvent()

  const { errors, isSubmitting, submitFailed, handleSignUp, handleSocialSignup } = useSignupForm({
    source: 'homepage-modal',
  })

  // Update email when prefillEmail changes
  useEffect(() => {
    setFormState((prev) => ({ ...prev, workEmail: prefillEmail }))
  }, [prefillEmail])

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
  }, [isOpen, handleClose])

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

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()

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
        },
      })

      handleSignUp({
        email: formState.workEmail,
        region: { name: formState.dataRegion },
        preferences: {
          terms_of_service_accepted: formState.termsOfServiceAccepted,
          opted_email_updates: true,
        },
      })
    },
    [formState, logEvent, handleSignUp]
  )

  const handleSocialSubmit = useCallback(
    (connector: string) => {
      handleSocialSignup({
        region: { name: formState.dataRegion },
        preferences: {
          terms_of_service_accepted: formState.termsOfServiceAccepted,
          opted_email_updates: true,
        },
        connector,
      })
    },
    [formState, handleSocialSignup]
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
        className="relative mx-4 w-full max-w-lg rounded-2xl border border-signoz_slate-200 bg-signoz_ink-400 p-8 shadow-2xl md:mx-0 md:p-10"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close signup modal"
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
            <p className="mb-0 text-sm text-signoz_cherry-500">
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
            {REGIONS.map((region) => (
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
          <p className="mb-0 text-sm text-signoz_vanilla-400">
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
