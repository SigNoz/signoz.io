import React from "react";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

const Hero = (props) => {
  const { title, desc, billForComparison, trySigNozCloud, selfHost } = props;
  return (
    <div className={styles.svsdHeaderContainer}>
      <h2 className={styles.headerTitle}>{title}</h2>
      <p className={styles.headerDesc}>{desc}</p>
      <div className={styles.ctaContainer}>
        {billForComparison.isVisible && (
          <Link
            className={`button ${billForComparison.className} ${styles.ctaButton}`}
            href={billForComparison.path}
          >
            Send your bill for comparison
          </Link>
        )}
        {trySigNozCloud.isVisible && (
          <Link
            className={`button ${trySigNozCloud.className} ${styles.ctaButton}`}
            href={trySigNozCloud.path}
          >
            Try SigNoz Cloud
          </Link>
        )}
        {selfHost.isVisible && (
          <Link
            className={`button ${selfHost.className} ${styles.ctaButton}`}
            href={selfHost.path}
          >
            Self-Host
          </Link>
        )}
      </div>
      <div className={styles.headerHeroImageContainer}>
        <img src="/img/signoz-distributed-tracing.webp" />
      </div>
    </div>
  );
};

export default Hero;
