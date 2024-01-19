---
title: Implementing Distributed Tracing in a Golang application
slug: distributed-tracing-golang
date: 2023-08-01
tags: [OpenTelemetry Instrumentation, Go / Golang]
authors: [naman]
description: Distributed tracing provides insights into how a particular service is performing as part of the whole in a distributed system. In this article, we will implement distributed tracing for a Golang application based on microservices architecture with OpenTelemetry, and visualize the collected data with SigNoz...
image: /img/blog/2023/04/distributed_tracing_golang_cover-min.jpg
hide_table_of_contents: false
keywords:
  - distributed tracing
  - golang
  - tracing golang
  - distributed tracing golang
  - opentelemetry
  - opentelemetry golang
  - traces
  - open source
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

<head>
  <link rel="canonical" href="https://signoz.io/blog/distributed-tracing-golang/"/>
</head>

In this article, we will implement distributed tracing for a Golang application with three microservices. To implement distributed tracing, we will be using open-source solutions - SigNoz and OpenTelemetry, so you can easily follow the tutorial.

<!--truncate-->

![Cover Image](/img/blog/2023/04/distributed_tracing_golang_cover.webp)

## What is distributed tracing?

Modern application architecture using cloud-native, containerization, and microservices is a very complex distributed system. A typical web-search example will illustrate some of the challenges such a system needs to address. 

A front-end service may distribute a web query to many hundreds of query servers. The query may also be sent to a number of other sub-systems that may process advertisements or look for specialized results like images, news, etc. This might involve database access, cache lookup, network call, etc. In total, thousands of machines and many different services might be needed to process one search query. 

Moreover, web-search users are sensitive to delays, which can be caused by poor performance in any sub-system. An engineer looking only at the overall latency may know there is a problem but may not be able to guess which service is at fault nor why it is behaving poorly. And such services are also not written and managed by a single team. Also, day by day, new components might get added to the system. Distributed tracing provides insights into the inner workings of such a complex system. Tracing such complex systems enables engineering teams to set up an observability framework.

Distributed tracing gives insights into how a particular service is performing as part of the whole in a distributed software system. It involves passing a trace context with each user request which is then passed across hosts, services, and protocols to track the user request.

In this article, we will use OpenTelemetry and SigNoz to enable distributed tracing in a sample Golang application with microservices. But before we deep dive into the implementation steps, let us give you a brief context on OpenTelemetry and SigNoz.

## OpenTelemetry and SigNoz

<a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank">OpenTelemetry</a> is a vendor-agnostic set of tools, APIs, and SDKs used to instrument applications to create and manage telemetry data(logs, metrics, and traces). It aims to make telemetry data a built-in feature of cloud-native software applications.

<br></br>

OpenTelemetry provides the instrumentation layer to generate and export your telemetry data to a backend. Then, you need to choose a backend tool that will provide the data storage and visualization for your telemetry data. That’s where SigNoz comes into the picture.

[SigNoz](https://signoz.io/) is a full-stack open-source observability tool that provides logs, metrics, and traces under a single pane of glass.

OpenTelemetry is the way forward for cloud-native application owners who want to set up a robust observability framework. It also provides you the freedom to choose any backend analysis tool. SigNoz is built to support OpenTelemetry natively, thus making a great combo.

## Distributed Tracing in a Golang application

We will demonstrate implementing distributed tracing in a Golang application in the following sections:

- Instrumenting the Golang app with OpenTelemetry
- Running the sample Golang application
- Visualizing traces data with SigNoz dashboards

## Prerequisites

- Go (version ≥ 1.16)
    - For installation see [getting started](https://go.dev/doc/install)
- MySQL 8
    - Download the MySQL community version from [here](https://dev.mysql.com/downloads/mysql/)
    - If your MySQL is configured with a password, update it here:
    [https://github.com/SigNoz/distributed-tracing-golang-sample/blob/master/.env](https://github.com/SigNoz/distributed-tracing-golang-sample/blob/master/.env)
- `serve` for frontend. For installation see: [https://www.npmjs.com/package/serve](https://www.npmjs.com/package/serve)
- SigNoz - For instructions, please refer to [Installing SigNoz](#installing-signoz) section.

## Installing SigNoz

First, you need to install SigNoz so that OpenTelemetry can send the data to it.

SigNoz can be installed on macOS or Linux computers in just three steps by using a simple installation script.

The install script automatically installs Docker Engine on Linux. However, on macOS, you must manually install <a href = "https://docs.docker.com/engine/install/" rel="noopener noreferrer nofollow" target="_blank">Docker Engine</a> before running the install script.

```bash
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

When you are done installing SigNoz, you can access the UI at [http://localhost:3301](http://localhost:3301/application).

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_dashboard_homepage.webp" alt="SigNoz dashboard"/>
    <figcaption><i>SigNoz dashboard - It shows services from a sample app that comes bundled with the application</i></figcaption>
</figure>

<br></br>

## Instrumenting the Golang app with OpenTelemetry

We have built a sample Golang application for the purpose of this tutorial. It has 3 services:

- user-service
- payment-service, and
- order-service

These services are instrumented with OpenTelemetry libraries, and when they interact with each other, OpenTelemetry emits the telemetry data to OTel collector which comes bundled with SigNoz.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/distributed_tracing_app_otel_signoz.webp" alt="How an application with microservices fits with OpenTelemetry and SigNoz"/>
    <figcaption><i>Application architecture along with OpenTelemetry(OTel Collector) and SigNoz</i></figcaption>
</figure>

<br></br>

**Step 1:** **Clone sample Golang app repository and go to the root folder**
We will be using a sample Golang app at this <a href = "https://github.com/SigNoz/distributed-tracing-golang-sample" rel="noopener noreferrer nofollow" target="_blank">GitHub repo</a>.

```jsx
git clone --single-branch --depth 1 https://github.com/SigNoz/distributed-tracing-golang-sample.git
cd distributed-tracing-golang-sample
```

**Step 2: Install the required dependencies**

Check the list of all the required modules from go.mod. For OpenTelemetry, we need:

```jsx
go.opentelemetry.io/contrib/instrumentation/github.com/gorilla/mux/otelmux v0.32.0
go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp v0.32.0
go.opentelemetry.io/otel v1.7.0
go.opentelemetry.io/otel/exporters/otlp/otlptrace v1.7.0
go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc v1.7.0
go.opentelemetry.io/otel/sdk v1.7.0
go.opentelemetry.io/otel/trace v1.7.0
github.com/XSAM/otelsql v0.14.1
```

All the dependencies can be installed using:

```bash
go mod tidy
go mod vendor
```

**Step 3: Configure the OpenTelemetry collector**

Ideally, you should start OpenTelemetry at the beginning of main, before any other services start running. When your program exits, call `Shutdown` on the SDK to ensure the last bit of telemetry is flushed before the program exits.

```jsx
tp := config.Init(serviceName)
defer func() {
	if err := tp.Shutdown(context.Background()); err != nil {
		log.Printf("Error shutting down tracer provider: %v", err)
	}
}()
// tracer is later used to create spans
tracer = otel.Tracer(serviceName)
```

We also initialized the `tracer` which is later used to create custom spans.

Let’s now understand what does `Init` function in `config/config.go` does.

1. **Initialize exporter:**<br></br>
   The exporter in SDK is responsible for exporting the telemetry signal (trace) out of the application to a remote backend, logging to a file, etc. 
   In this demo, we are creating a gRPC exporter to send out traces to an OpenTelemetry Collector backend running at collectorURL (SigNoz). It also supports TLS and application auth using headers.
    
    ```go
    secureOption := otlptracegrpc.WithTLSCredentials(credentials.NewClientTLSFromCert(nil, "")) // config can be passed to configure TLS
    if len(insecure) > 0 {
    	secureOption = otlptracegrpc.WithInsecure()
    }
    exporter, err := otlptrace.New(
    	context.Background(),
    	otlptracegrpc.NewClient(
    		secureOption,
    		otlptracegrpc.WithEndpoint(collectorURL),
    		otlptracegrpc.WithHeaders(headers),
    	),
    )
    ```
    
2. **Construct trace provider:**<br></br>
   TracerProvider provides access to instrumentation Tracers. We configure it to sample all the traces and send the traces in batches to the collector. The resource describes the object that generated the telemetry signals. Essentially, it must be the name of the service or application. We set it to `serviceName`:
    
    ```go
    traceProvider := sdktrace.NewTracerProvider(
    	sdktrace.WithSampler(sdktrace.AlwaysSample()),
    	sdktrace.WithSpanProcessor(sdktrace.NewBatchSpanProcessor(exporter)),
    	sdktrace.WithResource(resource.NewWithAttributes(semconv.SchemaURL, semconv.ServiceNameKey.String(serviceName))),
    )
    ```
    

Now, we are ready to configure various components in our application. 

**Step 4:** **Instrument HTTP handler with OpenTelemetry**

We are using `gorilla/mux` for the HTTP router. It can be instrumented with OpenTelemetry using <a href = "https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/github.com/gorilla/mux/otelmux" rel="noopener noreferrer nofollow" target="_blank">otelmux</a>:

```go
router.Use(otelmux.Middleware(serviceName))
```

Now, all the HTTP calls pass through the OpenTelemetry middleware.

Our services communicate with each other using HTTP APIs. We need to configure our client to pass on the tracing metadata. We can do that using:

```go
func SendRequest(ctx context.Context, method string, url string, data []byte) (*http.Response, error) {
	request, err := http.NewRequestWithContext(ctx, method, url, bytes.NewBuffer(data))
	if err != nil {
		return nil, fmt.Errorf("create request error: %w", err)
	}

	client := http.Client{
		// Wrap the Transport with one that starts a span and injects the span context
		// into the outbound request headers.
		Transport: otelhttp.NewTransport(http.DefaultTransport),
		Timeout:   10 * time.Second,
	}

	return client.Do(request)
}
```

Note that the `ctx` parameter contains the tracing metadata of the parent span. So now the client sends the metadata and the server can extract this and connect the tracing information of various services.

Apart from the instrumentation already provided by <a href = "https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp" rel="noopener noreferrer nofollow" target="_blank">otelhttp</a> library, we might want to have custom spans for various purposes (e.g. trace database call, or trace function execution). We can do that using:

```go
ctx, span := tracer.Start(r.Context(), "update user amount")
defer span.End()
```

We can also attach attributes, events, etc. to this span. Please refer to the [documentation](https://pkg.go.dev/go.opentelemetry.io/otel/trace#Span) for that.

**Step 5:** **Instrument MySQL with OpenTelemetry**

Database lies in the hot path for most of the applications and any insights into its performance are valuable. We instrument it with the help of [github.com/XSAM/otelsql](http://github.com/XSAM/otelsql). And while making any DB call, we pass on the context.

```go
db, err = otelsql.Open("mysql", datasourceName(username, password, host, dbName), otelsql.WithAttributes(
		semconv.DBSystemMySQL,
	))
....
....
res, err := stmt.ExecContext(ctx, p.Vars...)
```

Note: [http://github.com/XSAM/otelsql](http://github.com/XSAM/otelsql) is not yet officially supported by OpenTelemetry.

### Running the sample Golang application

**Step 1: Configuration**

To set up OpenTelemetry to collect and export telemetry data, you need to specify OTLP (OpenTelemetry Protocol) endpoint. It consists of the IP of the machine where SigNoz is installed and the port number at which SigNoz listens.

OTLP endpoint for SigNoz - `<IP of the machine>:4317`

If you have installed SigNoz on your local machine, then your endpoint is `127.0.0.1:4317`.

If you have installed SigNoz on some domain, then your endpoint is `test.com:4317`


:::info

Do not use `http` or `https` in the IP address. 

:::


Configuration for the following can be set up in `.env`

```go
# service config
USER_URL=localhost:8080
PAYMENT_URL=localhost:8081
ORDER_URL=localhost:8082

# database config
SQL_USER=root
SQL_PASSWORD=password
SQL_HOST=localhost:3306
SQL_DB=signoz

# telemetry config
OTEL_EXPORTER_OTLP_ENDPOINT=localhost:4317
INSECURE_MODE=true
```



**Step 2: Run the microservices**

As we have already cloned the repo in the above section, from the root folder, run these commands, each in a separate terminal:

```go
go run ./users
go run ./payment
go run ./order
```

**Step 3: Confirm table creation:**

After running the services, check if the tables `ORDERS` and `USERS` are created using the commands below:

```go
mysql> use signoz;
mysql> show tables;
```

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/distributed_tracing_golang_sql.webp" alt="Screenshot of terminal showing MySQL database working"/>
</figure>

<br></br>

## Visualizing Distributed Tracing data with Signoz

To visualize the trace data with SigNoz, we first need to generate some user data by interacting with the frontend.

**Generating user data by interacting with the sample app:**

You need to generate some user data to see how it appears in the SigNoz dashboard. The sample application comes with a UI to interact with the app. Use the below command in the root folder to launch the UI:

```go
serve -l 5000 frontend
```

Now go to the app frontend running at [localhost:5000](http://localhost:5000). Perform the below given steps 4-5 times to generate some data.

1. Create a user:<br></br>
   Click `Create User` button to create a new user in the MySQL db.
   <figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/dt_golang_create_user.webp" alt="Create user using UI"/>
    </figure>
    <br></br>

2. Transfer the fund:<br></br>
   Transfer some amount by clicking `Transfer Fund` button.
   <figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/dt_golang_transfer_fund.webp" alt="Transfer Funds using UI"/>
    </figure>
    <br></br>
    

3. Place an order:<br></br>
   Place an order by selecting a product from the dropdown.

    <figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/dt_golang_place_order.webp" alt="Place orders using UI"/>
    </figure>
    <br></br>
    

Now go to the SigNoz dashboard (running on [http://localhost:3301/](http://localhost:3301/) by default), wait for some time, and refresh the dashboard. You will notice the list of service names that we configured:

- user-service
- order-service
- payment-service

### Analyze traces and metrics using the Signoz dashboard

In the metrics tab, you can see Application Metrics, External Calls, and Database Calls:

**Application metrics:**

Here, we can see the application latency, requests per second(rps), error percentage, and the endpoints that were hit for a given service.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/dt_golang_application_metrics.webp" alt="SigNoz dashboard showing application metrics"/>
    <figcaption><i>Track important application metrics like latency, requests per second(rps), error percentage, and top endpoints with SigNoz</i></figcaption>
</figure>

<br></br>

**External Calls:**

Here, you can see the metrics about the calls made to external services. In our case, we are running the services on localhost; hence we see a single line. Metrics like external call duration (by address) give a quick glimpse of the network connectivity with the external service. This might be useful to detect a network issue.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/dt_golang_external_calls.webp" alt="SigNoz dashboard showing external calls"/>
    <figcaption><i>Monitor external calls from a service that can help you with insights regarding network connectivity</i></figcaption>
</figure>

<br></br>

For more features on metrics, please read the [documentation](https://signoz.io/docs/userguide/metrics/).

**Identify latency issues with Flamegraphs and Gantt charts**

You can inspect each event in the spans table with Flamegraphs and Gantt charts to see a complete breakdown of the request. Establishing a sequential flow of the user request along with info on time taken taken by each part of the request can help identify latency issues quickly. Let’s see how it works in the case of our sample Go app.

Go to the service name filter on the left and select `order-service`. Now select any span:

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/dt_golang_gantt.webp" alt="SigNoz dashboard showing a user request broken down by Flamegraphs and Gantt charts"/>
    <figcaption><i>Flamegraphs and Gantt charts on SigNoz dashboard can be used to see complete breakdown of user requests as it propagates across services</i></figcaption>
</figure>

<br></br>

Here, expanding on `insert order` you will see the time utilised in various SQL DB calls.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/dt_golang_gantt_2.webp" alt="Gantt charts showing details on time utilised in various SQL DB calls"/>
    <figcaption><i>Gantt charts can give you detailed information on things like Db calls</i></figcaption>
</figure>

<br></br>

Also, note that we also have additional information about the query that was run in the tags panel on the right.

## Conclusion

Distributed tracing is a powerful and critical toolkit for developers creating applications based on microservices architecture. For Golang applications using microservices architecture, distributed tracing can enable a central overview of how requests are performing across microservices.

This lets application owners reconstruct the whole path of the request and see how individual components performed as part of the entire user request.

OpenTelemetry and SigNoz provide a great open-source solution to implement distributed tracing for your applications. You can try out SigNoz by visiting its GitHub repo 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you are someone who understands more from video, then you can watch the below video tutorial on the same with SigNoz.

<p>&nbsp;</p>

<LiteYoutubeEmbed id="pDl6N62ZYQI" mute={false} />

<p>&nbsp;</p>

If you have any questions or need any help in setting things up, join our slack community and ping us in `#support` channel

[![SigNoz Slack community](/img/blog/common/join_slack_cta.webp)](https://signoz.io/slack)

If you want to know more about distributed tracing or SigNoz, feel free to follow these links:

[SigNoz - an open-source alternative to DataDog](https://signoz.io/blog/open-source-datadog-alternative/)

[Guide on Distributed Tracing](https://signoz.io/distributed-tracing/)
