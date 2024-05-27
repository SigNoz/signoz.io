import React from 'react'

function verifyemail() {
  return (
    <div title="Book a Call">
      <section>
        <div className="container" style={{ marginTop: '8rem', marginBottom: '4rem' }}>
          <div className="hero shadow--lw">
            <div className="container">
              <h2>
                Thank you for signing up for SigNoz Cloud. Please check your email for next steps
              </h2>

              <p style={{ fontStyle: 'italic' }}>
                If you have not received the email in a few minutes, please check your spam folder.
              </p>

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
