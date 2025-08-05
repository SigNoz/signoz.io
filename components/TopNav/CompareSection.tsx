import * as React from 'react'

const compareItems = ['SigNoz vs DataDog', 'SigNoz vs Grafana', 'SigNoz vs New Relic']

function CompareSection() {
  return (
    <div className="mt-28 flex w-[168px] max-w-full flex-col max-md:mt-10">
      <h2 className="text-xs font-semibold uppercase leading-loose tracking-wider text-gray-500">
        compare signoz
      </h2>
      <nav className="mt-5 flex w-full flex-col text-base font-medium leading-none text-stone-300">
        {compareItems.map((item, index) => (
          <a key={index} href="#" className="mt-3 gap-1.5 self-stretch first:mt-0" tabIndex={0}>
            {item}
          </a>
        ))}
      </nav>
    </div>
  )
}

export default CompareSection
