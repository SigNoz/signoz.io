import Link from 'next/link'
import React from 'react'

function Support() {
  return (
    <div title="Support">
      <section>
        <div className="mx-auto my-48 max-w-[1024px]">
          <h1 className="text--center mb-8 text-2xl">
            Reach out to us for any queries you may have{' '}
          </h1>

          <div className="row flex items-stretch">
            <div className="col col--4">
              <div className="card-demo margin--md">
                <div className="card-dark h-[180px] rounded-md bg-signoz_slate-500">
                  <div className="card__header">
                    <h3>Email</h3>
                  </div>
                  <div className="card__body">
                    <p className="text-sm">
                      Write to us at <a href="mailto:support@signoz.io">support@signoz.io</a> for
                      any queries
                    </p>
                  </div>
                  <div className="card__footer">
                    <Link
                      className="button button--secondary button--outline text-xs"
                      href={'mailto:support@signoz.io'}
                    >
                      Email Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col col--4">
              <div className="card-demo margin--md h-full">
                <div className="card-dark h-[180px] rounded-md bg-signoz_slate-500">
                  <div className="card__header">
                    <h3>Slack</h3>
                  </div>
                  <div className="card__body">
                    <p className="text-sm">
                      If you are facing any issues in getting up and running, or have a technical
                      query
                    </p>
                  </div>
                  <div className="card__footer">
                    <Link
                      className="button button--secondary button--outline text-xs"
                      target="_blank"
                      href={'https://signoz.io/slack'}
                    >
                      Slack Community
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col col--4">
              <div className="card-demo margin--md">
                <div className="card-dark h-[180px] rounded-md bg-signoz_slate-500">
                  <div className="card__header">
                    <h3>GitHub Discussions</h3>
                  </div>
                  <div className="card__body">
                    <p className="text-sm">
                      For ideas about the project or something which the community would find
                      helpful
                    </p>
                  </div>
                  <div className="card__footer">
                    <Link
                      className="button button--secondary button--outline text-xs"
                      target="_blank"
                      href={'https://github.com/SigNoz/signoz/discussions'}
                    >
                      GitHub Discussions
                    </Link>
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

export default Support
