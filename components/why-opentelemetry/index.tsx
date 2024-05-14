import React from "react";
import styles from "./styles.module.css";
import Heading from "../../components/ui/Heading";
import SubHeading from "../../components/ui/SubHeading";

export const WhyOpenTelemetry = () => {
  const REASONS = [
    {
      title: "No vendor lock-in",
      desc: "Using an open source standard frees you from vendor lock-in.",
      figure: "/img/landing/property-no-vendor-lock-in.webp",
    },
    {
      title: "Ease of use",
      desc: "Use auto-instrumentation libraries of OpenTelemetry to get started with little to no code change.",
      figure: "/img/landing/property-ease-of-use.webp",
    },
    {
      title: "Covers all use-cases",
      desc: "OpenTelemetry is a one-stop solution for all your telemetry needs.",
      figure: "/img/landing/property-covers-all-use-cases.webp",
    },
    {
      title: "Standardize Observability",
      desc: "A single standard for all telemetry signals means increased developer productivity, consistency across teams.",
      figure: "/img/landing/property-standardize-observability.webp",
    },
  ];

  return (
    <section>
      <div className="bg-[#252529]">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 max-w-xl lg:max-w-5xl mx-auto gap-y-10 gap-x-16">
            {REASONS.map((reason) => (
              <div
                key={reason.title}
                className="flex gap-5 items-center flex-row-reverse lg:flex-row lg:gap-10"
              >
                <img
                  className={`${styles.iconImage}`}
                  src={reason.figure}
                  alt={reason.title}
                />
                <div>
                  <Heading type={3}>{reason.title}</Heading>
                  <p className="leading-relaxed text-base mb-4 text-gray-400">
                    {reason.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
