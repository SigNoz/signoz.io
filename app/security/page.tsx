'use client'

import Heading from '@/components/ui/Heading'
import SubHeading from '@/components/ui/SubHeading'
import Image from 'next/image'
import React from 'react'
import Button from '../../components/ui/Button'

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

          <div className="mx-auto max-w-2xl">
            <div className="plans-container mx-auto bg-[#252529]">
              <div className="grid grid-cols-1 rounded-lg px-10 py-8 md:grid-cols-2 md:gap-10">
                <div>
                  <ul className="plans-features m-0">
                    <li className="text-md py-3">SSO and SAML support</li>
                    <li className="text-md py-3">Query API Keys</li>
                    <li className="text-md py-3">Advanced Security</li>
                  </ul>
                </div>
                <div>
                  <div className="flex h-full flex-col justify-between">
                    <ul className="plans-features m-0">
                      <li className="text-md py-3">VPC Peering</li>
                      <li className="text-md py-3">Custom Integrations</li>
                      <li className="text-md py-3">AWS Private Link</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex w-full justify-center pb-8">
                <Button isButton to={'/pricing'} className="button button-sm hidden md:block">
                  Check plans
                </Button>
              </div>
            </div>

            <div>
              <Button
                isButton
                to={'/pricing'}
                className="button button-sm mx-auto my-5 block w-full md:hidden"
              >
                Check plans
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
