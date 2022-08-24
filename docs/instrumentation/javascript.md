---
id: javascript
title: Javascript OpenTelemetry Instrumentation
description: Send events from your Javascript application to SigNoz

---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import InstrumentationFAQ from '../shared/instrumentation-faq.md'


This document contains OpenTelemetry instrumentation instructions for Javascript backend frameworks and modules based on Nodejs.


## Traces

**Requirements**

- Node.js version 14 or newer ([See here](https://github.com/open-telemetry/opentelemetry-js#supported-runtimes))<br></br>
  <!-- Previous versions of node may work, but they are not tested by OpenTelemetry and they are not guaranteed to work. Please note that versions of Node.JS v8 prior to `v8.12.0` will NOT work, because OpenTelemetry Node depends on the perf_hooks module introduced in v8.5.0 and performance.timeOrigin that is set correctly starting in `v8.12.0`. -->

You can use OpenTelemetry Nodejs client libraries to send your traces directly to SigNoz. You have two choices for instrumenting your Nodejs application with OpenTelemetry.

- **[Use the all-in-one auto-instrumentation library(Recommended)](#using-the-all-in-one-auto-instrumentation-library)**<br></br>
The auto-instrumentation library of OpenTelemetry is a meta package that provides a simple way to initialize multiple Nodejs instrumnetations.

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
    


#### Validating instrumentation by checking for traces

With your application running, you can verify that you’ve instrumented your application with OpenTelemetry correctly by confirming that tracing data is being reported to SigNoz.

To do this, you need to ensure that your application generates some data. Applications will not produce traces unless they are being interacted with, and OpenTelemetry will often buffer data before sending. So you need to interact with your application and wait for some time to see your tracing data in SigNoz.

Validate your traces in SigNoz:

1. Trigger an action in your app that generates a web request. Hit the endpoint a number of times to generate some data.
2. In SigNoz, open the `Services` tab. Hit the `Refresh` button on the top right corner, and your application should appear in the list of `Applications`.
3. Go to the `Traces` tab, and apply relevant filters to see your application’s traces.

You might see other dummy applications if you’re using SigNoz for the first time. You can remove it by following the docs [here](https://signoz.io/docs/operate/docker-standalone/#remove-the-sample-application).

<figure data-zoomable align='center'>
    <img src="/img/docs/nodejs_in_services_list.webp" alt="Node Application in the list of services being monitored in SigNoz"/>
    <figcaption><i>Node Application in the list of services being monitored in SigNoz</i></figcaption>
</figure>

<br></br>


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
    

With your application running, you can verify that you’ve instrumented your application with OpenTelemetry correctly by [validating](#validating-instrumentation-by-checking-for-traces) if your traces are being to SigNoz.

## Instrumentation Modules for Javascript Frameworks

The `@opentelemetry/auto-instrumentations-node` can inititialize instrumentation for many frameworks, databases, and network protocols. Hence it’s recommended to [get started](https://www.notion.so/New-JS-Doc-88febbff9cd942839239bdbe61be4557) with it.

### Nestjs Instrumentation

OpenTelemetry Nest instrumentation allows the user to automatically collect trace data from nestjs application. The `opentelemetry/auto-instrumentations-node` can be used to initialize automatic instrumentation for Nest framework.

**Supported Versions**

- `>=4.0.0`

1. Install the dependencies<br></br>
   We start by installing the relevant dependencies.
    
    ```bash
    npm install --save @opentelemetry/sdk-node
    npm install --save @opentelemetry/auto-instrumentations-node
    npm install --save @opentelemetry/exporter-trace-otlp-http
    ```

2. Create a `tracer.ts` file
    
    ```jsx
    'use strict'
    const process = require('process');
    //OpenTelemetry
    const opentelemetry = require('@opentelemetry/sdk-node');
    const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
    const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
    const {Resource} = require('@opentelemetry/resources');
    const {SemanticResourceAttributes} = require('@opentelemetry/semantic-conventions');
    
    const exporterOptions = {
        url: 'http://localhost:4318/v1/traces'
      }
    
    const traceExporter = new OTLPTraceExporter(exporterOptions);
    const sdk = new opentelemetry.NodeSDK({
      traceExporter,
      instrumentations: [getNodeAutoInstrumentations()],
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'sampleNestjsApplication'
      })
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
    

3. Import the tracer module where your app starts
    
    ```jsx
    const tracer = require('./tracer')
    ```
    

4. Start the tracer<br></br>
   In the `async function boostrap` section of the application code, initialize the tracer as follows: 
    
    ```jsx
    const tracer = require('./tracer')
    
    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';
      // All of your application code and any imports that should leverage
      // OpenTelemetry automatic instrumentation must go here.
    
    async function bootstrap() {
        // highlight-start
        await tracer.start();
        //highlight-end
        const app = await NestFactory.create(AppModule);
        await app.listen(3001);
      }
      bootstrap();
    ```

    You can now run your Nestjs application. The data captured with OpenTelemetry from your application should start showing on the SigNoz dashboard.
    

But if you want to instrument only your Nestjs framework, then you need to use the following package:

```jsx
npm install --save @opentelemetry/instrumentation-nestjs-core
```

Note that in the above case, you will have to install packages for all the components that you want to instrument with OpenTelemetry individually.

### Express Instrumentation

**Supported Versions**

- `^4.0.0`

For Express instrumentation, you can use the [all-in-one auto-instrumentation](#using-the-all-in-one-auto-instrumentation-library) package to get started easily.

But if want to instrument only your Express module, you can do so. The instrumentation for express module depends on HTTP calls to also be instrumented. So you need to install and enable packages for both.

```jsx
npm install --save @opentelemetry/instrumentation-http @opentelemetry/instrumentation-express
```

### Fastify Instrumentation

**Supported Versions**

- `^3.0.0`

For Fastify instrumentation, you can use the [all-in-one auto-instrumentation](#using-the-all-in-one-auto-instrumentation-library) package to get started easily.

But if want to instrument only your Fastify module, you can do so. The instrumentation for fastify module depends on HTTP calls to also be instrumented. So you need to install and enable packages for both.

```jsx
npm install --save @opentelemetry/instrumentation-http @opentelemetry/instrumentation-fastify
```

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

## Further Reading

- [Nodejs Performance Monitoring](https://signoz.io/blog/nodejs-performance-monitoring/)
- [Implementing Distributed Tracing in a Nodejs application](https://signoz.io/blog/distributed-tracing-nodejs/)



<InstrumentationFAQ />
