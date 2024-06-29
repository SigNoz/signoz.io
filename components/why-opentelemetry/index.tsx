import React from "react";
import styles from "./styles.module.css";
import Heading from "../../components/ui/Heading";
import SubHeading from "../../components/ui/SubHeading";
import Card from "../Card/card";
import { BookOpen, ArrowRight } from "lucide-react";
import { ArrowRightSolid } from "@/components/homepage-icons/icons"
import Link from "next/link";


export const WhyOpenTelemetry = () => {
  const REASONS = [
    {
      title: "No vendor lock-in",
      desc: "Get free of vendor-based agents inside your codebase.",
      figure: "/img/landing/property-no-vendor-lock-in.webp",
      logo: '/img/index_features/layout-grid.svg',
    },
    {
      title: "Futureproof",
      desc: "OpenTelemetry’s extensibility ensures support for any evolving technologies.",
      figure: "/img/landing/property-ease-of-use.webp",
      logo: '/img/index_features/layout-grid.svg',
    },
    {
      title: "Covers all use-cases",
      desc: "OpenTelemetry is a one-stop solution for all your telemetry needs.",
      figure: "/img/landing/property-covers-all-use-cases.webp",
      logo: '/img/index_features/layout-grid.svg',
    },
    {
      title: "Standardize Observability",
      desc: "A single standard for all telemetry signals means increased developer productivity, consistency across teams.",
      figure: "/img/landing/property-standardize-observability.webp",
      logo: '/img/index_features/layout-grid.svg',
    },
  ];

  return (
    <>
      <section className="!w-[80vw] !mx-auto border border-signoz_slate-400 border-dashed !border-t-0 !border-b-0">
        <div className="container bg-[center_top_calc(-600px)] bg-[url('/img/background_blur/Ellipse_207.png')]">
          <div className="flex flex-col items-center pb-5 text-center pt-28">
            <p className="text-signoz_vanilla-400 text-center text-sm font-medium tracking-[.05em] uppercase">SigNoz is OpenTelemetry-Native</p>
            <p className="text-signoz_sakura-100 text-[44px] font-semibold leading-[3.5rem]">But why OpenTelemetry?</p>
            <p className="text-signoz_vanilla-100 text-center text-base font-medium">
              OpenTelemetry is the second most active project in the CNCF, with only&nbsp;
              <br className="hidden lg:inline" />
              Kubernetes being more active.
            </p>
            <Link href="/">
              <button className="h-10 px-4 py-2 mt-3 mb-24 rounded-full text-sm flex items-center justify-center gap-1.5 bg-signoz_slate-400 font-medium leading-5 text-white border border-signoz_slate-200 shadow-[0_0_20px_0_rgba(242,71,105,0.20)]">
                <BookOpen size={14} />Learn why OpenTelemetry is the future<ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </section>
      <div className='!w-[80vw] !mx-auto grid grid-cols-2 border border-signoz_slate-400 border-dashed !border-t-0 !border-l-0 !border-b-0'>
        {REASONS.map((section, index) => (
          <Card
            logo={section.logo}
            subTitle={section.title}
            description={section.desc}
            logoSize={24}
          />
        ))}
      </div>
      <section className="!w-[80vw] !mx-auto border border-signoz_slate-400 border-dashed ">
        <div className="container mb-16">
          <div className='flex flex-col p-9 justify-between'>
            <div className="flex flex-row">
              <div>
                <p className="text-2xl font-semibold text-signoz_vanilla-100"> SigNoz is built from the ground up for OpenTelemetry</p>
                <p className="text-signoz_vanilla-400 text-base font-normal leading-9 my-3 w-[42rem]">SigNoz offers the best in class support for OpenTelemetry’s semantic conventions with the best visualizations ⎯ powered by our powerful ingestion engine.</p>
                <ul className="ul-no-padding">
                  <li className="flex flex-row items-center gap-3 mt-3">
                    <ArrowRightSolid /><span>OpenTelemetry-first docs</span>
                  </li>
                  <li className="flex flex-row items-center gap-3 mt-3">
                    <ArrowRightSolid /><span>Correlation of signals based on OpenTelemetry’s semantic conventions</span>
                  </li>
                  <li className="flex flex-row items-center gap-3 mt-3">
                    <ArrowRightSolid /><span>Exceptions based on OpenTelemetry’s Trace data</span>
                  </li>
                  <li className="flex flex-row items-center gap-3 mt-3">
                    <ArrowRightSolid /><span>Messaging queue monitoring based on OTel’s trace & metric’s data</span>
                  </li>
                  <li className="flex flex-row items-center gap-3 mt-3">
                    <ArrowRightSolid /><span>Deployment env and marker support powered by OpenTelemetry</span>
                  </li>
                  <li className="flex flex-row items-center gap-3 mt-3">
                    <ArrowRightSolid /><span>Configurable observability pipelines supported by Opamp</span>
                  </li>
                  <li className="flex flex-row items-center gap-3 mt-3">
                    <ArrowRightSolid /><span>Span-based events for richer context while debugging</span>
                  </li>
                </ul>
              </div>
              <div className="h-[352px] w-[449px] card-background"></div>
            </div>
            <div className="bg-signoz_ink-400 p-4 border border-signoz_slate-500 rounded">
              <p className="text-signoz_vanilla-100 text-base font-medium mb-2">Comparing Datadog and New Relic's support for OpenTelemetry data</p>
              <p className="text-signoz_vanilla-400 text-sm font-normal leading-9 m-0">Walk through how native OpenTelemetry tools compare to APM products that have adopted OpenTelemetry only partially.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="!w-[80vw] !mx-auto border border-signoz_slate-400 border-dashed w-full h-12 !border-t-0 !border-b-0" />
    </>
  );
};
