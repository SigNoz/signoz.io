import React from 'react'
import Image from 'next/image'
import TrackingLink from '@/components/TrackingLink'

export default function GetStartedSigNoz() {
  return (
    <div className="get-started-signoz">
      <p>
        SigNoz cloud is the easiest way to run SigNoz.{' '}
        <TrackingLink
          href="https://signoz.io/teams/"
          clickType="Nav Click"
          clickName="Sign Up Link"
          clickLocation="Get Started SigNoz Card"
          clickText="Sign up"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign up
        </TrackingLink>{' '}
        for a free account and get 30 days of unlimited access to all features.
      </p>

      <TrackingLink
        href="/teams/"
        clickType="Card Click"
        clickName="Get Started SigNoz"
        clickLocation="Get Started SigNoz Card"
        clickText="Start Your Free Trial"
        className="block w-full"
      >
        <Image
          src="/img/launch_week/try-signoz-cloud-blog-cta.png"
          alt="Get Started - Free CTA"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
          style={{ maxWidth: '100%' }}
        />
      </TrackingLink>

      <p>
        You can also install and self-host SigNoz yourself since it is open-source. With 24,000+
        GitHub stars,{' '}
        <TrackingLink
          href="https://github.com/signoz/signoz"
          clickType="External Click"
          clickName="GitHub Repository Link"
          clickLocation="Get Started SigNoz Card"
          clickText="open-source SigNoz"
          className="font-medium text-blue-600 hover:underline"
        >
          open-source SigNoz
        </TrackingLink>{' '}
        is loved by developers. Find the{' '}
        <TrackingLink
          href="/docs/install/"
          clickType="Nav Click"
          clickName="Docs Link"
          clickLocation="Get Started SigNoz Card"
          clickText="instructions"
          className="font-medium text-blue-600 hover:underline"
        >
          instructions
        </TrackingLink>{' '}
        to self-host SigNoz.
      </p>
    </div>
  )
}
