import React from "react";
import Layout from "@theme/Layout";
import Head from '@docusaurus/Head';

function verifyemail() {
  return (
    <Layout title="Book a Call">
    <Head>
        <meta name="robots" content="noindex" />  
        {(typeof window != "undefined") && <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js"></script>}
    </Head>
      <section>
        <div
          className="container"
          style={{ marginTop: "8rem", marginBottom: "4rem" }}
        >


<div class="hero shadow--lw">
  <div class="container">
    <h1>We have sent you a Verification Email</h1>
    <p class="hero__subtitle"> 
    Please click the Verify Email button to confirm your email.
    <br />
    After that, we'll send your SigNoz cloud account login details to your email.    </p>
    <br />
    <p class="hero__subtitle" style={{ fontStyle: "italic"}}>Got a question about SigNoz? 
    <br />
    Pick a time from the calendar below to set up a call. We'll walk you through the product and address any queries you have.
    </p>

    <div class="calendly-inline-widget" 
        data-url="https://calendly.com/pranay-signoz/signoz-intro-calls/" 
        style={{minWidth:'320px', height:'700px'}}>
    </div>

  </div>
</div>
        

         

        </div>
      </section>
    </Layout>
  );
}

export default verifyemail;
