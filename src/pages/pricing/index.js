import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import FAQBody from "@site/src/components/FAQPricing";
import ReactGA from "react-ga";
import { ShowCompanyLogos } from "../../modules/company-logos";
import { RightSVG, WrongSVG } from "../../svgs/common";
import { TalkToExpert } from "../../modules/talk-to-expert";
import { CommunityEdition } from "../../modules/community-edition";
import { UserReview } from "../../modules/user-review";
import { TrySigNozCTA } from "../../modules/try-signoz-cta";
import { DataProtection } from "../../modules/data-protection";
import styles from "./styles.module.css";

ReactGA.initialize("UA-152867655-1");

const handleClick = (message) => {
  ReactGA.event({
    category: "User",
    action: message,
  });
};

function pricingTest() {
  return (
    <Layout title="SigNoz Plans">
      <section className={styles.pricing}>
        <div
          className={`container ${styles.pricingContainer}`}
        >
          <h2 className={styles.title}>Transparent & Predictable Pricing</h2>
          <p className={styles.subtitle}>
            OpenTelemetry-Native <span className="highlight">Metrics</span>,{" "}
            <span className="highlight">Logs</span>, and{" "}
            <span className="highlight">Traces</span> in{" "}
            <span className="highlight">single</span> pane of glass
          </p>
          <div className={"row"}>
            <div className={"col col--6 margin-vert--md"}>
              <div
                className={`card ${styles.card}`}
              >
                <div
                  className={`card__header ${styles.card__header}`}
                >
                  <div>
                    <h3>Teams</h3>
                    <p>For teams that need high-performing applications.</p>
                  </div>
                  <div className={styles.priceCta}>
                    <div className={styles.priceCtaDesc}>
                      <span>starts at just</span>
                      <span
                        className={`${styles.price} highlight`}
                      >
                        $199/month
                      </span>
                    </div>
                    <div>
                      <a
                        id="btn-pricing-signoz-cloud-1"
                        className="button button--primary"
                        target="_blank"
                        href="https://forms.gle/yYSkntXRRPU3MHRL7"
                        onClick={() => handleClick("SigNozCloud")}
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className="card__body">
                  <div
                    className={`${styles.pricingDetails} ${styles.packageDetailBlock}`}
                  >
                    <h4 className={styles.packageDetailTitle}>Pricing</h4>
                    <div>
                      <span>Logs</span>
                      <span>$0.4 per GB ingested</span>
                    </div>
                    <div>
                      <span>Traces</span>
                      <span>$0.4 per GB ingested</span>
                    </div>
                    <div>
                      <span>Metrics</span>
                      <span>$0.1 per mn samples</span>
                    </div>
                  </div>
                  <hr />
                  <p className={styles.retention}>
                    Retention: 15 days for Traces & Logs, 30 days for Metrics
                  </p>
                  <hr />
                  <div
                    className={`${styles.deploymentOptions} ${styles.packageDetailBlock}`}
                  >
                    <h4 className={styles.packageDetailTitle}>
                      Deployment Options
                    </h4>
                    <div>
                      <span>SaaS</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Managed by SigNoz in your cloud</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    
                  </div>
                  <hr />
                  <div
                    className={`${styles.support} ${styles.packageDetailBlock}`}
                  >
                    <h4 className={styles.packageDetailTitle}>Support</h4>
                    <div>
                      <span>Community Slack</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Email</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Dedicated Slack Channel</span>
                      <span className="text-right">On spends above $999</span>
                    </div>
                  </div>
                  <hr />
                  <div className={styles.packageDetailBlock}>
                    <h4 className={styles.packageDetailTitle}>Features</h4>
                    <ul className="list-icon-right">
                      <li>APM & Distributed Tracing</li>
                      <li>Log Management</li>
                      <li>Infrastructure Monitoring</li>
                      <li>Exceptions Monitoring</li>
                      <li>Alerts Management</li>
                      <li>SSO and SAML Support</li>
                      <li>Service Dependency Visualization</li>
                      <li>Run aggregates on ingested spans</li>
                      <li>Live Tail Logging</li>
                    </ul>
                    {/* <span>
                      <a href="#" className="explore">
                        Explore all features
                      </a>
                    </span> */}
                  </div>
                </div>
                <div
                  className={`card__footer ${styles.card__footer}`}
                >
                  <a
                    id="btn-pricing-signoz-cloud-2"
                    className="button button--primary"
                    target="_blank"
                    href="https://forms.gle/yYSkntXRRPU3MHRL7"
                    onClick={() => handleClick("SigNozCloud")}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
            <div className={"col col--6 margin-vert--md"}>
              <div
                className={`card ${styles.card}`}
              >
                <div
                  className={`card__header ${styles.card__header}`}
                >
                  <div>
                    <h3>Enterprise</h3>
                    <p>
                      For at-scale orgs with advanced security, compliance and support needs.
                    </p>
                  </div>
                  <div className={styles.priceCta}>
                    <div className={styles.priceCtaDesc}>
                    <span>Flexible Pricing for scale</span>
                    {/* <span
                        className={`${styles.price} highlight`}
                      >
                        Custom Pricing
                      </span> */}
                    </div>
                    <div>
                      <a
                        id="btn-pricing-signoz-enterprise-1"
                        className="button button--primary"
                        target="_blank"
                        href="https://forms.gle/zxCEoSbnnPv6mSX57"
                        onClick={() => handleClick("SelfHostedEnterprise")}
                      >
                        Get Demo
                      </a>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className="card__body">
                  <div
                    className={`${styles.pricingDetails} ${styles.packageDetailBlock}`}
                  >
                    <h4 className={styles.packageDetailTitle}>Pricing</h4>
                    <div>
                      
                    </div>
                    <div>
                      <span>Custom Pricing</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Custom Retention</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div
                    className={`${styles.deploymentOptions} ${styles.packageDetailBlock}`}
                  >
                    <h4 className={styles.packageDetailTitle}>
                      Deployment Options
                    </h4>
                    <div>
                      <span>SaaS</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Managed by SigNoz in your cloud</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div
                    className={`${styles.support} ${styles.packageDetailBlock}`}
                  >
                    <h4 className={styles.packageDetailTitle}>Support</h4>
                    <div>
                      <span>Email</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Dedicated Slack Channel</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Team Training</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Dashboard Configuration Support</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Instrumentation Support</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>SLA w/ downtime developer pairing</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div className={styles.packageDetailBlock}>
                    <h4 className={styles.packageDetailTitle}>Features</h4>
                    <p className={styles.featureBlur}>
                      Includes all features in Team
                    </p>
                    <ul className="list-icon-right">
                      <li>Single Sign On</li>
                      <li>SAML and LDAP support</li>
                      <li>Custom integration for metrics and logs (Cloudwatch, etc)</li>
                      <li>AWS Private Link</li>
                      <li>VPC Peering</li>
                      <li>Security tightening for on-prem installation</li>
                    </ul>
                    {/* <span>
                      <a href="#" className="explore">
                        Explore all features
                      </a>
                    </span> */}
                  </div>
                  <hr />
                  <div className={styles.packageDetailBlock}>
                    <h4 className={styles.packageDetailTitle}>Upcoming</h4>
                    <ul className="list-icon-right">
                      <li>Finer RBAC with custom roles</li>
                      <li>Audit Logs</li>
                      <li>Custom retention for different sources of logs</li>
                      <li>Multi-tenancy</li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`card__footer ${styles.card__footer}`}
                >
                  <a
                    id="btn-pricing-signoz-enterprise-2"
                    className="button button--primary"
                    target="_blank"
                    href="https://forms.gle/zxCEoSbnnPv6mSX57"
                    onClick={() => handleClick("SelfHostedEnterprise")}
                  >
                    Get Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add ons section */}
      {/* <section>
            <div className="container" >
            <h2 className={"margin-vert--md"} >Need more help?</h2>

              <div className="row">
                <div className={"col col--4 col--offset-2 margin-vert--md"}>
                <div className="card">
                    <div className="card__header">
                        <h3>Setup Support</h3>
                        <p>200 to 1000 USD based on scale. One time fee</p>
                    </div>
                    <div className="card__body">
                        <p>


                            <li> We will help you setup your applications and infrastructure for SigNoz  </li>
                            <li> Help instrument your application with Opentelemetry libraries</li>
                            <li> Setup Dashboards and Alerts</li>


                        </p>
                    </div>
                    <div className="card__footer">
                    <a className="button button--primary" href="https://forms.gle/qpoi1XndtCyYz9EQ7" onClick={() => handleClick('SetupSupport')}>Join the waitlist</a>
                    </div>
                </div>
                </div> 

                <div className={"col col--4 margin-vert--md"}>
                <div className="card">
                    <div className="card__header">
                        <h3>Enterprise Support</h3>
                        <p> Longer term support contracts</p>
                    </div>
                    <div className="card__body">
                        <p>


                            <li> SLA guarantees</li>
                            <li> Includes installation support and upgrade assitance</li>
                            <li> Can be added onto any plan</li>
                            <li> Dedicated email/slack support</li>


                        </p>
                    </div>
                    <div className="card__footer">
                    <a className="button button--primary" href="https://forms.gle/CiUe2cCSSM9eqGmg9" onClick={() => handleClick("SLASupport")}>Reach out to us</a>
                    </div>
                </div>
                </div> 

              </div>
            </div>
      </section>       */}

      {/* Companies Logo */}
      <ShowCompanyLogos />

      {/* Data protection */}
      <DataProtection />

      {/* Talk To Expert */}
      <TalkToExpert />

      {/* More Options */}
      <CommunityEdition />

      {/* FAQ section */}
      <section className={styles.faq}>
        <div
          className={`container ${styles.faqContainer}`}
        >
          <div className="row">
            <div className="col col--8 col--offset-2">
              <p
                className={`hero__subtitle margin--md ${styles.title}`}
              >
                FAQs
              </p>
              <div className="card-demo margin--md">
                <FAQBody />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Review */}
      <UserReview />

      {/* Give a Try CTA */}
      <TrySigNozCTA />
    </Layout>
  );
}

export default pricingTest;
