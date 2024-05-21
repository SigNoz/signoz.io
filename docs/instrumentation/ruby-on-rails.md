---
id: ruby-on-rails
title: Ruby on Rails OpenTelemetry Instrumentation
description: Send events from your RoR application to SigNoz

---
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import InstrumentationFAQ from '../shared/instrumentation-faq.md'

## Send Traces to SigNoz Cloud

Based on your application environment, you can choose the setup below to send traces to SigNoz Cloud.

<Tabs>
<TabItem value="vm" label="VM" default>

From VMs, there are two ways to send data to SigNoz Cloud.

- [Send traces directly to SigNoz Cloud](#send-traces-directly-to-signoz-cloud)
- [Send traces via OTel Collector binary](#send-traces-via-otel-collector-binary) (recommended)

#### Send traces directly to SigNoz Cloud

**Step 1. Install dependencies**

Install dependencies related to OpenTelemetry SDK and exporter using gem.

```go
gem install opentelemetry-sdk
gem install opentelemetry-exporter-otlp
gem install opentelemetry-instrumentation-all
```

Include the required packages into your gemfile.

```go
gem 'opentelemetry-sdk'
gem 'opentelemetry-exporter-otlp'
gem 'opentelemetry-instrumentation-all'
```

Run the bundle install command:

```go
bundle install
```

**Step 2. Initialize the OpenTelemetry SDK**

Initialize the otel sdk by adding below lines to `config/environment.rb` of your Ruby on Rails application.

```jsx
require 'opentelemetry/sdk'
require_relative 'application'

OpenTelemetry::SDK.configure do |c|
  c.use_all
end

Rails.application.initialize!
```

**Step 3. Running your Ruby application**

Run the application using the below:

```jsx
OTEL_EXPORTER=otlp \
OTEL_SERVICE_NAME=<service_name> \
OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.{region}.signoz.cloud:443 \
OTEL_EXPORTER_OTLP_HEADERS=signoz-access-token=SIGNOZ_INGESTION_KEY \
rails server
```

- `<service_name>` : Name of service. For example, `sampleRailsApp`
- `SIGNOZ_INGESTION_KEY` : The ingestion key sent by SigNoz over email. It can also be found in the `settings` section of your SigNoz Cloud UI.

Depending on the choice of your region for SigNoz cloud, the ingest endpoint will vary according to this table.

| Region | Endpoint |
| --- | --- |
| US |	ingest.us.signoz.cloud:443 |
| IN |	ingest.in.signoz.cloud:443 |
| EU | ingest.eu.signoz.cloud:443 |

---
#### Send traces via OTel Collector binary

OTel Collector binary helps to collect logs, hostmetrics, resource and infra attributes. It is recommended to install Otel Collector binary to collect and send traces to SigNoz cloud. You can correlate signals and have rich contextual data through this way.

You can find instructions to install OTel Collector binary [here](https://signoz.io/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/) in your VM. Once you are done setting up your OTel Collector binary, you can follow the below steps for instrumenting your Ruby on Rails application.

**Step 1. Install dependencies**

Install dependencies related to OpenTelemetry SDK and exporter using gem.

```go
gem install opentelemetry-sdk
gem install opentelemetry-exporter-otlp
gem install opentelemetry-instrumentation-all
```

Include the required packages into your gemfile.

```go
gem 'opentelemetry-sdk'
gem 'opentelemetry-exporter-otlp'
gem 'opentelemetry-instrumentation-all'
```

Run the bundle install command:

```go
bundle install
```

**Step 2. Initialize the OpenTelemetry SDK**

Initialize the otel sdk by adding below lines to `config/environment.rb` of your Ruby on Rails application.

```jsx
require 'opentelemetry/sdk'
require_relative 'application'

OpenTelemetry::SDK.configure do |c|
  c.use_all
end

Rails.application.initialize!
```

**Step 3. Running your Ruby application**

Run the application using the below:

```jsx
OTEL_EXPORTER=otlp \
OTEL_SERVICE_NAME=<service_name> \
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318 \
rails server
```

- `<service_name>` : Name of service. For example, `sampleRailsApp`

In case you have OtelCollector Agent in different VM, replace localhost:4318 with `<IP Address of the VM>:4318`.

</TabItem>

<TabItem value="k8s" label="Kubernetes" default>

For Ruby on Rails application deployed on Kubernetes, you need to install OTel Collector agent in your k8s infra to collect and send traces to SigNoz Cloud. You can find the instructions to install OTel Collector agent [here](https://signoz.io/docs/tutorial/kubernetes-infra-metrics/).



**Step 1. Install dependencies**

Install dependencies related to OpenTelemetry SDK and exporter using gem.

```go
gem install opentelemetry-sdk
gem install opentelemetry-exporter-otlp
gem install opentelemetry-instrumentation-all
```

Include the required packages into your gemfile.

```go
gem 'opentelemetry-sdk'
gem 'opentelemetry-exporter-otlp'
gem 'opentelemetry-instrumentation-all'
```

Run the bundle install command:

```go
bundle install
```

**Step 2. Initialize the OpenTelemetry SDK**

Initialize the otel sdk by adding below lines to `config/environment.rb` of your Ruby on Rails application.

```jsx
require 'opentelemetry/sdk'
require_relative 'application'

OpenTelemetry::SDK.configure do |c|
  c.use_all
end

Rails.application.initialize!
```

**Step 3. Running your Ruby application**

Run the application using the below:

```jsx
OTEL_EXPORTER=otlp \
OTEL_SERVICE_NAME=<service_name> \
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318 \
rails server
```

- `<service_name>` : Name of service. For example, `sampleRailsApp`


</TabItem>

</Tabs>

## Send Traces to Self-Hosted SigNoz

You can follow these steps to send your traces directly to your Self-Host SigNoz instance.

**Step 1. Install dependencies**

Install dependencies related to OpenTelemetry SDK and exporter using gem.

```go
gem install opentelemetry-sdk
gem install opentelemetry-exporter-otlp
gem install opentelemetry-instrumentation-all
```

Include the required packages into your gemfile.

```go
gem 'opentelemetry-sdk'
gem 'opentelemetry-exporter-otlp'
gem 'opentelemetry-instrumentation-all'
```

Run the bundle install command:

```go
bundle install
```

**Step 2. Initialize the OpenTelemetry SDK**

Initialize the otel sdk by adding below lines to `config/environment.rb` of your Ruby on Rails application.

```jsx
require 'opentelemetry/sdk'
require_relative 'application'

OpenTelemetry::SDK.configure do |c|
  c.use_all
end

Rails.application.initialize!
```

**Step 3. Running your Ruby application**

Run the application using the below:

```jsx
OTEL_EXPORTER=otlp \
OTEL_SERVICE_NAME=<service_name> \
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318 \
rails server
```

- `<service_name>` : Name of service. For example, `sampleRailsApp`

In case you have OtelCollector Agent in different VM, replace localhost:4318 with `<IP Address of the VM>:4318`.


## Tutorials
Here's a [tutorial](https://signoz.io/blog/opentelemetry-ruby/) with step by step guide on how to install SigNoz and start monitoring a sample Ruby on Rails app. 

## Sample Ruby on Rails application
We have included a sample Ruby on Rails application with README.md at [Sample Rails App Github Repo.](https://github.com/SigNoz/sample-rails-app)

Feel free to use this repo to test out OpenTelemetry instrumentation and how to send telemetry data to SigNoz.

<InstrumentationFAQ />
