import React from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'

const hero = {
  title: 'KubeCon 2025',
  subtitle: "Hi, I'm Olly. I've got 15 mystery boxes and lots of merch to giveaway.",
  description: 'Come see us at booth 1372 or find me around the event.',
  ctaText: 'Plan Your KubeCon',
  ctaLink: 'https://signoz.io/blog/kubecon-atlanta-2025-observability-guide/',
  ctaTextSecondary: 'Meet the Team',
  ctaLinkSecondary: 'https://forms.gle/2SgUxDkxwjB6Ropj9',
}

const HeroSection = () => {
  return (
    <div className="relative">
      {/* Dotted background pattern */}
      <div className="-z-10 md:hidden">
        <div className="bg-dot-pattern masked-dots absolute inset-0 flex items-center justify-center opacity-100" />
        <div className="absolute left-0 right-0 top-0 mx-auto h-[600px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[1200px]" />
      </div>

      {/* Border decoration */}
      <div className="absolute bottom-0 left-[12px] right-[12px] top-0 z-[0] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:hidden" />

      <div className="h-full px-10 py-8 md:bg-gradient-to-r md:from-black md:via-black/70 md:to-transparent md:px-8 md:py-20">
        <div className="w-full space-y-6 md:w-1/2 lg:w-1/3">
          <div className="flex flex-col font-mono">
            <span>{`// NOV 10 TO 13`}</span>
            <span>{`// ATLANTA, GEORGIA`}</span>
            <span>{`// BOOTH 1372`}</span>
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="mb-0 font-mono text-signoz_vanilla-400">SigNoz@</h2>
              <h1 className="font-bold">{hero.title}</h1>
            </div>
            <p className="font-mono text-signoz_vanilla-300">{hero.subtitle}</p>
            <p className="font-mono text-signoz_vanilla-300">{hero.description}</p>
            <div className="flex flex-row gap-2">
              <Button variant="default" rounded="full" href={hero.ctaLink}>
                {hero.ctaText}
              </Button>
              <Button variant="secondary" rounded="full" href={hero.ctaLinkSecondary}>
                {hero.ctaTextSecondary}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <SectionLayout
        variant="bordered"
        className="mx-8 block !w-[100vw] border-b border-dashed border-signoz_slate-400 md:hidden"
      >
        <Image
          src="/img/events/kubecon-cloudnativecon-north-america-2025/hero-illustration-md.png"
          alt="Kubecon Hero Illustration"
          width={800}
          height={800}
          className="mx-auto block object-contain px-8 md:hidden"
          priority
        />
      </SectionLayout>
      <Image
        src="/img/events/kubecon-cloudnativecon-north-america-2025/hero-illustration.png"
        alt="Kubecon Hero Illustration"
        fill
        className="-z-10 hidden object-contain md:block"
        priority
      />
    </div>
  )
}

export default HeroSection
