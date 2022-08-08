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

First, we need to set up a Kubernetes cluster (see the
[official GCP documentation](https://cloud.google.com/kubernetes-engine/)
for more info).
 
<K8sComponents />

## Prerequisites

- You must have a GKE cluster

<CommonPrerequisites />

## Chart configuration

Here's the minimal required `override-values.yaml` that we'll be using later. You can find
an overview of the parameters that can be configured during installation under
[chart configuration](https://github.com/SigNoz/charts/tree/main/charts/signoz#configuration).

```yaml
global:
  storageClass: gce-resizable

clickhouse:
  cloud: gcp
  installCustomStorageClass: true
```

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
