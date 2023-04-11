---
id: rust
title: Rust Opentelemetry Instrumentation
description: Send events from your Rust application to SigNoz

---
import InstrumentationFAQ from '../shared/instrumentation-faq.md'

- If you have your own Rust application, follow along the steps mentioned below. 

- If you don't have a Rust application, we have prepared a <a href = "https://github.com/SigNoz/sample-rust-app" rel="noopener noreferrer nofollow" target="_blank">sample Rust application</a> which is already instrumented with OpenTelemetry. This should help you get started.

### **Step 1:  Instrument your application with OpenTelemetry**<br></br>

To configure your application to send data we will need a function to initialize OpenTelemetry. Add the following snippet of code in your `main.rs` file.

```jsx
use opentelemetry::sdk::Resource;
use opentelemetry::trace::TraceError;
use opentelemetry::{global, sdk::trace as sdktrace};
use opentelemetry::{trace::Tracer};
use opentelemetry_otlp::WithExportConfig;


fn init_tracer() -> Result<sdktrace::Tracer, TraceError> {
    opentelemetry_otlp::new_pipeline()
        .tracing()
        .with_exporter(opentelemetry_otlp::new_exporter().tonic().with_env())
        .with_trace_config(
            sdktrace::config().with_resource(Resource::default()),
        )
        .install_batch(opentelemetry::runtime::Tokio)
}
```

### **Step 2:  Initialize the tracer in main.rs**<br></br>

Modify the main function to initialise the tracer  in `main.rs`

```jsx
#[tokio::main]
async fn main() -> Result<(), Box<dyn Error + Send + Sync + 'static>> {
    let _ = init_tracer()?;

    ...
}
```

### **Step 3:  Add the OpenTelemetry instrumentation for your sample Rust app**<br></br>

```jsx
    let parent_cx = global::get_text_map_propagator(|propagator| {
        propagator.extract(&HeaderExtractor(req.headers()))
    });
    tracer.start_with_context("fibonacci", &parent_cx);
```

### **Step 4: Set environment variables and run your Rust application**<br></br>

Now that you have instrumented your Rust application with OpenTelemetry, you need to set some environment variables to send data to SigNoz backend:

`OTEL_RESOURCE_ATTRIBUTES`: service.name=rust-app (you can name it whatever you want)

`OTEL_EXPORTER_OTLP_ENDPOINT`: http://localhost:4317

Since, we have installed SigNoz on our local machine, we use the above IP. If you install SigNoz on a different machine, you can update it with the relevant IP.

Hence, the final run command looks like this:

```jsx
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317 OTEL_RESOURCE_ATTRIBUTES=service.name=rust-app cargo run
```


## Tutorial 

Here's a [tutorial](https://signoz.io/blog/opentelemetry-rust/) with step by step guide on how to install SigNoz and start monitoring a sample Rust app. 

<InstrumentationFAQ />