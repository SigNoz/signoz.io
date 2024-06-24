'use client'
import React from 'react'
import Heading from '../../components/ui/Heading'
import Button from '../../components/ui/Button'
import {ArrowRightSolid }from "@/components/homepage-icons/icons"


const Observability = () => {
  return (
    <section>
    <div className='container flex flex-col w-auto h-auto'>
      <div className="flex flex-row">
        <div>
        <p> Enterprise-grade Observability</p>
        <p>Get access to observability at any scale with advanced security and compliance.</p>
        <ul>
          <li className="flex flex-row">
          <ArrowRightSolid/><span>SSO and SAML support</span>
          </li>
          <li className="flex flex-row">
          <ArrowRightSolid/><span>Query API Keys</span>
          </li>
          <li className="flex flex-row">
          <ArrowRightSolid/><span>Advanced Security</span>
          </li>
          <li className="flex flex-row">
          <ArrowRightSolid/><span>AWS Private Link</span>
          </li>
          <li className="flex flex-row">
          <ArrowRightSolid/><span>VPC Peering</span>
          </li>
          <li className="flex flex-row">
          <ArrowRightSolid/><span>Custom Integrations</span>
          </li>
        </ul>
        </div>
        <div className="h-[352px] w-[449px] bg-signoz_ink-400">

        </div>
      </div>
    </div>
  </section>
    
  )
}

export default Observability
