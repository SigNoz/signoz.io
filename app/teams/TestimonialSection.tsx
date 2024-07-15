import React from 'react'
import './styles.module.css'
import { Snowflake, ShieldCheck, Telescope, Globe } from 'lucide-react'

const TestimonialSection: React.FC = () => {
  return (
    <div className="signup-testimonial flex flex-col max-md:w-full lg:w-[30%] xl:w-[40%]">
      <div className="signup-testimonial-bg" />
      <div className="z-10 my-auto flex flex-col items-start self-stretch p-16 px-12 py-32 text-xl text-stone-300 max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex flex-col justify-center gap-y-4">
              <div className="w-full rounded border border-signoz_slate-500 bg-signoz_ink-400 p-4">
                <div className='flex gap-2'>
                  <div className='py-1'>
                    <Snowflake size={16} color='#fff' />
                  </div>
                  <div className='flex flex-col'>

                    <p className="mb-2 text-base font-medium text-signoz_vanilla-100">
                      Three signals in single pane
                    </p>
                    <p className="m-0 text-sm font-normal leading-9 text-signoz_vanilla-400">
                      Get logs, metrics, and traces under a single pane of glass. No need for disparate tooling with too much operational overhead.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full rounded border border-signoz_slate-500 bg-signoz_ink-400 p-4">
                <div className='flex gap-2'>
                  <div className='py-1'>
                    <ShieldCheck size={16} color="#fff" />
                  </div>
                  <div className='flex flex-col'>

                    <p className="mb-2 text-base font-medium text-signoz_vanilla-100">
                      Trusted by industry leaders
                    </p>
                    <p className="m-0 text-sm font-normal leading-9 text-signoz_vanilla-400">
                      Teams at NetApp, ClearTax and other industry leaders have trusted SigNoz to run their observability stack.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full rounded border border-signoz_slate-500 bg-signoz_ink-400 p-4">
                <div className='flex gap-2'>
                  <div className='py-1'>
                    <Telescope size={16} color="#fff" />
                  </div>
                  <div className='flex flex-col'>

                    <p className="mb-2 text-base font-medium text-signoz_vanilla-100">
                      OpenTelemetry-native
                    </p>
                    <p className="m-0 text-sm font-normal leading-9 text-signoz_vanilla-400">
                      Future-proof your observability with OpenTelemetry. Second most active CNCF project after Kubernetes, OpenTelemetry is the future of cloud-native application monitoring.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full rounded border border-signoz_slate-500 bg-signoz_ink-400 p-4">
                <div className='flex gap-2'>
                  <div className='py-1'>
                    <Globe size={16} color="#fff" />
                  </div>
                  <div className='flex flex-col'>

                    <p className="mb-2 text-base font-medium text-signoz_vanilla-100">
                      Data Residency
                    </p>
                    <p className="m-0 text-sm font-normal leading-9 text-signoz_vanilla-400">
                      Worried about data privacy and regulation laws? We have data centers in EU, US and India region to help you comply with data privacy regulation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialSection
