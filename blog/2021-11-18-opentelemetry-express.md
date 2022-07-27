---
title: Monitoring your Express application using OpenTelemetry
slug: opentelemetry-express
date: 2021-11-18
tags: [OpenTelemetry Instrumentation, JavaScript]
authors: ankit_anand
description: OpenTelemetry is a vendor-agnostic isntrumentation library. In this article, learn how to set up monitoring for an Express application using OpenTelemetry.
image: /img/blog/2021/11/monitor_express_cover.webp
hide_table_of_contents: true
keywords:
  - opentelemetry
  - opentelemetry javascript
  - opentelemetry express
  - distributed tracing
  - observability
  - express monitoring
  - express instrumentation
  - signoz
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-express/"/>
</head>

Nodejs is a popular Javascript runtime environment that executes Javascript code outside of a web browser. Express is the most popular web frameworks that sits on top of Nodejs and adds functionalities like middleware, routing, etc. to Nodejs.

<!--truncate-->

![Cover Image](/img/blog/2021/11/monitor_express_cover.webp)

You can monitor your express application using OpenTelemetry and a tracing backend of your choice. OpenTelemetry is the leading open-source standard under the Cloud Native Computing Foundation that aims to standardize the process of instrumentation across multiple languages.
 
In this article, we will be using [SigNoz](https://signoz.io/?utm_source=blog&utm_medium=monitor_express) to store and visualize the telemetry data collected by OpenTelemetry from a sample Expressjs application.

## Running an Express application with OpenTelemetry

OpenTelemetry is a set of tools, APIs, and SDKs used to instrument applications to create and manage telemetry data(logs, metrics, and traces).

### Install SigNoz

You can get started with SigNoz using just three commands at your terminal.

```jsx
git clone -b main https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```
<br></br>

For detailed instructions, you can visit our documentation.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/docker/?utm_source=blog&utm_medium=opentelemetry_express)

When you are done installing SigNoz, you can access the UI at: [http://localhost:3301](http://localhost:3301/application)

The application list shown in the dashboard is from a sample app called HOT R.O.D that comes bundled with the SigNoz installation package.

import Screenshot from "@theme/Screenshot"

<Screenshot
    alt="SigNoz dashboard home"
    height={500}
    src="/img/blog/common/signoz_dashboard_homepage.webp"
    title="List of applications shown as an example on SigNoz dashboard"
    width={700}
/>

### Creating a sample express application
You need to ensure that you have Node.js version 12 or newer.

<a href = "https://nodejs.org/en/download/" rel="noopener noreferrer nofollow" target="_blank" >Download latest version of Nodejs</a>.

For the sample application, let's create a basic 'hello world' express.js application.

Steps to get the app set up and running:

1. **Make a directory and install express**<br></br>

   Make a directory for your sample app on your machine. Then open up the terminal, navigate to the directory path and install express with the following command:
   ```jsx
   npm i express
   ```
2. **Setup index.js**<br></br>
   Create a file called `index.js` in your directory and with any text editor setup your `Hello World` file with the code below:
   ```jsx
   const express = require('express');

   const app = express();

   app.get('/hello', (req, res) => {

   res.status(200).send('Hello World');

   });

   app.listen(9090);
   ```

3. **Check if your application is working**<br></br>
   Run your application by using the below command at your terminal.

   ```jsx
   node index.js
   ```

   You can check if your app is working by visiting: [http://localhost:9090/hello](http://localhost:9090/hello)

<Screenshot
    alt="Express App"
    height={500}
    src="/img/blog/2021/11/express_app.webp"
    title="Express app running on local host"
    width={700}
/>

Once you are finished checking, exit the application by using `Ctrl + C` on your terminal.

### Instrumenting the express application with OpenTelemetry
<!-- 1. **Install OpenTelemetry launcher package**<br></br>
   In the same directory path at the terminal, install the OpenTelemetry launcher package with this command:
   ```jsx
   npm install lightstep-opentelemetry-launcher-node
   ```
   The OpenTelemetry launcher makes getting started with OpenTelemetry easier by reducing configuration boilerplate. -->

1. **Install OpenTelemetry packages**<br></br>
   You will need the following OpenTelemetry packages for this sample application.
   
   ```jsx
   npm install --save @opentelemetry/api
   npm install --save @opentelemetry/sdk-node
   npm install --save @opentelemetry/auto-instrumentations-node
   npm install --save @opentelemetry/exporter-otlp-grpc
   ```

   OpenTelemetry clients have two major components: the SDK and the API. The details of the packages used for the application are as follows:
   - `opentelemetry/api`<br></br>
      Defines data types and operations for generating and correlating tracing, metrics, and logging data. The API is what you use to instrument your code.

   - `opentelemetry/sdk-node`<br></br>
      Provides automated instrumentation and tracing for Node.js applications.

   - `opentelemetry/auto-instrumentations-node`<br></br>
      A meta-package from [opentelemetry-js-contrib](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/metapackages/auto-instrumentations-node) that provides a simple way to initialize multiple Node.js instrumentations.

   - `opentelemetry/exporter-otlp-grpc`<br></br>
      Exports data via gRPC using [OTLP](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/protocol/otlp.md) format.

<!-- 2. **Using OpenTelemetry SDK**<br></br>
   To use OpenTelemetry, you need to start the OpenTelemetry SDK before loading your application. By initializing OpenTelemetry first, we enable OpenTelemetry to apply available instrumentation and auto-detect packages before the application starts to run. To do that, go to your directory and create a new file named, "server_init.js". This will act as the new entry point for your app. Paste the following code in the file:

   ```jsx
   const {

  lightstep,

  opentelemetry,

  } = require('lightstep-opentelemetry-launcher-node');

  const sdk = lightstep.configureOpenTelemetry();

  sdk.start().then(() => {

  require('./server');

  });

  function shutdown() {

  sdk.shutdown().then(

  () => console.log("SDK shut down successfully"),

  (err) => console.log("Error shutting down SDK", err),

  ).finally(() => process.exit(0))

  };

  process.on('exit', shutdown);

  process.on('SIGINT', shutdown);

  process.on('SIGTERM', shutdown);
  ``` -->


2. **Create `tracing.js` file**<br></br>
   Instantiate tracing by creating a `tracing.js` file and using the below code.

   ```jsx
   // tracing.js
   'use strict'
   const process = require('process');
   const opentelemetry = require('@opentelemetry/sdk-node');
   const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
   const { OTLPTraceExporter } = require('@opentelemetry/exporter-otlp-grpc');
   // configure the SDK to export telemetry data to the console
   // enable all auto-instrumentations from the meta package
   const traceExporter = new OTLPTraceExporter();
   const sdk = new opentelemetry.NodeSDK({
     traceExporter,
     instrumentations: [getNodeAutoInstrumentations()]
     });
     
     // initialize the SDK and register with the OpenTelemetry API
     // this enables the API to record telemetry
     sdk.start()
     .then(() => console.log('Tracing initialized'))
     .catch((error) => console.log('Error initializing tracing', error));
     
     // gracefully shut down the SDK on process exit
     process.on('SIGTERM', () => {
       sdk.shutdown()
       .then(() => console.log('Tracing terminated'))
       .catch((error) => console.log('Error terminating tracing', error))
       .finally(() => process.exit(0));
       });
  ```

3. **Pass the necessary environment variable**<br></br>
   Once the file is created, you only need to run one last command at your terminal, which passes the necessary environment variables. Here, you also set SigNoz as your backend analysis tool.

   ```jsx
   OTEL_EXPORTER_OTLP_ENDPOINT="<IP of SigNoz>:4317" \
   OTEL_RESOURCE_ATTRIBUTES=service.name=<service_name> \
   node -r ./tracing.js index.js
   ```

   Replacing the placeholders in the above command for local host:

   `IP of SigNoz Backend`: localhost (since we are running SigNoz on our local host)

   `service_name` : express_app (you can give whatever name that suits you)

   So the final command is:

   ```jsx
   OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317" \
   OTEL_RESOURCE_ATTRIBUTES=service.name=express_app \
   node -r ./tracing.js index.js
   ```

And congratulations! You have now instrumented your express application with OpenTelemetry.

Below you can find your `express_app` in the list of applications being monitored. You might have to hit the endpoint at [http://localhost:9090/hello](http://localhost:9090/hello) multiple times to generate some load before you see your app on the SigNoz dashboard.


<Screenshot
    alt="Express app in the list of applications"
    height={500}
    src="/img/blog/2021/11/express_list_apps.webp"
    title="Express app in the list of applications"
    width={700}
/>


SigNoz is open-source, and a full-stack APM. It comes with charts of RED metrics and a seamless transition from metrics to traces.

## Open-source tool to visualize telemetry data
SigNoz makes it easy to visualize metrics and traces captured through OpenTelemetry instrumentation.

SigNoz comes with out of box RED metrics charts and visualization. RED metrics stands for:

- Rate of requests
- Error rate of requests
- Duration taken by requests

<Screenshot
    alt="SigNoz charts and metrics"
    height={500}
    src="/img/blog/common/signoz_charts_application_metrics.webp"
    title="Measure things like application latency, requests per sec, error percentage and see your top endpoints with SigNoz."
    width={700}
/>

You can then choose a particular timestamp where latency is high to drill down to traces around that timestamp.

<Screenshot
    alt="List of traces on SigNoz dashboard"
    height={500}
    src="/img/blog/common/signoz_list_of_traces_hc.webp"
    title="View of traces at a particular timestamp"
    width={700}
/>

You can use flamegraphs to exactly identify the issue causing the latency.

<Screenshot
    alt="Flamegraphs used to visualize spans of distributed tracing in SigNoz UI"
    height={500}
    src="/img/blog/common/signoz_flamegraphs.webp"
    title="View of traces at a particular timestamp"
    width={700}
/>

You can also build custom metrics dashboard for your infrastructure.

<Screenshot
    alt="Custom metrics dashboard"
    height={500}
    src="/img/blog/common/signoz_custom_dashboard-min.webp"
    title="You can also build a custom metrics dashboard for your infrastructure"
    width={700}
/>

## Conclusion

OpenTelemetry makes it very convenient to instrument your Express application. You can then use an open-source APM tool like SigNoz to analyze the performance of your app. As SigNoz offers a full-stack observability tool, you don't have to use multiple tools for your monitoring needs.

You can try out SigNoz by visiting its GitHub repo 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you are someone who understands more from video, then you can watch the below video tutorial on the same with SigNoz.

<p>&nbsp;</p>

<LiteYoutubeEmbed id="AKu1rlP6j_w" mute={false} />

<p>&nbsp;</p>


If you have any questions or need any help in setting things up, join our slack community and ping us in `#support` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.png)](https://signoz.io/slack)

---

If you want to read more about SigNoz 👇

[Golang Aplication Monitoring with OpenTelemetry and SigNoz](https://signoz.io/opentelemetry/go/)

[OpenTelemetry collector - full guide](https://signoz.io/blog/opentelemetry-collector-complete-guide/)





