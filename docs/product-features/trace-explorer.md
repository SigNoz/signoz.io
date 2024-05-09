---
id: trace-explorer
title: Traces Explorer in SigNoz
sidebar_label: Traces Explorer
---

## Introduction

The Traces Explorer page in SigNoz enables developers to filter, examine, and analyze traces. There are four different views available in Traces Explorer which include:

- [List View](#list-view)
- [Trace View](#traces-view)
- [Time Series View](#time-series-view)
- [Table View](#table-view)

### List View

The List View is the default view on the Traces Explorer page.

<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/trace-explorer/trace-explorer-list-view.webp" alt="List View in the Trace Explorer"/>
    <figcaption><i> List View in Trace Explorer </i></figcaption>
</figure>
<br></br>

You can perform the following operations in List view:

**Apply Filters**

- **Filtering** - Narrow down the trace data based on specific filters such as `responseStatusCode` .

- **Order By** - Use `Order By` to filter the data in a particular order.


<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/trace-explorer/trace-explorer-list-view-1.webp" alt="Filter and Order By in List View in the Traces Explorer"/>
    <figcaption><i> Filter and Order By in List View in Trace Explorer </i></figcaption>
</figure>
<br></br>

**Note:** 
- The **Group By**, **Add a query** and **Add a function** features are not supported in List View. 

**Customize Columns**

Add or delete columns using the `Options` button. For example, you can add the `httpMethod` column to see the request methods alongside each trace.


<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/trace-explorer/trace-explorer-list-view-2.webp" alt="Add or Delete column in List View of the Traces Explorer"/>
    <figcaption><i> Add or Delete column in List View </i></figcaption>
</figure>
<br></br>

**Note:** 
- Timestamp column can't be removed.

**Number of Spans to display**

You can increase the number of spans displayed upto 200/page using the dropdown shown in image below.

<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/trace-explorer/trace-explorer-list-view-3.webp" alt="List View in the Trace Explorer"/>
    <figcaption><i> Increase the number of spans displayed in List View </i></figcaption>
</figure>
<br></br>


<!-- **Save Views** 
Save your filter configurations for quick access in future analyses. -->

### Traces View

The Traces View focuses on analysis of traces related to root span. A root span also know as a Parent span is the starting point of a trace.

<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/trace-explorer/trace-explorer-traces-view.webp" alt="Traces View in the Trace Explorer"/>
    <figcaption><i> Traces View in Trace Explorer </i></figcaption>
</figure>
<br></br>

You can perform the following operations in Traces view:

**Apply Filters**

Filters applied in this view will only be applied on the root spans, not the entire traces.

For example, <br></br>
When you apply filters for `serviceName` or `durationNano`(For the Root span duration) these will be applied on the Root Span only.


<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/trace-explorer/trace-explorer-traces-view-1.webp" alt="Applying Filter in Traces View in Trace Explorer"/>
    <figcaption><i> Applying Filter in Traces View in Trace Explorer </i></figcaption>
</figure>
<br></br>

**Note:** 
- The **Group By**, **Add a query** and **Add a function** features are not supported in List View. 
- Right now there is no support to filter by `No. of Spans`

**Root Duration**

Traces are sorted by descending order of duration which helps in identifying the longest running trace.

<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/trace-explorer/trace-explorer-traces-view-2.webp" alt="Root Durations in Traces View in Trace Explorer"/>
    <figcaption><i> Root Duration in Traces View </i></figcaption>
</figure>
<br></br>

**Number of Traces to display**

You can increase the number of spans upto 200/page using the dropdown shown in image below.

<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/trace-explorer/trace-explorer-traces-view-3.webp" alt=" Increase the number of spans displayed in Traces View"/>
    <figcaption><i> Increase the number of spans displayed in Traces View </i></figcaption>
</figure>
<br></br>

### Time Series View

The Time Series View provides a graphical representation of trace data over time.

<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/trace-explorer/trace-explorer-timeseries-view.webp" alt="Timeseries View in the Trace Explorer"/>
    <figcaption><i> Timeseries View in Trace Explorer </i></figcaption>
</figure>
<br></br>

The Time Series View has the following components:

**Query Builder**

Query builder helps in filtering, aggregation and grouping of your traces data. Refer to this [documentation](https://signoz.io/docs/userguide/query-builder/) to read more about the capabilities of the Query Builder.

<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/trace-explorer/trace-explorer-timeseries-view-1.webp" alt="Query Builder in Timeseries View"/>
    <figcaption><i> Query Builder in Timeseries View </i></figcaption>
</figure>
<br></br>

**Graph View**

This provides you with a graphical representation of the output of Query made using the Query Builder.

<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/trace-explorer/trace-explorer-timeseries-view-2.webp" alt="Graph View in Timeseries View"/>
    <figcaption><i> Graph View in Timeseries View </i></figcaption>
</figure>
<br></br>

### Table View

The Table View provides a tabular representation of the trace data.

<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/trace-explorer/trace-explorer-table-view.webp" alt="Table View in the Trace Explorer"/>
    <figcaption><i> Table View in Trace Explorer </i></figcaption>
</figure>
<br></br>


**Query Builder**

Just like Time Series View, the Query builder in Table view also helps in filtering, aggregation and grouping of your traces data. Refer to this [documentation](https://signoz.io/docs/userguide/query-builder/) to read more about the capabilities of the Query Builder.

<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/trace-explorer/trace-explorer-table-view-1.webp" alt="Query Builder in Table View"/>
    <figcaption><i> Query Builder in Table View </i></figcaption>
</figure>
<br></br>

**Table**

This provides you with a tabular representation of the output of Query made using the Query Builder.

<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/trace-explorer/trace-explorer-table-view-2.webp" alt="Table in Table View"/>
    <figcaption><i> Table in Table View </i></figcaption>
</figure>
<br></br>


## Bottom Bar
The bar present at the Bottom of each view in Traces Explorer has multiple helpful features.

<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/trace-explorer/trace-explorer-bottom-bar.webp" alt="Bottom Bar of Traces Explorer"/>
    <figcaption><i> Bottom Bar in Traces Explorer </i></figcaption>
</figure>
<br></br>

### Save View

At the Bottom of each View available in the Traces Explorer, we have an option to **Save this View** . What this does is, it saves the specific settings that you have applied for the particular View as a template which can be accessed later from the `Views Tab` available at the top or from `Select a View` dropdown. To know more details about Save View, please refer to this [documentation](https://signoz.io/docs/product-features/saved-view/).

<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/trace-explorer/trace-explorer-bottom-bar-save-view.webp" alt="Save view"/>
    <figcaption><i> Save view </i></figcaption>
</figure>
<br></br>


### Create an Alert 

Just next to Save this view, we have the **Create an Alert** button which can be used to instantly create a [Trace based Alert](https://signoz.io/docs/alerts-management/metrics-based-alerts/) according to the filters applied in our current view.

<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/trace-explorer/trace-explorer-bottom-bar-create-an-alert.gif" alt="Create an Alert"/>
    <figcaption><i> Create an Alert </i></figcaption>
</figure>
<br></br>

### Add to Dashboard

Next to Create an Alert, we have the **Add to Dashboard** button using which you can add the current panel to a New or any other existing dashboard.

<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/trace-explorer/trace-explorer-bottom-bar-add-to-dashboard.gif" alt="Add to Dashboard"/>
    <figcaption><i> Add to Dashboard </i></figcaption>
</figure>
<br></br>

