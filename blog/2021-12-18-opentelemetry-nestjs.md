---
title: OpenTelemetry Nestjs Auto-Instrumentation Guide
slug: opentelemetry-nestjs
date: 2023-03-24
tags: [OpenTelemetry Instrumentation, JavaScript]
authors: [ankit_anand, vishal]
description: Setting up OpenTelemetry instrumentation for a Nestjs application. Step 1. Install required dependencies Step 2. Create a tracer.js file Step 3. Import the tracer module Step 4. Start the tracer... 
image: /img/blog/2023/01/opentelemetry_nestjs_cover-min.jpg
hide_table_of_contents: true
keywords:
  - opentelemetry
  - opentelemetry nestjs
  - opentelemetry javascript
  - distributed tracing
  - observability
  - nestjs monitoring
  - nestjs instrumentation
  - signoz
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";
import VersionPin from '../docs/shared/nestjs-version-pin.md'

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-nestjs/"/>
</head>

Nestjs is a Nodejs framework for building scalable server-side applications with typescript. It makes use of frameworks like Express and Fastify to enable rapid development. It has gained wide popularity in recent times, and many applications are making use of the Nestjs framework.

<!--truncate-->

![Cover Image](/img/blog/2023/01/opentelemetry_nestjs_cover.webp)

Monitoring your Nestjs application is critical for performance management. But setting up monitoring for Nestjs applications can get cumbersome requiring multiple libraries and patterns. That's where Opentelemetry comes in.

OpenTelemetry is the leading open-source standard for instrumenting your code to generate telemetry data that can be a one-stop solution for monitoring Nestjs applications.

OpenTelemetry is a set of tools, APIs, and SDKs used to instrument applications to create and manage telemetry data(Logs, metrics, and traces). It aims to make telemetry data(logs, metrics, and traces) a built-in feature of cloud-native software applications.

 One of the biggest advantages of using OpenTelemetry is that it is vendor-agnostic. It can export data in multiple formats, which you can send to a backend of your choice.

In this article, we will use [SigNoz](https://signoz.io/) as a backend. SigNoz is an open-source APM tool that can be used for both metrics and distributed tracing.

Let's get started and see how to use OpenTelemetry for a Nestjs application.

## Running a Nestjs application with OpenTelemetry
First, you need to install SigNoz. Data collected by OpenTelemetry will be sent to SigNoz for storage and visualization.

### Installing SigNoz
You can get started with SigNoz using just three commands at your terminal.

```jsx
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```
For detailed instructions, you can visit our documentation.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

If you have installed SigNoz on your local host, you can access the UI at: [http://localhost:3301](http://localhost:3301/application)

The application list shown in the dashboard is from a sample app called HOT R.O.D that comes bundled with the SigNoz installation package.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/02/signoz_dashboard.webp" alt="SigNoz dashboard"/>
    <figcaption><i>SigNoz dashboard - It shows services from a sample app that comes bundled with the installation</i></figcaption>
</figure>

<br></br>

### Instrumenting a sample Nestjs application with OpenTelemetry
For instrumenting a Nestjs application with OpenTelemetry, you need to install the required OpenTelemetry packages first. Steps involved in instrumenting a Nestjs application with OpenTelemetry are as follows:

1. **Install below dependencies<br></br>**

```jsx
npm install --save @opentelemetry/auto-instrumentations-node
npm install --save @opentelemetry/exporter-trace-otlp-http
npm install --save @opentelemetry/resources
npm install --save @opentelemetry/sdk-node
npm install --save @opentelemetry/semantic-conventions
```

<VersionPin />

<br></br>

2. **Create a `tracer.ts` file**
<br></br>

The `IP of SIgNoz` will be localhost if you are running SigNoz on local.
   
```jsx
'use strict';

import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import * as opentelemetry from '@opentelemetry/sdk-node';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

// Configure the SDK to export telemetry data to the console
// Enable all auto-instrumentations from the meta package
const exporterOptions = {
  url: 'http://localhost:4318/v1/traces',
};

const traceExporter = new OTLPTraceExporter(exporterOptions);
const sdk = new opentelemetry.NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'sampleNestJsApp',
  }),
});

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk.start();

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});

export default sdk;
```

OpenTelemetry Node SDK currently does not detect the `OTEL_RESOURCE_ATTRIBUTES` from `.env` files as of today. That’s why we need to include the variables in the `tracing.js` file itself.

About environment variables:

`service_name`: name of the service you want to monitor

`http://localhost:4318/v1/traces` is the default url for sending your tracing data. We are assuming you have installed SigNoz on your `localhost`. Based on your environment, you can update it accordingly. It should be in the following format:

`http://<IP of SigNoz backend>:4318/v1/traces`

:::note
Remember to allow incoming requests to port 4318 of machine where SigNoz backend is hosted.
:::

<br></br>

3. **Import the tracer module where your app starts**<br></br>
   On `main.ts` file or file where your app starts import tracer using below command.
   :::info
    The below import should be the first line in the main file of your application (Ex -> `main.ts`)
   :::
   
   ```jsx
   import tracer from './tracer';
   ```
   
   Here's a sample main application importing `tracer.ts`:
   
   ```jsx
   import tracer from './tracer';
   import { NestFactory } from '@nestjs/core';
   import { AppModule } from './app.module';
   
   // All of your application code and any imports that should leverage
   // OpenTelemetry automatic instrumentation must go here.
   
   async function bootstrap() {
    await tracer.start();
    
    const app = await NestFactory.create(AppModule);
    await app.listen(3001);
   }
   bootstrap();
   ```

<br></br>

4. **Start the tracer**<br></br>
   ```jsx
   await tracer.start();
   ```

<br></br>

You can now run your Nestjs application. The data captured with OpenTelemetry from your application should start showing on the SigNoz dashboard. You need to generate some load in order to see data reported on SigNoz dashboard. Refresh your application for 10-20 times, and wait for 2-3 mins.

You can check out a sample Nestjs application already instrumented with OpenTelemetry here:

[Sample Nestjs Application](https://github.com/SigNoz/sample-NestJs-app)

If you run this app, you can find a `SampleNestJsApp` in the list of applications monitored with SigNoz.

<figure data-zoomable align='center'>
    <img src="/img/blog/2021/12/nestjs_signoz_dashboard.webp" alt="Sample Nestjs application in the list of applications monitored by SigNoz"/>
    <figcaption><i>Sample Nestjs application in the list of applications monitored by SigNoz</i></figcaption>
</figure>

<br></br>

## Open-source tool to visualize telemetry data
SigNoz makes it easy to visualize metrics and traces captured through OpenTelemetry instrumentation.

SigNoz comes with out of box RED metrics charts and visualization. RED metrics stands for:

- Rate of requests
- Error rate of requests
- Duration taken by requests

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_charts_application_metrics.webp" alt="SigNoz charts and metrics"/>
    <figcaption><i>Measure things like application latency, requests per sec, error percentage and see your top endpoints with SigNoz.</i></figcaption>
</figure>

<br></br>

You can then choose a particular timestamp where latency is high to drill down to traces around that timestamp.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_list_of_traces_hc.webp" alt="List of traces on SigNoz dashboard"/>
    <figcaption><i>View of traces at a particular timestamp</i></figcaption>
</figure>

<br></br>

You can use flamegraphs to exactly identify the issue causing the latency.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_flamegraphs.webp" alt="Flamegraphs used to visualize spans of distributed tracing in SigNoz UI"/>
    <figcaption><i>Flamegraphs used to visualize spans of distributed tracing in SigNoz UI</i></figcaption>
</figure>

<br></br>

You can also build custom metrics dashboard for your infrastructure.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_custom_dashboard-min.webp" alt="Custom metrics dashboard"/>
    <figcaption><i>You can also build a custom metrics dashboard for your infrastructure</i></figcaption>
</figure>

<br></br>


## Conclusion
OpenTelemetry makes it very convenient to instrument your Nestjs application. You can then use an open-source APM tool like SigNoz to analyze the performance of your app. As SigNoz offers a full-stack observability tool, you don't have to use multiple tools for your monitoring needs.

You can try out SigNoz by visiting its GitHub repo 👇
[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you are someone who understands more from video, then you can watch the below video tutorial on the same with SigNoz.

<p>&nbsp;</p>

<LiteYoutubeEmbed id="tpNDrJAjcto" mute={false} />

<p>&nbsp;</p>

If you have any questions or need any help in setting things up, join our slack community and ping us in `#support` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.webp)](https://signoz.io/slack)

---

If you want to read more about SigNoz 👇

[Golang Aplication Monitoring with OpenTelemetry and SigNoz](https://signoz.io/opentelemetry/go/)

[OpenTelemetry collector - complete guide](https://signoz.io/blog/opentelemetry-collector-complete-guide/)

