---
id: php
title: PHP Opentelemetry Instrumentation
description: Send events from your PHP application to SigNoz

---
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import InstrumentationFAQ from '../shared/instrumentation-faq.md'

This doc contains instructions about how to set up OpenTelemetry(OTel) instrumentation in your PHP application. OpenTelemetry, also known as OTel for short, is an open-source observability framework that can help you generate and collect telemetry data - traces, metrics, and logs from your PHP application.

Once the telemetry data is generated, you can configure an exporter to send the data to SigNoz for monitoring and visualization.

There are three major steps to using OpenTelemetry:

- Instrumenting your PHP application with OpenTelemetry
- Configuring the exporter to send data to SigNoz
- Validating that configuration to ensure that data is being sent as expected.

In this documentation, we will instrument a PHP application for traces and send it to SigNoz.

## Requirements

- [PHP 8.0+](https://www.php.net/)

- [PECL](https://pecl.php.net/)

- [Composer](https://getcomposer.org/)

## Send traces to SigNoz Cloud
Based on your application environment, you can choose the setup below to send traces to SigNoz Cloud.

<Tabs>
<TabItem value="VM" label="VM" default>
From VMs, there are two ways to send data to SigNoz Cloud.

- [Send traces directly to SigNoz Cloud](#send-traces-directly-to-signoz-cloud)
- [Send traces via OTel Collector binary](#send-traces-via-otel-collector-binary) (recommended)

#### Send traces directly to SigNoz cloud

Here we will be sending traces to SigNoz cloud in 4 easy steps, if you want to send traces to self hosted SigNoz , you can refer to [this](https://signoz.io/docs/instrumentation/PHP/#send-traces-to-self-hosted-signoz). We will be using Zero-code configuration for Automatic Instrumentation.

**Step 1: Setup Development Environment**

To configure our PHP application to send data, you need to use OpenTelemetry PHP extension. Since the extension is built from the source, you need to have the build tools, which can be installed using the following command:

<Tabs>
<TabItem value="linux" label="Linux (apt)" default>

```
sudo apt-get install gcc make autoconf
```

</TabItem>
<TabItem value="mac" label="Mac (Homebrew)">

```
brew install gcc make autoconf
```

</TabItem>
</Tabs>


**Step 2: Build the extension**

With our environment set up we can install the extension using [PECL](https://pecl.php.net/):

```bash
pecl install opentelemetry
```

After successfully installing the OpenTelemetry extension, add the extension to `php.ini` file of your project:

```php
[opentelemetry]
extension=opentelemetry.so
```

Verify that the extension is enabled by running:

```
php -m | grep opentelemetry
```

This should output:

```
opentelemetry
```

**Step 3: Add the dependencies**

Add dependencies required for OpenTelemetry SDK for PHP to perform automatic instrumentation using this command :

```
composer config allow-plugins.php-http/discovery false
composer require \
  open-telemetry/sdk \
  open-telemetry/exporter-otlp \
  php-http/guzzle7-adapter \
  open-telemetry/transport-grpc
```

:::info
You can install the additional dependencies provided by OpenTelemetry for different PHP frameworks from [here](https://packagist.org/explore/?query=open-telemetry).
:::


**Step 4: Set environment variables and run app**

We are passing the environment variables on run time and this way we don't have to change anything in code.
Run your application using:

```
env OTEL_PHP_AUTOLOAD_ENABLED=true \
    OTEL_SERVICE_NAME=<SERVICE_NAME> \
    OTEL_TRACES_EXPORTER=otlp \
    OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf \
    OTEL_EXPORTER_OTLP_ENDPOINT=<SIGNOZ_ENDPOINT> \
    OTEL_EXPORTER_OTLP_HEADERS=signoz-access-token=<INGESTION_KEY> \
    OTEL_PROPAGATORS=baggage,tracecontext \
    php -S localhost:8080 app.php
```

You can change the env vars value by referencing values from the following lookup table

| Environment Variable                  | Value                                        |
|-------------------------------|----------------------------------------------|
| OTEL_SERVICE_NAME              | `<SERVICE_NAME>` replace it with name of your app                         |
| OTEL_EXPORTER_OTLP_ENDPOINT    | `<SIGNOZ_ENDPOINT>` replace this with SigNoz cloud endpoint                       |
| OTEL_EXPORTER_OTLP_HEADERS     | signoz-access-token=`<INGESTION_KEY>` replace this with the ingestion key which you must have received in mail        |
| php -S localhost:8080 app.php             | you can replace this with the run command of your PHP application                        |



#### Send traces via OTel Collector binary

**Step 1: Install OTel Collector**

OTel Collector binary helps to collect logs, hostmetrics, resource and infra attributes. It is recommended to install Otel Collector binary to collect and send traces to SigNoz cloud. You can correlate signals and have rich contextual data through this way.

:::note
You can find instructions to install OTel Collector binary [here](https://signoz.io/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/) in your VM. Once you are done setting up your OTel Collector binary, you can follow the below steps for instrumenting your PHP application.
:::

**Step 2: Setup Development Environment**

To configure our PHP application to send data, you need to use OpenTelemetry PHP extension. Since the extension is built from the source, you need to have the build tools, which can be installed using the following command:

<Tabs>
<TabItem value="linux" label="Linux (apt)" default>

```
sudo apt-get install gcc make autoconf
```

</TabItem>
<TabItem value="mac" label="Mac (Homebrew)">

```
brew install gcc make autoconf
```

</TabItem>
</Tabs>


**Step 3: Build the extension**

With our environment set up we can install the extension using [PECL](https://pecl.php.net/):

```bash
pecl install opentelemetry
```

After successfully installing the OpenTelemetry extension, add the extension to `php.ini` file of your project:

```php
[opentelemetry]
extension=opentelemetry.so
```

Verify that the extension is enabled by running:

```
php -m | grep opentelemetry
```

This should output:

```
opentelemetry
```

**Step 4: Add the dependencies**

Add dependencies required for OpenTelemetry SDK for PHP to perform automatic instrumentation using this command :

```
composer config allow-plugins.php-http/discovery false
composer require \
  open-telemetry/sdk \
  open-telemetry/exporter-otlp \
  php-http/guzzle7-adapter \
  open-telemetry/transport-grpc
```

:::info
You can install the additional dependencies provided by OpenTelemetry for different PHP frameworks from [here](https://packagist.org/explore/?query=open-telemetry).
:::

**Step 5: Set environment variables and run app**

We are passing the environment variables on run time and this way we don't have to change anything in code.
Run your application using:

```
env OTEL_PHP_AUTOLOAD_ENABLED=true \
    OTEL_SERVICE_NAME=<SERVICE_NAME> \
    OTEL_TRACES_EXPORTER=otlp \
    OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf \
    OTEL_EXPORTER_OTLP_ENDPOINT=<COLLECTOR_ENDPOINT> \
    OTEL_PROPAGATORS=baggage,tracecontext \
    php -S localhost:8080 app.php
```

You can change the env vars value by referencing values from the following lookup table

| Environment Variable                  | Value                                        |
|-------------------------------|----------------------------------------------|
| OTEL_SERVICE_NAME              | `<SERVICE_NAME>` replace it with name of your app                         |
| OTEL_EXPORTER_OTLP_ENDPOINT    | `<COLLECTOR_ENDPOINT>` replace this with the Otel Collector Endpoint. If you have hosted it somewhere, provide the URL. Otherwise, the default is `http://localhost:4317`, if you have followed our guide.                       |
| php -S localhost:8080 app.php             | you can replace this with the run command of your PHP application                        |

</TabItem>
<TabItem value="orange" label="Kubernetes">

**Step 1: Install OTel Collector agent in K8s**

For PHP application deployed on Kubernetes, you need to install OTel Collector agent in your k8s infra to collect and send traces to SigNoz Cloud. You can find the instructions to install OTel Collector agent [here](https://signoz.io/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/).


**Step 2: Setup Development Environment**

To configure our PHP application to send data, you need to use OpenTelemetry PHP extension. Since the extension is built from the source, you need to have the build tools, which can be installed using the following command:

<Tabs>
<TabItem value="linux" label="Linux (apt)" default>

```
sudo apt-get install gcc make autoconf
```

</TabItem>
<TabItem value="mac" label="Mac (Homebrew)">

```
brew install gcc make autoconf
```

</TabItem>
</Tabs>


**Step 3: Build the extension**

With our environment set up we can install the extension using [PECL](https://pecl.php.net/):

```bash
pecl install opentelemetry
```

After successfully installing the OpenTelemetry extension, add the extension to `php.ini` file of your project:

```php
[opentelemetry]
extension=opentelemetry.so
```

Verify that the extension is enabled by running:

```
php -m | grep opentelemetry
```

This should output:

```
opentelemetry
```

**Step 4: Add the dependencies**

Add dependencies required for OpenTelemetry SDK for PHP to perform automatic instrumentation using this command :

```
composer config allow-plugins.php-http/discovery false
composer require \
  open-telemetry/sdk \
  open-telemetry/exporter-otlp \
  php-http/guzzle7-adapter \
  open-telemetry/transport-grpc
```

:::info
You can install the additional dependencies provided by OpenTelemetry for different PHP frameworks from [here](https://packagist.org/explore/?query=open-telemetry).
:::

**Step 5: Set environment variables and run app**

We are passing the environment variables on run time and this way we don't have to change anything in code.
Run your application using:

```
env OTEL_PHP_AUTOLOAD_ENABLED=true \
    OTEL_SERVICE_NAME=<SERVICE_NAME> \
    OTEL_TRACES_EXPORTER=otlp \
    OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf \
    OTEL_EXPORTER_OTLP_ENDPOINT=<COLLECTOR_ENDPOINT> \
    OTEL_PROPAGATORS=baggage,tracecontext \
    php -S localhost:8080 app.php
```

You can change the env vars value by referencing values from the following lookup table

| Environment Variable                  | Value                                        |
|-------------------------------|----------------------------------------------|
| OTEL_SERVICE_NAME              | `<SERVICE_NAME>` replace it with name of your app                         |
| OTEL_EXPORTER_OTLP_ENDPOINT    | `<COLLECTOR_ENDPOINT>` replace this with the Otel Collector Endpoint. If you have hosted it somewhere, provide the URL. Otherwise, the default is `http://localhost:4317`, if you have followed our guide.                       |
| php -S localhost:8080 app.php             | you can replace this with the run command of your PHP application                        |
</TabItem>
</Tabs>

#### Send Traces to Self-Hosted SigNoz

**Step 1: Setup Development Environment**

To configure our PHP application to send data, you need to use OpenTelemetry PHP extension. Since the extension is built from the source, you need to have the build tools, which can be installed using the following command:

<Tabs>
<TabItem value="linux" label="Linux (apt)" default>

```
sudo apt-get install gcc make autoconf
```

</TabItem>
<TabItem value="mac" label="Mac (Homebrew)">

```
brew install gcc make autoconf
```

</TabItem>
</Tabs>


**Step 2: Build the extension**

With our environment set up we can install the extension using [PECL](https://pecl.php.net/):

```bash
pecl install opentelemetry
```

After successfully installing the OpenTelemetry extension, add the extension to `php.ini` file of your project:

```php
[opentelemetry]
extension=opentelemetry.so
```

Verify that the extension is enabled by running:

```
php -m | grep opentelemetry
```

This should output:

```
opentelemetry
```

**Step 3: Add the dependencies**

Add dependencies required for OpenTelemetry SDK for PHP to perform automatic instrumentation using this command :

```
composer config allow-plugins.php-http/discovery false
composer require \
  open-telemetry/sdk \
  open-telemetry/exporter-otlp \
  php-http/guzzle7-adapter \
  open-telemetry/transport-grpc
```

:::info
You can install the additional dependencies provided by OpenTelemetry for different PHP frameworks from [here](https://packagist.org/explore/?query=open-telemetry).
:::

**Step 4: Set environment variables and run app**

We are passing the environment variables on run time and this way we don't have to change anything in code.
Run your application using:

```
env OTEL_PHP_AUTOLOAD_ENABLED=true \
    OTEL_SERVICE_NAME=<SERVICE_NAME> \
    OTEL_TRACES_EXPORTER=otlp \
    OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf \
    OTEL_EXPORTER_OTLP_ENDPOINT=<SIGNOZ_ENDPOINT> \
    OTEL_PROPAGATORS=baggage,tracecontext \
    php -S localhost:8080 app.php
```

You can change the env vars value by referencing values from the following lookup table

| Environment Variable                  | Value                                        |
|-------------------------------|----------------------------------------------|
| OTEL_SERVICE_NAME              | `<SERVICE_NAME>` replace it with name of your app                         |
| OTEL_EXPORTER_OTLP_ENDPOINT    | `<SIGNOZ_ENDPOINT>` replace this with the url where you have hosted SigNoz                     |
| php -S localhost:8080 app.php             | you can replace this with the run command of your PHP application                        |

#### Sample PHP Application

We have included a sample PHP application at [Sample PHP App Github Repo](https://github.com/SigNoz/OpenTelemetry-PHP-example), 

## Tutorial 

Here's a [tutorial](https://signoz.io/blog/opentelemetry-PHP/) with step by step guide on how to install SigNoz and start monitoring a sample PHP app. 

<InstrumentationFAQ />
