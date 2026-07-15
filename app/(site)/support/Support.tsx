import React from 'react'
import Button from '@/components/ui/Button'

function Support() {
  return (
    <div title="Support">
      <section>
        <div className="mx-auto my-48 max-w-[1024px]">
          <h1 className="mb-8 text-center text-2xl">
            Reach out to us for any queries you may have{' '}
          </h1>

          <div className="flex flex-wrap items-stretch">
            <div className="w-full p-4 md:w-1/3">
              <div className="border-border bg-card flex h-[180px] flex-col rounded-md border p-4">
                <h3 className="text-l1-foreground mb-2 text-lg font-semibold">Email</h3>
                <div className="mb-3 flex-1">
                  <p className="text-l1-foreground text-sm">
                    Write to us at <a href="mailto:support@signoz.io">support@signoz.io</a> for any
                    queries
                  </p>
                </div>
                <div>
                  <Button href="mailto:support@signoz.io" variant="outline" size="sm">
                    Email Support
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full p-4 md:w-1/3">
              <div className="border-border bg-card flex h-[180px] flex-col rounded-md border p-4">
                <h3 className="text-l1-foreground mb-2 text-lg font-semibold">Slack</h3>
                <div className="mb-3 flex-1">
                  <p className="text-l1-foreground text-sm">
                    If you are facing any issues in getting up and running, or have a technical
                    query
                  </p>
                </div>
                <div>
                  <Button asChild variant="outline" size="sm">
                    <a href="https://signoz.io/slack/" target="_blank" rel="noopener noreferrer">
                      Slack Community
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full p-4 md:w-1/3">
              <div className="border-border bg-card flex h-[180px] flex-col rounded-md border p-4">
                <h3 className="text-l1-foreground mb-2 text-lg font-semibold">
                  GitHub Discussions
                </h3>
                <div className="mb-3 flex-1">
                  <p className="text-l1-foreground text-sm">
                    For ideas about the project or something which the community would find helpful
                  </p>
                </div>
                <div>
                  <Button asChild variant="outline" size="sm">
                    <a
                      href="https://github.com/SigNoz/signoz/discussions"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub Discussions
                    </a>
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

export default Support
