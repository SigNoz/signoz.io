import React from 'react'
import { CarouselCard } from './CarouselCards.types'
import GridLayout from '../GridLayout'
import Button from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import SectionLayout from '../SectionLayout'

const CarouselCards: React.FC<{
  cards: Array<CarouselCard>
  buttonLink?: string
  buttonText?: string
}> = ({ cards, buttonLink, buttonText }) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [isTransitioning, setIsTransitioning] = React.useState(false)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % cards.length)
        setIsTransitioning(false)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const handleCardClick = (index: number) => {
    if (index !== activeIndex && !isTransitioning) {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveIndex(index)
        setIsTransitioning(false)
      }, 300)
    }
  }

  return (
    <SectionLayout variant="full-width">
      <GridLayout variant="split" className="items-center gap-12">
        <div className="flex flex-col">
          {buttonLink && (
            <Button
              variant="secondary"
              rounded="full"
              className="mb-8 flex w-fit items-center gap-2 md:mb-12"
              to={buttonLink}
            >
              {buttonText}
              <ArrowRight size={14} />
            </Button>
          )}

          <div className="space-y-4">
            {cards.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleCardClick(index)}
                className={`transform cursor-pointer transition-all duration-500 ease-in-out ${
                  activeIndex === index
                    ? 'border-signoz_robin-500/10 bg-signoz_robin-500/10 shadow-lg'
                    : 'border-signoz_slate-400 bg-signoz_ink-400 hover:bg-signoz_ink-300'
                } relative overflow-hidden rounded-lg border p-4`}
              >
                <div className="flex h-fit gap-2">
                  <div className="mr-2 flex h-11 w-0.5 flex-shrink-0 items-center justify-center">
                    <div
                      className={`h-full w-full rounded-full ${
                        activeIndex === index ? 'bg-signoz_robin-600/60' : 'bg-signoz_slate-200/80'
                      }`}
                    ></div>
                  </div>
                  <div>
                    <h3
                      className={`mb-2 text-sm font-semibold transition-colors duration-300 ${
                        activeIndex === index ? 'text-signoz_robin-600' : 'text-signoz_vanilla-100'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`m-0 text-xs transition-colors duration-300 ${
                        activeIndex === index ? 'text-signoz_robin-200' : 'text-signoz_vanilla-100'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative h-96 overflow-hidden rounded-lg">
            <div
              className="flex flex-col transition-all duration-500 ease-in-out"
              style={{
                transform: `translateY(-${activeIndex * (100 / cards.length)}%)`,
                height: `${cards.length * 100}%`,
              }}
            >
              {cards.map((item) => (
                <div
                  key={item.id}
                  className="relative h-full flex-shrink-0"
                  style={{ height: `${100 / cards.length}%` }}
                >
                  <div className="relative flex h-full items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GridLayout>
    </SectionLayout>
  )
}

export default CarouselCards
