import React from 'react'
import CTAButton from './CTAButton'
import Link from 'next/link'

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

                <Link
                  href="/teams/"
                  className="inline-flex items-center justify-center rounded-md border border-gray-600 bg-transparent px-6 py-2 font-medium text-white hover:border-[#BE6BF1]"
                >
                  Start your free trial
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
