---
id: elixir
title: Elixir Opentelemetry Instrumentation
description: Send events from your Elixir application to SigNoz

---
import InstrumentationFAQ from '../shared/instrumentation-faq.md'

We’ll focus on instrumenting one of the most common combos of the Elixir world: `Phoenix + Ecto`.

### **Step 1:** **Add the required dependencies**

The first step to instrument your Elixir application with OpenTelemetry is to add the required dependencies to your `mix.exs` file and fetch them with `mix deps.get`

```jsx
{:opentelemetry, "~> 1.0.3"},
{:opentelemetry_exporter, "~> 1.0.3"},
{:opentelemetry_phoenix, "~> 1.0.0"},
{:opentelemetry_ecto, "~> 1.0.0"}
```

### **Step 2: Configure the Elixir application to export telemetry data**

Then we need to configure our application to export telemetry data. There are two things that you need to set:

- `YOUR_APP_NAME`<br></br>
You can put your application or service name here for identification.
- `OTEL Collector endpoint`<br></br>
The OTEL collector comes bundled with SigNoz installation. Since, we installed SigNoz on our local machine, the endpoint is `http://localhost:4318`.

```jsx
config :opentelemetry, :resource, service: %{name: "YOUR_APP_NAME"}

config :opentelemetry, :processors,
  otel_batch_processor: %{
    exporter: {
      :opentelemetry_exporter,
      %{endpoints: ["http://localhost:4318"]}
    }
  }
```

### **Step 3: Initialize telemetry handlers**

As it is documented in the `opentelemetry_phoenix` and `opentelemetry_ecto` [hexdocs.pm](http://hexdocs.pm) pages, we need to initialize both telemetry handlers.

```elixir
OpentelemetryPhoenix.setup()
OpentelemetryEcto.setup([:your_app_name, :repo])
```

`:your_app_name` should be replaced by your app name and congratulations, you have instrumented your application with OpenTelemetry.

## Tutorial 

Here's a [tutorial](https://signoz.io/blog/opentelemetry-elixir/) with step by step guide on how to install SigNoz and start monitoring a sample Elixir app. 

Thanks to our community member [Ricardo](https://github.com/ricardoccpaiva) for creating this guide.

<InstrumentationFAQ />
