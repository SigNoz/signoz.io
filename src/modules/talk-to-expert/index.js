import React, { useState } from "react";
import styles from "./styles.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

export const TalkToExpert = () => {
  return (
    <section className={styles.expert}>
      <div
        className="container"
        style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
      >
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
