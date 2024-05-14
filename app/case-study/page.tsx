import Link from 'next/link'
import React from 'react'

function caseStudies() {
  return (
    <div title="SigNoz Plans">
      <section>
        <div className="container" style={{ marginTop: '2rem', marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center' }}> Customer Stories </h2>
          <p style={{ textAlign: 'center' }}>
            {' '}
            How teams are using SigNoz to improve Observability of their software stack{' '}
          </p>

          <div className={'row'}>
            <div className={'col col--6 margin-vert--md'}>
              <div className="card bg-signoz_ink-300">
                <div className="card__header">
                  <h3 className="text-signoz_ink-300"> InstaSafe </h3>
                </div>
                <div className="card__image">
                  <img src="/img/case_study/Instasafe-summary.webp" alt="InstaSafe" />
                </div>
                <div className="card__footer">
                  <Link className="button button--primary" href={'/case-study/instasafe/'}>
                    Read more
                  </Link>
                </div>
              </div>
            </div>
            <div className={'col col--6 margin-vert--md'}>
              <div className="card">
                <div className="card__header">
                  <h3 className="text-signoz_ink-300">Blip</h3>
                </div>
                <div className="card__image">
                  <img src="/img/case_study/BlipBillBoards-summary.webp" alt="Blip" />
                </div>

                <div className="card__footer">
                  <a className="button button--primary" href="/case-study/blip/">
                    Read more
                  </a>
                </div>
              </div>
            </div>
            <div className={'col col--6 margin-vert--md'}>
              <div className="card">
                <div className="card__header">
                  <h3 className="text-signoz_ink-300">Outplay</h3>
                </div>
                <div className="card__image">
                  <img
                    src="/img/case_study/outplay-list.webp"
                    alt="Image alt text"
                    title="Logo Title Text 1"
                  />
                </div>

                <div className="card__footer">
                  <a className="button button--primary" href="/case-study/outplay/">
                    Read more
                  </a>
                </div>
              </div>
            </div>
            <div className={'col col--6 margin-vert--md'}>
              <div className="card">
                <div className="card__header">
                  <h3 className="text-signoz_ink-300">Wombo</h3>
                </div>
                <div className="card__image">
                  <img
                    src="/img/case_study/wombo-list-image.webp"
                    alt="Wombo"
                    title="Wombo Case Study"
                  />
                </div>

                <div className="card__footer">
                  <a className="button button--primary" href="/case-study/wombo/">
                    Read more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default caseStudies
