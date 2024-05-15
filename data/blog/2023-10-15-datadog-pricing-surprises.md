---
title: Datadog Pricing - Beware These Surprises in 2024
slug: datadog-pricing
date: 2023-10-26
tags: [Observability]
authors: nicamellifera
description: This piece explores two ways that Datadog’s pricing is often much larger than expected for small and mid-size engineering teams. The first is the per-host pricing that affects microservice architectures, and the second is custom metrics that can quickly get out of control and inflate your Datadog bill.
image: /img/blog/2023/10/datadog-pricing-cover-min.jpg
hide_table_of_contents: false
keywords:
  - observability
  - budget
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/datadog-pricing/"/>
</head>

Datadog has a huge product footprint with a sophisticated user experience, but any discussion of its usefulness must include a consideration of its significant costs. Datadog pricing is complex and has a lot of SKUs that a customer needs to understand. If you're not careful, you might end up blowing your Datadog bill.

<!--truncate-->

![Cover Image](/img/blog/2023/10/datadog-pricing-cover.webp)
It’s likely that your business isn’t at the scale that it will generate a <a href = "https://twitter.com/TurnerNovak/status/1654577231937544192" rel="noopener noreferrer nofollow" target="_blank">$65 million bill</a>, but it is possible to generate bills that <a href = "https://twitter.com/kellabyte/status/1704949192957874190" rel="noopener noreferrer nofollow" target="_blank">rival your operations bills</a>.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/10/dd-pricing.webp" alt="a tweet reading DataDog really needs to adjust their pricing BIGTIME. They have advantage over all these log processing dashboarding solutions.
DataDog should have faster queries+ drastically lower storage costs yet for many orgs their datadog cost is higher than the system under observation."/>
    <figcaption><i>Kelly Sommers is saying something we all know: unchecked, datadog bills can equal your operations bills</i></figcaption>
</figure>

This piece explores two ways that Datadog’s pricing is often much larger than expected for small and mid-size engineering teams. The first is the per-host pricing that affects microservice architectures, and the second is custom metrics that can quickly get out of control and inflate your Datadog bill.

## Datadog's Per host Pricing and its discontents

Datadog's pricing is tied directly to the number of hosts monitored. In dynamic environments, especially those with microservices, the amount of data can fluctuate significantly. This makes it challenging to predict costs. Datadog's per-host pricing model can be particularly challenging for architectures that rely heavily on microservices. Here's why:

### Tiny hosts? Inactive hosts? They all cost under Datadog

In a microservices architecture, services are often distributed across multiple hosts for scalability and fault tolerance. Each host running a part of the service counts toward the per-host pricing, increasing the overall cost. Some users report that <a href = "https://news.ycombinator.com/item?id=35837330#35865473" rel="noopener noreferrer nofollow" target="_blank">Datadog costs more to monitor your AWS t3.medium instance than the actual instance.</a> This pricing structure tends to favor users who use larger, higher-resource instances which often don’t make sense for a proper microservice system. For users using straightforward, even medium sized AWS instances, you can again find observability costs outstripping infrastructure costs.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/10/dd-pricing-2.webp" alt="a hacker news comment reading Datadog costs more to monitor your AWS t3.medium instance than the actual instance.
I asked them how them can justify that.
They recommended I use modern infrastructure which means Docker."/>
    <figcaption><i>It's generally not great to be changing your architecture just to make observability affordable.</i></figcaption>
</figure>

### Dynamic Scaling can make the situation worse

Microservices often use dynamic scaling to handle varying loads, which can lead to a fluctuating number of hosts. This makes it difficult to predict costs accurately. Further, in some containerized environments, you have a choice to lose the accurate hostname or accept that every auto-scaled host will have a direct pricing impact.

Microservices are designed to do one thing well, meaning you might have many small services running on separate hosts. This granularity can inflate the number of billable hosts.

### Development and Testing

The development and testing environments often mirror the production setup to some extent. This adds additional hosts that also count toward the pricing. When we’re monitoring development, test, and staging environments, often a self-hosted solution makes sense for these private, internal, low volume hosts. That option doesn’t exist with Datadog, so if you want to monitor these pre-production environments you’ll have to pay the full rate per host and send your data to the Datadog servers.

## Datadog's Custom Metrics Pricing can get out-of-control quickly

A number of comments all over Reddit and Hacker News, mention that Datadog’s billing on <a href = "https://twitter.com/TurnerNovak/status/1654577231937544192" rel="noopener noreferrer nofollow" target="_blank">custom metrics is surprisingly high</a>. At first, the ten cents per hundred ingested custom metrics seems more than fair: after all, when I’m manually adding calls in my code to send custom metrics, it would take me hours and hours to even add a few dozen new metric names, so surely I’m just paying a few bucks for custom metrics, right?

In reality this cost can get out-of-control easily through two very common patterns:

### Cause #1 of huge custom metric bills: data cardinality

Often, we’re encouraged to start with custom metrics by manually adding calls to create metrics, which seems like an inherently limited technique. But what happens if I start sending a metric like `{user.path:status.code}`? If the key is dynamic, I can create a huge metric space very quickly. Ideally, I’d limit this somewhat to make sure my data is useful, but there are plenty of reasons why we’d want to store a space of tens of thousands of possible keys. Worse, there’s no built-in system in Datadog to clamp metric explosion automatically.

This is all a significant issue since in general it’s very bad if Operations teams are looking at a big bill and the only way to improve the situation is to commit code changes to the core application. Not only is this a difficult feedback process, it’s another time when we end up punishing our coders for trying to add observability data. It would be much better if there were some way to do ops-level config to clamp cardinality, as there is with the OpenTelemetry Collector.

### Huge custom metrics bill culprit #2: Integrations

Even more surprising than our own custom metrics’ ability to swell observability bills, is integrations with other tools. Interactions with plug-ins’ and integrations code and your own production data can cause custom metrics to increase significantly. The list of integrations which by default send unpredictable numbers of custom metrics is quite a list:

Will send custom metrics by default with no built in limits:
Nagios /PDH Check /OpenMetrics /Windows performance counters /WMI /Prometheus

Will send custom metrics if so configured, with no built in limit on the number of keys reported:

MySQL /Oracle /Postgres /SQL Server

Finally, cloud integrations with AWS can also send custom metrics. It’s hard to imagine running a modern service without using some of the resources listed above, and wanting to monitor them with your Observability tool.

### How custom metrics are counted and how it punishes microservices

In a theoretical example with custom metrics, we often start with a single call generated a large number of metrics due to having a large space for possible keys. In reality, the situation is much worse if you have a modern microservice architecture. We’ve discussed previously how host-based pricing penalizes smaller, lighter containers. Here with custom metrics, we get another nasty shock: custom metrics are counted by unique keys, values, and tags. One of the most basic tags is the host, so every single container that generates custom metrics is creating unique metrics and will quickly impact your budget.

You may want to sample your metrics at the cost of sending more metrics. It would be tempting to try sampling your data and sending distribution metrics instead. But since Datadog charges not by the number of metric values but rather by their keys, sending distribution metrics _increases the number of metrics used five-fold._ As each metric now also includes count, sum, min, max, and avg.

### Doing the math on Datadog’s Custom metrics

The Datadog documentation site is quick to point out that you will only be charged for custom metrics if you purchase the appropriate SKU, and without that SKU you can send 300 metrics for free (well, included in the cost of your other products but still, no additional cost). Let’s review a scenario to see how a single latency metric can use up all 300 of those metrics:

---

You’re a smart, in-the-know SRE who wants to add latency metrics for an unsupported framework. You know that Datadog custom metrics are expensive so you keep things simple. Just a route with status code for the key, and a latency measurement as a value:

```json
{route:user.login,
status:200,
latency:20}
```

You group up route and log in so the actual metric is `{user.login-status.200-latency:20}` a nice, compact metric. There are only ten different endpoints, so you know things will be well clamped. For safety’s sake and in case some reports are dropped, you report distribution and percentile metrics as well. You add the few lines of code to report your metrics, and head off for the weekend. When you come in on Monday there’s three voicemails from Datadog, saying you need to add a SKU because you reported over 300 metrics in the last day. What happened?

All Datadog custom metrics are tagged by host. So you were actually reporting `{hostA-user.login-status.200-latency:20}` . You have five services that are instrumented with Datadog, so instead of reporting 10 metrics for each of your endpoints, you’re actually reporting 50 metrics, ten for each host. And since you responsibly reported distribution values to make your life easier, you’re also reporting `p50`, `p75`, `p90`, `p95`, and `p99` AND `count`, `sum`, `min`, `max`, and `avg` for every combination of host and endpoint. Your single added metric is now 10 endpoints, times 5 hosts, times 10 summary metrics or 500 metrics. Without Datadog’s custom metrics SKU you just exhausted all 300 custom metrics at once.

Do you have more than five hosts running your code? In this example, we always returned a status code of `200`, just a few more status codes would multiply the problem further.

What would that math look like if you had just a moderately complex application, served on a few hosts? For example, we have a simple application that returns a status code of `200` or `500` depending on the request, on 25 routes, with 6 hosts in 2 regions. We want to store distribution values for these routes as well. The result for costs in a single month:

25 routes _ 6 hosts _ 2 regions _ 10 metrics _ 5 possible status codes = 15000 metrics, meaning you'll pay $15 in just the first few days of metrics collection.

The story gets worse from there, the documented prices are just for _collecting_ metrics, not for _indexing_ them, so you can't query these metrics, and the cost of metrics indexing varies by contract and isn't published by datadog.

### Why are Datadog custom metrics so expensive?

There are a variety of possible reasons why the pricing for Datadog’s custom metrics are so high. It may be that their data backend struggles with high cardinality keys. However, a slightly more sinister explanation has to do with vendor lock in. While integrations and other plug ins can produce custom metrics, the primary way these metrics are created are by inserting custom calls into your application code to send metrics to the Datadog agent.

These custom metrics calls within your code do not use any open standard or library, and as such they can only ever report data to the Datadog agent. As such, when you start reporting custom metrics you are signaling to Datadog that you’re ‘locked in’ and planning to stay with Datadog as your observability platform in the long term. This makes your organization less sensitive to price increases.

## You can do better than Datadog, OpenTelemetry can help

OpenTelemetry offers a cost-effective alternative to Datadog. Being an open-source project, it eliminates the licensing costs associated with proprietary solutions like Datadog. Another advantage of OpenTelemetry is that it reduces vendor lock-in, offering greater flexibility to switch between different observability solutions without undergoing a massive overhaul of the existing setup. Companies can choose to store their observability data in cost-efficient backends, and they have the flexibility to select from a range of open-source storage and visualization tools like SigNoz, Grafana, or Loki.

To go further, read a comprehensive price breakdown of how Datadog can cost <a href = "https://signoz.io/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/#no-limits-on-custom-metrics-with-signoz" rel="noopener noreferrer nofollow" target="_blank">9x more than OpenTelemetry and SigNoz.</a>
