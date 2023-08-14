import React from "react";
import Layout from "@theme/Layout";
import Head from '@docusaurus/Head';

function cloudzoom() {
  return (
    <Layout title="Book a Call">
    <Head>
        <meta name="robots" content="noindex" />  
        <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js"></script>
    </Head>
      <section>
        <div
          className="container"
          style={{ marginTop: "8rem", marginBottom: "4rem" }}
        >


<div class="hero shadow--lw">
  <div class="container">
    <h1>Thanks for your interest in SigNoz Teams plan!</h1>
    <p class="hero__subtitle"> An expert will reach out shortly to understand your requirements and get you started with your SigNoz cloud instance.
    </p>

    <p class="hero__subtitle">If you are interested in booking a call right away, feel free to book an available time slot from the below calendar.
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

export default cloudzoom;