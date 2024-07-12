
'use client'

import React, { useState } from 'react';
import Heading from '../../components/ui/Heading';
import SubHeading from '../../components/ui/SubHeading';
import Card from '@/components/Card/card'

export const SigNozFeatures = () => {
  const [tab, setTab] = useState('apm');

  const featureChangeHandler = (value: string) => {
    if (value === tab) {
      setTab('');
    } else {
      setTab(value);
    }
  };

  const icons = [
    { src: '/img/index_features/bar-chart-2.svg', label: 'Metrics' },
    { src: '/img/index_features/drafting-compass.svg', label: 'Traces' },
    { src: '/img/index_features/logs.svg', label: 'Logs' },
    { src: '/img/index_features/layout-grid.svg', label: 'Dashboards' },
    { src: '/img/index_features/bug.svg', label: 'Errors' },
    { src: '/img/index_features/concierge-bell.svg', label: 'Alerts' },
  ];

  const sections = [
    {
      iconTag: 'INGEST DATA',
      text: 'Ingest data from 50+ sources — send your data and start digging through.',
      buttonText: 'Explore',
      logo: '/img/index_features/bar-chart-2.svg',
      img: '/img/graphics/homepage/feature-graphic-1.webp'
    },
    {
      iconTag: 'APPLICATION PERFORMANCE MONITORING',
      text: 'Monitor & troubleshoot your application performance with APM.',
      buttonText: 'Explore',
      logo: '/img/index_features/bar-chart-2.svg',
      img: '/img/graphics/homepage/feature-graphic-2.webp'
    },
    {
      iconTag: 'DISTRIBUTED TRACING',
      text: 'Track user requests across services to identify bottlenecks.',
      buttonText: 'Learn more',
      logo: '/img/index_features/drafting-compass.svg',
      img: '/img/graphics/homepage/feature-graphic-3.webp'
    },
    {
      iconTag: 'LOG MANAGEMENT',
      text: 'Ingest, search, and analyze your logs at any scale.',
      buttonText: 'Learn more',
      logo: '/img/index_features/logs.svg',
      img: '/img/graphics/homepage/feature-graphic-4.webp'
    },
    {
      iconTag: 'EXCEPTIONS',
      text: 'Record exceptions automatically with stack trace & linked span data.',
      buttonText: 'Explore',
      logo: '/img/index_features/bug.svg',
      img: '/img/graphics/homepage/feature-graphic-5.webp'
    },
    {
      iconTag: 'METRICS & DASHBOARDS',
      text: 'Metrics monitoring with configurable dashboards to fit any use case.',
      buttonText: 'Explore',
      logo: '/img/index_features/layout-grid.svg',
      img: '/img/graphics/homepage/feature-graphic-6.webp'
    },
    {
      iconTag: 'ALERTS',
      text: 'Get actionable alerts in your preferred notification channel.',
      buttonText: 'Learn more',
      logo: '/img/index_features/concierge-bell.svg',
      img: '/img/graphics/homepage/feature-graphic-7.webp'
    },
  ];



  return (
    <>
      <section className="w-[80vw] mx-auto border border-signoz_slate-400 border-dashed !border-b-0 !border-t-0 bg-[center_top_calc(-78px)] bg-[url('/img/background_blur/Ellipse_388.webp')] ">
        <div className={`container pb-16`}>
          <div className="flex flex-col pb-20 gap-6 ">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <div className='text-signoz_sienna-100 text-[32px] leading-[3.25rem] font-medium'>The one-stop observability tool</div>
            </div>

            <div className="flex justify-center items-center">
              {icons.map((icon, index) => (
                <>
                  <div key={index} className={`text-center ${icon.label === 'Dashboards' ? 'homepage-dashboard-icon' : ''}`}>
                    <div className="p-2 sm:p-4 homepage-border rounded-full flex justify-center items-center w-fit m-auto">
                      <img src={icon.src} alt={`${icon.label} Icon`} className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <p className="text-signoz_sienna-300 mt-2 text-xs m-auto">{icon.label}</p>
                  </div>
                  {
                    index !== icons.length - 1 ?
                      <div className='homepage-separator' /> : null
                  }
                </>
              ))}
            </div>

          </div>


        </div>
      </section>
      <div className='!w-[80vw] !mx-auto grid grid-cols-1 sm:grid-cols-2 homepage-observability-container border border-signoz_slate-400 border-dashed !border-l-0 !border-t-0'>
        {sections.map((section, index) => (
          <Card
            iconTag={section.iconTag}
            text={section.text}
            // buttonText={section.buttonText}
            logo={section.logo}
            img={section.img}
          />
        ))}
      </div>
    </>
  );
}



