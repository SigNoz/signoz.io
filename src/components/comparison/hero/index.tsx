import React from "react";
import styles from "./styles.module.css";

const Hero = (props) => {
  const { title, desc } = props;
  return (
    <div className={styles.svsdHeaderContainer}>
      <h2 className={styles.headerTitle}>{title}</h2>
      <p className={styles.headerDesc}>{desc}</p>
      <div className={styles.ctaContainer}>
        <button
          className={`button button--primary ${styles.ctaButton}`}
          type="button"
        >
          Send your bill for comparison
        </button>
        <button
          className={`button button--outline button--secondary ${styles.ctaButton}`}
          type="button"
        >
          Get started - free
        </button>
      </div>
      <div className={styles.headerHeroImageContainer}>
        <img src="/img/signoz-distributed-tracing.png" />
      </div>
    </div>
  );
};

export default Hero;
