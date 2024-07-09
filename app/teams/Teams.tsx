'use client'

import './teams.styles.css'
import Link from 'next/link'
import React, { useState } from 'react'
import ReactGA from 'react-ga4'
import TestimonialSection from './TestimonialSection'

import { Loader2 } from 'lucide-react'

interface ErrorsProps {
  fullName?: string
  workEmail?: string
  companyName?: string
}

ReactGA.initialize('G-6NFJ2Y6NQN')

import { ArrowRight } from 'lucide-react'

interface SignUpPageProps {}

interface Region {
  name: string
  id: string
  icon: string
}

const regions: Region[] = [
  {
    name: 'United States',
    id: 'us',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/44f4c9d9e985811462284a9c78f1329f266b11e61e2cf31ce3ad02e3a287724f?apiKey=f0103e73688241f896979b7df0e7cb45&',
  },
  {
    name: 'Europe',
    id: 'eu',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/35d8a36941c626b5d602c85007d13b3b62beb9ec97347c26000df6facf7f8862?apiKey=f0103e73688241f896979b7df0e7cb45&',
  },
  {
    name: 'India',
    id: 'in',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0299de6dc4fde15e9fe969685b353970462dfc10b1842c5e5ef387b901cb92e5?apiKey=f0103e73688241f896979b7df0e7cb45&',
  },
]

const Teams: React.FC<SignUpPageProps> = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    dataRegion: 'us',
    source: '',
  })

  const [errors, setErrors] = useState<ErrorsProps>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitFailed, setSubmitFailed] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleRegionChange = (selectedDataRegion: string): void => {
    setFormData({ ...formData, dataRegion: selectedDataRegion })
  }

  const validateForm = () => {
    let errors = {}

    if (!formData.fullName.trim()) {
      errors['fullName'] = 'Full name is required'
    }

    if (!formData.workEmail.trim()) {
      errors['workEmail'] = 'Work email is required'
    } else if (!isValidCompanyEmail(formData.workEmail)) {
      errors['workEmail'] = 'Please enter a valid company email'
    }

    if (!formData.companyName.trim()) {
      errors['companyName'] = 'Company name is required'
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
    if (window && window?.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'signoz-cloud-signup-form-submit',
        ...payload,
      })
    }

    // Sending a custom event to GA4 using ReactGA
    ReactGA.event({
      category: 'Signup', // Adjusted to a more general term for the event category
      action: 'Submit', // Simplified action
      label: 'SigNoz Cloud Signup', // Label to provide more context
      nonInteraction: false, // Setting to false as this is an interactive event

      // ReactGA.event({
      //   category: "SigNoz Cloud Signup",
      //   action: "SigNozCloudSignup",
      //   value: 99, // optional, must be a number
      //   nonInteraction: true, // optional, true/false
      //   transport: "xhr", // optional, beacon/xhr/image
      //     ...payload
      // }, {
      //   ...payload
    })
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
      name: formData.fullName,
      email: formData.workEmail,
      company_name: formData.companyName,
      data_region: formData.dataRegion,
      source: formData.source,
    }

    try {
      const response = await fetch('https://signup.signoz.cloud/api/register', {
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
        })

        setIsFormSubmitted(true)
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

  return (
    <main className="bg-signoz_ink-500">
      <div className="m-auto max-w-[1440px]">
        {!isFormSubmitted && (
          <div className="flex items-stretch max-lg:flex-col max-md:gap-0">
            <section className="signup-form-section flex w-full flex-col bg-signoz_ink-500 max-md:ml-0 max-md:w-full lg:w-[70%] xl:w-[60%]">
              <div className="flex w-full grow flex-col px-8 py-4 text-sm leading-5 text-white max-md:mt-10 max-md:max-w-full lg:px-12 lg:py-8 xl:px-36 xl:py-8">
                <h1 className="mt-11 text-2xl font-semibold leading-8 max-md:mt-10 max-md:max-w-full">
                  Sign up for SigNoz Cloud
                </h1>
                <p className="w-100 text-md mt-2 text-base leading-6 text-signoz_vanilla-400 max-md:max-w-full">
                  Experience SigNoz effortlessly. No installation, maintenance, or scaling needed.
                  Get started now with a free trial account for 30 days.
                </p>
                <form className="w-100 mt-[24px]">
                  <div className="mb-[28px]">
                    <label htmlFor="fullName" className="mb-2 block font-medium">
                      Your full name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      disabled={isSubmitting}
                      name="fullName"
                      onChange={handleInputChange}
                      autoComplete="off"
                      placeholder="E.g. Bart Simpson"
                      className="w-full rounded-sm border border-solid border-signoz_slate-400 bg-signoz_ink-300 px-3 py-1.5 text-sm tracking-normal text-stone-300"
                    />

                    {errors?.fullName && (
                      <div className="mt-2 text-xs text-red-400">{errors.fullName}</div>
                    )}
                  </div>
                  <div className="mb-[28px]">
                    <label htmlFor="workEmail" className="mb-2 block font-medium">
                      Work email
                    </label>
                    <input
                      type="email"
                      id="workEmail"
                      disabled={isSubmitting}
                      name="workEmail"
                      autoComplete="off"
                      onChange={handleInputChange}
                      placeholder="E.g. bart@simpsonmail.com"
                      className="w-full rounded-sm border border-solid border-signoz_slate-400 bg-signoz_ink-300 px-3 py-1.5 text-sm tracking-normal text-stone-300"
                    />

                    {errors?.workEmail && (
                      <div className="mt-2 text-xs text-red-400">{errors.workEmail}</div>
                    )}
                  </div>

                  <div className="mb-[28px]">
                    <label htmlFor="workEmail" className="mb-2 block font-medium">
                      Company name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      disabled={isSubmitting}
                      name="companyName"
                      autoComplete="off"
                      onChange={handleInputChange}
                      placeholder="E.g. Simpson's Inc"
                      className="w-full rounded-sm border border-solid border-signoz_slate-400 bg-signoz_ink-300 px-3 py-1.5 text-sm tracking-normal text-stone-300"
                    />

                    {errors?.companyName && (
                      <div className="mt-2 text-xs text-red-400">{errors.companyName}</div>
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
                          className={`flex min-w-44 gap-4 self-start whitespace-nowrap rounded-sm border border-solid p-3 text-sm leading-[129%] tracking-normal ${region.id === formData.dataRegion ? 'border-[#4e74f866] bg-[#4e74f833]' : 'border-signoz_slate-400 bg-signoz_ink-300'}`}
                          onClick={() => {
                            handleRegionChange(region.id)
                          }}
                        >
                          <img
                            loading="lazy"
                            src={region.icon}
                            alt={`${region} flag`}
                            className="aspect-square w-5 shrink-0"
                          />
                          <span className="">{region.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-[28px]">
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      Where did you hear about us?
                    </label>
                    <textarea
                      id="source"
                      name="source"
                      disabled={isSubmitting}
                      rows={4}
                      className={`w-full resize-none rounded-sm border border-signoz_slate-400 bg-signoz_ink-300 p-2.5 text-sm text-sm`}
                      onChange={handleInputChange}
                    ></textarea>
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
                      <span className="flex gap-1.5 px-px text-sm">
                        Start your free 30-day trial
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/44c996783a625e59376c8cc6b7c935b91fe2d1c6aa7896be7b042f710e7d7814?apiKey=f0103e73688241f896979b7df0e7cb45&"
                          className="my-auto aspect-square w-3.5 shrink-0"
                          alt=""
                        />
                      </span>
                    )}
                  </button>
                  <p className="mt-4 text-center leading-[129%] tracking-normal text-stone-300">
                    No credit card required.
                  </p>
                </form>
              </div>
            </section>
            <TestimonialSection />
          </div>
        )}

        {isFormSubmitted && (
          <div className="welcome-container mx-auto flex max-w-[520px] flex-col items-center py-32">
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="28" cy="28" r="20" fill="#7190F9" fill-opacity="0.1" />
              <circle cx="28" cy="28" r="20" fill="#7190F9" fill-opacity="0.1" />
              <path
                d="M28.0003 51.3337C40.8873 51.3337 51.3337 40.8873 51.3337 28.0003C51.3337 15.1133 40.8873 4.66699 28.0003 4.66699C15.1133 4.66699 4.66699 15.1133 4.66699 28.0003C4.66699 40.8873 15.1133 51.3337 28.0003 51.3337Z"
                fill="#4E74F8"
                stroke="#4E74F8"
                stroke-width="4.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 27L23.9615 36L39 22"
                stroke="#121317"
                stroke-width="4.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <div className="mt-[28px] bg-neutral-950 text-2xl"> Welcome to SigNoz </div>

            <div className="text-md mt-[28px] rounded-[6px] border border-[#1D212D] bg-signoz_ink-300 p-[24px]">
              <div>
                {' '}
                Thank you for signing up for SigNoz Cloud. Please check your email for the next
                steps.{' '}
              </div>

              <div className="mt-[28px]">
                If you do not find the email in your inbox within the next few minutes, please check
                your spam folder.
              </div>
            </div>

            <a
              type="submit"
              className="mt-[28px] flex w-full items-center justify-center gap-4 rounded-full bg-signoz_robin-500 px-[16px] py-[8px] text-sm font-medium"
              href="mailto:cloud-support@signoz.io"
            >
              <span className="flex text-xs leading-5">Contact cloud support</span>
              <ArrowRight size={14} />
            </a>

            <Link href="/docs" className="w-full">
              <button className="mt-[12px] flex w-full items-center justify-center gap-4 rounded-full bg-signoz_ink-300 px-[16px] py-[8px] text-sm font-medium">
                <span className="flex text-xs leading-5">Read the docs </span>
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}

export default Teams
