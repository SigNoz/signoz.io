import * as React from 'react'

const MainSection: React.FC = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-neutral-950">
      <section className="relative flex min-h-[908px] w-full flex-col items-start px-20 pb-[583px] pt-12 font-medium max-md:max-w-full max-md:px-5 max-md:pb-24">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/562a4465037bcdba66de8fec5440f40b6a296667d0e30cca89202681cfefca24?placeholderIfAbsent=true&apiKey=f0103e73688241f896979b7df0e7cb45"
          alt="background"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="relative mb-0 flex w-[533px] max-w-full flex-col max-md:mb-2.5">
          <div className="flex w-full flex-col max-md:max-w-full">
            <div className="flex w-[471px] max-w-full flex-col">
              <div className="text-xl tracking-wider text-stone-300 max-md:max-w-full">
                Sept 16 ⎯ 20
              </div>
              <h1 className="mt-4 text-5xl uppercase tracking-widest text-red-500 max-md:max-w-full max-md:text-4xl">
                Launch Week <span className="text-red-500">2.0</span>
              </h1>
            </div>
            <p className="mt-11 text-base leading-8 tracking-wider text-stone-300 max-md:mt-10 max-md:max-w-full">
              Join us for a week of new features and find new ways
              <br />
              to level up on your observability goals.
            </p>
          </div>
          <form className="mt-8 flex min-h-[40px] w-[360px] max-w-full items-center justify-center gap-2.5 overflow-hidden rounded-sm bg-white px-4 py-2.5 text-sm leading-none text-neutral-950">
            <label htmlFor="newsletter" className="sr-only">
              Subscribe for updates
            </label>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/df4736e11b5ec11e5fd0e4afd7c29e118cf695dec3b6251eb59aa91fade15177?placeholderIfAbsent=true&apiKey=f0103e73688241f896979b7df0e7cb45"
              alt="subscribe icon"
              className="my-auto aspect-square w-4 shrink-0 self-stretch object-contain"
            />
            <button
              type="submit"
              className="px-2 py-1 text-sm font-medium leading-none text-neutral-950"
            >
              Subscribe for updates
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default MainSection
