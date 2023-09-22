import React from "react";
import Heading from "../../components/ui/Heading";
import { LiteYoutubeEmbed } from "react-lite-yt-embed";
const LatestInOpenTelementry = () => {
  const TUTORIALS_LIST = [
    {
      youtubeId: "Wzut0kjVeYI",
      desc: "OpenTelemetry Webinars: Getting started with OpenTelemetry.",
    },
    {
      youtubeId: "sL6XvOOAEP0",
      desc: "Gathering data with the OpenTelemetry Collector.",
    },
    {
      youtubeId: "CgByZJeuRZY",
      desc: "Implementing Distributed Tracing in a NodeJS Application using OpenTelemetry",
    },
  ];

  return (
    <section>
      <div className="container my-16">
        <div className="flex flex-col items-center mb-5 text-center">
          <Heading type={4}>Read ABOUT</Heading>
          <Heading type={1}>Latest in OpenTelemetry</Heading>
        </div>
        <div className="row">
          {TUTORIALS_LIST.map((tutorial) => (
            <div key={tutorial.youtubeId} className="col col--4">
              <div className="card-demo margin--sm">
                <div className="card rounded-lg bluish-gradient">
                  <div className="card__body p-0">
                    <div className="flex flex-col gap-5">
                      <LiteYoutubeEmbed id={tutorial.youtubeId} mute={false} />
                      <p className="px-5 text-ellipsis line-clamp-2">
                        {tutorial.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestInOpenTelementry;
