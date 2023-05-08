---
title: SigNoz provides up to 7x more value for money than Datadog
slug: pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana
date: 2023-05-06
tags: [SigNoz, Product]
authors: [ankit_anand]
description: SigNoz can provide up to 7x more value for money versus Datadog. Find out how your engineering team can do more while saving money simultaneously....
image: /img/blog/2023/05/signoz_pricing_comparison_cover-min.jpg
hide_table_of_contents: false
keywords:
  - signoz
  - datadog
  - new relic
  - grafana
  - signoz pricing
  - datadog pricing
  - new relic pricing
  - grafana pricing
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"/>
</head>

import SignUps from '../docs/shared/sign-ups.md'

Democratize observability for engineering teams of all sizes!

That’s the vision that drives us every day. SigNoz is open source, provides three signals (logs, metrics, and traces) under a single pane, and is OpenTelemetry-native. And it also costs lesser than other popular observability tools.

<!--truncate-->

![Cover Image](/img/blog/2023/05/signoz_pricing_comparison_cover.webp)

We did a cost analysis of SigNoz and compared it with other vendors like DataDog, New Relic, and Grafana. SigNoz can provide up to 7x more value for money than vendors like Datadog and let your engineering team do so much more.

Here are some key takeaways from our cost analysis:

- SigNoz can provide up to **7x more value for money** than vendors like Datadog. The cost savings can enable engineering teams to send more data while spending lesser than with other observability vendors.
- User-based SaaS pricing limits the ability of engineering teams to collaborate seamlessly. SigNoz does not charge for user seats. Vendors like **New Relic can charge up to 66%** of its total bill amount just **for adding users**.
- Custom metrics are important for having a deeper understanding of your application. Vendors like Datadog can charge exorbitant rates for custom metrics. SigNoz does not charge separately for custom metrics, and with $0.1 per million samples, it is the most cost-efficient tool for metrics monitoring.

Below is the snapshot of our full stack observability cost comparison. You can have a look at our complete <a href = "https://docs.google.com/spreadsheets/d/1EEw48D7SmC-DHKanT5hoiShT-AZcIfZDc9HQiVYdZBY/edit#gid=0" rel="noopener noreferrer nofollow" target="_blank" ><b>cost comparison analysis</b></a>.


<figure data-zoomable align='center'>
    <img src="/img/blog/2023/05/full_stack_observability_cost_comparison.webp" alt="full-stack observability cost comparison"/>
    <figcaption><i>SigNoz provides the best in class value for money as compared to other observability tools</i></figcaption>
</figure>

<br></br>

Depending on the size of the engineering team, we have done cost benchmarking of three hypothetical scenarios.

- Small engineering team - 25 engineers
- Midsize engineering team - 100 engineers
- Large engineering team - 200 engineers

Datadog has a very complex SKU-based pricing structure. New Relic charges based on data ingest and user seats. Grafana charges based on the amount of telemetry data sent and user seats. SigNoz charges only on the amount of telemetry data sent.

## Small engineering team comparison

Observability should be set up from day one. For small engineering teams, getting the most value for their money is critical. Below is a breakdown of full-stack observability cost comparison for a team of 25 engineers. 

We have assumed 20 APM hosts, 50 infra hosts, and 2500 GB ingested logs.

You can find the assumptions we have taken in this <a href = "https://docs.google.com/spreadsheets/d/1EEw48D7SmC-DHKanT5hoiShT-AZcIfZDc9HQiVYdZBY" rel="noopener noreferrer nofollow" target="_blank" ><b>sheet</b></a>.

|  | SigNoz | Grafana | New Relic | Datadog |
| --- | --- | --- | --- | --- |
| **APM** <br></br>20 APM hosts, 50 M indexed spans |  |  |  | $671 |
| **Infra** <br></br>50 infra hosts, 750k container hours, 75k custom metrics |  |  |  | $5,600 |
| **Logs** <br></br>2500 GB ingested, 1560 million log events |  |  |  | $4,150 |
| **Logs** <br></br>2500 GB ingested | $1,000 | $1,200 |  |  |
| **Metrics** <br></br>13 million samples per infra host (1) | $65 | $124 |  |  |
| **Traces** <br></br>43.8 GB per APM host (2) | $350 | $388 |  |  |
| **Data Ingest** |  |  | $1,178 |  |
| **Users** | 0 | $200 | $2,333 | 0 |
| Total | **$1,415** | **$1,912** | **$3,511** | **$10,421** |
| Up to **7x more value for money** with SigNoz |  |  |  |  |


## Midsize engineering team comparison

As your business grows, the engineering team needs to scale too. Here’s a cost comparison for a hypothetical team of 100 engineers. The tech stack consists of 125 APM hosts, 200 infra hosts, and 10,000 GB ingested logs.

|  | SigNoz | Grafana | New Relic | Datadog |
| --- | --- | --- | --- | --- |
| **APM** <br></br>125 APM hosts, 500 M indexed spans |  |  |  | $4,513 |
| **Infra** <br></br>200 infra hosts, 1.5 M container hours, 250k custom metrics |  |  |  | $17,200 |
| **Logs** <br></br>10,000 GB ingested, 3000 million log events |  |  |  | $8,500 |
| **Logs** <br></br>10,000 GB ingested | $4,000 | $4,950 |  |  |
| **Metrics** <br></br>13 million samples per infra host (1) | $260 | $494 |  |  |
| **Traces** <br></br>43.8 GB per APM host (2) | $2,190 | $2,688 |  |  |
| **Data Ingest** |  |  | $5,393 |  |
| **Users** |  |  | $9,430 |  |
| Total | $6,450 | $8,932 | $14,823 | $30,213 |
| Up to **4.7x more value for money** with SigNoz |  |  |  |  |

## Large engineering team comparison

Large businesses need observability at scale. Here’s a cost comparison for a hypothetical team of 200 engineers. The tech stack consists of 225 APM hosts, 350 infra hosts, and 20,000 GB ingested logs.

|  | SigNoz | Grafana | New Relic | Datadog |
| --- | --- | --- | --- | --- |
| **APM** <br></br>225 APM hosts, 2 Billion indexed spans |  |  |  | $9,993 |
| **Infra** <br></br>350 infra hosts, 2.5 M container hours, 250k custom metrics |  |  |  | $45,500 |
| **Logs** <br></br>20,000 GB ingested, 4,500 million log events |  |  |  | $13,250 |
| **Logs** <br></br>20,000 GB ingested | $8,000 | $9,950 |  |  |
| **Metrics** <br></br>13 million samples per infra host (1) | $455 | $865 |  |  |
| **Traces** <br></br>43.8 GB per APM host (2) | $3,942 | $4,878 |  |  |
| **Data Ingest** |  |  |  | $10,292 |
| **Users** |  |  |  | $18,860 |
| Total | $12,397 | $17,292 | $29,152 | $68,743 |
| Up to **5.5x more value for money** with SigNoz |  |  |  |  |

## No limits on custom metrics with SigNoz

Custom metrics give deeper insights into the performance of your application. It can help you track key application KPIs. For a robust observability setup, your engineering and DevOps teams need the flexibility and freedom to create and send as many custom metrics as needed.

But vendors like Datadog charge $0.05 per custom metric, which limits a team’s ability to send and analyze custom metrics for monitoring.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/05/custom_metrics_pricing.webp" alt="Datadog custom metrics billing"/>
    <figcaption><i>Datadog charges $0.05 per custom metric</i></figcaption>
</figure>

<br></br>

At scale, it can constitute up to 52% of your total billing.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/05/datadog_billing_custom_metrics.webp" alt="Custom metrics billing in Datadog"/>
    <figcaption><i>Custom metrics billing can constitute a significant portion of your total bill with Datadog</i></figcaption>
</figure>

<br></br>

SigNoz does not treat custom metrics any differently. The charges remain $0.1 per million samples no matter what type of metrics you send. Hence, you can create and send custom metrics with peace of mind while using SigNoz.

## No user-based pricing, collaborate seamlessly with SigNoz

User-based pricing is outdated. An observability tool is used for debugging performance issues, and you never know which engineer might need it. At SigNoz, we don’t charge based on user seats. 

New Relic’s <a href = "https://newrelic.com/pricing" rel="noopener noreferrer nofollow" target="_blank" ><b>user pricing</b></a> can go up to $549/user. At scale, the cost of adding users can go up to 66% of the total bill.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/05/new_relic_user_seat_pricing.webp" alt="User seats billing in New Relic"/>
    <figcaption><i>User seat billing can constitute a significant portion of your total bill with New Relic.</i></figcaption>
</figure>

<br></br>

## Why choose SigNoz?

We believe in transparent and flexible pricing. As we meet with developers, engineering leaders, and executives around the world, we realized engineering teams want two things:

- Best value for their money
- Predictability of how much they will pay

We are working tirelessly to improve our offering and value to our users. After careful examination, we identified the following issues with other tools.

| Tool | Issue |
| --- | --- |
| Datadog | Has the most complex pricing structure. You will never know what you might end up paying. The internet is full of many such horror stories. |
| New Relic | High user-based pricing limits collaboration. As teams become more diverse and cross-functional, you need to collaborate seamlessly. |
| Grafana | It does not have a seamless three signals (logs, metrics, traces) in a single pane experience.  |

At SigNoz, we strive to provide the most value for your money. We are also open source, and transparency is one of our core beliefs. Using SigNoz can enable your engineering teams to do much more with their data while providing more value for the same cost as compared to other observability tools.

<SignUps />

#### References

1. [Pricing Comparison Sheet](https://docs.google.com/spreadsheets/d/1EEw48D7SmC-DHKanT5hoiShT-AZcIfZDc9HQiVYdZBY/)