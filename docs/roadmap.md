---
id: roadmap
title: Product Roadmap
---

We are focused on building an integrated observability tool which can be a superior alternative to current SaaS products like DataDog

The following items are in our roadmap currently

### Custom Metrics

Support for custom metrics ingestion into SigNoz

### Alert management

We plan to build upon prometheus alert manager for our use case, primarily to have alerting as code - similar to Prom alerts

### Tail based sampling

The decision of which spans to sample is crucial in distributed tracing. "Tail-based sampling" means that trace-retention decisions are done at the tail end of processing after all the spans in a trace have arrived.

We plan to focus on this to ensure that only 'interesting' traces are ingested. This will ensure that we don't miss any interesting traces, even though the actual number of traces ingested/retained is much lower.

### Log Management

We are primarily focused on metrics & traces at the moment and a seamless experience between them.

However, we do have log management in our roadmap. But we are waiting for OpenTelemetry logs to get mature (it is in alpha currently) and plan to support it, as we have native support for OpenTelemetry.


### Anomaly detection framework

A framework to provide dynamic thresholding capabilities to enable better Signal to Noise in alerts. One of the projects we are closely following in this space is LinkedIn's [Third Eye](https://engineering.linkedin.com/blog/2019/01/introducing-thirdeye--linkedins-business-wide-monitoring-platfor) If you know of any other good frameworks, please share in [Github Discussions](https://github.com/SigNoz/signoz/discussions)

---

We believe in taking feedback from our community. Feel free to jump to our [Github Discussions](https://github.com/SigNoz/signoz/discussions) if you have any idea or feature we should build first. We are all ears 👂👂
