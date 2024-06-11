---
title: An observability tool for all stages - From early stage startups to big enterprises
slug: signoz-startups-to-enterprise
date: 2023-11-25
tags: [observability, OpenTelemetry]
authors: pranay
description: When you think about observability? Do you just think of it as an insurance? Or do you think of it as a growth driver? In this article, we will discuss how observability can be a growth driver for your business.
image: /img/blog/2023/11/complete-journey.webp
hide_table_of_contents: true
keywords:
  - opentelemetry
  - signoz
  - observability
  - growth
  - enterprise
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/signoz-startups-to-enterprise/"/>
</head>


Observability is a crucial component of a startup's journey, evolving in importance and complexity as the company grows. Understanding this evolution is key to implementing the right solutions at the right time

Observability journey of companies typically takes this route:

<!--truncate-->

![Cover Image](/img/blog/2023/11/complete-journey.webp)


When a company is just founded with 2 co-founders, observability is not a concern. They just want to get a product out and validate the idea with customers. In the initial days the idea is just to find Product Market Fit

If there is product market fit, and that’s a big IF (and many startups die before that) - it’s likely that they have a customer who is using the product. Typically if you are a SaaS startup which is hosting some application and providing it a service to users - you need to guarantee some uptime. As users are relying on your product and it’s your job to maintain it’s reliability and availability - you need to have some way to understand how your application is running, are the customers accessing it seeing if load fast ( or what’s the latency they are seeing)

### Early PMF

Typically at this stage people want to start adding logs which get emitted during the execution of the code - and be able to:
1. Understand the error message which are happening so that you can better debug when an issue occurs

1. Generating some alerts based on the number of logs with errors in them : This makes the team  react proactively

At this stage, people start with a log specific product - as that is the main need they have. ELK is a general product people start with. But:

1. ELK takes a lot of resources, specially in indexing your logs. And can be difficult to maintain at scale
2. Starting with log specific product, makes adding new signals like metrics and traces much tougher later. There’s a reason why metrics, traces and logs are called the [3 pillars of observability](https://www.oreilly.com/library/view/distributed-systems-observability/9781492033431/ch04.html)
(Add link on 3 pillars of Observability and what do they do)

Agree, that at an early stage you can just focus on problem which is an immediate issue (logs) and worry about other types of signals later is an OK approach - but it’s not the best approach.

At this stage, you can just use the community edition of SigNoz and self host it. 

- It helps you start with logs, but you have the path to
- Since, the scale won’t be very high, you can easily manage it in a self hosted instance
- You will start with OpenTelemetry which is a good standard to adopt for future proofness.


<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2023/11/complete-lifecycle.webp" alt="Complete Lifecycle"/>
    <figcaption><i>SigNoz at different stages of the company</i></figcaption>
</figure>
<br></br>
<br></br>

Some may say that you don’t need to worry about future proofness at this stage.

But interestingly, we are seeing even early stage cos which have good tech teams start with OTEL as they know how closed source vendors can be a problem for them later and everyone has heard these [horror stories](https://news.ycombinator.com/item?id=35837330) or have got burnt by them.


Starting with OpenTelemetry provides companies with a easy glide path on adding more signals like metrics and traces later. And also makes it easier to switch to other vendors later if they want to.

### Scaling 
*(10+ ppl companies)*

At this stage, companies have crossed the initial hurdle of finding ways to reach to customers, and are adding users rapidly. Generally logging is not enough. You realise that to monitor applications and infrastructure at scale, teams realise they need 

1. Metrics : To capture aggregated view of whats happening in applications and infra. Set alerts on them. 
2. Distributed tracing: Companies at this stage move from a single monolith to multiple microservices and that’s when trying to understand which downstream service is causing issue during a request becomes very important.
3. Set alerts on top of metrics and tracing data, so that you can more granularly get notifications if something is going wrong in your system

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2023/11/p99-latency-light.webp" alt="p99 latency"/>
    <figcaption><i>Application latency charts</i></figcaption>
</figure>
<br></br>
<br></br>



They also typically have 1 fulltime devops/SRE hire

Generally ppl prefer hosted observability services here, as they are a small team and they want to scale rapidly. They don’t want to spend engineering resources to operate an observability tool (nor should they)

[point to article on `build vs buy for observability tool`]

### Enterprise

<!-- *(100+ team members, ? dev team size)* -->

When companies grow bigger, have established businesses and large teams - their needs changes. They have multiple business units each of which may have a bit different  use cases (multitenancy) 

They need good integrations with other tools like identity providers (like Okta), ticketing system (like Service Desk) etc.

At this stage they typically have an in-house devops/platform  team of at leats 3-4 members

- Privacy becomes a concern
- Self hosting may economically make more sense
- 

[ SigNoz as a good solution for each stage of your company journey - illustrate why scaling with SigNoz is easier and seemless]

- Start with community edition in a single machine
- Use hosted service and scale with our cloud plan
- Self host with enterprise plan if you have following concerns
    - Data in your cloud
    - better pricing
    - No egress cost

Or use enterprise hosted plans by us with advanced features like AWS private link, access data via APIs, have advanced integration like LDAP, SAML, etc.

<!-- <Image showing features of SigNoz helpful at different stage of the company> -->

<!-- <figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2023/11/SigNoz-Complete.webp" alt="p99 latency"/>
    <figcaption><i>SigNoz at different stages of the company</i></figcaption>
</figure>
<br></br>
<br></br> -->



### Importance of OpenTelemetry

- Adopting OpenTelemetry even in early stages sets the right foundation which is future proof, and vendor agnostic -so that you don’t get vendor locked-in to a particular vendor
- Adding more signals becomes easy as it has support for metrics, traces & logs - and new signals are being added ( like [Profiling](https://github.com/open-telemetry/oteps/pull/212)) 
- Advantage of leveraging a rich ecosystems of tooling being built on top of OpenTelemetry like tools to enable [integration testing](https://signoz.io/blog/signoz-tracetest-opentelemetry-native-observability-meets-testing/) from OpenTelemetry traces.
- OpenTelemetry is a CNCF project, and has a lot of momentum behind it. It’s the future of observability and is currently the 2nd most active CNCF project after Kubernetes. So, it’s a safe bet to adopt it.


We believe that OpenTelemetry is the future of observability and hence at SigNoz we are natively built on OpenTelemtry from Day 1. This makes us much more feature rich for Otel and default support for OpenTelemetry semantic conventions. Other propertiary sometimes support for OpenTelemetry as an afterthought and hence are [not as feature rich](https://signoz.io/blog/is-opentelemetry-a-first-class-citizen-in-your-dashboard-a-datadog-and-newrelic-comparison/) as SigNoz.


### Conclusion

---

## Further Reading

[Complete Guide on OpenTelemetry Collector](https://signoz.io/blog/opentelemetry-collector-complete-guide/)

[An OpenTelemetry-native APM](https://signoz.io/blog/opentelemetry-apm/)

---
