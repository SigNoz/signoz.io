---
title: How to set up Golang application performance monitoring with open source monitoring tool - SigNoz
slug: monitoring-your-go-application-with-signoz
date: 2023-05-04
tags: [OpenTelemetry Instrumentation, Go / Golang]
authors: ankit_anand
description: In this article, learn how to setup application monitoring for Golang apps using an open-source solution, SigNoz.
image: /img/blog/2021/06/golang_app_monitoring_cover_hc.webp
keywords:
  - go application monitoring
  - opentelemetry
  - golang monitoring
  - opentelemetry go
  - go app
  - golang
  - distributed tracing
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

In this article, learn how to setup application monitoring for Golang apps using an open-source solution, SigNoz.

<!--truncate-->

![Cover Image](/img/blog/2021/06/golang_app_monitoring_cover_hc.webp)

If you want to check our Github repo before diving in 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

Scalability, Reliability, Maintainability...

The list goes on for the benefits of microservices architecture in today's world. But along with these benefits also comes the challenges of complexity. How do you ensure your distributed infrastructure, which spans across servers, datastores, cloud vendors, and third-party APIs, is in fine health to meet customer requirements all the time?

A single user request may get routed through three, five, eighteen, or hundred different layers of services.

And it quickly becomes unrealistic for teams to identify which service was responsible for slowing a request down. Engineering teams need a system that brings context to this complexity. A system which enables quick identification of potential issues so that it can be resolved as quickly. And that's where there is a need for a robust monitoring framework.

**Table of contents**

- [Introducing SigNoz](#introducing-signoz)
- [Installing SigNoz](#installing-signoz)
- [Instrumenting a sample Golang app](#instrumenting-a-sample-golang-app)
- [Monitor your Go application with SigNoz dashboards](#monitor-your-go-application-with-signoz-dashboards)

## Introducing SigNoz

[SigNoz](https://signoz.io/) is a full-stack **open-source application monitoring and observability platform** which can be installed within your infra. It provides metrics monitoring, distributed tracing, exceptions monitoring,and custom dashboards - everything under a single pane of glass. You can also set alerts on your critical metrics to keep yourself notified. 

You can track metrics like p99 latency, error rates for your services, external API calls, and individual endpoints. With service maps, you can quickly assess the health of your services.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_charts_application_metrics.webp" alt="Charts showing important application metrics like latency, error rates, and requests per sec"/>
    <figcaption><i>SigNoz UI showing application overview metrics like RPS, 50th/90th/99th Percentile latencies, and Error Rate</i></figcaption>
</figure>

<br></br>

And once you know the affected service, trace data can help you identify the exact code causing the issue. Using SigNoz dashboard, you can visualize your traces easily with flamegraphs.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_flamegraphs.webp" alt="Distributed tracing visualized with flamegraphs on SigNoz dashboard"/>
    <figcaption><i>Distributed tracing visualized with flamegraphs on SigNoz dashboard</i></figcaption>
</figure>

<br></br>

Now let's get down to some action and see everything for yourself.

We will divide the tutorial into two parts:

1. Installing SigNoz
2. Instrumenting a sample Golang application to start monitoring

## Installing SigNoz

First, you need to install SigNoz so that OpenTelemetry can send the data to it.

SigNoz can be installed on macOS or Linux machines in just three steps by using a simple install script.

The install script automatically installs Docker Engine on Linux. However, on macOS, you must manually install <a href = "https://docs.docker.com/engine/install/" rel="noopener noreferrer nofollow" target="_blank">Docker Engine</a> before running the install script.

```bash
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

When you are done installing SigNoz, you can access the UI at [http://localhost:3301](http://localhost:3301/application)

The application list shown in the dashboard is from a sample app called HOT R.O.D that comes bundled with the SigNoz installation package.

<figure data-zoomable>
    <img src="/img/blog/2022/02/signoz_dashboard.webp" alt="SigNoz dashboard"/>
    <figcaption><i>SigNoz dashboard - It shows services from a sample app that comes bundled with the application</i></figcaption>
</figure>

<br></br>

Now that you have SigNoz up and running, let's see how instrumentation works. Instrumentation is the process of implementing code instructions to monitor your application's performance. Instrumentation is key to see how your application handles the real world. It helps you generate trace data which you can then use to understand what's happening inside your systems.

SigNoz supports [OpenTelemetry](https://opentelemetry.io/) as the primary way for users to instrument their application. OpenTelemetry is a single, vendor-agnostic instrumentation library with support for both automatic and manual instrumentation. More details on OpenTelemetry Golang SDKs and APIs [here](https://github.com/open-telemetry/opentelemetry-go).

## Instrumenting a sample Golang app

To see how SigNoz can start reporting data of a Golang app, let's see how it works with a sample bookstore app ([GitHub repo](https://github.com/SigNoz/sample-golang-app)).

It is a simple bookstore app with a REST API that provides book data and performs CRUD operations. The app uses Gin framework to build a RESTful API. Gin is a high-performance HTTP web framework written in Golang containing a set of commonly used functionalities like routing, middleware support and rendering.

OpenTelemetry has specific instrumentation packages to support popular Golang packages and use cases.  For example, this app uses the Gin framework for request routing. OpenTelemetry provides instrumentation package named **otelgin** to instrument the Gin framework which you need to import in your app. You can find the complete list of supported Golang packages [here](https://github.com/open-telemetry/opentelemetry-go-contrib/tree/main/instrumentation).

**Prerequisites**

Verify if you have Golang installed on your machine by running `$ go version` on your terminal. If you don't have Golang installed, you can download it [here](https://golang.org/doc/install).

<!-- ### Steps to instrument Golang app

1.  Clone sample Golang app repository<br></br>
    From your terminal use the following command to clone sample Golang app GitHub repository.

    ```
    git clone --single-branch --depth 1 https://github.com/SigNoz/sample-golang-app.git
    ```

2.  Update path to **sample-golang-app** & check if the app is working<br></br>
    Update your terminal path to the sample app directory and check if the app is working or not using the following command:

        cd sample-golang-app
        go run main.go
    This runs the gin application at port `8090`. Try accessing API at `http://localhost:8090/books`

    If you see an empty array, it means your application is working. You can check out how to write, update and delete books in your array from the article [here](https://blog.logrocket.com/how-to-build-a-rest-api-with-golang-using-gin-and-gorm/).

    <Screenshot
    alt="endpoint of bookstore app"
    height={500}
    src="/img/blog/2021/06/screenzy-1623261415095.webp"
    title="endpoint of our bookstore app"
    width={700}
    />

3.  Once you ensure that your application is working, exit the server by pressing `Ctrl + C` on your mac terminal.

4.  **Set up OpenTelemetry Golang instrumentation library**<br></br>
    The file `main.go` has instructions to import all the necessary OpenTelemetry packages in order to instrument the sample app. For this app, we import the following OpenTelemetry packages.

    ```
    import (
    "go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/exporters/otlp"
    "go.opentelemetry.io/otel/exporters/otlp/otlpgrpc"
    "go.opentelemetry.io/otel/label"

    "go.opentelemetry.io/otel/sdk/resource"
    sdktrace "go.opentelemetry.io/otel/sdk/trace"
    )
    ```

    You just need to run it with the necessary environment variables in order to start sending data to SigNoz. Use the following command to run and configure the app to send data to SigNoz:

    ```
    SERVICE_NAME=goApp INSECURE_MODE=true OTEL_EXPORTER_OTLP_ENDPOINT=<IP of SigNoz backend>:4317 go run main.go
    ```

    `Ip of SigNoz` can be replaced with `localhost` in this case. Hence, the final command becomes:

    ```
    SERVICE_NAME=goApp INSECURE_MODE=true OTEL_EXPORTER_OTLP_ENDPOINT=localhost:4317 go run main.go
    ``` -->


**Step 1: Get sample Go app from GitHub**

The [sample Go app repo](https://github.com/SigNoz/sample-golang-app) contains the boilerplate code that we will instrument.

If you want to follow along with the tutorial, then you should follow the `without-instrumentation` branch.

**Step 2: Install dependencies**

Dependencies related to OpenTelemetry exporter and SDK have to be installed first. Run the below commands after navigating to the application source folder:

```go
go get go.opentelemetry.io/otel \
  go.opentelemetry.io/otel/trace \
  go.opentelemetry.io/otel/sdk \
  go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin \
  go.opentelemetry.io/otel/exporters/otlp/otlptrace \
  go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc \
```

**Step 3: Declare environment variables for configuring OpenTelemetry**

Declare the following variables in `main.go` which we will use to configure OpenTelemetry:

```go
var (
	serviceName  = os.Getenv("SERVICE_NAME")
	collectorURL = os.Getenv("OTEL_EXPORTER_OTLP_ENDPOINT")
	insecure     = os.Getenv("INSECURE_MODE")
)
```

**Step 4: Instrument your Go application with OpenTelemetry**

To configure your application to send data we will need a function to initialize OpenTelemetry. Add the following snippet of code in your `main.go` file.

```go
import (
    .....

    "google.golang.org/grpc/credentials"
    "github.com/gin-gonic/gin"
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/attribute"
    "go.opentelemetry.io/otel/exporters/otlp/otlptrace"
    "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc"

    "go.opentelemetry.io/otel/sdk/resource"
    sdktrace "go.opentelemetry.io/otel/sdk/trace"
)

func initTracer() func(context.Context) error {

    var secureOption otlptracegrpc.Option

    if strings.ToLower(insecure) == "false" || insecure == "0" || strings.ToLower(insecure) == "f" {
        secureOption = otlptracegrpc.WithTLSCredentials(credentials.NewClientTLSFromCert(nil, ""))
    } else {
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
        log.Fatalf("Failed to create exporter: %v", err)
    }
    resources, err := resource.New(
        context.Background(),
        resource.WithAttributes(
            attribute.String("service.name", serviceName),
            attribute.String("library.language", "go"),
        ),
    )
    if err != nil {
        log.Fatalf("Could not set resources: %v", err)
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

**Step 5:  Initialize the tracer in main.go**

Modify the main function to initialise the tracer  in `main.go`

```
func main() {
	cleanup := initTracer()
	defer cleanup(context.Background())

	......
}

```

**Step 6:  Add the OpenTelemetry Gin middleware**

Configure Gin to use the middleware by adding the following lines in `main.go`.

```
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

**Step 7: Set environment variables and run your Go Gin application**

Now that you have instrumented your Go Gin application with OpenTelemetry, you need to set some environment variables to send data to SigNoz backend:

`SERVICE_NAME`: goGinApp (you can name it whatever you want)

`OTEL_EXPORTER_OTLP_ENDPOINT`: localhost:4317

Since, we have installed SigNoz on our local machine, we use the above IP. If you install SigNoz on a different machine, you can update it with the relevant IP.

Hence, the final run command looks like this:

```
SERVICE_NAME=goGinApp INSECURE_MODE=true OTEL_EXPORTER_OTLP_ENDPOINT=localhost:4317 go run main.go
```


:::info

Do not use `http` or `https` in the IP address. For example, if the IP is `http://test.com` then the `OTEL_EXPORTER_OTLP_ENDPOINT` will be `test.com:4317`

:::


And, congratulations! You have instrumented your sample Golang app.

Hit the `/books` endpoint of the bookstore app at [http://localhost:8090/books](http://localhost:8090/books). Refresh it a bunch of times in order to generate load, and wait for 1-2 mins for data to appear on SigNoz dashboard.

You can now access the SigNoz dashboard at [http://localhost:3301](http://localhost:3301/) to monitor your app for performance metrics.

## Monitor your Go application with SigNoz dashboards

With the above steps, you have instrumented your Go application with OpenTelemetry. OpenTelemetry sends the collected data to SigNoz which can be used to store it and visualize it. Let’s see how SigNoz can help you monitor your Go application.

You need to interact with your sample application a bit to generate some monitoring data. As mentioned earlier, hit the `/books` endpoint of the bookstore app at [http://localhost:8090/books](http://localhost:8090/books) and refresh it a bunch of times in order to generate load.

You can then navigate to [http://localhost:3301/application](http://localhost:3301/application) (needs signup) to see your Go app being monitored.

Go to `Metrics`→ `goGinApp`→ you will be able to see the dashboard.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/04/goginapp_signoz_dashboard.webp" alt="Gin app being monitored on SigNoz dashboard"/>
    <figcaption><i>Your Go Gin application being monitored on the SigNoz dashboard</i></figcaption>
</figure>

<br></br>

You can monitor application metrics like application latency, requests per second, error percentage, etc. with the `Metrics` tab of SigNoz.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/04/gin_application_metrics.webp" alt="OpenTelemetry Gin application metrics"/>
    <figcaption><i>You can monitor your Go Gin application metrics like application latency, requests per second, error percentage, etc.</i></figcaption>
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

## Conclusion

Using OpenTelemetry and SigNoz, you can set up a robust monitoring framework for your Golang application. OpenTelemetry is the future for setting up observability for cloud-native apps. It is backed by a huge community and covers a wide variety of technology and frameworks. Using OpenTelemetry, engineering teams can instrument polyglot and distributed applications with peace of mind.

You can then use SigNoz to store and visualize your telemetry data. SigNoz is an open-source observability tool that comes with a SaaS-like experience. You can try out SigNoz by visiting its GitHub repo 👇 

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)


If you are someone who understands more from video, then you can watch the our video tutorial on how to implement OpenTelemetry Golang libraries and monitor the application with SigNoz.
<p>&nbsp;</p>

<LiteYoutubeEmbed id="kTHW4VYnISQ" mute={false} />

<p>&nbsp;</p>

If you have any questions or need any help in setting things up, join our slack community and ping us in `#support` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.webp)](https://signoz.io/slack)

---

## Further Reading

[SigNoz - an open-source alternative to DataDog](https://signoz.io/blog/open-source-datadog-alternative/)


<!-- ## Using SigNoz dashboard to identify issues causing high latency in your app

Now that you have installed SigNoz, let's see how you can identify specific events causing high latency in your deployed applications.

In just 5 easy steps, our dashboard lets you drill down to events causing a delay in your deployed apps 👇

1. **Choose the service you want to inspect**

   ![List of services monitored](/img/blog/2021/06/dashboard_applications_list-2.webp)

2. **Choose the timestamp where latency is high and click on view traces**

   ![Dashboard showing RED metrics](/img/blog/2021/06/dashboard_view_traces-1.webp)

3. **Choose the trace ID with the highest latency**

   ![See list of traces](/img/blog/2021/06/dashboard_highest_traceid.webp)

4. **Inspect distributed traces with flamegraph**

   ![Flamegraphs for distributed tracing](/img/blog/2021/06/dashboard_flamegraph.webp)

5. **Zero in on the highest latency event and take action**

   ![Zoom in to specific spans](/img/blog/2021/06/dashboard_highest_latency.webp)

If you need any help with trying out SigNoz, feel free to mail me at ankit.anand@signoz.io. -->

<!-- Check out our [documentation](https://signoz.io/docs/install/docker) for more installation guides and troubleshooting instructions. -->

<!-- They say, "If it's not monitored, then it's not in production." And with SigNoz you can start monitoring your applications now. Enabling your team to resolve issues quickly in production is critical to maintaining complex distributed systems in fine health.

At SigNoz, we are committed to making the best open-source, self-hosted tool for application performance monitoring. Feel free to check out our GitHub repo here: -->
<!-- 
[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz) -->
