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
  ctaTitle = "Set Up OpenTelemetry with NodeJS in 15 min With Our Guided Onboarding",
  ctaText = "Start your free 30 day trial",
  date,
  readingTime,
  tags = []
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
    const companyEmailPattern = /@(?!gmail|yahoo|hotmail|outlook|live|icloud)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
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
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <div className="w-full bg-gradient-to-r from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-8">
          {/* Tags and Meta Info */}
          <div className="flex flex-wrap gap-2 text-sm text-gray-400">
            {tags.map((tag) => (
              <span key={tag} className="bg-gray-800 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
            <span className="text-gray-400">•</span>
            <span>{date}</span>
            <span className="text-gray-400">•</span>
            <span>{readingTime}</span>
          </div>

          {/* Title and CTA */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {title}
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-300">
              {ctaTitle}
            </h2>
          </div>

          {/* Sign Up Form */}
          <div className="space-y-6 max-w-2xl">
            <div>
              <input
                type="email"
                id="workEmail"
                name="workEmail"
                disabled={isSubmitting}
                value={formData.workEmail}
                onChange={handleInputChange}
                placeholder="Enter your work email"
                className="w-full rounded-sm border border-solid border-gray-600 bg-gray-800 px-4 py-2 text-white"
              />
              {errors?.workEmail && (
                <div className="mt-2 text-xs text-red-400">{errors.workEmail}</div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {regions.map((region) => (
                <button
                  type="button"
                  key={region.id}
                  onClick={() => handleRegionChange(region.id)}
                  className={`flex items-center gap-2 rounded-sm border px-4 py-2 ${
                    region.id === formData.dataRegion 
                    ? 'border-blue-400 bg-blue-900/30' 
                    : 'border-gray-600 bg-gray-800'
                  }`}
                >
                  <Image
                    src={region.iconURL}
                    alt={`${region.name} flag`}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-white">{region.name}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 bg-signoz_robin-500 py-2 pl-4 pr-3 font-medium rounded-full ${isSubmitting ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
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
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
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