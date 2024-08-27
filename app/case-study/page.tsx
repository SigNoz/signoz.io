import Link from 'next/link';
import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import Button from '@/components/Button/Button';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SigNoz Customer Stories',
  description: 'SigNoz Customer Stories',
};

type CardProps = {
  logo?: string,
  title?: string,
  name?: string,
  position?: string,
  href: string
}

const cardDetails = [
  {
    logo: "/svgs/customer_stories/tableflow-logo.svg",
    title: "How TableFlow Uses SigNoz to Improve Service Reliability and Resolve Issues Quickly",
    name: "John Collison",
    position: "Founder & Chairman, Stripe",
    href: "/pricing/"
  },
  {
    logo: "/svgs/customer_stories/tableflow-logo.svg",
    title: "How TableFlow Uses SigNoz to Improve Service Reliability and Resolve Issues Quickly",
    name: "John Collison",
    position: "Founder & Chairman, Stripe",
    href: "/pricing/"
  },
  {
    logo: "/svgs/customer_stories/tableflow-logo.svg",
    title: "How TableFlow Uses SigNoz to Improve Service Reliability and Resolve Issues Quickly",
    name: "John Collison",
    position: "Founder & Chairman, Stripe",
    href: "/pricing/"
  },
  {
    logo: "/svgs/customer_stories/tableflow-logo.svg",
    title: "How TableFlow Uses SigNoz to Improve Service Reliability and Resolve Issues Quickly",
    name: "John Collison",
    position: "Founder & Chairman, Stripe",
    href: "/pricing/"
  },
  {
    logo: "/svgs/customer_stories/tableflow-logo.svg",
    title: "How TableFlow Uses SigNoz to Improve Service Reliability and Resolve Issues Quickly",
    name: "John Collison",
    position: "Founder & Chairman, Stripe",
    href: "/pricing/"
  },
  {
    logo: "/svgs/customer_stories/tableflow-logo.svg",
    title: "How TableFlow Uses SigNoz to Improve Service Reliability and Resolve Issues Quickly",
    name: "John Collison",
    position: "Founder & Chairman, Stripe",
    href: "/pricing/"
  },
  {
    logo: "/svgs/customer_stories/tableflow-logo.svg",
    title: "How TableFlow Uses SigNoz to Improve Service Reliability and Resolve Issues Quickly",
    name: "John Collison",
    position: "Founder & Chairman, Stripe",
    href: "/pricing/"
  },
  {
    logo: "/svgs/customer_stories/tableflow-logo.svg",
    title: "How TableFlow Uses SigNoz to Improve Service Reliability and Resolve Issues Quickly",
    name: "John Collison",
    position: "Founder & Chairman, Stripe",
    href: "/pricing/"
  },
]

function caseStudies() {
  return (
    <div className="relative mt-[-30px] bg-signoz_ink-500 ">
      <section>
        <div className="container mx-auto border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400" style={{ marginTop: '2rem', paddingBottom: '64px' }}>
          <div className="absolute left-0 right-0 top-0 h-screen bg-[url('/img/background_blur/Perlin_noise.png')] bg-[length:55%] bg-[center_top_-1rem]  z-[0] bg-no-repeat" />
          <div className="absolute left-0 right-0 top-0 h-screen bg-[url('/img/background_blur/Ellipse_388.png')] bg-[length:110%] bg-no-repeat sm:bg-[center_top_-55rem] z-[0] " />
          <div className='relative font-mono uppercase text-signoz_sakura-400 text-sm font-medium mb-3 text-center pt-24'> Customer Stories </div>
          <div className='relative text-[28px] text-signoz_robin-100 font-semibold mb-4 text-center'> Observability for teams of all-sizes</div>
          <p className='relative text-lg text-signoz_vanilla-400 text-center mb-20'>
            SigNoz powers observability for thousands of high-impact engineering teams. From cutting-<br />
            edge startups to public companies, eng. teams use SigNoz to build resilient applications.
          </p>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {cardDetails.map((customer, index) => (
              <CustomerCard
                key={index}
                logo={customer.logo}
                title={customer.title}
                name={customer.name}
                position={customer.position}
                href={customer.href}
              />
            ))}
          </div>
        </div>
        <GetStarted page="Customer-Stories" />
      </section>
    </div>
  );
}

export default caseStudies;

const CustomerCard: React.FC<CardProps> = ({ logo, title, name, position, href }) => {
  return (
    <Link href={href}>
      <div className='p-12 bg-signoz_ink-400 border border-signoz_slate-400 rounded cursor-pointer hover:bg-signoz_ink-300'>
        <div className='flex flex-col gap-3'>
          <div className='mb-4'>
            <img src={logo} />
          </div>
          <div className='text-base font-semibold'>{title}</div>
          <div>
            <div className='flex justify-between items-center'>
              <div className='flex flex-col text-signoz_vanilla-400 gap-1'>
                <div className='text-sm font-medium text-[#C0C1C3]'>{name}</div>
                <div className='text-xs font-medium text-signoz_slate-50'>{position}</div>
              </div>
              <div className='mt-auto flex justify-end'>
                <ArrowRight size={14} className="text-signoz_robin-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

const GetStarted = ({ page }) => {
  const getStartedId = `btn-get-started-${page}-bottom`;
  const readDocumentationId = `btn-read-documentation-${page}-bottom`;

  return (
    <div className="bg-[url('/img/background_blur/Rectangle_959.png')] bg-[length:68%] bg-[center_top_-20rem] sm:bg-no-repeat">
      <div className="bg-[url('/img/background_blur/Frame_2185.png')] bg-[length:68%] bg-[center_top_-20rem] sm:bg-no-repeat">
        <section className='container mx-auto !px-0 border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400'>
          <div className="bg-[url('/img/background_blur/Ellipse_206.png')] bg-[center_top_calc(-250px)] bg-no-repeat">
            <div className='flex flex-col gap-16'>
              <div className='flex flex-col gap-12'>
                <p className='text-4xl font-bold text-center mb-0 mt-20'>
                  Get started with <br /> SigNoz Cloud today
                </p>
                <div className="flex items-center justify-center gap-3 pt-4 max-sm:flex-col">
                  <Button id={getStartedId}>
                    <Link href="/teams/" className="flex-center">
                      Try SigNoz Cloud
                      <ArrowRight size={14} />
                    </Link>
                  </Button>

                  <Button type={Button.TYPES.SECONDARY} id={readDocumentationId}>
                    <Link href="/docs/introduction/" className="flex-center">
                      <BookOpen size={14} />
                      Read Documentation
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative flex justify-center items-center">
                <img
                  src="/img/landing/landing_thumbnail.png"
                  alt="Custom Thumbnail"
                  className="w-3/5 rounded-lg max-sm:-mb-8 -mb-36 z-[0]"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
