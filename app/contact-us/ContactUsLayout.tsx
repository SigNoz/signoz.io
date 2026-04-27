'use client'

import React from 'react'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useLogEvent } from '@/hooks/useLogEvent'
import HubspotCustomForm from '@/components/hubspot-custom-form/HubspotCustomForm'
import { FocusedNavbar } from '@/components/FocusedNavbar/FocusedNavbar'
import { TRUST_BAR_LOGOS } from '@/constants/trustBarLogos'
import { contactUsData } from './data'

const OPTIONS = [
  {
    title: 'Enterprise Cloud',
    description: 'A dedicated cloud environment with upgraded security and compliance features.',
  },
  {
    title: 'BYOC',
    description:
      'Managed by SigNoz in your cloud. Let the SigNoz team run SigNoz in your cloud infrastructure.',
  },
  {
    title: 'Enterprise Self-Hosted',
    description:
      'Self-host SigNoz in your infrastructure with a support contract from SigNoz team.',
  },
]

export default function ContactUsLayout() {
  const pathname = usePathname()
  const logEvent = useLogEvent()

  const handleSubmitSuccess = () => {
    logEvent({
      eventName: 'Website Click',
      eventType: 'track',
      attributes: {
        clickType: 'Form Submit',
        clickName: 'Contact Us Form Submit',
        clickLocation: 'contact_us_page',
        pageLocation: pathname,
      },
    })
  }

  return (
    <div className="ml-[calc(100%-100vw)] flex w-screen flex-col overflow-hidden bg-signoz_ink-400">
      <FocusedNavbar />
      <div className="mx-auto flex w-full max-w-[1440px] flex-col lg:mt-[8px] lg:h-[calc(100vh-56px)] lg:flex-row">
        {/* Left col — desktop only */}
        <div className="hidden w-full flex-col justify-center p-8 lg:flex lg:w-5/12 lg:py-12 lg:pl-[72px] lg:pr-14">
          <div className="flex max-w-[420px] flex-col gap-8">
            {/* Headline + subtitle */}
            <div className="flex flex-col gap-2">
              <h1 className="text-[36px] font-bold leading-[1.2] tracking-[-1px] text-white">
                Talk to an Engineer.
              </h1>
              <p className="text-[15px] leading-[1.6] text-gray-400">
                30 minutes. No pitch deck. Just your stack, your questions, and a real demo.
              </p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-3">
              <p className="mb-0 text-[11px] font-semibold uppercase tracking-[1.2px] text-gray-500">
                Choose from
              </p>
              <div className="flex flex-col gap-3">
                {OPTIONS.map((opt) => (
                  <div key={opt.title} className="flex items-start gap-2.5">
                    <CheckCircle className="mt-[3px] h-3.5 w-3.5 flex-shrink-0 text-signoz_forest-500" />
                    <div className="flex flex-col">
                      <span className="text-[14px] font-semibold leading-[1.4] text-white">
                        {opt.title}
                      </span>
                      <span className="text-[13px] leading-[1.5] text-gray-500">
                        {opt.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust bar */}
            <div className="flex flex-col gap-3">
              <p className="mb-0 text-[11px] font-semibold uppercase tracking-[1.2px] text-gray-500">
                Trusted by
              </p>
              <div className="grid grid-cols-3 gap-x-12 gap-y-6 opacity-60">
                {TRUST_BAR_LOGOS.map((logo) => (
                  <Image
                    key={logo.src}
                    src={logo.src}
                    alt={logo.alt}
                    width={100}
                    height={28}
                    className="h-6 w-[88px] object-contain"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:flex lg:items-center lg:py-16">
          <div className="h-full w-px bg-signoz_slate-400" />
        </div>

        {/* Right col — form */}
        <div className="relative flex w-full flex-col items-center justify-center p-8 pt-[calc(56px+5vh)] lg:w-7/12 lg:overflow-y-auto lg:px-16 lg:py-14">
          <div className="w-full max-w-[560px] rounded-[12px] border border-signoz_slate-400 bg-signoz_ink-500 px-10 py-10">
            <HubspotCustomForm
              portalId={contactUsData.PORTAL_ID}
              formId={contactUsData.FORM_ID}
              formName={contactUsData.FORM_NAME}
              submitButtonText="Book a Demo"
              selectVariant="pills"
              onSubmitSuccess={handleSubmitSuccess}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
