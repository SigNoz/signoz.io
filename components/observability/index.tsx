import React from 'react'
import Image from 'next/image'
import Button from '../../components/ui/Button'
import { ArrowRightSolid } from '@/components/homepage-icons/icons'
import TrackingLink from '../TrackingLink'
import featureGraphicEnterprise2 from '@/public/img/graphics/homepage/feature-graphic-enterprise-2.svg?url'

const Observability = () => {
  return (
    <section>
      <div className="border-border flex h-auto w-auto flex-col border !border-r-0 !border-b-0 border-dashed px-8 py-10 md:pl-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="flex shrink-[10] flex-col justify-between">
            <p className="text-l1-foreground mb-2 block text-2xl font-semibold">
              {' '}
              Enterprise-grade Observability
            </p>
            <p className="text-muted-foreground text-base leading-9 font-normal">
              Get access to observability at any scale with advanced security and compliance.
            </p>
            <TrackingLink
              href="/why-signoz/"
              clickType="Secondary CTA"
              clickName="Why SigNoz Button"
              clickLocation="Observability Section"
              clickText="Why SigNoz"
            >
              <Button variant="secondary" rounded="full" isButton>
                Why SigNoz
              </Button>
            </TrackingLink>

            <ul className="ul-no-padding flex flex-col gap-3">
              <li className="flex flex-row items-center gap-3">
                <ArrowRightSolid />
                <span className="text-muted-foreground text-base leading-9 font-normal">
                  SSO and SAML support
                </span>
              </li>
              <li className="flex flex-row items-center gap-3">
                <ArrowRightSolid />
                <span className="text-muted-foreground text-base leading-9 font-normal">
                  Query API Keys
                </span>
              </li>
              <li className="flex flex-row items-center gap-3">
                <ArrowRightSolid />
                <span className="text-muted-foreground text-base leading-9 font-normal">
                  Advanced Security
                </span>
              </li>
            </ul>
          </div>
          <div className="mx-auto aspect-[272/404] w-[272px] max-w-[min(272px,50%)] md:shrink-0">
            <Image
              src={featureGraphicEnterprise2}
              alt="Enterprise-grade Observability"
              width={272}
              height={404}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Observability
