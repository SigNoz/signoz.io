import React from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";
import PricingForm from "../../modules/pricing-form";
import { DiscussYourProject } from "../../modules/discuss-your-project";

const SELF_HOSTED_FEATURE_POINTS = [
  {
    title: "Three Signals in a Single Pane of Glass",
    desc: "Get logs, metrics, and traces under a single pane of glass. No need for disparate tooling with too much operational overhead.",
  },
  {
    title: "Trusted by industry leaders",
    desc: "Teams at Zoom, NetApp, ClearTax and other industry leaders have trusted SigNoz to run their observability stack.",
  },
  {
    title: "OpenTelemetry-Native",
    desc: "Future-proof your observability with OpenTelemetry. Second most active CNCF project after Kubernetes, OpenTelemetry is the future of cloud-native application monitoring.",
  },
  {
    title: "Self-Host in your cloud",
    desc: "No need to worry about GDPR and other data protection laws. Have all your observability data in your own infra. We provide managed self-hosted  deployment options.",
  },
];

function SelfHosted() {
  return (
    <Layout title="Self Hosted">
      <section className={styles.selfHosted}>
        <DiscussYourProject />
        <div className={`container ${styles.selfHostedContainer}`}>
          <div className={`row ${styles.selfHostedRow}`}>
            <div className={"col col--6 margin-vert--md"}>
              <div
                className={`card ${styles.cardTransparent} ${styles.featureCard}`}
              >
                <div className="card__body">
                  {SELF_HOSTED_FEATURE_POINTS.map((feature, idx) => (
                    <div key={idx} className={styles.featureWrapper}>
                      <h3 className={styles.featureTitle}>{feature.title}</h3>
                      <p className={styles.featureDesc}>{feature.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="card__footer"></div>
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

export default SelfHosted;
