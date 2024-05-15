---
title: LLM Observability with OpenTelemetry and SigNoz
slug: llm-observability
date: 2024-01-04
tags: [OpenTelemetry, LLM]
authors: jaikanth
description: Unlock the secrets of LLM observability - Follow this guide to seamlessly integrate OpenTelemetry with your LLM application and elevate observability with SigNoz....
image: /img/blog/2024/01/llm-observability-cover.jpeg
hide_table_of_contents: false
keywords:
  - opentelemetry
  - signoz
  - observability
  - llm
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/llm-observability/"/>
</head>

In the rapidly evolving world of Large Language Models (LLMs), ensuring peak performance and reliability is more critical than ever. This is where the concept of 'LLM Observability' comes into play. It's not just about monitoring outputs; it's about gaining deep insights into the internal workings of these complex systems.

Large Language Models (LLMs) represent a transformative advancement in artificial intelligence, offering a wide range of capabilities for solving problems through sophisticated language understanding and generation.

<!--truncate-->

![Cover Image](/img/blog/2024/01/llm-observability-cover.webp)

Langchain is one of the popular frameworks for building LLM Apps, which has integrations with popular LLM Model APIs like OpenAI’s GPT-4, Google’s Gemini, Meta’s Llama2 or Anthropic’s Claude, etc. It also integrates with Vector Databases and provides a nice chain abstraction to make agent-like implementations.

Speaking of cost-effective monitoring solutions, embedding high cardinality custom metrics such as accuracy, latency, or detailed model attributes is invaluable. High cardinality metrics refer to data with a vast and unique range of values, which can significantly enhance trace analysis. However, the costs associated with traditional observability platforms can be prohibitive, often akin to an implicit "data tax."

OpenTelemetry, paired with solutions like SigNoz, offers an attractive and economical alternative for incorporating these granular insights. Costs for [high cardinality custom metrics can go out of control](https://signoz.io/blog/datadog-pricing/#datadogs-custom-metrics-pricing-can-get-out-of-control-quickly) in tools like Datadog. OpenTelemetry and SigNoz makes a perfect combo for setting up robust LLM observability.

In this post, we cover:

- [Why do we need LLM Observability?](#why-do-we-need-llm-observability)
- [OpenTelemetry For LLM Observability](#opentelemetry-for-llm-observability)
- [OpenTelemetry & SigNoz - The Perfect Combo for LLM Observability](#opentelemetry--signoz---the-perfect-combo-for-llm-observability)
- [Prerequisites](#prerequisites)
- [Setting up SigNoz](#setting-up-signoz)
- [Approaches to Instrumenting a LangChain LLM App](#approaches-to-instrumenting-a-langchain-llm-app)
- [Manual Instrumentation Using OpenTelemetry SDK](#manual-instrumentation-using-opentelemetry-sdk)
- [Automatic Instrumentation using OpenLLMetry](#automatic-instrumentation-using-openllmetry)
- [Monitoring with SigNoz Dashboard](#monitoring-with-signoz-dashboard)
- [Conclusion](#conclusion)

## Why do we need LLM Observability?

LLMs are intricate systems where countless processes occur simultaneously. Without proper observability, understanding these internal dynamics becomes a guessing game, leading to inefficiencies and potential errors.

We need LLM observability for the following use cases:

- **Model Performance and Accuracy Insights:** Provides critical data on LLM accuracy and processing capabilities, guiding refinements for superior model reliability and performance.
- **Real-time Performance Tracking:** Enables instantaneous feedback on LLM operations, ensuring peak system efficiency and adaptation to varying performance requirements.
- **Resource Utilization and Efficiency:** Identifies computational demands and inefficiencies, optimizing resource allocation to enhance cost-effectiveness and system throughput.
- **Issue Detection and Troubleshooting:** Facilitates quick identification and resolution of complex issues within LLM infrastructures, reducing downtime and improving user experience.

In this tutorial, we will use OpenTelemetry and SigNoz to set up LLM observability. Before we start, let’s have a brief overview of OpenTelemetry.

## OpenTelemetry For LLM Observability

OpenTelemetry is a set of APIs, SDKs, libraries, and integrations aiming to standardize the generation, collection, and management of telemetry data(logs, metrics, and traces). It is backed by the Cloud Native Computing Foundation and is the leading open-source project in the observability domain.

OpenTelemetry is perfectly suited to instrument LLM applications for observability because of its comprehensive and flexible approach to telemetry data collection. It offers a unified solution for gathering and managing metrics, logs, and traces, which are crucial for observing complex systems like LLMs.

Some of the key benefits of using OpenTelemetry for LLM observability are as follows:

1. **Unified Instrumentation**: OpenTelemetry provides a single, unified solution for collecting a full range of telemetry data. This unified approach simplifies the instrumentation process, making it easier to maintain and update.
2. **Vendor Neutrality**: One of the key benefits of OpenTelemetry is its vendor-neutral design. This means that it works with a wide range of monitoring and analytics platforms. This flexibility allows organizations to switch between different backends without having to re-instrument their applications.
3. **Community-Driven and Open Source**: Being community-driven and open source, OpenTelemetry benefits from contributions from a wide range of developers and companies. This leads to continuous improvements, innovative features, and a robust, well-tested product.
4. **Customization and Extensibility**: OpenTelemetry is designed to be extensible, allowing developers to customize it to meet their specific needs. This includes adding new telemetry sources, integrating with other tools, and modifying data collection and processing behaviors.
5. **Future-Proofing**: As technology and standards evolve, OpenTelemetry's active development and wide adoption ensure that it remains up-to-date with the latest trends and practices in software monitoring and telemetry.

The data you collect with OpenTelemetry is vendor-agnostic and can be exported to any backend, but which backend is best suited for OpenTelemetry?

## OpenTelemetry & SigNoz - The Perfect Combo for LLM Observability

OpenTelemetry does not provide any backend. After generating telemetry data, it needs to be sent to a backend for storage and visualization. SigNoz is an [OpenTelemetry-native APM](https://signoz.io/blog/opentelemetry-apm/) built to support OpenTelemetry from day 1.

SigNoz supports OpenTelemetry semantic conventions and provides visualization for all three distinct types of signals supported by OpenTelemetry. Most popular observability vendors claim that they support OpenTelemetry data, but [reality is different](https://signoz.io/blog/is-opentelemetry-a-first-class-citizen-in-your-dashboard-a-datadog-and-newrelic-comparison/) in many cases.

SigNoz is also open-source, and if you’re using OpenTelemetry and SigNoz, your entire observability stack will be open-source.

Enough context, now let’s get started with the demo.

## Prerequisites

- Langchain App: If you just want to play around to understand SigNoz's capabilities, here’s a <a href = "https://github.com/SigNoz/langchain-sample-app" rel="noopener noreferrer nofollow" target="_blank" >sample Langchain application</a>.
- [SigNoz Cloud Account](https://signoz.io/teams/)

## Setting up SigNoz

You need a backend to which you can send the collected data for monitoring and visualization. [SigNoz](https://signoz.io/) is an OpenTelemetry-native APM that is well-suited for visualizing OpenTelemetry data.

SigNoz cloud is the easiest way to run SigNoz. You can sign up [here](https://signoz.io/teams/) for a free account and get 30 days of unlimited access to all features.

You can also install and self-host SigNoz yourself. Check out the [docs](https://signoz.io/docs/install/) for installing self-host SigNoz.

## Approaches to Instrumenting a LangChain LLM App

- **Manual Instrumentation using OpenTelemetry SDK**: Allows for granular control and insights but is time-consuming to implement.
- **Automated Instrumentation using OpenLLMetry SDK**: In addition to automatic instrumentation of API and DB calls, this version of the SDK instruments Langchain App, like OpenAI calls and Vector DB retrievals. A big shoutout to our friends at <a href = "https://www.traceloop.com/blog/openllmetry" rel="noopener noreferrer nofollow" target="_blank" >Traceloop</a> for building OpenLLMetry.

## Manual Instrumentation Using OpenTelemetry SDK

OpenTelemetry is an open-source observability framework for cloud-native software. It provides tools for capturing traces, metrics, and logs, which are essential for understanding the behavior of your application. Below is a guide to manually integrate OpenTelemetry into an LLM application.

**Installation**: To integrate OpenTelemetry into your LLM app, start by installing the necessary SDK. You can do this with the following command:

```bash
pip install opentelemetry-sdk
```

**Setup:** Environment Variables to set to send data to SigNoz:

```bash
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_ENDPOINT="ingest.{region}.signoz.cloud"
export OTEL_EXPORTER_OTLP_HEADERS="signoz-access-token=<SIGNOZ_INGESTION_KEY>"
```

You can get the ingestion details for your SigNoz cloud account under settings —> ingestion settings.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/ingestion-key-details.webp" alt="Ingestion details in SigNoz"/>
    <figcaption><i>Ingestion details in SigNoz.</i></figcaption>
</figure>
<br/>

**Integration**: Once you have the SDK, you'll need to incorporate the OpenTelemetry libraries into your app's codebase. This involves creating traces and spans that represent the operations your app performs. Here's a snippet demonstrating how to create a span around an API request to the OpenAI service:

```python
from opentelemetry import trace
from opentelemetry.trace import SpanKind

tracer = trace.get_tracer(__name__)

with tracer.start_span("OpenAI_API_Request", kind=SpanKind.CLIENT) as span:
    # Code to perform the API request goes here
    response = perform_api_request()
    span.set_attribute("response.status_code", response.status_code)

```

In this code block, we're creating a new span with the `start_span` method. The span is named "OpenAI_API_Request", indicating the action it represents. Within the span's context, we make the API request and then record the response status code as an attribute of the span. This level of granularity allows for in-depth monitoring and troubleshooting.

## Automatic Instrumentation using OpenLLMetry

While manual instrumentation provides fine-grained control, it can be time-consuming. That's where automatic instrumentation steps in. Our friends at <a href = "https://www.traceloop.com/blog/openllmetry" rel="noopener noreferrer nofollow" target="_blank" >Traceloop</a> have built OpenLLMetry, an OpenTelemetry library to instrument Langchain applications quickly. For our purposes, let's imagine that OpenLLMetry is OpenTelemetry with inbuilt capabilities to instrument components from the LLM ecosystem.

**Installation**: To get started with OpenLLMetry, install the SDK and initialize it within your application:

```
pip install traceloop-sdk
```

**Setup**: Set the following environment variables or add them to a dotenv file.

```bash
export TRACELOOP_BASE_URL=ingest.{region}.signoz.cloud
export TRACELOOP_HEADERS="signoz-access-token=<SIGNOZ_INGESTION_KEY>"
```

Initialize the SDK at the start of your application entry point.

```python
from traceloop import Traceloop

Traceloop.init(app_name="Signoz PDF Chat")
```

**Setting Up Properties**: With OpenLLMetry, you can set association properties that help in correlating traces with specific users or sessions. Here's how you might do it:

```python
import uuid
from traceloop import Traceloop

@app.post('/chat')
async def ask(question: str, user: User):
	Traceloop.set_association_properties({
	    "user_id": user.username,
	    "chat_id": str(uuid.uuid4()),
	})
  chain = load_qa_chain(ChatOpenAI(temperature=0), chain_type="stuff")
	return chain.run(input_documents=docs, question=query)
```

This code associates the current tracing context with a user ID and a unique chat session ID. This kind of metadata is invaluable for debugging issues that are user or session-specific.

### Sample Code

```python
import uuid
from langchain.document_loaders import PyPDFLoader
from langchain.vectorstores import Chroma
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.document_loaders import UnstructuredPDFLoader

from langchain.chat_models import ChatOpenAI
from langchain.chains.question_answering import load_qa_chain
from traceloop.sdk import Traceloop
from dotenv import load_dotenv
load_dotenv()

Traceloop.init(app_name="Signoz PDF Chat")

loader = UnstructuredPDFLoader("book.pdf")
pages = loader.load_and_split()
embeddings = OpenAIEmbeddings()
docsearch = Chroma.from_documents(pages, embeddings).as_retriever()

queries = [
    "What is the name of the author?",
    "What is the name of the book?",
    "Who is Rich Dad?",
    "Who is Poor Dad?",
    "Give me a summary of the book?"
    "What is the 3 key takeaways from the book?"
]
for queryroot in queries:
    for querysuffix in enumerate([' Concise Answer', 'Answer in (~250 words)', 'Long Answer (~750 words)']):
        # Sets Properties to be used in the dashboard
				Traceloop.set_association_properties({ "user_id": "John McClane", "chat_id": str(uuid.uuid4()) })
        query = queryroot + querysuffix
        docs = docsearch.get_relevant_documents(query)
        chain = load_qa_chain(ChatOpenAI(temperature=0), chain_type="stuff")
        output = chain.run(input_documents=docs, question=query)
        print(output)
```

For more information and to enrich the workflow with names other than the function name, refer to <a href = "https://www.traceloop.com/docs/openllmetry/tracing/annotations" rel="noopener noreferrer nofollow" target="_blank" >OpenLLMetry documentation</a>.

## Monitoring with SigNoz Dashboard

Once the above setup is done, you will be able to access the metrics in the SigNoz dashboard. You can go to the `Dashboards` tab and try adding a new panel. You can learn how to create dashboards in SigNoz [here](https://signoz.io/docs/userguide/manage-dashboards-and-panels/).

You can easily create charts with [query builder](https://signoz.io/docs/userguide/create-a-custom-query/#sample-examples-to-create-custom-query) in SigNoz. Here are the [steps](https://signoz.io/docs/userguide/manage-panels/#steps-to-add-a-panel-to-a-dashboard) to add a new panel to the dashboard.

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2024/01/llm-observability-performance-dashboard.webp" alt="LLM observability setup with SigNoz"/>
    <figcaption><i>A dashboard set up to measure the performance of the Langchain app showing important metrics like total LLM calls, latency, token throughput, etc.</i></figcaption>
</figure>
<br/>

You can also create dashboards to monitor the cost of running the Langchain application.

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2024/01/llm-observability-cost-monitor-dashboard.webp" alt="LLM observability dashboard for cost"/>
    <figcaption><i>Dashboard to monitor the cost of running the Langchain application..</i></figcaption>
</figure>
<br/>

### Dynamic Dashboard Views with Variables

To accommodate the needs of diverse teams, SigNoz supports dynamic dashboard views through the use of dashboard variables. For instance, the application team might need to see metrics specific to a 'service' or ‘user’.

To utilize this feature, you can create variables and corresponding options (see [Manage Variables](https://signoz.io/docs/userguide/manage-variables/)). The sample Dashboard JSONs attached to this article have good examples as well.

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2024/01/llm-observability-dynamic-filter-dashboard.webp" alt="Dynamic dashboard in SigNoz where you can filter for specific service or user"/>
    <figcaption><i>Dynamic dashboard in SigNoz where you can filter for specific service or user.</i></figcaption>
</figure>
<br/>

Learn how to create variables in Dashboards [here](https://signoz.io/docs/userguide/manage-variables/)

### Thresholds

To help operators quickly identify critical points, you can set threshold values on your visualizations within the SigNoz dashboard. These thresholds can serve as benchmarks for acceptable performance levels or as warnings for potential issues.

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2024/01/llm-observability-threshold.webp" alt="Set thresholds to serve as benchmarks for acceptable performance levels"/>
    <figcaption><i>Set thresholds to serve as benchmarks for acceptable performance levels.</i></figcaption>
</figure>
<br/>

### Alerting

Enhance your monitoring by creating alerts for any metric. SigNoz enables you to send notifications through various channels like Slack, Teams, or PagerDuty, ensuring rapid response times to critical conditions. Learn the process of setting up alerts in the comprehensive guide [here](https://signoz.io/docs/userguide/alerts-management/).

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2024/01/llm-observability-alerts.webp" alt="Set alerts on important metrics to get notified in your preferred notification channel."/>
    <figcaption><i>Set alerts on important metrics to get notified in your preferred notification channel.</i></figcaption>
</figure>
<br/>

### Pre-built Dashboards

If you want to get started quickly with monitoring your Langchain app, you can use SigNoz's two pre-built dashboards: _Performance Dashboard_ and _Cost Dashboard_. You can load SigNoz dashboard using the Import JSON button and get started.

<a href = "https://github.com/SigNoz/dashboards/blob/main/llm-observability/sample-chatpdf-performance-metrics.json" rel="noopener noreferrer nofollow" target="_blank" >JSON for Langchain App Performance Dashboard</a>
<br/>
<a href = "https://github.com/SigNoz/dashboards/blob/main/llm-observability/sample-chatpdf-cost-dashboard.json" rel="noopener noreferrer nofollow" target="_blank" >JSON for Langchain App Cost Dashboard</a>

<br/>

**Note**: _Performance dashboard_ works with any Langchain App. The _Cost dashboard_’s 'Cost by User' panel works only when the `user_id` property is transmitted. For more details, refer to the example app or sample code on how to set associated properties.

## Conclusion

In this article, we explored the importance of LLM observability and introduced OpenTelemetry. We demonstrated how to instrument a sample Langchain application with both manual and automatic OpenTelemetry instrumentation. For setting up LLM observability, we chose SigNoz, a full-stack, open-source tool that consolidates logs, metrics, and traces in one interface.

OpenTelemetry is rapidly emerging as the global standard for open-source observability. Its use offers several benefits, including a unified standard for all telemetry signals and freedom from vendor lock-in, making it an ideal choice for LLM applications.

SigNoz is an open-source, [OpenTelemetry-native APM](https://signoz.io/blog/opentelemetry-apm/), serving as a comprehensive backend solution for all your observability needs.

---

**Further Reading**

[An OpenTelemetry-native APM](https://signoz.io/blog/opentelemetry-apm/)
