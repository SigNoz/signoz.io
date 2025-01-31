import * as React from 'react'

function CustomerStories() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-center gap-1.5 self-start text-xs font-semibold uppercase leading-loose tracking-wider text-gray-500">
        <span className="my-auto self-stretch">customer stories</span>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3283d9d83385fc7ab216dfea73e4ca4e1c5d9fc187b0dcf9ef96e502e97e89bf?placeholderIfAbsent=true&apiKey=f0103e73688241f896979b7df0e7cb45"
          alt=""
          className="my-auto aspect-square w-3.5 shrink-0 self-stretch object-contain"
        />
      </div>
      <div className="mt-5 flex w-full items-center gap-3 text-base font-medium leading-5 text-stone-300">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/90329f2985f915e4a5c7bf9b57efab95daa042eb1951f43f674f36642bb9cea7?placeholderIfAbsent=true&apiKey=f0103e73688241f896979b7df0e7cb45"
          alt="Brainfish company logo"
          className="my-auto aspect-square w-[42px] shrink-0 self-stretch rounded-md object-contain"
        />
        <div className="my-auto min-w-[240px] flex-1 shrink self-stretch">
          How Brainfish leveraged SigNoz for effective Kubernetes monitoring...
        </div>
      </div>
    </div>
  )
}

export default CustomerStories
