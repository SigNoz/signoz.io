import React from 'react'

function verifyemail() {
  return (
    <div title="Book a Call">
      <section>
        <div className="m-36">
          <div className="card-dark mx-auto max-w-[1024px] rounded-sm bg-signoz_slate-500 p-16">
            <h2 className="mb-8">
              Thank you for signing up for SigNoz Cloud. Please check your email for next steps
            </h2>

            <p className="mb-8 italic">
              If you have not received the email in a few minutes, please check your spam folder.
            </p>

            <div className="flex">
              <a className="button button--primary" href="mailto:cloud-support@signoz.io">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default verifyemail
