import React, { useState } from "react";
import Heading from "../../components/ui/Heading";
import SubHeading from "../../components/ui/SubHeading";

export const SigNozFeatures = () => {
  const [tab, setTab] = useState("apm");

  const featureChangeHandler = (value: string) => {
    if (value === tab) {
      setTab("");
    } else {
      setTab(value);
    }
    // document
    //   .getElementById(`accordion-${value}`)
    //   .scrollIntoView({ behavior: "smooth" });
  };

  const FEATURES_LIST = [
    {
      label: "APM",
      value: "apm",
      figure: "/img/landing/feature-apm-min.webp",
      icon: "/img/landing/icon-placeholder.webp",
      content: (
        <>
          <ul>
            <li className="mb-2 text-lg">
              Out-of-box charts for application metrics like p90, p99 latency,
              error rates, request rates, etc.
            </li>
            <li className="mb-2 text-lg">
              Monitor RED metrics for key operations in any service
            </li>
            <li className="mb-2 text-lg">
              Monitor database and external calls made by any service
            </li>
            <li className="mb-2 text-lg">
              Service maps to show application topology
            </li>
          </ul>
        </>
      ),
    },
    {
      label: "Distributed Tracing",
      value: "traces",
      figure: "/img/landing/feature-distributed-tracing-min.webp",
      icon: "/img/landing/icon-placeholder.webp",
      content: (
        <>
          <ul>
            <li className="mb-2 text-lg">
              Get end-to-end visibility of your services with rich contextual
              tags and attributes.
            </li>
            <li className="mb-2 text-lg">
              Run aggregates on trace data like sum, avg, p99 latency, etc.
            </li>
            <li className="mb-2 text-lg">
              Group your trace data by different attributes like HTTP URL,
              service names, etc. to find granular issues
            </li>
            <li className="mb-2 text-lg">
              Flamegraphs and Gantt charts to visualize the flow of requests
              easily.
            </li>
          </ul>
        </>
      ),
    },
    {
      label: "Metrics & Dashboards ",
      value: "metrics",
      figure: "/img/landing/feature-metrics-dashboards-min.webp",
      icon: "/img/landing/icon-placeholder.webp",
      content: (
        <>
          <ul>
            <li className="mb-2 text-lg">
              Monitor any metrics important to you.
            </li>
            <li className="mb-2 text-lg">
              Support for OpenTelemetry metrics SDK or enable a Prometheus
              receiver to receive any metrics exposed in a running Prometheus
              instance.
            </li>
            <li className="mb-2 text-lg">
              Create dashboards around any use case like external calls, API
              endpoints, JVM metrics - there is no limit.
            </li>
          </ul>
        </>
      ),
    },
    // {
    //   label: "Infrastructure Monitoring",
    //   value: "infra",
    //   figure: "img/website/infrastructure.webp",
    //   icon: "/img/landing/icon-placeholder.webp",
    //   content: (
    //     <>
    //       <ul>
    //         <li className="mb-2 text-lg">
    //           End-to-End visibility into infrastructure performance
    //         </li>
    //         <li className="mb-2 text-lg">
    //           Ingest metrics from all kinds of host environments
    //         </li>
    //         <li className="mb-2 text-lg">
    //           Correlate infrastructure and application metrics for contextual
    //           insights
    //         </li>
    //         <li className="mb-2 text-lg">
    //           Build customized dashboards with powerful query builder
    //         </li>
    //       </ul>
    //     </>
    //   ),
    // },
    {
      label: "Logs Management ",
      value: "logs",
      figure: "/img/landing/feature-log-management-min.webp",
      icon: "/img/landing/icon-placeholder.webp",
      content: (
        <>
          <ul>
            <li className="mb-2 text-lg">
              Ingest, process, and analyze logs at any scale.
            </li>
            <li className="mb-2 text-lg">
              Support for OpenTelemetry logs or any existing logging pipeline
              that you have.
            </li>
            <li className="mb-2 text-lg">
              Live tail, easy search, and a powerful logs query builder to give
              you full control
            </li>
            <li className="mb-2 text-lg">
              Use a columnar database to store logs which enables lightning
              fast log analytics.
              <br />
              <a
                target="_blank"
                href="https://signoz.io/blog/logs-performance-benchmark/"
              >
                (Logs performance benchmark)
              </a>
            </li>
          </ul>
        </>
      ),
    },
    {
      label: "Exceptions Monitoring",
      value: "exceptions",
      figure: "/img/landing/feature-exceptions-monitoring-min.webp",
      icon: "/img/landing/icon-placeholder.webp",
      content: (
        <>
          <ul>
            <li className="mb-2 text-lg">
              Record exceptions automatically in Python, Java, Ruby, and
              Javascript
            </li>
            <li className="mb-2 text-lg">
              Rich contextual data with stack trace, exceptions attributes and
              linked span data
            </li>
            <li className="mb-2 text-lg">
              Exceptions grouping and custom exceptions
            </li>
            <li className="mb-2 text-lg">
              Navigate from Exceptions to related traces to see the error in
              trace graph
            </li>
          </ul>
        </>
      ),
    },
    {
      label: "Alerts ",
      value: "alerts",
      figure: "/img/landing/feature-alerts-min.webp",
      icon: "/img/landing/icon-placeholder.webp",
      content: (
        <>
          <ul>
            <li className="mb-2 text-lg">
              Easy to set alerts with DIY query builder
            </li>
            <li className="mb-2 text-lg">
              Support for PromQL for users familiar with Prometheus alert
              manager
            </li>
            <li className="mb-2 text-lg">
              Support for multiple notification channels like Slack and
              PagerDuty
            </li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <section>
      <div className={`container my-10 mb-16`}>
        <div className="flex flex-col items-center mb-5 text-center mx-auto max-w-4xl">
          <Heading type={4}>EXPLORE SIGNOZ</Heading>
          <Heading type={1}>One Stop Observability</Heading>
          <SubHeading>
            You don’t need to manage multiple tools for traces, metrics, and
            logs. Get great out-of-the-box charts and a powerful query builder
            to dig deeper into your data.
          </SubHeading>
        </div>

        <div className="max-w-7xl mx-auto hidden lg:block">
          <div className={`grid grid-cols-6 feature-tabs mb-5`}>
            {FEATURES_LIST.map((feature, idx) => (
              <div
                key={feature.value}
                onClick={() => setTab(feature.value)}
                className={`cursor-pointer pt-5 rounded-t-lg flex flex-col gap-2 justify-center items-center text-center ${
                  tab === feature.value ? "active" : ""
                }`}
              >
                <img
                  src={feature.icon}
                  alt={feature.label}
                  className="w-10 h-10 hidden"
                />
                <p
                  className={`text-sm ${
                    tab === feature.value
                      ? "text-gray-100 font-bold"
                      : "text-gray-400"
                  }`}
                >
                  {feature.label}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-lg">
            {FEATURES_LIST.map((feature, idx) => (
              <div
                key={feature.label}
                className={`grid grid-cols-5 ${
                  tab === feature.value ? "" : "hidden"
                }`}
              >
                <div
                  className={`
                    rounded-md relative col-span-3
                    after:absolute after:content-[''] after:w-40 after:h-40 after:bottom-[0] after:left-[10%] after:bg-primary-500 after:rounded-full after:opacity-50 after:blur-3xl  
                    before:absolute before:content-[''] before:w-28 before:h-28 before:top-[0] before:right-[10%] before:bg-bluish-400 before:rounded-full before:opacity-50 before:blur-3xl
                  `}
                >
                  <img
                    src={feature.figure}
                    alt={feature.label}
                    className="h-full w-full object-contain relative z-[1]"
                  />
                </div>
                <div className="px-12 py-10 flex justify-center items-center col-span-2">
                  {feature.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto lg:hidden">
          <div className="rounded-lg overflow-hidden feature-accordion-container">
            {FEATURES_LIST.map((feature) => {
              return (
                <div
                  className={`feature-accordion`}
                  key={feature.value}
                  id={`accordion-${feature.value}`}
                >
                  <div
                    onClick={() => featureChangeHandler(feature.value)}
                    className={`cursor-pointer px-5 py-5 flex justify-between items-center ${
                      tab === feature.value ? "bluish-gradient" : ""
                    }`}
                  >
                    <div className="flex justify-center items-center gap-5">
                      <img
                        src={feature.icon}
                        alt={feature.label}
                        className="w-5 h-5"
                      />
                      <Heading type={5} className={"m-0"}>
                        {feature.label}
                      </Heading>
                    </div>
                    <span
                      className={`h-5 w-5 flex justify-center items-center text-white ${
                        tab === feature.value ? "open" : ""
                      }`}
                    >
                      <DownArrow />
                    </span>
                  </div>
                  <div
                    className={`${
                      tab === feature.value ? "visible" : "hidden"
                    }`}
                  >
                    <div className="px-5 py-4">
                      <div className="max-w-sm mx-auto">
                        <img
                          src={feature.figure}
                          alt={feature.label}
                          className="object-contain rounded-xl"
                        />
                      </div>
                      <div>{feature.content}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const DownArrow = () => {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 17 17"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="M16.354 5.075l-7.855 7.854-7.853-7.854 0.707-0.707 7.145 7.146 7.148-7.147 0.708 0.708z"
        fill="#ffffff"
      />
    </svg>
  );
};
