import Link from 'next/link'
import React from 'react'
import { ArrowRight, BookOpen } from 'lucide-react'
import Button from '@/components/Button/Button'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Customer Stories | SigNoz',
  },
  openGraph: {
    title: 'Customer Stories | SigNoz',
    description:
      'See how SigNoz empowers engineering teams of all sizes to build resilient applications.',
  },
  description:
    'See how SigNoz empowers engineering teams of all sizes to build resilient applications.',
  twitter: {
    title: 'Customer Stories | SigNoz',
    description:
      'See how SigNoz empowers engineering teams of all sizes to build resilient applications.',
  },
}

type CardProps = {
  logo?: string
  title?: string
  name?: string
  position?: string
  href: string
}

const cardDetails = [
  {
    logo: '/img/case_study/brainfish-icon.svg',
    title: 'How Brainfish leveraged SigNoz for effective Kubernetes monitoring & Logs management',
    name: 'Charlie Shen',
    position: 'Lead DevOps Engineer, Brainfish',
    href: '/case-study/brainfish/',
  },
  {
    logo: '/img/case_study/logos/linkcy-logo-white-1.png',
    title: 'How Fintech Startup Linkcy Monitors Critical APIs with SigNoz Dashboards',
    name: 'Alexandre Moray',
    position: 'Senior Software Engineer',
    href: '/case-study/linkcy/',
  },
  {
    logo: '/img/case_study/cedana-logo.svg',
    title: 'How Cedana Leverages SigNoz to Ensure Uptime in Real-Time Compute Operations',
    name: 'Niranjan Ravichandra',
    position: 'Co-founder & CTO, Cedana',
    href: '/case-study/cedana/',
  },
  {
    logo: '/img/case_study/logos/bands-logo.png',
    title: 'How Bands Monitors 50+ Integrations for Thousands of Musicians Using SigNoz',
    name: 'Shiv Ansal',
    position: 'Co-founder & CTO, Bands',
    href: '/case-study/bands/',
  },
  {
    logo: '/img/case_study/mailmodo-logo-white.svg',
    title:
      'How Mailmodo streamlined monitoring of 200GB+ daily logs from 200+ microservices with SigNoz',
    name: 'Avneesh Kumar',
    position: 'VP of Engineering, Mailmodo',
    href: '/case-study/mailmodo/',
  },
  {
    logo: '/img/case_study/logos/gokiwi-logo.png',
    title: 'How Kiwi Reduced API Response Times from 20 Seconds to Milliseconds Using SigNoz',
    name: 'Khushhal Reddy',
    position: 'Senior Backend Engineer, Kiwi',
    href: '/case-study/kiwi/',
  },
  {
    logo: '/img/case_study/thehindu-logo.png',
    title: 'How The Hindu uses SigNoz APM to Optimize Application Performance',
    name: 'Poonkuyilan V',
    position: 'IT Infrastructure Lead, The Hindu',
    href: '/case-study/thehindu/',
  },
  {
    logo: '/img/case_study/logos/tableflow-logo.png',
    title: 'How TableFlow Uses SigNoz to Improve Service Reliability and Resolve Issues Quickly',
    name: 'Eric Ciminelli',
    position: 'Co-founder, Tableflow',
    href: '/case-study/tableflow/',
  },
  {
    logo: '/img/case_study/logos/instasafe-logo.png',
    title:
      'How InstaSafe chose SigNoz over Grafana and Elastic APM to power their observability needs',
    name: 'Bhaswanth Gattineni',
    position: 'Software Architect, Instasafe',
    href: '/case-study/instasafe/',
  },
  {
    logo: '/img/users/blip_logo.webp',
    title: 'How Blip uses SigNoz to improve their issue resolution time by 14x',
    name: 'Nate Bohman',
    position: 'Senior DevOps Engineer, Blip',
    href: '/case-study/blip/',
  },
  {
    logo: '/img/users/outplay.svg',
    title: 'How Outplay uses SigNoz to improve their backend API response time by 35%',
    name: 'Vijay Perumal',
    position: 'Technical Lead',
    href: '/case-study/outplay/',
  },
  {
    logo: '/img/case_study/logos/WomboLogo.svg',
    title: 'How Wombo AI provides great experience to its 5mn MAU using SigNoz for Observability',
    name: 'Abhinav Ramana',
    position: 'Senior Software Engineer',
    href: '/case-study/wombo/',
  },
  {
    logo: '/img/case_study/logos/HTTPSCOUT.svg',
    title: 'Democratizing Observability - How SigNoz Empowers Solo Entrepreneurs and Small Teams',
    name: 'Shey Sewani',
    position: 'Founder, HTTPSCOUT',
    href: '/case-study/observability-for-small-teams-and-solopreneurs/',
  },
]

function caseStudies() {
  return (
    <div className="relative mt-[-30px] bg-signoz_ink-500 ">
      <section>
        <div
          className="container mx-auto border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400"
          style={{ marginTop: '2rem', paddingBottom: '64px' }}
        >
          <div className="absolute left-0 right-0 top-0 z-[0] h-screen bg-[url('/img/background_blur/Perlin_noise.png')] bg-[length:55%]  bg-[center_top_-1rem] bg-no-repeat" />
          <div className="absolute left-0 right-0 top-0 z-[0] h-screen bg-[url('/img/background_blur/Ellipse_388.png')] bg-[length:110%] bg-no-repeat sm:bg-[center_top_-55rem] " />
          <div className="relative mb-3 pt-24 text-center font-mono text-sm font-medium uppercase text-signoz_sakura-400">
            {' '}
            Customer Stories{' '}
          </div>
          <div className="relative mb-4 text-center text-[28px] font-semibold text-signoz_robin-100">
            {' '}
            Observability for teams of all-sizes
          </div>
          <p className="relative mb-20 text-center text-lg text-signoz_vanilla-400">
            SigNoz powers observability for thousands of high-impact engineering teams. From
            cutting-
            <br />
            edge startups to public companies, eng. teams use SigNoz to build resilient
            applications.
          </p>

          <div className="relative mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
  )
}

export default caseStudies

const CustomerCard: React.FC<CardProps> = ({ logo, title, name, position, href }) => {
  return (
    <Link href={href}>
      <div className="group min-h-[19rem] cursor-pointer rounded border border-signoz_slate-400 bg-signoz_ink-400 p-12 hover:bg-signoz_ink-300">
        <div className="flex flex-col gap-3">
          <div className="mb-4 flex h-12 items-start">
            <img src={logo} className="max-h-10 max-w-32 object-contain" />
          </div>
          <div className="text-base font-semibold">{title}</div>
          <div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1 text-signoz_vanilla-400">
                <div className="text-sm font-medium text-[#C0C1C3]">{name}</div>
                <div className="text-xs font-medium text-signoz_slate-50">{position}</div>
              </div>
              <div className="mt-auto flex transform justify-end transition-transform group-hover:translate-x-2">
                <ArrowRight size={14} className="text-signoz_robin-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

const GetStarted = ({ page }) => {
  const getStartedId = `btn-get-started-${page}-bottom`
  const readDocumentationId = `btn-read-documentation-${page}-bottom`

  return (
    <div className="bg-[url('/img/background_blur/Rectangle_959.png')] bg-[length:68%] bg-[center_top_-20rem] sm:bg-no-repeat">
      <div className="bg-[url('/img/background_blur/Frame_2185.png')] bg-[length:68%] bg-[center_top_-20rem] sm:bg-no-repeat">
        <section className="container mx-auto border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 !px-0">
          <div className="bg-[url('/img/background_blur/Ellipse_206.png')] bg-[center_top_calc(-250px)] bg-no-repeat">
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-12">
                <p className="mb-0 mt-20 text-center text-4xl font-bold">
                  Get started with <br /> SigNoz Cloud today
                </p>
                <div className="flex items-center justify-center gap-3 pt-4 max-sm:flex-col">
                  <Button id={getStartedId}>
                    <Link href="/teams/" className="flex-center">
                      Get Started - Free
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
              <div className="relative flex items-center justify-center">
                <img
                  src="/img/landing/landing_thumbnail.webp"
                  alt="Custom Thumbnail"
                  className="z-[0] -mb-36 w-3/5 rounded-lg max-sm:-mb-8"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
