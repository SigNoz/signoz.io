import React, { useEffect, useRef, useState } from "react";
import useIsBrowser from "@docusaurus/useIsBrowser";

const VimeoPlayer = ({ videoId }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  let player = null;
  const isBrowser = useIsBrowser();

  useEffect(() => {
    const loadVimeoPlayer = async () => {
      try {
        if (isBrowser && videoId) {
          const { default: Player } = await import("@vimeo/player");

          player = new Player(playerRef.current, {
            url: `https://vimeo.com/${videoId}`,
          });
        }
      } catch (error) {
        console.error("Error loading Vimeo Player:", error);
      }
    };

    loadVimeoPlayer();
  }, [isBrowser, videoId]);

  const handlePlay = () => {
    if (!isPlaying && player && typeof player.play === "function") {
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
