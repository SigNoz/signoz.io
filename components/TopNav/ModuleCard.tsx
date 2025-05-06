import * as React from 'react'

function ModuleCard({ imageUrl, title, description }) {
  return (
    <div className="mt-9 flex items-center gap-3 first:mt-0">
      <img
        loading="lazy"
        src={imageUrl}
        alt={`${title} module icon`}
        className="my-auto aspect-square w-[42px] shrink-0 self-stretch object-contain"
      />
      <div className="my-auto flex flex-col self-stretch">
        <div className="text-base font-medium leading-none text-white">{title}</div>
        <div className="mt-1 text-sm leading-none text-stone-300">{description}</div>
      </div>
    </div>
  )
}

export default ModuleCard
