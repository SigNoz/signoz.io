import React, { useState } from "react";
import SubHeading from "../../components/ui/SubHeading";
import Hero from "../../components/ui/Hero";
import Button from "../../components/ui/Button";
import ReactModal from "react-modal";
import { LiteYoutubeEmbed } from "react-lite-yt-embed";

export const Header = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <header className="my-16">
      <div className="flex flex-col items-center mb-5 text-center px-5">
        <Hero>
          OpenTelemetry-Native Traces,
          <br className="hidden lg:inline" />
          Metrics, and Logs in a single pane
        </Hero>
        <SubHeading>
          SigNoz is an open source Datadog or New Relic alternative. A single
          tool for all your observability <br className="hidden lg:inline" />
          needs - APM, logs, metrics, exceptions, alerts, and dashboards powered
          by a powerful query builder.
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
        <div className="flex justify-center items-center relative after:-z-[2] after:absolute after:content-[''] after:w-[300px] after:h-[300px] lg:after:w-[600px] lg:after:h-[600px] after:bg-primary-500 after:rounded-full after:opacity-50 after:blur-3xl">
          <div className="p-2 rounded-lg flex justify-center items-center hero-figure max-w-4xl">
            <img
              className="rounded-lg"
              src="/img/landing/signoz-landing-snap.png"
            />
            <div
              onClick={() => setShowVideo(true)}
              className="cursor-pointer play-container w-16 h-16 md:w-24 md:h-24 rounded-full bg-primary-500 flex justify-center items-center focus-visible:outline-none"
            >
              <img
                src="/img/landing/play-icon.png"
                className="w-6 h-6 md:w-10 md:h-10"
              />
            </div>
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={showVideo}
        contentLabel=""
        onRequestClose={() => setShowVideo(false)}
        className="Modal play-video-container"
        overlayClassName="Overlay"
      >
        <div>
          <LiteYoutubeEmbed
            id={"jD36hjfL1x0"}
            defaultPlay={true}
            mute={false}
            params={{ autoplay: "true", mute: "false" }}
          />
        </div>
      </ReactModal>
    </header>
  );
};
