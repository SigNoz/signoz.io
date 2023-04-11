---
id: metrics
title: View Services
sidebar_label: View Services
---

import GetHelp from '../shared/get-help.md'
import PrereqsInstrument from '../shared/prereqs-instrument.md'
import UseHotRod from '../shared/use-hotrod.md'
import MetricsDefinition from '../shared/metrics-definition.md'

This page walks you through the **Services** section and gets you started with monitoring your application. You’ll learn the following:

- What are application metrics
- How to use the **Services** section to see an overview of your applications
- How to view details about a specific application

<UseHotRod />

## Prerequisites

<PrereqsInstrument />

## What Are Application Metrics?

<MetricsDefinition />

The **Services** section relies on the rate, errors, and duration (”RED”) method to help you predict the experience of your users and includes the following keys metrics:

- **P99 Latency:** the amount of time your application spends processing each of the fastest 99% of requests. For example, if the value of the `P99` latency is 760 ms, 99% percent of requests have responses that are equal to or faster than 760 ms.
- **Error Rate**: the percentage of failing requests i.e ratio of error requests to the total requests.
- **Requests per Second**: the number of requests your application processes per second.

## Open the Services Section

From the sidebar, select **Services**:

![Open the Services section](/img/docs/open-services-v0.10.2.png)

This page provides an overview of your applications’ health and performance. It shows the list of your applications formatted as a table and, for each application, SigNoz displays the RED metrics mentioned above.

This page shows all the instrumented applications sending the data to SigNoz. This includes web servers, message brokers/queuing systems, web/mobile clients, corn jobs, and more.

What services are shown? And how are the RED metrics calculated?

We rely on the semantic conventions provided by OpenTelemetry. Every unique `service.name` configured and received is part of the service list. The following logic is used for the RED metrics generation of each service.

![trace-request](/img/docs/trace_request_shop.png)

In a distributed trace, a request goes through several entities performing various kinds of work. There is an entry point span for each service that took part in the trace journey. This can be thought of as a sub-root span for the service. This sub-root span can have many child spans which could be doing work in parallel or sequential or a combination of both. From an outside perspective this sub-root span work is an operation done by the service and how much time it took to complete this operation is the duration metric. For a web server, this is an API endpoint returning some data and request time is the duration metric. For a messaging consumer service, this is a consume trigger, and till it is done with the message received. For a mobile client application, this could be a button click to submit a form and the time taken to fulfill the request.

- Requests/s - Number of sub-root spans seen for a service
- PXX - Quantile of the duration of the sub-root spans
- Error rate - Number of sub-root spans with status error / Total number of sub-root spans


![RED metrics](/img/docs/open-services-v0.10.2.png)

## Sort the List of Applications

Select a column heading to sort the list by the values in that column. Select the column heading again to reverse the sort order or to cancel sorting.

## Filter the List of Applications

You can add attributes to applications and filter based on these attributes. 

![resource-attribute-filtering](/img/docs/resource-attribute-filtering.png)

### Steps to add resource attributes

You can add attributes with `OTEL_RESOURCE_ATTRIBUTES` flag when starting the application. The below example shows how to set values for `service.namespace` and `deployment.environment`

For example

```
OTEL_RESOURCE_ATTRIBUTES="service.name=flaskApp,service.namespace=sampleapps,deployment.environment=play" OTEL_EXPORTER_OTLP_ENDPOINT="http://3.11.144.34:4317" opentelemetry-instrument python3 app.py
```

By default, you can filter based on `service.namespace` and `deployment.environment` dimensions.

To add another dimension, update the dimension fields at https://github.com/SigNoz/signoz/blob/develop/deploy/docker/clickhouse-setup/otel-collector-config.yaml#L34
 and then deploy the yaml file again.

## View Details About an Application

The RED metrics help you spot performance bottlenecks or failures  across all your applications.  For example, if the error rate of an application increases, you can assume that these errors will impact the experience of your customers. Once you’ve identified a potential issue, select a row to open the application details page:

![Open the application details page](/img/docs/open-application-details-v0.10.2.png)

The application details pane contains three panes that are explained in the following sections:
- Application Metrics
- External Calls
- Database Calls

![Panes on the application details page](/img/docs/application-details-page-panes-v0.10.2.png)

### Application Metrics in SigNoz

The application metrics pane is comprised of four graphs:

- **Application Latency in Milliseconds**: this graph shows the `P99`, `P95`, and `P50` latencies for the selected period of time.
    ![Application latency](/img/docs/application-latency-v0.10.2.png)
- **Requests per Second**: this graph shows the number of requests per second your application currently serves.
    ![Requests per second](/img/docs/requests-per-second-v0.10.2.png)
- **Error Percentage**: this graph shows the percentage of errors of the total sum of requests.
    ![Error percentage](/img/docs/error-percentage-v0.10.2.png)
- **Key Operations**: this list helps you find the slow operations of your application. You can select a column heading to sort the list by the values in that column. Select the column heading again to reverse the sort order or to cancel sorting.
    ![Key operations](/img/docs/key-operations-v0.10.2.png)

### External Calls in SigNoz

The external calls pane allows you to track the external services your applications depend on.

The spans should have the following span attributes to be counted in this panel

- `span.kind=3` which means these are spans of kind [`CLIENT`](https://github.com/open-telemetry/opentelemetry-proto/blob/main/opentelemetry/proto/trace/v1/trace.proto#L139). You can read more details on SpanKinds [here](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/api.md#spankind)
- One of the following sets of attributes
    * rpc.system, rpc.service, rpc.method
    * rpc.system, net.peer.name, net.peer.port
    * rpc.system, net.peer.ip, net.peer.port
    * http.host
    * net.peer.name, net.peer.port
    * net.peer.ip, net.peer.port
    * http.url
    * peer.service

The remote host address is constructed from one of the attribute sets in the order listed above. This
includes any database calls that have transport other than unix domain socket or pipe, or a call to another http host, or an aws lambda function and generally any out of process call over the network.

If your services are making external calls but External Call panels show as empty, please make sure that your spans have the above attributes.

The graphs in this pane provide the following information:
- The percentage of external calls that resulted in errors.
- The average duration of all your external calls.
- The number of external calls per second by address.
- The average duration of your external calls by address.

### Database Calls in SigNoz

This pane shows details about the database calls that your application makes. The spans should have the following span attributes to be counted in this panel

- `span.kind!=2` which means these are spans of kind anything except `SERVER`. You can read more details on SpanKinds [here](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/api.md#spankind)
- `db.system` should be present as span attribute

If your services are making DB calls and your Database Call panels show as empty, please make sure that:
1. Your spans have the above attributes.
2. You have used appropriate libraries for instrumenting packages which you use to make DB calls from your application

The graphs in this pane provide the following information:
- The number of database calls per second
- The average duration of your database calls. expressed in milliseconds

## Get Help

<GetHelp />
