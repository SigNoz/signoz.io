import React, { useState } from "react";
import styles from "./styles.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

export const DataProtection = () => {
  return (
    <section className={styles.data}>
      <div
        className="container"
        style={{ marginTop: "2rem", marginBottom: "0.5rem" }}
      >
        <h3 className={styles.title}>
          Worried about Data
          <br />
          Protection laws?
        </h3>
        <p className={styles.subTagline}>
          No need to send data outside your region. We have data centers in US,
          EU and India to comply with data privacy regulations.
        </p>
      </div>
    </section>
  );
};
