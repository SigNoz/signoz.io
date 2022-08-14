---
id: nestjs
title: NestJS OpenTelemetry Instrumentation
description: Send events from your NestJS application to SigNoz

---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import InstrumentationFAQ from '../shared/instrumentation-faq.md'

<p align="center">

[![Book meeting](/img/docs/ZoomCTA1.png)](https://calendly.com/pranay-signoz/instrumentation-office-hrs)

</p>

### Introduction to SigNoz for Nestjs

SigNoz can help you monitor your Nestjs applications for application related metrics like latency, request per second, error rates, etc. It can also monitor infrastructure metrics like CPU utilization and memory usage.

You can set alerts on metrics of your choice to stay on top of any issues arising in your deployed application.


### Getting started for Nestjs with SigNoz

SigNoz uses <a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank" >OpenTelemetry</a> for enabling your application code to generate telemetry data. OpenTelemetry provides a vendor-neutral <a href = "https://github.com/open-telemetry/opentelemetry-specification" rel="noopener noreferrer nofollow" target="_blank" >specification</a>  to instrument your application so that you can export data to any backend of your choice, such as SigNoz.

Let us see how to instrument your application with OpenTelemetry, so that you can visualize the data with SigNoz.

### Instrumenting a sample Nestjs application with OpenTelemetry

1. **Install below dependencies**<br></br>

   ```jsx
   npm install --save @opentelemetry/api
   npm install --save @opentelemetry/sdk-node
   npm install --save @opentelemetry/auto-instrumentations-node
   npm install --save @opentelemetry/exporter-trace-otlp-grpc
   npm install --save @grpc/grpc-js
   ```

2. **Create a `tracer.ts` file**<br></br>

   The `IP of SIgNoz` will be localhost if you are running SigNoz on local. If you are not running SigNoz on local machine, then please use the IP of the machine where SigNoz is installed.
   
   ```jsx
      'use strict'

      const opentelemetry = require('@opentelemetry/sdk-node');
      const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
      const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
      const { Resource } = require('@opentelemetry/resources');
      const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
      const grpc = require('@grpc/grpc-js');

      // configure the SDK to export telemetry data to the console
      // enable all auto-instrumentations from the meta package
      const exporterOptions = {
        url: 'http://localhost:4317',
        credentials: grpc.credentials.createInsecure(),
      }
      const traceExporter = new OTLPTraceExporter(exporterOptions);
      const sdk = new opentelemetry.NodeSDK({
        traceExporter,
        instrumentations: [getNodeAutoInstrumentations()],
        resource: new Resource({
          [SemanticResourceAttributes.SERVICE_NAME]: 'sampleNestJsApp'
        }),
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

      module.exports = sdk
  ```

3. **Import the tracer module where your app starts**<br></br>

   On `main.ts` file or file where your app starts import tracer using below command:

   ```jsx
   const tracer = require('./tracer')
   ```


4. **Start the tracer**<br></br>

   ```jsx
   await tracer.start();
   ```

You can now run your Nestjs application. The data captured with OpenTelemetry from your application should start showing on the SigNoz dashboard.

### Testing with sample Nestjs application
If you want to test out how SigNoz works with a sample Nestjs application, check out a sample Nestjs application at this [GitHub repo](https://github.com/SigNoz/sample-NestJs-app).

<InstrumentationFAQ />