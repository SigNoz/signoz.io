import React from 'react'
import Heading from '../../components/ui/Heading'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const Testimonials = () => {
  const TESTIMONIALS_LIST = [
    [
      {
        name: 'Aditya Tripathi',
        avatar: 'img/users/aditya-tripathi.webp',
        designation: 'Founder & CEO at Climactic',
        review: (
          <>
            <p>
              It was a breeze working with SigNoz! The team has also been very helpful. Good
              product!.{' '}
            </p>
          </>
        ),
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:6979486051165761536?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A6979486051165761536%2C6981714434373107712%29',
      },
      {
        name: 'Aloysius Coelho',
        avatar: 'img/users/aloysius.webp',
        designation: 'IT Infrastructure Engineer',
        review: (
          <>
            <p>SigNoz - Serious consideration over Grafana and WatchDog. </p>
          </>
        ),
        href: 'https://www.linkedin.com/posts/aloysius-coelho-%E2%98%81%EF%B8%8F-%F0%9F%91%A8%E2%80%8D%F0%9F%92%BB-bb1a741b_the-genesis-of-signoz-a-full-stack-open-activity-6798498123242205184-ZEgs',
      },

      {
        name: 'Apoorva Kumar',
        avatar: 'img/users/apoorva-kumar.webp',
        designation: 'Lead Backend Infra Eng, NuCash',
        review: (
          <>
            <p>
              Just deployed SigNoz to an EKS cluster.Still can't believe this is free, everything
              works like a charm. I am really really impressed with the documentation and dashboard.
              <br />
              <br />
              Still in awe. Sneak peek into running the product, you can easily set retention period
              for metrics, traces and logs with one click and set cold storage for old logs to s3
              with few config changes.
            </p>
          </>
        ),
        href: 'https://www.linkedin.com/posts/apoorva-kumar_its-0319-am-ist-just-deployed-signoz-activity-6988981099896967168-c7yf',
      },
    ],
    [
      {
        name: 'Anselm Eickhoff',
        avatar: 'img/users/anselm.jpg',
        designation: 'Software Architect',
        review: (
          <>
            <p>
              NewRelic: receiving OpenTelemetry at all takes me 1/2 day to grok, docs are a mess.
              Traces show up after 5min. I burn the free 100GB/mo in 1 day of light testing.
              @SignozHQ: can run it locally (∞GB), has a special tutorial for OpenTelemetry + Rust!
              Traces show up immediately.{' '}
            </p>
          </>
        ),
        href: 'https://twitter.com/ae_play/status/1572993932094472195?s=20&t=LWWrW5EP_k5q6_mwbFN4jQ',
      },
      {
        name: 'Rachid Zarouali',
        avatar: 'img/users/rachid.webp',
        designation: 'Docker Captain, Microsoft Azure MVP',
        review: (
          <>
            <p>
              A new and yet powerful #observability #opensource alternative has born in the name of
              SigNoz. It could offer a serious challenger to Datadog / New Relic and other SaaS
              solutions.
            </p>
          </>
        ),
        href: 'https://www.linkedin.com/posts/rachidzarouali_signozsignoz-activity-6798537979452239872--zSJ',
      },

      {
        name: 'Faris Hassan',
        avatar: 'img/users/faris.jpeg',
        designation: 'Lead Data Scientist',
        review: (
          <>
            <p>
              What's better than #datadog? Open source! I know @SignozHQ what else out there?
              #opensource{' '}
            </p>
          </>
        ),
        href: 'https://twitter.com/Iamfarisology/status/1553787074339381249',
      },
    ],
    [
    ],
  ]
  return (
    <section>

      <div className="container my-8 flex flex-col items-center">
        <div className="mb-5 flex flex-col items-center text-center gap-12 w-[880px]">
          <img src="/img/users/incident_io.svg" alt="incident.io logo" />
          <p className='text-signoz_sienna-200 text-2xl font-normal leading-10 text-eenter'>SigNoz balances flexibility and security extremely well. They've built clean and thoughtful abstractions over advanced security foundations, and the product just works. We barely have to think about it.</p>
          <div className='flex flex-col gap-2'>
            <p className='m-0 text-signoz_sienna-200 text-xl font-medium text-center'>Mike Hudak</p>
            <p className='m-0 text-signoz_sienna-200 text-base font-normal text-center'>CTO - incident.io</p>
          </div>
        </div>

        <div className="row max-w-screen-md">
          {TESTIMONIALS_LIST.map((column, idx) => (
            <div key={idx} className="col col--6">
              {column.map((testimonial, i) => (
                <div className="row" key={`${idx}-${i}`}>
                  <div className="card-demo m-2 w-full">
                    <div className="card-dark bg-signoz_ink-400 p-2 rounded-md">
                      <div className="card__header">
                        <div className="avatar">
                          <img
                            className="avatar__photo"
                            src={testimonial.avatar}
                            alt={`Profile of ${testimonial.name}`}
                          />
                          <div className='flex flex-col gap-1'>
                          <div className="avatar__intro">
                            <p className="text-signoz_vanilla-100 text-base font-medium mb-0">{testimonial.name}</p>
                            <small className="text-signoz_vanilla-400 text-sm font-normal">{testimonial.designation}</small>
                          </div>
                        </div>
                      </div>
                      </div>

                      <div className="card__body padding--md">{testimonial.review}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <Link href="/">
          <button className="h-8 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 not-italic truncate button-background text-center font-medium leading-5 text-white no-underline outline-none hover:text-white">Read customer stories<ArrowRight size={14} />
          </button>
        </Link>
      </div>
    </section>
  )
}
