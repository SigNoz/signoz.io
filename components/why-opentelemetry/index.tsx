import React from "react";
import styles from "./styles.module.css";
import Heading from "../../components/ui/Heading";
import SubHeading from "../../components/ui/SubHeading";
import Card from "../Card/card";
import { ArrowRightSolid } from "@/components/homepage-icons/icons"

export const WhyOpenTelemetry = () => {
  const REASONS = [
    {
      title: "No vendor lock-in",
      desc: "Using an open source standard frees you from vendor lock-in.",
      figure: "/img/landing/property-no-vendor-lock-in.webp",
      logo: '/img/index_features/layout-grid.svg',
    },
    {
      title: "Ease of use",
      desc: "Use auto-instrumentation libraries of OpenTelemetry to get started with little to no code change.",
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
    },
  ];

  return (
    <>
      <section>
        <div className="container py-16">
          <div className="flex flex-col items-center mb-5 text-center">
            <Heading type={4}>SigNoz is OpenTelemetry-Native</Heading>
            <Heading type={1}>But why OpenTelemetry</Heading>
            <SubHeading>
              OpenTelemetry is the second most active project in the CNCF,&nbsp;
              <br className="hidden lg:inline" />
              with only Kubernetes being more active.
            </SubHeading>
          </div>
          <div className='grid grid-cols-2 p-4'>
            {REASONS.map((section, index) => (
              <Card
                logo={section.logo}
                subTitle={section.title}
                description={section.desc}
              />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="container my-10 mb-16">
          <div className='container flex flex-col w-auto h-auto'>
            <div className="flex flex-row">
              <div>
                <p> SigNoz is built from the ground up for OpenTelemetry</p>
                <p>SigNoz offers the best in class support for OpenTelemetry’s semantic conventions with the best visualizations ⎯ powered by our powerful ingestion engine.</p>
                <ul>
                  <li className="flex flex-row">
                    <ArrowRightSolid /><span>OpenTelemetry-first docs</span>
                  </li>
                  <li className="flex flex-row">
                    <ArrowRightSolid /><span>Correlation of signals based on OpenTelemetry’s semantic conventions</span>
                  </li>
                  <li className="flex flex-row">
                    <ArrowRightSolid /><span>Exceptions based on OpenTelemetry’s Trace data</span>
                  </li>
                  <li className="flex flex-row">
                    <ArrowRightSolid /><span>Messaging queue monitoring based on OTel’s trace & metric’s data</span>
                  </li>
                  <li className="flex flex-row">
                    <ArrowRightSolid /><span>Deployment env and marker support powered by OpenTelemetry</span>
                  </li>
                  <li className="flex flex-row">
                    <ArrowRightSolid /><span>Configurable observability pipelines supported by Opamp</span>
                  </li>
                  <li className="flex flex-row">
                    <ArrowRightSolid /><span>Span-based events for richer context while debugging</span>
                  </li>
                </ul>
              </div>
              <div className="h-[352px] w-[449px] bg-signoz_ink-400">

              </div>
            </div>
            <div>
              <p>Comparing Datadog and New Relic's support for OpenTelemetry data</p>
              <p>Walk through how native OpenTelemetry tools compare to APM products that have adopted OpenTelemetry only partially.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
