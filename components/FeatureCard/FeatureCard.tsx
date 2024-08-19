import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/Button/Button';

type CardProps = {
  title?: string,
  img?: string,
  description?: string | string[];
  buttonText?: string;
  buttonLink?: string
}

const FeatureCard: React.FC<CardProps> = ({ title, img, description, buttonText, buttonLink }) => {
  return (
    <div className={`p-9 bg-signoz_ink-500 border border-signoz_slate-400 border-dashed !border-b-0 !border-r-0 col-span-2 sm:col-span-1`}>
      <div className='flex flex-col items-left mb-4 gap-6'>
        <p className='text-3xl font-semibold text-signoz_vanilla-100'>{title}</p>
        {img ? <img src={img} className='card-background border-none w-auto h-auto' /> : null}
        <p className='text-signoz_vanilla-400 text-base font-normal leading-9 mt-2 mb-3'>{description}</p>
        {buttonText ? (
          <Button type={Button.TYPES.SECONDARY} className='mt-8 mb-4 max-w-fit'>
            <Link href={buttonLink ? buttonLink : ''} className="flex-center" >
              {buttonText} <ArrowRight size={14} />
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default FeatureCard
