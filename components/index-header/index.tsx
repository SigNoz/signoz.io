import React from "react";
import SubHeading from "../../components/ui/SubHeading";
import Hero from "../../components/ui/Hero";
import Button from "../../components/ui/Button";
import VimeoPlayer from "../../components/VimeoPlayer/VimeoPlayer";

export const Header = () => {
  return (
    <header className="my-8">
      <div className="flex flex-col items-center mb-5 text-center px-5">
        <Hero>
          OpenTelemetry-Native Traces,&nbsp;
          <br className="hidden lg:inline" />
          Metrics, and Logs in a single pane
        </Hero>
        <SubHeading>
          A single tool for all your observability needs - APM, logs, metrics,
          exceptions, <br className="hidden lg:inline" /> alerts, and dashboards
          powered by a powerful query builder.
        </SubHeading>
      </div>
      <div className="flex flex-col md:flex-row gap-5 justify-center mb-12 mx-5">
        <Button
          isButton
          className=""
          to={"/teams/"}
          id="btn-get-started-homepage-hero"
        >
          Try SigNoz Cloud
        </Button>
        <Button
          isButton
          outlined
          className=""
          to={"/docs/install/"}
          id="btn-self-host-homepage-hero"
        >
          Documentation
        </Button>
      </div>
      <div className="container">
        <div className="w-100 mx-auto">
          <div className="product-explainer-video hero-figure p-3 rounded-lg">
            <div className="embed-container">
              <VimeoPlayer videoId="944340217" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
