import React, { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import SubHeading from "../../components/ui/SubHeading";
import Hero from "../../components/ui/Hero";
import Button from "../../components/ui/Button";
import ReactModal from "react-modal";
import { LiteYoutubeEmbed } from "react-lite-yt-embed";

const VimeoPlayer = ({ videoId }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  let player = null;

  useEffect(() => {
    player = new Player(playerRef.current, {
      url: `https://vimeo.com/${videoId}`,
    });

    return () => {
      player.off("play");
    };
  }, [videoId]);

  const handlePlay = () => {
    if (!isPlaying) {
      player.play();
      setIsPlaying(true);
    }
  };

  return (
    <div>
      <div ref={playerRef} />
      {!isPlaying && (
        <div onClick={handlePlay}>
          <div className="cursor-pointer play-container w-16 h-16 md:w-24 md:h-24 rounded-full bg-primary-500 flex justify-center items-center focus-visible:outline-none">
            <img
              src="/img/landing/play-icon.webp"
              className="w-6 h-6 md:w-10 md:h-10"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VimeoPlayer;

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
