import React from 'react'
import Image from 'next/image'
import ContactForm from './components/ContactForm'
import { contactUsData } from './data'
import { FocusedNavbar } from '@/components/FocusedNavbar/FocusedNavbar'

const TRUST_BAR_LOGOS = [
  { src: '/img/users/netapp.svg', alt: 'NetApp' },
  { src: '/img/users/samsung.svg', alt: 'Samsung' },
  { src: '/img/users/comcast.svg', alt: 'Comcast' },
  { src: '/img/users/salesforce.svg', alt: 'Salesforce' },
  { src: '/svgs/icons/sarvam.svg', alt: 'Sarvam AI' },
  { src: '/svgs/icons/blaxel.svg', alt: 'Blaxel' },
]

const OPTIONS = [
  'Enterprise Cloud — dedicated environment with security & compliance',
  'BYOC — SigNoz managed in your own cloud infrastructure',
  'Enterprise Self-Hosted — with dedicated support contract',
]

export default function ContactUsLayout() {
  return (
    <div className="ml-[calc(100%-100vw)] flex w-screen flex-col overflow-hidden bg-signoz_ink-500">
      <FocusedNavbar />
      <div className="flex flex-col lg:mt-[8px] lg:h-[calc(100vh-56px)] lg:flex-row">
        {/* Left col — desktop only */}
        <div className="hidden flex-col justify-between bg-signoz_ink-500 p-12 pt-[120px] lg:flex lg:w-5/12">
          <div>
            <h1 className="mb-3 text-[2.5rem] font-bold leading-[1.15] tracking-tight text-white">
              See SigNoz
              <br />
              in action.
            </h1>
            <p className="mb-8 text-sm leading-relaxed text-signoz_slate-50">
              30 minutes. No pitch deck. Just your stack,
              <br />
              your questions, and a real demo.
            </p>
            <div className="space-y-3.5">
              {OPTIONS.map((opt) => (
                <div key={opt} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex-shrink-0 text-sm text-signoz_forest-500">✓</span>
                  <span className="text-sm text-signoz_vanilla-400">{opt}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-signoz_slate-100">
              Trusted by
            </p>
            <div className="flex items-center gap-6">
              {TRUST_BAR_LOGOS.map((logo) => (
                <Image
                  key={logo.src}
                  src={logo.src}
                  alt={logo.alt}
                  width={60}
                  height={16}
                  className="h-3.5 w-[56px] object-contain"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right col — form */}
        <div className="relative flex w-full flex-col items-center justify-center bg-signoz_ink-300 p-8 pt-[calc(56px+5vh)] lg:w-7/12 lg:overflow-y-auto lg:border-l lg:border-signoz_slate-500 lg:p-12 lg:pt-12">
          <div className="w-full max-w-lg rounded-xl border border-signoz_slate-400 bg-signoz_ink-500 p-8">
            <h2 className="mb-1 text-xl font-semibold text-white">Book a Demo</h2>
            <p className="mb-6 text-sm text-signoz_vanilla-100/60">
              30-min call with a SigNoz observability expert.
            </p>
            <ContactForm
              portalId={contactUsData.PORTAL_ID}
              formId={contactUsData.FORM_ID}
              formName={contactUsData.TITLE}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
