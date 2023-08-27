---
id: javascript
title: Javascript OpenTelemetry Instrumentation
description: Send events from your Javascript application to SigNoz

---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import InstrumentationFAQ from '../shared/instrumentation-faq.md';
import VersionPin from '../shared/nodejs-version-pin.md'


This document contains OpenTelemetry instrumentation instructions for Javascript backend frameworks and modules based on Nodejs. If you're using self-hosted SigNoz refer to this [section](#send-traces-to-self-hosted-signoz). If you're using SigNoz cloud, refer to this [section](#send-traces-to-signoz-cloud).

## Send traces to SigNoz Cloud

Based on your application environment, you can choose the setup below to send traces to SigNoz Cloud.

<Tabs>
<TabItem value="vm" label="VM" default>

From VMs, there are two ways to send data to SigNoz Cloud.

- [Send traces directly to SigNoz Cloud](#send-traces-directly-to-signoz-cloud)
- [Send traces via OTel Collector binary](#send-traces-via-otel-collector-binary) (recommended)

#### **Send traces directly to SigNoz Cloud**

Step 1. Install OpenTelemetry packages

```js
npm install --save @opentelemetry/api@^1.4.1
npm install --save @opentelemetry/sdk-node@^0.39.1
npm install --save @opentelemetry/auto-instrumentations-node@^0.37.0
npm install --save @opentelemetry/exporter-trace-otlp-grpc@^0.39.1
```

Step 2. Create tracing.js file<br></br>
You need to configure the endpoint for SigNoz cloud in this file. You can find your ingestion key from SigNoz cloud account details sent on your email.

```js
// tracing.js
'use strict'
const process = require('process');
const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

// highlight-start
const exporterOptions = {
  url: 'https://ingest.{region}.signoz.cloud:443',
  headers: {
    "signoz-access-token": "Bearer SIGNOZ_INGESTION_KEY"
  }
}
// highlight-end

const traceExporter = new OTLPTraceExporter(exporterOptions);
const sdk = new opentelemetry.NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  resource: new Resource({
    // highlight-next-line
    [SemanticResourceAttributes.SERVICE_NAME]: 'node_app'
  })
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
```

Depending on the choice of your region for SigNoz cloud, the ingest endpoint will vary according to this table.

| Region | Endpoint |
| --- | --- |
| US |	ingest.us.signoz.cloud:443 |
| IN |	ingest.in.signoz.cloud:443 |
| EU | ingest.eu.signoz.cloud:443 |

Step 3. Run the application<br></br>
```bash
node -r ./tracing.js app.js
```

Step 4. You can validate if your application is sending traces to SigNoz cloud [here](#validating-instrumentation-by-checking-for-traces).

#### **Send traces via OTel Collector binary**

OTel Collector binary helps to collect logs, hostmetrics, resource and infra attributes. It is recommended to install Otel Collector binary to collect and send traces to SigNoz cloud. You can correlate signals and have rich contextual data through this way.

:::note
You can find instructions to install OTel Collector binary [here](https://signoz.io/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/) in your VM. Once you are done setting up your OTel Collector binary, you can follow the below steps for instrumenting your Javascript application.
:::

Step 1. Install OpenTelemetry packages

```js
npm install --save @opentelemetry/api@^1.4.1
npm install --save @opentelemetry/sdk-node@^0.39.1
npm install --save @opentelemetry/auto-instrumentations-node@^0.37.0
npm install --save @opentelemetry/exporter-trace-otlp-grpc@^0.39.1
```

Step 2. Create tracing.js file<br></br>

```js
// tracing.js
'use strict'
const process = require('process');
const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const exporterOptions = {
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4317',
}

const traceExporter = new OTLPTraceExporter(exporterOptions);
const sdk = new opentelemetry.NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  resource: new Resource({
    // highlight-next-line
    [SemanticResourceAttributes.SERVICE_NAME]: 'node_app'
  })
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
```

Step 3. Run the application<br></br>
```bash
node -r ./tracing.js app.js
```

Step 4. You can validate if your application is sending traces to SigNoz cloud [here](#validating-instrumentation-by-checking-for-traces).

</TabItem>
<TabItem value="k8s" label="Kubernetes">

For Javascript application deployed on Kubernetes, you need to install OTel Collector agent in your k8s infra to collect and send traces to SigNoz Cloud. You can find the instructions to install OTel Collector agent [here](/docs/tutorial/kubernetes-infra-metrics/).

Once you have set up OTel Collector agent, you can proceed with OpenTelemetry Javascript instrumentation by following the below steps:

Step 1. Install OpenTelemetry packages

```js
npm install --save @opentelemetry/api@^1.4.1
npm install --save @opentelemetry/sdk-node@^0.39.1
npm install --save @opentelemetry/auto-instrumentations-node@^0.37.0
npm install --save @opentelemetry/exporter-trace-otlp-grpc@^0.39.1
```

Step 2. Create tracing.js file<br></br>

```js
// tracing.js
'use strict'
const process = require('process');
const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const exporterOptions = {
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4317',
}

const traceExporter = new OTLPTraceExporter(exporterOptions);
const sdk = new opentelemetry.NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  resource: new Resource({
    // highlight-next-line
    [SemanticResourceAttributes.SERVICE_NAME]: 'node_app'
  })
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
```

Step 3. Run the application<br></br>
```bash
node -r ./tracing.js app.js
```

Step 4. You can validate if your application is sending traces to SigNoz cloud [here](#validating-instrumentation-by-checking-for-traces).

</TabItem>
</Tabs>


## Send Traces to Self-Hosted SigNoz

**Requirements**

- Node.js version 14 or newer ([See here](https://github.com/open-telemetry/opentelemetry-js#supported-runtimes))<br></br>
  <!-- Previous versions of node may work, but they are not tested by OpenTelemetry and they are not guaranteed to work. Please note that versions of Node.JS v8 prior to `v8.12.0` will NOT work, because OpenTelemetry Node depends on the perf_hooks module introduced in v8.5.0 and performance.timeOrigin that is set correctly starting in `v8.12.0`. -->

You can use OpenTelemetry Nodejs client libraries to send your traces directly to SigNoz. You have two choices for instrumenting your Nodejs application with OpenTelemetry.

- **[Use the all-in-one auto-instrumentation library(Recommended)](#using-the-all-in-one-auto-instrumentation-library)**<br></br>
The auto-instrumentation library of OpenTelemetry is a meta package that provides a simple way to initialize multiple Nodejs instrumnetations.

:::info

  If you are on K8s, you should checkout [opentelemetry operators](/docs/tutorial/opentelemetry-operator-usage/#opentelemetry-auto-instrumentation-injection) which enable auto instrumenting Javascript applications very easily.

:::

- **[Use a specific auto-instrumentation library](#using-a-specific-auto-instrumentation-library)**<br></br>
You can use individual auto-instrumentation libraries too for a specific component of your application. For example, you can use `@opentelemetry/instrumentation-express` for instrumenting the Express web framework.

### Using the all-in-one auto-instrumentation library

The recommended way to instrument your Javascript Nodejs application is to use the all-in-one auto-instrumentation library -  `@opentelemetry/auto-instrumentations-node`. It provides a simple way to initialize multiple Nodejs instrumentations.

Internally, it calls the specific auto-instrumentation library for components used in the application. You can see the complete list [here](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/metapackages/auto-instrumentations-node#supported-instrumentations).

The instrumentation automatically identifies the following within your application:

- Frameworks, such as Express, Nestjs
- Common protocols such as HTTP, HTTPS, and gRPC
- Databases, such as MySQL, MongoDB, Redis, etc.
- Other libraries used in the application


<figure data-zoomable align='center'>
    <img src="/img/docs/all_in_one_auto_instrumentation.webp" alt="All in one OpenTelemetry nodejs instrumentation "/>
    <figcaption><i>All in one auto instrumentation library - identifies and instruments packages used by your Nodejs application</i></figcaption>
</figure>

<br></br>


#### Steps to auto-instrument Nodejs application


1. Install the dependencies<br></br>
   We start by installing the relevant dependencies.
    
    ```bash
    npm install --save @opentelemetry/sdk-node
    npm install --save @opentelemetry/auto-instrumentations-node
    npm install --save @opentelemetry/exporter-trace-otlp-http
    ```
    
    The dependencies included are briefly explained below:<br></br>

    `@opentelemetry/sdk-node` - This package provides the full OpenTelemetry SDK for Node.js including tracing and metrics.<br></br>
    
    `@opentelemetry/auto-instrumentations-node` - This module provides a simple way to initialize multiple Node instrumentations.<br></br>
    
    `@opentelemetry/exporter-trace-otlp-http` - This module provides the exporter to be used with OTLP (`http/json`) compatible receivers.<br></br>

    <VersionPin />


    
2. **Create a `tracing.js` file**<br></br>
  The `tracing.js` file will contain the tracing setup code. Notice, that we have set some environment variables in the code(highlighted). You can update these variables based on your environment.
    
  ```jsx
    // tracing.js
    'use strict'
    const process = require('process');
    const opentelemetry = require('@opentelemetry/sdk-node');
    const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
    const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
    const { Resource } = require('@opentelemetry/resources');
    const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
    
    const exporterOptions = {
      // highlight-next-line
      url: 'http://localhost:4318/v1/traces'
    }
    
    const traceExporter = new OTLPTraceExporter(exporterOptions);
    const sdk = new opentelemetry.NodeSDK({
      traceExporter,
      instrumentations: [getNodeAutoInstrumentations()],
      // highlight-start
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'node_app'
      })
      // highlight-end
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
    ```
    
    OpenTelemetry Node SDK currently does not detect the `OTEL_RESOURCE_ATTRIBUTES` from `.env` files as of today. That’s why we need to include the variables in the `tracing.js` file itself.
    
    About environment variables:
    
    `service_name` : node_app (you can give whatever name that suits you)
    
    `http://localhost:4318/v1/traces` is the default url for sending your tracing data. We are assuming you have installed SigNoz on your `localhost`. Based on your environment, you can update it accordingly. It should be in the following format:
    
    `http://<IP of SigNoz backend>:4318/v1/traces`

  :::note
    Remember to allow incoming requests to port 4318 of machine where SigNoz backend is hosted.
    

  
3. **Run the application**<br></br>
  The tracing configuration should be run before your application code. We will use the [`-r, —require module`](https://nodejs.org/api/cli.html#cli_r_require_module) flag for that.<br></br>

  ```jsx
    node -r ./tracing.js app.js
    ```
  :::note
  If you're running your nodejs application in PM2 cluster mode, it doesn't support node args: [Unitech/pm2#3227](https://github.com/Unitech/pm2/issues/3227). As above sample app instrumentation requires to load `tracing.js` before app load by passing node arg, so nodejs instrumentation doesn't work in PM2 cluster mode. So you need to import `tracing.js` in your main application. The `import ./tracing.js` should be the first line of your application code and initialize it before any other function. Here's the [sample github repo](https://github.com/SigNoz/sample-nodejs-app/tree/init-tracer-main) which shows the implementation.    
  :::

## Validating instrumentation by checking for traces

With your application running, you can verify that you’ve instrumented your application with OpenTelemetry correctly by confirming that tracing data is being reported to SigNoz.

To do this, you need to ensure that your application generates some data. Applications will not produce traces unless they are being interacted with, and OpenTelemetry will often buffer data before sending. So you need to interact with your application and wait for some time to see your tracing data in SigNoz.

Validate your traces in SigNoz:

1. Trigger an action in your app that generates a web request. Hit the endpoint a number of times to generate some data. Then, wait for some time.
2. In SigNoz, open the `Services` tab. Hit the `Refresh` button on the top right corner, and your application should appear in the list of `Applications`.
3. Go to the `Traces` tab, and apply relevant filters to see your application’s traces.

You might see other dummy applications if you’re using SigNoz for the first time. You can remove it by following the docs [here](https://signoz.io/docs/operate/docker-standalone/#remove-the-sample-application).

<figure data-zoomable align='center'>
    <img src="/img/docs/nodejs_in_services_list.webp" alt="Node Application in the list of services being monitored in SigNoz"/>
    <figcaption><i>Node Application in the list of services being monitored in SigNoz</i></figcaption>
</figure>

<br></br>

If you don't see your application reported in the list of services, try our [troubleshooting](https://signoz.io/docs/install/troubleshooting/) guide.


### Using a specific auto-instrumentation library

If total installation size is not constrained, it is recommended to use the `@opentelemetry/auto-instrumentations-node` bundle with `@opentelemetry/sdk-node` for the most seamless instrumentation experience.

But you can also install specific auto-instrumenation packages for the components used by your application.

<figure data-zoomable align='center'>
    <img src="/img/docs/individual_auto_instrumentation_libraries.webp" alt="All in one OpenTelemetry nodejs instrumentation "/>
    <figcaption><i>You can also choose individual auto-instrumenation libraries, but the all-in-one library is recommended to get started</i></figcaption>
</figure>

<br></br>

If an application uses Express, HTTP, and MongoDB, we can instrument the application using the following modules:

- opentelemetry-instrumentation-express
- opentelemetry/instrumentation-mongodb
- opentelemetry/instrumentation-http

If you are using Express, the instrumentation relies on HTTP calls to also be instrumented. That’s why we’re also including the module for http instrumentation. Let’s see the steps required.

**Steps to use specific auto-instrumentation libraries**

1. **Install the dependencies**<br></br>
     We start by installing the relevant dependencies.
    
    ```bash
    npm install --save @opentelemetry/sdk-node
    npm install --save @opentelemetry/exporter-trace-otlp-http
    npm install --save @opentelemetry/instrumentation-express
    npm install --save @opentelemetry/instrumentation-mongodb
    npm install --save @opentelemetry/instrumentation-http
    ```
    
2. **Creat a `tracing.js` file**<br></br>
     The `tracing.js` file will contain the following tracing setup code. 
    
    ```jsx
    // tracing.js
    'use strict'
    const process = require('process');
    //OpenTelemetry
    const opentelemetry = require('@opentelemetry/sdk-node');
    const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
    //instrumentations
    const { ExpressInstrumentation } = require("@opentelemetry/instrumentation-express");
    const { MongoDBInstrumentation } = require("@opentelemetry/instrumentation-mongodb");
    const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
    
    const { Resource } = require('@opentelemetry/resources');
    const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
    
    const exporterOptions = {
      url: 'http://localhost:4318/v1/traces'
    }
    
    const traceExporter = new OTLPTraceExporter(exporterOptions);
    const sdk = new opentelemetry.NodeSDK({
      traceExporter,
      instrumentations: [new ExpressInstrumentation(), new MongoDBInstrumentation(), new HttpInstrumentation()],
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'node_app'
      })
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
    ```

    OpenTelemetry Node SDK currently does not detect the `OTEL_RESOURCE_ATTRIBUTES` from `.env` files as of today. That’s why we need to include the variables in the `tracing.js` file itself.
    
    About environment variables:
    
    `service_name` : node_app (you can give whatever name that suits you)
    
    `http://localhost:4318/v1/traces` is the default url for sending your tracing data. We are assuming you have installed SigNoz on your `localhost`. Based on your environment, you can update it accordingly. It should be in the following format:
    
    `http://<IP of SigNoz backend>:4318/v1/traces`

    :::note
    Remember to allow incoming requests to port 4318 of machine where SigNoz backend is hosted.
    :::
    
3. **Run the application**<br></br>
  The tracing configuration should be run before your application code. We will use the [`-r, —require module`](https://nodejs.org/api/cli.html#cli_r_require_module) flag for that.<br></br>

  ```jsx
    node -r ./tracing.js app.js
    ```
  :::note
  If you're running your nodejs application in PM2 cluster mode, it doesn't support node args: [Unitech/pm2#3227](https://github.com/Unitech/pm2/issues/3227). As above sample app instrumentation requires to load `tracing.js` before app load by passing node arg, so nodejs instrumentation doesn't work in PM2 cluster mode. So you need to import `tracing.js` in your main application. The `import ./tracing.js` should be the first line of your application code and initialize it before any other function. Here's the [sample github repo](https://github.com/SigNoz/sample-nodejs-app/tree/init-tracer-main) which shows the implementation.    
  :::

With your application running, you can verify that you’ve instrumented your application with OpenTelemetry correctly by [validating](#validating-instrumentation-by-checking-for-traces) if your traces are being to SigNoz.


## Instrumentation Modules for Databases

The `@opentelemetry/auto-instrumentations-node` can inititialize instrumentation for popular databases. Hence it’s recommended to [get started](#using-the-all-in-one-auto-instrumentation-library) with it.

But if you are using [specific auto-instrumentation packages](#using-a-specific-auto-instrumentation-library), here’s a list of packages for popular databases.

### MongoDB instrumentation

Note if you’re using `@opentelemetry/auto-instrumentations-node`, you don’t need to install specific modules for your database.

**Supported Versions**

• `>=3.3 <5`

Module that provides automatic instrumentation for MongoDB:

```jsx
npm install --save @opentelemetry/instrumentation-mongodb
```

### Redis Instrumentation

Note if you’re using `@opentelemetry/auto-instrumentations-node`, you don’t need to install specific modules for your database.

**Supported Versions**

This package supports `redis@^2.6.0` and `redis@^3.0.0`
For version `redis@^4.0.0`, please use `@opentelemetry/instrumentation-redis-4`

```jsx
npm install --save @opentelemetry/instrumentation-redis
```

### MySQL Instrumentation

Note if you’re using `@opentelemetry/auto-instrumentations-node`, you don’t need to install specific modules for your database.

**Supported Versions**

• `2.x`

Module that provides automatic instrumentation for MySQL:

```jsx
npm install --save @opentelemetry/instrumentation-mysql
```

### Memcached Instrumentation

Note if you’re using `@opentelemetry/auto-instrumentations-node`, you don’t need to install specific modules for your database.

**Supported Versions**

- `>=2.2`

Module that provides automatic instrumentation for Memcached:

```jsx
npm install --save @opentelemetry/instrumentation-memcached
```

## Troubleshooting your installation

Set an environment variable to run the OpenTelemetry launcher in debug mode, where it logs details about the configuration and emitted spans:

```bash
export OTEL_LOG_LEVEL=debug
```

<br></br>

The output may be very verbose with some benign errors. Early in the console output, look for logs about the configuration. Next, look for lines like the ones below, which are emitted when spans are emitted to SigNoz.

```bash
{
  "traceId": "985b66d592a1299f7d12ebca56ca1fe3",
  "parentId": "8d62a70aa335a227",
  "name": "bar",
  "id": "17ada85c3d55376a",
  "kind": 0,
  "timestamp": 1685674607399000,
  "duration": 299,
  "attributes": {},
  "status": { "code": 0 },
  "events": []
}
{
  "traceId": "985b66d592a1299f7d12ebca56ca1fe3",
  "name": "foo",
  "id": "8d62a70aa335a227",
  "kind": 0,
  "timestamp": 1585130342183948,
  "duration": 315,
  "attributes": {
    "name": "value"
  },
  "status": { "code": 0 },
  "events": [
    {
      "name": "event in foo",
      "time": [1585130342, 184213041]
    }
  ]
}
```

<br></br>

_Running short applications (Lambda/Serverless/etc)_
If your application exits quickly after startup, you may need to explicitly shutdown the tracer to ensure that all spans are flushed:

```bash
opentelemetry.trace.getTracer('your_tracer_name').getActiveSpanProcessor().shutdown()
```

<p>&nbsp;</p>

## Sample Javascript App

- We have included a sample applications at:
  - [Sample React App Github Repo](https://github.com/SigNoz/sample-reactjs-app)
  - [Sample NodeJs App Github Repo](https://github.com/SigNoz/sample-nodejs-app)
  - [Sample Distributed Tracing NodeJs App Github Repo](https://github.com/SigNoz/distributed-tracing-nodejs-sample)

## Further Reading

- [Nodejs Performance Monitoring](https://signoz.io/blog/nodejs-performance-monitoring/)
- [Implementing Distributed Tracing in a Nodejs application](https://signoz.io/blog/distributed-tracing-nodejs/)



<InstrumentationFAQ />
