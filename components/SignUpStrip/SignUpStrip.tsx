/** @jsxImportSource react */
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowRight, Loader2, ChevronDown } from 'lucide-react'

declare global {
  interface Window {
    dataLayer?: Object[];
  }
}

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

interface SignUpStripProps {
  showSignUpStrip: boolean
  cta_title?: string
  cta_text?: string
}

const SignUpStrip = ({ showSignUpStrip, cta_title, cta_text }: SignUpStripProps) => {
  const [formData, setFormData] = useState({
    workEmail: '',
    dataRegion: 'us',
  })
  const [errors, setErrors] = useState<{ workEmail?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false)
  const router = useRouter()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
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
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function isValidCompanyEmail(email) {
    const companyEmailPattern =
      /@(?!gmail|yahoo|hotmail|outlook|live|icloud)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return isValidEmail(email) && companyEmailPattern.test(email)
  }

  const handleGTMCustomEventTrigger = (payload) => {
    // GTM tracking
    if (window && window?.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'signoz-cloud-signup-strip-submit',
        source: 'signup_strip',
        ...payload,
      })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const isFormValid = validateForm()
    if (!isFormValid) return

    setIsSubmitting(true)
    const payload = {
      email: formData.workEmail,
      region: {
        name: formData.dataRegion,
      },
      source: 'signup_strip'
    }

    try {
      const response = await fetch('https://api.signoz.cloud/v2/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (response.ok) {
        handleGTMCustomEventTrigger(payload)
        localStorage.setItem('workEmail', formData.workEmail)
        localStorage.setItem('region', formData.dataRegion)
        router.push('/verify-email')
      } else {
        if (response.status === 400) {
          setErrors({
            workEmail: 'Please enter a valid work email.',
          })
        }
      }
    } catch (error) {
      setErrors({
        workEmail: 'Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-40 hidden transform bg-gradient-to-r from-[#312e81] via-[#4338ca] to-[#312e81] transition-all duration-400 ease-in-out lg:block ${
        showSignUpStrip ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-300">
            <strong>
              {cta_title || 'Get Started with OTel in 15 min with Our Guided Onboarding'.slice(0, 70)}
            </strong>
          </div>
        </div>
        <div className="flex items-end gap-2">
          <div className="flex flex-col gap-1">
            <input
              type="email"
              id="workEmail"
              placeholder="name@company.com"
              value={formData.workEmail}
              onChange={handleInputChange}
              name="workEmail"
              className="w-64 rounded-md border border-signoz_ink-300 bg-signoz_ink-400/50 px-3 py-1.5 text-sm text-white placeholder:text-gray-500 focus:border-signoz_robin-500 focus:outline-none focus:ring-1 focus:ring-signoz_robin-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="relative">
              <button
                onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
                className="flex items-center gap-2 rounded-md border border-signoz_ink-300 bg-signoz_ink-400/50 px-3 py-1.5 text-sm text-white"
              >
                <Image
                  src={regions.find((r) => r.id === formData.dataRegion)?.iconURL || ''}
                  alt="Selected region"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
                <span>{regions.find((r) => r.id === formData.dataRegion)?.name}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${isRegionDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isRegionDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 rounded-md border border-signoz_ink-300 bg-signoz_ink-400/95 py-1 shadow-lg backdrop-blur-sm">
                  <div className="border-b border-signoz_ink-300 px-3 pb-1 pt-0.5">
                    <span className="text-xs font-medium text-gray-400">Data Region</span>
                  </div>
                  {regions.map((region) => (
                    <button
                      key={region.id}
                      onClick={() => {
                        handleRegionChange(region.id)
                        setIsRegionDropdownOpen(false)
                      }}
                      className={`flex w-full items-center gap-2 px-3 py-1.5 text-sm hover:bg-signoz_ink-300 ${
                        region.id === formData.dataRegion ? 'text-white' : 'text-gray-400'
                      }`}
                    >
                      <Image
                        src={region.iconURL}
                        alt={`${region.name} data region`}
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                      <span>{region.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-md bg-signoz_robin-500 px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-signoz_robin-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                Setting up your workspace...
                <Loader2 size={14} className="animate-spin" />
              </>
            ) : (
              <>
                {cta_text?.slice(0, 40) || 'Start your free 30-day trial'}
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </div>
      </div>
      {errors?.workEmail && (
        <div className="bg-red-500/10 px-4 py-1.5 text-center text-xs text-red-400">
          {errors.workEmail}
        </div>
      )}
    </div>
  )
}

export default SignUpStrip
