import React from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";
import PricingForm from "../../modules/pricing-form";
import { DiscussYourProject } from "../../modules/discuss-your-project";
import { HubspotProvider } from "@aaronhayes/react-use-hubspot-form";

const TEAMS_DATA = {
  TITLE: "For Teams that need high-performing applications",
  DESC: "Get started with observability. No need to manage multiple tools - Metrics, logs, and traces under a single pane of glass.",
  PORTAL_ID: "22308423",
  FORM_ID: "1c57ed6b-4ad8-48e4-88ba-1b2fd8fe0e83",
  FEATURE_POINTS: [
    {
      title: "Three Signals in a Single Pane of Glass",
      desc: "Get logs, metrics, and traces under a single pane of glass. No need for disparate tooling with too much operational overhead.",
      imageUrl: "/svgs/icons/metrics-traces-and-logs-light.svg",
    },
    {
      title: "Trusted by industry leaders",
      desc: "Teams at Zoom, NetApp, ClearTax and other industry leaders have trusted SigNoz to run their observability stack.",
      imageUrl: "/svgs/icons/trusted-by-industry-light.svg",
    },
    {
      title: "OpenTelemetry-Native",
      desc: "Future-proof your observability with OpenTelemetry. Second most active CNCF project after Kubernetes, OpenTelemetry is the future of cloud-native application monitoring.",
      imageUrl: "/svgs/icons/open-telemetry-native-light.svg",
    },
    {
      title: "Data Residency",
      desc: "Worried about data privacy and regulation laws? We have data centers in EU, US and India region to  help you comply with data privacy regulation.",
      imageUrl: "/svgs/icons/your-data-in-your-boundary-light.svg",
    },
  ],
};

function Teams() {
  return (
    <Layout title="Teams">
      <section className={styles.team}>
        <DiscussYourProject
          title={TEAMS_DATA.TITLE}
          desc={TEAMS_DATA.DESC}
        />
        <div className={styles.teamSection}>
          <div className={`container ${styles.teamContainer}`}>
            <div className={`row ${styles.teamRow}`}>
              <div className={"col col--6 margin-vert--md"}>
                <div className={styles.featuresContainer}>
                  {TEAMS_DATA.FEATURE_POINTS.map((feature, idx) => (
                    <div key={idx} className={styles.featureWrapper}>
                      <img
                        className={styles.featureImage}
                        src={feature.imageUrl}
                        alt={feature.title}
                      />
                      <div className={styles.featureContent}>
                        <h3 className={styles.featureTitle}>{feature.title}</h3>
                        <p className={styles.featureDesc}>{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={"col col--6 margin-vert--md"}>
                <div className={`card ${styles.teamCard}`}>
                  <div className="card__body">
                    <HubspotProvider>
                      <PricingForm
                        portalId={TEAMS_DATA.PORTAL_ID}
                        formId={TEAMS_DATA.FORM_ID}
                      />
                    </HubspotProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Teams;
