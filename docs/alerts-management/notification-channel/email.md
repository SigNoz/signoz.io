---
id: email
title: Configure Email Channel
---

## Prerequisites
Before setting up Email as a notification channel in SigNoz, ensure the following:

- **SMTP Host**: You need to have a SMTP host running through which emails are sent (Not needed for SigNoz Cloud).
- **SigNoz Version**: [v0.41.0](https://github.com/SigNoz/signoz/releases/tag/v0.41.0) or later

## Accessing Alert Channels

To manage your alert channels in SigNoz:

- Navigate to `Settings > Alert Channels` tab within SigNoz. This tab displays a list of configured alert channels.

![alert-channels](../../../static/img/docs/alert-channels.webp)

:::info

When multiple channels are set up, alerts will be sent to all the configured channels.

:::

## Creating a new Notification channel
To create a new Email notification channel in SigNoz, follow these steps:

- Navigate to `Settings > Alert Channels` and click on `New Channel`.
- Enter a **Name** for the channel and select Email as the channel type.
- **To**: Enter the email address to which the alerts are sent. This is a comma separated list of email addresses.

![new-notification-channel](../../../static/img/docs/email-new-channel.png)


## Configuring Alertmanager

The following environment variables need to be set for alertmanager to send emails:

- **ALERTMANAGER_SMTP_FROM**: The email address from which the alerts are sent.
- **ALERTMANAGER_SMTP_HOST**: The SMTP host obtained from your email provider.
- **ALERTMANAGER_SMTP_PORT**: The SMTP port obtained from your email provider.
- **ALERTMANAGER_SMTP_AUTH_USERNAME**: The SMTP user obtained from your email provider.
- **ALERTMANAGER_SMTP_AUTH_PASSWORD**: The SMTP password obtained from your email provider.

:::info

This section is only required for **Self-Hosted** users. Cloud users don't need to follow this step.

:::

**Test Configuration**: 
Click the Test button to send a test alert to the configured email addresses. This verifies that SigNoz can communicate with your email provider.

## Editing a Notification channel

To edit an existing Slack notification channel:
- Navigate to the channel settings in SigNoz.
- You can edit the email addresses and other parameters. However, note that the channel name and type are not editable after creation.

## Receiving Alerts in Email

Once configured correctly, alerts from SigNoz will be sent to Email whenever monitored metrics cross the thresholds specified in your alert rules.This ensures you are promptly notified of any issues in your applications or infrastructure components.

![alert-in-email](../../../static/img/docs/alerts-in-email.png)

## Troubleshooting
If you encounter issues with the Email integration:

- **Check the SMTP Server info**: Ensure that the SMTP Host, Port, User and Password entered in SigNoz matches the one provided by your email provider.
- **Verify Email Addresses**: Confirm that the email addresses entered in SigNoz are valid and active.
- **Test Connectivity**: Use the Test button in SigNoz to check connectivity with your email provider. If the test fails, review your network settings and SMTP Server info.

