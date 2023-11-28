---
id: query-builder
title: Query Builder
sidebar_label: Query Builder
---

## Introduction

Logs and Trace Explorer will help you write complex queries on your logs and trace data using an intuitive user interface. At top-level the explorer pages let you filter data based on certain attributes, apply aggregate operations, and group your results by attributes like service name, container ID, trace ID, span ID etc.

Once you create your query, you can click on `Run Query` to see your results. You can select the time range filter in the top-right corner to select the duration for which you want to see the data for.

<figure data-zoomable align='center'>
    <img src="/img/docs/query-builder/query_builder_hero.webp" alt="Query Builder"/>
    <figcaption>Logs Query Builder in logs explorer tab. Click on 'Run Query' to see data in the specified time range.</figcaption>
</figure>

<br></br>

You can then visualize your data using different views. Let's see what different components of the query builder can help you achieve.

### Filter

The `filter` input lets you filter your data based on certain attributes. You can apply multiple filters and then use operators like `=`, `!=`, `IN`, `NOT_IN`, `CONTAINS`, `NOT_CONTAINS`. It allows you to have single-select and multi-select filter options. Using this you can filter the logs or traces of any specific component in your application.

<figure data-zoomable align='center'>
    <img src="/img/docs/query-builder/filter_field.webp" alt="Filter field"/>
    <figcaption>Filter field in Trace Query Builder</figcaption>
</figure>

<br></br>

### Aggregation options

Once you have your data filtered out, you can apply aggregate options like `Count`, `Sum`, `Avg`, `p90`, `p95`, `p99`, etc. You need to choose an aggregate attribute to aggregate your data on. You can use this field to do things like finding latency of a service or multiple services. 

<figure data-zoomable align='center'>
    <img src="/img/docs/query-builder/aggregate_field.webp" alt="Aggregate field"/>
    <figcaption>Apply aggregate operations on your filtered data</figcaption>
</figure>

<br></br>

### Group By

The `Group By` field lets you to group your results by any specified attribute. You can use this field to create time-series charts showing data grouped by your selected attributes. For example, you can filter out your services, and use the `Group By` field to plot a chart showing p99 latency of different services.

<figure data-zoomable align='center'>
    <img src="/img/docs/query-builder/group_by_field.webp" alt="Group By field"/>
    <figcaption> Group your results by any specified attribute</figcaption>
</figure>

<br></br>


### Order By, Limit, Having, and Aggregation Intervals

You can use the above fields to add more conditions to your results. 

`Order By` - lets you order your results based on timestamps, or any input data that can be ordered.

`Limit` - coming soon.

`Having` - if you want to filter out your results based on conditions like count operations larger than a specified number you can use this field.

`Aggregate Every` - This is fixed at 60s currently. More options are coming soon.

<figure data-zoomable align='center'>
    <img src="/img/docs/query-builder/add_conditions.webp" alt="Add Conditions"/>
</figure>

<br></br>


## Logs Visualization Panels

### List View

List View can show logs data in three different formats - raw, default, and column view. You can also customize things like max lines per row and columns.

<figure data-zoomable align='center'>
    <img src="/img/docs/query-builder/list_view_logs.webp" alt="List View in Logs"/>
    <figcaption>List View in Logs</figcaption>
</figure>

<br></br>


### Time Series

The time-series tab helps you visualize your logs data in form of charts. You can then add this chart as a panel into any of your existing or new dashboard.


## Trace Visualization Panels

### List View

List view shows trace data in a simple tabular format with options for customizing columns. 

<figure data-zoomable align='center'>
    <img src="/img/docs/query-builder/list-view-traces.webp" alt="Customize columns in list view"/>
    <figcaption>Customize columns in List View of Trace Explorer</figcaption>
</figure>

<br></br>

### Traces

The traces tab shows you a list of root spans and the number of spans it has. A root span is a span that does not have a parent span. You can click on the `Trace ID` to see the detailed flamegraph and gantt chart of the particular root span.

<figure data-zoomable align='center'>
    <img src="/img/docs/query-builder/trace-view.webp" alt="Trace view in Trace explorer"/>
    <figcaption>Trace view showing root spans and linked Trace ID</figcaption>
</figure>

<br></br>

### Time Series

The time series tab helps you visualize your trace data in form of charts. You can then add this chart as a panel into any of your existing or new dashboard.

<figure data-zoomable align='center'>
    <img src="/img/docs/query-builder/time-series-traces.webp" alt="Time series in Trace Explorer"/>
    <figcaption>Time series in Trace Explorer</figcaption>
</figure>

<br></br>

## Adding charts as Panels to Dashboards

You can export your charts from logs and trace explorer as a panel to a any of your existing dashboard. You can also export the chart as a panel in a new dashboard.

Step 1. Click on `Add to Dashboard`

<figure data-zoomable align='center'>
    <img src="/img/docs/query-builder/add-to-dashboards.webp" alt="Add to dashboards"/>
</figure>

<br></br>

Step 2. Choose any dashboard from the list of dashboard, or click on `New Dashboard`.

<figure data-zoomable align='center'>
    <img src="/img/docs/query-builder/export_panel.webp" alt="Export Panel"/>
</figure>

Step 3. Click on `Export`. Once you have clicked on `Export`, you can set things like panel title, description, y-axis units, etc.

<figure data-zoomable align='center'>
    <img src="/img/docs/query-builder/add-panel-to-dashboard.webp" alt="Add panel to dashboard"/>
</figure>

## Setup Alerts

You can also set up alerts by clicking on `Setup Alerts`. It will take you to the alerts query builder with your selected options in place.

<figure data-zoomable align='center'>
    <img src="/img/docs/query-builder/setup-alerts.webp" alt="Set up Alerts"/>
</figure>




