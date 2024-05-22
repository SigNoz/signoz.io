---
id: write-a-metrics-clickhouse-query
title: Writing a Metrics ClickHouse Query
---


# Table schema definitions & examples for metrics

There are two tables in the database. One is for storing the samples/metrics and the other is for storing the time series data. 

## Schema for samples table:

Note: the schemas are not final. We might change it in the future. 

```
CREATE TABLE signoz_metrics.distributed_samples_v2
(
    `metric_name` LowCardinality(String),
    `fingerprint` UInt64 CODEC(DoubleDelta, LZ4),
    `timestamp_ms` Int64 CODEC(DoubleDelta, LZ4),
    `value` Float64 CODEC(Gorilla, LZ4)
)
ENGINE = Distributed('cluster', 'signoz_metrics', 'samples_v2', cityHash64(metric_name, fingerprint))
```

Explanation of the columns:

- **metric_name**: Name of the metric
- **fingerprint**: Fingerprint of the metric. This is used to identify the metric uniquely. Currently, 
  we are using the hash of the labels to generate the fingerprint.
- **timestamp_ms**: Timestamp of the metric in milliseconds
- **value**: Value of the metric

### Example of a samples

```
┌─metric_name────────┬────────fingerprint─┬──timestamp_ms─┬─value─┐
│ signoz_calls_total │ 844117381117785689 │ 1698611461282 │ 25085 │
│ signoz_calls_total │ 844117381117785689 │ 1698611521282 │ 25140 │
│ signoz_calls_total │ 844117381117785689 │ 1698611581282 │ 25192 │
│ signoz_calls_total │ 844117381117785689 │ 1698611641282 │ 25248 │
│ signoz_calls_total │ 844117381117785689 │ 1698611701282 │ 25305 │
│ signoz_calls_total │ 844117381117785689 │ 1698611761282 │ 25361 │
│ signoz_calls_total │ 844117381117785689 │ 1698611821282 │ 25421 │
│ signoz_calls_total │ 844117381117785689 │ 1698611881282 │ 25475 │
│ signoz_calls_total │ 844117381117785689 │ 1698611941282 │ 25534 │
│ signoz_calls_total │ 844117381117785689 │ 1698612001282 │ 25588 │
└────────────────────┴────────────────────┴───────────────┴───────┘
```

## Schema for time series table:

```
CREATE TABLE signoz_metrics.distributed_time_series_v2
(
    `metric_name` LowCardinality(String),
    `fingerprint` UInt64 CODEC(DoubleDelta, LZ4),
    `timestamp_ms` Int64 CODEC(DoubleDelta, LZ4),
    `labels` String CODEC(ZSTD(5)),
    `temporality` LowCardinality(String) DEFAULT 'Unspecified' CODEC(ZSTD(5))
)
ENGINE = Distributed('cluster', 'signoz_metrics', 'time_series_v2', cityHash64(metric_name, fingerprint))
```

Explanation of the columns:

- **metric_name**: Name of the metric
- **fingerprint**: Fingerprint of the metric. This is used to identify the metric uniquely. Currently, 
  we are using the hash of the labels to generate the fingerprint.
- **timestamp_ms**: Timestamp of the metric when it was observed for the first time in milliseconds
- **labels**: Labels of the metric; Stored as a JSON string
- **temporality**: Temporality of the metric. This is used to identify the type of the metric. It can 
  be one of the following values:
  - Unspecified: This is the default value. 
  - Cumulative: This is used for monotonic counters.
  - Delta: This is used for non-monotonic counters.

### Example of a time series

```
┌─metric_name────────┬────────fingerprint─┬──timestamp_ms─┬─labels─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬─temporality─┐
│ signoz_calls_total │ 844117381117785689 │ 1698584462214 │ {"__name__":"signoz_calls_total","__temporality__":"Cumulative","deployment_environment":"default","operation":"/driver.DriverService/FindNearest","resource_signoz_collector_id":"1e183921-3de2-4afe-9729-78db8f2b65b5","service_name":"driver","service_namespace":"default","signoz_collector_id":"1e183921-3de2-4afe-9729-78db8f2b65b5","span_kind":"SPAN_KIND_SERVER","status_code":"STATUS_CODE_UNSET"} │ Cumulative  │
└────────────────────┴────────────────────┴───────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴─────────────┘
```

## Querying the metrics

Querying the metrics is done in two steps. First, we query the time series table to get the fingerprints and labels of the metrics. Then, we use the fingerprints to query the samples table to get the actual samples. This is done to reduce the amount of data that needs to be scanned from the samples table. Also, the time series table is much smaller than the samples table. 

We use the JOIN operation to join the two tables. The JOIN operation is done on the metric_name and fingerprint columns. The JOIN operation is done on the cluster level. This means that the JOIN operation is done on the data nodes and not on the aggregator nodes. This is done to reduce the amount of data that needs to be transferred between the nodes. This works because the data is sharded based on the metric_name and fingerprint columns hence all the data for a particular metric and fingerprint will be present on the same node.

Note: The following queries use `GROUPING SETS` to get the data for the overall metric. This is used when the limit is applied to the query. Please refer to the [ClickHouse documentation](https://clickhouse.com/docs/en/sql-reference/statements/select/group-by#grouping-sets-modifier) for more information on `GROUPING SETS`.

Note: The queries should have a result column with the name `value` and a column with type [DateTime](https://clickhouse.com/docs/en/sql-reference/data-types/datetime) for the graphs to work.

### Example queries

#### Retrieving the fingerprints and labels of the metric

```sql
SELECT
    fingerprint,
    labels
FROM signoz_metrics.distributed_time_series_v2
WHERE (metric_name = 'signoz_calls_total') AND (temporality = 'Cumulative')
LIMIT 10
```

#### Retrieving the samples of the metric

```sql
SELECT
    timestamp_ms,
    value
FROM signoz_metrics.distributed_samples_v2
WHERE metric_name = 'signoz_calls_total'
LIMIT 10
```

#### Retrieving the label values of a metric

```sql
SELECT DISTINCT
    fingerprint,
    JSONExtractString(labels, 'service_name') AS service_name
FROM signoz_metrics.distributed_time_series_v2
WHERE (metric_name = 'signoz_calls_total') AND (temporality = 'Cumulative')
LIMIT 10
```

### Example queries for the frontend service RED metrics

Note: The following queries can be modified to get the metrics for each service by adding grouping by the service name.

The following queries are used to generate the graphs for the frontend service RED metrics. The innermost join is used to get the raw samples joined with the time series table. Then, we use the runningDifference function to get the rate of change of the samples. Then, we use the outermost query to get the sum of the rate of change of the samples. 

#### Request rate for a service

```sql
SELECT
    ts,
    sum(value) AS value
FROM
(
    SELECT
        ts,
        if(runningDifference(ts) <= 0, nan, if(runningDifference(value) < 0, value / runningDifference(ts), runningDifference(value) / runningDifference(ts))) AS value
    FROM
    (
        SELECT
            fingerprint,
            toStartOfInterval(toDateTime(intDiv(timestamp_ms, 1000)), toIntervalSecond(60)) AS ts,
            max(value) AS value
        FROM signoz_metrics.distributed_samples_v2
        INNER JOIN
        (
            SELECT fingerprint
            FROM signoz_metrics.time_series_v2
            WHERE (metric_name = 'signoz_latency_count') AND (temporality IN ['Cumulative', 'Unspecified']) AND (JSONExtractString(labels, 'service_name') IN ['frontend']) AND (JSONExtractString(labels, 'operation') IN ['HTTP GET /dispatch'])
        ) AS filtered_time_series USING (fingerprint)
        WHERE (metric_name = 'signoz_latency_count') AND (timestamp_ms >= {{.start_timestamp_ms}}) AND (timestamp_ms <= {{.end_timestamp_ms}})
        GROUP BY
            fingerprint,
            ts
        ORDER BY
            fingerprint ASC,
            ts ASC
    )
    WHERE isNaN(value) = 0
)
GROUP BY
    GROUPING SETS (
        (ts),
        ())
ORDER BY ts ASC
```

#### Error rate for a service

This is the query for the error rate for a service. The query is similar to the request rate query. The only difference is that we are filtering the samples based on the status code. Then, we divide the error samples by the total samples to get the error rate.

```sql
SELECT
    A.ts AS ts,
    (A.value * 100) / B.value AS value
FROM
(
    SELECT
        ts,
        sum(value) AS value
    FROM
    (
        SELECT
            ts,
            if(runningDifference(ts) <= 0, nan, if(runningDifference(value) < 0, value / runningDifference(ts), runningDifference(value) / runningDifference(ts))) AS value
        FROM
        (
            SELECT
                fingerprint,
                toStartOfInterval(toDateTime(intDiv(timestamp_ms, 1000)), toIntervalSecond(60)) AS ts,
                max(value) AS value
            FROM signoz_metrics.distributed_samples_v2
            INNER JOIN
            (
                SELECT fingerprint
                FROM signoz_metrics.time_series_v2
                WHERE (metric_name = 'signoz_calls_total') AND (temporality IN ['Cumulative', 'Unspecified']) AND (JSONExtractString(labels, 'service_name') IN ['redis']) AND (JSONExtractString(labels, 'status_code') IN ['STATUS_CODE_ERROR'])
            ) AS filtered_time_series USING (fingerprint)
            WHERE (metric_name = 'signoz_calls_total') AND (timestamp_ms >= {{.start_timestamp_ms}}) AND (timestamp_ms <= {{.end_timestamp_ms}})
            GROUP BY
                fingerprint,
                ts
            ORDER BY
                fingerprint ASC,
                ts ASC
        )
        WHERE isNaN(value) = 0
    )
    GROUP BY
        GROUPING SETS (
            (ts),
            ())
    ORDER BY ts ASC
) AS A
INNER JOIN
(
    SELECT
        ts,
        sum(value) AS value
    FROM
    (
        SELECT
            ts,
            if(runningDifference(ts) <= 0, nan, if(runningDifference(value) < 0, value / runningDifference(ts), runningDifference(value) / runningDifference(ts))) AS value
        FROM
        (
            SELECT
                fingerprint,
                toStartOfInterval(toDateTime(intDiv(timestamp_ms, 1000)), toIntervalSecond(60)) AS ts,
                max(value) AS value
            FROM signoz_metrics.distributed_samples_v2
            INNER JOIN
            (
                SELECT fingerprint
                FROM signoz_metrics.time_series_v2
                WHERE (metric_name = 'signoz_calls_total') AND (temporality IN ['Cumulative', 'Unspecified']) AND (JSONExtractString(labels, 'service_name') IN ['redis'])
            ) AS filtered_time_series USING (fingerprint)
            WHERE (metric_name = 'signoz_calls_total') AND (timestamp_ms >= {{.start_timestamp_ms}}) AND (timestamp_ms <= {{.end_timestamp_ms}})
            GROUP BY
                fingerprint,
                ts
            ORDER BY
                fingerprint ASC,
                ts ASC
        )
        WHERE isNaN(value) = 0
    )
    GROUP BY
        GROUPING SETS (
            (ts),
            ())
    ORDER BY ts ASC
) AS B ON A.ts = B.ts
```

#### 99th percentile latency for a service

This is the query for the 99th percentile latency for a service. The query is similar to the request rate query. We are using the histogramQuantile function to get the 99th percentile latency. The histogramQuantile function is used to get the quantile value from a histogram. The histogram is represented as two arrays. One array contains the buckets and the other array contains the values. The histogramQuantile function takes the two arrays and the quantile value as input and returns the quantile value. The bucket bounds and values are obtained by taking the rate of change for each bucket.

```sql
SELECT
    ts,
    histogramQuantile(arrayMap(x -> toFloat64(x), groupArray(le)), groupArray(value), 0.99) AS value
FROM
(
    SELECT
        le,
        ts,
        sum(value) AS value
    FROM
    (
        SELECT
            le,
            ts,
            if(runningDifference(ts) <= 0, nan, if(runningDifference(value) < 0, value / runningDifference(ts), runningDifference(value) / runningDifference(ts))) AS value
        FROM
        (
            SELECT
                fingerprint,
                le,
                toStartOfInterval(toDateTime(intDiv(timestamp_ms, 1000)), toIntervalSecond(60)) AS ts,
                max(value) AS value
            FROM signoz_metrics.distributed_samples_v2
            INNER JOIN
            (
                SELECT
                    JSONExtractString(labels, 'le') AS le,
                    fingerprint
                FROM signoz_metrics.time_series_v2
                WHERE (metric_name = 'signoz_latency_bucket') AND (temporality IN ['Cumulative', 'Unspecified']) AND (JSONExtractString(labels, 'service_name') = 'frontend')
            ) AS filtered_time_series USING (fingerprint)
            WHERE (metric_name = 'signoz_latency_bucket') AND (timestamp_ms >= {{.start_timestamp_ms}}) AND (timestamp_ms <= {{.end_timestamp_ms}})
            GROUP BY
                fingerprint,
                le,
                ts
            ORDER BY
                fingerprint ASC,
                le ASC,
                ts ASC
        )
        WHERE isNaN(value) = 0
    )
    GROUP BY
        GROUPING SETS (
            (le, ts),
            (le))
    HAVING isNaN(value) = 0
    ORDER BY
        le ASC,
        ts ASC
)
GROUP BY ts
ORDER BY ts ASC
```

## Using variables in queries

SigNoz supports using variables in queries. This allows you to create a single dashboard for multiple services. For example, you can create a dashboard for the request rate for all the services. Then, you can use the service name as a variable in the query to get the request rate for a particular service. Please refer to the [Variables](/docs/userguide/manage-variables) section for more information on how to create variables.

### Example queries using variables

#### Request rate for a service

The variable `{{.service_name}}` is used to get the service name from the variable. The variable is replaced with the service name when the query is executed.

```sql
SELECT
    ts,
    sum(value) AS value
FROM
(
    SELECT
        ts,
        if(runningDifference(ts) <= 0, nan, if(runningDifference(value) < 0, value / runningDifference(ts), runningDifference(value) / runningDifference(ts))) AS value
    FROM
    (
        SELECT
            fingerprint,
            toStartOfInterval(toDateTime(intDiv(timestamp_ms, 1000)), toIntervalSecond(60)) AS ts,
            max(value) AS value
        FROM signoz_metrics.distributed_samples_v2
        INNER JOIN
        (
            SELECT fingerprint
            FROM signoz_metrics.time_series_v2
            WHERE (metric_name = 'signoz_latency_count') AND (temporality IN ['Cumulative', 'Unspecified']) AND (JSONExtractString(labels, 'service_name') IN {{.service_name}}) AND (JSONExtractString(labels, 'operation') IN ['HTTP GET /dispatch'])
        ) AS filtered_time_series USING (fingerprint)
        WHERE (metric_name = 'signoz_latency_count') AND (timestamp_ms >= {{.start_timestamp_ms}}) AND (timestamp_ms <= {{.end_timestamp_ms}})
        GROUP BY
            fingerprint,
            ts
        ORDER BY
            fingerprint ASC,
            ts ASC
    )
    WHERE isNaN(value) = 0
)
GROUP BY
    GROUPING SETS (
        (ts),
        ())
ORDER BY ts ASC
```

## Using the default variables

The following variables are available by default:

- `{{.start_timestamp_ms}}` - This is the start time of the query in milliseconds
- `{{.end_timestamp_ms}}` - This is the end time of the query in milliseconds
