---
title: Monitor your Python application with OpenTelemetry and SigNoz
slug: opentelemetry-python
date: 2021-08-17
tags: [opentelemetry, python-monitoring]
author: Ankit Anand
author_title: SigNoz Team
author_url: https://github.com/ankit01-oss
author_image_url: https://avatars.githubusercontent.com/u/83692067?v=4
description: End-to-end performance monitoring of Python application with OpenTelemetry. Get your telemetry data visualized with SigNoz....
image: /img/blog/2021/08/opentelemetry_java_auto_instrumentation-min.png
keywords:
  - opentelemetry
  - opentelemetry python
  - distributed tracing
  - observability
  - python monitoring
  - python instrumentation
  - signoz
---

OpenTelemetry is a vendor-agnostic instrumentation library under CNCF. It can be used to instrument your Python applications to generate telemetry data. Let's learn how it works and see how to visualize that data with SigNoz.

<!--truncate-->

**The cost of a millisecond.**<br></br>
TABB Group, a financial services industry research firm, <a href="https://research.tabbgroup.com/report/v06-007-value-millisecond-finding-optimal-speed-trading-infrastructure" rel="noopener noreferrer nofollow" target="_blank">estimates</a> that if a broker's electronic trading platform is 5 milliseconds behind the competition, it could cost $4 million in revenue per millisecond.

The cost of latency is too high in the financial services industry, and the same is true for almost any software-based business today. Half a second is enough to kill user satisfaction to a point where they abandon an app's service.

Capturing and analyzing data about your production environment is critical. You need to proactively solve stability and performance issues in your web application to avoid system failures and ensure a smooth user experience.

In a microservices architecture, the challenge is to solve availability and performance issues quickly. You need observability for your applications. And, observability is powered with telemetry data.
