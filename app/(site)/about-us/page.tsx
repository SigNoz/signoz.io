import React from 'react'
import type { Metadata } from 'next'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'About us',
  description: 'About us - SigNoz',
}

function aboutus() {
  return (
    <div title="About Us">
      <section>
        <div className="container mx-auto my-16">
          <h1 className="mb-4 text-center text-4xl font-bold">About Us</h1>
          <p className="my-8 text-center">
            {' '}
            Some of you may wonder, what does SigNoz mean? As engineers we are obsessed with the
            idea of signal vs noise. How do devops engineers find signals which they can act on from
            the various sources of noise they encounter from their observability systems? This is
            one idea we obsess over and seems important enough to continually strive towards.
            <br></br>
            <br></br>
            And, hence the name Sig.Noz ( Signal vs Noise) 🤓
          </p>
          <div className="flex flex-wrap">
            <div className="w-full p-4 md:w-1/2">
              <div className="border-border bg-card rounded-md border">
                <div className="m-4 flex items-center gap-4">
                  <img
                    className="h-16 w-16 rounded-full object-cover"
                    src="/img/504541.webp"
                    alt="Profile pic of Pranay Prateek"
                  />
                  <div>
                    <h4 className="text-l1-foreground mb-0 text-base font-semibold">
                      Pranay Prateek
                    </h4>
                    <small className="text-muted-foreground text-sm">Co-founder & CEO </small>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <p>
                    After spending a lot of time in college reading philosophy, I got interested in
                    technology. Biometric & image recognition was especially interesting to me. Led
                    product teams in startups & MNCs like Microsoft, before stumbling into the
                    domain of observability.
                    <br></br>
                    <br></br>
                    Reducing noise in developers&apos; and devops engineers&apos; life is my current
                    passion :)
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 p-4 pt-0">
                  <Button href="https://twitter.com/pranay01" variant="outline">
                    Twitter
                  </Button>

                  <Button href="mailto:pranay@signoz.io" variant="link" className="text-foreground">
                    pranay at signoz dot io
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full p-4 md:w-1/2">
              <div className="border-border bg-card rounded-md border">
                <div className="m-4 flex items-center gap-4">
                  <img
                    className="h-16 w-16 rounded-full object-cover"
                    src="/img/12460410.webp"
                    alt="Profile pic of Ankit Nayan"
                  />
                  <div>
                    <h4 className="text-l1-foreground mb-0 text-base font-semibold">Ankit Nayan</h4>
                    <small className="text-muted-foreground text-sm"> Co-Founder & CTO </small>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <p>
                    Playing Badminton professionally was my dream at one time. But that seemed too
                    tough, so I started coding. I have delved in all sorts of technologies including
                    crypto when it was exciting.
                    <br></br> <br></br>
                    Always interested in solving interesting problems with technology. Microservices
                    & Distributed systems is what I am most interested in these days.{' '}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 p-4 pt-0">
                  <Button href="https://twitter.com/ankitnayan" variant="outline">
                    Twitter
                  </Button>

                  <Button href="mailto:ankit@signoz.io" variant="link" className="text-foreground">
                    ankit at signoz dot io
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default aboutus
