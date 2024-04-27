---
id: alerts-management
title: Alerts 
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

# Setting alerts in SigNoz  


## Setting Alert Rules

You can set Alert Rules in SigNoz in the following 3 ways:
1. Query Builder - This is DIY way to build alerts by selecting metrics from dropdowns. You can also set filter and group by conditions.
2. PromQL - You can use [Prometheus Query Language](https://prometheus.io/docs/prometheus/latest/querying/basics/) to write expressions for alerts which will be evaluated in regular time interval. If you have set up alerts in Prometheus, this method should be very familiar.
3. Clickhouse Queries - You can write clickhouse queries that adhere to the SigNoz data model and format. The result of the query will be used to evaluate alert threshold conditions. Additionally, you can also generate labels and annotations using the results of your query.


Navigate to Alerts page from the left panel. It has 2 tabs:

1. Alert Rules
2. Triggered Alerts

Alert Rules set the expression you want to evaluate to start firing alerts. The Alert Rules tab shows a list of currently configured alert rules and labels like `severity` and `Alert Name`. It also shows the current status of this Alert rules. If any alerts are `firing` because of this or everything is `Ok`

![alert-rules](../../static/img/docs/alert-rules.webp)


### Steps to Create Alert Rules:

To create new alert rules, you can click the `New Alert` button. This would open a pane with the type of alerts.

<img width="1101" alt="image" src="https://user-images.githubusercontent.com/10277894/208090898-2a05a349-c071-47e1-9dd3-d0a5de70f113.png" />


Choose an appropriate type of alert by clicking on one of the cards. 

On the alert form, you can choose one of the following tabs to define source of your metric. 

1. Query Builder
2. Clickhouse Query
3. PromQL (Available only for metrics)

> Note: Presently the logs, traces and exceptions-based alerts support only Clickhouse Query based metric. 

#### 1. Query Builder
In Query Builder, you can use the dropdowns in the dashboard to select the right metric. 
- Then create an expression with WHERE and GROUPBY clauses which represents the expression to evaluate for alerting
- Threshold which the value of expression should cross ( above or below) to trigger an alert.
- Evaluation period of the expression
- Set name, descriptions and tags about the alert to make it more informative

![alerts-query-builder](../../static/img/docs/alerts-query-builder.webp)


#### 2. PromQL

In PromQL, you can write the Prometheus expression to evaluate. 

- Set the expression you want to evaluate to trigger alerts. The expression also includes the evaluation interval.
- Threshold which the value of expression should cross ( above or below) to trigger an alert.
- Set labels like `severity` to communicate how severe the issue is if this alert starts firing

![prometheus-alert-rules](../../static/img/docs/promql-alerts.webp)


#### 3. Writing Clickhouse Queries in Alert form
On `clickhouse query` tab, you will be presented with a query editor with a default query that you can start working with. To learn more about the data-model and query format, read [this tutorial](https://signoz.io/docs/tutorial/writing-clickhouse-queries-in-dashboard/#building-alert-queries-with-clickhouse-data).  

<img width="835" alt="image" src="https://user-images.githubusercontent.com/10277894/208092689-07e7edd6-2277-4cd4-9fbf-a2e13531a4a9.png" />


You can use `Run Query` to confirm your query works. Include the bind variables and mandatory column aliases as mentioned [here](https://signoz.io/docs/tutorial/writing-clickhouse-queries-in-dashboard/#building-alert-queries-with-clickhouse-data). 

### Using result labels in alert description

You can use the result labels in the alert description to create more informative alerts using `{{.Labels.<label-name>}}`. For example, if you have a query that returns the label `service_name`, you can use it in the alert description as `{{.Labels.service_name}}` to create an alert that is specific to a particular service.

### Steps to Setup Triggered Alerts

Triggered alerts show the alerts which are in `firing` or `pending` state. 

Pending means that the rule threshold is crossed, but it is still waiting based on the specified time period. Once the specified time is passed, the alert starts firing.

It also has different tags like alert name, severity, since when the alert started firing, etc.

![triggered-alerts](../../static/img/docs/triggered-alerts.webp)

- Filtering and grouping Triggered alerts

You can also filter and group triggered alerts based on tags. The filtering field accepts multiple key-value pairs like `serverity:warning`

For grouping, you can use any of the tags like `severity`, `alertname` or any other label you would have specified in your alert rule. You can use the grouping feature to group the list of triggered alerts based on these tags.


![triggered-alerts-groups](../../static/img/docs/triggered-alerts-groups.webp)











