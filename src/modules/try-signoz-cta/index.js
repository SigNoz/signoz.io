import React, { useState } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

export const TrySigNozCTA = () => {
  const handleClick = (message) => {
    ReactGA.event({
      category: "User",
      action: message,
    });
  };
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.contentWrapper}>
          <h3 className={styles.tagline}>Give SigNoz a try</h3>
          <a
            className="button button--secondary"
            target="_blank"
            href="https://forms.gle/yYSkntXRRPU3MHRL7"
            onClick={() => handleClick("SigNozCloud")}
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};
