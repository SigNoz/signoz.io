import React from "react";

const Divider = ({ isDashed = false }) => {
  return <div className={`divider my-2 md:my-5 ${isDashed ? "dashed" : ""}`} />;
};

export default Divider;
