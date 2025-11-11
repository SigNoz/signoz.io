'use client'

import './login.styles.css'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowUpRight, Dot, Loader2, Pencil } from 'lucide-react'
import { useLogEvent } from '../../hooks/useLogEvent'
import Button from '@/components/ui/Button'

interface ErrorsProps {
  workEmail?: string
}

interface Tenant {
  name: string
  region: { name: string; dns: string }
  state: string
}

enum TenantState {
  HEALTHY = 'HEALTHY',
  DELETED = 'DELETED',
}

const BASE_URL = process.env.NEXT_PUBLIC_CONTROL_PLANE_URL

const trustBadges = [
  {
    icon: '/svgs/icons/hipaa.svg',
    text: 'HIPAA',
  },
  {
    icon: '/svgs/icons/SOC-2.svg',
    text: 'SOC2',
  },
  {
    text: 'Privacy',
    url: 'https://www.signoz.io/privacy',
  },
  {
    text: 'Security',
    url: 'https://www.signoz.io/security',
  },
]

export default function Login() {
  const [workEmail, setWorkEmail] = useState('')

  const [errors, setErrors] = useState<ErrorsProps>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitFailed, setSubmitFailed] = useState(false)
  const [userTenants, setUserTenants] = useState([])

  const [noDeployments, setNoDeployments] = useState(false)
  const router = useRouter()
  const logEvent = useLogEvent()

  const handleEmailUpdate = (event) => {
    const { value } = event.target
    setWorkEmail(value)
  }

  const validateForm = () => {
    let errors = {}

    if (!workEmail.trim()) {
      errors['workEmail'] = 'Work email is required'
    } else if (!isValidCompanyEmail(workEmail)) {
      errors['workEmail'] = 'Please enter a valid company email'
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
      handleLogin()
    }
  }

  const handleError = () => {
    setSubmitFailed(true)
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    })
  }

  const handleNoDeployments = () => {
    setNoDeployments(true)
  }

  const handleLogin = async () => {
    setIsSubmitting(true)
    setSubmitFailed(false)

    const verifyWorkSpaceSetupURL = `${BASE_URL}/deployments/esearch?q=${encodeURIComponent(
      workEmail
    )}`

    const res = await fetch(verifyWorkSpaceSetupURL)
    const data = await res.json()

    if (data.status === 'success') {
      setSubmitSuccess(true)
      localStorage.setItem('app_user_id', workEmail || '')

      if (data?.data?.length === 0) {
        handleNoDeployments()
        setIsSubmitting(false)
        return
      }

      // --- Segment Identify Call ---
      logEvent({
        eventType: 'identify',
        eventName: 'User Logged In',
        attributes: {
          email: workEmail,
        },
      })

      // --- Segment Group Call ---
      const domain = workEmail.split('@')[1] || 'unknown_domain'
      logEvent({
        eventType: 'group',
        eventName: 'User Associated with Company (Login)',
        groupId: domain,
        attributes: {
          domain: domain,
        },
      })
      // --- End Segment Calls ---

      const sortedData = data?.data.sort((a, b) => {
        if (a.state === TenantState.HEALTHY && b.state !== TenantState.HEALTHY) return -1
        if (a.state !== TenantState.HEALTHY && b.state === TenantState.HEALTHY) return 1
        return a.state.localeCompare(b.state)
      })

      setUserTenants(sortedData)

      setIsSubmitting(false)
    } else if (data.status === 'error') {
      setSubmitFailed(true)
      setIsSubmitting(false)
    }
  }

  const handleChangeEmail = () => {
    setWorkEmail('')
    setSubmitSuccess(false)
    setUserTenants([])
    setIsSubmitting(false)
    setNoDeployments(false)
    setErrors({})
  }

  const handleGetStarted = () => {
    router.push(`/teams?q=${encodeURIComponent(workEmail)}`)
  }

  const isValid = useMemo(() => isValidCompanyEmail(workEmail), [workEmail])

  return (
    <main className="login-container relative bg-signoz_ink-500">
      <div className="bg-dot-pattern masked-dots absolute top-0 flex h-full w-full items-center justify-center" />
      <div className="relative m-auto h-full max-w-[1440px]">
        <div className="flex items-center justify-center max-lg:flex-col max-md:gap-0">
          <section className="login-form-section x-md:ml-0 flex w-full flex-col py-16 max-md:w-full lg:w-[50%] xl:w-[60%] ">
            <div className="flex w-full grow flex-col justify-center bg-signoz_ink-500 px-8 py-4 text-sm leading-5 text-signoz_vanilla-100 max-md:mt-10 max-md:max-w-full lg:px-12 lg:py-8 xl:px-36 xl:py-8">
              <h1 className="mb-[8px] text-2xl font-semibold leading-8 max-md:mt-10 max-md:max-w-full">
                Log in to your SigNoz account.
              </h1>
              <div className="w-100 text-sm leading-6 text-signoz_vanilla-400 max-md:max-w-full">
                Enter your email to sign in.
              </div>

              {!isSubmitting && submitFailed ? (
                <div className="welcome-container mt-[32px] flex flex-col items-center">
                  <div className="text-md error-container rounded-[4px] border p-[24px]">
                    We couldn't complete your request. Please try refreshing the page or contact
                    cloud support for assistance.
                  </div>

                  <Button
                    type="submit"
                    variant={"default"}
                    rounded={"full"} 
                    className='w-full mt-6'
                    isButton={true}
                    onClick={() => window.location.reload()}
                  >
                    <span className="text-xs leading-5">Refresh page</span>
                  </Button>

                  <Button
                    variant={"secondary"}
                    rounded={"full"}
                    type="submit"
                    className='w-full mt-3'
                    href="mailto:cloud-support@signoz.io"
                  >
                    <span className="text-xs leading-5">Contact cloud support</span>
                    <ArrowRight size={14} />
                  </Button>
                </div>
              ) : (
                <form className="w-100 mt-6">
                  <div className="mb-[28px] rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 p-8">
                    <label htmlFor="workEmail" className="mb-2 block font-medium">
                      Work email
                    </label>
                    <div className="flex items-center">
                      <input
                        type="email"
                        id="workEmail"
                        disabled={isSubmitting || submitSuccess}
                        name="workEmail"
                        autoComplete="off"
                        value={workEmail}
                        onChange={handleEmailUpdate}
                        placeholder="E.g. bart@simpsonmail.com"
                        className="w-full rounded-sm border border-r-0 border-solid border-signoz_slate-400 bg-signoz_ink-300 px-3 py-1.5 text-sm tracking-normal text-stone-300"
                      />

                      {workEmail && submitSuccess && (
                        <Button
                          variant={"secondary"}
                          rounded={"default"}
                          isButton={true}
                          type="button"
                          onClick={handleChangeEmail}
                        >
                          <Pencil size={14} /> Change
                        </Button>
                      )}
                    </div>

                    {errors?.workEmail && (
                      <div className="mt-2 text-xs text-red-400">{errors.workEmail}</div>
                    )}

                    {submitSuccess && userTenants.length > 0 && (
                      <div className="my-8">
                        <div className="rounded-sm border border-signoz_slate-400 p-3 text-sm font-medium text-signoz_vanilla-400">
                          Associated Teams' URLs
                        </div>

                        <div className="tenant-list">
                          {userTenants.map((tenant: Tenant) => (
                            <div
                              key={tenant.name}
                              className="flex flex-col gap-2 border !border-t-0 border-signoz_slate-400 p-3"
                            >
                              <div className="flex items-center justify-between text-sm font-normal text-signoz_vanilla-400">
                                {tenant.name}.{tenant.region.dns}
                                {tenant.state !== TenantState.DELETED && (
                                  <a
                                    href={`https://${tenant.name}.${tenant.region.dns}/login`}
                                    target="_blank"
                                    className={`flex items-center justify-center rounded-sm bg-signoz_robin-500 px-2 text-[10px] font-normal text-white`}
                                  >
                                    Login
                                  </a>
                                )}
                              </div>

                              <span className=" flex items-center text-xs text-signoz_vanilla-400">
                                {tenant.state !== TenantState.DELETED ? (
                                  <>
                                    <Dot color="#25E192" className="-ml-2 mr-1" /> Active
                                  </>
                                ) : (
                                  <>
                                    <Dot color="#3C4152" className="-ml-2 mr-1" /> Expired
                                  </>
                                )}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {!submitSuccess && (
                    <Button
                      isButton={true}
                      variant={"default"}
                      rounded={"full"}
                      disabled={isSubmitting || !isValid}
                      onClick={handleSubmit}
                      className='w-full mb-4'
                    >
                      <span className="flex items-center gap-1.5 px-px text-sm">
                        Next
                        {isSubmitting ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <ArrowRight size={16} />
                        )}
                      </span>
                    </Button>
                  )}
                </form>
              )}

              {noDeployments && (
                <div className="text-sm text-signoz_vanilla-400">
                  No deployments are currently associated with this email. You can get started now
                  with a free trial account for 30 days.
                  <Button 
                    isButton={true}
                    rounded={'full'}
                    variant={"default"}
                    className='my-4 w-full'
                    onClick={handleGetStarted}
                  >
                    <span className="flex items-center gap-1.5 px-px text-sm">
                      Get Started - Free
                      <ArrowRight size={16} />
                    </span>
                  </Button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      <div className="absolute bottom-0 m-auto mt-8 flex w-full items-center justify-center">
        <div className="flex w-[70%] items-center justify-center max-sm:w-[90%]">
          <section className="b mb-6 grid grid-cols-2 md:flex md:flex-wrap items-center gap-4 self-stretch rounded-md border border-signoz_slate-400 bg-signoz_ink-400 p-4 md:p-2 max-md:max-w-full max-md:w-full">
            {trustBadges.map((badge, index) => (
              <div className="my-auto flex items-center gap-2.5 self-stretch justify-center md:justify-start" key={index}>
                {badge.icon && (
                  <img
                    loading="lazy"
                    src={badge.icon}
                    alt=""
                    className="aspect-[1.93] w-[29px] shrink-0 object-contain"
                  />
                )}

                {badge.url ? (
                  <a href={badge.url} className="flex items-center gap-2" target="_blank">
                    <span className="text-xs text-signoz_vanilla-400">{badge.text}</span>
                    <ArrowUpRight size={12} />
                  </a>
                ) : (
                  <span className="text-xs text-signoz_vanilla-400">{badge.text}</span>
                )}

                {index < trustBadges.length - 1 && (
                  <Dot size={24} color="#3C4152" className="ml-4 hidden md:block" />
                )}
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  )
}
