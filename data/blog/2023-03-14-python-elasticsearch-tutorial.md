---
title: Python Elasticsearch Tutorial - How to use Python Elasticsearch client
slug: python-elasticsearch-tutorial
date: 2023-03-14
tags: [Tech Tutorial]
authors: [ezz]
description: Learn how to use Elasticsearch in Python. Step 1. Install Elasticsearch Step 2.Install the Elasticsearch Python Client 3.Configure the Elasticsearch connection 4.Connecting to an Elasticsearch cluster...
image: /img/blog/2023/03/python_elasticsearch_client_cover-min.jpg
hide_table_of_contents: false
keywords:
  - elasticsearch
  - python elasticsearch
  - python elasticsearch tutorial
  - log management
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/python-elasticsearch-tutorial/"/>
</head>

Elasticsearch is a popular search engine that can be used to swiftly and almost instantly store, explore, and analyze huge volumes of data. It offers a distributed, multitenant full-text search engine with an HTTP web interface and schema-free JSON documents on top of Apache Lucene.

<!--truncate-->

![Cover Image](/img/blog/2023/03/python_elasticsearch_client_cover.webp)

In this tutorial, we will demonstrate how to communicate with an Elasticsearch cluster using a Python Elasticsearch client.

## What is Elasticsearch?

On top of the Apache Lucene search framework, Elasticsearch is an open-source search engine. It is flexible, scalable, and simple to use. Elasticsearch may be used to swiftly and almost instantly store, search, and analyze enormous volumes of data.

Elasticsearch is fundamentally a distributed full-text search engine with multitenant support. It communicates via JSON documents and a RESTful API over HTTP, making it simple to integrate with a wide range of computer languages and frameworks. Elasticsearch can automatically deduce the data structure of indexed documents because it is schema-free. Complex data structures can now be stored and searched with ease.

Elasticsearch is frequently employed in a variety of use cases, such as:

- **Log analytics:** To find problems, monitor performance, and spot security threats, Elasticsearch is frequently used to analyze logs from web servers, apps, and other systems.

- **Full-text search:** Elasticsearch is a robust full-text search engine that can be included into websites and applications to give search capabilities. Elasticsearch can be used to store and analyze business data, including indicators like sales numbers and consumer activity.

> [SigNoz](https://signoz.io/) is a good ELK alternative for log analytics. In our [logs performance benchmark](https://signoz.io/blog/logs-performance-benchmark/), we found SigNoz to be 2.5x faster than ELK and consumed 50% less resources.

In the following sections of this tutorial, we’ll look at how to communicate with an Elasticsearch cluster using the Python Elasticsearch client, including creating an index, running data queries, and using Python and Elasticsearch modules.

## Setting Up Your Virtual Environment

Before you can start working with Elasticsearch in Python, you need to set up your environment. Here are the basic steps:

### Step 1: Install Elasticsearch

Installing Elasticsearch on your machine is the first step. For a range of operating systems, including Windows, macOS, and Linux, Elasticsearch offers pre-built packages. From the [official website](https://www.elastic.co/downloads/elasticsearch), you can download the most recent version of Elasticsearch.

### Step 2: Install the Elasticsearch Python client

Elasticsearch’s Python client can be installed once Elasticsearch has been set up. This Python module offers a straightforward and user-friendly interface for working with Elasticsearch. Using pip, the Python package manager, you can install the Elasticsearch Python client:

```bash
pip install elasticsearch
```

### Step 3: Configure the Elasticsearch connection

The Elasticsearch connection in your Python code needs to be configured next. You must give the host and port of the Elasticsearch instance you wish to connect to in order to do this. An illustration of how to make an Elasticsearch client object is shown below:

```python
from elasticsearch import Elasticsearch

es = Elasticsearch([{'host': 'localhost', 'port': 9200}])
```

In this example, we’re using the default port of `9200` to connect to an Elasticsearch instance that is operating locally.

After completing these fundamental steps, you are now prepared to use Python to interact with Elasticsearch. We will examine how to connect an Elasticsearch cluster to a number of nodes in the following section of this tutorial, as well as how to include configuration while connecting.

## Connecting to an Elasticsearch Cluster

You must connect to an Elasticsearch cluster in order to use Elasticsearch in Python. A group of one or more nodes that collaborate to offer indexing and search capabilities is known as an Elasticsearch cluster.

The host and port of one or more cluster nodes must be specified in order to connect to an Elasticsearch cluster using the Python client for Elasticsearch. To connect to a cluster, construct an Elasticsearch client object as shown in the following example:

```python
es = Elasticsearch([
	{'host': 'node1', 'port': 9200},
	{'host': 'node2', 'port': 9200}
])
```

In this example, we’re connecting to a pair of nodes in an Elasticsearch cluster called `node1` and `node2`, both of which are active on the default port `9200`.

You might need to supply additional credentials to authenticate your connection if your Elasticsearch cluster is set for security. An illustration of how to create an Elasticsearch client object with fundamental authentication is shown below:

```python
es = Elasticsearch(
	[{'host': 'node1', 'port': 9200}],
	http_auth=('username', 'password')
)
```

The username and password we provide in this example will be used to authenticate our connection to the Elasticsearch cluster.

The Elasticsearch Python client’s different APIs can be used to build and manage indices, index data, and search data once you have established a connection to an Elasticsearch cluster. In the following sections of this tutorial, we will examine several of these APIs in further detail.

## Indexing Documents in Elasticsearch

Indexing and searching through a lot of documents is one of Elasticsearch’s main use cases. The fundamental piece of information that may be indexed and searched in Elasticsearch is a document. Any JSON object that is a document can be found in an index, which is a group of linked documents.

When using the Python client to index documents in Elasticsearch, you must supply the document’s data as well as the index and type to which it belongs. Here is an illustration of how to index a document using the Python client for Elasticsearch:

```python
from elasticsearch import Elasticsearch

# create a connection to Elasticsearch
es = Elasticsearch([{'host': 'localhost', 'port': 9200}])

# define the document data
doc = {
	'title': 'The quick brown fox',
	'content': 'The quick brown fox jumps over the lazy dog'
}

# index the document
es.index(index='my_index', doc_type='my_type', id=1, body=doc)
```

In this example, we’re setting up a connection to a local Elasticsearch instance. The next step is to define a document with a title and content field. Finally, we index the document using the `index` method of the Elasticsearch client, specifying the index as `my_index`, the type as `my_type`, and the document ID as `1`.

Elasticsearch automatically constructs the index and mapping when you index a document if they don’t already exist. The mapping specifies the index’s structure, down to the data types used in the fields of the documents.

Using the Python client for Elasticsearch, you may also search, update, and delete documents. The Elasticsearch client’s `search`, `update`, and `delete` methods are used to carry out these operations. In the following sections of this tutorial, we’ll go through these techniques in more detail.

## Searching Documents in an Index

The Python client for Elasticsearch offers a variety of search methods that you can use after indexing documents in Elasticsearch. You may carry out complex searches against your data using Elasticsearch’s sophisticated and flexible `search` API.

You must specify the index or indices to search for your search query when using the Python client to look for documents in Elasticsearch. Here is an example of how to search for documents using the `search` method in the Elasticsearch client:

```python
# define the search query
query = {
	'query': {
		'match': {
			'content': 'quick brown fox'
		}
	}
}

# search for documents
result = es.search(index='my_index', body=query)
```

In this example, we’re setting up a connection to a local Elasticsearch instance. Then, we specify a search query that looks for papers with the sentence “quick brown fox” in the `content` field. Finally, we search for documents in the `my_index` index using the Elasticsearch client’s `search` method.

The `search` method produces a result object that includes details about the search, such as the number of matching documents, the search’s execution time, and the matching documents themselves.

To carry out more complicated searches, you may also use more sophisticated search techniques like the <a href = "https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html" rel="noopener noreferrer nofollow" target="_blank" >multi_match query</a> or the <a href = "https://www.elastic.co/guide/en/elasticsearch/reference/8.6/query-dsl-bool-query.html" rel="noopener noreferrer nofollow" target="_blank" >bool query</a>. The data in your search results can also be analyzed and summarized using a variety of aggregation techniques.

## Updating Documents in an Index

A document can be updated in Elasticsearch by indexing a new version of it with the same ID as the original document. Elasticsearch replaces the old document with the new one when you index a new version of it.

Using the Python client, you can update a document in Elasticsearch by using the `update` method. The `update` function enables you to make changes to a document’s individual fields without updating the whole thing. Here is an example of how to update a document using the Python client for Elasticsearch:

```python
# define the update data
update_data = {
	'doc': {
		'content': 'A quick brown fox'
	}
}
# update the document
es.update(index='my_index', doc_type='my_type', id=1, body=update_data)
```

In this example, we’re setting up a connection to a local Elasticsearch instance. Next, we define the update data, which identifies the field that must be updated and its new value. Finally, we update the document with ID `1` in the index `my_index` using the Elasticsearch client’s `update` method.

In Elasticsearch, when you edit a document, the newly updated version is combined with the previous version. The fields in the current version of the document that are not mentioned in the `update` data are therefore left alone.

This indicates that the modified document appears as follows:

```json
{
  "title": "The quick brown fox",
  "content": "A quick brown fox"
}
```

Because it is not supplied in the `doc` parameter, the `title` field is unaffected by the modification. You can add them as key-value pairs in the `doc` argument if you wish to edit multiple fields in the document.

The <a href = "https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update.html" rel="noopener noreferrer nofollow" target="_blank" >script element</a> given to the `update` method can also be used to update a document using a script. It enables you to change fields programmatically based on certain conditions.

Elasticsearch has additional methods for updating documents in addition to the `update` method, such as the `update_by_query` method, which enables you to update many documents simultaneously depending on a search query.

## Deleting Documents from an Index

You can remove a document from an index in Elasticsearch by giving the index, type, and ID of the unwanted document. The Python client’s `delete` method can be used to remove a document. Here is an example of how to delete a document using the Python client for Elasticsearch:

```python
# delete the document with ID 1 from the index 'my_index'
es.delete(index='my_index', doc_type='my_type', id=1)
```

In this example, we’re setting up a connection to a local Elasticsearch instance. The document with the ID of `1` in the index `my_index` is then deleted using the `delete` method of the Elasticsearch client.

Using the <a href = "https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete-by-query.html" rel="noopener noreferrer nofollow" target="_blank" >delete_by_query API</a>, it is possible to delete numerous documents simultaneously. You can delete documents using the `delete_by_query` Python method if they match a search query. Here’s an example of how to delete every document that matches a search query using the `delete_by_query` method:

```python
# delete all documents in the index 'my_index' that match the query
es.delete_by_query(index='my_index', body={'query': {'match_all': {}}})
```

In this example, all of the documents in the `my_index` index that match the `match_all` query, which matches every document in the index, are being deleted using the `delete_by_query` method.

Elasticsearch automatically removes a document from an index when you delete it from the index. The document might not be completely removed from all copies of the index right away, though.

The deletion of a document from an index does not remove it from backups or snapshots of the index. To permanently remove a document from an index, a document must be deleted from any backups or snapshots that contain the index.

## Aggregating Data with Aggregations

Elasticsearch’s powerful aggregate feature makes it possible to review and analyze the data contained in an index. Metric computation, data grouping, and data analysis tasks, including statistical analysis, histograms, and more, may all be done with the help of aggregates.

The `search` method of the Elasticsearch client, which enables you to specify the type of aggregation you wish to carry out in the query body, can be used to use aggregations in Elasticsearch with the Python client. Here’s an example of how to use the Elasticsearch Python client to carry out a fundamental aggregation:

```python
# perform a terms aggregation on the 'category' field in the index 'my_index'
es = es.search(
	index='my_index',
	body={
		'size': 0,
		'aggs': {
			'category_count': {
				'terms': {
					'field': 'category'
				}
			}
		}
	}
)
# print the aggregation results
for bucket in res['aggregations']['category_count']['buckets']:
	print(bucket['key'], bucket['doc_count'])
```

In this example, the `category` field in the `my_index` index is the subject of a `terms` aggregate. Each bucket in the list of buckets returned by the aggregate stands for a distinct value in the `category` field and the number of documents that contain that value. We are limiting the amount of search hits to `0` by using the `size` parameter, which indicates that only the aggregate results will be returned in the search results.

Additionally, you can utilize metric aggregations, histogram aggregations, and other types of aggregations. Here is an example of how to aggregate histograms using the Python client for Elasticsearch:

```python
# perform a histogram aggregation on the 'price' field in the index 'my_index'
es = es.search(
	index='my_index',
	body={
		'size': 0,
		'aggs': {
			'price_histogram': {
				'histogram': {
					'field': 'price',
					'interval': 10
				}
			}
		}
	}
)
# print the aggregation results
for bucket in res['aggregations']['price_histogram']['buckets']:
	print(bucket['key'], bucket['doc_count'])
```

In this example, the `price` field in the `my_index` index is the subject of a histogram aggregation. The aggregate divides the documents into buckets that each reflect a range of prices based on the value of the `price` field. The width of each bucket is specified by the `interval` option. The number of documents in each bucket is returned by the aggregation.

Elasticsearch’s aggregates are a potent tool for data analysis and summarization. They may assist you in understanding your data, seeing trends, and drawing conclusions from your data research. Utilizing the Elasticsearch Python client makes it simple to include aggregations into Python programmes and utilize all of Elasticsearch’s capabilities.

## Conclusion

Elasticsearch is a popular search and analytics engine that may assist you in swiftly and effectively storing, searching, and analyzing enormous volumes of data. The fundamentals of using the Python Elasticsearch client to communicate with an Elasticsearch cluster have been covered in this tutorial.

These fundamentals include setting up your environment, connecting to a cluster, index documents, searching for documents, updating documents, deleting documents, and performing aggregations. Elasticsearch is popularly used as a component in the ELK stack for log management. The ELK stack is a good choice for log management, but requires effort in maintenance and management. If you’re looking for a lightweight and easy to manage solution for logs, check out [SigNoz](https://signoz.io/).

---

**Related Posts**

**[A Lightweight Open Source ELK alternative](https://signoz.io/blog/elk-alternative-open-source/)**
