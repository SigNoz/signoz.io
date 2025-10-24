import React from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'

const hero = {
  title: 'KubeCon 2025',
  subtitle: "Hi, I'm Olly. I've got 15 mystery boxes and lots of merch to giveaway.",
  description: 'Come see us at booth 1372 or find me around the event.',
  ctaText: 'Plan Your KubeCon',
  ctaLink: 'https://signoz.io/blog/kubecon-atlanta-2025-observability-guide/',
}

const HeroSection = () => {
  return (
    <div className="relative">
      <div className="h-full bg-gradient-to-r from-black via-black/70 to-transparent px-8 py-20">
        <div className="w-1/2 space-y-6 lg:w-1/3">
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
            <Button variant="default" rounded="full" href={hero.ctaLink}>
              {hero.ctaText}
            </Button>
          </div>
        </div>
      </div>
      <Image
        src="/img/events/kubecon-cloudnativecon-north-america-2025/hero-illustration.png"
        alt="Kubecon Hero Illustration"
        fill
        className="-z-10 object-contain"
        priority
      />
    </div>
  )
}

export default HeroSection
