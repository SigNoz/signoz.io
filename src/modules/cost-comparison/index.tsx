import React from "react";
import styles from "./styles.module.css";

export const CostComparison = () => {
  return (
    <section className={styles.costCompare}>
      <div className="container">
        <div className="row">
          <div className="col col--7">
            <img
              src="/img/website/cost-comparison-graph-2.webp"
              alt="cost comparison logo"
              className={styles.costGraph}
            />
          </div>
          <div className={`col col--5 ${styles.titleContainer}`}>
            <h3 className={styles.title}>
              SigNoz provides up to 9x more value for money than Datadog.
              <br />
              <a
                id="learn-more"
                className={`highlight`}
                href={
                  "/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"
                }
              >
                Learn more.
              </a>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};
