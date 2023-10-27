---
id: forward-cloudwatch-logs-to-signoz
title: Forward Cloudwatch Logs to SigNoz
description: Forward your AWS Cloudwatch logs to SigNoz Cloud/Self-Host

---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

## Overview

AWS CloudWatch is a monitoring service that helps users keep tabs on their AWS resources. There are some  challenges that user encounter on Cloudwatch such as the absence of a unified observability experience, slightly higher costs, a focus on AWS-centric environments, and user experience limitations. 

SigNoz effectively addresses these challenges, and in the following steps, we'll outline how to seamlessly forward logs from AWS CloudWatch to SigNoz.

## Setup

You can choose from the two options below.

<Tabs>
<TabItem value="SigNoz Cloud" label="SigNoz Cloud" default>

**Step 1** : Setup the OTel Collector

Follow the instructions in the SigNoz Cloud section of [this tutorial](https://signoz.io/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/)  to setup the OpenTelemetry Collector.


**Step 2** : Configure AWS 

Create a `~/.aws/credentials` file in the machine  which should have `aws_access_key_id` and the  `aws_secret_access_key` in the default section of credentials file.

The below snippet shows an example of the credentials file.

```bash
[default]
aws_access_key_id=AKIAIOSFODNN7EXAMPLE
aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

[user1]
aws_access_key_id=AKIAI44QH8DHBEXAMPLE
aws_secret_access_key=je7MtGbClwBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY
```

The account corresponding to these credentials should have the below mentioned AWS Identity and Access Management (IAM) policy. This policy allows the account associated with these permissions to describe and filter log events within all log groups in the specified AWS account which is crucial for setting up the necessary permissions to forward CloudWatch logs to SigNoz.

```bash
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "logs:DescribeLogGroups",
                "logs:FilterLogEvents"
            ],
            "Resource": "arn:aws:logs:*:090340947446:log-group:*"
        }
    ]
}
```
:::note
Make sure you have AWS configured on the machine where otel-collector is running
:::

**Step 3** : Configure the awscloudwatch receiver

We’ll add awscloudwatch receiver inside the receivers section of the `config.yaml` that we created in Step 1.

```bash

receivers:
...
	awscloudwatch:
	    region: us-east-1
	    logs:
	      poll_interval: 1m
	      groups:
	        autodiscover:
	          limit: 100
	          prefix: application
	          # streams: # all streams
	          # prefixes: [kube-api-controller]
...
```
The above configuration will discover 100 log groups starting with prefix `application`.

To see the different parameters, some sample configurations and more details about the awscloudwatch receiver, checkout this <a href = "https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/awscloudwatchreceiver" rel="noopener noreferrer nofollow" target="_blank" >GitHub link</a>.

**Step 4** : Send logs to SigNoz
To test out the receiver create a pipeline in the pipeline section of the `config.yaml` created in Step 1.

```bash
...
  pipelines:
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp]
    metrics/internal:
      receivers: [prometheus, hostmetrics]
      processors: [resourcedetection, batch]
      exporters: [otlp]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp]
    logs:
      receivers: [otlp, awscloudwatch]
      processors: [batch]
      exporters: [otlp]
```

This will log out everything from the receiver and you should be able to see your Cloudwatch logs in the SigNoz Cloud UI.

</TabItem>

<TabItem value="Self-Host" label="Self-Host">

**Step 1** : Setup the OTel Collector

Follow the instructions in the Self-Host section of [this tutorial](https://signoz.io/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/)  to setup the OpenTelemetry Collector.


**Step 2** : Configure AWS 

Create a `~/.aws/credentials` file in the machine  which should have `aws_access_key_id` and the  `aws_secret_access_key` in the default section of credentials file.

The below snippet shows an example of the credentials file.

```bash
[default]
aws_access_key_id=AKIAIOSFODNN7EXAMPLE
aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

[user1]
aws_access_key_id=AKIAI44QH8DHBEXAMPLE
aws_secret_access_key=je7MtGbClwBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY
```

The account corresponding to these credentials should have the below mentioned AWS Identity and Access Management (IAM) policy. This policy allows the account associated with these permissions to describe and filter log events within all log groups in the specified AWS account which is crucial for setting up the necessary permissions to forward CloudWatch logs to SigNoz.

```bash
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "logs:DescribeLogGroups",
                "logs:FilterLogEvents"
            ],
            "Resource": "arn:aws:logs:*:090340947446:log-group:*"
        }
    ]
}
```
:::note
Make sure you have AWS configured on the machine where otel-collector is running
:::

**Step 3** : Configure the awscloudwatch receiver

We’ll add awscloudwatch receiver inside the receivers section of the `config.yaml` that we created in Step 1.

```bash

receivers:
...
	awscloudwatch:
	    region: us-east-1
	    logs:
	      poll_interval: 1m
	      groups:
	        autodiscover:
	          limit: 100
	          prefix: application
	          # streams: # all streams
	          # prefixes: [kube-api-controller]
...
```
The above configuration will discover 100 log groups starting with prefix `application`.

To see the different parameters, some sample configurations and more details about the awscloudwatch receiver, checkout this <a href = "https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/awscloudwatchreceiver" rel="noopener noreferrer nofollow" target="_blank" >GitHub link</a>.

**Step 4** : Send logs to SigNoz
To test out the receiver create a pipeline in the pipeline section of the `config.yaml` created in Step 1.

```bash
...
 pipelines:
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp]
    metrics/internal:
      receivers: [prometheus, hostmetrics]
      processors: [resourcedetection, batch]
      exporters: [otlp]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp]
    logs:
      receivers: [otlp, awscloudwatch]
      processors: [batch]
      exporters: [clickhouselogsexporter]
```

This will log out everything from the receiver and you should be able to see your Cloudwatch logs in the SigNoz UI.

</TabItem>

</Tabs>