import React, { useState } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

export const DiscussYourProject = ({ title, desc, withUnderline=false }) => {
  return (
    <section className={styles.yourProject}>
      <div className="container">
        <h3 className={`${styles.title} ${withUnderline ? styles.withUnderline: ""}`}>{title}</h3>
        <p className={styles.subTagline}>{desc}</p>
      </div>
    </section>
  );
};
