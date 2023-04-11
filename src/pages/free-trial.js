import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

function freetrial() {
  return (
    <Layout title="Free Trial End">
      <section>
        <div
          className="container"
          style={{ marginTop: "8rem", marginBottom: "4rem" }}
        >
         
          <div class="row">
            <div class="col col--6 col--offset-3">
              <div class="card-demo margin--md">
                <div class="card">
                  <div class="avatar margin--md">
                
                    <div>
                      <h3 style={{textAlign: 'center' }}>End of Free Trial</h3>
                    </div>
                  </div>
                  <div class="card__body">
                    <p>
                    Thanks for trying out SigNoz Cloud plan. Your trial period for SigNoz Cloud plan has ended. 
                      <br></br>
                      <br></br>
                    Please reach out to your SigNoz contact to get your paid plan enabled.
                    </p>
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

export default freetrial;
