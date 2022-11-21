---
id: writing-clickhouse-queries-in-dashboard
title: ClickHouse queries for building dashboards
description: Example clickhouse queries to run analytics on observability data
---

SigNoz gives you ability to write powerful clickhouse queries to plot charts. You can run SQL queries supported by ClickHouse to extract immense value out of your distributed tracing data or logs data. 

Sharing a few examples of some queries which might be helpful in building dashboards.

### GroupBy a tag/attribute in distributed tracing data

```json
select toStartOfInterval(timestamp, INTERVAL 1 MINUTE) AS interval, tagMap['peer.service'] as op_name, toFloat64(avg(durationNano)) as value from signoz_traces.signoz_index_v2  where tagMap['peer.service']!='' and timestamp > now() - INTERVAL 30 MINUTE  group by (op_name, interval) order by (op_name, interval) asc;
```

### Show count of each `customer_id` which is present as attribute of a span event

```json
WITH arrayFilter(x -> JSONExtractString(x, 'name')='Getting customer', events) as filteredEvents
select toStartOfInterval(timestamp, INTERVAL 1 MINUTE) AS interval, toFloat64(count()) as count, arrayJoin(arrayMap(x -> JSONExtractString(JSONExtractString(x, 'attributeMap'), 'customer_id'), filteredEvents)) as resultArray from signoz_traces.signoz_index_v2 where  not empty(filteredEvents) and timestamp > toUnixTimestamp(now() - INTERVAL 30 MINUTE) group by (resultArray, interval) order by (resultArray, interval) asc;
```


### Show sum of values  of `customer_id` which is present as attribute of a span event

```json
WITH arrayFilter(x -> JSONExtractString(x, 'name')='Getting customer', events) as filteredEvents
select toStartOfInterval(timestamp, INTERVAL 1 MINUTE) AS interval, toFloat64(sum(toInt32(resultArray))) as sum, arrayJoin(arrayMap(x -> JSONExtractString(JSONExtractString(x, 'attributeMap'), 'customer_id'), filteredEvents)) as resultArray from signoz_traces.signoz_index_v2 where  not empty(filteredEvents) and timestamp > toUnixTimestamp(now() - INTERVAL 30 MINUTE) group by (resultArray, interval) order by (resultArray, interval) asc;
```


### Plotting a chart on `100ms` interval

Plot a chart of 1 minute showing count of spans in `100ms` interval of service `frontend` with duration > 50ms

```json
select fromUnixTimestamp64Milli(intDiv( toUnixTimestamp64Milli ( timestamp ), 100) * 100) AS interval, toFloat64(count()) as count from (select timestamp from signoz_traces.signoz_index_v2 where serviceName='frontend' and durationNano>=50*exp10(6) and timestamp > now() - INTERVAL 1 MINUTE) group by interval order by interval asc;
```

### Show count of loglines per minute

```json
select toStartOfInterval(fromUnixTimestamp64Nano(timestamp), INTERVAL 1 MINUTE) AS interval, toFloat64(count()) as value from signoz_logs.logs  where timestamp > toUnixTimestamp64Nano(now64() - INTERVAL 30 MINUTE)  group by interval order by interval asc;
```