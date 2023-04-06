import React, { useState } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

export const CommunityEdition = () => {
  return (
    <section className={styles.options}>
      <div className="container">
        <h3 className={styles.title}>Community Edition</h3>
        <p className={styles.subTagline}>Open source version of SigNoz to get started with observability.</p>
        <Link
          style={{
            margin: "6px",
            paddingLeft: "10px !important",
            paddingRight: "10px !important",
          }}
          className="button button--primary"
          href={"/docs/"}
        >
          Read docs
        </Link>
      </div>
    </section>
  );
};
