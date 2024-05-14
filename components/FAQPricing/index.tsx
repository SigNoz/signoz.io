import React from "react";
import Card from "./Card";

const FAQs = [
  {
    body: "You can self-host and manage the community edition yourself. You should choose SigNoz Cloud if you don’t want to worry about managing the SigNoz cluster. There are some exclusive features like unlimited dashboards for logs & traces and SSO & SAML support, which come with SigNoz cloud offering. Our team also offers support on the initial configuration of dashboards & alerts and advises on best practices for setting up your observability stack in the SigNoz cloud offering.",
    title: "What is the difference between SigNoz cloud(Teams) and community edition?"

  },
  {
    body: "If a timeseries sends data every 30s, then it will generate 2 samples per min. So, if you have 10,000 time series sending data every 30s then you will be sending 20,000 samples per min to SigNoz. This will be around 864 mn samples per month and would cost 86.4 USD/month",
    title: "How are number of samples calculated for metrics pricing?",
  },
  {
    body: "Yes, feel free to reach out to us on <a mailto='hello@signoz.io'>hello@signoz.io</a> if you need a dedicated support plan or paid support for setting up your initial SigNoz setup",
    title: "Do you offer enterprise support plans?",
  },
  {
    body: "Teams which need enterprise support or features like SSO, Audit logs, etc. may find our enterprise plans valuable",
    title: "Who should use Enterprise plans?",
  },
];

const FAQBody = () => (
  <>
    {FAQs.map((faq, idx) => (
      <Card body={faq.body} title={faq.title} key={`${idx}${faq.title}`} />
    ))}
  </>
);

export default FAQBody;
