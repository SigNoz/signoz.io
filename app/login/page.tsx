'use client'

import './login.styles.css'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowUpRight, Dot, Loader2, Pencil } from 'lucide-react'
import { useLogEvent } from '../../hooks/useLogEvent'
import Button from '@/components/ui/Button'
import Pagination from '@signozhq/pagination'

interface ErrorsProps {
  workEmail?: string
}

interface Tenant {
  name: string
  region: { name: string; dns: string }
  state: string
}

interface PaginationInfo {
  total: number
  pages: number
  page: number
  per_page: number
}

enum TenantState {
  HEALTHY = 'HEALTHY',
  DELETED = 'DELETED',
}

const BASE_URL = process.env.NEXT_PUBLIC_CONTROL_PLANE_URL
const PER_PAGE = 5

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

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidCompanyEmail(email: string): boolean {
  const companyEmailPattern =
    /@(?!gmail|yahoo|hotmail|outlook|live|icloud)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return isValidEmail(email) && companyEmailPattern.test(email)
}

export default function Login() {
  const [workEmail, setWorkEmail] = useState('')

  const [errors, setErrors] = useState<ErrorsProps>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitFailed, setSubmitFailed] = useState(false)
  const [userTenants, setUserTenants] = useState<Tenant[]>([])

  const [noDeployments, setNoDeployments] = useState(false)
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isFetchingPage, setIsFetchingPage] = useState(false)

  const router = useRouter()
  const logEvent = useLogEvent()

  const handleEmailUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkEmail(event.target.value)
  }

  const validateForm = () => {
    const errs: ErrorsProps = {}
    if (!workEmail.trim()) {
      errs.workEmail = 'Work email is required'
    } else if (!isValidCompanyEmail(workEmail)) {
      errs.workEmail = 'Please enter a valid company email'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    logEvent({
      eventName: 'Website Form Submitted',
      eventType: 'track',
      attributes: {
        formName: 'Login Form',
        formLocation: 'Login Page',
        email: workEmail,
      },
    })

    setSubmitFailed(false)

    const isFormValid = validateForm()

    if (isFormValid) {
      fetchTenants(1, true)
    }
  }

  const handleNoDeployments = () => {
    logEvent({
      eventName: 'Login No Deployments',
      eventType: 'track',
      attributes: {
        email: workEmail,
      },
    })
    setNoDeployments(true)
  }

  const fetchTenants = async (page: number, isInitial = false) => {
    if (isInitial) {
      setIsSubmitting(true)
    } else {
      setIsFetchingPage(true)
    }
    setSubmitFailed(false)

    try {
      const url = `${BASE_URL}/deployments/esearch?q=${encodeURIComponent(workEmail)}&page=${page}&per_page=${PER_PAGE}`
      const res = await fetch(url)

      if (!res.ok) {
        logEvent({
          eventName: 'Login Failed',
          eventType: 'track',
          attributes: {
            email: workEmail,
            error: 'API Error',
            status: res.status,
            statusText: res.statusText,
          },
        })
        setSubmitFailed(true)
        return
      }

      const data = await res.json()

      if (data.status === 'success') {
        setSubmitSuccess(true)
        localStorage.setItem('app_user_id', workEmail || '')

        const tenants: Tenant[] = data?.data ?? []
        const paginationInfo: PaginationInfo | null = data?._pagination ?? null

        if (tenants.length === 0 && page === 1) {
          handleNoDeployments()
          return
        }

        if (isInitial) {
          // --- Segment Identify Call ---
          logEvent({
            eventType: 'identify',
            eventName: 'User Logged In',
            attributes: {
              email: workEmail,
              workspaceData: data,
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
              workspaceData: data,
            },
          })
          // --- End Segment Calls ---
        }

        const sortedTenants = [...tenants].sort((a, b) => {
          if (a.state === TenantState.HEALTHY && b.state !== TenantState.HEALTHY) return -1
          if (a.state !== TenantState.HEALTHY && b.state === TenantState.HEALTHY) return 1
          return a.state.localeCompare(b.state)
        })

        setUserTenants(sortedTenants)
        setPagination(paginationInfo)
        setCurrentPage(page)
      } else {
        logEvent({
          eventName: 'Login Failed',
          eventType: 'track',
          attributes: {
            email: workEmail,
            error: 'API Error',
          },
        })
        setSubmitFailed(true)
      }
    } catch (error) {
      logEvent({
        eventName: 'Login Exception',
        eventType: 'track',
        attributes: {
          email: workEmail,
          errorMessage: error instanceof Error ? error.message : String(error),
        },
      })
      setSubmitFailed(true)
    } finally {
      setIsSubmitting(false)
      setIsFetchingPage(false)
    }
  }

  const handlePageChange = (page: number) => fetchTenants(page)

  const handleChangeEmail = () => {
    setWorkEmail('')
    setSubmitSuccess(false)
    setUserTenants([])
    setIsSubmitting(false)
    setNoDeployments(false)
    setErrors({})
    setPagination(null)
    setCurrentPage(1)
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
                <div className="mt-4 rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 p-6">
                  <div className="error-container mb-4 rounded p-4 text-sm">
                    We couldn't complete your request. Please try refreshing the page or contact
                    cloud support for assistance.
                  </div>
                  <Button
                    type="submit"
                    variant={'default'}
                    rounded={'full'}
                    className="mb-3 w-full"
                    isButton={true}
                    onClick={() => window.location.reload()}
                  >
                    <span className="text-xs leading-5">Refresh page</span>
                  </Button>
                  <Button
                    variant={'secondary'}
                    rounded={'full'}
                    type="submit"
                    className="w-full"
                    href="mailto:cloud-support@signoz.io"
                  >
                    <span className="text-xs leading-5">Contact cloud support</span>
                    <ArrowRight size={14} />
                  </Button>
                </div>
              ) : (
                <form className="w-100 mt-6" onSubmit={handleSubmit}>
                  <div
                    className={`rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 px-6 pt-6 ${pagination && pagination.total > PER_PAGE ? 'pb-0' : 'pb-6'}`}
                  >
                    <label htmlFor="workEmail" className="mb-2 block font-medium">
                      Work email
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="email"
                        id="workEmail"
                        disabled={isSubmitting || submitSuccess}
                        name="workEmail"
                        autoComplete="off"
                        value={workEmail}
                        onChange={handleEmailUpdate}
                        placeholder="E.g. bart@simpsonmail.com"
                        className="flex-1 rounded-sm border border-signoz_slate-400 bg-signoz_ink-300 px-3 py-1.5 text-sm tracking-normal text-stone-300"
                      />
                      {workEmail && submitSuccess && (
                        <Button
                          variant={'secondary'}
                          rounded={'default'}
                          size={'sm'}
                          isButton={true}
                          type="button"
                          onClick={handleChangeEmail}
                          className="gap-2 text-[13px]"
                        >
                          <Pencil size={12} /> Change
                        </Button>
                      )}
                    </div>

                    {errors?.workEmail && (
                      <div className="mt-2 text-xs text-red-400">{errors.workEmail}</div>
                    )}

                    {submitSuccess && userTenants.length > 0 && (
                      <div className="mt-4 rounded-sm border border-signoz_slate-400">
                        <div className="border-b border-signoz_slate-400 px-3 py-2 text-sm font-medium text-signoz_vanilla-100">
                          Associated Teams&apos; URLs
                        </div>

                        {isFetchingPage ? (
                          <div className="flex items-center justify-center py-10">
                            <Loader2 size={18} className="animate-spin text-signoz_vanilla-400" />
                          </div>
                        ) : (
                          userTenants.map((tenant: Tenant) => (
                            <div
                              key={tenant.name}
                              className="flex items-center justify-between border-b border-signoz_slate-400 px-3 py-3 last:border-b-0"
                            >
                              <div className="min-w-0 flex-1 pr-3">
                                <div className="truncate text-sm text-signoz_vanilla-100">
                                  {tenant.name}.{tenant.region.dns}
                                </div>
                                <div className="mt-1 flex items-center">
                                  {tenant.state !== TenantState.DELETED ? (
                                    <span className="flex items-center text-xs text-emerald-400">
                                      <Dot size={16} className="-ml-1 text-signoz_forest-500" />
                                      Active
                                    </span>
                                  ) : (
                                    <span className="flex items-center text-xs text-signoz_vanilla-400 opacity-50">
                                      <Dot size={16} className="-ml-1 text-signoz_slate-100" />
                                      Expired
                                    </span>
                                  )}
                                </div>
                              </div>
                              {tenant.state !== TenantState.DELETED && (
                                <a
                                  href={`https://${tenant.name}.${tenant.region.dns}/login`}
                                  target="_blank"
                                  className="shrink-0 rounded-sm bg-signoz_robin-500 px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                                >
                                  Login
                                </a>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {pagination && pagination.total > PER_PAGE && (
                      <Pagination
                        total={pagination.total}
                        pageSize={PER_PAGE}
                        current={currentPage}
                        onPageChange={handlePageChange}
                        align="end"
                        className="mt-4"
                      />
                    )}
                  </div>

                  {!submitSuccess && (
                    <Button
                      isButton={true}
                      type="submit"
                      variant={'default'}
                      rounded={'full'}
                      disabled={isSubmitting || !isValid}
                      className="mb-4 mt-6 w-full"
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
                <div className="mt-4 text-sm text-signoz_vanilla-400">
                  No deployments are currently associated with this email. You can get started now
                  with a free trial account for 30 days.
                  <Button
                    isButton={true}
                    rounded={'full'}
                    variant={'default'}
                    className="my-4 w-full"
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
          <section className="b mb-6 grid grid-cols-2 items-center gap-4 self-stretch rounded-md border border-signoz_slate-400 bg-signoz_ink-400 p-4 max-md:w-full max-md:max-w-full md:flex md:flex-wrap md:p-2">
            {trustBadges.map((badge, index) => (
              <div
                className="my-auto flex items-center justify-center gap-2.5 self-stretch md:justify-start"
                key={index}
              >
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
