---
id: query-builder
title: Query Builder
sidebar_label: Query Builder
---

<!-- ## Introduction

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



 -->

## Introduction

Query Builder in SigNoz simplifies the process of filtering, aggregating, and visualizing data, making complex queries accessible to all users.
<!-- Make a better Introduction -->

## Logs and Traces Query Builder

## Filtering 

The Query Builder in SigNoz allows users to apply filtering based on various attributes of logs or traces.

### Using the Filtering Feature

- **Access**: Navigate to the Query Builder within SigNoz logs and traces explorer.
- **Open Filter Options**: Click on the Search Filter field to open a dropdown list of available attributes.
- **Select Attributes**: Choose the attribute you want to filter by (e.g., `service.name`, `level`, `status`).
- **Apply Operators**: Choose the operator (e.g., `=`, `!=`, `IN`, `NOT_IN`) for the selected attribute.
- **Input Values**: Input the value(s) you want to filter by.
- **Combine Filters**: You can add multiple filters by repeating the above steps.
- **View Results**: Click the Stage & Run Query Button to display the logs or traces that match the applied filters.

### Example

Suppose you want to filter logs where the `service.name` is `UserAuth`, the level is `error`, and the `status` code is `500`. The filter setup would look like this:


`service.name = UserAuth`  `level = error`  `status = 500`


## Aggregation and Grouping 

The Query Builder's Aggregation and Grouping feature enables you to combine data points and categorize them for complex insights.

### Aggregation

Aggregation allows you to perform calculations on a set of values to return a single value. With the Query Builder, you can:

- **Count**: Tally the number of times a particular event occurs.
- **Count Distinct**: Count unique occurrences of a specified attribute.
- **Sum**: Calculate the total for a numerical attribute.
- **Avg**: Find the average value of a numerical attribute.
- **Max/Min**: Determine the maximum or minimum value of a numerical attribute.
- **Percentiles (P05, P10, P90, etc.)**: Understand the distribution of your data with percentile calculations.
- **Rate**: Measure the frequency of occurrence within a given time frame.
- **Rate Sum**: Total the aggregated values over the specified rate period.
- **Rate Avg**: Find the average rate over the period.
- **Rate Min/Max**: Determine the minimum or maximum rate observed in the selected period.

### Grouping

Grouping allows you to segment your data based on chosen attributes, facilitating comparative analysis across different categories of the selected attributes:

- You can group data by attributes like `service.name` or `method` to analyze patterns per service or HTTP method.
- When combined with aggregation, grouping enables you to, for example, find the average response time per service or count errors per endpoint.

### Using Aggregation and Grouping Together

- Select an aggregation function from the dropdown, such as `Avg`.
- Then, choose an attribute to apply it to, like `response_time`.
- To group the data, you would then specify an attribute in the `Group by` field.
- After running the query, you'll see the average response times for each group, allowing you to identify areas that may need optimization.

<!-- ### Example

To monitor the stability of various services, you could set up a count aggregation for `error_code` to see how many errors each service is producing. Here's how you would set it up:

- In the aggregation dropdown, select `Count`.
- In the aggregate attribute field, choose `error_code`.
- To segment the error counts by service, input `service.name` in the `Group by` field.

After running this query, the Query Builder will display a count of errors grouped by each service. This aggregation helps in quickly identifying which services are generating the most errors and may require attention. -->

### Example

To examine the frequency of HTTP responses across different service endpoints, you can configure a `Count` aggregation on `status` codes to determine the occurrence of various HTTP responses (like `200`, `404`, `500`, etc.). Here's the setup:

- In the aggregation dropdown, select `Count`.
- For the attribute to aggregate, choose `status`.
- To see the status code distribution for each type of HTTP method, enter `method` in the `Group by` field.

After running this query, the Query Builder will display a count of each HTTP status code for every HTTP method. This analysis can be crucial for understanding how different methods respond, which could help in troubleshooting and service optimization.

## Result Manipulation 

Result Manipulation is a set of features in the Query Builder that enables you to refine your query. The features include:

### Order By
Order your query results based on a specified attribute in either ascending or descending order. This can help in identifying the highest or lowest values in your data, such as the most frequently occurring errors.

### Aggregate Every
Define the interval over which to aggregate data. For example, you can aggregate count data in 60-second intervals to get a per-minute count of events.

### Limit
Set a limit on the number of results returned. This is useful when you only want to see the top N results, such as the top 10 most visited endpoints.

### HAVING
Apply conditions to filter the results further based on aggregate value.

### Legend Format
Customize the legend in your query's visual output to give more clarity, by formatting how grouped data will be labeled in your charts or graphs.

### Example

Suppose you want to identify the top 5 endpoints that are most frequently returning `404 - Not Found` errors over the last 24 hours. You would configure the query as follows:

- **Filter**: `status = 404`
- **Group by**: `endpoint`
- **Aggregate**: `Count` on `status` 
- **HAVING**: `Count(status) > 5` to filter out endpoints with fewer than 5 occurrences
- **Order by**: `Count(status) DESC` to prioritize endpoints with the highest count
- **Limit**: `5` to focus on the top 5 endpoints (Note: This won't work for timeseries view)
- **Legend Format**: You could format the legend to show `{{endpoint}} - {{status}} errors`, providing a clear and descriptive label.

<!-- When this query runs, the Query Builder will generate a histogram with a legend formatted as per your specifications, showing a concise list of the top 5 endpoints with their respective `404` error counts, aiding in swift identification and resolution of the issues.

Upon executing this query, the Query Builder will not only produce a histogram but also a corresponding time series visualization, each delineating the count of `404` errors across your specified endpoints. This dual representation allows for both an at-a-glance summary and a detailed trend analysis over time. -->


## Multiple Queries and Functions 

The SigNoz Query Builder allows you to run multiple queries simultaneously and perform functions on the results. This feature facilitates analysis of complex data, such as comparing data or calculating ratios.

### Multiple Queries
Create and run multiple independent queries within the same view. Each query can have its own set of filters, aggregations, and groupings. This is particularly useful for analyzing different dimensions of your data in parallel.

### Functions on Queries
Apply mathematical functions to the results of your queries. This allows you to derive new insights by performing operations like addition, subtraction, multiplication, division, or more complex functions on your data.

### Example

Consider a scenario where you want to compare the number of GET requests to POST requests over the same time period:

- **Query A**: Set filters to count `method = GET`.
- **Query B**: Configure filters to count `method = POST`.
- With both queries configured, you can create a function, `F1`, that divides the results of Query A by Query B to find the ratio of GET to POST requests.
- **Legend Format**: Customize as `GET divided by POST` to make the output more understandable.

After executing these queries and the function, the Query Builder will generate visualizations like histograms or time series charts for each query and the computed function `F1`, providing a comparative analysis of the request methods.


## Histogram and Time Series Visualizations 

SigNoz's Query Builder offers powerful visualization options for your data. The Histogram and Time Series visualizations transform numerical and time-based data into graphical representations, making trends and patterns readily apparent.

### Histogram Visualization
A histogram is a bar chart that represents the distribution of numerical data. Each bar groups numbers into ranges, showing the number of occurrences of data points within each range.

- Useful for understanding the frequency distribution of data points.
- Ideal for identifying common values or ranges with high concentrations of data.

### Time Series Visualization
The time series chart plots data points over time, allowing you to observe changes and trends related to temporal factors.

- Provides insights into data patterns over specified time intervals.
- Enables you to track the progression or decline of metrics, such as system performance.

### Example

When analyzing the number of user sign-ups over a day, you might:

- Configure the Query Builder to count the `user_sign_up` events.
- Use the Histogram view to see the distribution of sign-ups across different times of the day.
- Use the Time Series view to observe how sign-up rates trend over each hour.

