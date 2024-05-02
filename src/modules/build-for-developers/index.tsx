import React from "react";
import Heading from "../../components/ui/Heading";

const BuildForDevelopers = () => {
  const REASONS = [
    {
      title: "Query Builder",
      desc: "Write queries on all telemetry signals. Run aggregates, and apply filters and formulas to get deeper insights from your data.",
      figure: "/img/landing/property-query-buider.webp",
    },
    {
      title: "Columnar Database",
      desc: "SigNoz uses ClickHouse - a fast open source distributed columnar database. Ingestion and aggregations are lightning fast.",
      figure: "/img/landing/property-columnar-database.webp",
    },
    {
      title: "Telemetry Pipelines",
      desc: "Build telemetry pipelines easily with SigNoz OTel Collector. Integrate any existing pipeline with OTel Collector to send data to SigNoz.",
      figure: "/img/landing/property-telemetry-pipeline.webp",
    },
    {
      title: "Source Code",
      desc: "Check out the entire source code of SigNoz on GitHub. Create issues, build features & integrations, get started without contacting any sales rep.",
      figure: "/img/landing/property-source-code.webp",
    },
  ];
  return (
    <section>
      <div className="overflow-hidden">
        <div
          className={`relative
          after:-z-[2] after:absolute after:content-[''] after:w-[180px] md:after:w-[350px] after:h-[800px] lg:after:w-[500px] lg:after:h-[600px] xl:after:w-[750px] xl:after:h-[600px] after:top-[10%] after:-left-[50%] after:bg-primary-500 after:rounded-full after:opacity-50 after:blur-3xl 
          before:-z-[2] before:absolute before:content-[''] before:w-[180px] md:before:w-[350px] before:h-[800px] lg:before:w-[500px] lg:before:h-[600px] xl:before:w-[750px] xl:before:h-[600px] before:top-[10%] before:-right-[50%] before:bg-primary-500 before:rounded-full before:opacity-50 before:blur-3xl 
      `}
        >
          <div className={`container px-5 py-12 mx-auto mb-0`}>
            <div className="flex flex-col items-center mb-10 text-center">
              <Heading type={4}>
                Get granular control over your observability data.
              </Heading>
              <Heading type={1}>Built for developers like you.</Heading>
            </div>

            <div className="divide-y-2 divide-gray-100 max-w-xl lg:max-w-3xl mx-auto">
              {REASONS.map((reason) => (
                <div
                  className="flex flex-row-reverse gap-5 lg:gap-0 lg:grid lg:grid-cols-2 for-devs-container py-5"
                  key={reason.title}
                >
                  <div className="flex gap-10 justify-center lg:justify-start items-center w-1/5 lg:w-auto">
                    <img
                      src={reason.figure}
                      alt="figure for devs"
                      className="w-14 h-14 block"
                    />
                    <h2 className="hidden lg:block text-2xl font-medium mb-2">
                      {reason.title}
                    </h2>
                  </div>
                  <div className="flex-shrink w-4/5 lg:w-auto">
                    <h2 className="block lg:hidden text-2xl font-medium mb-2">
                      {reason.title}
                    </h2>
                    <p className="leading-relaxed">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildForDevelopers;