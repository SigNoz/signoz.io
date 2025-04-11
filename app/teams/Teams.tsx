'use client'

import './teams.styles.css'

import React, { useEffect, useState } from 'react'
import TestimonialSection from './TestimonialSection'

import { ArrowRight, Loader2, BookOpen } from 'lucide-react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

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

  const searchParams = useSearchParams()
  const workEmailFromParams = searchParams.get('q')

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target
    const newValue = type === 'checkbox' ? checked : value
    setFormData({ ...formData, [name]: newValue })
  }

  const handleRegionChange = (selectedDataRegion: string): void => {
    setFormData({ ...formData, dataRegion: selectedDataRegion })
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
      setFormData({ ...formData, workEmail: decodeURIComponent(workEmailFromParams) })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workEmailFromParams])

  return (
    <div className="relative flex h-[calc(100vh-56px)] w-full items-center justify-center overflow-hidden bg-signoz_ink-500">
      <div className="fixed inset-0 z-0 h-screen w-screen">
        <Image
          src="/img/teams-page-k8s-background.webp"
          alt="SigNoz Dashboard Background"
          fill
          className="brightness-70 object-cover blur-sm"
          priority
        />
      </div>

      <div className="relative z-10 mx-4 w-full max-w-xl overflow-hidden rounded-lg border border-gray-600/80 bg-signoz_ink-400 shadow-2xl">
        <div className="flex w-full border-b border-gray-700/20 bg-gray-800/50">
          <div className="flex-1 border-r border-gray-700/60 p-4 text-center">
            <span className="block text-xs font-semibold text-signoz_robin-500">Step 1:</span>
            <span className="mt-1 block text-sm font-medium text-white">Sign Up</span>
          </div>
          <div className="flex-1 border-r border-gray-700/60 p-4 text-center opacity-60">
            <span className="block text-xs text-gray-400">Step 2:</span>
            <span className="mt-1 block text-sm text-gray-300">Choose Data Source</span>
          </div>
          <div className="flex-1 p-4 text-center opacity-60">
            <span className="block text-xs text-gray-400">Step 3:</span>
            <span className="mt-1 block text-sm text-gray-300">Start Monitoring</span>
          </div>
        </div>

        <div className="flex flex-col p-8 md:p-10">
          {!isSubmitting && submitFailed ? (
            <div className="welcome-container flex flex-col items-center">
              <div className="text-md rounded-[6px] border border-[#e53e3e] bg-red-900/30 p-[24px] text-center text-white">
                {' '}
                We&apos;re sorry, it looks like something didn&apos;t go as planned. Please reach
                out to us for assistance.
              </div>
              <a
                className="mt-[28px] flex w-full items-center justify-center gap-4 rounded-full bg-signoz_cherry-500 px-[16px] py-[8px] text-sm font-medium text-white hover:bg-signoz_cherry-600"
                href="mailto:cloud-support@signoz.io"
              >
                <span className="text-xs leading-5">Contact cloud support</span>
                <ArrowRight size={14} />
              </a>
            </div>
          ) : (
            <form className="space-y-10" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="workEmail" className="block text-sm font-medium text-white">
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
                    placeholder="E.g. name@company.com"
                    className="w-full rounded-sm border border-solid border-signoz_slate-400 bg-signoz_ink-300 px-3 py-1.5 text-sm tracking-normal text-stone-300 outline-none focus:border-signoz_robin-500 focus:ring-1 focus:ring-signoz_robin-500"
                  />
                  {errors?.workEmail && (
                    <div className="mt-2 text-xs text-red-400">{errors.workEmail}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">Data region</label>
                  <div className="flex gap-3">
                    {regions.map((region) => (
                      <button
                        type="button"
                        key={region.id}
                        disabled={isSubmitting}
                        className={`flex flex-1 cursor-pointer items-center space-x-2 rounded-md border p-3 transition-colors 
                                              ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''} 
                                              ${region.id === formData.dataRegion ? 'border-blue-500/20 bg-[#18213d]' : 'border-gray-700 bg-gray-800'}`}
                        onClick={() => {
                          if (!isSubmitting) handleRegionChange(region.id)
                        }}
                      >
                        <Image
                          loading="lazy"
                          src={region.iconURL}
                          alt={`${region.name} flag`}
                          className="aspect-square w-5 shrink-0"
                          width={20}
                          height={20}
                        />
                        <span className="text-sm text-white">{region.name}</span>
                        <input
                          type="radio"
                          name="dataRegion"
                          value={region.id}
                          className="sr-only"
                          checked={region.id === formData.dataRegion}
                          readOnly
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="termsOfServiceAccepted"
                  name="termsOfServiceAccepted"
                  checked={formData.termsOfServiceAccepted}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border border-gray-500 bg-transparent accent-signoz_robin-500 focus:outline-none focus:ring-2 focus:ring-signoz_robin-500 focus:ring-offset-0"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="termsOfServiceAccepted"
                    className={`text-sm font-medium leading-relaxed text-gray-300 ${isSubmitting ? 'cursor-not-allowed opacity-70' : ''}`}
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
                  {errors?.termsOfService && (
                    <div className="text-xs text-red-400">{errors.termsOfService}</div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex w-full items-center justify-center rounded-full bg-signoz_robin-500 px-4 py-3 font-medium text-white ${isSubmitting ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-signoz_robin-600'}`}
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
                <p className="text-center text-sm text-gray-400">No credit card required.</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Teams
