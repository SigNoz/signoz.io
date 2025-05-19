'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Loader2, ExternalLink } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLogEvent } from '../../hooks/useLogEvent'
import { ExperimentTracker } from '@/components/ExperimentTracker'
import { EXPERIMENTS } from '@/constants/experiments'
import TrackingLink from '@/components/TrackingLink'
import { Tooltip } from '@nextui-org/react'

interface ErrorsProps {
  fullName?: string
  workEmail?: string
  companyName?: string
  termsOfService?: string
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
export const VariantNavbar = () => {
  return (
    <div className="fixed left-0  right-0 top-0 z-[30] mx-auto flex h-[56px] w-full items-center text-signoz_vanilla-100 backdrop-blur-[20px]">
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
const ErrorState: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-6 rounded-md border border-signoz_slate-500 bg-signoz_ink-400/30 p-4">
        <div className="text-sm">
          We're sorry, it looks like something didn't go as planned. Please reach out to us for
          assistance.
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
      'Setup was a breeze—we had the OpenTelemetry collector running and monitoring in no time.',
    author: 'Niranjan Ravichandra, Co-founder & CTO, Cedana',
    avatar: '/img/case_study/profile-photos/cedana.webp',
    url: '/case-study/cedana/',
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
    <div className="relative flex h-full max-w-md flex-col items-center justify-center p-8">
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
  isSubmitting: boolean
  errors: ErrorsProps
}> = ({ onSignup, isSubmitting, errors }) => {
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

  const handleRegionChange = useCallback((selectedRegion: string) => {
    setFormState((prev) => ({ ...prev, dataRegion: selectedRegion }))
  }, [])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
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
    [formState, onSignup]
  )

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="mb-1 text-2xl font-medium text-white">Get started with SigNoz</h1>
      <p className="mb-10 text-sm text-signoz_vanilla-100/70">
        Experience SigNoz with 30-day free trial. No credit card required.
      </p>

      <form className="space-y-7">
        <div className="mb-4 space-y-1">
          <label htmlFor="workEmail" className="mb-1 block text-sm font-medium">
            Work Email
          </label>
          <input
            type="email"
            id="workEmail"
            disabled={isSubmitting}
            name="workEmail"
            value={formState.workEmail}
            autoComplete="off"
            onChange={handleInputChange}
            placeholder="E.g. bart@simpsonmail.com"
            className="w-full rounded-md border border-signoz_slate-400 bg-signoz_ink-300 px-3 py-2.5 text-sm text-stone-300"
            ref={emailInputRef}
          />

          {errors?.workEmail && <div className="mt-1 text-xs text-red-400">{errors.workEmail}</div>}
        </div>

        <div className="space-y-2">
          <label className="mb-1 block text-sm font-medium" htmlFor="dataRegion">
            Data region
          </label>

          <div className="grid grid-cols-3 gap-3">
            {regions.map((region) => (
              <button
                type="button"
                key={region.id}
                className={`flex items-center justify-center gap-2 rounded-md border border-solid p-2.5 text-sm
                  ${
                    region.id === formState.dataRegion
                      ? 'border-signoz_robin-500/60 bg-signoz_robin-500/10 text-signoz_robin-500'
                      : 'border-signoz_slate-400 bg-signoz_ink-300 hover:border-signoz_slate-300'
                  }`}
                onClick={() => handleRegionChange(region.id)}
              >
                <Image
                  loading="lazy"
                  src={region.iconURL}
                  alt={`${region.name} flag`}
                  className="h-5 w-5"
                  width={20}
                  height={20}
                />
                <span>{region.name}</span>
              </button>
            ))}
          </div>
          <p className="mt-1 text-xs text-signoz_vanilla-100/60">
            Your data will be stored in the selected region
          </p>
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="termsOfServiceAccepted"
              name="termsOfServiceAccepted"
              checked={formState.termsOfServiceAccepted}
              onChange={handleInputChange}
              className="mt-0.5 h-4 w-4 rounded border border-gray-500 bg-transparent accent-signoz_robin-500"
            />
            <label htmlFor="termsOfServiceAccepted" className="text-xs text-stone-300">
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

        <button
          disabled={isSubmitting}
          onClick={handleSubmit}
          className={`flex w-full items-center justify-center rounded-md bg-signoz_robin-500 py-3 font-medium ${isSubmitting ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2 text-sm">
              Starting your free 30-day trial
              <Loader2 size={16} className="animate-spin" />{' '}
            </div>
          ) : (
            <span className="flex items-center gap-1.5 text-sm">
              Start Your Free Trial
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </button>
      </form>
    </div>
  )
}

// TeamsVariant component with its own state management
const TeamsVariant: React.FC = () => {
  const [errors, setErrors] = useState<ErrorsProps>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitFailed, setSubmitFailed] = useState(false)
  const router = useRouter()
  const logEvent = useLogEvent()

  const isValidEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function isValidCompanyEmail(email) {
    // Regular expression pattern to match valid company email domains
    var companyEmailPattern =
      /@(?!gmail|yahoo|hotmail|outlook|live|icloud)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    // Check if the email matches the email format and the company email pattern
    return isValidEmail(email) && companyEmailPattern.test(email)
  }

  const validatePayload = useCallback((payload) => {
    let newErrors = {}

    if (!payload.email.trim()) {
      newErrors['workEmail'] = 'Work email is required'
    } else if (!isValidCompanyEmail(payload.email)) {
      newErrors['workEmail'] = 'Please enter a valid company email'
    }

    if (!payload.preferences.terms_of_service_accepted) {
      newErrors['termsOfService'] = 'You must accept the Terms of Service to continue'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [])

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

    // Get previously stored email (if any)
    const previousEmail = localStorage.getItem('prevSignupEmail')
    const currentEmail = payload.email

    // Store current email for future comparison
    localStorage.setItem('prevSignupEmail', currentEmail)
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
          if (response.status === 400) {
            setErrors({
              workEmail: 'Please enter a valid work email.',
            })
          }
        }
      } catch (error) {
        handleError()
      } finally {
        setIsSubmitting(false)
      }
    },
    [handleError, handleGTMCustomEventTrigger, logEvent, router, validatePayload]
  )

  return (
    <ExperimentTracker
      experimentId={EXPERIMENTS.TEAMS_PAGE.id}
      variantId={EXPERIMENTS.TEAMS_PAGE.variants.VARIANT}
    >
      <div className="variant-teams-container bg-signoz_ink-600 flex min-h-screen flex-col">
        <VariantNavbar />

        <div className="flex min-h-screen flex-col pt-[56px] lg:flex-row">
          {/* Left section - Sign up form */}
          <div className="bg-signoz_ink-600 relative flex w-full flex-col p-8 pt-[20vh] lg:w-5/12 lg:p-12 lg:pt-[20vh]">
            <div className="w-full">
              {!isSubmitting && submitFailed ? (
                <ErrorState />
              ) : (
                <SignupFormIsolated
                  onSignup={handleSignUp}
                  isSubmitting={isSubmitting}
                  errors={errors}
                />
              )}
            </div>

            <div className="absolute bottom-4 left-0 right-0 hidden text-center lg:block">
              <p className="flex justify-around px-8 text-xs text-signoz_vanilla-100/60">
                <span>OpenTelemetry Native.</span>
                <span>Unfied Signals.</span>
                <span>Predictable Pricing.</span>
              </p>
            </div>
          </div>

          {/* Right section - Testimonials */}
          <div className="relative hidden border-l border-signoz_slate-500 bg-signoz_ink-300 lg:flex lg:w-7/12">
            <div className="mt-[-56px] flex w-full items-center justify-center">
              <Testimonial />
            </div>
          </div>
        </div>
      </div>
    </ExperimentTracker>
  )
}

export default TeamsVariant
