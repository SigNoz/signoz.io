---
id: log-based-alerts
title: Log based alerts 
---

A Log-based alert allows you to define conditions based on log data, triggering alerts when these conditions are met. Here's a breakdown of the various sections and options available when configuring a Log-based alert:

### Step 1: Define the Log Metric

In this step, you use the [Logs Query Builder](https://signoz.io/docs/userguide/query-builder/#logs-and-traces-query-builder)
to apply filters and operations on your logs to define conditions which triggers log based alert Some of the fields that are available in Logs Query Builder includes:

- **Logs**: A field to filter the specific log data to monitor. 

- **Aggregate Attribute**: Allows you to select how the log data should be aggregated (e.g., "Count").

- **Group by**: Provides options to group log data by various attributes, such as "serviceName," "Status," or custom attributes.

- **[Legend Format](https://signoz.io/docs/userguide/query-builder/#legend-format)**: Lets you define the format for the legend in the visual representation of the alert.

- **Having**: Apply conditions to filter the results further based on aggregate value.

<figure data-zoomable align='center'>
    <img src="/img/docs/alerts/alerts-log-based-1.webp" alt="Using Query Builder to perform operations on your logs"/>
    <figcaption><i>Using Query Builder to perform operations on your logs</i></figcaption>
</figure>
<br></br>

### Step 2: Define Alert Conditions
In this step, you define the specific conditions for triggering the alert, as well as the frequency of checking those conditions:

- **Send a notification when [A] is [above/below] the threshold [in total] during the last [X mins]**: A template to set the threshold and define when the alert condition should be checked.

- **Alert Threshold**: A field to specify the threshold value for the alert condition.

- **More Options** :

    - **Run alert every [X mins]**: This option determines the frequency at which the alert condition is checked and notifications are sent.

    - **Send a notification if data is missing for [X] mins**: A field to specify if a notification should be sent when data is missing for a certain period.

<figure data-zoomable align='center'>
    <img src="/img/docs/alerts/alerts-log-based-2.webp" alt="Define the alert conditions"/>
    <figcaption><i>Define the alert conditions </i></figcaption>
</figure>
<br></br>

### Step 3: Alert Configuration
This step is for setting alert metadata like severity, description, and additional details:

- **Severity**: Choose the severity of the alert (e.g., "Warning," "Critical").

- **Alert Name**: A field to name the alert.

- **Alert Description**: Add a detailed description of the alert, explaining its purpose and trigger conditions.

- **Labels**: A field to add labels or tags for categorization.

- **Notification channels**: A field to choose the notification channels from those configured in the Alert Channel settings.

- **Test Notification**: A button to test the alert to ensure that it works as expected.

<figure data-zoomable align='center'>
    <img src="/img/docs/alerts/alerts-log-based-3.webp" alt="Configure the alert"/>
    <figcaption><i>Setting the alert metadata </i></figcaption>
</figure>
<br></br>

### Example
An example Log-based alert could be set to trigger when a specific error message appears in the log data:

- **Y-axis unit**: Percent(0 - 100)
- **Query A**: Logs where the body contains error
- **Query B**: Total count of logs
- **Function**: A*100/B
- **Alert Threshold**: Above 10 percent
- **Alert Name**: "Log Contains Error"
- **Severity**: "Error"
- **Notification Channels**: Test (A Slack Notification Channel)


<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/alerts/alerts-logs-based.gif" alt="A gif of Logs Based alerts example in SigNoz"/>
    <figcaption><i>Logs Based Alert Example </i></figcaption>
</figure>
<br></br>

