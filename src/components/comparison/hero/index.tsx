import React from "react";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

const Hero = (props) => {
  const { title, desc, billForComparison } = props;
  return (
    <div className={styles.svsdHeaderContainer}>
      <h2 className={styles.headerTitle}>{title}</h2>
      <p className={styles.headerDesc}>{desc}</p>
      <div className={styles.ctaContainer}>
        <Link
          className={`button button--primary ${styles.ctaButton}`}
          href={billForComparison}
        >
          Send your bill for comparison
        </Link>
        <a
          className={`button button--outline button--secondary ${styles.ctaButton}`}
          href="/teams/"
        >
          Try SigNoz Cloud
        </a>
      </div>
      <div className={styles.headerHeroImageContainer}>
        <img src="/img/signoz-distributed-tracing.png" />
      </div>
    </div>
  );
};

export default Hero;
