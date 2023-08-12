import React from "react";

const Heading = ({ type, children }) => {
  switch (type) {
    case 1:
      return (
        <h1 className={"font-heading text-4xl font-bold text-gradient"}>
          {children}
        </h1>
      );
    case 2:
      return (
        <h2 className={"font-heading text-3xl font-bold text-gradient"}>
          {children}
        </h2>
      );
    case 3:
      return <h3 className={"font-heading text-2xl font-bold"}>{children}</h3>;
    case 4:
      return (
        <h4
          className={"font-heading text-xl font-light uppercase text-gray-300"}
        >
          {children}
        </h4>
      );
    case 5:
      return (
        <h5 className={"font-heading text-lg font-semibold"}>{children}</h5>
      );
    case 6:
      return (
        <h6 className={"font-heading text-base font-medium"}>{children}</h6>
      );

    default:
      return <Heading type={1}>{children}</Heading>;
  }
};

export default Heading;
