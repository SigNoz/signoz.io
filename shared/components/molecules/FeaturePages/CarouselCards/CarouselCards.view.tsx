import React from 'react'
import { CarouselCard } from './CarouselCards.types'
import GridLayout from '../GridLayout'
import Button from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import SectionLayout from '../SectionLayout'

const CarouselCards: React.FC<{ cards: Array<CarouselCard>, buttonLink?: string, buttonText?: string }> = ({ cards, buttonLink, buttonText }) => {
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
      <GridLayout variant="split" className="gap-12 items-center">
        <div className="flex flex-col">
          {buttonLink && <Button 
            variant="secondary" 
            rounded="full"
            className="flex items-center gap-2 w-fit md:mb-12 mb-8"
            to={buttonLink}
          >
            {buttonText}
            <ArrowRight size={14} />
          </Button>}
          
          <div className="space-y-4">
            {cards.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleCardClick(index)}
                className={`cursor-pointer transition-all duration-500 ease-in-out transform ${
                  activeIndex === index 
                    ? 'bg-signoz_robin-500/10 border-signoz_robin-500/10 shadow-lg' 
                    : 'bg-signoz_ink-400 border-signoz_slate-400 hover:bg-signoz_ink-300'
                } border rounded-lg p-4 relative overflow-hidden`}
              >
                <div className="flex gap-2 h-fit">
                  <div className="flex h-11 w-0.5 flex-shrink-0 items-center justify-center mr-2">
                    <div className={`h-full w-full rounded-full ${
                      activeIndex === index ? 'bg-signoz_robin-600/60' : 'bg-signoz_slate-200/80'
                    }`}></div>
                  </div>
                  <div>
                    <h3 className={`text-sm font-semibold mb-2 transition-colors duration-300 ${
                      activeIndex === index ? 'text-signoz_robin-600' : 'text-signoz_vanilla-100'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`m-0 text-xs transition-colors duration-300 ${
                      activeIndex === index ? 'text-signoz_robin-200' : 'text-signoz_vanilla-100'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <div className="relative overflow-hidden rounded-lg h-96">
            <div 
              className="transition-all duration-500 ease-in-out flex flex-col"
              style={{
                transform: `translateY(-${activeIndex * (100 / cards.length)}%)`,
                height: `${cards.length * 100}%`
              }}
            >
              {cards.map((item) => (
                <div
                  key={item.id}
                  className="h-full flex-shrink-0 relative"
                  style={{ height: `${100 / cards.length}%` }}
                >
                  <div className="h-full flex items-center justify-center">
                    <Image src={item.image} alt={item.title} width={10000} height={10000} />
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