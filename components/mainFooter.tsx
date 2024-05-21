import * as React from 'react'
import Link from 'next/link'
import { ArrowUpRight, GithubIcon, Linkedin, SlackIcon, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'

/**
 * Footer component
 */
function Footer() {
  return (
    <div className="flex flex-col justify-center border-t border-solid border-gray-900">
      <div className="flex w-full items-center justify-center bg-neutral-950 bg-opacity-70 px-16 py-14 backdrop-blur-[20px] max-md:max-w-full max-md:px-5">
        <div className="w-full max-w-[1200px] justify-between max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
              <div className="flex flex-col pb-2.5 text-sm tracking-wide text-stone-300 max-md:mt-10">
                <div className="text-sm font-semibold uppercase leading-5 tracking-wide text-gray-700">
                  Docs
                </div>
                <Link href="https://signoz.io/docs/" className="mt-5">
                  Introduction
                </Link>
                <Link href="https://signoz.io/docs/contributing/" className="mt-5">
                  Contributing
                </Link>
                <div className="mt-5 flex items-center gap-2 pr-7 max-md:pr-5">
                  <Link href="https://knowledgebase.signoz.io/kb" target="_blank">Knowledge Base</Link>
                  <ArrowUpRight size={16} />
                </div>

              </div>
            </div>
            <div className="ml-5 flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
              <div className="flex grow flex-col self-stretch pb-20 text-sm tracking-wide text-stone-300 max-md:mt-10">
                <div className="text-sm font-semibold uppercase leading-5 tracking-wide text-gray-700">
                  Community
                </div>
              
                <div className="mt-5 flex items-center gap-2 pr-7 max-md:pr-5">
                  <Link href="https://signoz.io/slack" target="_blank">Slack</Link>
                  <ArrowUpRight size={16} />
                </div>
                <div className="mt-5 flex items-center gap-2 whitespace-nowrap pr-8 max-md:pr-5">
                  <Link href = "https://twitter.com/SigNozHQ" target="_blank">Twitter</Link>
                  <ArrowUpRight size={16} />
                </div>
                <div className="mt-5 flex items-center gap-2 whitespace-nowrap pr-8 max-md:pr-5">
                  <Link href="https://community-chat.signoz.io/" target="_blank">Community Archive</Link>
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
            <div className="ml-5 flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
              <div className="flex grow flex-col self-stretch pb-20 text-sm tracking-wide text-stone-300 max-md:mt-10">
                <div className="text-sm font-semibold uppercase leading-5 tracking-wide text-gray-700">
                  More
                </div>
               
                <Link href="https://signoz.io/comparisons/signoz-vs-datadog/" className="mt-5">
                  SigNoz vs Datadog
                </Link>
                <Link href="https://signoz.io/comparisons/signoz-vs-newrelic/" className="mt-5">
                SigNoz vs New Relic
                </Link>
                <Link href="https://signoz.io/comparisons/signoz-vs-grafana/" className="mt-5">
                SigNoz vs Grafana
                </Link>
                <Link href="https://signoz.io/product-comparison/signoz-vs-dynatrace/" className="mt-5">
                SigNoz vs Dynatrace
                </Link>

                <div className="mt-5 flex items-center gap-2 whitespace-nowrap pr-8 max-md:pr-5">
                  <Link href="https://jobs.gem.com/signoz" target='_blank'>Careers</Link>
                  <ArrowUpRight size={16} />
                </div>

                <Link href="https://signoz.io/about-us/" className="mt-5">
                  About
                </Link>
                <Link href="https://signoz.io/terms-of-service/" className="mt-5">
                  Terms
                </Link>
                <Link href="https://signoz.io/privacy/" className="mt-5">
                  Privacy
                </Link>
               
              </div>
            </div>
            <div className="ml-5 flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
              <div className="flex flex-col items-end shadow-sm max-md:mt-10">
                <div className="flex items-center justify-between gap-2 self-end whitespace-nowrap text-center text-lg font-medium leading-5 text-white">
                  <Image
                    className="h-8 w-auto"
                    src="/img/SigNozLogo-orange.svg"
                    width={50}
                    height={50}
                    alt=""
                  />
                  <div>SigNoz</div>
                </div>
                <div className="mt-5 items-end justify-center rounded text-sm leading-5 text-emerald-300">
                  All systems operational
                </div>
                <div className="mt-5 flex items-end justify-between gap-4 py-2">
                  <Link href={'https://github.com/SigNoz'} target="_blank">
                    <GithubIcon size={24} />{' '}
                  </Link>

                  <Link href={'https://www.linkedin.com/company/signozio/'} target="_blank">
                    <Linkedin size={24} />
                  </Link>

                  <Link href={'https://signoz.io/slack'} target="_blank">
                    <SlackIcon size={24} />
                  </Link>

                  <Link href={'https://twitter.com/SigNozHQ'} target="_blank">
                    <Twitter size={24} />
                  </Link>

                  <Link href={'https://www.youtube.com/@signoz'} target="_blank">
                    <Youtube size={24} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
