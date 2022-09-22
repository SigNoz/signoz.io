---
id: golang
title: Go OpenTelemetry Instrumentation
description: Send events from your Go application to SigNoz

---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import InstrumentationFAQ from '../shared/instrumentation-faq.md'


This document contains instructions on how to set up OpenTelemetry instrumentation in your Go applications. OpenTelemetry, also known as OTel for short, is an open source observability framework that can help you generate and collect telemetry data - traces, metrics, and logs from your Go application.

## Instrumenting a Go application with OpenTelemetry

1. **Install Dependencies**<br></br>
   Dependencies related to OpenTelemetry exporter and SDK have to be installed first. Note that we are assuming you are using `gin` request router. If you are using other request routers, check out the [corresponding package](#request-routers).
   
   Run the below commands after navigating to the application source folder:
    
    ```bash
    go get go.opentelemetry.io/otel \
      go.opentelemetry.io/otel/trace \
      go.opentelemetry.io/otel/sdk \
      go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin \
      go.opentelemetry.io/otel/exporters/otlp/otlptrace \
      go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc \
    ```
    
2. **Declare environment variables for configuring OpenTelemetry**<br></br>
   Declare the following variables in `main.go` which we will use to configure OpenTelemetry:
   
   ```bash
    var (
        serviceName  = os.Getenv("SERVICE_NAME")
        collectorURL = os.Getenv("OTEL_EXPORTER_OTLP_ENDPOINT")
        insecure     = os.Getenv("INSECURE_MODE")
    )
    ```
    
3. **Instrument your Go application with OpenTelemetry**<br></br>
   To configure your application to send data we will need a function to initialize OpenTelemetry. Add the following snippet of code in your `main.go` file.
    
    ```bash
    import (
        .....
    
        "github.com/gin-gonic/gin"
        "go.opentelemetry.io/otel"
        "go.opentelemetry.io/otel/attribute"
        "go.opentelemetry.io/otel/exporters/otlp/otlptrace"
        "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc"
    
        "go.opentelemetry.io/otel/sdk/resource"
        sdktrace "go.opentelemetry.io/otel/sdk/trace"
    )
    
    func initTracer() func(context.Context) error {
    
        secureOption := otlptracegrpc.WithTLSCredentials(credentials.NewClientTLSFromCert(nil, ""))
        if len(insecure) > 0 {
            secureOption = otlptracegrpc.WithInsecure()
        }
    
        exporter, err := otlptrace.New(
            context.Background(),
            otlptracegrpc.NewClient(
                secureOption,
                otlptracegrpc.WithEndpoint(collectorURL),
            ),
        )
    
        if err != nil {
            log.Fatal(err)
        }
        resources, err := resource.New(
            context.Background(),
            resource.WithAttributes(
                attribute.String("service.name", serviceName),
                attribute.String("library.language", "go"),
            ),
        )
        if err != nil {
            log.Printf("Could not set resources: ", err)
        }
    
        otel.SetTracerProvider(
            sdktrace.NewTracerProvider(
                sdktrace.WithSampler(sdktrace.AlwaysSample()),
                sdktrace.WithBatcher(exporter),
                sdktrace.WithResource(resources),
            ),
        )
        return exporter.Shutdown
    }
    ```
    
4. **Initialize the tracer in main.go**<br></br>
   Modify the main function to initialise the tracer in `main.go`
    
    ```bash
    func main() {
        cleanup := initTracer()
        defer cleanup(context.Background())
    
        ......
    }
    ```
    
5. **Add the OpenTelemetry Gin middleware**<br></br>
   Configure Gin to use the middleware by adding the following lines in `main.go`.
    
    ```bash
    import (
        ....
      "go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
    )
    
    func main() {
        ......
        r := gin.Default()
        r.Use(otelgin.Middleware(serviceName))
        ......
    }
    ```
    
6. **Set environment variables and run your Go Gin application**<br></br>
   The run command must have some environment variables to send data to SigNoz. The run command:
    
    ```bash
    SERVICE_NAME=<service_name> INSECURE_MODE=true OTEL_METRICS_EXPORTER=none OTEL_EXPORTER_OTLP_ENDPOINT=<IP of SigNoz backend:4317> go run main.go
    ```
    
    We can replace the placeholders based on our environment.
    
    `SERVICE_NAME`: goGinApp (you can name it whatever you want)
    
    `OTEL_EXPORTER_OTLP_ENDPOINT`: localhost:4317
    
    Since, we have installed SigNoz on our local machine, we use the above IP. If you install SigNoz on a different machine, you can update it with the relevant IP. Here’s a handy [grid](https://signoz.io/docs/instrumentation/troubleshoot-instrumentation/) to figure out which address to use to send data to SigNoz.
    
    Hence, the final run command looks like this:
    
    ```bash
    SERVICE_NAME=goGinApp INSECURE_MODE=true OTEL_EXPORTER_OTLP_ENDPOINT=localhost:4317 go run main.go
    ```


## Validating instrumentation by checking for traces

With your application running, you can verify that you’ve instrumented your application with OpenTelemetry correctly by confirming that tracing data is being reported to SigNoz.

To do this, you need to ensure that your application generates some data. Applications will not produce traces unless they are being interacted with, and OpenTelemetry will often buffer data before sending. So you need to interact with your application and wait for some time to see your tracing data in SigNoz.

Validate your traces in SigNoz:

1. Trigger an action in your app that generates a web request. Hit the endpoint a number of times to generate some data. Then, wait for some time.
2. In SigNoz, open the `Services` tab. Hit the `Refresh` button on the top right corner, and your application should appear in the list of `Applications`.
3. Go to the `Traces` tab, and apply relevant filters to see your application’s traces.

You might see other dummy applications if you’re using SigNoz for the first time. You can remove it by following the docs [here](https://signoz.io/docs/operate/docker-standalone/#remove-the-sample-application).

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/04/goginapp_signoz_dashboard.webp" alt="Go Application in the list of services being monitored in SigNoz"/>
    <figcaption><i>Go Application in the list of services being monitored in SigNoz</i></figcaption></figure>
<br></br>

If you don't see your application reported in the list of services, try our [troubleshooting](https://signoz.io/docs/install/troubleshooting/) guide.
    

## Request Routers

### OpenTelemetry gin/gonic instrumentation

```bash
# Add one line to your import() stanza depending upon your request router:
middleware "go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
```

and then inject OpenTelemetry middleware:

```bash
router.Use(middleware.Middleware(serviceName))
```

### OpenTelemetry **gorillamux instrumentation**

```bash
# Add one line to your import() stanza depending upon your request router:
middleware "go.opentelemetry.io/contrib/instrumentation/github.com/gorilla/mux/otelmux"
```

and then inject OpenTelemetry middleware:

```bash
router.Use(middleware.Middleware(serviceName))
```

### OpenTelemetry echo instrumentation

```bash
# Add one line to your import() stanza depending upon your request router:
middleware "go.opentelemetry.io/contrib/instrumentation/github.com/labstack/echo/otelecho"
```

and then inject OpenTelemetry middleware:

```bash
router.Use(middleware.Middleware(serviceName))
```

### If you don’t use a request router

```bash
import (
  "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
)

```

In each place where you pass an http.Handler to a ServeMux, you’ll wrap the handler function. For instance, you’ll make the following replacements:

```bash
- mux.Handle("/path", h)
+ mux.Handle("/path", otelhttp.NewHandler(h, "description of path"))
```

```bash
- mux.Handle("/path", http.HandlerFunc(f))
+ mux.Handle("/path", otelhttp.NewHandler(http.HandlerFunc(f), "description of path"))
```

In this fashion, you can ensure that every function you wrap with othttp will automatically have its metadata collected and a corresponding trace started.


## Adding custom attributes and custom events to spans

It’s also possible to set custom attributes or tags to a span. To add custom attributes and events follow the below steps:

1. **Import trace and attribute libraries**
    
    ```bash
    import (
        ...
        "go.opentelemetry.io/otel/attribute"
        "go.opentelemetry.io/otel/trace"
    )
    ```
    
2. **Fetch current span from context**
    
    ```bash
    span := trace.SpanFromContext(c.Request.Context())
    ```
    
3. **Set attribute on current**
    
    ```bash
    span.SetAttributes(attribute.String("controller", "books"))
    ```
    

SigNoz dashboards can be used to track these custom attributes.

<figure data-zoomable align='center'>
    <img src="/img/docs/opentelemetry_go_custom_attributes.webp" alt="Custom attributes under 'Tags' section on SigNoz trace detail page"/>
    <figcaption><i>Custom attributes can be seen under `Tags` section on SigNoz trace detail page</i></figcaption></figure>
<br></br>

We can also set custom events on the span with its own attribute.

```bash
span.AddEvent("This is a sample event", trace.WithAttributes(attribute.Int("pid", 4328), attribute.String("sampleAttribute", "Test")))
```

<figure data-zoomable align='center'>
    <img src="/img/docs/opentelemetry_go_events.webp" alt="Events can be seen under `Events` section on SigNoz trace detail page"/>
    <figcaption><i>Events can be seen under `Events` section on SigNoz trace detail page</i></figcaption></figure>
<br></br>


## gRPC Instrumentation

Similarly, OpenTelemetry can also help you automatically instrument gRPC requests. To instrument any gRPC servers you have, add an Interceptor to the instantiation of the server.

```bash
import (
  grpcotel "go.opentelemetry.io/contrib/instrumentation/google.golang.org/grpc/otelgrpc"
)

func main() {
  [...]

	s := grpc.NewServer(
		grpc.UnaryInterceptor(grpcotel.UnaryServerInterceptor()),
		grpc.StreamInterceptor(grpcotel.StreamServerInterceptor()),
	)

}

```
We have a blog [Monitor gRPC calls with OpenTelemetry - explained with a Golang example](https://signoz.io/blog/opentelemetry-grpc-golang/), do refer to that in case you need a helping hand to work with gRPC server.

## Recording Errors and Exceptions

```go
import "go.opentelemetry.io/otel/codes"

// Get the current span from the tracer
span := trace.SpanFromContext(ctx)

// RecordError converts an error into a span event.
span.RecordError(err)

// Mark span as failed.
span.SetStatus(codes.Error, "internal error")
```



## Sample Golang application

We have included a sample gin/gonic application with `README.md` at https://github.com/SigNoz/sample-golang-app.

Feel free to use this repo to test out OpenTelemetry instrumentation and how to send telemetry data to SigNoz.


## Library and framework support

Besides OpenTelemetry core modules, it is important to install instrumentation packages for every important library and framework which your service depends upon. Beyond the critical telemetry data these components emit, library and framework integrations are often required to ensure that the trace context is properly propagated.

OpenTelemetry automatically provides instrumentation for a large number of libraries and frameworks, right out of the box.

The full list of supported instrumentation can be found in the [README](https://github.com/open-telemetry/opentelemetry-go-contrib/tree/master/instrumentation).

You can also find libraries, plugins, integrations, and other useful tools for extending OpenTelemetry from the OpenTelemetry [registry](https://opentelemetry.io/registry/?language=go).



<p>&nbsp;</p>

<InstrumentationFAQ />
