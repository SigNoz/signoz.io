import React from 'react'
import Heading from '../../components/ui/Heading'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/Button/Button'
import TrackingLink from '@/components/TrackingLink'

export const Testimonials = ({ page }) => {
  const customerStoriesId = `btn-customer-stories-testimonials-${page}`
  const TESTIMONIALS_LIST = [
    [
      {
        name: 'Subomi Oluwalana',
        avatar: '/img/users/subomi-oluwalana.webp',
        designation: 'Founder & CEO at Convoy',
        review: (
          <>
            <p>
              We use OTel with SigNoz to spot redundant database connect calls. For example, we
              found that our database driver wasn't using the connection pool even though the
              documentation claimed otherwise.{' '}
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
            <p>
              SigNoz is one of the best observability tools you can self-host hands down. And they
              are always there to help on their slack channel when needed.
            </p>
          </>
        ),
        href: 'https://www.linkedin.com/posts/dhruv-garg79_signoz-docker-kubernetes-activity-7205163679028240384-Otlb/',
      },
      {
        name: 'Vivek Bhakta',
        avatar: '/img/users/vivek-bhakta.webp',
        designation: 'CTO at Wombo AI',
        review: (
          <>
            <p>We use SigNoz and have been loving it - can definitely handle scale.</p>
          </>
        ),
        href: 'https://x.com/notorious_VB/status/1701773119696904242',
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
      {
        name: 'Sheheryar Sewani',
        avatar: '/img/users/shey.webp',
        designation: 'Seasoned Rails Dev & Founder',
        review: (
          <>
            <p>
              But wow, I'm glad I tried SigNoz. Setting up SigNoz was easy—they provide super
              helpful instructions along with a docker-compose file.
            </p>
          </>
        ),
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7181011853915926528/',
      },
      {
        name: 'Daniel Schell',
        avatar: '/img/users/daniel.webp',
        designation: 'Founder & CTO at Airlockdigital',
        review: (
          <>
            <p>Have been deep diving Signoz. Seems like the new hotness for an "all-in-one". </p>
          </>
        ),
        href: 'https://x.com/danonit/status/1749256583157284919',
      },
      {
        name: 'Go Frendi Gunawan',
        avatar: '/img/users/go-frendi.webp',
        designation: 'Data Engineer at Ctlyst.id',
        review: (
          <>
            <p>
              Monitoring done. Thanks to SigNoz, I don't have to deal with Grafana, Loki,
              Prometheus, and Jaeger separately.{' '}
            </p>
          </>
        ),
        href: 'https://x.com/gofrendiasgard/status/1680139003658641408',
      },
      {
        name: 'Anselm Eickhoff',
        avatar: '/img/users/anselm.jpg',
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
    ],
    [
      {
        name: 'Apoorva Kumar',
        avatar: '/img/users/apoorva-kumar.webp',
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
        name: 'Pawan Bhadauria',
        avatar: '/img/users/pawan-outplay.webp',
        designation: 'VP - Engineering, Outplay',
        review: (
          <>
            <p>
              We are using Signoz at Outplay & our experience has been great. It has 5.4k stars on
              Github.
            </p>
          </>
        ),
        href: 'https://www.linkedin.com/posts/pawan-bhadauria-25980b7_seed-to-scale-podcast-series-by-accel-insights-activity-6877448856892768256-Fapw',
      },
      {
        name: 'Faris Hassan',
        avatar: '/img/users/faris.jpeg',
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
    [],
  ]
  return (
    <section>
      <div className="section-container !mx-auto flex !w-[100vw] flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Footer_backdrop.png')] bg-[length:auto_100%] bg-[center_top_-45rem] bg-no-repeat py-24 md:!w-[80vw]">
        <div className="mb-16 flex flex-col items-center gap-12 text-center">
          <img src="/img/users/outplay.svg" alt="Outplay logo" className="h-7" />
          <span className="max-w-[50vw] text-center text-sm font-normal leading-10 text-signoz_sienna-200 sm:text-2xl">
            We optimized all our top endpoints and fine-tuned database calls to improve our backend
            API response times by 35% using SigNoz. <br />
            Both our dev and QA teams use SigNoz actively in dev and production environments to
            optimize application performance.
          </span>
          <div className="flex flex-col gap-2">
            <p className="m-0 text-center text-xl font-medium text-signoz_sienna-200">
              Vijaya Perumal
            </p>
            <p className="m-0 text-center text-base font-normal text-signoz_sienna-200">
              Tech Lead
            </p>
          </div>
        </div>

        <div className="row max-w-screen-md">
          {TESTIMONIALS_LIST.map((column, idx) => (
            <div key={idx} className="col col--6">
              {column.map((testimonial, i) => (
                <div className="row" key={`${idx}-${i}`}>
                  <TrackingLink
                    className="card-demo m-2 w-full"
                    href={testimonial.href}
                    clickType="External Click"
                    clickName="Testimonial Link"
                    clickText={testimonial.name}
                    clickLocation="Testimonials Section"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="card-dark rounded-md bg-signoz_ink-400 p-2 hover:bg-signoz_ink-300">
                      <div className="card__header">
                        <div className="avatar">
                          <img
                            className="avatar__photo"
                            src={testimonial.avatar}
                            alt={`Profile of ${testimonial.name}`}
                          />
                          <div className="flex flex-col gap-1">
                            <div className="avatar__intro">
                              <p className="mb-0 text-base font-medium text-signoz_vanilla-100">
                                {testimonial.name}
                              </p>
                              <small className="text-sm font-normal text-signoz_vanilla-400">
                                {testimonial.designation}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card__body padding--md">{testimonial.review}</div>
                    </div>
                  </TrackingLink>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="w-[52vw] shadow-[-4px_-40px_80px_146px_rgba(11,12,14,0.8)]">
          <TrackingLink
            href="/case-study/"
            className="inline-block"
            clickType="Secondary CTA"
            clickName="Customer Stories Link"
            clickText="Read customer stories"
            clickLocation="Testimonials Section"
          >
            <Button
              id={customerStoriesId}
              className="button-background flex h-8 items-center justify-center gap-1.5 truncate rounded-full px-4 py-2 pl-4 pr-3 text-center text-sm font-medium not-italic leading-5 text-white no-underline outline-none hover:text-white"
            >
              Read customer stories
              <ArrowRight size={14} />
            </Button>
          </TrackingLink>
        </div>
      </div>
    </section>
  )
}
