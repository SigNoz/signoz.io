'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const CTA = () => {
  const scrollToForm = () => {
    // Scroll to the top of the page where the form is located
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <section className="to-primary/10 bg-gradient-to-b from-background py-20">
      <div className="container mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
        <motion.div
          className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#1c1c21] to-[#252530] shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <motion.h2
                className="mb-4 text-3xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Ready to supercharge your startup's observability?
              </motion.h2>

              <motion.p
                className="mb-8 text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Start using SigNoz to monitor your applications without breaking the bank.
              </motion.p>

              <motion.div
                className="flex flex-col gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <button
                  onClick={scrollToForm}
                  className="rounded-md bg-gradient-to-r from-[#BE6BF1] to-[#4568DC] px-6 py-2 font-medium text-white hover:opacity-90"
                >
                  Apply Now
                </button>

                <Link
                  href="/teams/"
                  className="inline-flex items-center justify-center rounded-md border border-gray-600 bg-transparent px-6 py-2 font-medium text-white hover:border-[#BE6BF1]"
                >
                  Start your free trial
                </Link>
              </motion.div>
            </div>

            <div className="relative hidden h-full min-h-[300px] md:block">
              <div className="absolute inset-0 z-10 bg-gradient-to-l from-transparent to-[#1c1c21]/90"></div>
              <div className="h-full w-full bg-[url('/img/landing/landing_thumbnail.webp')] bg-cover bg-center"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
