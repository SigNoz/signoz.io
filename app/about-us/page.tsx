import Link from 'next/link'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About us - SigNoz',
  description: 'About us - SigNoz',
}

function aboutus() {
  return (
    <div title="About Us">
      <section>
        <div className="container" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
          <p className="text--center margin-vert--lg">
            {' '}
            Some of you may wonder, what does SigNoz mean? As engineers we are obsessed with the
            idea of signal vs noise. How do devops engineers find signals which they can act on from
            the various sources of noise they encounter from their observability systems? This is
            one idea we obsess over and seems important enough to continually strive towards.
            <br></br>
            <br></br>
            And, hence the name Sig.Noz ( Signal vs Noise) 🤓
          </p>
          <div className="row">
            <div className="col col--6">
              <div className="card-demo margin--md">
                <div className="card-dark bg-signoz_slate-500">
                  <div className="avatar margin--md">
                    <img
                      className="avatar__photo avatar__photo--lg"
                      src="/img/504541.webp"
                      alt="Profile pic of Pranay Prateek"
                    />
                    <div className="avatar__intro">
                      <h4 className="avatar__name">Pranay Prateek</h4>
                      <small className="avatar__subtitle">Co-founder & CEO </small>
                    </div>
                  </div>
                  <div className="card__body">
                    <p>
                      After spending a lot of time in college reading philosophy, I got interested
                      in technology. Biometric & image recognition was especially interesting to me.
                      Led product teams in startups & MNCs like Microsoft, before stumbling into the
                      domain of observability.
                      <br></br>
                      <br></br>
                      Reducing noise in developers' and devops engineers' life is my current passion
                      :)
                    </p>
                  </div>
                  <div className="card__footer">
                    <Link
                      className="button button--secondary button--outline"
                      href={'https://twitter.com/pranay01'}
                    >
                      <div className=""> Twitter </div>
                    </Link>

                    <a
                      className="button button--link"
                      style={{ color: 'white' }}
                      href="mailto:pranay@signoz.io"
                    >
                      pranay at signoz dot io
                    </a>

                    {/* <button className="button button--secondary button--outline button--link" href="https://twitter.com/pranay01">Twitter</button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col col--6">
              <div className="card-demo margin--md">
                <div className="card-dark bg-signoz_slate-500">
                  <div className="avatar margin--md">
                    <img
                      className="avatar__photo avatar__photo--lg"
                      src="/img/12460410.webp"
                      alt="Profile pic of Ankit Nayan"
                    />
                    <div className="avatar__intro">
                      <h4 className="avatar__name">Ankit Nayan</h4>
                      <small className="avatar__subtitle"> Co-Founder & CTO </small>
                    </div>
                  </div>
                  <div className="card__body">
                    <p>
                      Playing Badminton professionally was my dream at one time. But that seemed too
                      tough, so I started coding. I have delved in all sorts of technologies
                      including crypto when it was exciting.
                      <br></br> <br></br>
                      Always interested in solving interesting problems with technology.
                      Microservices & Distributed systems is what I am most interested in these
                      days.{' '}
                    </p>
                  </div>
                  <div className="card__footer">
                    <Link
                      className="button button--secondary button--outline text-white"
                      href={'https://twitter.com/ankitnayan'}
                    >
                      <div className=""> Twitter </div>
                    </Link>

                    <a
                      className="button button--link"
                      style={{ color: 'white' }}
                      href="mailto:pranay@signoz.io"
                    >
                      ankit at signoz dot io
                    </a>
                  </div>
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
