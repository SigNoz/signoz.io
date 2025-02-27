import * as React from 'react'
import ModuleCard from './ModuleCard'
import CustomerStories from './CustomerStories'
import CompareSection from './CompareSection'

const productModules = [
  {
    id: 1,
    title: 'APM',
    description: 'Monitor your applications',
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/f300a9acb36fcb56ecfd248aa052799c20d357cd296f4df20d4c663a4e522d18?placeholderIfAbsent=true&apiKey=f0103e73688241f896979b7df0e7cb45',
  },
  {
    id: 2,
    title: 'Distributed Tracing',
    description: 'Track requests across your services',
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/d15dd53844d0dfd94f29a6421af787e7d405773502c984945e6c339d9a804e7a?placeholderIfAbsent=true&apiKey=f0103e73688241f896979b7df0e7cb45',
  },
  {
    id: 3,
    title: 'Log Management',
    description: 'Unlock key insights from logs',
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/102734406fe79e2a73199b7a407f04b20d162ebc32adde9f2c95659cc32b243e?placeholderIfAbsent=true&apiKey=f0103e73688241f896979b7df0e7cb45',
  },
  {
    id: 4,
    title: 'Ingest Guard',
    description: 'Control your observability costs',
    imageUrl:
      'https://signoz.io/img/index_features/shield-plus.svg',
  },
  {
    id: 5,
    title: 'Alerts',
    description: "Always know what's going on",
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/f840bb207699172d5e4ac3b967a85a73c52a7c25417763a5a09310f765d529f7?placeholderIfAbsent=true&apiKey=f0103e73688241f896979b7df0e7cb45',
  },
  {
    id: 6,
    title: 'Metrics & Dashboards',
    description: 'Monitor key metrics and build dashboards',
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/37ef090867aaa6de0148bc743e5c1cc2b7f154ef46e86f5284d4602782c31bbf?placeholderIfAbsent=true&apiKey=f0103e73688241f896979b7df0e7cb45',
  },
  {
    id: 7,
    title: 'Exceptions',
    description: 'Record exceptions automatically',
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/628dea6b068b58955043f3bfd4a78a8dbf11f7cd589962fd00da5bf20391756f?placeholderIfAbsent=true&apiKey=f0103e73688241f896979b7df0e7cb45',
  },
  {
    id: 8,
    title: 'Infrastructure Monitoring',
    description: 'Monitor your infrastructure',
    imageUrl:
      'https://signoz.io/img/index_features/boxes.svg',
  }
]

function ProductModules() {
  return (
    <main className="flex flex-wrap items-center overflow-hidden rounded border border-solid border-zinc-800">
      <section className="my-auto flex min-w-[240px] flex-col self-stretch bg-neutral-900 p-6 max-md:max-w-full max-md:px-5">
        <h1 className="text-xs font-semibold uppercase leading-loose tracking-wider text-gray-500">
          product modules
        </h1>
        <div className="mt-5 flex flex-wrap items-start gap-10 max-md:max-w-full">
          <div className="flex w-[293px] min-w-[240px] flex-col items-start">
            {productModules.slice(0, 4).map((module) => (
              <ModuleCard key={module.id} {...module} />
            ))}
          </div>
          <div className="flex w-[332px] min-w-[240px] flex-col items-start">
            {productModules.slice(4).map((module) => (
              <ModuleCard key={module.id} {...module} />
            ))}
          </div>
        </div>
      </section>
      <aside className="flex h-full w-[376px] min-w-[240px] flex-col items-center justify-center self-stretch border-l border-solid border-zinc-800 border-l-zinc-800 bg-zinc-900 px-6 max-md:px-5">
        <div className="flex w-full items-start gap-10">
          <div className="flex min-h-[314px] w-full min-w-[240px] flex-1 shrink basis-0 flex-col justify-between">
            <CustomerStories />
            <CompareSection />
          </div>
        </div>
      </aside>
    </main>
  )
}

export default ProductModules
