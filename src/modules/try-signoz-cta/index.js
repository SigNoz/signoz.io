import React, { useState } from "react";
import styles from "./styles.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

export const TrySigNozCTA = () => {
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
