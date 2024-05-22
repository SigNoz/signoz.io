---
id: webhook
title: Configure Webhook Channel
---

## Prerequisites

Before configuring a Webhook channel in SigNoz, ensure that you have:

- **Webhook Application**: Have an application ready to accept webhook messages.

- **Webhook URL**: Obtain a valid webhook URL reachable from SigNoz Alert Manager.

- **SigNoz Version**: Ensure you are using SigNoz version Webhook [v0.7.4](https://github.com/SigNoz/signoz/releases/tag/v0.7.4) or later

## Accessing Alert Channels

To manage your alert channels in SigNoz:

- Navigate to `Settings > Alert Channels` tab within SigNoz. This tab displays a list of configured alert channels.

![alert-channels](../../../static/img/docs/alert-channels.webp)

:::info

When multiple channels are set up, alerts will be sent to all the configured channels.

:::

## Creating a new Webhook channel
To create a new Webhook notification channel in SigNoz, follow these steps:

- Navigate to `Settings > Alert Channels` and click on `New Channel`.
- Enter a **Name** for the channel and select Webhook as the channel type.
- **Webhook URL**: Enter the Webhook URL endpoint.
- **Username and Password** (Optional): Provide the necessary credentials for authentication.

**Test Configuration**: 
Click the Test button to test the connection with your application.

![image](https://user-images.githubusercontent.com/10277894/165084693-8034b65a-f0f4-4ff4-8a72-88fb7b8726b4.png)


## Editing a Webhook channel
To edit an existing webhook notification channel:
- Navigate to the channel settings in SigNoz.
- You can edit the webhook URL and other parameters. However, note that the channel name and type are not editable after creation.

![image](https://user-images.githubusercontent.com/10277894/165084529-bf0aa817-5c4e-4f45-98bd-eeb33eb02547.png)

## Receive Alert through Webhook

Once the configuration is set up correctly, you will receive alerts in your application through the configured Webhook channel whenever monitored metrics exceed the specified thresholds in alert rules.

![image](https://user-images.githubusercontent.com/10277894/165078852-d3ae7571-bfa2-409a-93aa-2a870b379cb1.png)

## Sample Webhook message
A webhook message may contain multiple alerts. By default, the SigNoz alert manager groups alerts by the alert name and delivers grouped messages every 5 minutes.

For resolved alerts, the alert manager will send the time of resolution in _endsAt_. You can also use the fingerprint property to identify and process updates sent by the alert manager. 

```json
{
   "receiver":"w1",
   "status":"firing",
   "alerts":[
      {
         "status":"firing",
         "labels":{
            "alertname":"DiskRunningFull",
            "dev":"sda3",
            "instance":"example3",
            "severity":"critical"
         },
         "annotations":{
            "info":"The disk sda3 is running full",
            "summary":"please check the instance example1"
         },
         "startsAt":"2022-04-25T14:35:19.490146+05:30",
         "endsAt":"0001-01-01T00:00:00Z",
         "generatorURL":"",
         "fingerprint":"ad592b0afcbe2e79"
      }
   ],
   "groupLabels":{
      "alertname":"DiskRunningFull"
   },
   "commonLabels":{
      "alertname":"DiskRunningFull",
      "dev":"sda3",
      "instance":"example3",
      "severity":"critical"
   },
   "commonAnnotations":{
      "info":"The disk sda3 is running full",
      "summary":"please check the instance example1"
   },
   "externalURL":"http://Apples-MacBook-Pro-3.local:9093",
   "version":"4",
   "groupKey":"{}/{}:{alertname=\"DiskRunningFull\"}",
   "truncatedAlerts":0
}
```

## Troubleshooting
If you encounter issues:

- **Check the Webhook URL**: Ensure the webhook URL is correctly entered in SigNoz.

- **Verify Webhook Permissions**: Confirm that the webhook has permissions to post alerts to the desired endpoint.

