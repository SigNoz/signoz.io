1. Add the SigNoz Helm repository to your client with name `signoz` by running the following command:

```bash
helm repo add signoz https://charts.signoz.io
```

2. Verify that the repository is accessible to the Helm CLI by entering the following command:
  
```bash
helm repo list
```

3. Use the `kubectl create ns` command to create a new namespace. SigNoz recommends you use `platform` for your new namespace:

```bash
kubectl create ns platform
```

4. Run the following command to install the chart with the release name `my-release` and namespace `platform`: