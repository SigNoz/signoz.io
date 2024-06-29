import React from "react";
import Heading from "../../components/ui/Heading";
import Card from "../Card/card";
import Divider from '@/components/ui/Divider'

const BuildForDevelopers = () => {
  const REASONS = [
    {
      title: "Single tool for observability",
      desc: "No need of using disparate tools for observability. Get everything in a single platform. ",
      figure: "/img/landing/property-query-buider.webp",
    },
    {
      title: "Flexible deployment options",
      desc: "You can self-host SigNoz or use our cloud services, or use both depending on your use-cases.",
      figure: "/img/landing/property-columnar-database.webp",
    },
    {
      title: "Columnar database",
      desc: "SigNoz uses ClickHouse as datastore. It is extremely fast and highly optimized storage for observability data.",
      figure: "/img/landing/property-telemetry-pipeline.webp",
    },
    {
      title: "Flexible Querying",
      desc: "DIY Query builder, PromQL, and ClickHouse queries to fulfill all your use-cases around querying observability data.",
      figure: "/img/landing/property-source-code.webp",
    },
    {
      title: "Correlated Signals",
      desc: "Correlated logs, metrics and traces for much richer context while debugging.",
      figure: "/img/landing/property-source-code.webp",
    },
  ];
  return (
    <section className="!w-[80vw] !mx-auto border border-signoz_slate-400 border-dashed !border-l-0 !border-t-0">
      <div className=" border border-signoz_slate-400 border-dashed w-full h-12 !border-t-0 !border-r-0" />
      <div className="overflow-hidden">
        <div
          className={`relative
          after:-z-[2] after:absolute after:content-[''] after:w-[180px] md:after:w-[350px] after:h-[800px] lg:after:w-[500px] lg:after:h-[600px] xl:after:w-[750px] xl:after:h-[600px] after:top-[10%] after:-left-[50%] after:bg-primary-500 after:rounded-full after:opacity-50 after:blur-3xl 
          before:-z-[2] before:absolute before:content-[''] before:w-[180px] md:before:w-[350px] before:h-[800px] lg:before:w-[500px] lg:before:h-[600px] xl:before:w-[750px] xl:before:h-[600px] before:top-[10%] before:-right-[50%] before:bg-primary-500 before:rounded-full before:opacity-50 before:blur-3xl 
      `}
        >
          <div className={`container pt-12 mb-0 !px-0`}>
            <div className="flex flex-col items-center py-36 text-center border border-signoz_slate-400 border-dashed !border-r-0 !border-t-0 !border-b-0 ">
              <div className="text-signoz_sienna-100 text-[44px] font-semibold leading-[3.5rem]">Built for developers, <br />crafted by humans.</div>
            </div>
            <div className='grid grid-cols-2 homepage-build-dev-container'>
              {REASONS.map((section, index) => (
                <Card
                  title={section.title}
                  description={section.desc}
                  img={section.figure}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildForDevelopers;