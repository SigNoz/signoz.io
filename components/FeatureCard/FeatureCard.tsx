import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

type CardProps = {
  title?: string
  img?: string
  description?: string | string[]
  buttonText?: string
  buttonLink?: string
}

const FeatureCard: React.FC<CardProps> = ({ title, img, description, buttonText, buttonLink }) => {
  return (
    <div
      className={`border-border bg-background col-span-2 border !border-r-0 !border-b-0 border-dashed p-9 sm:col-span-1`}
    >
      <div className="items-left mb-4 flex flex-col gap-6">
        <p className="text-l1-foreground text-3xl font-semibold">{title}</p>
        {img ? (
          <img
            src={img}
            alt={title ? title : 'SigNoz product screenshot'}
            className="card-background h-auto w-auto border-none"
          />
        ) : null}
        <p className="text-muted-foreground mt-2 mb-3 text-base leading-9 font-normal">
          {description}
        </p>
      </div>
      <div className="mt-4">
        {buttonText ? (
          <Button variant="legacySecondary" className="mt-4 mb-4 max-w-fit">
            <Link href={buttonLink ? buttonLink : ''} className="flex-center" target="_blank">
              {buttonText} <ArrowRight size={14} />
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default FeatureCard
