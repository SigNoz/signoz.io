import React, { useState } from "react";
import styles from "./styles.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

export const MoreOptions = () => {
  return (
    <section className={styles.options}>
      <div
        className="container"
        style={{ marginTop: "2rem", marginBottom: "0.5rem" }}
      >
        <h3 className={styles.title}>More Options</h3>
        <p className={styles.tagline}>Community</p>
        <p className={styles.subTagline}>Free open source community edition.</p>
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
