import React from 'react'
import CTAButton from './CTAButton'
import Link from 'next/link'
import Button from '@/components/Button/Button'
import { BUTTON_TYPES } from '@/components/Button/Button'

export default function CTASection() {
  return (
    <section className="to-primary/10 bg-gradient-to-b from-background py-20">
      <div className="container mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#1c1c21] to-[#252530] shadow-xl">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="mb-4 text-3xl font-bold">
                Ready to supercharge your startup's observability?
              </h2>

              <p className="mb-8 text-gray-300">
                Start using SigNoz to monitor your applications without breaking the bank.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <CTAButton />

                <Link href="/teams/">
                  <Button
                    type={BUTTON_TYPES.SECONDARY}
                    className="rounded-md px-6 py-2 font-medium text-white hover:opacity-90 md:px-6 md:py-3"
                  >
                    Start your free trial
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative hidden h-full min-h-[300px] md:block">
              <div className="absolute inset-0 z-10 bg-gradient-to-l from-transparent to-[#1c1c21]/90"></div>
              <div className="h-full w-full bg-[url('/img/landing/landing_thumbnail.webp')] bg-cover bg-center"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
