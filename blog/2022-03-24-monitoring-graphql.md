---
title: Monitoring GraphQL APIs with OpenTelemetry
slug: monitoring-graphql
date: 2023-01-04
tags: [OpenTelemetry Instrumentation, JavaScript]
authors: [selva]
description: GraphQL enables frontend developers or consumers of APIs to request the exact data that they need, with no over-fetching or under-fetching. It's a popular alternative to REST, but monitoring it is challenging. In this article, let's learn how to monitor GraphQL in simple steps with...
image: /img/blog/2022/03/monitoring_graphql_apis_cover.webp
hide_table_of_contents: false
keywords:
  - monitoring
  - graphql
  - monitoring graphql
  - opentelemetry
  - graphql query
  - open source
  - signoz
---
<head>
  <link rel="canonical" href="https://signoz.io/blog/monitoring-graphql/"/>
</head>

GraphQL is a query language for APIs developed by Facebook in 2012. It was then open-sourced in 2015. GraphQL enables frontend developers or consumers of APIs to request the exact data that they need, with no over-fetching or under-fetching. In this article, we will learn how to monitor GraphQL APIs with OpenTelemetry and SigNoz.

<!--truncate-->

![Cover Image](/img/blog/2022/03/monitoring_graphql_apis_cover.webp)

GraphQL has become a popular alternative to REST because of its ease of use. It enables developers to pull data from multiple data sources in a single API call. Usually, GraphQL serves as a single entry point to the server, and as such, monitoring your GraphQL API is critical.

Some of the things that you want to monitor about your GraphQL APIs are as follows:

- GraphQL query
- GraphQL resolver
- Tracking the query performs with distributed tracing

In this article, we will use SigNoz, which uses OpenTelemetry as an instrumentation layer to monitor GraphQL APIs.

## Using OpenTelemetry to monitor GraphQL APIs

### What is OpenTelemetry?

<a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank" >OpenTelemetry</a> is an open-source vendor-agnostic set of tools, APIs, and SDKs used to instrument applications to create and manage telemetry data(logs, metrics, and traces). It aims to make telemetry data(logs, metrics, and traces) a built-in feature of cloud-native software applications. It is a project under <a href = "https://www.cncf.io/" rel="noopener noreferrer nofollow" target="_blank" >CNCF</a> with huge community backing.<br></br>

<br></br>

> What is instrumentation?<br></br>
> Instrumentation is described as the process of enabling your application code to generate telemetry data. OpenTelemetry provides client libraries for instrumentation. It also provides many auto-instrumentation libraries that generate and capture telemetry data for common frameworks and protocols without making any code changes.

By using OpenTelemetry libraries, you can monitor application code written in almost any major programming language.

### Using OpenTelemetry GraphQL library

OpenTelemetry provides a library to monitor GraphQL APIs. The library will monitor your GraphQL queries without any code changes. OpenTelemetry libraries are used to generate and capture telemetry data. 

Once the data is captured, it needs to be sent to a backend tool of your choice for storage and visualization. We will send the monitoring data captured by OpenTelemetry from the GraphQL application to [SigNoz](https://signoz.io/), an open-source APM tool.

## Running a sample GraphQL application with OpenTelemetry

### Pre-requisites

- Node JS above 12
- SigNoz

### Installing SigNoz

SigNoz can be installed on macOS or Linux computers in just three steps by using a simple install script.

The install script automatically installs Docker Engine on Linux. However, on macOS, you must manually install <a href = "https://docs.docker.com/engine/install/" rel="noopener noreferrer nofollow" target="_blank" >Docker Engine</a> before running the install script.

```jsx
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

When you are done installing SigNoz, you can access the UI at [http://localhost:3301](http://localhost:3301/application)

import Screenshot from "@theme/Screenshot"

<Screenshot
   alt="SigNoz dashboard"
   height={500}
   src="/img/blog/2022/02/signoz_dashboard.webp"
   title="SigNoz dashboard - It shows services from a sample app that comes bundled with the application"
   width={700}
/>


### Running sample application

Below are the steps to run the sample GraphQL application with OpenTelemetry.

1. **Clone sample GraphQL app repository and go to the root folder**<br></br>
   We will be using a sample GraphQL app at this [GitHub repo](https://github.com/SigNoz/graphql-opentelemetry-sample).
    
    ```jsx
    git clone --single-branch --depth 1 https://github.com/SigNoz/graphql-opentelemetry-sample.git
    cd graphql-opentelemetry-sample
    ```
    
2. **Install the required dependencies**<br></br>
   You can check out the depencies required from `package.json` file. Install all the required dependencies for the sample application using `npm`
    
    ```jsx
    npm install
    ```
    
    OpenTelemetry needs the following packages to instrument the GraphQL app.
    
    ```jsx
    "@opentelemetry/api": "^1.0.3",
    "@opentelemetry/auto-instrumentations-node": "^0.25.0",
    "@opentelemetry/exporter-otlp-grpc": "^0.26.0",
    "@opentelemetry/instrumentation-graphql": "0.27.4",
    "@opentelemetry/resources": "^0.24.0",
    "@opentelemetry/sdk-node": "0.27.0",
    "@opentelemetry/sdk-trace-base": "^1.0.1",
    "@opentelemetry/sdk-trace-node": "^1.0.1",
    "@opentelemetry/semantic-conventions": "^0.24.0",
    ```
    
3. **Configure instrumentation using tracer.js file**<br></br>
   In order to instrument our GraphQL APIs, we will create a single `tracer.js` file and use it to instrument the service.
    
    To capture GraphQL instrumentation, add the OpenTelemetry instrumentation GraphQL package. You can also <a href = "https://www.npmjs.com/package/@opentelemetry/instrumentation-graphql" rel="noopener noreferrer nofollow" target="_blank" >configure some parameters</a> based on your use-case.
    
    ```jsx
    const sdk = new opentelemetry.NodeSDK({
      traceExporter,
      instrumentations: [
        getNodeAutoInstrumentations(),
        new GraphQLInstrumentation({
          allowValues: true,
        }),
      ],
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
      }),
    })
    ```
    
    We need to initialize OpenTelemetry before your application gets loaded. If your application begins requiring packages before OpenTelemetry is set up, it can create issues. You can initialize OpenTelemetry by using the code as shown below:
    
    ```jsx
    const init = require('./tracer')
    init('graphql-service')
    ```
    
     A sample tracer.js file is provided in the GitHub repo [here](https://github.com/SigNoz/graphql-opentelemetry-sample/blob/main/tracer.js). Note the lines that should either be deleted or uncommented based on the application need.
    
4. **Setting up SigNoz as the OpenTelemetry backend**<br></br>
   To set up OpenTelemetry to export telemetry data, you need to specify OTLP (OpenTelemetry Protocol) endpoint of a backend tool like SigNoz. It consists of the IP of the machine where SigNoz is installed and the port number at which SigNoz listens.
   
   OTLP endpoint for SigNoz - `<IP of the machine>:4317`
   
   If you have installed SigNoz on your local machine, then your endpoint is `127.0.0.1:4317`.
    
5. **Run the GraphQL service**<br></br>
    
    ```jsx
    OTEL_EXPORTER_OTLP_ENDPOINT=127.0.0.1:4317 \
    OTEL_RESOURCE_ATTRIBUTES=service.name=graphql-service \
    node -r ./tracer.js index.js
    ```
    
    Open GraphQL interface at [http://localhost:4000/graphql](http://localhost:4000/graphql)
    

<Screenshot
   alt="GraphQL UI"
   height={500}
   src="/img/blog/2022/03/graphql_ui.webp"
   title="GraphQL interface to fetch data using queries"
   width={700}
/>
    

## Monitoring GraphQL APIs with SigNoz dashboards

You need to generate some data to see how traces captured in the SigNoz dashboard. 

Run the below graphql query in GraphQL interface at [http://localhost:4000/graphql](http://localhost:4000/graphql). You can make a bunch of calls so that it generates some monitoring data to be explored on the SigNoz dashboard.

```jsx
query{
  userById(id:2){
    email
    name
    location{
      city
      area
    }
  }
}
```

Now, open the SigNoz dashboard in your browser at [http://localhost:3301/dashboard](http://localhost:3301/dashboard). You should now be able to notice `Graphql-service` in the list of services being monitored on the dashboard.

<Screenshot
   alt="GraphQL service being monitored by SigNoz"
   height={500}
   src="/img/blog/2022/03/graphql_app_signoz_dashboard.webp"
   title="GraphQL service being monitored by SigNoz"
   width={700}
/>

Here are a list of things that you can monitor about your GraphQL APIs with SigNoz.

1. **Monitor list of top endpoints**<br></br>
   Our example telemetry configuration assumes that GraphQL is running locally, and that we want to process every span individually as it's emitted.

<Screenshot
   alt="List of top endpoints of GraphQL service shown by SigNoz"
   height={500}
   src="/img/blog/2022/03/graphql_top_endpoints.webp"
   title="List of top endpoints of GraphQL service shown by SigNoz"
   width={700}
/>
     

2. **Explore all events(spans) in your GraphQL service**<br></br>
   You can get a list of all the events(or [spans](https://signoz.io/blog/distributed-tracing-span/) as defined in distributed tracing) related to your `graphql-service`. Use powerful filters on the `Traces` tab of SigNoz dashboard to analyze your GraphQL performance.

<Screenshot
    alt="Traces tab of SigNoz dashboard"
    height={500}
    src="/img/blog/2022/03/traces_tab_graphql_spans.webp"
    title="SigNoz captures all events related to the GraphQL service. You can use powerful filters to analyze and debug performance issues quickly."
    width={700}
    />

3. **Detailed trace of each span in GraphQL query**<br></br>
   Clicking on any span in the span table will bring you to a detailed trace page where the entire journey of the GraphQL query is shown.
   
   Establishing a sequential flow of the query along with info on time taken by each part of the request can help identify latency issues quickly. You can see details like how much time did the resolver take. You can also see the related GraphQL query.

<Screenshot
    alt="Traces Detail tab of SigNoz dashboard"
    height={500}
    src="/img/blog/2022/03/graphql_traces.webp"
    title="Flamegraph and Gantt charts showing the flow of a request in detail"
    width={700}
    />
       

4. **Troubleshooting an error**<br></br>
   You can also use SigNoz dashboard to capture error in your GraphQL queries. If you request for a data field that is not available in the backend, the GraphQL interface will show an error. 

   ```jsx
   query{
     userById(id: 11){
       name
       age
       }
       }
  ```
  
   <Screenshot
   alt="GraphQL UI showing error"
   height={500}
   src="/img/blog/2022/03/graphql_ui_error_message.webp"
   title="Cannot query field"
   width={700}
   />
    
   SigNoz captures the list of all error calls. You can see the details of a specific error in the Gantt charts. 
   
   Click on a particular trace to get a detailed view of the operation span with the error message and the offending query. In this case, you can see an internal server error related to the resolver.
   
   <Screenshot
    alt="SigNoz Trace Detail Tab showing errors in GraphQL queries"
    height={500}
    src="/img/blog/2022/03/graphql_error_traces.webp"
    title="Error traces captured from the GraphQL query in Signoz dashboard"
    width={700}
    />
    
SigNoz also provides a detailed view of common <a href = "https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/trace/semantic_conventions" rel="noopener noreferrer nofollow" target="_blank" >semantic conventions</a> like HTTP, network, and other attributes.


## Conclusion

OpenTelemetry is becoming the world standard to generate telemetry data. All major cloud vendors back it, and it will be the default instrumentation layer used by most cloud-native applications in the future.

One of the reasons it is becoming so popular is because it covers a large range of technologies. So, if your application starts using a new framework, you can quickly start monitoring it by using the applicable OpenTelemetry libraries.

In your application, you can use OpenTelemetry for GraphQL APIs and everything else that the application is using. Combined with SigNoz, you can have a fully open-source solution for monitoring your application with GraphQL. You can try out SigNoz by visiting its GitHub repo 👇

<div class="text--center">

[![SigNoz repo](/img/blog/common/signoz_github.webp)](https://github.com/signoz/signoz)

</div>

If you have any questions or need any help in setting things up, join our slack community and ping us in `#support` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.webp)](https://signoz.io/slack)
    
---
    
## Further Read

[Implementing Distributed Tracing in a Nodejs application](https://signoz.io/blog/distributed-tracing-nodejs/)
