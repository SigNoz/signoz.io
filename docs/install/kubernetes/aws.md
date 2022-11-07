---
id: aws
title: Deploying to AWS
description: Instructions to install SigNoz on EKS cluster
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
[official AWS documentation][1]
for more info). Follow the "Managed nodes - Linux" guide.

<K8sComponents />

## Prerequisites

- Managed nodes - Linux. Faragate is not offically supported
- You must have an EKS cluster

<CommonPrerequisites />

- Recommended K8s version for EKS is `1.22`.
- In case of K8s version `1.23` and above, you must install the Amazon EBS CSI driver
  and provide relevant volume permissions to the role assigned to the Amazon EKS cluster
  IAM role. To know more, refer to the [Amazon EBS CSI migration documentation][2].

## Chart configuration

Here's the minimal required `override-values.yaml` that we'll be using later. You can find
an overview of the parameters that can be configured during installation under
[chart configuration][3].

```yaml
global:
  storageClass: gp2-resizable

clickhouse:
  cloud: aws
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

---

[1]: https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html
[2]: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi-migration-faq.html
[3]: https://github.com/SigNoz/charts/tree/main/charts/signoz#configuration
