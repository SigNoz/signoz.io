---
id: docker
title: Deploying with Docker
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

### Steps:

1. Install SigNoz backend as instructed in this page
2. Instrument your application as instructed in [Instructions Page](/docs/instrumentation/overview)
<br></br>

<br></br>

You can install SigNoz backend in following 2 ways:
1. Using Install Script
2. Using Docker Compose

We have explained each of these way in the following sections
<br></br>

### 1. Using Install Script

If you are on Mac or any of the following linux distributions, using our install script should be the easiest way to get started:
- Ubuntu
- Debian
- OpenSuse
- CentOS
- SUSE Linux Enterprise Server (SLES)
- RedHat
- Amazon Linux

If you are neither on any of the above distributions nor on Mac, please install directly using [Docker Compose](#2-using-docker-compose)

Here's a [quick guide](https://docs.docker.com/compose/install/) to install Docker Compose if you don't have it set up already

<br></br>

1. To clone the SigNoz repository and enter the new directory, run:

```console
git clone https://github.com/SigNoz/signoz.git && cd signoz/deploy/
```
<br></br>

2. To run SigNoz:

Check that you are in `signoz/deploy` folder. Now run

```
./install.sh
```
<br></br>

3. You will be given choice to either chose Clickhouse or Kafka+Druid as the storage backend

```
👉 Two ways to go forward

1) ClickHouse as database (default)

2) Kafka + Druid setup to handle scale (recommended for production use)
```

Once `./install.sh` runs successfully, the UI should be accessible at port 3000 on the domain you set up or the IP of your instance.

<br></br>

:::info
Wait for 2-3 mins for the data to be available to frontend. If you are running on local machine, checkout `http://localhost:3000`.
You would want to open port 3000 to be accessible from outside world if you want to use public url of machine.
:::

<br></br>
<br></br>

### 2. Using Docker Compose


1. To clone the SigNoz repository and enter the new directory, run:

```console
git clone https://github.com/SigNoz/signoz.git && cd signoz/deploy/
```
<br></br>

2. You can chose either ClickHouse or Druid as the datastore. You need to have docker-compose correctly setup before running this.

<Tabs
  defaultValue="clickHouse"
  groupId="datastore-options"
  values={[
    { label: "ClickHouse Setup", value: "clickhouse" },
    { label: "Kafka + Druid Setup", value: "druid" },
  ]}
>

<TabItem value="clickhouse">

```bash
sudo docker-compose -f ./docker/clickhouse-setup/docker-compose.yaml up -d
```
</TabItem>

<TabItem value="druid">

```bash
sudo docker-compose -f ./docker/druid-kafka-setup/docker-compose-tiny.yaml up -d
```

</TabItem>

</Tabs> 

<br></br>

### Production Settings for Kafka + Druid setup

A standard instance of SigNoz needs around **8GB of memory**. The setup uses `docker-compose.yaml` file at `deploy/docker/druid-kafka-setup`
  
  
If you are interested in configuring S3 deep storage for production usage, check out [this section](/docs/configuration/deep_storage)


<br></br>

### How to instrument your own applications

The current `docker-compose.yaml` includes sample application ([HotR.O.D](https://github.com/jaegertracing/jaeger/tree/master/examples/hotrod)) that generates tracing data. To see your own application data, follow the steps below

[Checkout Instrumentation Section](/docs/instrumentation/overview)

<br></br>

### Having issues running SigNoz?
[Checkout Troubleshooting Section](/docs/deployment/troubleshooting)

  

### Deep Storage with S3 for Kafka+Druid Setup
[Checkout Configuration Section](/docs/configuration/deep_storage)

<br></br>