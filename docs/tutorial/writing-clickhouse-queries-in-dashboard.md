---
id: writing-clickhouse-queries-in-dashboard
title: ClickHouse queries for building dashboards and alerts
description: Example clickhouse queries to run analytics on observability data
---

SigNoz gives you ability to write powerful clickhouse queries to plot charts. You can run SQL queries supported by ClickHouse to extract immense value out of your distributed tracing data or logs data. 

:::info
The distributed tables in clickhouse have been named by prefixing `distributed_` to existing single shard table names. If you want to use clickhouse queries in dashboard or alerts, you should use the distributed table names. Eg, `signoz_index_v2` now corresponds to the table of a single shard. To query all the shards, query against `distributed_signoz_index_v2`. 
:::


Sharing a few examples of some queries which might be helpful in building dashboards.

### GroupBy a tag/attribute in distributed tracing data

```sql
SELECT toStartOfInterval(timestamp, INTERVAL 1 MINUTE) AS interval, 
tagMap['peer.service'] AS op_name, 
toFloat64(avg(durationNano)) AS value 
FROM signoz_traces.signoz_index_v2  
WHERE tagMap['peer.service']!='' 
AND timestamp > now() - INTERVAL 30 MINUTE  
GROUP BY (op_name, interval) order by (op_name, interval) ASC;
```

### Show count of each `customer_id` which is present as attribute of a span event

```sql
WITH arrayFilter(x -> JSONExtractString(x, 'name')='Getting customer', events) AS filteredEvents
SELECT toStartOfInterval(timestamp, INTERVAL 1 MINUTE) AS interval, toFloat64(count()) AS count, 
arrayJoin(arrayMap(x -> JSONExtractString(JSONExtractString(x, 'attributeMap'), 'customer_id'), filteredEvents)) AS resultArray 
FROM signoz_traces.signoz_index_v2 
WHERE not empty(filteredEvents) 
AND timestamp > toUnixTimestamp(now() - INTERVAL 30 MINUTE) 
GROUP BY (resultArray, interval) order by (resultArray, interval) ASC;
```


### Show sum of values  of `customer_id` which is present as attribute of a span event

```sql
WITH arrayFilter(x -> JSONExtractString(x, 'name')='Getting customer', events) AS filteredEvents
SELECT toStartOfInterval(timestamp, INTERVAL 1 MINUTE) AS interval, toFloat64(sum(toInt32(resultArray))) AS sum, 
arrayJoin(arrayMap(x -> JSONExtractString(JSONExtractString(x, 'attributeMap'), 'customer_id'), filteredEvents)) AS resultArray 
FROM signoz_traces.signoz_index_v2 
WHERE not empty(filteredEvents) and timestamp > toUnixTimestamp(now() - INTERVAL 30 MINUTE) 
GROUP BY (resultArray, interval) order by (resultArray, interval) ASC;
```


### Plotting a chart on `100ms` interval

Plot a chart of 1 minute showing count of spans in `100ms` interval of service `frontend` with duration > 50ms

```sql
SELECT fromUnixTimestamp64Milli(intDiv( toUnixTimestamp64Milli ( timestamp ), 100) * 100) AS interval, 
toFloat64(count()) AS count 
FROM (
 SELECT timestamp 
 FROM signoz_traces.signoz_index_v2 
 WHERE serviceName='frontend' 
 AND durationNano>=50*exp10(6) 
 AND timestamp > now() - INTERVAL 1 MINUTE) GROUP BY interval 
 ORDER BY interval ASC;
```

### Show count of loglines per minute

```sql
SELECT toStartOfInterval(fromUnixTimestamp64Nano(timestamp), INTERVAL 1 MINUTE) AS interval, 
toFloat64(count()) AS value 
FROM signoz_logs.logs  
WHERE timestamp > toUnixTimestamp64Nano(now64() - INTERVAL 30 MINUTE)  
GROUP BY interval 
ORDER BY interval ASC;
```

## Building Alert Queries with Clickhouse data

The most common use case for alerts is to send notifications when a threshold condition is met. For example, conditions like CPU usage exceeds 70% (CPU Usage > 70) or failures in a service exceed your expections  (service error count > 10).  

Every alert is composed of a threshold, date range (e.g. last 5 mins) and match condition (e.g. at least once).  The rule engine is responsible for evaluating these conditions and triggering notifications. SigNoz allows you a complete flexibility in choosing all three conditions to meet your business requirements. 

The evaluation is also based on the source or metric data, the left-hand side of the threshold condition - consider CPU Usage (LHS) > 70 (RHS).    

The query editor (`clickhouse` tab in the `alert form`) allows you define a query to fetch the metric (source) data from Clickhouse and evaluate if the threshold condition occurs in it.  The query format requires use of following reserved columns and parameters which simplify the syntax and support dynamic parts.

**Reserved Aliases (for use in SELECT, GROUP BY only) **: `value`, `res`, `result`, `interval` 

**Reserved Parameters (for use in WHERE condition only)**: 

- `{{.start_datetime}}` `{{.end_datetime}}` 
- `{{.start_timestamp}}` `{{.end_timestamp}}`
- `{{.start_timestamp_ms}}` `{{.end_timestamp_ms}}`
- `{{.start_timestamp_nano}}` `{{.end_timestamp_nano}}`


Let's explore sample queries to use clickhouse data in alert evaluation. 

The rule engine is always looking for special column aliases. When the query returns data, the rule engine looks into the result for a column with alias `value` or `result` and compares the vector of all those values with the threshold (defined in alert form).   

For example, the following query retrieves `not found` errors of a service. When this query returns data, the rule engine will compare `value` from each row with the threshold set in alert form. 

```sql
SELECT count() AS value  
FROM signoz_traces.signoz_error_index_v2 
WHERE (serviceName='api-service’) 
AND (exceptionType='Not found’);
```

If the same query is written without the column alias `value` or `result`, the rule engine will ignore the metric and fail to arrive at a threshold match.  

Second reserved column alias is `interval`.  It is useful when you want to apply threshold check over n time intervals.

```sql
SELECT count() AS value, toStartOfInterval(timestamp, INTERVAL 5 MINUTE) AS interval 
FROM signoz_traces.signoz_error_index_v2 
WHERE (serviceName = 'api-service') 
AND (exceptionType = 'Not found') 
GROUP BY interval
```

The rule engine is also capable of dynamically applying date ranges to your select query.  When you choose `last 15 mins` option in the alert conditions section, the rule engine applies timestamp values in the timeframe condition below.   

```sql
SELECT count() AS value, toStartOfInterval(timestamp, INTERVAL 5 MINUTE) AS interval 
FROM signoz_traces.signoz_error_index_v2 
WHERE timestamp BETWEEN {{.start_datetime}} AND {{.end_datetime}} 
AND (serviceName = 'api-service') 
AND (exceptionType = 'Not found') 
GROUP BY interval
```

The reserved bind variables {{.start_datetime}} and {{.end_datetime}} would allow rule engine to dynamically include date range query when the alert query runs.  





 


