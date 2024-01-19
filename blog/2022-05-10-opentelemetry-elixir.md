---
title: Monitor your Elixir application with OpenTelemetry and SigNoz 
slug: opentelemetry-elixir
date: 2022-12-10
tags: [OpenTelemetry Instrumentation, Elixir / Erlang]
authors: [ricardo]
description:  In this tutorial, we'll show you how to monitor your Elixir application using OpenTelemetry and Signoz. OpenTelemetry can be used to instrument your Elixir applications to generate telemetry data. The telemetry data can then be visualized using an observability tool to monitor your Elixir application performance...
image: /img/blog/2022/05/opentelemetry_elixir_cover.webp
keywords:
  - opentelemetry
  - elixir
  - opentelemetry elixir
  - opentelemetry elixir example
  - apm tools
  - application performance monitoring
---
import { LiteYoutubeEmbed } from "react-lite-yt-embed";

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-elixir/"/>
</head>

OpenTelemetry can be used to instrument your Elixir applications to generate telemetry data. The telemetry data can then be visualized using an observability tool to monitor your Elixir application performance. In this tutorial, we will use OpenTelemetry Elixir libraries to instrument an Elixir application and then visualize it using SigNoz.


<!--truncate-->

![Cover Image](/img/blog/2022/05/opentelemetry_elixir_cover.webp)

Somewhere during the lifetime of an application, it's inevitable that it will have some performance issues. If you have set up observability for your applications, it can help you figure out those performance issues quickly.

## Introduction

For cloud-native applications, OpenTelemetry provides a framework to set up observability. It consists of a collection of tools, APIs, and SDKs that you can use to instrument, generate, collect, and export telemetry data for analysis in order to understand your software's performance and behavior.

In this tutorial, we'll show you how to monitor your Elixir application using OpenTelemetry and Signoz. We'll focus on the most common and basic Elixir combo: **Phoenix + Ecto**.

Once everything is installed and configured, you'll be able to see how much time your endpoints and database operations are taking. The collected data, when visualized by a backend tool like SigNoz will help you to troubleshot problems, identify bottlenecks and also find usage patterns that will help you improve your application pro-actively.

## OpenTelemetry and SigNoz

OpenTelemetry libraries can only enable the generation of telemetry data. You need a backend that takes in the data for storage and visualization. [SigNoz](https://signoz.io/) is a full-stack open-source APM tool that can be used for storing and visualizing the telemetry data collected with OpenTelemetry. It is built natively on OpenTelemetry and works on the OTLP data formats.

SigNoz provides query and visualization capabilities for the end-user and comes with out-of-box charts for application metrics and traces.

Now let’s get down to how to implement OpenTelemetry in your Elixir application.

## Installing SigNoz

First, you need to install SigNoz so that OpenTelemetry can send the data to it.

SigNoz can be installed on macOS or Linux computers in just three steps by using a simple install script.

The install script automatically installs Docker Engine on Linux. However, on macOS, you must manually install <a href = "https://docs.docker.com/engine/install/" rel="noopener noreferrer nofollow" target="_blank">Docker Engine</a> before running the install script.

```bash
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

When you are done installing SigNoz, you can access the UI at [http://localhost:3301](http://localhost:3301/application)

## Instrumenting an Elixir Phoenix application with OpenTelemetry

We’ll focus on instrumenting one of the most common combos of the Elixir world: Phoenix + Ecto.

**Step 1:** **Add the required dependencies**

The first step to instrument your Elixir application with OpenTelemetry is to add the required dependencies to your `mix.exs` file and fetch them with `mix deps.get`

```jsx
{:opentelemetry, "~> 1.0.3"},
{:opentelemetry_exporter, "~> 1.0.3"},
{:opentelemetry_phoenix, "~> 1.0.0"},
{:opentelemetry_ecto, "~> 1.0.0"}
```

**Step 2: Configure the Elixir application to export telemetry data**

Then we need to configure our application to export telemetry data. There are two things that you need to set:

- `YOUR_APP_NAME`<br></br>
You can put your application or service name here for identification.
- `OTEL Collector endpoint`<br></br>
The OTEL collector comes bundled with SigNoz installation. Since, we installed SigNoz on our local machine, the endpoint is `http://localhost:4318`.

```jsx
config :opentelemetry, :resource, service: %{name: "YOUR_APP_NAME"}

config :opentelemetry, :processors,
  otel_batch_processor: %{
    exporter: {
      :opentelemetry_exporter,
      %{endpoints: ["http://localhost:4318"]}
    }
  }
```

**Step 3: Initialize telemetry handlers**

As it is documented in the `opentelemetry_phoenix` and `opentelemetry_ecto` [hexdocs.pm](http://hexdocs.pm) pages, we need to initialize both telemetry handlers.

```elixir
OpentelemetryPhoenix.setup()
OpentelemetryEcto.setup([:your_app_name, :repo])
```

`:your_app_name` should be replaced by your app name and congratulations, you have instrumented your application with OpenTelemetry.

## Monitor your Elixir application with Signoz

You can now monitor your Elixir application with SigNoz. Whether you’re using a Phoenix to create REST APIs or HTML applications, you need to generate some data by interacting with your application.

In this [GitHub repository](https://github.com/SigNoz/elixir_otel_sample) you’ll find an Elixir Phoenix API that exposes a couple of endpoints but we’ll focus on one:  `/api/users` that will return a list of users that are stored on the respective database table.

If you want to use this sample application, please refer to the README file in the repository in order to make it run locally, or follow the steps mentioned below to run the sample Elixir application.


To start your Phoenix server:

Install dependencies with:
```
mix deps.get
```

<br/>

Create and migrate your database with:
```
mix ecto.create
```

<br/>

Runs the repository migrations:
```
mix ecto.migrate
```

<br/>

Start Phoenix endpoint with: 
```
mix phx.server
``` 


Now, let’s do a couple of calls to one of the endpoints.

```bash
curl http://localhost:4000/api/users
```

This should generate some telemetry data, which would be exported to SigNoz OTEL collector.

You can access SigNoz UI at [http://localhost:3301/application](http://localhost:3301/application) (after signing up) to see your Elixir Phoenix API being monitored. The other applications that you see are sample applications that come bundled with the installation.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/elixir_app_signoz_dashboard.webp" alt="Elixir app being monitored on SigNoz dashboard"/>
    <figcaption><i>Elixir Phoenix API being monitored on the SigNoz dashboard. The other applications are sample apps that come bundled with SigNoz installation.</i></figcaption>
</figure>

<br></br>

**Monitor application metrics of your Elixir app**

SigNoz provides out-of-box charts for application metrics like latency, requests per sec, error percentage, etc.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/elixir_application_metrics.webp" alt="Monitor Elixir application metrics"/>
    <figcaption><i>You can monitor latency, requests per sec, error percentage, and top endpoints of your Elixir application.</i></figcaption>
</figure>

<br></br>

**Analyze your tracing data with the Traces tab**

Your application metrics are also seamlessly correlated with tracing data. You can choose any timestamp or endpoint to explore Traces during that duration.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/elixir_traces_tab.webp" alt="Analyze your trace data with powerful filters"/>
    <figcaption><i>The Traces tab of SigNoz provides you with powerful filters to analyze your tracing data.</i></figcaption>
</figure>

<br></br>

**Complete breakdown of requests**

You can see a complete breakdown of the request with Flamegraphs and Gantt charts. You can click on any span in the spans table to access it.

From our Elixir application, we can see a trace consisting of two spans. The parent one corresponds to the HTTP request and the second one corresponds to the database call.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/elixir_flamegraphs.webp" alt="Flamegraphs and Gantt Charts"/>
    <figcaption><i>You can see the complete breakdown of your requests with details like how much time each operation took, span attributes, etc.</i></figcaption>
</figure>

<br></br>

 **Troubleshooting an error**

SigNoz can also help in troubleshooting errors with error monitoring. 

For this, we’ll have to force an error and we can do this by doing the following request: 

```bash
curl http://localhost:4000/api/users/something
```

This will cause an error because this endpoint is expecting an `integer` and not a `string`

You can go to [http://localhost:3301/errors](http://localhost:3301/errors) to check out the errors in your application.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/elixir_errors_monitoring.webp" alt="Elixir application error monitoring"/>
    <figcaption><i>Monitor all errors at one place with Exceptions monitoring</i></figcaption>
</figure>

<br></br>

If you click on the error, you’ll see some more details about the error and even the stack trace.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/elixir_stacktrace.webp" alt="Stacktrace of errors in your Elixir apps in the SigNoz dashboard"/>
    <figcaption><i>See stacktrace of errors to dig deeper into why it happened</i></figcaption>
</figure>

<br></br>

## Conclusion

Using OpenTelemetry libraries, you can instrument your Elixir applications for setting up observability. You can then use an open-source APM tool like SigNoz to ensure the smooth performance of your Elixir applications.

OpenTelemetry is the future for setting up observability for cloud-native apps. It is backed by a huge community and covers a wide variety of technology and frameworks. Using OpenTelemetry, engineering teams can instrument polyglot and distributed applications with peace of mind.

SigNoz is an open-source observability tool that comes with a SaaS-like experience. You can try out SigNoz by visiting its GitHub repo 👇 

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you are someone who understands more from video, then you can watch the below video tutorial on the same with SigNoz.

<p>&nbsp;</p>

<LiteYoutubeEmbed id="wLMrV-LtHFU" mute={false} />

<p>&nbsp;</p>

If you have any questions or need any help in setting things up, join our slack community and ping us in `#support` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.webp)](https://signoz.io/slack)

## Further Reading

[Implementing OpenTelemetry in Angular application](https://signoz.io/blog/opentelemetry-angular/)

[Monitor your Nodejs application with OpenTelemetry and SigNoz](https://signoz.io/opentelemetry/nodejs/)
