---
title: Implementing OpenTelemetry in a Gin application 
slug: opentelemetry-gin
date: 2023-07-28
tags: [OpenTelemetry Instrumentation, Go / Golang]
authors: [nitya, ankit_anand]
description:  It is essential to monitor your Gin apps in Go(Golang). OpenTelemetry can help instrument Gin apps and provide you with end-to-end tracing. In this guide, we will demonstrate how to instrument your Gin app with OpenTelemetry...
image: /img/blog/2023/07/opentelemetry_gin_cover-min.jpg
keywords:
  - opentelemetry
  - gin
  - opentelemetry gin
  - opentelemetry gin middleware
  - opentelemetry gin example
  - opentelemetry gorm
  - gorm
  - golang
  - apm tools
  - application performance monitoring
---
<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-gin/"/>
</head>

OpenTelemetry can be used to trace Gin applications for performance issues and bugs. OpenTelemetry is an open-source project under the Cloud Native Computing Foundation (<a href = "https://www.cncf.io/" rel="noopener noreferrer nofollow" target="_blank">CNCF</a>) that aims to standardize the generation and collection of telemetry data like logs, metrics, and traces.

<!--truncate-->

![Cover Image](/img/blog/2023/07/opentelemetry_gin_cover.webp)

Gin is an HTTP web framework written in Go (Golang). It features a Martini-like API with much better performance -- up to 40 times faster.

If you need smashing performance, get yourself some Gin!

Gin framework has a very small footprint and great speed because it's built on HttpRouter, a lightweight, high-performance HTTP request router. HttpRouter and Gin use a radix tree to parse long and complicated route requests quickly.

<a href = "https://github.com/open-telemetry/opentelemetry-go-contrib/blob/main/instrumentation/github.com/gin-gonic/gin/otelgin/gintrace.go" rel="noopener noreferrer nofollow" target="_blank">OpenTelemetry Middleware for Gin</a>

<div>
<br></br>
</div>

In this tutorial, we will demonstrate how to use the OpenTelemetry Gin middleware to generate end-to-end tracing. We will also instrument GORM database client using OpenTelemetry libraries.

Before we demonstrate how to implement the OpenTelemetry libraries, let’s have a brief overview of OpenTelemetry.

## What is OpenTelemetry?

<a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank">OpenTelemetry</a> is an open-source vendor-agnostic set of tools, APIs, and SDKs used to instrument applications to create and manage telemetry data (logs, metrics, and traces). It aims to make telemetry data, a built-in feature of cloud-native software applications.

The telemetry data is then sent to an observability tool for storage and visualization.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/04/how_opentelemetry_fits.webp" alt="How opentelemetry fits with an application"/>
    <figcaption><i>OpenTelemetry libraries instrument application code to generate telemetry data that is then sent to an observability tool for storage & visualization</i></figcaption>
</figure>

<br></br>

OpenTelemetry is the bedrock for setting up an observability framework. It also provides you the freedom to choose a backend analysis tool of your choice.

## OpenTelemetry and SigNoz

In this tutorial, we will use SigNoz as our backend analysis tool. SigNoz is a full-stack open-source APM tool that can be used for storing and visualizing the telemetry data collected with OpenTelemetry. It is built natively on OpenTelemetry and works on the OTLP data formats.

SigNoz provides query and visualization capabilities for the end-user and comes with out-of-box charts for application metrics and traces.

Now let’s get down to how to implement OpenTelemetry Gin libraries and then visualize the collected data in SigNoz.

## Running Gin application with OpenTelemetry

**Step 1: Install SigNoz**<br></br>
First, you need to install SigNoz so that OpenTelemetry can send the data to it.

SigNoz can be installed on macOS or Linux computers in just three steps by using a simple installation script.

The install script automatically installs Docker Engine on Linux. However, on macOS, you must manually install <a href = "https://docs.docker.com/engine/install/" rel="noopener noreferrer nofollow" target="_blank">Docker Engine</a> before running the install script.

```bash
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

When you are done installing SigNoz, you can access the UI at [http://localhost:3301](http://localhost:3301/application)

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/02/signoz_dashboard.webp" alt="SigNoz dashboard"/>
    <figcaption><i>SigNoz dashboard - It shows services from a sample app that comes bundled with the application</i></figcaption>
</figure>

<br></br>

**Step 2: Get sample Gin app in Golang**<br></br>
<a href = "https://github.com/SigNoz/sample-golang-app" rel="noopener noreferrer nofollow" target="_blank">Sample Go application</a>

It contains the sample boilerplate code that we will instrument. 

If you want to follow the tutorial, then you should follow the `without-instrumentation` branch.

**Step 3:  Declare few variables for configuring OpenTelemetry**<br></br>
Declare the following global variables in main.go which we will use to configure OpenTelemetry

```go
var (
	serviceName  = os.Getenv("SERVICE_NAME")
	collectorURL = os.Getenv("OTEL_EXPORTER_OTLP_ENDPOINT")
	insecure     = os.Getenv("INSECURE_MODE")
)
```

**Step 4:  Instrument your Gin application with OpenTelemetry**<br></br>
To configure your application to send data we will need a function to initialize OpenTelemetry. Add the following snippet of code in your `main.go` file.

```go
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

**Step 5:  Initialize the tracer in main.go**<br></br>
Modify the main function to initialise the tracer  in `main.go`. Initiate the tracer at the very beginning of our main function.

```jsx
func main() {
	cleanup := initTracer()
	defer cleanup(context.Background())

	......
}
```

**Step 6:  Add the OpenTelemetry Gin middleware**<br></br>
Configure Gin to use the middleware by adding the following lines in `main.go`.

```jsx
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

**Step 7: Set environment variables and run your Gin application**<br></br>
Now that you have instrumented your Gin application with OpenTelemetry, you need to set some environment variables to send data to the SigNoz backend:
```
SERVICE_NAME=goApp INSECURE_MODE=true OTEL_EXPORTER_OTLP_ENDPOINT=<IP of SigNoz backend>:4317 go run main.go
```

IP os SigNoz backend should be **without http/https scheme.**

`SERVICE_NAME`: goGinApp (you can name it whatever you want)

`OTEL_EXPORTER_OTLP_ENDPOINT`: localhost:4317

Since we have installed SigNoz on our local machine, we use the above IP. If you install SigNoz on a different machine, you can update it with the relevant IP.

Hence, the final run command looks like this:

```jsx
SERVICE_NAME=goGinApp INSECURE_MODE=true OTEL_EXPORTER_OTLP_ENDPOINT=localhost:4317 go run main.go
```


:::info

Do not use `http` or `https` in the IP address. For example, if the IP is `http://test.com` then the `OTEL_EXPORTER_OTLP_ENDPOINT` will be `test.com:4317`

:::


**Step 8:** **Generate some data**<br></br>
In order to monitor your Gin application with SigNoz, you first need to generate some data.

- Create a book
    
    ```jsx
    curl --location --request POST 'localhost:8091/books' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "title": "book 1",
        "author": "John Doe"
    }'
    ```

	<figure data-zoomable align='center'>
    <img src="/img/blog/2022/04/otel_gin_create_a_book.webp" alt="SigNoz dashboard"/>
	</figure>

	<br></br>
    

- Check the list of books by running the following Curl
    
    ```jsx
    curl --location --request GET 'localhost:8091/books'
    ```
    

**Step 9: Visualize the collected data in SigNoz**<br></br>
Access the signoz UI  on [http://localhost:3301/application](http://localhost:3301/application) 

Go to `Services` → `goGinApp` → you will be able to see the dashboard

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/04/goginapp_signoz_dashboard.webp" alt="Gin app being monitored on SigNoz dashboard"/>
    <figcaption><i>Your Gin application being monitored on the SigNoz dashboard</i></figcaption>
</figure>

<br></br>

You can monitor application metrics like application latency, requests per second, error percentage, etc. with the `Services` tab of SigNoz.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/04/gin_application_metrics.webp" alt="OpenTelemetry Gin application metrics"/>
    <figcaption><i>You can monitor your Gin application metrics like application latency, requests per second, error percentage, etc.</i></figcaption>
</figure>

<br></br>

OpenTelemetry captures tracing data from your Gin application as well. Tracing data can help you visualize how user requests perform across services in a multi-service application.

In the `Traces` tab of SigNoz, you can analyze the tracing data using filters based on tags, status codes, service names, operations, etc.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/04/gin_application_traces.webp" alt="OpenTelemetry Gin application traces"/>
    <figcaption><i>Use powerful filters to analyze your tracing data from the Gin application</i></figcaption>
</figure>

<br></br>

You can also visualize your tracing data with the help of flamegraphs and Gantt charts.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/04/gin_application_flamegraph.webp" alt="Visualize your tracing data with the help of flamegraphs and gantt charts"/>
    <figcaption><i>Flamegraphs and Gantt charts on SigNoz dashboard</i></figcaption>
</figure>

<br></br>

SigNoz also provides log management as a feature. With SigNoz you can can have metrics, traces, and logs under a single pane of glass.

You can also monitor Gorm with OpenTelemetry libraries.

## Monitoring GORM database client with OpenTelemetry

We have instrumented our Gin which will help us trace HTTP requests but we might want to trace the DB calls as well. 

OpenTelemetry provides an `otelgorm` plugin to monitor GORM database client.

You can follow the below steps to instrument your GORM database client with OpenTelemetry.

**Step 1: Initialise GORM to use OpenTelemetry by updating the `models/setup.go`**  

```jsx
func ConnectDatabase() {
	.....
	DB = database
	if err := DB.Use(otelgorm.NewPlugin()); err != nil {
		panic(err)
	}
}  
```

**Step 2: Update all the database calls to use the request context by modifying  `controllers/books.go`**

`models.DB` will be changed to `models.DB.WithContext(c.Request.Context())`

```jsx
func FindBooks(c *gin.Context) {
	.....
	models.DB.WithContext(c.Request.Context()).Find(&books)
	.....
}
```

The above change should be done for all the DB calls.

Now run your application and execute the curl requests again. You will be able to see DB traces as well.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/04/gin_application_gorm_flamegraph.webp" alt="Visualize your tracing data with the help of flamegraphs and gantt charts"/>
    <figcaption><i>You can also monitor GORM database client using OpenTelemetry and SigNoz</i></figcaption>
</figure>

<br></br>

## Conclusion

Using OpenTelemetry libraries, you can instrument your Gin applications for end-to-end tracing. You can then use an open-source APM tool like SigNoz to ensure the smooth performance of your Gin applications.

OpenTelemetry is the future for setting up observability for cloud-native apps. It is backed by a huge community and covers a wide variety of technology and frameworks. Using OpenTelemetry, engineering teams can instrument polyglot and distributed applications with peace of mind.

SigNoz is an open-source observability tool that comes with a SaaS-like experience. You can try out SigNoz by visiting its GitHub repo.

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you want to get started quickly, try [SigNoz cloud](https://signoz.io/teams/).

---

## Further Reading

[Monitor a Golang application using OpenTelemetry and SigNoz](https://signoz.io/blog/monitoring-your-go-application-with-signoz/)

[Why is Distributed Tracing needed in microservices-based applications?](https://signoz.io/blog/distributed-tracing-in-microservices/)
