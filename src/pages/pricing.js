import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import FAQBody from "@site/src/components/FAQPricing";
import ReactGA from "react-ga";
import { ShowCompanyLogos } from "../modules/company-logos";



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
      <section>
      <div className="container" style={{marginTop: '2rem', marginBottom:'4rem'}}>
        
        <h2 style={{textAlign: "center"}} > A Plan for team of Every size </h2>
        <p style={{textAlign: "center"}}> Our aim is to make SigNoz accessible to everyone. Read our philosophy on pricing <a target="_blank" href="https://signoz.notion.site/Our-Thoughts-on-Pricing-73f5e6939c1f42be905fe937b4107dad">here</a></p>

        <div className={"row"}>
            <div className={"col col--4 margin-vert--md"}>
                <div class="card">
                    <div class="card__header">
                        <h3 style={{marginBottom:'0'}}>Community</h3>
                        <p style={{fontSize:'medium'}}>Free</p>
                    </div>
                    <div class="card__body">
                        <p>
                            <li> Open Source </li>
                            <li> Self Hosted </li>
                            <li> Key metrics like Latency, Error rates </li>
                            <li> Debug performance issues with Traces </li>
                            <li> Dashboard for Infrastructure and custom metrics </li>
                            <li> Community Support </li>
                        </p>
                    </div>
                    <div class="card__footer">
                    <Link
                      className="button button--primary"
                      href={"/docs/"}
                      onClick={() => handleClick('CommunityEdition')}
                    >
                     Get Started 
                    </Link>
                    </div>

                </div>
            </div>
            <div className={"col col--4 margin-vert--md"}>
                <div class="card">
                    <div class="card__header">
                        <h3 style={{marginBottom:'0'}}>SigNoz Cloud</h3>
                        <p style={{fontSize:'medium'}}>Starts from USD 200/month</p>
                    </div>
                    <div class="card__body">
                        <p>

                            <li> Hosted and Managed by SigNoz </li>
                            <li> Single Sign On and SAML support included</li>
                            <li> Easily shift to self hosted if needed</li>
                            <li> Slack Support for initial setup </li>
                            <li> Usage based pricing based on data you send us</li>
                        

                        </p>
                    </div>
                    <div class="card__footer">
                    <a class="button button--primary"
                     target="_blank"
                     href="https://forms.gle/yYSkntXRRPU3MHRL7" 
                     onClick={() => handleClick('SigNozCloud')}
                     >Reach out to us</a>
                    </div>
                </div>
            </div>
            <div className={"col col--4 margin-vert--md"}>
                <div class="card">
                    <div class="card__header">
                        <h3 style={{marginBottom:'0'}}>Enterprise Self Hosted</h3>
                        {/* <p style={{fontSize:'medium'}}>Open for Early access</p> */}
                    </div>
                    <div class="card__body">
                        <p>
                            <li> Single Sign On </li>
                            <li> SAML and LDAP support</li>
                            {/* <li> Visualise very large traces (>10k spans) with hierarchical navigation</li> */}
                            <li> AWS PrivateLink </li>
                            <li> Dashboard configuration support</li>

                            <br></br>
                            <div style={{fontSize:'medium'}}>Upcoming features</div>
                            {/* <li> Predictive Resource Optimization  </li> */}
                            <li> Finer RBAC with custom roles</li>
                            <li> Audit Logs</li>



                        </p>
                    </div>
                    <div class="card__footer">
                    <a class="button button--primary" target="_blank" href="https://forms.gle/zxCEoSbnnPv6mSX57" onClick={() => handleClick('SelfHostedEnterprise')}>Request Access</a>
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

      <ShowCompanyLogos/>


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
