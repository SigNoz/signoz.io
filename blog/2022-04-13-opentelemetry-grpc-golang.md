---
title: Monitor gRPC calls with OpenTelemetry - explained with a Golang example
slug: opentelemetry-grpc-golang
date: 2023-10-18
tags: [OpenTelemetry Instrumentation, Go / Golang]
authors: vaishnavi
description: This article demonstrates how to monitor gRPC calls with OpenTelemetry using a sample Golang application using gRPC framework. OpenTelemetry is a vendor-agnostic instrumentation library that can be used to monitor gRPC calls...
image: /img/blog/2023/08/opentelemetry_golang_grpc_cover-min.jpg
keywords:
  - opentelemetry
  - grpc
  - golang
  - opentelemetry grpc golang
  - opentelemetry grpc
  - grpc monitoring
  - monitoring
  - apm tools
  - application performance monitoring
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-grpc-golang/"/>
</head>

gRPC (Google Remote Procedure Call) is a high-performance, open-source universal <a href = "https://en.wikipedia.org/wiki/Remote_procedure_call" rel="noopener noreferrer nofollow" target="_blank">RPC</a>
 framework that Google developed to achieve high-speed communication between microservices. gRPC has Protobuf (protocol buffers) by default which would format or serialize the messages to a specific format that will be highly packed, highly efficient data. By its virtue of being a **lightweight RPC**, **gRPC** is suited for many use-cases.

<!--truncate-->

![Cover Image](/img/blog/2023/08/opentelemetry_golang_grpc_cover.webp)

gRPC can be considered a successor to RPC, which is light in weight. Google developed it to communicate between microservices and other systems that need to interact. There are several benefits of using gRPC.

- Uses Protocol Buffers(Protobuf) instead of JSON
- Built on HTTP 2 instead of HTTP 1.1
- Built-in code generation
- High performance
- SSL security

Apart from the above-mentioned key benefits, gRPC also promotes better design in your application. gRPC is API-oriented instead of resource-oriented like REST. It is also asynchronous by default which means it does not block the thread on request, and it can serve millions of requests in parallel, ensuring high scalability.

> **Advantages of gRPC over REST**<br></br>
> *gRPC is roughly seven times faster than REST when receiving data & roughly 10 times faster than REST when sending data for a specific payload. This is mainly due to the tight packing of the Protocol Buffers and the use of HTTP/2 by gRPC.*

## What is OpenTelemetry?

<a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank">OpenTelemetry</a> is a vendor-agnostic set of tools, APIs, and SDKs used to create and manage telemetry data(Logs, metrics, and traces). It aims to make telemetry data(logs, metrics, and traces) a built-in feature of cloud-native software applications. The telemetry data generated helps to monitor application performance.

<div><br></br></div>

> **What is OpenTelemetry instrumentation?**<br></br>
> Instrumentation is the process by which you enable application code to generate telemetry data. OpenTelemetry provides instrumentation for various libraries and frameworks in different languages. For example, in this article, we will use OpenTelemetry gRPC libraries in Golang to generate telemetry data from gRPC calls.

We will be using OpenTelemetry libraries to monitor gRPC calls in our sample Golang application.

OpenTelemetry can only help in generating the telemetry data. In order to store, and analyze that data, you need to choose a backend analysis tool. In this article, we will monitor collected data from gRPC calls with [SigNoz](https://signoz.io/).

SigNoz is a full-stack open-source APM tool that provides metrics monitoring and distributed tracing. It is built to natively support OpenTelemetry data formats. Hence, it’s a great choice for a backend analysis tool to combine with OpenTelemetry. On a side note, OpenTelemetry provides you the freedom to select a backend analysis tool of your choice.

## Installing SigNoz

SigNoz can be installed on macOS or Linux computers in just three steps by using a simple install script.

The install script automatically installs Docker Engine on Linux. However, on macOS, you must manually install <a href = "https://docs.docker.com/engine/install/" rel="noopener noreferrer nofollow" target="_blank">Docker Engine</a> before running the install script.

```bash
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

When you are done installing SigNoz, you can access the UI at [http://localhost:3301](http://localhost:3301/application)

<figure align="center">
  <img src="/img/blog/2022/02/signoz_dashboard.webp" alt="SigNoz Dashboard" width="100%" />
  <figcaption><i>SigNoz dashboard - It shows services from a sample app that comes bundled with the application</i></figcaption>
</figure>

## Running a Sample Golang gRPC Application with OpenTelemetry

We will use a sample Golang gRPC application consisting of components such as Go gRPC server, go gRPC Client along with MongoDB.

[Sample Golang gRPC GitHub repo](https://github.com/SigNoz/distributed-tracing-go-grpc-sample)

Our application is a simple Employee Service. Here is the architecture of the application along with OpenTelemetry and Signoz.

<!-- ![*Application architecture along with SigNoz and OpenTelemetry(OTel Collector)*](Ashu%20-%20Mon%2092dcf/Untitled.jpeg) -->

<figure align="center">
  <img src="/img/blog/2022/04/grpc_application_architecture.webp" alt="Application architecture" width="70%" />
  <figcaption><i>Application architecture along with SigNoz and OpenTelemetry(OTel Collector)</i></figcaption>
</figure>


### **Prerequisites**

- Golang, any one of the three latest major <a href = "https://golang.org/doc/devel/release.html" rel="noopener noreferrer nofollow" target="_blank">releases of Go</a>.
    
    For installation instructions, see Go’s <a href = "https://golang.org/doc/install" rel="noopener noreferrer nofollow" target="_blank">Getting Started</a> guide.
    
- Protocol buffer compiler, `protoc`, <a href = "https://developers.google.com/protocol-buffers/docs/proto3" rel="noopener noreferrer nofollow" target="_blank">version 3</a>.
    
    For installation instructions, see <a href = "https://grpc.io/docs/protoc-installation/" rel="noopener noreferrer nofollow" target="_blank">Protocol Buffer Compiler Installation</a>.
    
- **Go plugins** for the protocol compiler:
    1. Install the protocol compiler plugins for Go using the following commands:
        
        ```jsx
        go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28
        go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2
        ```
        
    2. Update your `PATH` so that the `protoc` compiler can find the plugins:
        
        ```jsx
        export PATH="$PATH:$(go env GOPATH)/bin"
        ```
        
- MongoDB Compass <br></br>
Download from Official site here <a href = "https://www.mongodb.com/try/download/compass" rel="noopener noreferrer nofollow" target="_blank">link</a>.

### Running a sample application with OpenTelemetry

Following are the steps to run the sample Golang gRPC application with OpenTelemetry:

**Step1:
Clone the sample Golang app repository and go to the root folder**

We will be using a sample go-grpc app in this [GitHub repo](https://github.com/SigNoz/distributed-tracing-go-grpc-sample).

```jsx
git clone --single-branch --depth 1 https://github.com/SigNoz/distributed-tracing-go-grpc-sample.git
cd distributed-tracing-go-grpc-sample
```

**Step 2:**
**Install the required dependencies**

You can check out the dependencies required from [go.mod](https://github.com/SigNoz/distributed-tracing-go-grpc-sample/blob/main/go.mod) file. Install all the required dependencies for the sample application using

```
go mod tidy
go mod vendor
```

OpenTelemetry needs the following libraries to instrument the golang-grpc app.

<!-- ![Untitled](Ashu%20-%20Mon%2092dcf/Untitled%201.webp) -->

<figure align="center">
  <img src="/img/blog/2022/04/opentelemetry_grpc_libraries.webp" alt="OpenTelemetry libraries required for monitoring gRPC" width="100%" />
</figure>

<div><br></br></div>

**Step 3:
Creation of .proto files**<br></br>
In the ***.proto*** file, we have the service definition and the respective functions/messages, and through the protoc compiler, we will generate the necessary protobuf files.

The following two commands will install the dependencies for golang's **grpc** and **protoc-gen-go,**  which will need the .proto file**.** Now let's see how the **protoc** compiler generates the respective code for Golang. For this, we have executed the following command from the root of our project.

```jsx
protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    employee/employee.proto
```

Notice that we use relative paths and set the path of our ***employee.proto*** file to compile. The above command has generated two files:

- **employee.pb.go**<br></br>
For serializing the messages using protobuf and the other file
- **employee_grpc.pb.go**<br></br>
Consisting of code for the gRPC client and server code that we will be looking at later on.

<!-- ![Untitled](Ashu%20-%20Mon%2092dcf/Untitled%202.webp) -->

If you look at the file ***employee_grpc.pb.go*,** you can notice that **structs** and **interfaces** are generated for the client and server implementation.

You can check for the .***proto*** files [here](https://github.com/SigNoz/distributed-tracing-go-grpc-sample/blob/main/employee/employee.proto).

**Step 4: Tracer Config for the gRPC Server, gRPC Client and MongoDB**<br></br>
In order to instrument our services, we will create a ***[config.go](https://github.com/SigNoz/distributed-tracing-go-grpc-sample/blob/main/config/config.go)*** file and use it to instrument the gRPC Server, gRPC Client, and MongoDB.

We need to initialize OpenTelemetry as the first call inside the main function in both gRPC server and client. If your application starts before OpenTelemetry is set up, it can create issues. You can initialize OpenTelemetry by using the code as shown below:

```go
func main() {
	tp := config.Init()

	defer func() {
		if err := tp.Shutdown(context.Background()); err != nil {
			log.Printf("Error shutting down tracer provider: %v", err)
		}
	}()
```

You can check out the configuration in the code sample [here](https://github.com/SigNoz/distributed-tracing-go-grpc-sample/blob/main/config/config.go).

**Step 5:
Instrumenting MongoDB**

But when it comes to instrumentation data for MongoDB, we need to use <a href = "https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/go.mongodb.org/mongo-driver/mongo/otelmongo" rel="noopener noreferrer nofollow" target="_blank">this OpenTelemetry Go library</a>.

It is already included in the [go.mod](https://github.com/SigNoz/distributed-tracing-go-grpc-sample/blob/main/go.mod) file of the sample repo.

When the MongoDB client is initialized, we need to set the monitor through ***otelmongo.NewMonitor()*** method like below which would get the instrumentation data from MongoDB. You can find the code in [server.go](https://github.com/SigNoz/distributed-tracing-go-grpc-sample/blob/fc29bd1406f2f2d31972cac339dbd578ac080635/server/server.go#L237) file.

```jsx
client, err := mongo.NewClient(options.Client().ApplyURI(mongo_url).SetMonitor(otelmongo.NewMonitor()))
	if err != nil {
		log.Fatal(err)
	}
```

**Step 6: Setting up .env files**<br></br>
We have the .env files in the client and server directory in order to set up environment variables required for ***grpc-server*** and ***grpc-client*** components.

`OTEL_EXPORTER_OTLP_ENDPOINT`: localhost:4317

Since, we have installed SigNoz on our local machine, we use the above IP. If you install SigNoz on a different machine, you can update it with the relevant IP.

This is how the ***server/.env*** looks like.

```jsx
MONGO_URL=mongodb://localhost:27017/employeedb
OTEL_EXPORTER_OTLP_ENDPOINT="localhost:4317"
OTEL_SERVICE_NAME="go-grpc-otel-server"
INSECURE_MODE=true
```

This is how the ***client/.env*** looks like

```jsx
OTEL_EXPORTER_OTLP_ENDPOINT="localhost:4317"
OTEL_SERVICE_NAME="go-grpc-otel-client"
INSECURE_MODE=true
```

:::info

Do not use `http` or `https` in the IP address. For example, if the IP is `http://test.com` then the `OTEL_EXPORTER_OTLP_ENDPOINT` will be `test.com:4317`

:::



You can check the client env [file](https://github.com/SigNoz/distributed-tracing-go-grpc-sample/blob/main/client/.env) and server env [file](https://github.com/SigNoz/distributed-tracing-go-grpc-sample/blob/main/server/.env) in the sample GitHub repo.

<!-- ![.env files loading in both *server/server.go* and *client/client.go.*](Ashu%20-%20Mon%2092dcf/Untitled%203.webp) -->

<!-- <figure align="center">
  <img src="/img/blog/2022/04/grpc_env_files.webp" alt="Environment files" width="90%" />
  <figcaption><i>.env files loading in both server/server.go and client/client.go</i></figcaption>
</figure>

<br></br> -->


**Step 7:**
**Create MongoDB Table and Collection in Mongo Compass**

1. Click on Connect → New Connection
   <figure align="center">
  <img src="/img/blog/2022/04/grpc_mongodb_connection.webp" alt="MongoDB Data Connection" width="90%" />
</figure>  

1. Click on Databases tab → Create Database and fill in the fields like the below screenshot
   <figure align="center">
  <img src="/img/blog/2022/04/grpc_create_database.webp" alt="Create Database" width="80%" />
</figure>


Now that the sample Golang gRPC application is set up with OpenTelemetry, let’s see how we can use SigNoz dashboard to monitor the collected data.

## Monitoring Golang gRPC and MongoDB with SigNoz dashboards


You need to generate some data to see how traces are captured in the SigNoz dashboard. From the root of our project,

1. `cd` to the server directory and then run the go grpc server
   ```jsx
   go run server.go
   ```

2. `cd` to the client directory and then run the go grpc client
   ```jsx
   go run client.go
   ```

Running the client makes a set of CRUD operations in MongoDB such as create Employee, Read Employee, Update Employee and Delete Employee. We have added traces for all these operations so that it generates some monitoring data to be explored on the SigNoz dashboard.

Now, open the SigNoz dashboard in your browser at [http://localhost:3301/dashboard](http://localhost:3301/dashboard). You should now be able to notice ***Go-Grpc-Otel-Server*** in the list of services being monitored on the dashboard.

<figure align="center">
  <img src="/img/blog/2023/08/grpc_monitored_on_signoz.webp" alt="Golang gRPC application monitored in SigNoz" width="100%" />
  <figcaption><i>Our Service Go-gRPC-Otel-Server being monitored by SigNoz</i></figcaption>
</figure>

<div><br></br></div>

**Monitor list of top endpoints**<br></br>
Our example telemetry configuration assumes that our application is running locally and that we want to process every span individually as it's emitted.

<!-- ![L*ist of top endpoints of **Go-gRPC-Otel-Server** service shown by SigNoz*](Ashu%20-%20Mon%2092dcf/Untitled%207.webp) -->

<figure align="center">
  <img src="/img/blog/2022/04/grpc_top_endpoints.webp" alt="List of Top endpoints" width="100%" />
  <figcaption><i>List of top endpoints of Go-gRPC-Otel-Server service shown by SigNoz</i></figcaption>
</figure>

<div><br></br></div>

**Explore all events(spans) in your  service**<br></br>
You can get a list of all the events(or [spans](https://signoz.io/blog/distributed-tracing-span/) as defined in distributed tracing) related to your ***Go-gRPC-Otel-Server***. Use powerful filters on the `Traces` tab of SigNoz dashboard to analyze your Application performance.

<!-- ![*SigNoz captures all events related to our application. You can use powerful filters to analyze and debug performance issues quickly.*](Ashu%20-%20Mon%2092dcf/Untitled%208.webp) -->

<figure align="center">
  <img src="/img/blog/2022/04/grpc_span_table.webp" alt="Spans Table" width="100%" />
  <figcaption><i>SigNoz captures all events related to our application. You can use powerful filters to analyze and debug performance issues quickly.</i></figcaption>
</figure>

<div><br></br></div>

**Detailed trace of each span in Application**<br></br>
Clicking on any span in the span table will bring you to a detailed trace page where the entire journey of traces of server, client, and MongoDB are shown. The trace-detail page has the info on time taken by each part of the request can help identify latency issues quickly.
You will see the flamegraph of the selected event, which shows how the request traveled between the gRPC server and the gRPC client.

<figure align="center">
  <img src="/img/blog/2022/04/grpc_flamegraph.webp" alt="Flamegraphs to visualize how a complete request performed" width="100%" />
  <figcaption><i>Flamegraphs in SigNoz dashboard</i></figcaption>
</figure>

<div><br></br></div>

SigNoz also provides a detailed view of common [semantic conventions](https://opentelemetry.io/docs/specs/semconv/rpc/grpc/) like rpc service, method, net, status_code etc. The end-to-end tracing of user requests can help you to identify latency issues quickly.

**MongoDB Traces and its semantic conventions**<br></br>
Establishing a sequential flow of the query and info on the time taken by each part of the request can help quickly identify latency issues. For example, you can see details like how much time the find query took. You can also see the related MongoDB query.

It also provides the [semantic_conventions](https://github.com/open-telemetry/semantic-conventions/blob/main/docs/database/README.md) of MongoDB in the below window.

<!-- ![Untitled](Ashu%20-%20Mon%2092dcf/Untitled%2010.webp) -->

<figure align="center">
  <img src="/img/blog/2022/04/grpc_mongodb_traces.webp" alt="Traces for MongoDB" width="100%" />
  <figcaption><i>SigNoz also provides more contextual data about MongoDB requests</i></figcaption>
</figure>

<div><br></br></div>

**Troubleshooting an error**<br></br>
You can also use SigNoz dashboard to capture error in your MongoDB queries. If you request for a data field that is not available in the backend, then the application will return an error.

<!-- ![Untitled](Ashu%20-%20Mon%2092dcf/Untitled%2011.webp) -->

<figure align="center">
  <img src="/img/blog/2022/04/grpc_error_troubleshooting.webp" alt="Troubleshooting an error" width="100%" />
  <figcaption><i>Troubleshooting an error</i></figcaption>
</figure>

## Conclusion

OpenTelemetry makes it very convenient to instrument gRPC calls for performance monitoring. OpenTelemetry is going to be the future of monitoring and observability for cloud-native applications, as it’s backed by a huge community.

The biggest advantage of using OpenTelemetry is that you are not locked-in to a vendor. If tomorrow, you want to use a different vendor you can do so easily.

SigNoz works natively with OpenTelemetry. The query service and the visualization layer on top of your telemetry data is key to generate actionable insights quickly. SigNoz provides out-of-box charts and powerful filters to analyze the telemetry data quickly.

OpenTelemetry and SigNoz provide a great open-source solution to monitor gRPC calls. You can try out SigNoz by visiting its GitHub repo 👇

<!-- [signoz_github.webp](Ashu%20-%20Mon%2092dcf/signoz_github.webp) -->

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you are someone who understands more from video, then you can watch the below video tutorial on the same with SigNoz.

<p>&nbsp;</p>

<LiteYoutubeEmbed id="HUf4sETktQY" mute={false} />

<p>&nbsp;</p>


If you have any questions or need any help in setting things up, join our slack community and ping us in `#support` channel.

<!-- ![join_slack_cta.webp](Ashu%20-%20Mon%2092dcf/join_slack_cta.webp) -->

[![SigNoz Slack community](/img/blog/common/join_slack_cta.webp)](https://signoz.io/slack)

---

Read more about OpenTelemetry from SigNoz blog

[Monitoring GraphQL APIs with OpenTelemetry](https://signoz.io/blog/monitoring-graphql/)

[Monitor a Go application with OpenTelemetry](https://signoz.io/opentelemetry/go/)
