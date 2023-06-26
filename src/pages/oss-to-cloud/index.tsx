import React from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";
import PricingForm from "../../modules/pricing-form";
import { DiscussYourProject } from "../../modules/discuss-your-project";
import { HubspotProvider } from "@aaronhayes/react-use-hubspot-form";

const OSS_TO_CLOUD_DATA = {
  TITLE: "SigNoz Cloud is the easiest way of running SigNoz",
  DESC: "Experience SigNoz effortlessly. No installation, maintenance, or scaling needed. Sign up for a free account and enjoy 30 days of uncapped usage.",
  PORTAL_ID: "22308423",
  FORM_ID: "d6a11324-07d5-4dd3-8ce2-a53279b6c1db",
  FEATURE_POINTS: [
    {
      title: <>Avoid maintaining and scaling your own instance</>,
      desc: (
        <>
          No overhead of maintaining your own SigNoz instance. You don’t need to
          worry about downtimes and scaling. Just focus on driving insights from
          your observability data.
        </>
      ),
    },
    {
      title: <>Automatic upgrades, latest features</>,
      desc: (
        <>
          Always stay updated with the latest version of SigNoz. No need to
          worry about running migration scripts or losing data due to mistakes.
        </>
      ),
    },
    {
      title: <>Trusted by industry leaders</>,
      desc: (
        <>
          Teams at Zoom, NetApp, ClearTax and other industry leaders have
          trusted SigNoz to run their observability stack.
        </>
      ),
    },
    {
      title: <>Data Residency</>,
      desc: (
        <>
          Worried about data privacy and regulation laws? We have data centers
          in EU, US and India region to help you comply with data privacy
          regulation.
          <br/>
          <br/>
          We also provide option for Managed by SigNoz in your cloud.
        </>
      ),
    },
  ],
};

function OSSToCloud() {
  return (
    <Layout title="OSS to Cloud">
      <section className={styles.oss}>
        <DiscussYourProject
          withUnderline
          title={OSS_TO_CLOUD_DATA.TITLE}
          desc={OSS_TO_CLOUD_DATA.DESC}
        />
        <div className={styles.ossSection}>
          <div className={`container ${styles.ossContainer}`}>
            <div className={`row ${styles.ossRow}`}>
              <div className={"col col--6 margin-vert--md"}>
                <div className={styles.featuresContainer}>
                  {OSS_TO_CLOUD_DATA.FEATURE_POINTS.map((feature, idx) => (
                    <div key={idx} className={styles.featureWrapper}>
                      <div className={styles.featureContent}>
                        <h3 className={styles.featureTitle}>{feature.title}</h3>
                        <p className={styles.featureDesc}>{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={"col col--6 margin-vert--md"}>
                <div className={`card ${styles.ossCard}`}>
                  <div className="card__body">
                    <HubspotProvider>
                      <PricingForm
                        portalId={OSS_TO_CLOUD_DATA.PORTAL_ID}
                        formId={OSS_TO_CLOUD_DATA.FORM_ID}
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

export default OSSToCloud;
