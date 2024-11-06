'use client'

import * as React from 'react'
import Button from '@/components/Button/Button'
import Link from 'next/link'
import { ArrowRight, BookOpen, Calendar, Handshake, MapPin, Megaphone } from 'lucide-react'


const MainSection: React.FC = () => {


  return (
    <>
      <section className="flex w-full flex-col items-start px-20 pt-12 font-medium max-md:max-w-full max-md:px-5">
        <div className="container !mt-[-40px] mb-0 ml-5 flex max-h-full max-w-full flex-col border-l border-r border-dashed border-signoz_slate-100 !px-0">
          <div className="flex w-full flex-col max-md:max-w-full">
            <div className="mt-10 flex max-w-full flex-col">
              <div className="flex flex-col justify-between gap-6 sm:flex-row">
                <div className="max-w-full px-6 font-mono text-xl text-signoz_vanilla-400 max-md:max-w-full">
                  {`// 12 Nov ⎯ 15 Nov`}
                </div>
              </div>
              <div className="mt-8 max-w-full border-b border-dashed border-signoz_slate-100 px-6 text-5xl font-medium uppercase text-signoz_vanilla-100 max-md:max-w-full max-md:text-4xl">
                kubecon north <br /> america <span className="text-signoz_cherry-500">2024</span>
              </div>
            </div>
            <div className="z-10 mt-11 self-stretch border-b border-dashed border-signoz_slate-100 px-6 font-mono text-base font-medium leading-8 text-signoz_vanilla-400 max-md:mt-10 max-md:max-w-full">
              7 talks from SigNoz Team have been selected for Kubecon North America.
              <br className="hidden sm:block" /> Join us for our talks or in after-parties. We would love to meet you.
            </div>
          </div>

          <div className="z-[1] my-6 ml-5 flex min-h-[40px] w-fit items-center justify-center gap-1.5 overflow-hidden rounded-sm bg-white px-4 py-2 text-sm leading-none text-signoz_ink-500">
            <Link href="https://lu.ma/8uws6qyr" target="_blank" id="launch-page-subscribe">
              <div className="flex items-center gap-1.5">
                <Handshake size={14} />
                <span className="px-2 py-1 text-sm font-medium leading-none text-neutral-950">
                  Meet SigNoz Team
                </span>
              </div>
            </Link>
          </div>

          <div className="mt-8 mb-16 max-w-full px-6 text-5xl font-medium uppercase text-signoz_vanilla-100 max-md:max-w-full max-md:text-4xl">
            talks from <span className="text-signoz_cherry-500"> Signoz team</span>
          </div>


          <div className="flex flex-col-reverse justify-between border-b  border-dashed border-signoz_slate-100 px-6 py-6 sm:flex-row">
            <div className="flex flex-col justify-between gap-4 mt-6 sm:pr-4 sm:mt-0">
              <div className='flex gap-1.5'>
                <Calendar size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400 max-w-[217px]">Tuesday
                  Nov 12, 2024 <br />
                  2:05pm - 2:30pm MST</div>
              </div>
              <div className='flex gap-1.5'>
                <MapPin size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400">Hyatt Regency, Level 2 <br /> 255 BC</div>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="https://sched.co/1izsX"
                  target="_blank"
                  id="btn-register-event"
                  className="button-background flex sm:max-w-fit w-full items-center justify-center gap-2 rounded-full px-3 py-2 mb-6 sm:mb-0"
                >
                  <Megaphone size={16} />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    Register to attend
                  </span>
                </Link>
              </div>
            </div>
            <Link
              href="https://sched.co/1izsX"
              target='_blank'
              className="launch-week-card-background flex w-[864px] max-w-full cursor-pointer flex-col gap-6 rounded-md border border-signoz_slate-500 px-5 py-4 transition-colors duration-300 hover:bg-[#121317] sm:flex-row"
            >
              <img
                src="/img/events/kubecon/KubeConNA24_CoLoSnackables-ObservabilityDay.webp"
                className=" mb-4  h-auto sm:h-56 w-auto pr-2 sm:mb-0   sm:pr-0"
              />
              <div className="group flex flex-col justify-between">
                <div>
                  <div className="font-medium mb-2 text-base">Enhancing Asynchronous Communication Observability with OpenTelemetry</div>
                  <div className="text-sm italic font-bold py-2.5">
                    Speakers
                  </div>
                  <div className='flex flex-col gap-5'>
                    <div className='flex flex-row gap-3 items-center'>
                      <img src='/img/speakers/Liudmila.jpg' className='rounded-full h-10 w-10'></img>
                      <div className='flex flex-col'>
                        <div className='text-sm font-bold'>Liudmila Molkova</div>
                        <div className='text-xs'>Principal Software Engineer <br /> Microsoft</div>
                      </div>
                    </div>

                    <div className='flex flex-row gap-3 items-center'>
                      <img src='/img/speakers/Shivanshu.jpg' className='rounded-full h-10 w-10'></img>
                      <div className='flex flex-col'>
                        <div className='text-sm font-bold'>Shivansu Raj Shrivastava</div>
                        <div className='text-xs'>Founding Engineer <br /> SigNoz </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="flex justify-end">
                  <div className="button-background mt-2 flex h-fit w-fit transform items-center justify-center rounded-full p-2 transition-transform group-hover:translate-x-2.5 sm:mt-0">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>



          <div className="flex flex-col-reverse justify-between border-b  border-dashed border-signoz_slate-100 px-6 py-6 sm:flex-row">
            <div className="flex flex-col justify-between gap-4 mt-6 sm:pr-4 sm:mt-0">
              <div className='flex gap-1.5'>
                <Calendar size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400 max-w-[217px]">Tuesday
                  Nov 12, 2024 <br />
                  3:20pm - 3:45pm MST</div>
              </div>
              <div className='flex gap-1.5'>
                <MapPin size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400">Salt Palace, Level 2 <br />250 A</div>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="https://sched.co/1iztV"
                  target="_blank"
                  id="btn-register-event"
                  className="button-background flex sm:max-w-fit w-full items-center justify-center gap-2 rounded-full px-3 py-2 mb-6 sm:mb-0"
                >
                  <Megaphone size={16} />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    Register to attend
                  </span>
                </Link>
              </div>
            </div>
            <Link
              href="https://sched.co/1iztV"
              target='_blank'
              className="launch-week-card-background flex w-[864px] max-w-full cursor-pointer flex-col gap-6 rounded-md border border-signoz_slate-500 px-5 py-4 transition-colors duration-300 hover:bg-[#121317] sm:flex-row"
            >
              <img
                src="/img/events/kubecon/KubeConNA24_CoLoSnackables-KubernetesonEdgeDay.webp"
                className=" mb-4  h-auto sm:h-56 w-auto pr-2 sm:mb-0   sm:pr-0"
              />
              <div className="group flex flex-col justify-between">
                <div>
                  <div className="font-medium mb-2 text-base">Decentralized Federated Machine Learning &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>
                  <div className="text-sm italic font-bold py-2.5">
                    Speakers
                  </div>

                  <div className='flex flex-col gap-5'>
                    <div className='flex flex-row gap-3 items-center'>
                      <img src='/img/speakers/Haardik.jpg' className='rounded-full h-10 w-10'></img>
                      <div className='flex flex-col'>
                        <div className='text-sm font-bold'>Haardik Dharma</div>
                        <div className='text-xs'>Developer <br /> Civo</div>
                      </div>
                    </div>

                    <div className='flex flex-row gap-3 items-center'>
                      <img src='/img/speakers/Ekansh.jpg' className='rounded-full h-10 w-10'></img>
                      <div className='flex flex-col'>
                        <div className='text-sm font-bold'>Ekansh Gupta</div>
                        <div className='text-xs'>SDE <br /> SigNoz </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="flex justify-end">
                  <div className="button-background mt-2 flex h-fit w-fit transform items-center justify-center rounded-full p-2 transition-transform group-hover:translate-x-2.5 sm:mt-0">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex flex-col-reverse justify-between border-b  border-dashed border-signoz_slate-100 px-6 py-6 sm:flex-row">
            <div className="flex flex-col justify-between gap-4 mt-6 sm:pr-4 sm:mt-0">
              <div className='flex gap-1.5'>
                <Calendar size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400 max-w-[217px]">Tuesday
                  Nov 12, 2024 <br />
                  5:00pm - 5:10pm MST</div>
              </div>
              <div className='flex gap-1.5'>
                <MapPin size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400">Salt Palace, Level 2 <br />255 E</div>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="https://sched.co/1izub"
                  target="_blank"
                  id="btn-register-event"
                  className="button-background flex sm:max-w-fit w-full items-center justify-center gap-2 rounded-full px-3 py-2 mb-6 sm:mb-0"
                >
                  <Megaphone size={16} />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    Register to attend
                  </span>
                </Link>
              </div>
            </div>
            <Link
              href="https://sched.co/1izub"
              target='_blank'
              className="launch-week-card-background flex w-[864px] max-w-full cursor-pointer flex-col gap-6 rounded-md border border-signoz_slate-500 px-5 py-4 transition-colors duration-300 hover:bg-[#121317] sm:flex-row"
            >
              <img
                src="/img/events/kubecon/KubeConNA24_CoLoSnackables-ObservabilityDay.webp"
                className=" mb-4  h-auto sm:h-56 w-auto pr-2 sm:mb-0 sm:pr-0"
              />
              <div className="group flex flex-col justify-between">
                <div>
                  <div className="font-medium mb-2 text-base">Is OpenTelemetry too complicated to get started &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>
                  <div className="text-sm italic font-bold py-2.5">
                    Speakers
                  </div>

                  <div className='flex flex-col gap-5'>
                    <div className='flex flex-row gap-3 items-center'>
                      <img src='/img/speakers/Pranay.jpg' className='rounded-full h-10 w-10'></img>
                      <div className='flex flex-col'>
                        <div className='text-sm font-bold'>Pranay Prateek</div>
                        <div className='text-xs'>Maintainer <br /> SigNoz</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="button-background mt-2 flex h-fit w-fit transform items-center justify-center rounded-full p-2 transition-transform group-hover:translate-x-2.5 sm:mt-0">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex flex-col-reverse justify-between border-b  border-dashed border-signoz_slate-100 px-6 py-6 sm:flex-row">
            <div className="flex flex-col justify-between gap-4 mt-6 sm:pr-4 sm:mt-0">
              <div className='flex gap-1.5'>
                <Calendar size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400 max-w-[217px]">Tuesday
                  Nov 12, 2024 <br />
                  5:15pm - 5:25pm MST</div>
              </div>
              <div className='flex gap-1.5'>
                <MapPin size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400">Salt Palace, Level 2 <br />254 B</div>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="https://sched.co/1izuq"
                  target="_blank"
                  id="btn-register-event"
                  className="button-background flex sm:max-w-fit w-full items-center justify-center gap-2 rounded-full px-3 py-2 mb-6 sm:mb-0"
                >
                  <Megaphone size={16} />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    Register to attend
                  </span>
                </Link>
              </div>
            </div>
            <Link
              href="https://sched.co/1izuq"
              target='_blank'
              className="launch-week-card-background flex w-[864px] max-w-full cursor-pointer flex-col gap-6 rounded-md border border-signoz_slate-500 px-5 py-4 transition-colors duration-300 hover:bg-[#121317] sm:flex-row"
            >
              <img
                src="/img/events/kubecon/KubeConNA24_CoLoSnackables-ArgoCon.webp"
                className=" mb-4  h-auto sm:h-56 w-auto pr-2 sm:mb-0   sm:pr-0"
              />
              <div className="group flex flex-col justify-between">
                <div>
                  <div className="font-medium mb-2 text-base">Orchestrating Scalable DAGs on Argo Workflows Using Fabric8s</div>
                  <div className="text-sm italic font-bold py-2.5">
                    Speakers
                  </div>

                  <div className='flex flex-col gap-5'>
                    <div className='flex flex-row gap-3 items-center'>
                      <img src='/img/speakers/Shivay.jpg' className='rounded-full h-10 w-10'></img>
                      <div className='flex flex-col'>
                        <div className='text-sm font-bold'>Shivay Lamba</div>
                        <div className='text-xs'>Developer Relations Engineer <br /> Couchbase</div>
                      </div>
                    </div>

                    <div className='flex flex-row gap-3 items-center'>
                      <img src='/img/speakers/Ekansh.jpg' className='rounded-full h-10 w-10'></img>
                      <div className='flex flex-col'>
                        <div className='text-sm font-bold'>Ekansh Gupta</div>
                        <div className='text-xs'>SDE <br /> SigNoz </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="button-background mt-2 flex h-fit w-fit transform items-center justify-center rounded-full p-2 transition-transform group-hover:translate-x-2.5 sm:mt-0">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex flex-col-reverse justify-between border-b  border-dashed border-signoz_slate-100 px-6 py-6 sm:flex-row">
            <div className="flex flex-col justify-between gap-4 mt-6 sm:pr-4 sm:mt-0">
              <div className='flex gap-1.5'>
                <Calendar size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400 max-w-[217px]">Tuesday
                  Nov 12, 2024 <br />
                  10:41am - 10:46am MST</div>
              </div>
              <div className='flex gap-1.5'>
                <MapPin size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400">Hyatt Regency, Level 4 <br /> Regency Ballroom BCD</div>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="https://sched.co/1iW8k"
                  target="_blank"
                  id="btn-register-event"
                  className="button-background flex sm:max-w-fit w-full items-center justify-center gap-2 rounded-full px-3 py-2 mb-6 sm:mb-0"
                >
                  <Megaphone size={16} />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    Register to attend
                  </span>
                </Link>
              </div>
            </div>
            <Link
              href="https://sched.co/1iW8k"
              target='_blank'
              className="launch-week-card-background flex w-[864px] max-w-full cursor-pointer flex-col gap-6 rounded-md border border-signoz_slate-500 px-5 py-4 transition-colors duration-300 hover:bg-[#121317] sm:flex-row"
            >
              <img
                src="/img/events/kubecon/kubecon-na.webp"
                className=" mb-4  h-auto sm:h-56 w-auto pr-2 sm:mb-0 sm:pr-0"
              />
              <div className="group flex flex-col justify-between">
                <div>
                  <div className="font-medium mb-2 text-base">OpenTelemetry: The Future of Network Monitoring, eBPF for Low-Level Insights | Project Lightning Talk</div>
                </div>
                <div className="flex justify-end">
                  <div className="button-background mt-2 flex h-fit w-fit transform items-center justify-center rounded-full p-2 transition-transform group-hover:translate-x-2.5 sm:mt-0">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>


          <div className="flex flex-col-reverse justify-between border-b  border-dashed border-signoz_slate-100 px-6 py-6 sm:flex-row">
            <div className="flex flex-col justify-between gap-4 mt-6 sm:pr-4 sm:mt-0">
              <div className='flex gap-1.5'>
                <Calendar size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400 max-w-[217px]">Wednesday
                  Nov 13, 2024 <br />
                  3:25pm - 4:00pm MST</div>
              </div>
              <div className='flex gap-1.5'>
                <MapPin size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400">Salt Palace, Level 1 <br /> Grand Ballroom HJ</div>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="https://sched.co/1i7li"
                  target="_blank"
                  id="btn-register-event"
                  className="button-background flex sm:max-w-fit w-full items-center justify-center gap-2 rounded-full px-3 py-2 mb-6 sm:mb-0"
                >
                  <Megaphone size={16} />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    Register to attend
                  </span>
                </Link>
              </div>
            </div>
            <Link
              href="https://sched.co/1i7li"
              target='_blank'
              className="launch-week-card-background flex w-[864px] max-w-full cursor-pointer flex-col gap-6 rounded-md border border-signoz_slate-500 px-5 py-4 transition-colors duration-300 hover:bg-[#121317] sm:flex-row"
            >
              <img
                src="/img/events/kubecon/kubecon-na.webp"
                className=" mb-4  h-auto sm:h-56 w-auto pr-2 sm:mb-0   sm:pr-0"
              />
              <div className="group flex flex-col justify-between">
                <div>
                  <div className="font-medium mb-2 text-base">Using OpenTelemetry for Deep Observability Within Messaging Queues</div>
                  <div className="text-sm italic font-bold py-2.5">
                    Speakers
                  </div>

                  <div className='flex flex-col gap-5'>
                    <div className='flex flex-row gap-3 items-center'>
                      <img src='/img/speakers/Ekansh.jpg' className='rounded-full h-10 w-10'></img>
                      <div className='flex flex-col'>
                        <div className='text-sm font-bold'>Ekansh Gupta</div>
                        <div className='text-xs'>SDE<br /> SigNoz</div>
                      </div>
                    </div>

                    <div className='flex flex-row gap-3 items-center'>
                      <img src='/img/speakers/Shivanshu.jpg' className='rounded-full h-10 w-10'></img>
                      <div className='flex flex-col'>
                        <div className='text-sm font-bold'>Shivansu Raj Shrivastava</div>
                        <div className='text-xs'>Founding Engineer <br /> SigNoz </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="flex justify-end">
                  <div className="button-background mt-2 flex h-fit w-fit transform items-center justify-center rounded-full p-2 transition-transform group-hover:translate-x-2.5 sm:mt-0">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex flex-col-reverse justify-between border-b  border-dashed border-signoz_slate-100 px-6 py-6 sm:flex-row">
            <div className="flex flex-col justify-between gap-4 mt-6 sm:pr-4 sm:mt-0">
              <div className='flex gap-1.5'>
                <Calendar size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400 max-w-[217px]">Wednesday
                  Nov 13, 2024 <br />
                  4:30pm - 5:05pm MST</div>
              </div>
              <div className='flex gap-1.5'>
                <MapPin size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400">Hyatt Regency, Level 4 <br />Regency Ballroom A</div>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="https://sched.co/1how7"
                  target="_blank"
                  id="btn-register-event"
                  className="button-background flex sm:max-w-fit w-full items-center justify-center gap-2 rounded-full px-3 py-2 mb-6 sm:mb-0"
                >
                  <Megaphone size={16} />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    Register to attend
                  </span>
                </Link>
              </div>
            </div>
            <Link
              href="https://sched.co/1how7"
              target='_blank'
              className="launch-week-card-background flex w-[864px] max-w-full cursor-pointer flex-col gap-6 rounded-md border border-signoz_slate-500 px-5 py-4 transition-colors duration-300 hover:bg-[#121317] sm:flex-row"
            >
              <img
                src="/img/events/kubecon/kubecon-na.webp"
                className=" mb-4  h-auto sm:h-56 w-auto pr-2 sm:mb-0   sm:pr-0"
              />
              <div className="group flex flex-col justify-between">
                <div>
                  <div className="font-medium mb-2 text-base">Understanding How OpenTelemetry Network Uses eBPF for Network Observability</div>
                  <div className="text-sm italic font-bold py-2.5">
                    Speakers
                  </div>

                  <div className='flex flex-col gap-5'>
                    <div className='flex flex-row gap-3 items-center'>
                      <img src='/img/speakers/Jonathan.jpg' className='rounded-full h-10 w-10'></img>
                      <div className='flex flex-col'>
                        <div className='text-sm font-bold'>Jonathan Perry</div>
                        <div className='text-xs'>Founder & CEO <br /> PerfPod</div>
                      </div>
                    </div>

                    <div className='flex flex-row gap-3 items-center'>
                      <img src='/img/speakers/Shivanshu.jpg' className='rounded-full h-10 w-10'></img>
                      <div className='flex flex-col'>
                        <div className='text-sm font-bold'>Shivansu Raj Shrivastava</div>
                        <div className='text-xs'>Founding Engineer <br /> SigNoz </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="button-background mt-2 flex h-fit w-fit transform items-center justify-center rounded-full p-2 transition-transform group-hover:translate-x-2.5 sm:mt-0">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>


          <div className="flex flex-col-reverse justify-between border-b  border-dashed border-signoz_slate-100 px-6 py-6 sm:flex-row">
            <div className="flex flex-col justify-between gap-4 mt-6 sm:pr-4 sm:mt-0">
              <div className='flex gap-1.5'>
                <Calendar size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400 max-w-[217px]">Tuesday
                  Nov 12, 2024 <br />
                  4:30pm - 7:30pm MST</div>
              </div>
              <div className='flex gap-1.5'>
                <MapPin size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400">Studio at Soundwell<br />149 W 200 S, Salt Lake City</div>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="https://lu.ma/8uws6qyr"
                  target="_blank"
                  id="btn-register-event"
                  className="button-background flex sm:max-w-fit w-full items-center justify-center gap-2 rounded-full px-3 py-2 mb-6 sm:mb-0"
                >
                  <Megaphone size={16} />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    Register to attend
                  </span>
                </Link>
              </div>
            </div>
            <Link
              href="https://lu.ma/8uws6qyr"
              target='_blank'
              className="launch-week-card-background flex w-[864px] max-w-full cursor-pointer flex-col gap-6 rounded-md border border-signoz_slate-500 px-5 py-4 transition-colors duration-300 hover:bg-[#121317] sm:flex-row"
            >
              <img
                src="/img/events/kubecon/happy-hrs-kubecon.webp"
                className=" mb-4  h-auto sm:h-56 w-auto pr-2 sm:mb-0   sm:pr-0"
              />


              <div className="group flex flex-col justify-between">
                <div>
                  <div className="font-medium mb-2 text-base">SigNoz + GrowthBook Happy Hour @ KubeCon NA 2024</div>
                  <div className="text-sm italic font-bold py-2.5">
                    Host
                  </div>


    

                  <div className='flex flex-col gap-5'>
                    <div className='flex flex-row gap-3 items-center'>
                      <div className='flex flex-col'>
                        <div className='text-sm font-bold'>SigNoz & Growthbook</div>
                      </div>
                    </div>
                    </div>

                </div>
                <div className="flex justify-end">
                  <div className="button-background mt-2 flex h-fit w-fit transform items-center justify-center rounded-full p-2 transition-transform group-hover:translate-x-2.5 sm:mt-0">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>



          <div className="flex flex-col-reverse justify-between border-b  border-dashed border-signoz_slate-100 px-6 py-6 sm:flex-row">
            <div className="flex flex-col justify-between gap-4 mt-6 sm:pr-4 sm:mt-0">
              <div className='flex gap-1.5'>
                <Calendar size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400 max-w-[217px]">Thursday
                  Nov 14, 2024 <br />
                  7:00am - 8:30am MST</div>
              </div>
              <div className='flex gap-1.5'>
                <MapPin size={16} className='min-w-4 mt-1' color='#C0C1C3' />
                <div className="text-base uppercase text-signoz_vanilla-400">Salt Palace Convention Center<br />100 S W Temple St</div>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="https://lu.ma/ngeo54fh"
                  target="_blank"
                  id="btn-register-event"
                  className="button-background flex sm:max-w-fit w-full items-center justify-center gap-2 rounded-full px-3 py-2 mb-6 sm:mb-0"
                >
                  <Megaphone size={16} />
                  <span className="whitespace-nowrap text-sm font-medium text-[#F7F7F8]">
                    Register to attend
                  </span>
                </Link>
              </div>
            </div>
            <Link
              href="https://lu.ma/ngeo54fh"
              target='_blank'
              className="launch-week-card-background flex w-[864px] max-w-full cursor-pointer flex-col gap-6 rounded-md border border-signoz_slate-500 px-5 py-4 transition-colors duration-300 hover:bg-[#121317] sm:flex-row"
            >
              <img
                src="/img/events/kubecon/run-event-cover.webp"
                className=" mb-4  h-auto sm:h-56 w-auto pr-2 sm:mb-0   sm:pr-0"
              />


              <div className="group flex flex-col justify-between">
                <div>
                  <div className="font-medium mb-2 text-base">Run Away from Alerts, Into Observability!</div>
                  <div className="text-sm italic font-bold py-2.5">
                    Host
                  </div>


    

                  <div className='flex flex-col gap-5'>
                    <div className='flex flex-row gap-3 items-center'>
                      <img src='/img/speakers/Pranay.jpg' className='rounded-full h-10 w-10'></img>
                      <div className='flex flex-col'>
                        <div className='text-sm font-bold'>Pranay Prateek</div>
                        <div className='text-xs'> CEO & Co-Founder <br /> SigNoz</div>
                      </div>
                    </div>
                    </div>

                </div>
                <div className="flex justify-end">
                  <div className="button-background mt-2 flex h-fit w-fit transform items-center justify-center rounded-full p-2 transition-transform group-hover:translate-x-2.5 sm:mt-0">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>


        </div>
      </section>
      <GetStarted page="launch-week" />
    </>
  )
}

export default MainSection


const GetStarted = ({ page }) => {
  const getStartedId = `btn-get-started-${page}-bottom`
  const readDocumentationId = `btn-read-documentation-${page}-bottom`

  return (
    <div className="flex flex-col gap-16 px-20 font-medium max-md:max-w-full max-md:px-5 ">
      <div className="bg-[url('/img/background_blur/Frame_2185.png')] bg-[length:45%] bg-[center_top_-12rem] sm:bg-no-repeat">
        <section className="container flex max-h-full max-w-full flex-col border-l border-r border-dashed border-signoz_slate-100 !px-0">
          <div className="bg-[url('/img/background_blur/Ellipse_206.png')] bg-[length:110%] bg-[center_top_calc(-250px)] bg-no-repeat">
            <div className="flex flex-col gap-12">
              <p className="mb-0 mt-20 text-center text-3xl sm:text-4xl font-bold">
                OpenTelemetry-Native Logs,
                <br /> Metrics and Traces in a single pane
              </p>
              <div className="mb-10 flex items-center justify-center gap-3 pt-4 max-sm:flex-col">
                <Button id={getStartedId}>
                  <Link href="/teams/" className="flex-center">
                    Get Started - Free
                    <ArrowRight size={14} />
                  </Link>
                </Button>

                <Button type={Button.TYPES.SECONDARY} id={readDocumentationId}>
                  <Link href="/docs/introduction/" className="flex-center">
                    <BookOpen size={14} />
                    Read Documentation
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <img
                src="/img/landing/landing_thumbnail.webp"
                alt="Custom Thumbnail"
                className="z-[0] -mb-36 w-3/5 rounded-lg max-sm:-mb-8"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
