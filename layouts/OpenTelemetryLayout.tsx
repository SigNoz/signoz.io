'use client'

import { ReactNode, useRef, useState } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import SectionContainer from '@/components/SectionContainer'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import PageFeedback from '@/components/PageFeedback/PageFeedback'
import Image from 'next/image'
import { ArrowDown, ArrowRight, Loader2 } from 'lucide-react'
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

const OpenTelemetryBanner = ({
  title,
  ctaTitle = 'Get Started with OTel in 15 min with Our Guided Onboarding',
  ctaText = 'Start your free 30 day trial',
  date,
  readingTime,
  tags = [],
}: OpenTelemetryBannerProps) => {
  const [formData, setFormData] = useState({
    workEmail: '',
    dataRegion: 'us',
  })
  const [errors, setErrors] = useState<{ workEmail?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleRegionChange = (selectedDataRegion: string): void => {
    setFormData({ ...formData, dataRegion: selectedDataRegion })
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

  const scrollToContent = () => {
    const firstHeading = document.querySelector('.prose p')
    if (firstHeading) {
      const yOffset = -120 // Add a small offset from the top
      const y = firstHeading.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({
        top: y,
        behavior: 'smooth',
      })
    }
  }

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

          {/* Sign Up Form Section */}
          <div className="max-w-4xl space-y-6 py-2">
            {/* CTA Title */}
            <h2 className="text-xl leading-relaxed text-gray-300 md:text-2xl">{ctaTitle}</h2>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="workEmail" className="mb-2 block text-sm text-gray-400">
                  Work Email
                </label>
                <input
                  type="email"
                  id="workEmail"
                  name="workEmail"
                  disabled={isSubmitting}
                  value={formData.workEmail}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-solid border-signoz_slate-400 bg-signoz_ink-300 px-6 py-3 text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-400">Data Region</label>
                <div className="flex gap-3">
                  {regions.map((region) => (
                    <button
                      type="button"
                      key={region.id}
                      onClick={() => handleRegionChange(region.id)}
                      className={`flex items-center gap-3 rounded-lg border px-6 py-3 ${
                        region.id === formData.dataRegion
                          ? 'border-[#4e74f866] bg-[#4e74f833]'
                          : 'border-signoz_slate-400 bg-signoz_ink-300'
                      }`}
                    >
                      <Image
                        src={region.iconURL}
                        alt={`${region.name} flag`}
                        width={20}
                        height={20}
                        className="h-5 w-5"
                      />
                      <span className="text-white">{region.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {errors?.workEmail && (
              <div className="mt-2 text-xs text-red-400">{errors.workEmail}</div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`flex w-full items-center justify-center gap-2 rounded-full bg-signoz_robin-500 px-6 py-3 font-medium ${isSubmitting ? 'cursor-not-allowed opacity-60' : 'cursor-pointer transition-colors hover:bg-signoz_robin-600'}`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2 text-sm">
                  Starting your free 30-day trial
                  <Loader2 size={16} className="animate-spin" />
                </div>
              ) : (
                <span className="flex items-center gap-1.5 px-px text-sm">
                  {ctaText}
                  <ArrowRight size={16} />
                </span>
              )}
            </button>
          </div>

          {/* Read Article Button */}
          <button
            onClick={scrollToContent}
            className="flex w-full items-center justify-center gap-2 pt-4 text-gray-400 transition-colors hover:text-white"
          >
            Read Article
            <ArrowDown size={20} />
          </button>
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

  return (
    <main ref={mainRef} className="container mx-auto">
      <ScrollTopAndComment />
      <OpenTelemetryBanner
        title={title}
        ctaTitle={cta_title}
        ctaText={cta_text}
        date={date}
        readingTime={readingTime.text}
        tags={tags}
      />
      <SectionContainer>
        <div className="post container flex flex-row-reverse overflow-clip">
          <div className="post-toc ml-4 w-1/4">
            {toc.map((tocItem: tocItemProps) => {
              return (
                <div className="post-toc-item" key={tocItem.url}>
                  <a data-level={tocItem.depth} href={tocItem.url} className="line-clamp-2">
                    {tocItem.value}
                  </a>
                </div>
              )
            })}
          </div>

          <div className="post-content w-3/4 pr-4">
            <article className="prose prose-slate max-w-none py-6 dark:prose-invert">
              {children}
            </article>
          </div>
        </div>
        <PageFeedback />
      </SectionContainer>
      <ProgressBar target={mainRef} />
    </main>
  )
}
