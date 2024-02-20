---
id: collecting-ecs-sidecar-infra
title: Collecting Data from ECS using Sidecar
description: View metrics, traces and logs for your ECS infrastructure
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SCTemplateIntro from '../shared/ecs-infra/sidecar/template-intro.md'
import SCConfigIntro from '../shared/ecs-infra/sidecar/config-intro.md'
import SCConfigCloud from '../shared/ecs-infra/sidecar/config-cloud.md'
import SCConfigOss from '../shared/ecs-infra/sidecar/config-oss.md'

This tutorial will show you how to collect data from your ECS infrastructure
using sidecar. The sidecar container will run in each application container of
your ECS cluster. The sidecar container will collect metrics and forward any
received OTLP data to SigNoz.

Select the type of SigNoz instance you are running: **SigNoz Cloud** or **Self-Hosted**.

<Tabs>
<TabItem value="cloud" label="SigNoz Cloud" default>

### Prerequisites

- An ECS cluster running with at least one task definition
- SigNoz Cloud account - [Sign up for SigNoz Cloud](https://signoz.io/teams/)
- Access Token and ingest URL, provided for your SigNoz Cloud account
- ECS cluster can be either of the launch types: **EC2**, **External**, or **Fargate**
- Replace `<aws-region>` with your region
- Replace `<aws-account-id> <aws-account-id>` with your account id
- Replace `<your-service-name>` with your service name

## Setting up Sidecar Container

<SCTemplateIntro name="Cloud" />

<SCConfigIntro />

<SCConfigCloud />

</TabItem>
<TabItem value="self-host" label="Self-Host">


### Prerequisites

- An ECS cluster running with at least one task definition
- Running SigNoz instance - [Install SigNoz](/docs/install)
- ECS cluster can be either of the launch types: **EC2**, **External**, or **Fargate**
- Replace `<aws-region>` with your region
- Replace `<aws-account-id> <aws-account-id>` with your account id
- Replace `<your-service-name>` with your service name

## Setting up Sidecar Container

<SCTemplateIntro name="Cloud" />

<SCConfigIntro />

<SCConfigOss />

</TabItem>
</Tabs>

### Update task definition of your application

In your task definition, add a new container definition for the sidecar
container. This container will run along with your application container
in the same task definition.

```json
{
    ...
    "containerDefinitions": [
        ...,
        {
            "name": "signoz-collector",
            "image": "signoz/signoz-otel-collector:0.88.13",
            "user": "root",
            "command": [
                "--config=env:SIGNOZ_CONFIG_CONTENT"
            ],
            "secrets": [
                {
                "name": "SIGNOZ_CONFIG_CONTENT",
                "valueFrom": "/ecs/signoz/otelcol-sidecar.yaml"
                }
            ],
            "memory": 1024,
            "cpu": 512,
            "essential": true,
            "portMappings": [
                {
                    "protocol": "tcp",
                    "containerPort": 4317
                },
                {
                    "protocol": "tcp",
                    "containerPort": 4318
                },
                {
                    "containerPort": 8006,
                    "hostPort": 8006,
                    "protocol": "tcp"
                }
            ],
            "healthCheck": {
                "command": [
                    "CMD-SHELL",
                    "wget -qO- http://localhost:13133/ || exit 1"
                ],
                "interval": 5,
                "timeout": 6,
                "retries": 5,
                "startPeriod": 1
            },
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                "awslogs-group": "/ecs/signoz-otel-EC2-sidcar",
                "awslogs-region": "<aws-region>",
                "awslogs-stream-prefix": "ecs",
                "awslogs-create-group": "True"
                }
            }
        }
    ]
...
}
```

### Update ECS Task Execution Role

In your ECS Task Execution Role, add the permissions policy to
- read the parameter from Parameter Store where the sidecar configuration is stored
- send otel-collector sidecar container and fluent bit log router logs to cloudwatch

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "ssm:GetParameter"
            ],
            "Resource": [
                "arn:aws:ssm:<aws-region>:<aws-account-id>:parameter/ecs/signoz/otelcol-sidecar.yaml"
            ],
            "Effect": "Allow"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:CreateLogGroup",
                "logs:PutLogEvents",
                "logs:DescribeLogStreams",
                "logs:DescribeLogGroups"
            ],
            "Resource": "*"
        }
    ]
}
```

Alternatively, you can add the policy `AmazonSSMReadOnlyAccess` and `CloudWatchLogsFullAccess` to the ECS Task Execution Role.

### Update ECS Task Role

Similarly in your ECS Task Role, you can add the permissions policies.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "ssm:GetParameter"
            ],
            "Resource": [
                "arn:aws:ssm:<aws-region>:<aws-account-id>:parameter/ecs/signoz/otelcol-sidecar.yaml"
            ],
            "Effect": "Allow"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:CreateLogGroup",
                "logs:PutLogEvents",
                "logs:DescribeLogStreams",
                "logs:DescribeLogGroups"
            ],
            "Resource": "*"
        }
    ]
}
```

Alternatively, you can add the policy `AmazonSSMReadOnlyAccess` and `CloudWatchLogsFullAccess` to the ECS Task Role.

### Deploy the task definition

Now you can deploy the task definition with the sidecar container. Once
the task is running, you should be able to see sidecar container logs in
CloudWatch Logs.

### Verify data in SigNoz

Once the sidecar container is running, you should be able to see
data in SigNoz. You can verify this by going to the Dashboard
page and importing the dashboard `ECS - Container Metrics` from
[here](https://github.com/SigNoz/dashboards/raw/main/ecs-infra-metrics/container-metrics.json).

---

## Send Traces Data from Applications

In this section, we will see how to send data from applications deployed in ECS
to SigNoz using sidecar container that we deployed in the previous section.

### Add OpenTelemetry Instrumentation to your Application

To add OpenTelemetry instrumentation to your application, you can follow the
docs [here](https://signoz.io/docs/instrumentation/).

This step can also include adding the OpenTelemetry SDK as well as the
initialization code to your application codebase and rebuilding the application
container.

### Configure OTLP Endpoint

In your application task definition, you need to set the OTLP endpoint to the
endpoint of the sidecar container. This can be done by setting the
environment variable `OTEL_EXPORTER_OTLP_ENDPOINT` to the endpoint of
the sidecar container.

Select the network mode of your ECS task definition:

<Tabs>
<TabItem value="bridge" label="Bridge" default>

```json
{
    ...
    "containerDefinitions": [
        {
            "name": "<your-container-name>",
            "environment": [
                {
                    "name": "OTEL_EXPORTER_OTLP_ENDPOINT",
                    "value": "http://signoz-collector:4317"
                },
                {
                    "name": "OTEL_RESOURCE_ATTRIBUTES",
                    "value": "service.name=<your-service-name>"
                }
            ],
            "links": [
                "signoz-collector"
            ],
            ...
        }
    ]
}
```

</TabItem>
<TabItem value="awsvpc" label="AWS VPC">

```json
{
    ...
    "containerDefinitions": [
        {
            "name": "<your-container-name>",
            "environment": [
                {
                    "name": "OTEL_EXPORTER_OTLP_ENDPOINT",
                    "value": "http://localhost:4317"
                },
                {
                    "name": "OTEL_RESOURCE_ATTRIBUTES",
                    "value": "service.name=<your-service-name>"
                }
            ],
            ...
        }
    ]
}
```

</TabItem>
</Tabs>

### Rebuild and Deploy Application Container

Now you can rebuild your application container and deploy it to ECS cluster
using the same task definition that we used in the previous section.

### Verify data in SigNoz

To verify that the data is being sent to SigNoz, you will need to
generate some traffic to your application. After which you can go to the
SigNoz UI page and you should see your application in the services list.

---

## Send Logs Data from Applications

In this section, we will see how to send logs data from applications deployed in ECS
to SigNoz using sidecar container that we deployed in the previous section.

### Configure Fluent Bit Log Router

In your application code, you need to configure the Fluent Bit log router to
your application to the sidecar otel-collector container.

```json
{
    ...
    {
        "name": "signoz-log-router",
        "image": "906394416424.dkr.ecr.us-west-2.amazonaws.com/aws-for-fluent-bit:stable",
        "cpu": 250,
        "memory": 512,
        "essential": true,
        "dependsOn": [
            {
                "containerName": "signoz-collector",
                "condition": "HEALTHY"
            }
        ],
        "logConfiguration": {
            "logDriver": "awslogs",
            "options": {
                "awslogs-create-group": "True",
                "awslogs-group": "/ecs/ecs-signoz-log-router",
                "awslogs-region": "us-east-1",
                "awslogs-stream-prefix": "ecs"
            }
        },
        "firelensConfiguration": {
            "type": "fluentbit",
            "options": {
                "enable-ecs-log-metadata": "true"
            }
        }
    }
}
```

*Note: When collecting logs from multiple applications, it is recommended to use `<application-name>-log-router` pattern instead of `signoz-log-router` for container name and `awslogs-group`. It helps to separate log router of different application.*

### Use Fluent Bit to Send Logs to Sidecar Container

In your application task definition, you need to use `awsfirelens` log driver
to send logs to the sidecar otel-collector container via Fluent Bit log router.

<Tabs>
<TabItem value="bridge" label="Bridge" default>

```json
{
    ...
    "containerDefinitions": [
        {
            "name": "<your-container-name>",
            "dependsOn": [
                {
                    "containerName": "signoz-log-router",
                    "condition": "START"
                }
            ],
            "logConfiguration": {
                "logDriver": "awsfirelens",
                "options": {
                    "Name": "forward",
                    "Match": "*",
                    "Host": "signoz-collector",
                    "Port": "8006",
                    "tls": "off",
                    "tls.verify": "off"
                }
            },
            "links": [
                "signoz-collector"
            ],
            ...
        }
    ]
}
```

</TabItem>
<TabItem value="awsvpc" label="AWS VPC">

```json
{
    ...
    "containerDefinitions": [
        {
            "name": "<your-container-name>",
            "dependsOn": [
                {
                    "containerName": "signoz-log-router",
                    "condition": "START"
                }
            ],
            "logConfiguration": {
                "logDriver": "awsfirelens",
                "options": {
                    "Name": "forward",
                    "Match": "*",
                    "Host": "localhost",
                    "Port": "8006",
                    "tls": "off",
                    "tls.verify": "off"
                }
            }
            ...
        }
    ]
}
```

</TabItem>
</Tabs>

### Rebuild and Deploy Application Container

Now you can rebuild your application container and deploy it to ECS cluster
using the same task definition that we updated in the previous section.

### Verify data in SigNoz

To verify that the logs are being sent to SigNoz, you will need to
generate some logs from your application. After which you can go to the
Logs page in SigNoz UI and you should see logs from your application.

---
