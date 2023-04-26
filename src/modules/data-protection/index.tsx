import React, { useState } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

export const DataProtection = () => {
  return (
    <section className={styles.data}>
      <div className="container">
        <h3 className={styles.title}>
          Worried about Data
          <br />
          Protection laws?
        </h3>
        <p className={styles.subTagline}>
          No need to send data outside your region. We have data centers in US,
          EU and India to comply with data privacy regulations. You can also host SigNoz in your own cloud.
        </p>
      </div>
    </section>
  );
};
