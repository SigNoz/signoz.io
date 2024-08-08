'use client'

import React , {useState} from 'react'
import Hero from '@/components/ui/Hero'
import VimeoPlayer from '@/components/VimeoPlayer/VimeoPlayer'
// import { TrustedByTeams } from '@/components/trusted-by'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import Button from '@/components/Button/Button'
import Card from '@/components/Card/card'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'

function LogsManagement() {
  return (
    <div className='bg-signoz_ink-500'>
      <Header />
      <TrustedByTeams page="LogsManagement" />
      <SigNozFeatures/>
    </div>
  )
}

export default LogsManagement

const Header = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  return (
    <header className="relative !mx-auto mt-16 !w-[100vw] md:!w-[80vw]">
      <div className="absolute bottom-0 left-[12px] right-[12px] top-0 z-[-1] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:left-[24px] md:right-[24px] z-[0]" />
      <div className="relative !mx-auto flex !w-[100vw] flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 px-2 pb-4 pt-12 text-center md:!w-[80vw] md:px-5 md:pt-[8.5rem]">
        <div className="absolute left-0 top-[96px] z-[0] h-14 !w-[100vw] border !border-l-0 !border-r-0 border-dashed border-signoz_slate-400 md:top-[168px] md:!w-[80vw]" />
        <Hero>
          Log Management at any Scale
        </Hero>
        <p className="m-0 p-3 text-lg leading-8 font-normal sm:p-0 text-signoz_vanilla-400">
          Ingest logs from anywhere, quickly search and analyze with a powerful query builder, and correlate your
          <br className="hidden lg:inline" />
          logs with other signals. Logs at SigNoz is powered by ClickHouse - a lightning-fast columnar datastore
          <br className="hidden lg:inline" />
          suited for storing logs at scale.
        </p>
      </div>
      {/* <div className='!w-[80vw] h-12 !mx-auto border border-signoz_slate-400 border-dashed !border-t-0 !border-b-0' /> */}
      <div className="!mx-auto mx-2 flex !w-[100vw] flex-col items-center justify-center gap-3 border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 pb-12 pt-4 md:mx-5 md:!w-[80vw] md:flex-row">
        <Button id="btn-get-started-homepage-hero">
          <Link href="/teams/" className="flex-center">
            Start your free trial
            <ArrowRight size={14} />
          </Link>
        </Button>

        <Button type={Button.TYPES.SECONDARY} id="btn-read-documentation-homepage-hero">
          <Link href="/docs/introduction/" className="flex-center">
            <BookOpen size={14} />
            Read Documentation
          </Link>
        </Button>
      </div>
      <div className="section-container !mx-auto !mt-0 !w-[90vw] border !border-b-0 !border-t-0 border-none border-signoz_slate-400 md:!w-[80vw] md:border-dashed -mb-[9rem]">
        <div className="w-100 mx-[-28px]">
          <div className="product-explainer-video hero-figure rounded-lg p-3">
            <div className="embed-container">
              <div className="absolute">
                <img
                  src="/img/platform/LogsManagementHero.webp"
                  alt="Custom Thumbnail"
                  className="w-full rounded-lg"
                />

                <div className="play-container inset-0 m-auto flex h-20 w-20 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none !top-[-200px]">
                  <img
                    src="/svgs/icons/play-icon.svg"
                    alt="signoz-video-play-btn"
                    onClick={onOpen}
                    className="h-6 w-6 md:h-20 md:w-20"
                  />
                </div>
              </div>

              <Modal size={'5xl'} backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} className='self-center'>
                <ModalContent className="bg-transparent">
                  {() => (
                    <>
                      <ModalBody className="py-6">
                        <VimeoPlayer videoId="944340217" />
                      </ModalBody>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

const COMPANIES = [
  { image: '/img/users/netapp.svg', imageDesc: 'netapp logo' },
  { image: '/img/users/samsung.svg', imageDesc: 'samsung logo' },
  { image: '/img/users/comcast.svg', imageDesc: 'comcast logo' },
  { image: '/img/users/freo.svg', imageDesc: 'freo logo' },
  { image: '/img/users/hyperface.svg', imageDesc: 'hyperface logo' },
  { image: '/img/users/salesforce.svg', imageDesc: 'salesforce logo' },
  { image: '/img/users/rattle.svg', imageDesc: 'rattle logo' },
  { image: '/img/users/webstaurantstore.svg', imageDesc: 'webstaurant logo' },
  { image: '/img/users/gokiwi.svg', imageDesc: 'GoKiwi logo' },
  { image: '/img/users/outplay.svg', imageDesc: 'outplay logo' },
  { image: '/img/users/tuneai.svg', imageDesc: 'tune logo' },
  { image: '/img/users/wombo.svg', imageDesc: 'wombo logo' },
]

const TrustedByTeams = ({ page }) => {
  const customerStoriesId = `btn-customer-stories-${page}-hero`
  return (
    <section
      className={`relative pt-10 !m-0 !mx-auto !w-[100vw]  border !border-b-0 border-dashed border-signoz_slate-400 md:!w-[80vw] z-[1] bg-signoz_ink-500`}
    >
      <div className="section-container">
        <div className="mb-2 flex flex-col items-center text-center md:mb-12">
          <div className="text-sm font-semibold uppercase leading-5 tracking-[0.05em] text-signoz_vanilla-400">
            Trusted by the <span className="text-signoz_vanilla-100">best platform teams</span>
          </div>
        </div>
        <div className="mb-12 mt-12 grid grid-cols-2 place-content-center gap-y-8 sm:gap-x-8 sm:gap-y-14 px-2  sm:grid-cols-4 md:mt-0 md:grid-cols-6 ">
          {COMPANIES.map((company, idx) => (
            <div key={`${idx}-${company.image}`} className="flex items-center justify-center">
              <img
                className="h-[40px] w-[100px] md:h-[40px] md:w-[120px]"
                src={company.image}
                alt={company.imageDesc}
              />
            </div>
          ))}
        </div>
        <div
          className={`wavy-line relative mx-[-1rem]
          after:absolute after:top-[50%] after:h-0 after:w-full after:bg-transparent after:content-['']
        `}
        >
          <div className="flex flex-col items-center text-center">
            <Button
              id={customerStoriesId}
              className=" button-background relative z-[1] flex h-8 items-center justify-center gap-1.5 truncate rounded-full py-2 pl-4 pr-3 text-center text-sm font-medium not-italic leading-5 text-white no-underline outline-none hover:text-white"
            >
              <Link href="/case-study/" className="z-[1] mx-2 flex-center">
                Read customer stories <ArrowRight size={14} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}


const SigNozFeatures = () => {


  const sections = [
    {
      title: 'Logs at any scale powered by ClickHouse',
      desc: ['SigNoz uses ClickHouse (used by likes of Uber & Cloudflare) as datastore ⎯ an extremely fast and highly optimized storage for logs data.',
        'It is a column-oriented database built for complex analytical queries ⎯ they are atleast 1000 times faster in processing most queries. Aggregation and filtering are lightning-fast on log data. For ingestion, we found SigNoz to be 2.5x faster than ELK and about 13 times faster than ELK for aggregation queries. (Logs Perf Benchmark)',
        ],
      figure: '/img/landing/property-no-vendor-lock-in.webp',
      logo: '/img/index_features/key.svg',
    },
    {
      title: 'Fast troubleshooting with Query Builder',
      desc: ['Query your logs quickly with our powerful logs query builder. No need to learn any complex query language, just select some dropdowns and hit Run.',
        'Get a list of common filters for your logs data and quickly filter your required logs. Apply various aggregations, such as count, sum, and average, and group your trace data based on selected attributes. Utilize multiple queries and formulas to dive deeper into your logs data and uncover valuable insights.',
        ],
      figure: '/img/landing/property-ease-of-use.webp',
      logo: '/img/index_features/future.svg',
    },
    {
      title: 'Cost-effective long-term storage of logs',
      desc: 'You can store your logs in long-term storage for compliance and auditing purposes. You can either forward the logs to your own S3/ Google cloud storage or object storage in SigNoz cloud. The data is stored in ClickHouse native format and you can query it whenever you want. Log forwarding cost is only $0.25 per GB.',
      figure: '/img/landing/property-covers-all-use-cases.webp',
      logo: '/img/index_features/cases.svg',
      buttonText:'learn more'
    },
    {
      title: 'Identify Root Cause with Correlated Signals',
      desc: ['We provide logs, metrics, and traces under a single pane of glass powered by OpenTelemetry SDKs.', 
      'You can correlate your logs with traces and vice-versa to gain better insights while debugging. Powered by OpenTelemetry semantic conventions, correlated signals can help you understand your applications better and identify the root cause of issues faster.',
      ],
      figure: '/img/landing/property-standardize-observability.webp',
      logo: '/img/index_features/easy-to-use.svg',
    },
  ]

  return (
    <>
     <div className="bg-[url('/img/background_blur/Frame_1862.png')] bg-[length:65%] bg-[center_top_5rem] sm:bg-no-repeat">
      <section className="mx-auto w-[100vw] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw] ">
        <div className={`container pb-16`}>
          <div className="flex flex-col gap-6 pb-44 pt-28 ">
            <div className="mx-auto mt-[50px] flex max-w-4xl flex-col items-center text-center">
              <div className="text-[44px] font-semibold leading-[3.25rem] text-signoz_sienna-100">
                Why use SigNoz for <br/> Logs management?
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
      <div className="!mx-auto grid !w-[100vw] grid-cols-1 border !border-l-0 !border-t-0 border-dashed border-signoz_slate-400 sm:grid-cols-2 md:!w-[80vw]">
      <div className="!mx-auto grid !w-[100vw] grid-cols-1 border !border-b-0 !border-l-0 !border-t-0 border-dashed border-signoz_slate-400 sm:grid-cols-2 md:!w-[80vw]">
        {sections.map((section, index) => (
          <Card
            logo={section.logo}
            subTitle={section.title}
            description={section.desc}
            buttonText={section.buttonText}
            logoSize={24}
            subTitleSize={2}
          />
        ))}
      </div>
      </div>
    </>
  )
}

