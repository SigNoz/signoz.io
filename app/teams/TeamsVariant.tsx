'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Loader2, ExternalLink } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLogEvent } from '../../hooks/useLogEvent'
import TrackingLink from '@/components/TrackingLink'
import { FaGithub, FaGoogle } from 'react-icons/fa'

interface ErrorsProps {
  fullName?: string
  workEmail?: string
  companyName?: string
  termsOfService?: string
  apiError?: string
}

interface FormState {
  fullName: string
  workEmail: string
  companyName: string
  dataRegion: string
  source: string
  termsOfServiceAccepted: boolean
}

interface Region {
  name: string
  id: string
  iconURL: string
}

// Variant Navbar component (now integrated into layout)
export const VariantNavbar = ({ className }: { className?: string }) => {
  return (
    <div
      className={`fixed left-0 right-0 top-0 z-[30] mx-auto flex h-[56px] w-full items-center text-signoz_vanilla-100 backdrop-blur-[20px] ${className}`}
    >
      <div className="bg-signoz_ink-600 flex h-full w-full items-center px-4 md:pl-12 lg:w-5/12 lg:pl-16">
        <div className="flex justify-start">
          <Link href="/" className="-m-1.5 flex items-center gap-2 p-1.5">
            <Image
              className="h-5 w-auto"
              src="/img/SigNozLogo-orange.svg"
              width={160}
              height={60}
              alt="SigNoz Logo"
            />
            <span className="text-[17.111px] font-medium">SigNoz</span>
          </Link>
        </div>
      </div>
      <div className="hidden h-full items-center justify-end bg-signoz_ink-300 px-4 md:pr-12 lg:flex lg:w-7/12 lg:pr-16">
        <TrackingLink
          target="_blank"
          clickType="Nav Click"
          clickName="Docs Link"
          clickLocation="teams_variant"
          clickText="Documentation"
          href="/docs"
          className="flex items-center truncate px-1.5 py-1 text-sm font-normal text-gray-400 hover:text-signoz_robin-500"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Documentation
        </TrackingLink>
        <TrackingLink
          target="_blank"
          clickType="Nav Click"
          clickName="Pricing Link"
          clickLocation="teams_variant"
          clickText="Pricing"
          href="/pricing/"
          className="flex items-center truncate px-1.5 py-1 text-sm font-normal text-gray-400 hover:text-signoz_robin-500"
        >
          Pricing
        </TrackingLink>
      </div>
      <div className="bg-signoz_ink-600 flex h-full items-center justify-end px-4 md:px-8 lg:hidden">
        <TrackingLink
          target="_blank"
          clickType="Nav Click"
          clickName="Docs Link"
          clickLocation="teams_variant"
          clickText="Docs"
          href="/docs"
          className="flex items-center truncate px-1.5 py-1 text-sm font-normal text-gray-400 hover:text-signoz_robin-500"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Docs
        </TrackingLink>
      </div>
    </div>
  )
}

// Error state component
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
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-md bg-signoz_cherry-500 py-3 text-sm font-medium"
        href="mailto:cloud-support@signoz.io"
      >
        <span>Contact cloud support</span>
        <ArrowRight size={14} />
      </a>
    </div>
  )
}

// Testimonial component
const testimonials = [
  {
    quote:
      'With SigNoz in place, I was able to pinpoint why, how, and exactly what was going wrong in no time.',
    author: 'Nate Bohman, Senior DevOps Engineer, Blip',
    avatar: '/img/case_study/profile-photos/blip.webp',
    url: '/case-study/blip/',
  },
  {
    quote:
      "We've been using SigNoz since 2023 in production, been great to see the product keep on improving and growing.",
    author: 'Alexei Z., Senior Software Engineer, Uken Games',
    avatar: '/img/case_study/profile-photos/uken.webp',
    url: 'https://www.linkedin.com/posts/activity-7329258209225900034-ez5Z',
  },
  {
    quote:
      'SigNoz has been a huge help with a smooth experience, prompt and effective technical support by devs.',
    author: 'Avneesh Kumar, VP of Engineering at Mailmodo',
    avatar: '/img/case_study/profile-photos/mailmodo.webp',
    url: '/case-study/mailmodo/',
  },
  {
    quote:
      "We use SigNoz daily—it's open in more than half my tabs and is vital to our operations.",
    author: 'Khushhal Reddy, Senior Backend Engineer, Kiwi',
    avatar: '/img/case_study/profile-photos/kiwi.webp',
    url: '/case-study/kiwi/',
  },
  {
    quote: 'SigNoz has elevated our software quality and keeps our customers delighted.',
    author: 'Charlie Shen, Lead DevOps Engineer, Brainfish',
    avatar: '/img/case_study/profile-photos/brainfish.webp',
    url: '/case-study/brainfish/',
  },
]

const DISPLAY_DURATION = 4000 // 4 seconds exactly

const Testimonial: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const startTimeRef = useRef<number | null>(null)
  const timerRef = useRef<number | null>(null)

  // Use a simpler, more reliable approach with setInterval for linear progress
  useEffect(() => {
    // Reset progress on testimonial change
    setProgress(0)
    startTimeRef.current = Date.now()

    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    // Update progress every 50ms for smooth animation
    const updateInterval = 50 // ms
    timerRef.current = window.setInterval(() => {
      if (!startTimeRef.current) return

      const elapsed = Date.now() - startTimeRef.current
      const newProgress = (elapsed / DISPLAY_DURATION) * 100

      if (newProgress >= 100) {
        // Complete this testimonial and move to next
        setProgress(100)
        clearInterval(timerRef.current as number)

        // Small delay before next testimonial
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
        }, 100)
      } else {
        setProgress(newProgress)
      }
    }, updateInterval)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [currentIndex])

  const currentTestimonial = testimonials[currentIndex]

  // Handle display for large number of testimonials
  // Only show a maximum of 5 indicators, with the current one in the middle when possible
  const getIndicatorsToShow = () => {
    if (testimonials.length <= 5) {
      return testimonials.map((_, i) => i)
    }

    // Sliding window of 5 indicators, with current in the middle when possible
    let start = Math.max(0, currentIndex - 2)
    let end = Math.min(testimonials.length - 1, start + 4)

    // Adjust if we're at the end
    if (end === testimonials.length - 1 && end - start < 4) {
      start = Math.max(0, end - 4)
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const indicatorsToShow = getIndicatorsToShow()

  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="relative flex h-[calc(100vh-56px)] max-w-md flex-col items-center justify-center p-8">
      <blockquote className="space-y-6 border-0">
        <div className="text-4xl text-signoz_vanilla-100/30">"</div>
        <p className="text-2xl font-medium text-signoz_vanilla-100">{currentTestimonial.quote}</p>
        <footer className="flex items-center space-x-4 pt-4">
          <Image
            src={currentTestimonial.avatar}
            alt={currentTestimonial.author}
            className="h-12 w-12 rounded-full"
            width={48}
            height={48}
          />
          <div>
            <TrackingLink
              href={currentTestimonial.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium text-signoz_robin-500"
              clickType="Nav Click"
              clickName="Testimonial Author Click"
              clickLocation="teams_variant"
              clickText={currentTestimonial.author}
            >
              {currentTestimonial.author}
            </TrackingLink>
          </div>
        </footer>
      </blockquote>

      {/* Progress indicators with linear fill */}
      <div className="absolute bottom-0 left-0 right-0 mb-6 flex justify-center gap-1.5">
        {indicatorsToShow.map((index) => (
          <div
            key={index}
            className={cn(
              'h-[4px] overflow-hidden rounded-full transition-all duration-300',
              index === currentIndex ? 'w-12' : 'w-3',
              'bg-signoz_vanilla-100/20'
            )}
          >
            <div
              className={cn(
                'h-full bg-signoz_robin-500',
                index === currentIndex
                  ? 'opacity-100'
                  : index < currentIndex
                    ? 'opacity-60'
                    : 'opacity-0',
                // Remove transition for current item to avoid stuttering
                index === currentIndex ? '' : 'transition-all duration-100'
              )}
              style={{
                width:
                  index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
              }}
            />
          </div>
        ))}

        {/* If we're using a sliding window, show ellipsis indicators */}
        {testimonials.length > 5 && indicatorsToShow[0] > 0 && (
          <div className="mx-1 h-[4px] w-1.5 rounded-full bg-signoz_vanilla-100/30" />
        )}

        {testimonials.length > 5 &&
          indicatorsToShow[indicatorsToShow.length - 1] < testimonials.length - 1 && (
            <div className="mx-1 h-[4px] w-1.5 rounded-full bg-signoz_vanilla-100/30" />
          )}
      </div>
    </div>
  )
}

// Define regions
const regions = [
  {
    name: 'United States',
    id: 'us',
    iconURL: '/svgs/icons/us.svg',
  },
  {
    name: 'Europe',
    id: 'eu',
    iconURL: '/svgs/icons/eu.svg',
  },
  {
    name: 'India',
    id: 'in',
    iconURL: '/svgs/icons/india.svg',
  },
]

// Completely isolated signup form component with its own state management
const SignupFormIsolated: React.FC<{
  onSignup: (payload: any) => Promise<void>
  onSocialSignup: (payload: any) => Promise<void>
  isSubmitting: boolean
  errors: ErrorsProps
  logEvent: (event: any) => void
}> = ({ onSignup, onSocialSignup, isSubmitting, errors, logEvent }) => {
  const [formState, setFormState] = useState({
    workEmail: '',
    dataRegion: 'us',
    termsOfServiceAccepted: true,
  })
  const emailInputRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()
  const workEmailFromParams = searchParams.get('q')

  // Set the work email from the URL params to the form data
  useEffect(() => {
    if (workEmailFromParams) {
      setFormState((prev) => ({
        ...prev,
        workEmail: decodeURIComponent(workEmailFromParams),
      }))
    }
  }, [workEmailFromParams])

  // Focus email input when component mounts
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus()
    }
  }, [])

  const handleInputChange = useCallback((event) => {
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
    [logEvent]
  )

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()

      // Log click event for debugging
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
        region: {
          name: formState.dataRegion,
        },
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
      // Log click event for debugging
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
        region: {
          name: formState.dataRegion,
        },
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
            {regions.map((region) => (
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
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-3 rounded-md border border-blue-600 bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              onClick={() => handleSocialSubmit('google')}
            >
              <Image
                src="/img/icons/google-logo.svg"
                alt="Google logo"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-3 rounded-md border border-signoz_slate-400 bg-signoz_ink-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-signoz_ink-400"
              onClick={() => handleSocialSubmit('github')}
            >
              <FaGithub className="h-5 w-5" />
              GitHub
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

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="termsOfServiceAccepted"
              name="termsOfServiceAccepted"
              checked={formState.termsOfServiceAccepted}
              onChange={handleInputChange}
              className="mt-1 h-4 w-4 rounded border border-signoz_slate-400 bg-signoz_ink-300 accent-signoz_robin-500"
            />
            <label
              htmlFor="termsOfServiceAccepted"
              className="text-xs leading-relaxed text-signoz_vanilla-100/70"
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
              .
            </label>
          </div>
          {errors?.termsOfService && (
            <div className="text-xs text-red-400">{errors.termsOfService}</div>
          )}
        </div>

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

// TeamsVariant component with its own state management
const TeamsVariant: React.FC = () => {
  const [errors, setErrors] = useState<ErrorsProps>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [_, setSubmitSuccess] = useState(false)
  const [submitFailed, setSubmitFailed] = useState(false)
  const router = useRouter()
  const logEvent = useLogEvent()
  const searchParams = useSearchParams()
  const authCode = searchParams.get('code')
  const ssoError = searchParams.get('has_sso_error')

  const isValidEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePayload = useCallback(
    (payload) => {
      let newErrors = {}

      if (!payload.email.trim()) {
        newErrors['workEmail'] = 'Work email is required'
      } else if (!isValidEmail(payload.email)) {
        newErrors['workEmail'] = 'Please enter a valid company email'
      }

      if (!payload.preferences.terms_of_service_accepted) {
        newErrors['termsOfService'] = 'You must accept the Terms of Service to continue'
      }

      const isValid = Object.keys(newErrors).length === 0

      if (!isValid) {
        logEvent({
          eventType: 'track',
          eventName: 'Teams Page Sign Up Validation Failed',
          attributes: {
            errors: newErrors,
            email: payload.email,
          },
        })
      }

      setErrors(newErrors)
      return isValid
    },
    [logEvent]
  )

  const validateSocialSignupPayload = useCallback(
    (payload) => {
      let newErrors = {}
      if (!payload.preferences.terms_of_service_accepted) {
        newErrors['termsOfService'] = 'You must accept the Terms of Service to continue'
      }

      const isValid = Object.keys(newErrors).length === 0

      if (!isValid) {
        logEvent({
          eventType: 'track',
          eventName: 'Teams Page Social Sign Up Validation Failed',
          attributes: {
            errors: newErrors,
            connector: payload.connector,
          },
        })
      }

      setErrors(newErrors)
      return isValid
    },
    [logEvent]
  )

  const handleError = useCallback(() => {
    setSubmitFailed(true)
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    })
  }, [])

  const handleGTMCustomEventTrigger = useCallback((payload) => {
    if (window && (window as any).dataLayer && Array.isArray((window as any).dataLayer)) {
      ;(window as any).dataLayer.push({
        event: 'signoz-cloud-signup-form-submit',
        ...payload,
      })
    }
    // Store current email for future comparison
    localStorage.setItem('prevSignupEmail', payload.email)
  }, [])

  const handleSignUp = useCallback(
    async (payload) => {
      setSubmitFailed(false)
      const isValid = validatePayload(payload)

      if (!isValid) return

      setIsSubmitting(true)

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONTROL_PLANE_URL}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        if (response.ok) {
          setSubmitSuccess(true)
          handleGTMCustomEventTrigger(payload)

          // Set user ID in local storage *before* logging events
          localStorage.setItem('app_user_id', payload.email)

          // --- Segment Identify Call ---
          logEvent({
            eventType: 'identify',
            eventName: 'User Signed Up', // Optional: Add an event name for clarity
            attributes: {
              // These become Segment traits
              email: payload.email,
              dataRegion: payload.region.name,
              method: 'email_signup',
            },
          })

          // --- Segment Group Call ---
          const domain = payload.email.split('@')[1] || 'unknown_domain'
          logEvent({
            eventType: 'group',
            eventName: 'User Associated with Company', // Optional: Add an event name
            groupId: domain,
            attributes: {
              // These become Group traits
              domain: domain,
            },
          })
          // --- End Segment Calls ---

          localStorage.setItem('workEmail', payload.email)
          localStorage.setItem('region', payload.region.name)

          router.push('/verify-email')
        } else {
          // To do, handle other errors apart from invalid email
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

          setErrors({
            apiError: errorData.error,
          })
          handleError()
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
        handleError()
      } finally {
        setIsSubmitting(false)
      }
    },
    [handleError, handleGTMCustomEventTrigger, logEvent, router, validatePayload]
  )

  const handleSocialSignup = useCallback(
    async (payload) => {
      setSubmitFailed(false)
      if (!validateSocialSignupPayload(payload)) {
        return
      }
      setIsSubmitting(true)

      logEvent({
        eventType: 'track',
        eventName: 'Teams Page Social Signup Redirect Initiated',
        attributes: {
          connector: payload.connector,
          region: payload.region.name,
        },
      })

      localStorage.setItem('region', payload.region.name)
      window.location.href = `${process.env.NEXT_PUBLIC_CONTROL_PLANE_URL}/connectors/${payload.connector}/url`
    },
    [validateSocialSignupPayload, logEvent]
  )

  const handleSocialSignupCallback = useCallback(
    async (payload) => {
      setSubmitFailed(false)
      setIsSubmitting(true)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CONTROL_PLANE_URL}/connectors/me/users`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          }
        )

        if (response.ok) {
          const responseData = await response.json()

          const data_region = localStorage.getItem('region')
          setSubmitSuccess(true)
          handleGTMCustomEventTrigger({ ...responseData?.data, region: data_region })

          // Set user ID in local storage *before* logging events
          localStorage.setItem('app_user_id', responseData.data.email)

          // --- Segment Identify Call ---
          logEvent({
            eventType: 'identify',
            eventName: 'User Signed Up', // Optional: Add an event name for clarity
            attributes: {
              // These become Segment traits
              email: responseData.data.email,
              dataRegion: data_region,
              method: 'social_signup',
            },
          })

          // --- Segment Group Call ---
          const domain = responseData.data.email.split('@')[1] || 'unknown_domain'
          logEvent({
            eventType: 'group',
            eventName: 'User Associated with Company', // Optional: Add an event name
            groupId: domain,
            attributes: {
              // These become Group traits
              domain: domain,
            },
          })
          // --- End Segment Calls ---

          router.push(
            `/users?email=${encodeURIComponent(responseData.data.email)}&code=${responseData.data.code}&region=${data_region}`
          )
        } else {
          const errorData = await response.json()

          logEvent({
            eventName: 'Social Signup Error',
            eventType: 'track',
            attributes: {
              errorData: errorData,
              errorType: 'API Error',
              status: response.status,
              ...payload,
            },
          })

          setErrors({
            apiError: errorData.error,
          })
          handleError()
        }
      } catch (error) {
        logEvent({
          eventName: 'Social Signup Error',
          eventType: 'track',
          attributes: {
            errorType: 'Catch Block Error',
            error,
            errorMessage: error instanceof Error ? error.message : String(error),
            ...payload,
          },
        })

        handleError()
      } finally {
        setIsSubmitting(false)
      }
    },
    [handleError, handleGTMCustomEventTrigger, logEvent, router]
  )

  useEffect(() => {
    if (authCode) {
      handleSocialSignupCallback({ code: authCode })
    }
  }, [authCode, handleSocialSignupCallback])

  useEffect(() => {
    if (ssoError) {
      handleError()
    }
  }, [handleError, ssoError])

  return (
    <div className="variant-teams-container bg-signoz_ink-600 flex flex-col">
      <VariantNavbar />

      <div className="flex h-[calc(100vh-56px)] flex-col lg:flex-row">
        {/* Left section - Sign up form */}
        <div className="bg-signoz_ink-600 relative flex w-full flex-col p-8 pt-[calc(56px+5vh)] lg:w-5/12 lg:p-12 lg:pt-[calc(56px+5vh)]">
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

          <div className="absolute bottom-4 left-0 right-0 hidden text-center lg:block [@media(max-height:790px)]:lg:hidden">
            <p className="flex justify-around px-8 text-xs text-signoz_vanilla-100/60">
              <span>OpenTelemetry Native.</span>
              <span>Unfied Signals.</span>
              <span>Predictable Pricing.</span>
            </p>
          </div>
        </div>

        {/* Right section - Testimonials */}
        <div className="relative hidden border-l border-signoz_slate-500 bg-signoz_ink-300 lg:flex lg:w-7/12">
          <div className="flex w-full items-center justify-center">
            <Testimonial />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamsVariant
