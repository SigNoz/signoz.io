---
id: ruby-on-rails
title: Ruby on Rails OpenTelemetry Instrumentation
description: Send events from your RoR application to SigNoz

---
import InstrumentationFAQ from '../shared/instrumentation-faq.md'


### **Step 1: Install dependencies**

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

### **Step 2: Initialize the OpenTelemetry SDK**

Initialize the otel sdk by adding below lines to `config/environment.rb` of your Ruby on Rails application.

```jsx
require 'opentelemetry/sdk'
require_relative 'application'

OpenTelemetry::SDK.configure do |c|
  c.use_all
end

Rails.application.initialize!
```

### **Step 3: Running your Ruby application**

Now we have to set the following environment variables to export the collected telemetry data for storage and visualization.

- `OTEL_EXPORTER` : It is the format of exported data. Since SigNoz natively supports otlp so it should be set as `otlp`

- `OTEL_SERVICE_NAME` : Name of service(anything you want)

- `OTEL_EXPORTER_OTLP_ENDPOINT` : Specify the endpoint of OTEL collector in format `http://IP_OF_SIGNOZ:4318`. The OTEL collector comes bundled with SigNoz installation. Since, we installed SigNoz on our local machine, the endpoint is `http://localhost:4318`.

- `OTEL_RESOURCE_ATTRIBUTES` : Pass custom attributes like application name with `OTEL_RESOURCE_ATTRIBUTES=application=yourAppName`

Using the above mentioned environment variables, run the application:

```jsx
OTEL_EXPORTER=otlp OTEL_SERVICE_NAME=yourSampleRailsApp OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318 OTEL_RESOURCE_ATTRIBUTES=application=sparkapp rails server
```

## Tutorials
Here's a [tutorial](https://signoz.io/blog/opentelemetry-ruby/) with step by step guide on how to install SigNoz and start monitoring a sample Ruby on Rails app. 


Here's a <a href = "https://medium.com/@leunardus.vederis714/monitor-your-ruby-on-rails-app-using-signoz-opentelemetry-b59578f3b252" rel="noopener noreferrer nofollow" target="_blank" >detailed guide</a> published by our community member Vederis on how to monitor your Ruby on Rails application with OpenTelemetry and SigNoz.

## Sample Ruby on Rails application
We have included a sample Ruby on Rails application with README.md at [Sample Rails App Github Repo.](https://github.com/SigNoz/sample-rails-app)

Feel free to use this repo to test out OpenTelemetry instrumentation and how to send telemetry data to SigNoz.


<InstrumentationFAQ />
