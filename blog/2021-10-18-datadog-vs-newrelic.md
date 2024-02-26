---
title: DataDog vs New Relic - The Real Winner [2024 Guide]
slug: datadog-vs-newrelic
date: 2024-02-13
tags: [Tools Comparison]
authors: ankit_anand
description: Datadog and New Relic are both popular monitoring tools that provide a wide range of products covering different aspects of application and infrastructure monitoring. I sent data from a sample Spring Boot application to both Datadog and New Relic to see the difference in user experience between Datadog and New Relic...
image: /img/blog/2024/02/datadog-vs-new-relic-cover.webp
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 2
keywords:
  - datadog vs new relic
  - datadog
  - new relic
  - apm tools
  - application performance monitoring
---

<head>
  <title>DataDog vs New Relic - The Real Winner [2024 Guide]</title>
  <link rel="canonical" href="https://signoz.io/blog/datadog-vs-newrelic/"/>
</head>

import GetStartedSigNoz from '../docs/shared/get-started-signoz.md';

Both DataDog and New Relic are popular monitoring tools that provide a wide range of products covering different aspects of application and infrastructure monitoring. In this post, I have compared Datadog and New Relic on important features like APM, log management, infrastructure monitoring, OpenTelemetry support, etc. 

:::info
💡 I instrumented a sample Spring Boot Application and sent data to Datadog and New Relic to evaluate my experience. Some takeaways are subjective and based on personal preference.
:::

<br></br>



<!--truncate-->

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2024/02/datadog-vs-new-relic-cover.webp" alt="Datadog vs New Relic Blog Cover Image"/>
</figure>
<br/>

## Datadog vs New Relic: Overview

For application monitoring, both Datadog and New Relic offer the same features. The difference lies in the actual user experience. Datadog has features for security management like Cloud SIEM, which is lacking in New Relic.

My research found that Datadog gives you more granular controls, while New Relic feels simpler to start with.

Here’s a quick overview of the overall platform features and functionality of Datadog and New Relic.

<br></br>

| Feature | DataDog | New Relic |
| --- | --- | --- |
| APM | ✅ | ✅ |
| Log Management | ✅ | ✅ |
| Infrastructure Monitoring | ✅ | ✅ |
| Network Monitoring | ✅ | ✅ |
| Cloud SIEM | ✅ | ❌ |
| Real User Monitoring | 🟡 | ✅ |
| Application Security | ✅ | 🟡 |
| Log Archives | ✅ | 🟡 |
| Container Monitoring | ✅ | 🟡 |
| Free Tier | ❌ | ✅ (100GB free data per month) |


<br></br>



✅ - Available

❌ - Not Available

🟡 - Limited


## APM: Datadog for more control, New Relic for Simplicity

I instrumented a sample Java application and sent data to both Datadog and New Relic for APM. The steps are almost the same in both Datadog and New Relic, with New Relic having a few extra steps. Both New Relic and Datadog require you to install their agent as well as a programming language-specific agent, which, in my case, was a Java agent.

In Datadog, I had a hard time figuring out whether my setup was complete or not, and I found the onboarding flow of New Relic much better.

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2024/02/datadog-onboarding-tabs.webp" alt="Datadog's onboarding tab"/>
    <figcaption><i>Datadog’s onboarding flow is a bit overwhelming, with too many horizontal tabs.</i></figcaption>
</figure>
<br/>

The good thing about Datadog is it gives you a lot of control. You can set up things like collecting custom metrics (which might be [expensive](https://signoz.io/blog/datadog-pricing/)), sampling rate, and telemetry correlation between traces and logs right from the beginning.

Once the setup is done, you can see your list of spans and corresponding flamegraphs for your traces. Datadog does a good job of correlating different types of signals. You can relate info from infrastructure, metrics, network, etc., right from trace data if you have those products enabled.

<br></br>

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2024/02/datadog-apm.webp" alt="Datadog APM"/>
    <figcaption><i>Datadog’s APM showing breakdown of an internal server error</i></figcaption>
</figure>
<br/>

New Relic’s traces page shows Trace groups instead of a list of spans, which feels like a cleaner representation, and you can filter by root spans, which comes in handy in case of large trace groups.

<br></br>

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2024/02/new-relic-apm.webp" alt="New Relic APM"/>
    <figcaption><i>New Relic groups spans in Trace groups and shows important metrics about it.</i></figcaption>
</figure>
<br/>

You can get flamegraphs for your traces in New Relic, too. Compared to Datadog, New Relic has fewer options for correlation. But it is interesting to note that New Relic shows much more spans for the same call in my Java application.

<br></br>

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2024/02/new-relic-traces.webp" alt="New Relic Traces"/>
    <figcaption><i>New Relic’s Flamegraph view of traces - you can also check out corresponding logs</i></figcaption>
</figure>
<br/>

Overall, if you need a simpler experience, then choose New Relic’s APM. But if you need more control over what things you can do with your data, then choose Datadog’s APM.


## Log Management: Datadog for more filters, New Relic for quick-start

### New Relic

New Relic automatically collected logs from my Java application and showed them in their logs tab. It allows you to search your logs using Lucene, an open-source search library that allows for indexing and searching of text by breaking down text into searchable terms.

New Relic also gives you the option to query your log data using NRQL. It’s a query language developed by New Relic which has a SQL-like syntax.

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2024/02/new-relic-log-management-dashboard.webp" alt="Log Management Dashboard in New Relic"/>
    <figcaption><i>Log Management Dashboard in New Relic showing logs from instrumented Java application</i></figcaption>
</figure>
<br/>

Other key features in New Relic’s log management and how they worked with my Java application logs are:

- Takes out attributes automatically from logs.<br></br>

    <figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2024/02/new-relic-log-attributes.webp" alt="Log Attributes in New Relic"/>
    <figcaption><i>Attributes filtered from Java application logs in New Relic</i></figcaption>
    </figure>
    <br/>
    
- It provides a feature called patterns, which claims to make log data discoverable without spending a lot of time. However, it couldn’t detect any pattern in my Java application logs.

- Gives you tools to manage your log data by optimizing for storage by dropping filters.

### Datadog

For Datadog, there was no automatic collection of logs. Collecting logs is disabled by default in the Datadog agent, and you need to enable it in the agent’s config file. You also need to activate a java integration that will collect application logs from a file.

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2024/02/datadog-logs-tab.webp" alt="Log Tab in Datadog"/>
    <figcaption><i>Log Tab in Datadog showing logs from my Spring Boot Application</i></figcaption>
</figure>
<br/>

Both Datadog and New Relic have a feature to find patterns in logs automatically. While Datadog showed some patterns from my application logs, New Relic did not. Datadog offers more options to slice and dice your log data in its UI. 

Both tools provide ways to optimize log data ingestion at scale. Datadog allows you to use your own cloud storage for logs, which seems to be a handy feature for storing logs for the long term.

Compared to New Relic, setting up log collection took more time in Datadog. But Datadog provides more visualization options to see your logs.



## Infrastructure Monitoring: Tie, decide based on cost

Host monitoring in both Datadog and New Relic is good, and choosing one over the other can be a matter of personal choice. I personally like the color theme of New Relic and the representation of things like Disk usage in a table.

What’s interesting about Datadog is that it showed me a glimpse of the JVM metrics dashboard while clicking on my host. Datadog has done a really good job at correlating different types of information collected from your application and host.

<br></br>

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2024/02/datadog-infrastructure.webp" alt="Datadog infrastructure tab"/>
    <figcaption><i>Datadog showing JVM metrics without any configuration was a good experience</i></figcaption>
</figure>
<br/>

<br></br>

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2024/02/datadog-infrastructure-2.webp" alt="Datadog host monitoring dashboard"/>
    <figcaption><i>Datadog’s dashboard for host monitoring</i></figcaption>
</figure>
<br/>

<br></br>

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2024/02/new-relic-host-monitoring.webp" alt="New Relic Host Monitoring Dashboard"/>
    <figcaption><i>New Relic’s Dashboard for Host monitoring</i></figcaption>
</figure>
<br/>

If your use case is only infrastructure monitoring, then the decision comes down to cost. However, it’s not easy to figure out how much each tool will cost on a head-to-head basis as their pricing structures are very different. I recommend you sign up and do a trial for both tools, including factors like user seats(New Relic charges for user seats).

## Pricing: Beware of these things

Both Datadog and New Relic are expensive tools. The following points might help you decide which tool is better suited for your needs:

### New Relic

- Pricing is based on two things:
    - Amount of data ingested
    - User Seats
- You get 100GB of free data ingest each month.
- Post 100GB, you need to pay $0.3/GB or $0.5/GB ingested based on your plan.
- [User seats](https://signoz.io/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/#no-user-based-pricing-collaborate-seamlessly-with-signoz) can get expensive. New Relic allows only 5 full platform users in its standard plan, and the cost of full platform users can be up to $549/user per month for enterprise plans.

### Datadog

- Datadog is known for being very expensive - here’s a <a href = "https://blog.pragmaticengineer.com/datadog-65m-year-customer-mystery/" rel="noopener noreferrer nofollow" target="_blank" >scoop</a> on Datadog’s 65 million dollar bill.
- Complex SKU-based pricing. Each product(like APM, logs, infra) is priced differently, and it’s very hard to predict your actual usage.
- Datadog defines its standard set of metrics; anything outside that definition falls under the category of custom metrics. If you’re not careful, the [cost of custom metrics](https://signoz.io/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/#no-limits-on-custom-metrics-with-signoz) can be a significant component of your billing.

## OpenTelemetry Support: Not Great in Both Datadog & New Relic

OpenTelemetry is quietly emerging as the open-source standard for collecting all types of telemetry signals. There are numerous [benefits](https://signoz.io/blog/opentelemetry-use-cases/#opentelemetry-vs-vendor-based-agents-for-application-instrumentation) to using OpenTelemetry for collecting telemetry data from your applications and host.

Both Datadog’s and New Relic’s support for OpenTelemetry is [not up to the mark](https://signoz.io/blog/is-opentelemetry-a-first-class-citizen-in-your-dashboard-a-datadog-and-newrelic-comparison/), which seems reasonable as their entire product is anchored around their specific agents. 

For example, Datadog cannot link traces and logs automatically with the DataDog OpenTelemetry tools. New Relic’s documentation is better for using OpenTelemetry, but once the data gets reported, you can see the difference again.

<br></br>

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2023/09/firsclass-6.webp" alt="OpenTelemetry data in New Relic"/>
    <figcaption><i>OpenTelemetry data is segregated in New Relic and not included in the APM experience.</i></figcaption>
</figure>
<br/>

If you are looking to use OpenTelemetry, then I would recommend [SigNoz](https://signoz.io/) (of course) - an OpenTelemetry-native APM. And just like OpenTelemetry, SigNoz is also open-source. So you can have a full-stack open-source observability stack with SigNoz and OpenTelemetry.

## Datadog vs New Relic: Final Verdict

You should choose Datadog over New Relic if you are an observability expert and want more granular control over your data. That said, New Relic is not far behind in terms of features offered and can be a good solution for application observability.

Here’s a use-case-based guide for Datadog vs New Relic:

- If you want a better correlation between your signals, then choose Datadog.

- If you want to use the entire platform without worrying too much about billing, then choose New Relic, as the pricing is based on usage.

- If you want more granular controls over your data, choose Datadog.

- If your use case is Cloud SIEM, then choose Datadog.

- If your use case is real-user monitoring, then choose New Relic.

Datadog and New Relic are great products for application monitoring and observability, but they are mostly suited for bigger enterprises. And if you’re looking to use OpenTelemetry, then neither product is that well-suited. SigNoz is an OpenTelemetry-native APM that can be used as an alternative to Datadog and New Relic.

## Advantages of using SigNoz over Datadog and New Relic

Datadog and New Relic have been leaders in the application monitoring domain for many years. But they are not suited for everyone. SigNoz can be a great choice as an alternative to Datadog or New Relic. Some of the advantages of using SigNoz over Datadog and New Relic are:

- **Open-Source**<br></br>
  SigNoz is open-source, just like OpenTelemetry. Being open-source, SigNoz is more suited to use cases where privacy is a concern, as it can be self-hosted. It can also be used in a hybrid way - using open-source for the dev and staging environment and [cloud](https://signoz.io/teams/) for the production environment.

- **OpenTelemetry-native**<br></br>
  OpenTelemetry is one of the leading open-source projects backed by CNCF and second only to Kubernetes when it comes to popularity. It is also safer to have an open-source standard deeply integrated with your application and infrastructure rather than a vendor-specific agent. OpenTelemetry frees you from vendor lock-in.

  SigNoz is built to support OpenTelemetry from day 1. Our APM experience is based fully on OpenTelemetry data, and we provide features that utilize OpenTelemetry data well.

- **No user-based & host-based pricing**<br></br>
  You can add as many team members as you like when using the SigNoz cloud service. There is no charge for user seats in SigNoz. There is also no host-based pricing. You only pay for the amount of data you send.

- **No special pricing for custom metrics**<br></br>
  Custom metrics are important for getting application-specific insights. You understand your business best, so only you will be able to decide what things need to be monitored. Sending [custom metrics in Datadog](https://signoz.io/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/#no-limits-on-custom-metrics-with-signoz) can get really expensive, and there are many horror stories about unpredictable billing in Datadog.

## Getting Started with SigNoz

<GetStartedSigNoz />

## Frequently Asked Questions

#### Q: Is New Relic better than Datadog?
In some aspects, New Relic is better than Datadog. But overall, Datadog provides more granular control over your data that can provide better insights about your application performance.

#### Q: What is the difference between Datadog and New Relic?

Datadog and New Relic offer majorly similar features. The main difference between Datadog and New Relic is the lack of Cloud SIEM in New Relic. On the other hand, New Relic provides better features for real user monitoring.

#### Q: Datadog vs New Relic Cost

Datadog is a more expensive product. It has complex SKU-based pricing, which makes it difficult for engineering teams to use the platform freely. While New Relic provides free access to its entire platform and charges based on usage. But New Relic has user-based pricing - and that can be a significant portion of your entire bill at scale.

<!-- import Screenshot from "@theme/Screenshot"

Businesses are embracing digital transformation now more than ever. In most cases, the digital channel is the primary driver of revenue and growth. Customers and end-users are going online to fulfill both their daily and long-term needs.

The digital shift has made the app production environment a critical piece of an organization's success. The performance of your application in production needs to be monitored to ensure high availability at all times.

DataDog and New Relic provide numerous products to monitor applications. Some of the key products offered by both tools include:

- Application Performance Monitoring
- Infrastructure monitoring
- Log Management
- Network monitoring
- Browser or end-user monitoring

Let's compare DataDog and New Relic based on the features they provide in the above-mentioned categories.

> You can also check out [SigNoz](https://signoz.io/), a full-stack open-source APM tool. SigNoz provides logs, metrics, and traces all under a single dashboard. It is built to support OpenTelemetry natively. Choosing an open-source APM over SaaS vendors has many benefits for developers. At the same time, [SigNoz](https://signoz.io/) is built to avoid the pain of maintenance that comes with most open-source tools.

## Application Performance Monitoring

### DataDog APM

DataDog's APM provides end-to-end distributed tracing connecting frontend devices to databases.

Some of the key features of DataDog APM includes:

- Distributed tracing can track requests from user sessions to services and databases.
- Users can correlate their distributed traces to infrastructure and network metrics.
- With DataDog's APM, you can ingest 100% of your traces from the last 15 minutes. You can then retain error and high latency traces
- You can inspect code-level performance and break down slow requests.

<Screenshot
    alt="DataDog APM Dashboard"
    height={500}
    src="/img/blog/2021/09/apm_tools_datadog-min.webp"
    title="DataDog APM tool dashboard (Source: DataDog dashboard)"
    width={700}
/>

### New Relic APM

New Relic's APM covers performance monitoring for many programming languages and combines metrics from mobile and browser apps to services and databases.

Some of the key features of New Relic APM includes:

- Auto-instrumentation of eight programming languages: Java, .Net, Node.js, PHP, Python, Ruby, Go and C/C++
- Distributed tracing and sampling options for a wide range of technology stack
- Correlation of tracing data with other aspects of application infrastructure and user monitoring
- Fully managed cloud-native experience with on-demand scalability

<Screenshot
    alt="New Relic APM Dashboard"
    height={500}
    src="/img/blog/2021/10/dd_vs_nr_newrelic_apm-min.webp"
    title="New Relic APM Dashboard (Source: New Relic Dashboard)"
    width={700}
/>

## Infrastructure Monitoring

### DataDog Infrastructure Monitoring

You can monitor all your machines with DataDog's infrastructure monitoring. A DataDog agent runs on all your hosts to capture events and metrics.

Some of the key features of DataDog's infrastructure monitoring includes:

- You can see all your machines in the infrastructure list. Each machine/host has tags, aliases, metrics attached to it
- DataDog provides a Host map to visualize all your hosts on one screen
- It also provides a container map and real-time monitoring of containers

<Screenshot
    alt="DataDog Infrastructure Monitoring Dashboard"
    height={500}
    src="/img/blog/2021/10/dd_vs_nr_datadog_infrastructure-min.webp"
    title="See detailed info about your hosts on DataDog dashboard (Source: DataDog website)"
    width={700}
/>

### New Relic Infrastructure Monitoring

New Relic provides infrastructure monitoring for cloud services, dedicated hosts to containers.

Some of the key features of New Relic infrastructure monitoring includes:

- You can connect changes in your host performance with your configuration changes. You can track the configuration change of your entire infrastructure.
- If your infrastructure account is connected with the APM account, then you can troubleshoot performance issues by connecting the server-side to the application side.
- Provides integrations to collect metrics for popular platforms like AWS, GCP, Azure, Kubernetes, etc.

<Screenshot
    alt="New Relic Infrastructure Monitoring Dashboard"
    height={500}
    src="/img/blog/2021/10/dd_vs_nr_newrelic_infrastructure-min.webp"
    title="New Relic Infrastructure Monitoring Dashboard (Source: New Relic documentation)"
    width={700}
/>

## Log Management

### DataDog Log Management

DataDog log management provides capabilities to search and analyze logs at any scale.

Some of the key features of DataDog Log Management includes:

- Provides logging without limits, can ingest 100% of your logs before indexing.
- Provides log processing pipelines for 170+ common technologies
- Filter logs with a time range, tags, and full-text search
- Provides aggregation of indexed logs

<Screenshot
    alt="DataDog Log Management Dashboard"
    height={500}
    src="/img/blog/2021/10/dd_vs_nr_datadog_log_management-min.webp"
    title="DataDog log management dashboard (Source: DataDog website)"
    width={700}
/>

### New Relic Log Management

With New Relic Log Management, you can easily ingest any text-based data.

Some of the key features of New Relic log management include:

- Custom charts and visualization for log data
- Quick search response times for any volume of log data
- Provides machine learning capabilities to detect issues from your log data automatically

<Screenshot
    alt="New Relic Log Management Dashboard"
    height={500}
    src="/img/blog/2021/10/dd_vs_nr_newrelic_log_management-min.webp"
    title="New Relic Log Management Dashboard (Source: New Relic website)"
    width={700}
/>

## Network Monitoring

### DataDog Network Monitoring

Some of the key features of DataDog network monitoring include:

- Provides metrics for point-to-point communication on your infrastructure
- Granular data for network flows in a multi-cloud environment along with aggregation capabilities supported by tags
- Automatically collects tags from more than 450 integrations. You can see network volume between any two sets of tags

<Screenshot
    alt="DataDog Network Monitoring Dashboard"
    height={500}
    src="/img/blog/2021/10/dd_vs_nr_datadog_network_monitoring-min.webp"
    title="DataDog network monitoring (Source: DataDog website)"
    width={700}
/>

### New Relic Network Monitoring

Some of the key features of New Relic Network monitoring include:

- Provides pre-configured dashboards for monitoring popular cloud services like Azure, AWS, GCP, etc. and provides dynamic alerting
- Provides integrations with 100+ services. You can check the full list of <a href = "https://docs.newrelic.com/docs/integrations/amazon-integrations/" rel="noopener noreferrer nofollow" target="_blank" ><b>AWS</b></a>, <a href = "https://docs.newrelic.com/docs/integrations/microsoft-azure-integrations/azure-integrations-list/" rel="noopener noreferrer nofollow" target="_blank" ><b>Azure</b></a> and <a href = "https://docs.newrelic.com/docs/integrations/google-cloud-platform-integrations/" rel="noopener noreferrer nofollow" target="_blank" ><b>GCP</b></a> integrations
- Provides advanced Kubernetes monitoring capabilities correlating metrics from the application and the infrastructure

<Screenshot
    alt="New Relic Network Monitoring Dashboard"
    height={500}
    src="/img/blog/2021/10/dd_vs_nr_newrelic_network_monitoring-min.webp"
    title="New Relic Network Monitoring (Source: New Relic website)"
    width={700}
/>

## Browser or real-user monitoring

### DataDog Real-User Monitoring

DataDog provides end-to-end visibility into user journeys for mobile and web applications.

Some of the key features of DataDog end-user monitoring:

- Provides aggregated fronted performance metrics, with slice and dice capabilities by location, device, application, etc.
- Provides root cause analysis for slow loading times with visibility into code, network, and infrastructure
- Offers customer segmentation with the help of tags for error tracking in real-time

<Screenshot
    alt="DataDog RUM Dashboard"
    height={500}
    src="/img/blog/2021/10/dd_vs_nr_datadog_rum-min.webp"
    title="DataDog Real User Monitoring"
    width={700}
/>

### New Relic Browser Monitoring

New Relic provides monitoring for end-users using your application across web browsers, devices, operating systems, and networks.

Some of the key features of New Relic Browser Monitoring include:

- Provides full-stack visibility to identify end-user latency from backend or network issues
- Provides session performance with a heatmap of a user's interaction with the webpage
- Provides Javascript error analytics using which you can see end-user steps leading to errors

<Screenshot
    alt="New Relic Browser Monitoring Dashboard"
    height={500}
    src="/img/blog/2021/10/dd_vs_nr_browser_monitoring-min.webp"
    title="New Relic Browser monitoring (Source: New Relic website)"
    width={700}
/>

## Issues with existing monitoring vendors

DataDog and New Relic are great monitoring tools and provide a gamut of monitoring products that any organization can use. But these enterprise monitoring tools can have the following issues:

- Crazy node-based pricing
  Node-based pricing doesn’t make sense in today’s micro-services architecture. Any node which is live for more than 8hrs in a month is charged. So, unsuitable for spiky workloads

- Very costly
  These tools are very costly if you want to do things like sending custom metrics.

- Cloud-only
  Hence, not suitable for companies that have concerns with sending data outside their infra

- Closed product roadmap
  For any small feature, you are dependent on their roadmap. We think this is an unnecessary restriction for a product which developers use. A product used by developers should be extendible

The other alternative can be going for an open-source alternative. But the problem with most open-source products is that they are resource-intensive to set up, maintain and scale up. That's where [SigNoz](https://signoz.io/) comes into the picture. [SigNoz](https://signoz.io/) is a full-stack open-source APM platform with easy configuration and scalable architecture.

## An alternative to DataDog and New Relic - SigNoz

[SigNoz](https://signoz.io/) is a full-stack open-source application performance monitoring and observability tool which can be used in place of DataDog and New Relic. SigNoz is built to give SaaS like user experience combined with the perks of open-source software. Developer tools should be developer first, and SigNoz was built by developers to address the gap between SaaS vendors and open-source software.

Key architecture features:

- **Logs, Metrics, and traces under a single dashboard**<br></br>
  SigNoz provides logs, metrics, and traces all under a single dashboard. You can also correlate these telemetry signals to debug your application issues quickly.

- **Native OpenTelemetry support**<br></br>
  SigNoz is built to support <a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank" ><b>OpenTelemetry</b></a> natively, which is quietly becoming the world standard to generate and manage telemetry data.

  <Screenshot
      alt="Architecture of SigNoz with OpenTelemetry and ClickHouse"
      height={500}
      src="/img/architecture-signoz-clickhouse.svg"
      title="Architecture of SigNoz with ClickHouse as storage backend and OpenTelemetry for code instrumentatiion"
      width={700}
  />

SigNoz comes with out of box visualization of things like RED metrics.

<Screenshot
    alt="SigNoz UI showing the popular RED metrics"
    height={500}
    src="/img/blog/common/signoz_charts_application_metrics.webp"
    title="SigNoz UI showing application overview metrics like RPS, 50th/90th/99th Percentile latencies, and Error Rate"
    width={700}
/>

You can also use flamegraphs to visualize spans from your trace data. All of this comes out of the box with SigNoz.

<Screenshot
    alt="Flamegraphs used to visualize spans of distributed tracing in SigNoz UI"
    height={500}
    src="/img/blog/common/signoz_flamegraphs.webp"
    title="Flamegraphs showing exact duration taken by each spans - a concept of distributed tracing"
    width={700}
/>

You can use logs to dig deeper into application issues.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_logs.webp" alt="Logs management in SigNoz"/>
    <figcaption><i>Logs management in SigNoz</i></figcaption>
</figure>

<br></br>

You can also build custom metrics dashboard for your infrastructure.

<Screenshot
    alt="SigNoz custom metrics dashboard"
    height={500}
    src="/img/blog/2021/10/signoz_custom_dashboard-min.webp"
    title="You can also build a custom metrics dashboard for your infrastructure"
    width={700}
/>

The logs tab in SigNoz has advanced features like a log query builder, search across multiple fields, structured table view, JSON view, etc.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_logs.webp" alt="Log management in SigNoz"/>
    <figcaption><i>Log management in SigNoz</i></figcaption>
</figure>

<br></br>

Some of the things SigNoz can help you track:

- Out-of-the-box charts for application metrics like p90, p99, latency, error rates, request rates, etc.
- Distributed tracing to get end-to-end visibility of your services
- Monitor any metrics important to you, build dashboards for specific use-cases
- Logs Management equipped with a powerful search and filter query builder
- Exceptions monitoring to track exceptions in your application
- Easy to set alerts with DIY query builder
- Native support for OpenTelemetry native

## Getting started with SigNoz

You can get started with SigNoz using just three commands at your terminal.

```jsx
git clone -b main https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

<br></br>

For detailed instructions, you can visit our documentation.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

You can check out SigNoz's GitHub repo here 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

--- -->

---

#### **Related Content**

**[9x more value for money than Datadog and New Relic](https://signoz.io/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/)**<br></br>
**[SigNoz vs Datadog](https://signoz.io/comparisons/signoz-vs-datadog/)**<br></br>
**[SigNoz vs New Relic](https://signoz.io/comparisons/signoz-vs-newrelic/)**<br></br>
