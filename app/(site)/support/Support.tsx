import Link from 'next/link'
import React from 'react'

function Support() {
  return (
    <div title="Support">
      <section>
        <div className="mx-auto my-48 max-w-[1024px]">
          <h1 className="text--center mb-8 text-2xl">
            SigNoz Cloud and Self-Hosted SigNoz support
          </h1>

          <div className="row flex items-stretch">
            <div className="col col--4">
              <div className="card-demo margin--md">
                <div className="card-dark h-[180px] rounded-md bg-signoz_slate-500">
                  <div className="card__header">
                    <h3>Paid SigNoz support</h3>
                  </div>
                  <div className="card__body">
                    <p className="text-sm">
                      Email <a href="mailto:support@signoz.io">support@signoz.io</a> for SigNoz
                      Cloud or a paid BYOC or Self-Hosted SigNoz contract.
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
                    <h3>Self-Hosted SigNoz community Slack</h3>
                  </div>
                  <div className="card__body">
                    <p className="text-sm">
                      Use community Slack for Self-Hosted SigNoz setup and technical questions.
                    </p>
                  </div>
                  <div className="card__footer">
                    <Link
                      className="button button--secondary button--outline text-xs"
                      target="_blank"
                      href={'https://signoz.io/slack/'}
                      prefetch={false}
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
                    <h3>SigNoz community discussions</h3>
                  </div>
                  <div className="card__body">
                    <p className="text-sm">
                      Use GitHub Discussions for project questions and ideas. This is not paid
                      support.
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
