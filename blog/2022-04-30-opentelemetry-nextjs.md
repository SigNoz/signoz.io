---
title: Monitoring your Nextjs application using OpenTelemetry 
slug: opentelemetry-nextjs
date: 2023-06-05
tags: [OpenTelemetry Instrumentation, JavaScript]
authors: [sai_deepesh]
description: OpenTelemetry can help instrument Nextjs applications and provide you with end-to-end tracing. In this guide, we will demonstrate how to instrument your Nextjs app with OpenTelemetry...
image: /img/blog/2022/04/opentelemetry_nextjs_cover.webp
keywords:
  - opentelemetry
  - nextjs
  - opentelemetry nextjs
  - javascript
  - apm tools
  - application performance monitoring
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-nextjs/"/>
</head>

Nextjs is a production-ready React framework for building single-page web applications. It enables you to build fast and user-friendly static websites, as well as web applications using Reactjs. Using OpenTelemetry Nextjs libraries, you can set up end-to-end tracing for your Nextjs applications.

<!--truncate-->

![Cover Image](/img/blog/2022/04/opentelemetry_nextjs_cover.webp)

Nextjs has its own monitoring feature, but it is only limited to measuring the metrics like core web vitals and real-time analytics of the application. It doesn’t have end-to-end tracing, monitoring the database calls, etc. That’s where OpenTelemetry comes in.

OpenTelemetry is an open-source standard under Cloud Native Computing Foundation (<a href = "https://www.cncf.io/" rel="noopener noreferrer nofollow" target="_blank">CNCF</a>) used for instrumenting applications for generating telemetry data. You can monitor your Nextjs application using OpenTelemetry and a tracing backend of your choice.

> What is OpenTelemetry Nextjs instrumentation?
Instrumentation is the process of enabling your application code to generate telemetry data like logs, metrics, and traces. Using OpenTelemetry Nextjs client libraries, you can generate end-to-end tracing data from your Nextjs application.
> 

OpenTelemetry provides client libraries to take care of instrumentation. You then need to send the collected data to an analysis backend. In this tutorial, we will be using [SigNoz](https://signoz.io/) to store and visualize the telemetry data collected by OpenTelemetry from the sample Nextjs application

Before we demonstrate how to implement the OpenTelemetry Nextjs libraries, let’s have a brief overview of OpenTelmetry.

## What is OpenTelemetry?

<a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank">OpenTelemetry</a> is an open-source vendor-agnostic set of tools, APIs, and SDKs used to instrument applications to create and manage telemetry data(logs, metrics, and traces). It aims to make telemetry data(logs, metrics, and traces) a built-in feature of cloud-native software applications.

The telemetry data is then sent to an observability tool for storage and visualization.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/04/how_opentelemetry_fits.webp" alt="How opentelemetry fits with an application"/>
    <figcaption><i>OpenTelemetry libraries instrument application code to generate telemetry data that is then sent to an observability tool for storage & visualization</i></figcaption>
</figure>

<br></br>

OpenTelemetry is the bedrock for setting up an observability framework. It also provides you the freedom to choose a backend analysis tool of your choice. You will never get locked in with any vendor if you use OpenTelemetry for your instrumentation layer.

## OpenTelemetry and SigNoz

In this tutorial, we will use SigNoz as our backend analysis tool. SigNoz is a full-stack open-source APM tool that can be used for storing and visualizing the telemetry data collected with OpenTelemetry. It is built natively on OpenTelemetry and works on the OTLP data formats.

SigNoz provides query and visualization capabilities for the end-user and comes with out-of-box charts for application metrics and traces.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_charts_application_metrics.webp" alt="Application metrics charts on SigNoz dashboard"/>
    <figcaption><i>SigNoz comes with out-of-box visualization for metrics and traces collected with OpenTelemetry</i></figcaption>
</figure>

<br></br>

Now let’s get down to how to implement OpenTelemetry Nextjs libraries for a sample Nextjs application and then visualize the collected data in SigNoz.

## Running a Nextjs application with OpenTelemetry

First of all, we need to install SigNoz for data collection then this data will be sent to OpenTelemetry for storage and visualization

### Installing SigNoz

Frist, you need to install SigNoz so that OpenTelemetry can send the data to it.

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

### Creating a sample Nextjs application

To install and run a Nextjs application you need to have Nodejs 12.22.0 or later. You can also check the sample application at this <a href = "https://github.com/SigNoz/opentelemetry-nextjs-example" rel="noopener noreferrer nofollow" target="_blank">GitHub repo</a>.

<a href = "https://nodejs.org/en/download/" rel="noopener noreferrer nofollow" target="_blank">Download the latest version of Nodejs</a>

To create a new Nextjs app, you can use `create-next-app` which sets up everything automatically for you.

Steps to get the app set up and ready:

**Step 1: Create a project using any of these commands**

```
npx create-next-app@latest
# or
yarn create next-app
# or
pnpm create next-app
```

**Step2: Check if the application is running**

Start the development server.

```bash
npm run dev
//or
yarn dev
//or
pnpm dev
```

You can check if your app is up and running on [http://localhost:3000](http://localhost:3000)

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/04/nextjs_app_running.webp" alt="Nextjs app running in your local"/>
    <figcaption><i>Nextjs app running at port 3000</i></figcaption>
</figure>

<br></br>

### Instrumenting the Nextjs application with OpenTelemetry

**Step 1: Install OpenTelemetry packages**

You will need the following OpenTelemetry packages for this sample application.

```jsx
npm i @opentelemetry/sdk-node
npm i @opentelemetry/auto-instrumentations-node
npm i @opentelemetry/exporter-trace-otlp-http
npm i @opentelemetry/resources
npm i @opentelemetry/semantic-conventions
```

> Note: You can use yarn or npm as per the package manager that you’re using for the project
> 

**Step 2: Create a `tracing.js` file**

Instantiate tracing by creating a `tracing.js` file and using the below code. 

We are also setting up the IP of SigNoz backend in this file as `http://localhost:4318/v1/traces`. If you have installed SigNoz on a different machine other than your localhost, use the relevant IP.

```jsx
'use strict'

const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');


const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

// custom nextjs server
const { startServer } = require('./server');

// configure the SDK to export telemetry data to the console
// enable all auto-instrumentations from the meta package
const exporterOptions = {
  url: 'http://localhost:4318/v1/traces',
 }
const traceExporter = new OTLPTraceExporter(exporterOptions);
const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'SigNoz-Nextjs-Example'
  }),
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()]
});

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk.start()

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});

module.exports = sdk
```

About environment variables:

`service_name`: name of the service you want to monitor

`http://localhost:4318/v1/traces` is the default url for sending your tracing data. We are assuming you have installed SigNoz on your `localhost`. Based on your environment, you can update it accordingly. It should be in the following format:

`http://<IP of SigNoz backend>:4318/v1/traces`

:::note
Remember to allow incoming requests to port 4318 of machine where SigNoz backend is hosted.
:::


Now we will have to create the `server.js` file that we have imported into the `tracing.js` file.

**Step 3: Create a custom Nextjs server**

Create a `server.js` file in the source folder using the following code.

```jsx
const { createServer } = require("http")
const { parse } = require("url")
const next = require("next")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

module.exports = {
  startServer: async function startServer() {
    return app.prepare().then(() => {
      createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
      }).listen(8080, (err) => {
        if (err) throw err
        console.log("> Ready on http://localhost:8080")
      })
    })
  },
}
```

You can use whichever port is available, for this example we’ve used port 8080.

**Step 4: Adding the script to start the server**

Now we will have to run the server in order to trace the data,

In the `package.json`, let’s create a new script `npm run start:server` or `yarn start:server` and point that you `node tracing.js`.

With this `scripts` JSON in the `package.json` file looks something like this.

```jsx
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start:server": "node tracing.js",
    "lint": "next lint"
  }
```

**Step 5: Run the server and monitor the application**

Run the application using `npm run start:server` or `yarn start:server` , and your application should be available on [http://localhost:8080](http://localhost:8080/) .

Hit the URL a couple of times to generate some dummy data and wait for the `SigNoz-Nextjs-Example` application to be visible on the SigNoz dashboard.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/04/sample_nextjs_signoz_dashboard.webp" alt="Sample Nextjs app being monitored on SigNoz dashboard"/>
    <figcaption><i>Sample Nextjs application being monitored on the SigNoz dashboard. The other applications in the dashboard are from a sample application that comes bundled with SigNoz installation.</i></figcaption>
</figure>

<br></br>

You can use the dashboard to see application metrics like application latency, requests per sec, and error percentage.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/04/otel_nextjs_metrics.webp" alt="Nextjs application metrics captured with OpenTelemetry and visualized on SigNoz dashboard"/>
    <figcaption><i>Visualize application metrics captured with OpenTelemetry in the SigNoz dashboard</i></figcaption>
</figure>

<br></br>

OpenTelemetry captures tracing data from your Nextjs application as well. Tracing data can help you visualize how user requests perform across services in a multi-service application.

In the `Traces` tab of SigNoz, you can analyze the tracing data using filters based on tags, status codes, service names, operations, etc.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/04/nextjs_traces_tab.webp" alt="Traces tab on SigNoz dashboard"/>
    <figcaption><i>Use powerful filters to analyze your tracing data</i></figcaption>
</figure>

<br></br>

You can also visualize the tracing data with the help of flamegraphs and Gantt charts. These visualizations makes it easier for users to see how requests performed acrosee different services in a multi-service application.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/04/otel_nextjs_signoz_dashboard.webp" alt="Sample Nextjs app being monitored on SigNoz dashboard"/>
    <figcaption><i>See end-to-end traces from your Nextjs application to downstream services</i></figcaption>
</figure>

<br></br>

## Conclusion

Using OpenTelemetry libraries, you can instrument your Nextjs applications for end-to-end tracing. You can then use an open-source APM tool like SigNoz to ensure the smooth performance of your Nextjs application.

OpenTelemetry is the future for setting up observability for cloud-native apps. It is backed by a huge community and covers a wide variety of technology and frameworks. Using OpenTelemetry, engineering teams can instrument polyglot and distributed applications and be assured about compatibility with a lot of technologies.

SigNoz is an open-source observability tool that comes with a SaaS-like experience. You can check out SigNoz by visiting its GitHub repo 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you are someone who understands more from video, then you can watch the below video tutorial on the same with SigNoz.

<p>&nbsp;</p>

<LiteYoutubeEmbed id="sC1xNIcItTM" mute={false} />

<p>&nbsp;</p>


If you face any issues while trying out SigNoz, you can reach out with your questions in #support channel 👇

[![SigNoz Slack community](/img/blog/common/join_slack_cta.webp)](https://signoz.io/slack)

## Further Reading

[Implementing OpenTelemetry in Angular application](https://signoz.io/blog/opentelemetry-angular/)

[Monitor your Nodejs application with OpenTelemetry and SigNoz](https://signoz.io/opentelemetry/nodejs/)
