import React, { useMemo } from 'react';
import { ArrowRight } from 'lucide-react'
import Link from 'next/link';
import Button from '@/components/Button/Button'

type CardProps = {
  icon?: string,
  iconTag?: string,
  title?: string;
  subTitle?: string;
  stats?: string;
  description?: string;
  text?: string;
  buttonText?: string;
  buttonLink?: string;
  logo?: string;
  logoSize?: number;
  img?: string;
  border?: Boolean
};

const Card: React.FC<CardProps> = ({ iconTag, title, subTitle, stats, description, text, buttonText, buttonLink, logo, img, logoSize = 16 }) => {
  const logoSizeClassnames = useMemo(() => {
    if (logoSize === 16) {
      return 'w-4 h-4 fill-signoz_vanilla-400'
    }

    if (logoSize === 24) {
      return 'w-6 h-6 fill-signoz_vanilla-400'
    }
  }, [logoSize]);
  return (
    <div className={`p-9 bg-signoz_ink-500 border border-signoz_slate-400 border-dashed !border-b-0 !border-r-0 col-span-2 sm:col-span-1`}>
      <div className="flex items-center mb-4">
        {logo ? <img src={logo} alt={`${iconTag} Logo`} className={`${logoSizeClassnames} mr-2.5`} /> : null}
        <span className="text-sm font-medium text-signoz_vanilla-400 uppercase tracking-[0.05em]">{iconTag}</span>
        <span className="text-2xl font-semibold text-signoz_vanilla-100">{title}</span>
      </div>
      <div>
        {subTitle ? <p className='text-signoz_vanilla-100 text-base font-semibold pt-4 m-0'>{subTitle} </p> : null}
      </div>
      <div>
        {text ? <span className='text-signoz_vanilla-400 text-xl font-semibold leading-9 block my-3 max-w-md'>{text}</span>: null}
      </div>
      <div>
        {stats ? <p className='font-mono text-signoz_vanilla-100 text-[32px] pt-4 leading-10 font-semibold block mb-2'>{stats}</p> : null}
      </div>
      <p className="text-signoz_vanilla-400 text-base font-normal leading-9 mt-2 mb-3">{description}</p>
      {buttonText ? (
        <Link href={buttonLink ? buttonLink: ''} >
        <Button type={Button.TYPES.SECONDARY} className='mb-4'>
          {buttonText} <ArrowRight size={14} />
        </Button>
        </Link>
      ) : null}
      {/* We will update this once we have the assets */}
      {img ? <img src={img} className="card-background border-none w-auto h-auto"  /> : null}
      {/* {img ? <div className="card-background w-full h-60 mt-4"  /> : null} */}
    </div>
  );
};

export default Card;

