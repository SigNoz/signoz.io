import React, { useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

function selfhost() {
  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [company,setCompany] = useState("");

  return (
    <Layout title="Self Host">
      <section className="selfhost">
        <div
          className="container"
          style={{ marginTop: "4rem", marginBottom: "4rem" }}
        >
          <div className="row">
            <div className="col col--6">
              <div className="card-demo margin--md">
                <div className="card no-color">
                  <div className="card__body">
                    <p className="title">SigNoz <span className="highlight"> Enterprise</span></p>
                    <ul className="dashed">
                      <li>Managed Self-Hosted SigNoz in your premise or cloud</li>
                      <li>Single Sign-On</li>
                      <li>SAML and LDAP support</li>
                      <li>AWS Private Link</li>
                      <li>Support for Dashboard configuration from expert engineers</li>
                      <li>Support plan with SLAs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col--6">
              <div className="card-demo margin--md">
                <div className="card">
                  <div className="card__body">
                    <p className="text-center form-title">Get more info on SigNoz Enterprise</p>
                    <input
                      type="text"
                      className="text-input"
                      name="email"
                      placeholder={"Email*"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required={true}
                    />
                    <input
                      type="text"
                      className="text-input"
                      name="name"
                      placeholder={"Name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={true}
                    />
                    <input
                      type="text"
                      className="text-input"
                      name="company"
                      placeholder={"Company"}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required={true}
                    />
                    <button className="submit-btn" type="button">Submit</button>
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

export default selfhost;
