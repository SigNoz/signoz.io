---
id: nodejs
title: NodeJS
description: Send events from your NodeJS application to SigNoz

---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<p align="center">

[![Book meeting](/img/docs/ZoomCTA1.png)](https://calendly.com/pranay-signoz/instrumentation-office-hrs)

</p>


**Requirements**

- Node.js version 12 or newer
- An app to add OpenTelemetry to

### Instrumenting a sample Express application

For this tutorial, we’re going to create a very simple application: an express service that responds at `http://localhost:9090/hello` with "Hello World".
 
Steps to create a sample Express application:


1. **Git clone the sample app repo and change directory**<br></br>
   
   Sample nodejs application repo on <a href = "https://github.com/SigNoz/sample-nodejs-app" rel="noopener noreferrer nofollow" target="_blank" >GitHub</a>.

   ```jsx
   git clone https://github.com/SigNoz/sample-nodejs-app.git
   cd sample-nodejs-app
   ```

2. **Install the dependencies**<br></br>
   The required OpenTelemetry packages will get installed using this command. OpenTelemetry clients have two major components: the SDK and the API. Following are the OpenTelemetry packages used for the sample application:

   - `@opentelemetry/api`
   - `@opentelemetry/auto-instrumentations-node`
   - `@opentelemetry/exporter-otlp-grpc`
   - `@opentelemetry/sdk-node`
   
   <br></br>

   ```jsx
   npm i
   ```

   Note: `auto-instrumentations-node` is a meta-package from <a href = "https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/metapackages/auto-instrumentations-node" rel="noopener noreferrer nofollow" target="_blank" >opentelemetry-js-contrib</a> that provides a simple way to initialize multiple Node.js instrumentation. 


3. **Start the Node application and start sending data to SigNoz**<br></br>

    The `tracing.js` file takes care of instantiating tracing for the application. You can have look at its <a href = "https://github.com/SigNoz/sample-nodejs-app/blob/master/tracing.js" rel="noopener noreferrer nofollow" target="_blank" >content</a> in the GitHub repo.
   
    Now you need to run your application with some environment variables for OpenTelemetry. Environment variables that need to be configured:

    a. `IP of SigNoz backend` - IP of the machine where SigNoz is installed. In case you have installed SigNoz on your local machine, you can use `localhost`

    b. `service_name` - the service you are monitoring (you can name it anything)
    :::note
      Node SDK doesn't automatically detect the `OTEL_RESOURCE_ATTRIBUTES` as of today. Please edit the
      `tracing.js` to include the service name.
      ```js
      const sdk = new opentelemetry.NodeSDK({
        resource: new Resource({
          [SemanticResourceAttributes.SERVICE_NAME]: 'my-service',
        }),
        traceExporter,
        instrumentations: [getNodeAutoInstrumentations()]
      });
      ```

    :::
   
   
    You need to put these environment variables in the below command and run it at your terminal.
  
    ```jsx
    OTEL_EXPORTER_OTLP_ENDPOINT="<IP of SigNoz>:4317" \
    node -r ./tracing.js index.js
    ```

    If you're running SigNoz on `localhost`, and want to name your service as `node_app`, the final command will be as follows:

    ```jsx
    OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317" \
    node -r ./tracing.js index.js
    ```
    <br></br>

:::note

Remember to allow incoming requests to port **4317** of machine where SigNoz backend is hosted

:::

   You can check your application running at [http://localhost:9090/hello](http://localhost:9090/hello). You need to generate some load in order to see data reported on SigNoz dashboard. Refresh the endpoint for 10-20 times, and wait for 2-3 mins. 
   
   You should see your service `node_app` in the list of applications monitored on SigNoz dashboard as shown below.

   ![nodejs-app-instrumentation](../../static/img/docs/nodejs_app_instrumentation.gif)


### Troubleshooting your installation

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

