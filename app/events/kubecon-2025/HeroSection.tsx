import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

const hero = {
  title: "KubeCon 2025",
  subtitle: "Hi, I'm Olly. I've got 15 mystery boxes and lots of merch to giveaway.",
  description: "Come see us at booth 1372 or find me around the event.",
  ctaText: "Learn More",
  ctaLink: "https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/"
}

const HeroSection = () => {
  return (
    <div className="relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 h-full py-20 px-6 bg-gradient-to-r from-black to-black/50">
            <div className="font-mono flex flex-col">
              <span>// NOV 10 TO 13</span>
              <span>// ATLANTA, GEORGIA</span>
              <span>// BOOTH 1372</span>
            </div>
            <div className="space-y-4">
              <div>
                <h2 className="font-mono mb-0 text-signoz_vanilla-400">SigNoz@</h2>
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
      </div>
      <Image
        src="/img/events/kubecon-2025/hero-illustration.png"
        alt="Kubecon Hero Illustration"
        fill
        className="object-contain -z-10"
        priority
      />
    </div>
  );
};

export default HeroSection;