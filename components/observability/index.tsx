'use client'
import React from 'react'
import Heading from '../../components/ui/Heading'
import Button from '../../components/ui/Button'
import { ArrowRightSolid } from '@/components/homepage-icons/icons'

const Observability = () => {
  return (
    <section>
      <div className="flex h-auto w-auto flex-col border !border-b-0 !border-r-0 border-dashed border-signoz_slate-400 px-8 py-10 pl-0 md:px-0 md:pl-10">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div className="flex shrink-[10] flex-col justify-between">
            <div>
              <p className="mb-2 block text-2xl font-semibold text-signoz_vanilla-100">
                {' '}
                Enterprise-grade Observability
              </p>
              <p className="text-base font-normal leading-9 text-signoz_vanilla-400">
                Get access to observability at any scale with advanced security and compliance.
              </p>
            </div>
            <div>
              <ul className="ul-no-padding flex flex-col gap-3">
                <li className="flex flex-row items-center gap-3">
                  <ArrowRightSolid />
                  <span className="text-base font-normal leading-9 text-signoz_vanilla-400">
                    SSO and SAML support
                  </span>
                </li>
                <li className="flex flex-row items-center gap-3">
                  <ArrowRightSolid />
                  <span className="text-base font-normal leading-9 text-signoz_vanilla-400">
                    Query API Keys
                  </span>
                </li>
                <li className="flex flex-row items-center gap-3">
                  <ArrowRightSolid />
                  <span className="text-base font-normal leading-9 text-signoz_vanilla-400">
                    Advanced Security
                  </span>
                </li>
                <li className="flex flex-row items-center gap-3">
                  <ArrowRightSolid />
                  <span className="text-base font-normal leading-9 text-signoz_vanilla-400">
                    VPC Peering
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="hidden aspect-[272/404] w-[272px] max-w-[50vw] md:block">
            <img src="/img/graphics/homepage/feature-graphic-enterprise-2.webp" alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Observability
