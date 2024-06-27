import React, { useMemo } from 'react';
import { ArrowRight } from 'lucide-react'
import Link from 'next/link';

type CardProps = {
  icon?: string,
  iconTag?: string,
  title?: string;
  subTitle?: string;
  stats?: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  logo?: string;
  logoSize?: number;
  img?: string;
  border?: Boolean
};

const Card: React.FC<CardProps> = ({ iconTag, title, subTitle, stats, description, buttonText, buttonLink, logo, img, logoSize = 16 }) => {
  const logoSizeClassnames = useMemo(() => {
    if (logoSize === 16) {
      return 'w-4 h-4'
    }

    if (logoSize === 24) {
      return 'w-6 h-6'
    }
  }, [logoSize]);
  return (
    <div className={`p-6 bg-signoz_ink-500 border border-signoz_slate-400 border-dashed`}>
      <div className="flex items-center mb-4">
        {logo ? <img src={logo} alt={`${iconTag} Logo`} className={`${logoSizeClassnames} mr-2.5`} /> : null}
        <span className="text-sm font-medium text-signoz_vanilla-400 uppercase tracking-[0.05em]">{iconTag}</span>
        <span className="text-2xl font-semibold text-signoz_vanilla-100">{title}</span>
      </div>
      <div>
        {subTitle ? <p className='text-signoz_vanilla-100 text-base font-semibold'>{subTitle} </p> : null}
      </div>
      <div>
        {stats ? <p className='font-mono text-signoz_vanilla-100 text-[32px] leading-10 font-semibold'>{stats}</p> : null}
      </div>
      <p className="text-signoz_vanilla-400 text-base font-normal leading-9 my-3">{description}</p>
      {buttonText ? (
        <Link href={buttonLink ? buttonLink: ''}>
        <button className="h-8 pr-3 pl-4 px-4 py-2 mb-[18px] rounded-full text-sm flex items-center justify-center gap-1.5 not-italic truncate button-background text-center font-medium leading-5 text-white no-underline outline-none hover:text-white">
          {buttonText} <ArrowRight size={14} />
        </button>
        </Link>
      ) : null}
      {img ? <img src={img} className="w-full h-[302px]" alt={`${title} Image`} /> : null}
    </div>
  );
};

export default Card;

