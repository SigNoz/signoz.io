---
title: Fields in Logs 
id: logs_fields
---

# Fields in Logs 
A log line contains different attributes attached to it. These attributes helps you to filter your logs so that you can write effiecient queries and get your results faster. These attributes are reffered to as fields in SigNoz.

There are two kind of fields **interesting** and **selected** .

## Interesting Fields
These kind of fields are the resource and log attributes which are parsed by the otel collector but is not indexed. These fields are also not auto suggested by the query builder. But you can still use these fields for querying by writing the query manually.

## Selected Fields
These are created by converting an interesting field. When a interesting field is converted to selected field, an index is added to the field so that queries for this fields are faster. In addition to that when you write a query this fields will be autosuggested. Selected fields are also displyed explicitly with each log line.


## Creating Fields
By default whenever you receive a log from a non OTLP receivers it will be stored directly in the body and you won't be able to filter logs based on fields/attributes. Opentelemetry provides different ways to parse attributes from your logs using different [operators](./logs.md#operators-for-parsing-and-manipulating-logs) that the available. These parsed attributes are referred to as fields in signoz.

Ex :- 
    Lets say we have our logs formatted as 
    
```
{"time": "2022-09-20,15:27:17 +0530", "message": "Logging test...", "service": "python"}
```

Here we have a timestamp, a message and an attribute named service. Now we will have to parse these in our otel collector config.

```yaml
receivers:
    ...
    filelog:
    include: [ /tmp/app.log ]
    start_at: beginning
    operators:
        - type: json_parser
        timestamp:
            parse_from: attributes.time
            layout: '%Y-%m-%d,%H:%M:%S %z'
        - type: move
        from: attributes.message
        to: body
        - type: remove
        field: attributes.time
...
```

* In the yaml file above we are using the json parser. This will parse the json log line and add it in the attributes key.
* Since we want to populate timestamp we are using the timestamp parser and pointing it to attributes.time which was parsed by the json parser.
* Now we want the value inside `message` key to be in the log body, so we are moving it to body using move operator.
* And finally we are removing time from attributes as we have already populated the value of timestamp from it.