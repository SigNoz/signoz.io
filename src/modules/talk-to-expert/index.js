import React, { useState } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

export const TalkToExpert = () => {
  return (
    <section className={styles.expert}>
      <div className="container">
        <p className={styles.tagline}>
          Have more specific questions about SigNoz?
        </p>
        <p className={styles.subTagline}>
          Every engineering team is different - we’re here to help.
        </p>
        <div className="text-center">
          <Link
            style={{
              margin: "6px",
              paddingLeft: "10px !important",
              paddingRight: "10px !important",
            }}
            className="button button--primary"
            href={"/pricing/"}
          >
            Talk to an Expert
          </Link>
        </div>
      </div>
    </section>
  );
};
