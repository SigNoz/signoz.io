'use client'

import { ReactNode, useRef, useState, useEffect } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import SectionContainer from '@/components/SectionContainer'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import PageFeedback from '@/components/PageFeedback/PageFeedback'
import Image from 'next/image'
import { ArrowDown, ArrowRight, Loader2, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Extend the Blog type to include CTA fields
interface OpenTelemetryContent extends Blog {
  cta_title?: string
  cta_text?: string
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

interface OpenTelemetryBannerProps {
  title: string
  ctaTitle?: string
  ctaText?: string
  date: string
  readingTime: string
  tags?: string[]
}

const OpenTelemetryBanner = ({ title, date, readingTime, tags = [] }: OpenTelemetryBannerProps) => {
  return (
    <div className="relative w-full px-4 py-12 md:py-16">
      {/* Dotted background pattern */}
      <div className="-z-10">
        <div className="bg-dot-pattern masked-dots absolute top-0 flex h-[200vh] w-full items-center justify-center opacity-100" />
        <div className="absolute left-0 right-0 top-0 mx-auto h-[600px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[1200px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col space-y-6">
          {/* Top row with tags and meta info */}
          <div className="flex items-start justify-between">
            {/* Tags */}
            <div className="flex w-3/4 flex-wrap items-center gap-3">
              <a
                href="/resource-center/opentelemetry/"
                target="_blank"
                className="flex w-fit items-center gap-2 rounded-full border border-signoz_ink-300 bg-signoz_ink-300/50 px-4 py-1.5 text-sm text-gray-400 transition-colors hover:border-signoz_robin-500 hover:text-white"
              >
                <span>Part of OpenTelemetry Track</span>
                <ArrowRight size={14} className="rotate-[-45deg]" />
              </a>
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-2 rounded-full bg-signoz_ink-300 px-4 py-1.5"
                >
                  <span className="text-sm font-medium text-white">{tag}</span>
                </div>
              ))}
            </div>

            {/* Meta info */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span>•</span>
              <span>{readingTime}</span>
            </div>
          </div>

          {/* Title section */}
          <div className="py-2">
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export interface tocItemProps {
  url: string
  depth: number
  value: string
}

interface LayoutProps {
  content: CoreContent<OpenTelemetryContent>
  authorDetails: CoreContent<Authors>[]
  authors: string[]
  children: ReactNode
  toc: tocItemProps[]
}

export default function OpenTelemetryLayout({ content, authors, children, toc }: LayoutProps) {
  const { slug, date, title, tags, readingTime, cta_title, cta_text } = content
  const mainRef = useRef<HTMLElement | null>(null)
  const tocRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState<string>('')
  const [showSignUpStrip, setShowSignUpStrip] = useState(false)
  const [formData, setFormData] = useState({
    workEmail: '',
    dataRegion: 'us',
  })
  const [errors, setErrors] = useState<{ workEmail?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false)

  // Handle scroll to show/hide sign-up strip
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const showThreshold = 400 // Adjust this value to control when the strip appears
      setShowSignUpStrip(scrollPosition > showThreshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first element that is intersecting
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          // Sort by their position and select the one closest to the top
          const sortedEntries = visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )
          const id = sortedEntries[0].target.getAttribute('id')
          if (id) setActiveSection(`#${id}`)
        }
      },
      {
        // This creates a trigger zone near the top of the viewport
        rootMargin: '-10% -20% -80% -20%',
        threshold: 0,
      }
    )

    const headings = document.querySelectorAll('h2, h3')
    headings.forEach((heading) => observer.observe(heading))

    return () => {
      headings.forEach((heading) => observer.unobserve(heading))
    }
  }, [])

  // Effect to handle TOC scrolling
  useEffect(() => {
    if (!tocRef.current || !activeSection) return

    const activeElement = tocRef.current.querySelector(`a[href="${activeSection}"]`)
    if (!activeElement) return

    const tocContainer = tocRef.current
    const containerHeight = tocContainer.clientHeight
    const activeElementTop = activeElement.getBoundingClientRect().top
    const containerTop = tocContainer.getBoundingClientRect().top
    const relativePosition = activeElementTop - containerTop

    // If the active element is not in view, scroll to it
    if (relativePosition < 0 || relativePosition > containerHeight) {
      tocContainer.scrollTo({
        top: tocContainer.scrollTop + relativePosition - containerHeight / 2,
        behavior: 'smooth',
      })
    }
  }, [activeSection])

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
        localStorage.setItem('workEmail', formData.workEmail)
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
    <main ref={mainRef}>
      <ScrollTopAndComment />

      {/* Floating Sign-up Strip */}
      <div
        className={`fixed left-0 right-0 top-0 z-40 transform bg-gradient-to-r from-[#1C1512] via-[#261A15] to-[#1C1512] transition-all duration-300 ease-in-out ${
          showSignUpStrip ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-8">
            <div className="text-sm text-gray-300">
              <strong>
                {cta_title || 'Get Started with OTel in 15 min with Our Guided Onboarding'}
              </strong>
            </div>
            <div className="flex items-end gap-4">
              <div className="flex flex-col gap-1">
                {/* <label htmlFor="workEmail" className="text-xs font-medium text-gray-400">
                  Work Email
                </label> */}
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
                {/* <label className="text-xs font-medium text-gray-400">Data Region</label> */}
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
                {cta_text || 'Start your free 30-day trial'}
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </div>
        {errors?.workEmail && (
          <div className="bg-red-500/10 px-4 py-1.5 text-center text-xs text-red-400">
            {errors.workEmail}
          </div>
        )}
      </div>

      <OpenTelemetryBanner title={title} date={date} readingTime={readingTime.text} tags={tags} />
      <SectionContainer>
        <div className="post relative flex">
          {/* Main content area centered in the remaining space */}
          <div className="mx-auto w-full max-w-3xl">
            <article className="prose prose-slate max-w-none py-6 dark:prose-invert">
              {children}
            </article>
          </div>

          {/* Table of Contents */}
          <div className="post-toc fixed right-0 top-[120px] h-screen w-64 border-l border-signoz_ink-300 pl-8">
            <div
              ref={tocRef}
              className="flex h-[calc(100vh-180px)] flex-col gap-1.5 overflow-y-auto"
            >
              {toc.map((tocItem: tocItemProps) => {
                const isActive = activeSection === tocItem.url
                return (
                  <div
                    className="post-toc-item"
                    key={tocItem.url}
                    style={{ paddingLeft: `${(tocItem.depth - 1) * 12}px` }}
                  >
                    <a
                      data-level={tocItem.depth}
                      href={tocItem.url}
                      className={`line-clamp-2 text-[11px] transition-colors hover:text-white ${
                        isActive ? 'font-medium text-signoz_robin-500' : 'text-gray-500'
                      }`}
                    >
                      {tocItem.value}
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </SectionContainer>
      <ProgressBar target={mainRef} />
    </main>
  )
}
