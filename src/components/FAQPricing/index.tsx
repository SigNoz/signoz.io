import React from "react";
import Card from "./Card";

const FAQs = [
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
