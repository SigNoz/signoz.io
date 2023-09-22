import React from "react";
import Heading from "../../components/ui/Heading";
import { LiteYoutubeEmbed } from "react-lite-yt-embed";

const Tutorials = () => {
  const TUTORIALS_LIST = [
    {
      youtubeId: "oQFMfEc9JNI",
      desc: "Using an open source standard frees you from vendor lock-in.",
    },
    {
      youtubeId: "u2PiWKEdjCw",
      desc: "Using an open source standard frees you from vendor lock-in.Using an open source standard frees you from vendor lock-in.Using an open source standard frees you from vendor lock-in.Using an open source standard frees you from vendor lock-in.",
    },
    {
      youtubeId: "CgByZJeuRZY",
      desc: "Using an open source standard frees you from vendor lock-in.",
    },
  ];

  return (
    <section>
      <div className="container my-16">
        <div className="flex flex-col items-center mb-5">
          <Heading type={4}>LEARN</Heading>
          <Heading type={1}>Tutorials</Heading>
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

export default Tutorials;
