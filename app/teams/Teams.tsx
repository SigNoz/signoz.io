'use client'

import './teams.styles.css'

import React, { useEffect, useState } from 'react'
import TestimonialSection from './TestimonialSection'

import { ArrowRight, Loader2 } from 'lucide-react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useLogEvent } from '../../hooks/useLogEvent'
import { ExperimentTracker } from '../../components/ExperimentTracker'
import { EXPERIMENTS } from '../../constants/experiments'

interface ErrorsProps {
  fullName?: string
  workEmail?: string
  companyName?: string
  termsOfService?: string
}

interface SignUpPageProps {}

interface Region {
  name: string
  id: string
  iconURL: string
}

const regions: Region[] = [
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

const Teams: React.FC<SignUpPageProps> = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    dataRegion: 'us',
    source: '',
    termsOfServiceAccepted: true,
  })

  const [errors, setErrors] = useState<ErrorsProps>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitFailed, setSubmitFailed] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const logEvent = useLogEvent()

  const searchParams = useSearchParams()
  const workEmailFromParams = searchParams.get('q')

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target
    const newValue = type === 'checkbox' ? checked : value
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }))
  }

  const handleRegionChange = (selectedDataRegion: string): void => {
    setFormData((prevFormData) => ({ ...prevFormData, dataRegion: selectedDataRegion }))
  }

  const validateForm = () => {
    let errors = {}

    if (!formData.workEmail.trim()) {
      errors['workEmail'] = 'Work email is required'
    } else if (!isValidCompanyEmail(formData.workEmail)) {
      errors['workEmail'] = 'Please enter a valid company email'
    }

    if (!formData.termsOfServiceAccepted) {
      errors['termsOfService'] = 'You must accept the Terms of Service to continue'
    }

    setErrors(errors)

    return Object.keys(errors).length === 0
  }

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

  const handleSubmit = (event) => {
    event.preventDefault()

    setSubmitFailed(false)

    const isFormValid = validateForm()

    if (isFormValid) {
      handleSignUp()
    }
  }

  const handleGTMCustomEventTrigger = (payload) => {
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

    // Extract domain from email as company identifier
    const domain = currentEmail.split('@')[1] || ''
  }

  const handleError = () => {
    setSubmitFailed(true)
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    })
  }

  const handleSignUp = async () => {
    setIsSubmitting(true)
    setSubmitFailed(false)

    const payload = {
      email: formData.workEmail,
      region: {
        name: formData.dataRegion,
      },
      preferences: {
        terms_of_service_accepted: formData.termsOfServiceAccepted,
        opted_email_updates: true,
      },
    }

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
            // Add other relevant traits if available, e.g., fullName, companyName
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
            // Add company-related traits if available, e.g., companyName
            domain: domain,
          },
        })
        // --- End Segment Calls ---

        setFormData({
          fullName: '',
          workEmail: '',
          companyName: '',
          dataRegion: 'us',
          source: '',
          termsOfServiceAccepted: true,
        })

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
  }

  // Set the work email from the URL params to the form data
  useEffect(() => {
    if (workEmailFromParams) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        workEmail: decodeURIComponent(workEmailFromParams),
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workEmailFromParams])

  return (
    <ExperimentTracker
      experimentId={EXPERIMENTS.TEAMS_PAGE.id}
      variantId={EXPERIMENTS.TEAMS_PAGE.variants.CONTROL}
    >
      <main className="bg-signoz_ink-500">
        <div className="m-auto max-w-[1440px]">
          <div className="flex items-stretch max-lg:flex-col max-md:gap-0">
            <section className="signup-form-section flex w-full flex-col bg-signoz_ink-500 max-md:ml-0 max-md:w-full lg:w-[70%] xl:w-[60%]">
              <div className="flex w-full grow flex-col justify-center px-8 py-4 text-sm leading-5 text-white max-md:mt-10 max-md:max-w-full lg:px-12 lg:py-8 xl:px-36 xl:py-8">
                <h1 className="mt-11 text-2xl font-semibold leading-8 max-md:mt-10 max-md:max-w-full">
                  Sign up for SigNoz Cloud
                </h1>
                <p className="w-100 text-md mt-2 text-base leading-6 text-signoz_vanilla-400 max-md:max-w-full">
                  Experience SigNoz effortlessly. No installation, maintenance, or scaling needed.
                  Get started now with a free trial account for 30 days.
                </p>

                {!isSubmitting && submitFailed ? (
                  <div className="welcome-container mt-[32px] flex flex-col items-center">
                    <div className="text-md rounded-[6px] border border-[#1D212D] bg-signoz_ink-300 p-[24px]">
                      <div>
                        {' '}
                        We're sorry, it looks like something didn't go as planned. Please reach out
                        to us for assistance.
                      </div>
                    </div>

                    <a
                      type="submit"
                      className="mt-[28px] flex w-full items-center justify-center gap-4 rounded-full bg-signoz_cherry-500 px-[16px] py-[8px] text-sm font-medium"
                      href="mailto:cloud-support@signoz.io"
                    >
                      <span className="text-xs leading-5">Contact cloud support</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                ) : (
                  <form className="w-100 mt-[24px]">
                    <div className="mb-[28px]">
                      <label htmlFor="workEmail" className="mb-2 block font-medium">
                        Work email
                      </label>
                      <input
                        type="email"
                        id="workEmail"
                        disabled={isSubmitting}
                        name="workEmail"
                        value={formData.workEmail}
                        autoComplete="off"
                        onChange={handleInputChange}
                        placeholder="E.g. bart@simpsonmail.com"
                        className="w-full rounded-sm border border-solid border-signoz_slate-400 bg-signoz_ink-300 px-3 py-1.5 text-sm tracking-normal text-stone-300"
                      />

                      {errors?.workEmail && (
                        <div className="mt-2 text-xs text-red-400">{errors.workEmail}</div>
                      )}
                    </div>

                    <div className="data-regions mb-[28px]">
                      <label className="mb-2 block font-medium" htmlFor="dataRegion">
                        Data region
                      </label>

                      <div className="mt-2 flex max-w-full flex-wrap gap-3 leading-[129%] tracking-normal">
                        {regions.map((region) => (
                          <button
                            type="button"
                            key={region.id}
                            className={`flex min-w-44 gap-4 self-start whitespace-nowrap rounded-sm border border-solid p-3 text-sm leading-[129%] tracking-normal ${region.id === formData.dataRegion ? 'border-[#4e74f866] bg-[#4e74f833]' : 'border-signoz_slate-400 bg-signoz_ink-300'}`}
                            onClick={() => {
                              handleRegionChange(region.id)
                            }}
                          >
                            <Image
                              loading="lazy"
                              src={region.iconURL}
                              alt={`${region} flag`}
                              className="aspect-square w-5 shrink-0"
                              width={20}
                              height={20}
                            />
                            <span className="">{region.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-[28px] space-y-2.5 rounded-md border border-signoz_slate-500/30 bg-signoz_ink-400/30 p-3.5">
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          id="termsOfServiceAccepted"
                          name="termsOfServiceAccepted"
                          checked={formData.termsOfServiceAccepted}
                          onChange={handleInputChange}
                          className="mt-0.5 h-4 w-4 rounded border border-gray-500 bg-transparent accent-signoz_robin-500"
                        />
                        <label htmlFor="termsOfServiceAccepted" className="text-sm text-stone-300">
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
                        <div className="ml-6.5 text-xs text-red-400">{errors.termsOfService}</div>
                      )}
                    </div>

                    <button
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      className={`mb-[16px] flex w-full items-center justify-center rounded-full bg-signoz_robin-500 py-2 pl-4 pr-3 font-medium ${isSubmitting ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2 text-sm">
                          Starting your free 30-day trial
                          <Loader2 size={16} className="animate-spin" />{' '}
                        </div>
                      ) : (
                        <span className="flex items-center gap-1.5 px-px text-sm">
                          Start your free 30-day trial
                          <ArrowRight size={16} />
                        </span>
                      )}
                    </button>
                    <p className="mt-4 text-center leading-[129%] tracking-normal text-stone-300">
                      No credit card required.
                    </p>
                  </form>
                )}
              </div>
            </section>
            <TestimonialSection />
          </div>
        </div>
      </main>
    </ExperimentTracker>
  )
}

export default Teams
