import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import FAQBody from "@site/src/components/FAQPricing";
import ReactGA from "react-ga";
import { ShowCompanyLogos } from "../modules/company-logos";
import { RightSVG, WrongSVG } from "../svgs/common";

// ReactGA.initialize("UA-152867655-1");

const handleClick = (message) => {
  // console.log(message)
  ReactGA.event({
    category: "User",
    action: message,
  });
};

function pricingTest() {
  return (
    <Layout title="SigNoz Plans">
      <section className="pricing">
        <div
          className="container"
          style={{ marginTop: "3rem", marginBottom: "4rem" }}
        >
          <h2 className="title">
            Transparent & Predictable Pricing
          </h2>
          <p className="subtitle">
            OpenTelemetry-Native <span className="highlight">Metrics</span>,{" "}
            <span className="highlight">Logs</span>, and{" "}
            <span className="highlight">Traces</span> in{" "}
            <span className="highlight">single</span> pane of glass
          </p>
          <div className={"row"}>
            <div className={"col col--6 margin-vert--md"}>
              <div class="card">
                <div class="card__header">
                  <h3 style={{ marginBottom: "0" }}>Team</h3>
                  <p style={{ fontSize: "medium" }}>
                    For teams that need high-performing applications
                  </p>
                  <div className="price-cta">
                    <div className="price-cta-desc">
                      <span>starts at just</span>
                      <span className="highlight">$199/month</span>
                    </div>
                    <div>
                      <a
                        class="button button--primary"
                        target="_blank"
                        href="https://forms.gle/yYSkntXRRPU3MHRL7"
                        onClick={() => handleClick("SigNozCloud")}
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="card__body">
                  <div className="pricing-details">
                    <h4>Pricing</h4>
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
                      <span>$0.1 per mn ingested</span>
                    </div>
                    <p>
                      Retention: 15 days for Traces & Logs, 30 days for Metrics
                    </p>
                  </div>
                  <div className="deployment-options">
                    <h4>Deployment Options</h4>
                    <div>
                      <span>Sass</span>
                      <span><RightSVG/></span>
                    </div>
                    <div>
                      <span>Managed by SigNoz in your cloud</span>
                      <span><WrongSVG/></span>
                    </div>
                    <div>
                      <span>Single Tenant</span>
                      <span><WrongSVG/></span>
                    </div>
                  </div>
                  <div className="support">
                    <h4>Support</h4>
                    <div>
                      <span>Community Slack</span>
                      <span><RightSVG/></span>
                    </div>
                    <div>
                      <span>Email</span>
                      <span><RightSVG/></span>
                    </div>
                    <div>
                      <span>Dedicated Slack Channel</span>
                      <span>On spends above $999 and above</span>
                    </div>
                  </div>
                  <div>
                    <h4>Features</h4>
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
                      <li>Explore all features</li>
                    </ul>
                  </div>
                </div>
                <div class="card__footer">
                  <a
                    class="button button--primary"
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
              <div class="card">
                <div class="card__header">
                  <h3 style={{ marginBottom: "0" }}>Enterprise</h3>
                  <p style={{ fontSize: "medium" }}>
                    With deployment options, security and compliance features
                    and awesome support
                  </p>
                  <div className="price-cta">
                    <div className="price-cta-desc">
                      <span>starts at just</span>
                      <span className="highlight">$199/month</span>
                    </div>
                    <div>
                      <a
                        class="button button--primary"
                        target="_blank"
                        href="https://forms.gle/zxCEoSbnnPv6mSX57"
                        onClick={() => handleClick("SelfHostedEnterprise")}
                      >
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="card__body">
                  <div className="pricing-details">
                    <h4>
                      Pricing <span>(If hosted in your cloud)</span>
                    </h4>
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
                      <span>$0.1 per mn ingested</span>
                    </div>
                    <p>
                      Retention: 15 days for Traces & Logs, 30 days for Metrics
                    </p>
                  </div>
                  <div className="deployment-options">
                    <h4>Deployment Options</h4>
                    <div>
                      <span>Sass</span>
                      <span><RightSVG/></span>
                    </div>
                    <div>
                      <span>Managed by SigNoz in your cloud</span>
                      <span><RightSVG/></span>
                    </div>
                    <div>
                      <span>Single Tenant</span>
                      <span><RightSVG/></span>
                    </div>
                  </div>
                  <div className="support">
                    <h4>Support</h4>
                    <div>
                      <span>Community Slack</span>
                      <span><RightSVG/></span>
                    </div>
                    <div>
                      <span>Email</span>
                      <span><RightSVG/></span>
                    </div>
                    <div>
                      <span>Team Training</span>
                      <span><RightSVG/></span>
                    </div>
                    <div>
                      <span>Dashboard Configuration Support</span>
                      <span><RightSVG/></span>
                    </div>
                    <div>
                      <span>Developer Downtime Pairing with SLAs</span>
                      <span><RightSVG/></span>
                    </div>
                  </div>
                  <div>
                    <h4>Features</h4>
                    <p>Includes all features in Team</p>
                    <ul className="list-icon-right">
                      <li>Single Sign On</li>
                      <li>SAML and LDAP support</li>
                      <li>AWS Private Link</li>
                      <li>VPC Peering</li>
                    </ul>
                  </div>
                  <div>
                    <h4>Upcoming</h4>
                    <ul className="list-icon-right">
                      <li>Finer RBAC with custom roles</li>
                      <li>Audit Logs</li>
                    </ul>
                  </div>
                </div>
                <div class="card__footer">
                  <a
                    class="button button--primary"
                    target="_blank"
                    href="https://forms.gle/zxCEoSbnnPv6mSX57"
                    onClick={() => handleClick("SelfHostedEnterprise")}
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add ons section */}
      {/* <section>
            <div className="container" style={{ marginTop: "2rem", marginBottom: "3rem" }} >
            <h2 style={{textAlign: "center"}} className={"margin-vert--md"} >Need more help?</h2>

              <div class="row">
                <div className={"col col--4 col--offset-2 margin-vert--md"}>
                <div class="card">
                    <div class="card__header">
                        <h3 style={{marginBottom:'0'}}>Setup Support</h3>
                        <p style={{fontSize:'medium'}}>200 to 1000 USD based on scale. One time fee</p>
                    </div>
                    <div class="card__body">
                        <p>


                            <li> We will help you setup your applications and infrastructure for SigNoz  </li>
                            <li> Help instrument your application with Opentelemetry libraries</li>
                            <li> Setup Dashboards and Alerts</li>


                        </p>
                    </div>
                    <div class="card__footer">
                    <a class="button button--primary" href="https://forms.gle/qpoi1XndtCyYz9EQ7" onClick={() => handleClick('SetupSupport')}>Join the waitlist</a>
                    </div>
                </div>
                </div> 

                <div className={"col col--4 margin-vert--md"}>
                <div class="card">
                    <div class="card__header">
                        <h3 style={{marginBottom:'0'}}>Enterprise Support</h3>
                        <p style={{fontSize:'medium'}}> Longer term support contracts</p>
                    </div>
                    <div class="card__body">
                        <p>


                            <li> SLA guarantees</li>
                            <li> Includes installation support and upgrade assitance</li>
                            <li> Can be added onto any plan</li>
                            <li> Dedicated email/slack support</li>


                        </p>
                    </div>
                    <div class="card__footer">
                    <a class="button button--primary" href="https://forms.gle/CiUe2cCSSM9eqGmg9" onClick={() => handleClick("SLASupport")}>Reach out to us</a>
                    </div>
                </div>
                </div> 

              </div>
            </div>
      </section>       */}

      <ShowCompanyLogos />

      {/* FAQ section */}
      <section>
        <div
          className="container"
          style={{ marginTop: "2rem", marginBottom: "3rem" }}
        >
          <div class="row">
            {/* <div class="col col--4">
                  <p className="faq_left_panel text--center margin--md">
                    Open source and Free to self-host{" "}
                  </p>
                </div> */}

            <div class="col col--8 col--offset-2">
              <p className="hero__subtitle margin--md">
                Frequently Asked Questions
              </p>
              <div class="card-demo margin--md">
                <FAQBody />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default pricingTest;
