import React from 'react'
import Heading from '../../components/ui/Heading'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const Testimonials = () => {
  const TESTIMONIALS_LIST = [
    [
      {
        name: 'Subomi Oluwalana',
        avatar: '/img/users/subomi-oluwalana.webp',
        designation: 'Founder & CEO at Convoy',
        review: (
          <>
            <p>
              We use OTel with SigNoz to spot redundant database connect calls. For example, we found that our database driver wasn't using the connection pool even though the documentation claimed otherwise.{' '}
            </p>
          </>
        ),
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7212117589068591105/',
      },
      {
        name: 'Dhruv Garg',
        avatar: '/img/users/dhruv-garg.webp',
        designation: 'Tech Lead at Nudge',
        review: (
          <>
            <p>SigNoz is one of the best observability tools you can self-host hands down. And they are always there to help on their slack channel when needed.</p>
          </>
        ),
        href: 'https://www.linkedin.com/posts/dhruv-garg79_signoz-docker-kubernetes-activity-7205163679028240384-Otlb/',
      },

      {
        name: 'Sheheryar Sewani',
        avatar: '/img/users/shey.webp',
        designation: 'Seasoned Rails Dev & Founder',
        review: (
          <>
            <p>
              But wow, I'm glad I tried SigNoz. Setting up SigNoz was easy—they provide super helpful instructions along with a docker-compose file.
            </p>
          </>
        ),
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7181011853915926528/',
      },
    ],
    [
      {
        name: 'Daniel Schell',
        avatar: '/img/users/daniel.webp',
        designation: 'Founder & CTO at Airlockdigital',
        review: (
          <>
            <p>
              Have been deep diving Signoz. Seems like the new hotness for an "all-in-one".{' '}
            </p>
          </>
        ),
        href: 'https://x.com/danonit/status/1749256583157284919',
      },
      {
        name: 'Vivek Bhakta',
        avatar: '/img/users/vivek-bhakta.webp',
        designation: 'CTO at Wombo AI',
        review: (
          <>
            <p>
              We use SigNoz and have been loving it - can definitely handle scale.
            </p>
          </>
        ),
        href: 'https://x.com/notorious_VB/status/1701773119696904242',
      },

      {
        name: 'Go Frendi Gunawan',
        avatar: '/img/users/go-frendi.webp',
        designation: 'Data Engineer at Ctlyst.id',
        review: (
          <>
            <p>
              Monitoring done. Thanks to SigNoz, I don’t have to deal with Grafana, Loki, Prometheus, and Jaeger separately.{' '}
            </p>
          </>
        ),
        href: 'https://x.com/gofrendiasgard/status/1680139003658641408',
      },

      {
        name: 'Pranay Narang',
        avatar: '/img/users/pranay-narang.webp',
        designation: 'Engineering at Azodha',
        review: (
          <>
            <p>
              Recentlly moved metrics and logging to SigNoz. Gotta say, absolutely loving the tool.{' '}
            </p>
          </>
        ),
        href: 'https://x.com/PranayNarang/status/1676247073396752387',
      },
    ],
    [
    ],
  ]
  return (
    <section>
      <div className="!w-[80vw] !mx-auto container py-24 flex flex-col items-center border border-signoz_slate-400 border-dashed !border-b-0 bg-[length:auto_100%] bg-no-repeat bg-[center_top_-32rem] bg-[url('/img/background_blur/Footer_backdrop.png')]">
        <div className="mb-16 flex flex-col items-center text-center gap-12 w-[880px]">
          <img src="/img/users/incident_io.svg" alt="incident.io logo" />
          <span className='text-signoz_sienna-200 max-w-[50vw] text-sm sm:text-2xl font-normal leading-10 text-center'>SigNoz balances flexibility and security extremely well. They've built clean and thoughtful abstractions over advanced security foundations, and the product just works. We barely have to think about it.</span>
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
                  <a className="card-demo m-2 w-full" href={testimonial.href}>
                    <div className="card-dark bg-signoz_ink-400 p-2 rounded-md hover:bg-signoz_ink-300">
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
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
        <Link href="/case-study/" className="shadow-[0_0_200px_400px_rgba(11,12,14,0.9)]">
          <button className="h-8 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 not-italic truncate button-background text-center font-medium leading-5 text-white no-underline outline-none hover:text-white">Read customer stories<ArrowRight size={14} />
          </button>
        </Link>
      </div>
    </section>
  )
}
