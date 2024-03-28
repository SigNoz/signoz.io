---
id: reactjs
title: ReactJs OpenTelemetry Instrumentation
description: Send traces from your React JS application to SigNoz
keywords:
 - OpenTelemetry ReactJS Monitoring
 - ReactJS Instrumentation
 - ReactJs Application Monitoring
 - Signoz ReactJs
 - SigNoz ReactJS Integration
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import InstrumentationFAQ from '../shared/instrumentation-faq.md'
import VersionPin from '../shared/nodejs-version-pin.md'


This document contains instructions on how to set up OpenTelemetry instrumentation in your ReactJS applications. OpenTelemetry, also known as OTel for short, is an open source observability framework that can help you generate and collect telemetry data - traces, metrics, and logs from your ReactJS application.

## Send traces to SigNoz Cloud

Based on your application environment, you can choose the setup below to send traces to SigNoz Cloud.

<Tabs>
<TabItem value="vm" label="VM" default>

From VMs, there are two ways to send data to SigNoz Cloud.

- [Send traces directly to SigNoz Cloud](#send-traces-directly-to-signoz-cloud)
- [Send traces via OTel Collector binary](#send-traces-via-otel-collector-binary) (recommended)

#### **Send traces directly to SigNoz Cloud**

Step 1. Install OpenTelemetry packages

```bash
npm install --save @opentelemetry/context-zone
npm install --save @opentelemetry/instrumentation
npm install --save @opentelemetry/auto-instrumentations-web
npm install --save @opentelemetry/sdk-trace-base
npm install --save @opentelemetry/sdk-trace-web
npm install --save @opentelemetry/resources
npm install --save @opentelemetry/semantic-conventions
npm install --save @opentelemetry/exporter-trace-otlp-http
```

Step 2. Create `tracing.js` file<br></br>
You need to configure the endpoint for SigNoz cloud in this file. You can find your ingestion key from SigNoz cloud account details sent on your email.

```js
// tracing.js
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const provider = new WebTracerProvider({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'sample-react-instrumented-app',
    }),
});
const exporter = new OTLPTraceExporter({
    url: 'https://ingest.[region].signoz.cloud:443/v1/traces',
    headers: {
        "signoz-access-token": "your ingestion key",
    },
});
provider.addSpanProcessor(new BatchSpanProcessor(exporter));

provider.register({
    // Changing default contextManager to use ZoneContextManager - supports asynchronous operations so that traces are not broken
    contextManager: new ZoneContextManager(),
});

// Registering instrumentations
registerInstrumentations({
    instrumentations: [
        getWebAutoInstrumentations({
						
            '@opentelemetry/instrumentation-xml-http-request': {
                propagateTraceHeaderCorsUrls: [
                    /.+/g, //Regex to match your backend urls.
                ],
            },
            '@opentelemetry/instrumentation-fetch': {
                propagateTraceHeaderCorsUrls: [
                    /.+/g, //Regex to match your backend urls.
                ],
            },
        }),
    ],
});
```

Depending on the choice of your region for SigNoz cloud, the ingest endpoint will vary according to this table.

| Region | Endpoint |
| --- | --- |
| US |	ingest.us.signoz.cloud:443/v1/traces |
| IN |	ingest.in.signoz.cloud:443/v1/traces |
| EU | ingest.eu.signoz.cloud:443/v1/traces |

Step 3. Import tracer in main file<br></br>
:::info
The below import should be the first line in the main file of your application (Ex -> `main.ts`)
::: 
    
```jsx
const tracer = require('./tracer')
```

Step 4. Run the application

Run your ReactJS application as you normally would. The OpenTelemetry instrumentation will automatically start sending traces to SigNoz.

## Optional Configurations

The `auto-instrumentations-web` package is a comprehensive metapackage that consolidates several key OpenTelemetry instrumentation packages. It includes:

- [@opentelemetry/instrumentation-document-load](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/web/opentelemetry-instrumentation-document-load)
- [@opentelemetry/instrumentation-fetch](https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/opentelemetry-instrumentation-fetch)
- [@opentelemetry/instrumentation-user-interaction](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/web/opentelemetry-instrumentation-user-interaction)
- [@opentelemetry/instrumentation-xml-http-request](https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/opentelemetry-instrumentation-xml-http-request)

By bundling these packages, `auto-instrumentations-web` simplifies the process of installing multiple related packages. Instead of installing each package individually, you can install a single metapackage. But using this metapackage can increases your dependency graph size.
And a larger dependency graph size could lead to:

- **Increased Build Time:** More dependencies can lead to longer build times.
- **Larger Bundle Size:** It can result in a larger bundle size, which affects the loading time and performance of your web application.

A solution to this is to use individual instrumentation packages. For example: 
To do the intrumentation for the Long Task API, which is useful for monitoring tasks in web applications that take more than 50 milliseconds to execute, we can use [Long Task Instrumentation](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/web/opentelemetry-instrumentation-long-task), which can be done as:

```js
import { LongTaskInstrumentation } from '@opentelemetry/instrumentation-long-task';
// ...general opentelemetry configuration

registerInstrumentations({
  instrumentations: [
    new LongTaskInstrumentation(),
  ],
});
```

### Configuring Individual Instrumentation Packages

OpenTelemetry provides a couple of approaches for configuring instrumentation packages. These are:
1. **Using `getWebAutoInstrumentations`  for automatic instrumentation **

When utilizing getWebAutoInstrumentations, you can configure multiple instrumentations simultaneously. This method is particularly useful for a broad and automated setup. Here's how to configure it:

```js
registerInstrumentations({
  instrumentations: [
    getWebAutoInstrumentations({
      "@opentelemetry/instrumentation-user-interaction": {
        enabled: true,
        eventNames: [
          "click",
          "load",
          "loadeddata",
          "loadedmetadata",
          "loadstart",
          "error",
        ],
      },
      // Additional instrumentation configurations can be added here
    }),
  ],
});
```
In this configuration:
- `enabled`: The enabled flag when set to `true`, activates the instrumentation.
- `eventNames`: Specifies the list of DOM events to monitor, such as clicks and load events.

2. **Using Direct Instrumentation**
When you need to configure a specific instrumentation, direct instrumentation is the way to go. Here's an example of how to configure the User Interaction Instrumentation directly:
```js
registerInstrumentations({
  instrumentations: [
    new UserInteractionInstrumentation({
      eventNames: ['submit', 'click', 'keypress'],
    }),
    // Additional direct instrumentations can be added here
  ],
});
```
In this configuration:

- `UserInteractionInstrumentation`: This is instantiated directly with specific options.
- `eventNames`: Defines the specific user interaction events to be tracked, such as form submissions, clicks, and keypresses.

#### **Send traces via OTel Collector binary**

Step 1. Install OpenTelemetry packages

```bash
npm install --save @opentelemetry/context-zone
npm install --save @opentelemetry/instrumentation
npm install --save @opentelemetry/auto-instrumentations-web
npm install --save @opentelemetry/sdk-trace-base
npm install --save @opentelemetry/sdk-trace-web
npm install --save @opentelemetry/resources
npm install --save @opentelemetry/semantic-conventions
npm install --save @opentelemetry/exporter-trace-otlp-http
```

Step 2. Create `tracing.js` file<br></br>
You need to configure the endpoint for SigNoz cloud in this file. You can find your ingestion key from SigNoz cloud account details sent on your email.

```js
// tracing.js
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const provider = new WebTracerProvider({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'my-app',
    }),
});
const exporter = new OTLPTraceExporter({
    url: 'http://localhost:4318/v1/traces',
});
provider.addSpanProcessor(new BatchSpanProcessor(exporter));

provider.register({
    // Changing default contextManager to use ZoneContextManager - supports asynchronous operations so that traces are not broken
    contextManager: new ZoneContextManager(),
});

// Registering instrumentations
registerInstrumentations({
    instrumentations: [
        getWebAutoInstrumentations({
                        
            '@opentelemetry/instrumentation-xml-http-request': {
                propagateTraceHeaderCorsUrls: [
                    /.+/g, //Regex to match your backend urls.
                ],
            },
            '@opentelemetry/instrumentation-fetch': {
                propagateTraceHeaderCorsUrls: [
                    /.+/g, //Regex to match your backend urls.
                ],
            },
        }),
    ],
});
```

Depending on the choice of your region for SigNoz cloud, the ingest endpoint will vary according to this table.


Step 3. Import tracer in main file<br></br>
:::info
The below import should be the first line in the main file of your application (Ex -> `main.ts`, `index.js`)
::: 
    
```jsx
const tracer = require('./tracer')
```

Step 4. Run the application

Run your ReactJS application as you normally would. The OpenTelemetry instrumentation will automatically start sending traces to SigNoz.

## Optional Configurations

The `auto-instrumentations-web` package is a comprehensive metapackage that consolidates several key OpenTelemetry instrumentation packages. It includes:

- [@opentelemetry/instrumentation-document-load](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/web/opentelemetry-instrumentation-document-load)
- [@opentelemetry/instrumentation-fetch](https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/opentelemetry-instrumentation-fetch)
- [@opentelemetry/instrumentation-user-interaction](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/web/opentelemetry-instrumentation-user-interaction)
- [@opentelemetry/instrumentation-xml-http-request](https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/opentelemetry-instrumentation-xml-http-request)

By bundling these packages, `auto-instrumentations-web` simplifies the process of installing multiple related packages. Instead of installing each package individually, you can install a single metapackage. But using this metapackage can increases your dependency graph size.
And a larger dependency graph size could lead to:

- **Increased Build Time:** More dependencies can lead to longer build times.
- **Larger Bundle Size:** It can result in a larger bundle size, which affects the loading time and performance of your web application.

A solution to this is to use individual instrumentation packages. For example: 
To do the instrumentation for the Long Task API, which is useful for monitoring tasks in web applications that take more than 50 milliseconds to execute, we can use [Long Task Instrumentation](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/web/opentelemetry-instrumentation-long-task), which can be done as:

```js
import { LongTaskInstrumentation } from '@opentelemetry/instrumentation-long-task';
// ...general opentelemetry configuration

registerInstrumentations({
  instrumentations: [
    new LongTaskInstrumentation(),
  ],
});
```

### Configuring Individual Instrumentation Packages

OpenTelemetry provides a couple of approaches for configuring instrumentation packages. These are:
1. **Using `getWebAutoInstrumentations`  for automatic instrumentation **

When utilizing getWebAutoInstrumentations, you can configure multiple instrumentations simultaneously. This method is particularly useful for a broad and automated setup. Here's how to configure it:

```js
registerInstrumentations({
  instrumentations: [
    getWebAutoInstrumentations({
      "@opentelemetry/instrumentation-user-interaction": {
        enabled: true,
        eventNames: [
          "click",
          "load",
          "loadeddata",
          "loadedmetadata",
          "loadstart",
          "error",
        ],
      },
      // Additional instrumentation configurations can be added here
    }),
  ],
});
```
In this configuration:
- `enabled`: The enabled flag when set to `true`, activates the instrumentation.
- `eventNames`: Specifies the list of DOM events to monitor, such as clicks and load events.

2. **Using Direct Instrumentation**
When you need to configure a specific instrumentation, direct instrumentation is the way to go. Here's an example of how to configure the User Interaction Instrumentation directly:
```js
registerInstrumentations({
  instrumentations: [
    new UserInteractionInstrumentation({
      eventNames: ['submit', 'click', 'keypress'],
    }),
    // Additional direct instrumentations can be added here
  ],
});
```
In this configuration:

- `UserInteractionInstrumentation`: This is instantiated directly with specific options.
- `eventNames`: Defines the specific user interaction events to be tracked, such as form submissions, clicks, and keypresses.


---
</TabItem>

</Tabs>