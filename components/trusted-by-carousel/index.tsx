'use client'

import React from 'react'

const COMPANIES = [
  { image: '/img/users/netapp.svg', imageDesc: 'netapp logo' },
  { image: '/img/users/samsung.svg', imageDesc: 'samsung logo' },
  { image: '/img/users/comcast.svg', imageDesc: 'comcast logo' },
  { image: '/img/users/freo.svg', imageDesc: 'freo logo' },
  { image: '/img/users/hyperface.svg', imageDesc: 'hyperface logo' },
  { image: '/img/users/salesforce.svg', imageDesc: 'salesforce logo' },
  { image: '/img/users/rattle.svg', imageDesc: 'rattle logo' },
  { image: '/img/users/brainfish-icon.svg', imageDesc: 'brainfish logo' },
  { image: '/img/users/gokiwi.svg', imageDesc: 'GoKiwi logo' },
  { image: '/img/users/outplay.svg', imageDesc: 'outplay logo' },
  { image: '/img/users/tuneai.svg', imageDesc: 'tune logo' },
  { image: '/img/users/wombo.svg', imageDesc: 'wombo logo' },
]

export const TrustedByCarousel: React.FC = () => {
  // Duplicate the companies array to create seamless loop
  const duplicatedCompanies = [...COMPANIES, ...COMPANIES]

  return (
    <section className="!mx-auto !w-[100vw] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 py-8 md:!w-[80vw]">
      <div className="container mx-auto px-4 md:w-[60vw]">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase leading-5 tracking-[0.05em] text-signoz_vanilla-400">
            Trusted by fast-growing companies worldwide
          </p>
        </div>

        {/* Auto-scrolling carousel */}
        <div className="relative overflow-hidden">
          <div
            className="animate-scroll flex items-center gap-6 whitespace-nowrap"
            style={{
              animation: 'scroll 30s linear infinite',
            }}
          >
            {duplicatedCompanies.map((company, idx) => (
              <div
                key={`${idx}-${company.image}`}
                className="flex-shrink-0 opacity-30 transition-opacity duration-300 hover:opacity-60"
              >
                <img
                  className="h-4 w-auto grayscale transition-all duration-300 hover:grayscale-0 md:h-5"
                  src={company.image}
                  alt={company.imageDesc}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        /* Pause animation on hover */
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
