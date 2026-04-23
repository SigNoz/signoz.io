import React from 'react'
import Card from '../Card/card'
import featureGraphicSingleTool from '@/public/img/graphics/homepage/feature-graphic-single-tool.svg?url'
import featureGraphicFlexibleDeployment from '@/public/img/graphics/homepage/feature-graphic-flexible-deployment.svg?url'
import featureGraphicColumnarDb from '@/public/img/graphics/homepage/feature-graphic-columnar-db.svg?url'
import featureGraphicFlexibleQuerying from '@/public/img/graphics/homepage/feature-graphic-flexible-querying.svg?url'
import featureGraphicCorrelation from '@/public/img/graphics/homepage/feature-graphic-correlation.svg?url'
import { cn } from '../../app/lib/utils'

const REASONS = [
  {
    title: 'Single tool for observability',
    desc: 'No need of using disparate tools for observability. Get everything in a single platform. ',
    figure: featureGraphicSingleTool,
    imgClassName: 'w-full !bg-transparent',
    imgWidth: 528,
    imgHeight: 302,
  },
  {
    title: 'Flexible deployment options',
    desc: 'You can self-host SigNoz or use our cloud services, or use both depending on your use-cases.',
    figure: featureGraphicFlexibleDeployment,
    imgClassName: 'w-full !bg-transparent',
    imgWidth: 528,
    imgHeight: 302,
  },
  {
    title: 'Columnar database',
    desc: 'SigNoz uses ClickHouse (used by likes of Uber & Cloudflare) as datastore - an extremely fast and highly optimized storage for observability data.',
    figure: featureGraphicColumnarDb,
    imgClassName: 'w-full !bg-transparent',
    imgWidth: 528,
    imgHeight: 302,
  },
  {
    title: 'Flexible Querying',
    desc: 'DIY Query builder, PromQL, and ClickHouse queries to fulfill all your use-cases around querying observability data.',
    figure: featureGraphicFlexibleQuerying,
    imgClassName: 'w-full !bg-transparent',
    imgWidth: 528,
    imgHeight: 302,
  },
  {
    title: 'Correlated Signals',
    desc: 'Correlated logs, metrics and traces for much richer context while debugging.',
    figure: featureGraphicCorrelation,
    imgClassName: 'w-full !bg-transparent',
    imgWidth: 1128,
    imgHeight: 337,
  },
]

const BuildForDevelopers = ({ className }: { className?: string }) => {
  return (
    <section
      className={cn(
        'mx-auto w-full border !border-l-0 !border-t-0 border-dashed border-signoz_slate-400 md:w-[80vw]',
        className
      )}
    >
      <div className="overflow-hidden">
        <div className="bg-blur-perlin-noise relative">
          <div className={`section-container mb-0 !px-0 pt-12`}>
            <div className="relative mx-auto w-full">
              <div className="bg-blur-ellipse-388-with-dots flex flex-col items-center border !border-b-0 !border-r-0 !border-t-0 border-dashed border-signoz_slate-400 px-24 py-48 text-center sm:px-0">
                <div className="text-[44px] font-semibold leading-[3.5rem] text-signoz_sienna-100">
                  Built for developers, <br />
                  crafted by humans.
                </div>
              </div>
            </div>
            <div className="homepage-build-dev-container grid grid-cols-1 sm:grid-cols-2">
              {REASONS.map((section) => (
                <Card
                  title={section.title}
                  description={section.desc}
                  img={section.figure}
                  imgClassName={section.imgClassName}
                  imgWidth={section.imgWidth}
                  imgHeight={section.imgHeight}
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
