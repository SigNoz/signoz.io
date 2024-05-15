'use client'
import React from 'react'
import Heading from '../../components/ui/Heading'
import Button from '../../components/ui/Button'

const Observability = () => {
  return (
    <section>
      <div className="container mt-16">
        <div className="mb-5 flex flex-col items-center text-center">
          <Heading type={4}>Enterprise Grade Observability</Heading>
          <Heading type={1}>
            Get access to observability at any scale&nbsp;
            <br className="hidden lg:inline" />
            with advanced security and compliance.
          </Heading>
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="plans-container mx-auto grid grid-cols-1 rounded-lg bg-[#252529] px-10 py-8 md:grid-cols-2 md:gap-10">
            <div>
              <ul className="plans-features m-0">
                <li className="py-3 text-lg">SSO and SAML support</li>
                <li className="py-3 text-lg">Query API Keys</li>
                <li className="py-3 text-lg">Advanced Security</li>
                <li className="py-3 text-lg">AWS Private Link</li>
              </ul>
            </div>
            <div>
              <div className="flex h-full flex-col justify-between">
                <ul className="plans-features m-0">
                  <li className="py-3 text-lg">VPC Peering</li>
                  <li className="py-3 text-lg">Custom Integrations</li>
                </ul>
                <Button isButton to={'pricing'} className="hidden md:block">
                  Check plans
                </Button>
              </div>
            </div>
          </div>
          <div>
            <Button isButton to={'pricing'} className="mx-auto my-5 block w-full md:hidden">
              Check plans
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Observability
