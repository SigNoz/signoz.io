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
    <h2> Thank you for signing up for SigNoz Cloud. Please check your email for next steps</h2>
    
    <p style={{fontStyle:"italic"}}>
    If you have not received the email in a few minutes, please check your spam folder.
    </p>
    {/* <p class="hero__subtitle" style={{ fontStyle: "italic"}}>Got a question about SigNoz? 
    <br />
    Pick a time from the calendar below to set up a call. We'll walk you through the product and address any queries you have.
    </p>

    <div class="calendly-inline-widget" 
        data-url="https://calendly.com/pranay-signoz/signoz-intro-calls/" 
        style={{minWidth:'320px', height:'700px'}}>
    </div> */}
    <br />
    
    <a class="button button--primary" href="mailto:cloud-support@signoz.io" > Contact Support </a>


  </div>
</div>
        

         

        </div>
      </section>
    </Layout>
  );
}

export default verifyemail;
