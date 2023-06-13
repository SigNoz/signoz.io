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
          Sign Up for free
        </button>
      </div>
      <div className={styles.headerHeroImageContainer}>
        <img
          src="/img/signoz-dsitributed-tracing.png"
          className="headerHeroImage"
        />
      </div>
    </div>
  );
};

export default Hero;
