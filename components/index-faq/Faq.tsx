'use client'

import { ChevronDown } from 'lucide-react'
import { type ReactNode } from 'react'
import { useState } from 'react'

import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import { useLogEvent } from '@/hooks/useLogEvent'
import { type HomepageFaqItem, homepageFaqItems } from './faqContent'

function renderAnswer({ answer, link }: Pick<HomepageFaqItem, 'answer' | 'link'>): ReactNode {
  if (!link) return answer

  return (
    <>
      {link.before}
      <TrackingLink
        className="text-signoz_robin-300 underline underline-offset-4 transition-colors hover:text-signoz_robin-200"
        clickLocation="Homepage FAQ Section"
        clickName={link.trackingName}
        clickText={link.text}
        clickType="Inline Link"
        href={link.href}
      >
        {link.text}
      </TrackingLink>
      {link.after}
    </>
  )
}

function FaqItem({ answer, link, question }: HomepageFaqItem) {
  const [isOpen, setIsOpen] = useState(false)
  const logEvent = useLogEvent()

  return (
    <div className="bg-signoz_ink-500/72 rounded-xl border border-signoz_slate-400/35 transition-colors hover:border-signoz_slate-300/50 sm:rounded-2xl">
      <button
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:gap-6 sm:px-6 sm:py-6 md:px-8"
        onClick={() => {
          logEvent({
            eventName: 'Website Click',
            eventType: 'track',
            attributes: {
              clickType: 'FAQ Toggle',
              clickName: 'Homepage FAQ Toggle',
              clickLocation: 'Homepage FAQ Section',
              clickText: question,
            },
          })
          setIsOpen((current) => !current)
        }}
        type="button"
      >
        <span className="text-base font-medium leading-6 tracking-normal text-signoz_vanilla-100 sm:text-lg sm:leading-7 md:text-xl">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-signoz_vanilla-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`duration-250 grid transition-[grid-template-rows] ease-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="m-0 max-w-4xl px-5 pb-5 text-base leading-7 tracking-normal text-signoz_vanilla-400 sm:px-6 sm:pb-6 md:px-8 md:text-base">
            {renderAnswer({ answer, link })}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section
      className="relative left-1/2 mx-auto w-dvw max-w-none -translate-x-1/2 px-5 py-16 sm:px-6 sm:py-24 lg:px-20 lg:py-32 wide:max-w-8xl wide:px-0"
      data-homepage-floating-stop="true"
    >
      <div className="mx-auto grid max-w-8xl gap-10 lg:grid-cols-3 lg:gap-12">
        <div>
          <h2 className="m-0 max-w-md text-3xl font-medium leading-none tracking-tight text-signoz_vanilla-100 sm:text-4xl md:text-5xl md:leading-none">
            Your questions,
            <br />
            <span className="text-signoz_vanilla-400">answered.</span>
          </h2>
          <p className="m-0 mt-5 max-w-md text-base leading-7 tracking-normal text-signoz_vanilla-400 sm:mt-6 sm:text-lg sm:leading-8">
            Quick answers to the questions teams usually ask while evaluating SigNoz Cloud.
          </p>
          <TrackingLink
            className="mt-8 block w-full max-w-sm"
            clickLocation="Homepage FAQ Section"
            clickName="Contact Us Button"
            clickText="Contact us"
            clickType="Primary CTA"
            href="/contact-us/?source=homepage"
          >
            <Button as="span" className="!w-full" variant="legacyPrimary" withIcon>
              Contact us
            </Button>
          </TrackingLink>
        </div>

        <div className="space-y-3 lg:col-span-2">
          {homepageFaqItems.map((faq) => (
            <FaqItem key={faq.question} {...faq} />
          ))}
        </div>
      </div>
    </section>
  )
}
