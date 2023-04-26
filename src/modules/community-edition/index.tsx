import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

export const CommunityEdition = () => {
  return (
    <section className={styles.options}>
      <div className="container">
        <h3 className={styles.title}>Community Edition</h3>
        <p className={styles.subTagline}>
          Open source version of SigNoz to get started with observability.
        </p>
        <Link
          id="btn-pricing-read-docs"
          className={`button button--primary ${styles.readDocsBtn}`}
          href={"/docs/"}
        >
          Read docs
        </Link>
      </div>
    </section>
  );
};
