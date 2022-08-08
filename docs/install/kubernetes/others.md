---
id: others
label: Other Platforms
title: Deploying with Helm directly
description: Instructions to install on other Cloud Platform and Bare-Metal Servers
---

import K8sComponents from '../../shared/k8s-components.md'
import CommonPrerequisites from '../../shared/k8s-common-prerequisites.md'
import InstallSigNozPart1 from '../../shared/install-signoz-k8s-part-1.md'
import InstallSigNozPart2 from '../../shared/install-signoz-k8s-part-2.md'
import VerifyInstallation from '../../shared/k8s-verify-installation.md'
import K8sHotrod from '../../shared/k8s-hotrod.md'
import NextSteps from '../../shared/next-steps.md'

Follow the steps on this page for instructions to install SigNoz on other Kubernetes
Cloud Platform and bare-metal servers with Helm. 

<K8sComponents />

## Prerequisites

- You must have a Kubernetes cluster

<CommonPrerequisites />

- Suggestion: you can execute the commands below for setting `allowVolumeExpansion` to `True`
for the default storage class definition (this enables PVC resize).
```bash
DEFAULT_STORAGE_CLASS=$(kubectl get storageclass -o=jsonpath='{.items[?(@.metadata.annotations.storageclass\.kubernetes\.io/is-default-class=="true")].metadata.name}')

kubectl patch storageclass "$DEFAULT_STORAGE_CLASS" -p '{"allowVolumeExpansion": true}'
```

:::info
In case you would like to use your own storage class, you can set `storageClass` configuration.
To list storage class in your Kubernetes cluster: `kubectl get storageclass`.
:::

## Chart configuration

You can find an overview of the parameters that can be configured during installation under
[chart configuration](https://github.com/SigNoz/charts/tree/main/charts/signoz#configuration).

## Install SigNoz on Kubernetes with Helm

<InstallSigNozPart1 />

```bash
helm --namespace platform install my-release signoz/signoz
```

<InstallSigNozPart2 />

## Verify the Installation

<VerifyInstallation />

## (Optional) Install a Sample Application and Generate Tracing Data

<K8sHotrod />

## Next Steps

<NextSteps />
