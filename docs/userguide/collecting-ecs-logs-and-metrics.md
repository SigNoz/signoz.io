---
id: collecting-ecs-logs-and-metrics
title: ECS Infra Metrics and Logs Collection using Daemon Service
description: View metrics and logs for your ECS infrastructure
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DSTemplateIntro from '../shared/ecs-infra/daemon/template-intro.md'
import DSTemplateEC2 from '../shared/ecs-infra/daemon/template-ec2.md'
import DSTemplateExternal from '../shared/ecs-infra/daemon/template-external.md'
import DSConfigIntro from '../shared/ecs-infra/daemon/config-intro.md'
import DSConfigCloud from '../shared/ecs-infra/daemon/config-cloud.md'
import DSConfigOss from '../shared/ecs-infra/daemon/config-oss.md'
import DSSetUpVerify from '../shared/ecs-infra/daemon/set-up-verify.md'
import DSSendDataIntro from '../shared/ecs-infra/daemon/send-data-intro.md'
import DSSendDataEc2 from '../shared/ecs-infra/daemon/send-data-ec2.md'
import DSSendDataExternal from '../shared/ecs-infra/daemon/send-data-external.md'
import DSSendDataEnd from '../shared/ecs-infra/daemon/send-data-end.md'

This tutorial will show you how to collect metrics and logs from your ECS infrastructure
using a daemon service. The daemon service will run a container in each nodes of
your ECS cluster. The container will collect metrics and logs from the instance and
send them to SigNoz.

Select the type of SigNoz instance you are running: **SigNoz Cloud** or **Self-Hosted**.

<Tabs>
<TabItem value="cloud" label="SigNoz Cloud" default>

### Prerequisites

- An ECS cluster running with at least one task definition
- SigNoz Cloud account - [Sign up for SigNoz Cloud](https://signoz.io/teams/)
- Access Token and ingest URL, provided for your SigNoz Cloud account
- ECS cluster must be either of launch type **EC2** or **External**
- ECS Fargate is not supported yet. We are working on it and will be available soon.

## Setting up Daemon Service

<DSTemplateIntro name="Cloud" />

Select the type of ECS cluster you are running: **EC2** or **External**.

<Tabs groupId="launch-type">
<TabItem value="ec2" label="EC2" default>
<DSTemplateEC2 />
</TabItem>
<TabItem value="external" label="External">
<DSTemplateExternal />
</TabItem>
</Tabs>

<DSConfigIntro />
<DSConfigCloud />
<DSSetUpVerify name="Cloud" />

---

## Send Data from Applications

<DSSendDataIntro name="Cloud" />

<Tabs groupId="launch-type">
<TabItem value="ec2" label="EC2" default>
<DSSendDataEc2 />
</TabItem>
<TabItem value="external" label="External">
<DSSendDataExternal />
</TabItem>
</Tabs>

<DSSendDataEnd name="Cloud" />

</TabItem>
<TabItem value="self-host" label="Self-Host">

### Prerequisites

- An ECS cluster running with at least one task definition
- Running SigNoz instance - [Install SigNoz](/docs/install)
- ECS cluster must be either of launch type **EC2** or **External**
- ECS Fargate is not supported yet. We are working on it and will be available soon.

## Setting up Daemon Service

<DSTemplateIntro name="OSS" />

<Tabs groupId="launch-type">
<TabItem value="ec2" label="EC2" default>
<DSTemplateEC2 />
</TabItem>
<TabItem value="external" label="External">
<DSTemplateExternal />
</TabItem>
</Tabs>

<DSConfigIntro />
<DSConfigOss />
<DSSetUpVerify name="OSS" />

---

## Send Data from Applications

<DSSendDataIntro name="OSS" />

<Tabs groupId="launch-type">
<TabItem value="ec2" label="EC2" default>
<DSSendDataEc2 />
</TabItem>
<TabItem value="external" label="External">
<DSSendDataExternal />
</TabItem>
</Tabs>

<DSSendDataEnd name="OSS" />

</TabItem>
</Tabs>

---