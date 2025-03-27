import React from 'react'
import Heading from '../../components/ui/Heading'
import Card from '../Card/card'
import Divider from '@/components/ui/Divider'

const BuildForDevelopers = () => {
  const REASONS = [
    {
      title: 'Single tool for observability',
      desc: 'No need of using disparate tools for observability. Get everything in a single platform. ',
      figure: '/img/graphics/homepage/feature-graphic-single-tool.webp',
    },
    {
      title: 'Flexible deployment options',
      desc: 'You can self-host SigNoz or use our cloud services, or use both depending on your use-cases.',
      figure: '/img/graphics/homepage/feature-graphic-flexible-deployment.webp',
    },
    {
      title: 'Columnar database',
      desc: 'SigNoz uses ClickHouse (used by likes of Uber & Cloudflare) as datastore - an extremely fast and highly optimized storage for observability data.',
      figure: '/img/graphics/homepage/feature-graphic-columnar-db.webp',
    },
    {
      title: 'Flexible Querying',
      desc: 'DIY Query builder, PromQL, and ClickHouse queries to fulfill all your use-cases around querying observability data.',
      figure: '/img/graphics/homepage/feature-graphic-flexible-querying.webp',
    },
    {
      title: 'Correlated Signals',
      desc: 'Correlated logs, metrics and traces for much richer context while debugging.',
      figure: '/img/graphics/homepage/feature-graphic-correlation.webp',
    },
  ]
  return (
    <section className="!mx-auto !w-[100vw] border !border-l-0 !border-t-0 border-dashed border-signoz_slate-400 md:!w-[80vw]">
      <div className=" h-12 w-full border !border-r-0 !border-t-0 border-dashed border-signoz_slate-400" />
      <div className="overflow-hidden">
        <div
          className={`relative bg-[url('/img/background_blur/Perlin_noise.png')] bg-[length:85%] bg-[center_top_8rem] bg-no-repeat
      `}
        >
          <div className={`section-container mb-0 !px-0 pt-12`}>
            <div className="mx-auto w-[100vw] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(100px)] md:w-[80vw] ">
              <div className="flex flex-col items-center border !border-b-0 !border-r-0 !border-t-0 border-dashed border-signoz_slate-400 px-24 py-48 text-center sm:px-0 ">
                <div className="text-[44px] font-semibold leading-[3.5rem] text-signoz_sienna-100">
                  Built for developers, <br />
                  crafted by humans.
                </div>
              </div>
            </div>
            <div className="homepage-build-dev-container grid grid-cols-1 sm:grid-cols-2">
              {REASONS.map((section, index) => (
                <Card
                  title={section.title}
                  description={section.desc}
                  img={section.figure}
                  key={section.title}
                  sectionName="Built for Developers"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BuildForDevelopers
