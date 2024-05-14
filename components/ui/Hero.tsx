import React from "react";

const Hero = ({ children }) => {
  return (
    <h1 className="my-2 text-3xl font-medium tracking-tight dark:text-white sm:my-6 md:leading-none lg:text-5xl text-gradient">
      {children}
    </h1>
  );
};

export default Hero;
