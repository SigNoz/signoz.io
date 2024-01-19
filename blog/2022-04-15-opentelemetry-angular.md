---
title: Implementing OpenTelemetry in Angular application
slug: opentelemetry-angular
date: 2022-10-19
tags: [OpenTelemetry Instrumentation, JavaScript]
authors: [pranshu, ankit_anand]
description: It is essential to monitor your Angular frontend apps. OpenTelemetry can help instrument Angular apps and provide you with end-to-end tracing. In this guide, we will demonstrate how to implement the OpenTelemetry Angular library.....
image: /img/blog/2022/04/opentelemetry_angular_cover.webp
keywords:
  - opentelemetry
  - angular
  - opentelemetry angular
  - opentelemetry angular interceptor
  - opentelemetry angular example
  - javascript
  - apm tools
  - application performance monitoring
---
<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-angular/"/>
</head>

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

OpenTelemetry can be used to trace Angular applications for performance issues and bugs. OpenTelemetry is an open-source project under the Cloud Native Computing Foundation (<a href = "https://www.cncf.io/" rel="noopener noreferrer nofollow" target="_blank">CNCF</a>) that aims to standardize the generation and collection of telemetry data. Telemetry data includes logs, metrics, and traces.

<!--truncate-->

![Cover Image](/img/blog/2022/04/opentelemetry_angular_cover.webp)

Angular is a frontend Javascript framework that uses HTML and Typescript. It’s a popular framework used by many organizations for their frontend applications. For a user, frontend is the user’s first interaction point, and it is necessary to ensure that your Angular apps provide a perfect user experience.

<a href = "https://github.com/jufab/opentelemetry-angular-interceptor" rel="noopener noreferrer nofollow" target="_blank">Repository of Angular library to deploy OpenTelemetry in Angular application</a>

<div><br></br></div>

Using OpenTelemetry Angular libraries, you can instrument your Angular apps to generate traces from your Angular app to your downstream services.

Before we demonstrate how to implement the OpenTelemetry libraries, let’s have a brief overview of OpenTelmetry.

## What is OpenTelemetry?

<a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank">OpenTelemetry</a> is an open-source vendor-agnostic set of tools, APIs, and SDKs used to instrument applications to create and manage telemetry data(logs, metrics, and traces). It aims to make telemetry data(logs, metrics, and traces) a built-in feature of cloud-native software applications.

The telemetry data is then sent to an observability tool for storage and visualization.

<!-- ![OpenTelemetry libraries instrument application code to generate telemetry data that is then sent to an observability tool for storage & visualization](Implementi%20ebc9f/how_opentelemetry_fits.webp) -->

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/09/opentelemetry_architecture.webp" alt="How opentelemetry fits with an application"/>
    <figcaption><i>OpenTelemetry libraries instrument application code to generate telemetry data that is then sent to an observability tool for storage & visualization</i></figcaption>
</figure>

<br></br>

OpenTelemetry is the bedrock for setting up an observability framework. It also provides you the freedom to choose a backend analysis tool of your choice.

## OpenTelemetry and SigNoz

In this article, we will use [SigNoz](https://signoz.io/) as our backend analysis tool. SigNoz is a full-stack open-source APM tool that can be used for storing and visualizing the telemetry data collected with OpenTelemetry. It is built natively on OpenTelemetry and supports OTLP data formats.

SigNoz provides query and visualization capabilities for the end-user and comes with out-of-box charts for application metrics and traces. SigNoz also provides logs management with advanced logs query builder and live tailing. With metrics, traces, and logs under a single pane of glass, SigNoz can be a one-stop open source observability platform.

Now let’s get down to how to implement OpenTelemetry Angular libraries and then visualize the collected data in SigNoz.

## Running Angular application with OpenTelemetry

**Step 1: Install SigNoz**

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

<!-- ![SigNoz dashboard - It shows services from a sample app that comes bundled with the application](Implementi%20ebc9f/signoz_dashboard.webp) -->

<figure data-zoomable>
    <img src="/img/blog/2022/02/signoz_dashboard.webp" alt="SigNoz dashboard"/>
    <figcaption><i>SigNoz dashboard - It shows services from a sample app that comes bundled with the application</i></figcaption>
</figure>

<br></br>

**Step 2: Get sample Angular app**

We have set up two sample GitHub repos in order to demonstrate the example at hand

- [Sample Angular App](https://github.com/SigNoz/sample-angular-app/tree/without-instrumentation)<br></br>
It contains the sample boilerplate code that we will instrument. If you want to follow the tutorial, then you should follow the `without instrumentation` branch.
- [Sample Nodejs App](https://github.com/SigNoz/sample-nodejs-app/tree/main)<br></br>
It contains a basic backend API which we will be calling. The backend API is also instrumented with OpenTelemetry to have end-to-end tracing.

**Step 3: Enable CORS in the OTel Receiver**

Enable CORS in the OTel Receiver. Under SigNoz folder, open the `otel-collector-config.yaml` file. The file is located at `deploy/docker/clickhouse-setup/otel-collector-config.yaml`

You can view the file at [SigNoz GitHub repo](https://github.com/SigNoz/signoz/blob/develop/deploy/docker/clickhouse-setup/otel-collector-config.yaml). Inside the file add the following CORS config:

```go
http:
+        cors:
+          allowed_origins:
+            - https://netflix.com  # URL of your Frontend application
```

You need to update the URL of your frontend application. For this tutorial, we will be running our frontend application on `http://localhost:4200`. 

<!-- ![enabling_cors.webp](Implementi%20ebc9f/enabling_cors.webp) -->

<figure data-zoomable align="center">
    <img src="/img/blog/2022/04/enabling_cors.webp" alt="Enabling CORS" width="90%" align="center"/>
</figure>

<br></br>

Once you make the changes, you need to restart the Docker containers.

**Step 4: Instrument Angular app with OpenTelemetry**

To instrument the angular app with OpenTelemetry, we need to install the OpenTelemetry dependencies.

```go
npm i @jufab/opentelemetry-angular-interceptor && npm i @opentelemetry/api @opentelemetry/sdk-trace-web @opentelemetry/sdk-trace-base @opentelemetry/core @opentelemetry/semantic-conventions @opentelemetry/resources @opentelemetry/exporter-trace-otlp-http @opentelemetry/exporter-zipkin @opentelemetry/propagator-b3 @opentelemetry/propagator-jaeger @opentelemetry/context-zone-peer-dep @opentelemetry/instrumentation @opentelemetry/instrumentation-document-load @opentelemetry/instrumentation-fetch @opentelemetry/instrumentation-xml-http-request @opentelemetry/propagator-aws-xray --save-dev
```

**Step 5: Update `app.module.ts` file**

```go
import {
  OpenTelemetryInterceptorModule,
  OtelColExporterModule,
  CompositePropagatorModule,
} from '@jufab/opentelemetry-angular-interceptor';

@NgModule({
  ...
  imports: [
    ...
    OpenTelemetryInterceptorModule.forRoot({
      commonConfig: {
        console: true, // Display trace on console (only in DEV env)
        production: false, // Send Trace with BatchSpanProcessor (true) or SimpleSpanProcessor (false)
        serviceName: 'Angular Sample App', // Service name send in trace
        probabilitySampler: '1',
      },
      otelcolConfig: {
        url: 'http://127.0.0.1:4318/v1/traces', // URL of opentelemetry collector
      },
    }),
    //Insert OtelCol exporter module
    OtelColExporterModule,
    //Insert propagator module
    CompositePropagatorModule,
  ],
  ...
})
```

Make sure to update then URL of OpenTelemetry Collector under `otelcolConfig`. In our case since we’re running SigNoz in local, the URL is `http://127.0.0.1:4318/v1/traces`.

You can change the name of the service, and other configurations under `commonConfig`.

**Step 6: Start the angular app and the backend API**

For Angular app:<br></br>
Go to the root folder of your Angular application, and run the following command:

```go
yarn start
```

For backend API:<br></br>
Install the dependencies

```go
yarn install
```

If SigNoz is installed locally, run your backend API using:

```go
yarn run start:local
```

If SigNoz is not installed locally, then you would need to set the IP of the machine where SigNoz is installed. You can do so by using the below command:

```go
OTEL_EXPORTER_OTLP_ENDPOINT="<IP of SigNoz>:4317" OTEL_RESOURCE_ATTRIBUTES=service.name=NAME_OF_SERVICE yarn run start:custom```
```

Congratulations! You have successfully run your Angular application with OpenTelemetry. It’s time to see the collected data.

**Step 7: Generate some data**

In order to monitor your Angular application with SigNoz, you first need to generate some data.

Visit [http://localhost:4200/](http://localhost:4200/) to access your frontend application. Using the UI, make some calls to the backend API. You can check the network tab in your browser to see the requests that you have made.

<!-- ![Angular Frontend Web UI](Implementi%20ebc9f/angular_frontend_webui.webp) -->

<figure data-zoomable>
    <img src="/img/blog/2022/04/angular_frontend_webui.webp" alt="Angular frontend Web UI"/>
    <figcaption><i>Angular Frontend Web UI</i></figcaption>
</figure>

<br></br>

**Step 8: Monitor your application with SigNoz**

With SigNoz you can monitor the data collected by OpenTelemetry from your sample Angular application. You can see end-to-end traces for your Angular application, starting from your frontend application to the downstream nodejs-sample-app.

<!-- ![See end-to-end traces from your Angular application to downstream services](Implementi%20ebc9f/angular_app_trace_1.webp) -->

<figure data-zoomable>
    <img src="/img/blog/2022/04/angular_app_trace_1.webp" alt="End-to-end tracing of Angular applications"/>
    <figcaption><i>See end-to-end traces from your Angular application to downstream services</i></figcaption>
</figure>

<br></br>

You can also monitor errors that takes place in your Angular application. SigNoz UI also shows attributes like `http_status_code` .

<!-- ![Monitor errors in your frontend Angular application](Implementi%20ebc9f/angular_app_trace_2.webp) -->

<figure data-zoomable>
    <img src="/img/blog/2022/04/angular_app_trace_2.webp" alt="Monitor errors in your frontend Angular applications"/>
    <figcaption><i>Monitor errors in your frontend Angular application</i></figcaption>
</figure>

<br></br>

## Conclusion

Using OpenTelemetry Angular libraries, you can instrument your frontend applications for end-to-end tracing. You can then use an open-source APM tool like SigNoz to ensure the smooth performance of your Angular apps.

OpenTelemetry is the future for setting up observability for cloud-native apps. It is backed by a huge community and covers a wide variety of technology and frameworks. Using OpenTelemetry, engineering teams can instrument polyglot and distributed applications with peace of mind.

SigNoz is an open-source observability tool that comes with a SaaS-like experience. You can try out SigNoz by visiting its GitHub repo 👇

<!-- [signoz_github.webp](Implementi%20ebc9f/signoz_github.webp) -->

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you are someone who understands more from video, then you can watch the our video tutorial on how to implement OpenTelemetry Angular libraries and monitor the application with SigNoz.
<p>&nbsp;</p>

<LiteYoutubeEmbed id="g-I-v1FtMoM" mute={false} />

<p>&nbsp;</p>

<!-- [https://www.youtube.com/watch?v=g-I-v1FtMoM&t](https://www.youtube.com/watch?v=g-I-v1FtMoM&t) -->

If you face any issues while trying out SigNoz, you can reach out with your questions in #support channel 👇

<!-- ![join_slack_cta.webp](Implementi%20ebc9f/join_slack_cta.webp) -->

[![SigNoz Slack community](/img/blog/common/join_slack_cta.webp)](https://signoz.io/slack)

---

## Further Reading

[Monitor gRPC calls with OpenTelemetry](https://signoz.io/blog/opentelemetry-grpc-golang/)

[Distributed Tracing for a nodejs application](https://signoz.io/blog/distributed-tracing-nodejs/)
