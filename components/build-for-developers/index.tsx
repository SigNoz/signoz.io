import React from "react";
import Heading from "../../components/ui/Heading";
import Card from "../Card/card";
import Divider from '@/components/ui/Divider'

const BuildForDevelopers = () => {
  const REASONS = [
    {
      title: "Single tool for observability",
      desc: "No need of using disparate tools for observability. Get everything in a single platform. ",
      figure: "/img/graphics/homepage/feature-graphic-single-tool.png",
    },
    {
      title: "Flexible deployment options",
      desc: "You can self-host SigNoz or use our cloud services, or use both depending on your use-cases.",
      figure: "/img/graphics/homepage/feature-graphic-flexible-deployment.png",
    },
    {
      title: "Columnar database",
      desc: "SigNoz uses ClickHouse as datastore. It is extremely fast and highly optimized storage for observability data.",
      figure: "/img/graphics/homepage/feature-graphic-columnar-db.png",
    },
    {
      title: "Flexible Querying",
      desc: "DIY Query builder, PromQL, and ClickHouse queries to fulfill all your use-cases around querying observability data.",
      figure: "/img/graphics/homepage/feature-graphic-flexible-querying.png",
    },
    {
      title: "Correlated Signals",
      desc: "Correlated logs, metrics and traces for much richer context while debugging.",
      figure: "/img/graphics/homepage/feature-graphic-correlation.png",
    },
  ];
  return (
    <section className="!w-[80vw] !mx-auto border border-signoz_slate-400 border-dashed !border-l-0 !border-t-0">
      <div className=" border border-signoz_slate-400 border-dashed w-full h-12 !border-t-0 !border-r-0" />
      <div className="overflow-hidden">
        <div
          className={`relative bg-[length:85%] bg-no-repeat bg-[center_top_8rem] bg-[url('/img/background_blur/Perlin_noise.png')]
      `}
        >
          <div className={`section-container pt-12 mb-0 !px-0`}>
            <div className="w-[80vw] mx-auto border border-signoz_slate-400 border-dashed !border-b-0 !border-t-0 bg-[center_top_calc(100px)] bg-[url('/img/background_blur/Ellipse_388.png')] ">
            <div className="flex flex-col items-center py-48 px-24 sm:px-0 text-center border border-signoz_slate-400 border-dashed !border-r-0 !border-t-0 !border-b-0 ">
              <div className="text-signoz_sienna-100 text-[44px] font-semibold leading-[3.5rem]">Built for developers, <br />crafted by humans.</div>
            </div>

            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 homepage-build-dev-container'>
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