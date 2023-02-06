---
id: php
title: PHP Opentelemetry Instrumentation
description: Send events from your PHP application to SigNoz
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import InstrumentationFAQ from '../shared/instrumentation-faq.md'

### Introduction to SigNoz for PHP

SigNoz can help you monitor your PHP applications for application-related metrics like latency, request per second, error rates, etc. It can also monitor infrastructure metrics like CPU utilization and memory usage.

You can set alerts on metrics of your choice to stay on top of any issues arising in your deployed application.

### Getting started for PHP with SigNoz

SigNoz uses [OpenTelemetry](https://opentelemetry.io/) for enabling your application code to generate telemetry data. OpenTelemetry provides a vendor-neutral [specification](https://github.com/open-telemetry/opentelemetry-specification)  to instrument your application so that you can export data to any backend of your choice, such as SigNoz.

Let us see how to instrument your application with OpenTelemetry, so that you can visualize the data with SigNoz.

### Instrumenting a sample PHP application with OpenTelemetry

#### Install the following dependencies using `composer`

- open-telemetry/sdk
- open-telemetry/exporter-otlp
- php-http/guzzle7-adapter
- guzzlehttp/psr7

#### Import the required modules

```php
use GuzzleHttp\Client;
use OpenTelemetry\Contrib\Otlp\OtlpHttpTransportFactory;
use OpenTelemetry\Contrib\Otlp\SpanExporter;
use OpenTelemetry\SDK\Common\Attribute\Attributes;
use OpenTelemetry\SDK\Trace\SpanProcessor\SimpleSpanProcessor;
use OpenTelemetry\SDK\Trace\TracerProvider;
```

#### Define envs

Optionally, you can skip them in code and pass them via command line process args.

The `IP of SigNoz`will be localhost if you are running SigNoz on local. If you are not running SigNoz on `the` local machine, then please use the IP of the machine where SigNoz is installed.

```php
putenv('OTEL_EXPORTER_OTLP_ENDPOINT=<IP of SigNoz>');
putenv('OTEL_SERVICE_NAME=<NAME OF YOUR SERVICE>');
```

#### Initialise Exporter and Tracer module

```php
$transport = (new OtlpHttpTransportFactory())->create('http://<IP of SigNoz>:4318/v1/traces', 'application/x-protobuf');

$tracerProvider =  new TracerProvider(
    new SimpleSpanProcessor(
        new SpanExporter($transport)
    )
);
$tracer = $tracerProvider->getTracer('io.signoz.php.example');
```

#### Create and activate root span

```php
$root = $span = $tracer->spanBuilder('root')->startSpan();
$scope = $span->activate();
```

#### Start your first span, add attributes and events.

```php
$span = $tracer->spanBuilder('loop-' . $i)->startSpan();

    $span->setAttribute('remote_ip', '1.2.3.4')
        ->setAttribute('country', 'USA');

    $span->addEvent('found_login' . $i, new Attributes([
        'id' => $i,
        'username' => 'otuser' . $i,
    ]));
    $span->addEvent('generated_session', new Attributes([
        'id' => md5((string) microtime(true)),
    ]));


```

#### End the spans in hierarchical order

```php
$span->end();
$root->end();
$scope->detach();
```

#### Run and Visualize on SigNoz

```sh
OTEL_SERVICE_NAME=signoz-php-app php FILENAME.php
```

<figure data-zoomable>
    <img src="/img/docs/php-trace-detail-tags.webp" alt="SigNoz dashboard showing Trace Detail with tags"/>
    <figcaption><i>Detailed view of the Trace showing attached attributes/tags to the spans.</i></figcaption>
</figure>

<figure data-zoomable>
    <img src="/img/docs/php-trace-detail-events.webp" alt="SigNoz dashboard showing Trace Detail with events"/>
    <figcaption><i>Detailed view of the Trace showing attached events to spans.</i></figcaption>
</figure>

#### Testing with sample PHP application

If you want to test out how SigNoz works with a sample PHP application, check out a sample PHP application at this [GitHub](https://github.com/SigNoz/sample-php-app).

<InstrumentationFAQ />
