import React from 'react'
import Image from 'next/image'
import ContactFormCustom from './components/ContactFormCustom'
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
        <div className="hidden w-full flex-col justify-center bg-signoz_ink-500 p-8 lg:flex lg:w-5/12 lg:py-12 lg:pl-[72px] lg:pr-14">
          <div className="flex max-w-[420px] flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h1 className="text-[40px] font-bold leading-[1.15] tracking-[-1.2px] text-white">
                See SigNoz in action.
              </h1>
              <p className="text-[14px] leading-[1.6] text-[#9CA3AF]">
                30 minutes. No pitch deck. Just your stack,
                <br />
                your questions, and a real demo.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {OPTIONS.map((opt) => (
                <div key={opt} className="flex items-start gap-2.5">
                  <span className="mt-px flex-shrink-0 text-[14px] text-[#22C55E]">✓</span>
                  <span className="text-[14px] leading-[1.5] text-[#9CA3AF]">{opt}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#4B5563]">
                Trusted by
              </p>
              <div className="flex items-center gap-6 opacity-50">
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
        </div>

        {/* Right col — form */}
        <div className="relative flex w-full flex-col items-center justify-center bg-[#111318] p-8 pt-[calc(56px+5vh)] lg:w-7/12 lg:overflow-y-auto lg:border-l lg:border-[#1D2026] lg:px-16 lg:py-14">
          <div className="w-full max-w-[560px] rounded-[12px] border border-[#1D2026] bg-[#0B0C0E] px-10 py-10">
            <h2 className="mb-[6px] text-xl font-semibold text-[#ECE8E1]">Book a Demo</h2>
            <p className="mb-7 text-[13px] leading-4 text-[#6B7280]">
              30-min call with a SigNoz observability expert.
            </p>
            <ContactFormCustom />
          </div>
        </div>
      </div>
    </div>
  )
}
