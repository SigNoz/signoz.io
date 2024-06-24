import React from 'react';
import {ArrowRight} from 'lucide-react'

type CardProps = {
  icon?: string,
  title?: string;
  subTitle?: string;
  description: string;
  buttonText?: string;
  logo?: string;
  img?: string
};

const Card: React.FC<CardProps> = ({ icon, title, subTitle, description, buttonText, logo, img }) => {
  return (
    <div className={`p-6 bg-signoz_ink-500`}>
      <div className="flex items-center mb-4">
        {logo ? <img src={logo} alt={`${title} Logo`} className="w-4 h-4 mr-2.5" /> : null}
        <span className="text-sm font-medium text-signoz_vanilla-400 uppercase tracking-[0.05em]">{title}</span>
      </div>
      <div>
        {subTitle ? <p className='text-signoz_vanilla-400'>{subTitle} </p> : null}
      </div>
      <p className="text-signoz_vanilla-400 text-xl font-semibold leading-9 my-3">{description}</p>
      {buttonText ? (
        <button className="h-8 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 not-italic truncate button-background text-center font-medium leading-5 text-white no-underline outline-none hover:text-white">
          {buttonText} <ArrowRight size={14} />
        </button>
      ) : null}
      {img ? <img src={img} className="w-[486px] h-[260px]" alt={`${title} Image`} /> : null}
    </div>
  );
};

export default Card;

