---
id: overview
title: Overview
description: Instrumentation Overview

---


Instrumentation is the process of enabling your application code to generate telemetry data - anything that assists you in monitoring or measuring the performance and state of your application.

SigNoz supports [OpenTelemetry](https://opentelemetry.io/) for instrumenting applications.

**OpenTelemetry** is the leading open-source project that provides instrumentation libraries for major programming languages and popular frameworks. It is a project under Cloud Native Computing Foundation and is backed by a huge community. It provides a standardized data format for collected data, eliminating the need for specific vendor integrations.

<!-- **OpenTelemetry** is a single, vendor-agnostic instrumentation library per language with support for both automatic and manual instrumentation. It provides open-standard semantic conventions to ensure vendor-agnostic data collection. -->

This [guide](https://opentelemetry.io/docs/concepts/instrumenting) introduces the basic concepts of instrumentation using OpenTelemetry. OpenTelemetry also has an ecosystem of libraries, plugins, integrations, and other useful tools which extend it. You can find these resources at Otel Registry [here](https://opentelemetry.io/registry/).

_You can instrument using any open-standard library and use SigNoz as your observability backend to ingest, analyse and visualize data._

For instrumenting your code, you can use the instruction provided by OpenTelemetry for specific langauges.

SigNoz currently provides simple ways to instrument NodeJS, Java, Python and Golang applications using OpenTelemetry. Please follow the below guides.

1. [OpenTelemetry Python Instrumentation](/docs/instrumentation/python/)
2. [OpenTelemetry Javascript Instrumentation](/docs/instrumentation/javascript/)
3. [OpenTelemetry Java Instrumentation](/docs/instrumentation/java/)
4. [OpenTelemetry Go Instrumentation](/docs/instrumentation/golang/)
5. [OpenTelemetry PHP Instrumentation](/docs/instrumentation/php/)
6. [OpenTelemetry .NET Instrumentation](/docs/instrumentation/dotnet/)
7. [OpenTelemetry Ruby on Rails Instrumentation](/docs/instrumentation/ruby-on-rails/)
8. [OpenTelemetry Elixir Instrumentation](/docs/instrumentation/elixir/)
9. [OpenTelemetry Rust Instrumentation](/docs/instrumentation/rust/)




<!-- If you need assistance instrumenting applications in other languages, please write to us at [support@signoz.io](mailto:support@signoz.io) or reach out to us on [Slack Community](https://join.slack.com/t/signoz-community/shared_invite/zt-lrjknbbp-J_mI13rlw8pGF4EWBnorJA) -->

If you have any questions or need any help in setting things up, join our slack community and ping us in `#help` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.png)](https://signoz.io/slack)

