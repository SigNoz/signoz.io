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
import StorageClass from '../../shared/k8s-storageclass.md'
import SigNozCloud from '../../shared/signoz-cloud.md'

<SigNozCloud />

Follow the steps on this page to install SigNoz on other Kubernetes
Cloud Platform and bare-metal servers with Helm.

<K8sComponents />

## Prerequisites

- You must have a Kubernetes cluster

<CommonPrerequisites />

- Suggestion: In case you do not have any other storage class which supports volume
  expansion, you can patch default storage class definition by setting
  `allowVolumeExpansion` to `True` (this enables PVC resize).

  ```bash
  DEFAULT_STORAGE_CLASS=$(kubectl get storageclass -o=jsonpath='{.items[?(@.metadata.annotations.storageclass\.kubernetes\.io/is-default-class=="true")].metadata.name}')

  kubectl patch storageclass "$DEFAULT_STORAGE_CLASS" -p '{"allowVolumeExpansion": true}'
  ```

  <StorageClass />

## Chart configuration

You can find an overview of the parameters that can be configured during installation under
[chart configuration][1]

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

---

[1]: https://github.com/SigNoz/charts/tree/main/charts/signoz#configuration
