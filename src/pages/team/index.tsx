import React from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";
import PricingForm from "../../modules/pricing-form";
import { DiscussYourProject } from "../../modules/discuss-your-project";

const GET_CLOUD_FEATURE_POINTS = [
  {
    title: "Three Signals in a Single Pane of Glass",
    desc: "Get logs, metrics, and traces under a single pane of glass. No need for disparate tooling with too much operational overhead.",
  },
  {
    title: "Data Residency",
    desc: "Worried about data privacy and regulation laws? We have data centers in EU, US and India region to  help you comply with data privacy regulation.",
  },
  {
    title: "OpenTelemetry-Native",
    desc: "Future-proof your observability with OpenTelemetry. Second most active CNCF project after Kubernetes, OpenTelemetry is the future of cloud-native application monitoring.",
  },
  {
    title: "Trusted by industry leaders",
    desc: "Teams at Zoom, NetApp, ClearTax and other industry leaders have trusted SigNoz to run their observability stack.",
  },
];

function GetCloud() {
  return (
    <Layout title="Get Cloud">
      <section className={styles.getCloud}>
        <DiscussYourProject />
        <div className={`container ${styles.getCloudContainer}`}>
          <div className={`row ${styles.getCloudRow}`}>
            <div className={"col col--6 margin-vert--md"}>
              <div className={styles.featuresContainer}>
                {GET_CLOUD_FEATURE_POINTS.map((feature, idx) => (
                  <div key={idx} className={styles.featureWrapper}>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDesc}>{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={"col col--6 margin-vert--md"}>
              <div className={`card ${styles.featureCard}`}>
                <div className="card__header"></div>
                <div className="card__body">
                  <PricingForm />
                </div>
                <div className="card__footer"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default GetCloud;
