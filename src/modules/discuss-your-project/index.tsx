import React, { useState } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

export const DiscussYourProject = () => {
  return (
    <section className={styles.yourProject}>
      <div className="container">
        <h3 className={styles.title}>Let’s discuss your project</h3>
        <p className={styles.subTagline}>
          One of our experts will get in touch with you to give a brief demo,
          understand your requirements and answer any questions.
        </p>
      </div>
    </section>
  );
};
