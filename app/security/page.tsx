import Heading from '@/components/ui/Heading'
import SubHeading from '@/components/ui/SubHeading'
import { Button } from '@headlessui/react'
import Image from 'next/image'
import React from 'react'

export default function SecurityAndCompliance() {
  return (
    <div className="">
      <section className="py-16">
        <div className="container">
          <div className="mx-auto">
            <div className="flex flex-col gap-5">
              <Heading type={2} className="text-center">
                Security & Compliance
              </Heading>
              <SubHeading className="text-center">
                At Signoz, maintaining the highest standards of security and privacy comes first. We
                are committed to providing observability at any scale by protecting your personal
                information and ensuring a safe and trustworthy experience when using our products
                and services.
              </SubHeading>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-xl">
            <div className="flex flex-col gap-5">
              <div className="mb-0 text-center text-sm">ENTERPRISE GRADE OBSERVABILITY</div>

              <Heading type={2} className="mt-0 p-0 text-center">
                Get access to observability at any scale with advanced security and compliance
              </Heading>
            </div>
          </div>

          <div className="m-8 flex items-center justify-center">
            <Image src="/img/security.png" width={500} height={400} alt="Security Image" />
          </div>
        </div>
      </section>
    </div>
  )
}
