
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
      title: 'INGEST DATA',
      description: 'Ingest data from 50+ sources — send your data and start digging through.',
      buttonText: 'Explore',
      logo: '/img/index_features/bar-chart-2.svg',
      img: '/img/blog/2022/02/signal_09_cover.webp'
    },
    {
      title: 'APPLICATION PERFORMANCE MONITORING',
      description: 'Monitor & troubleshoot your application performance with APM.',
      buttonText: 'Explore',
      logo: '/img/index_features/bar-chart-2.svg',
      img: '/img/blog/2022/02/signal_09_cover.webp'
    },
    {
      title: 'DISTRIBUTED TRACING',
      description: 'Track user requests across services to identify bottlenecks.',
      buttonText: 'Learn more',
      logo: '/img/index_features/drafting-compass.svg',
      img: '/img/blog/2022/02/signal_09_cover.webp'
    },
    {
      title: 'LOG MANAGEMENT',
      description: 'Ingest, search, and analyze your logs at any scale.',
      buttonText: 'Learn more',
      logo: '/img/index_features/logs.svg',
      img: '/img/blog/2022/02/signal_09_cover.webp'
    },
    {
      title: 'EXCEPTIONS',
      description: 'Record exceptions automatically with stack trace & linked span data.',
      buttonText: 'Explore',
      logo: '/img/index_features/bug.svg',
      img: '/img/blog/2022/02/signal_09_cover.webp'
    },
    {
      title: 'METRICS & DASHBOARDS',
      description: 'Metrics monitoring with configurable dashboards to fit any use case.',
      buttonText: 'Explore',
      logo: '/img/index_features/layout-grid.svg',
      img: '/img/blog/2022/02/signal_09_cover.webp'
    },
    {
      title: 'ALERTS',
      description: 'Get actionable alerts in your preferred notification channel.',
      buttonText: 'Learn more',
      logo: '/img/index_features/concierge-bell.svg',
      img: '/img/blog/2022/02/signal_09_cover.webp'
    },
  ];



  return (
    <section>
      <div className={`container my-10 mb-16`}>
        <div className="mx-auto mb-5 flex max-w-4xl flex-col items-center text-center">
          <div className='text-signoz_sienna-100 text-[32px] leading-[3.25rem]'>The one-stop observability tool</div>
        </div>

        <div className="flex justify-center items-center gap-0 p-8">
          {icons.map((icon, index) => (
            <>
              <div key={index} className={`text-center ${icon.label === 'Dashboards' ? 'homepage-dashboard-icon' : ''}`}>
                <div className="p-4 homepage-border rounded-full flex justify-center items-center w-fit m-auto">
                  <img src={icon.src} alt={`${icon.label} Icon`} className="w-6 h-6" />
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


        <div className='grid grid-cols-2 p-4'>
          {sections.map((section, index) => (
            <Card
              title={section.title}
              description={section.description}
              buttonText={section.buttonText}
              logo={section.logo}
              img={section.img}
            />
          ))}
        </div>
      </div>
    </section>
  );
}



