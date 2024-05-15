---
title: What is High Cardinality Data?
slug: high-cardinality-data
date: 2023-07-09
tags: [Opentelemetry, observability]
authors: [nicamellifera]
description: Defining what High Cardinality Data is and isn't, with some examples.
image: /img/blog/2023/06/high_cardinality_cover-min.jpg
hide_table_of_contents: false
keywords:
  - observability
  - opentelemetry
  - high cardinality
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/high-cardinality-data/"/>
</head>

While reading a GitHub issue on the OpenTelemetry Collector about trying to send [two versions of a metric](https://github.com/open-telemetry/opentelemetry-collector/discussions/5308), one with higher and one with lower cardinality, it occurred to me that we’ve never written on this blog about what _is_ high-cardinality data exactly and how it matters to your OpenTelemetry observability.

<!--truncate-->

![Cover Image](/img/blog/2023/06/high_cardinality_cover.webp)

High-cardinality data refers to a dataset or data attribute that contains a large number of distinct values relative to the total number of data points. In other words, it refers to data with a large number of unique or distinct entries compared to the overall size of the dataset.

## What makes High Cardinality Data?

1. **Uniqueness of values:** <br></br>
   High-cardinality data exhibits a wide variety of unique values. Each value occurs relatively infrequently compared to the total number of data points. For example, if you have a dataset of user logs, a high-cardinality attribute could be the IP address, where each IP address is unique or occurs with low frequency.

2. **Granularity and dimensionality:**<br></br>
   High-cardinality data often represents attributes or dimensions that provide detailed information and granularity.

Here are some examples of high-cardinality data attributes in JSON format:

1. User IDs:
   ```JSON
   {
   "user_id": "ABC123",
   "name": "John Doe",
   "email": "john.doe@example.com",
   ...
   }
   ```

````

When tracking UserID’s, there’s very little statistical summary that can be useful. While it might be interesting to see the top 10 user ID’s that have transactions on our service, it’s likely that there’s a ‘long tail’ where every single user ID occurs 1-3 times.

1. Device IDs:
 ```JSON
 {
"device_id": "DEVICE987",
"type": "Mobile",
"manufacturer": "Apple",
...
}
````

The capture of a metric like `device_id` can point out how critical it is that we understand the significance of metrics rather than just looking at the data as is. Depending on context, `device_id` might be a unique value for each device, or only unique by model. If the latter, we could offer quite useful summaries of this high cardinality data if we use a lookup table to group devices by year, size, etc.

1. Event types:
   ```JSON
   {
   "event_type": "click",
   "timestamp": "2023-06-25T10:15:00Z",
   ...
   }
   ```

```

Timestamps are a prime example of high-cardinality data. While you can make plenty of statistical calculations about event time if your query language supports it, you can’t make simple statements about averages, sums, or median values.

These examples demonstrate attributes that can have a large number of distinct values. Each attribute, such as user IDs, SKUs, device IDs, locations, tags, event types, etc., may have a high cardinality due to the variety and uniqueness of values.

## Benefits of High Cardinality Data

Why include high-cardinality attributes? There are a number of reasons to make sure you’re grabbing unique or at least low-frequency values for some of your metrics.

### Analytical significance

High-cardinality data is often significant for analytics and data exploration. Analyzing and aggregating high-cardinality attributes can provide insights into user behavior, patterns, preferences, or other dimensions of interest. For example, analyzing user IDs can help understand individual user actions and behavior patterns.

### High Cardinality for High Value Transactions

I remember supporting the observability configuration for an enterprise client, in this case a B2B bank. They were asking for alerts any time a single transaction took more than 5 minutes.

While we worked to support their needs, it took me a while to realize that every transaction of this type was a payment of more than a million dollars! When every single transaction has a business impact, it’s critical to capture as much information as possible.

In these cases low-cardinality data can become much less useful. It doesn’t matter if our average response time is fine if our most high-value client isn’t having a good experience.

## Challenges with High Cardinality Data

- **Indexing challenges:**<br></br>
Storing and indexing high-cardinality data can present challenges. Traditional indexing techniques, such as B-tree indexes, may not be efficient for high-cardinality attributes because the index size would be too large, resulting in slower query performance.

- **Memory and storage considerations:**<br></br>
Storing high-cardinality data may require additional memory and storage resources compared to low-cardinality data. The increased number of unique values can contribute to larger index sizes, more memory consumption, and potentially increased storage requirements.

- **Lack of high-level metrics:**<br></br>
This one is counter-intuitive; if you’re storing SKU’s of course there’s not an ‘average’ SKU, but when you’re able to present high-level metrics like average request time, most commonly used geo area, etc, it can stand out that there’s no way to present an average or even most-frequent value meaningfully. In my experience working with APM tools this came up! high-level dashboards would display ‘most frequent’ values for metrics, but on closer inspection the value had occurred three times over 2 million rows. This meant things like the ‘Number 1 userID’ on all transactions represented 0.000001% of all transactions.

## Conclusions

Managing high-cardinality data efficiently often involves careful consideration of storage strategies, indexing techniques, and data modeling approaches. It's important to strike a balance between capturing the necessary granularity of data and optimizing performance and resource utilization for analysis and querying purposes.

High-cardinality data also comes with considerations, such as increased storage requirements, data management complexities, and potential privacy concerns. Platform teams should carefully evaluate the benefits and costs associated with storing high-cardinality data and implement appropriate data retention policies to ensure efficient and responsible data usage.
```
