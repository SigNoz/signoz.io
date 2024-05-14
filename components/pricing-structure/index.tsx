import React from "react";
import Heading from "../../components/ui/Heading";
import SubHeading from "../../components/ui/SubHeading";

const PricingStructure = () => {
  return (
    <section className="">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col justify-center items-center mb-10 text-center">
          <Heading>Pricing you can trust.</Heading>
          <SubHeading>
            Tired of Datadog’s unpredictable bills or New Relic’s user-based
            pricing?&nbsp;<br className="hidden lg:inline" />
            We’re here for you.
          </SubHeading>
        </div>
        <div className="flex flex-wrap md:max-w-md lg:max-w-5xl mx-auto gap-y-5 justify-center">
          <div className="md:w-full lg:w-1/3 xl:w-1/3 px-8 py-1 pricing-card">
            <Heading type={3}>No user-based pricing</Heading>
            <p className="leading-relaxed text-base mb-4 text-gray-400">
              Add as many team members as you want.
            </p>
          </div>
          <div className="md:w-full lg:w-1/3 xl:w-1/3 px-8 py-1 pricing-card">
            <Heading type={3}>Simple usage-based pricing</Heading>
            <p className="leading-relaxed text-base mb-4 text-gray-400">
              Only pay for the data you send.
            </p>
          </div>
          <div className="md:w-full lg:w-1/3 xl:w-1/3 px-8 py-1 pricing-card">
            <Heading type={3}>No special pricing for custom metrics</Heading>
            <p className="leading-relaxed text-base mb-4 text-gray-400">
              All metrics charged simply at $0.1 per million samples.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PricingStructure;
