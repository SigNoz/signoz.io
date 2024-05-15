'use client'

import React from 'react'
import Heading from '../../components/ui/Heading'
import SubHeading from '../../components/ui/SubHeading'
import Button from '../../components/ui/Button'

const DataProtectionLaws = () => {
  return (
    <section>
      <div className="container mb-24 mt-5">
        <div className="mb-1 flex flex-col items-center text-center">
          <Heading type={1}>
            Worried about data protection laws?&nbsp;
            <br className="hidden lg:inline" />
            We can help.
          </Heading>
        </div>
        <div className="self-hosted-data-protection mx-auto my-16 max-w-4xl grid-cols-2 gap-10 md:grid">
          <div className="mb-10 flex flex-col justify-between gap-5 text-center md:pl-5 md:text-left">
            <div>
              <Heading type={4}>For SigNoz Cloud</Heading>
              <Heading type={3}>Send data to your preferred hosting location</Heading>
              <SubHeading>
                Store your data in the US, EU or India region depending on your needs.
              </SubHeading>
            </div>
            <div className="flex flex-wrap justify-center gap-5 md:justify-start">
              <div className="flex flex-col items-center justify-center gap-1 md:items-start">
                <img src="/img/landing/us.webp" alt="flag of hosting available" />
                <span>US Cloud</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 md:items-start">
                <img src="/img/landing/eu.webp" alt="flag of hosting available" />
                <span>EU Cloud</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 md:items-start">
                <img src="/img/landing/india.webp" alt="flag of hosting available" />
                <span>India Cloud</span>
              </div>
            </div>
            <Button to="/teams">Try SigNoz Cloud</Button>
          </div>
          <div className="mb-10 flex flex-col justify-between gap-5 text-center md:pl-5 md:text-left">
            <div>
              <Heading type={4}>For Self-Hosted</Heading>
              <Heading type={3}>Have your customer data in your infra</Heading>
              <SubHeading>
                You can self-host SigNoz or opt for our managed self-hosted offerings to have
                complete adherence to data privacy and regulation laws.
              </SubHeading>
            </div>
            <div className="flex flex-wrap justify-center gap-5 md:justify-start">
              <div className="flex flex-col items-center justify-center gap-1 md:items-start">
                <img src="/img/landing/data-privacy.webp" alt="data privacy available" />
                <span>Data Privacy</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-5 md:items-start md:gap-0 lg:flex-row lg:justify-between">
              <Button to="/docs/install/">Self Host</Button>
              <Button to="/enterprise/">Managed by SigNoz in your cloud</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DataProtectionLaws
