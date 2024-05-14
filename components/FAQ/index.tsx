import React from "react";
import Card from "./Card";

const FAQs = [
  {
    body: "SigNoz is more than an APM. We provide all features like metrics and request traces which APMs provide. On top of that. we provide advanced filtering on trace data and custom aggregation on it",
    title: "I am looking for an application monitoring tool, is SigNoz an APM?",
  },
  {
    body: "Few ways in which SigNoz is more advanced than Jaeger : Jaeger UI doesn’t show any metrics on traces or on filtered traces, and Jaeger can’t get aggregates on filtered traces. For example, Cassandra doesn’t support Group By, Max, etc.",
    title: "How does SigNoz compare to Jaeger?",
  },
  // {
  //   body: "SigNoz will be always open-source and free to be self-hosted for smaller teams. We will have role based Pricing for our enterprise edition which will have advanced features needed by bigger teams. Though for users who want hosted version of SigNoz, we do have cloud plans.",
  //   title: "What will be your paid plan like?",
  // },
  {
    body: "Prometheus is good if you want to do just metrics. But metrics are just one aspect of monitoring. Ideally, you would also use other telemetry signals like logs and traces to set up a robust monitoring framework for your application. SigNoz provides logs and traces too, everything under a single pane of glass.",
    title: "How is SigNoz different from Prometheus?",
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
