import React from 'react'
import styles from './styles.module.css'
import { ArrowRight } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'

export const CommunityEdition = () => {
  return (
    <section>
      <div className="section-container flex h-auto border !border-b-0 !border-r-0 border-dashed border-signoz_slate-400  px-4 py-10 md:px-10">
        <div className="flex w-full flex-col">
          <div>
            <p className="text-2xl font-semibold text-signoz_vanilla-100">
              {' '}
              Get started with Community Edition
            </p>
            <p className="text-base font-normal leading-9 text-signoz_vanilla-400">
              You always have the open source version of SigNoz to get started with your
              observability journey.
            </p>
          </div>
          <div className="h-[72px] md:h-[250px]">
            <TrackingLink 
              href="https://github.com/SigNoz/signoz" 
              clickType="External Click"
              clickName="GitHub Repository Link"
              clickText="SigNoz / signoz"
              clickLocation="Community Edition Section"
            >
              <div className="group flex items-center rounded border border-none bg-signoz_ink-400 p-4 text-white hover:bg-signoz_ink-300">
                <div className="mr-4">
                  <img src="/svgs/icons/signoz.svg" alt="SigNoz Icon" />
                </div>
                <div className="flex-grow">
                  <div className="text-sm font-medium text-signoz_vanilla-400 sm:text-base">
                    SigNoz / <span className="text-signoz_vanilla-100">signoz</span>
                  </div>
                  <div className="text-[10px] text-signoz_vanilla-400 sm:text-sm">
                    The open-source observability platform
                  </div>
                </div>
                <div className="ml-4 transform transition-transform group-hover:translate-x-1">
                  <ArrowRight size={16} />
                </div>
              </div>
            </TrackingLink>
          </div>
          <div className="mt-[18px] flex flex-row gap-3"></div>
        </div>
      </div>
    </section>
  )
}
