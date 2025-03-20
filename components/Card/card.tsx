import React, { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/Button/Button';
import TrackingLink from '@/components/TrackingLink';

type CardProps = {
  number?: string,
  icon?: string,
  iconTag?: string,
  title?: string;
  subTitle?: string;
  stats?: string;
  description?: string | string[] | React.ReactNode;
  text?: string;
  info?: string;
  buttonText?: string;
  buttonLink?: string;
  logo?: string;
  logoSize?: number;
  subTitleSize?: number;
  img?: string;
  border?: Boolean;
  sectionName?: string;
};

const Card: React.FC<CardProps> = ({ 
  number, 
  iconTag, 
  title, 
  subTitle, 
  stats, 
  description, 
  text, 
  buttonText, 
  buttonLink, 
  logo, 
  img, 
  logoSize = 16, 
  subTitleSize = 1,
  sectionName = 'Features'
}) => {
  const logoSizeClassnames = useMemo(() => {
    if (logoSize === 16) {
      return 'w-4 h-4 fill-signoz_vanilla-400';
    }

    if (logoSize === 24) {
      return 'w-6 h-6 fill-signoz_vanilla-400';
    }
  }, [logoSize]);

  const subTitleSizeClassnames = useMemo(() => {
    if (subTitleSize === 1) {
      return 'text-base font-semibold';
    }

    if (subTitleSize === 2) {
      return 'text-2xl font-semibold';
    }
  }, [subTitleSize]);

  const descriptionArray = Array.isArray(description) ? description : description ? [description] : [];

  return (
    <div className={`p-9 bg-signoz_ink-500 border border-signoz_slate-400 border-dashed !border-b-0 !border-r-0 col-span-2 sm:col-span-1`}>
      <div className="flex items-center mb-4">
        {logo ? <img src={logo} alt={`${iconTag} Logo`} className={`${logoSizeClassnames} mr-2.5`} /> : null}
        <span className="text-sm font-medium text-signoz_vanilla-400 uppercase tracking-[0.05em]">{iconTag}</span>
        <span className="text-2xl font-semibold text-signoz_vanilla-100">{title}</span>
      </div>

      <div>
        <span className='text-2xl font-normal text-signoz_slate-50 font-mono'>{number}</span>
        {subTitle ? <p className={`${subTitleSizeClassnames} text-signoz_vanilla-100 pt-4 m-0`}>{subTitle}</p> : null}
      </div>

      <div>
        {text ? <span className='text-signoz_vanilla-400 text-xl font-semibold leading-9 block my-3 max-w-md'>{text}</span> : null}
      </div>

      <div>
        {stats ? <p className='font-mono text-signoz_vanilla-100 text-[32px] pt-4 leading-10 font-semibold block mb-2'>{stats}</p> : null}
      </div>

      {descriptionArray.map((desc, index) => (
        <p key={index} className="text-signoz_vanilla-400 text-base font-normal leading-9 mt-2 mb-3">{desc}</p>
      ))}
      {img ? <img src={img} className="card-background border-none w-auto h-auto" /> : null}

      {buttonText ? (
        <Button className='mt-6 mb-4'>
          {buttonLink ? (
            <TrackingLink 
              href={buttonLink}
              clickType="Primary CTA"
              clickName={`${title || 'Feature'} Link`}
              clickText={buttonText}
              clickLocation={sectionName}
              className="flex-center"
            >
              {buttonText} <ArrowRight size={14} />
            </TrackingLink>
          ) : (
            <>
              {buttonText} <ArrowRight size={14} />
            </>
          )}
        </Button>
      ) : null}
    </div>
  );
};

export default Card;
