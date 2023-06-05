import React from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";

function SigNozVSDataDog() {
  return (
    <Layout title="SigNoz vs Datadog">
      <section className={styles.svsd}>
        <div className={styles.svsdHeaderContainer}>
          <h2 className={styles.headerTitle}>SigNoz vs Datadog</h2>
          <p className={styles.headerDesc}>
            SigNoz can help you{" "}
            <span className="highlight">
              save up to 86% of your Datadog bill
            </span>{" "}
            while providing a robust observability stack.
          </p>
          <div className={styles.ctaContainer}>
            <button className="button button--primary" type="button">
              Send your bill for comparison
            </button>
            <button
              className="button button--outline button--secondary "
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
      </section>
    </Layout>
  );
}

export default SigNozVSDataDog;
