import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

function support() {
    return (
      <Layout title="Support">
        <section>
        <div className="container" style={{marginTop: '8rem', marginBottom:'4rem'}}>
        <h1 class="text--center">
        Reach out to us for any queries you may have </h1>
          
          <div class="row">
            <div class="col col--4">
              <div class="card-demo margin--md">
                <div class="card">
                <div class="card__header">
                    <h3>Email</h3>
                </div>
                  <div class="card__body">
                <p>
                      Write to us at <a href="mailto:support@signoz.io">support@signoz.io</a> for any queries
                </p>
  
  
                  </div>
                  <div class="card__footer">
                  <Link
                    className="button button--secondary button--outline"
                    href={'mailto:support@signoz.io'}>
                    Email Support
                  </Link>
  
                    {/* <button class="button button--secondary button--outline button--link" href="https://twitter.com/pranay01">Twitter</button> */}
                  </div>
                </div>
              </div>
            </div>

            <div class="col col--4">
              <div class="card-demo margin--md">
                <div class="card">
                <div class="card__header">
                    <h3>Slack</h3>
                </div>
                  <div class="card__body">
                <p>
                      If you are facing any issues in getting up and running, or have a technical query
                </p>
  
  
                  </div>
                  <div class="card__footer">
                  <Link
                    className="button button--secondary button--outline"
                    href={'https://signoz.io/slack'}>
                    Slack Community
                  </Link>
  
                    {/* <button class="button button--secondary button--outline button--link" href="https://twitter.com/pranay01">Twitter</button> */}
                  </div>
                </div>
              </div>
            </div>

            <div class="col col--4">
              <div class="card-demo margin--md">
                <div class="card">
                <div class="card__header">
                    <h3>GitHub Discussions</h3>
                </div>
                  <div class="card__body">
                <p>
                      For ideas about the project or something which the community would find helpful
                </p>
  
  
                  </div>
                  <div class="card__footer">
                  <Link
                    className="button button--secondary button--outline"
                    href={'https://github.com/SigNoz/signoz/discussions'}>
                    GitHub Discussions
                  </Link>
  
                    {/* <button class="button button--secondary button--outline button--link" href="https://twitter.com/pranay01">Twitter</button> */}
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
  
  export default support;
  