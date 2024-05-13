---
id: gcp
title: Deploying to GCP
description: Instructions to install SigNoz on GKE cluster
---

import K8sComponents from '../../shared/k8s-components.md'
import CommonPrerequisites from '../../shared/k8s-common-prerequisites.md'
import InstallSigNozPart1 from '../../shared/install-signoz-k8s-part-1.md'
import InstallSigNozPart2 from '../../shared/install-signoz-k8s-part-2.md'
import VerifyInstallation from '../../shared/k8s-verify-installation.md'
import K8sHotrod from '../../shared/k8s-hotrod.md'
import NextSteps from '../../shared/next-steps.md'
import StorageClass from '../../shared/k8s-storageclass.md'
import SigNozCloud from '../../shared/signoz-cloud.md'

<SigNozCloud />

First, we need to set up a Kubernetes cluster (see the [official GCP documentation][1]
for more info).

<K8sComponents />

## Prerequisites

- You must have a GKE cluster. Both Standard and Autopilot are supported.

<CommonPrerequisites />

## Chart configuration

Here's the minimal required `override-values.yaml` that we'll be using later. You can find
an overview of the parameters that can be configured during installation under
[chart configuration][2].

### GKE Standard

In GKE Standard, you can either install with the default configuration or make
use of the following `override-values.yaml`:

```yaml
global:
  storageClass: gce-resizable
  cloud: gcp

clickhouse:
  installCustomStorageClass: true
```

### GKE Autopilot

In GKE Autopilot, you must set `cloud` to `gcp/autogke` as well as
update `kubeletMetrics` to use read-only Kubelet endpoint as shown
below in the `override-values.yaml`:

```yaml
global:
  storageClass: gce-resizable
  cloud: gcp/autogke

clickhouse:
  installCustomStorageClass: true

k8s-infra:
  presets:
    kubeletMetrics:
      authType: none
      endpoint: ${K8S_NODE_NAME}:10255
```

GKE Autopilot automatically overriddes resource requests/limits. In our case,
all `signoz` chart components as well as components from `clickhouse` and
`k8s-infra` charts, if enabled. Therefore, make sure to have enough resource
quota for the region where the cluster is deployed. Read more about it [here][3].

<StorageClass />

## Install SigNoz on Kubernetes with Helm

<InstallSigNozPart1 />

```bash
helm --namespace platform install my-release signoz/signoz -f override-values.yaml
```

<InstallSigNozPart2 />

## Verify the Installation

<VerifyInstallation />

## (Optional) Install a Sample Application and Generate Tracing Data

<K8sHotrod />

## Next Steps

<NextSteps />

---

[1]: https://cloud.google.com/kubernetes-engine/
[2]: https://github.com/SigNoz/charts/tree/main/charts/signoz#configuration
[3]: https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-resource-requests#defaults