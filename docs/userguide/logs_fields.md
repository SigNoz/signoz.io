---
title: Fields in Logs 
id: logs_fields
---

# Fields in Logs 

The different types of resource and log attributes that gets parsed thought the Opentelemetry Collector using the collector config are referred to as fields.
There are two kind of fields **interesting** and **selected** .

## Interesting Fields
These kind of fields are the resource and log attributes which are parsed by the otel collector but is not indexed. These fields are also not auto suggested by the query builder. But you can still use these fields to query by writing the query manually.

## Selected Fields
These are created by converting an interesting field. When a interesting field is converted to selected field, an index is added to the field so
that queries for this fields are faster. In addition to that when you write a query this fields will be autosuggested. Selected fields are also
displyed explicitly with each log line.

