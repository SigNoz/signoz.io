---
title: Cost benchmarking - Self hosting SigNoz vs using a SaaS vendor
slug: signoz-benchmarks
date: 2021-02-02
tags: [benchmarks, distributed-tracing, application-monitoring]
author: Ankit Nayan
author_title: SigNoz Team
author_url: https://github.com/ankitnayan
author_image_url: https://avatars.githubusercontent.com/u/12460410?v=4
description: With changing privacy laws, it's getting riskier to send your data to third party SaaS vendors. In the observability domain, traces and logs are something which you don't want to send outside. Let's find out why self-hosted software solutions are replacing SaaS providers now.
image: /img/blog/2021/04/signoz-benchmarks-1.png
keywords:
  - SigNoz
  - DataDog pricing
  - Cost Benchmarking
  - SigNoz pricing
  - APM vendors
---

In this post we want to lay out typical price which someone would incur in running SigNoz. This would give potential users an idea of what resources they would need to provision & typical monthly cost at different application load and sampling rates.

<!--truncate-->

![Cover Image](/img/blog/2021/04/signoz-benchmarks-1.png)

In this post we would benchmark the cost of self hosting SigNoz and the price you will pay to SaaS APM vendors. For benchmarking, we will take **DataDog** as an example - as it is one of the more popular APM tools in the market.

This would give potential users an idea of what resources they would need to provision & typical monthly cost at different application load and sampling rates.

### DataDog’s APM pricing (as on 8 Feb 2021)

USD 31 per host per month

- 15-minute Live Search & Analytics (150GB incl.)
- 15-day Historical Search & Analytics (1M Indexed Spans incl.)
- 15-month metric retention
- 1.7 USD/mn spans for 15 day retention

[

Pricing | Datadog

Flexible, clear pricing for modern infrastructure and applications of any scale.

![](https://web.archive.org/web/20210208145414im_/https://imgix.datadoghq.com/img/favicons/apple-touch-icon.png)Datadog Logo

![](https://web.archive.org/web/20210208145414im_/https://imgix.datadoghq.com/img/navbar/menu/features.svg)
](https://web.archive.org/web/20210208145414if_/https://www.datadoghq.com/pricing/?product&#x3D;apm#apm)
To compare the cost of running DataDog APM & SigNoz, we will take 15 day retention as the standard - as that is what DataDog uses as default.

We will take **90 RPS **workload as an example to compare cost of running DataDog and SigNoz. We are creating more detailed benchmark frameworks. This is just a first attempt at this.

> Please, note that 90 RPS is the ingested and retained trace rate. Many companies sample trace extensively ( upto 0.5%) but here we are comparing trace volume sent RPS.

> For example, if you are sampling traces at 1%, then you can  handle upto **9000 RPS** with below costs - both for SigNoz & DataDog.

### DataDog APM cost

![](/img/blog/2021/02/datadog-cost-90rps.jpg)DataDog costs for 90 RPS at 50 spans/ request
5832 mn spans with each span around 0.3 KB = 1.75 TB  @ 0.08 USD/GB-month = 140 USD/month

### Cost of running SigNoz

For running this on SigNoz, we tested it on a EKS cluster of 3 nodes with 8GB RAM (t3.large). Monthly cost for t3.large (8 GB RAM, 2 CPU) is ~42 USD/ month ( with 30% annual reserved instance discount)
![](/img/blog/2021/02/signoz-cost-90rps-1.jpg)SigNoz cost for 90 RPS at 50 spans/request
Disc cost for 15 day retention at 0.08 USD/GB-month

Total SigNoz cost ~** 338 USD per montt**

Although this setup works at less than 60% utilisation, some users may still want to have redundancy.

### At least 10x cost improvement over DataDog

For 2x redundancy, cost for running SigNoz = 676 USD per month

Improvement over DataDog = 19982/676 = 29x improvement over DataDog's cost. Even if we add more level of over provisioning which different devops teams may want to add, we expect at least 10x improvement of cost over DataDog at this scale.

---

And finally, this  is how it looks on your SigNoz dashboard 🤓
![](/img/blog/2021/02/signoz-dashboard-90rps.jpeg)SigNoz running at 90 rps

### If this sounds interesting, check out our [GitHub](https://github.com/SigNoz/signoz) repo and get started with SigNoz.
