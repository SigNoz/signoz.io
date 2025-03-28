import React from 'react'
import Pricing from './Pricing'
import { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: {
    absolute: 'SigNoz | Pricing',
  },
  openGraph: {
    title: 'SigNoz | Pricing',
    description:
      'Explore SigNoz plans and pricing. Transparent & predictable with only usage-based pricing. No user-based pricing, no pricing based on containers, hosts, or nodes. No special pricing for custom metrics.',
  },
  description:
    'Explore SigNoz plans and pricing. Transparent & predictable with only usage-based pricing. No user-based pricing, no pricing based on containers, hosts, or nodes. No special pricing for custom metrics.',
}

export default function PricingPage() {
  return (
    <>
      <Script
        id="chatwoot-init"
        dangerouslySetInnerHTML={{
          __html: `(function(d,t) {
    var BASE_URL="https://app.chatwoot.com";
    var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=BASE_URL+"/packs/js/sdk.js";
    g.defer = true;
    g.async = true;
    s.parentNode.insertBefore(g,s);
    g.onload=function(){
      window.chatwootSDK.run({
        websiteToken: '${process.env.NEXT_PUBLIC_CHATWOOT_TOKEN}',
        baseUrl: BASE_URL
      })
    }
  })(document,"script")`,
        }}
      />
      <Pricing />
    </>
  )
}
