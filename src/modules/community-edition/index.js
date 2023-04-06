import React, { useState } from "react";
import styles from "./styles.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

export const CommunityEdition = () => {
  return (
    <section className={styles.options}>
      <div
        className="container"
        style={{ marginTop: "2rem", marginBottom: "0.5rem" }}
      >
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
