---
id: saved-view
title: Save a view in SigNoz
sidebar_label: Saved View
---

<!-- ### Introduction

Have you ever been in a situation where you put in 10 different filters to finally find that root cause but now have no option to save it and use it again ?
Save View is just what you are looking for. This feature available in SigNoz's Logs and Traces explorer -->


<!-- # Saved Views Feature in SigNoz -->

<!-- <img src="img/static/product-features/saved-view.gif" alt="Alt Text" width="300"> -->

## Introduction

<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/saved-view/saved-view.gif" alt="A gif explaining the Save View feature in SigNoz"/>
    <figcaption><i>Save View feature in Logs Explorer of SigNoz</i></figcaption>
</figure>
<br></br>

<!-- ![Alt Text](../../static/img/docs/product-features/saved-view.gif) -->


<!-- The Save View feature offers a streamlined experience in its Logs and Trace Explorer. This feature enables users to customize and preserve specific filter settings for the logs and traces data and save these tailored views for swift access in the future. This document provides a step-by-step guide to using Filters and Saved Views in SigNoz. -->

The Save View feature in SigNoz enhances your log and trace data analysis by allowing you to create and access customized data perspectives efficiently. This feature simplifies repetitive data filtering tasks, making it easier to manage and analyze the vast quantities of data you encounter daily.


## Use-Cases

The Saved Views functionality caters to a variety of real-life scenarios across the Logs and Traces Explorers:

- **Incident Response**: During an incident, time is of the essence. Saved Views can help you quickly zoom in on the anomaly by applying predefined filters, allowing you to diagnose and respond to issues faster.
- **Continuous Monitoring**: For routine checks, a saved view can serve as a daily dashboard, showing you the health and performance metrics that you care about most, without the need to rebuild filters each time.
- **Collaborative Analysis**: When your team needs to tackle a problem, Saved Views ensure everyone can access the same data perspective instantly, fostering a unified approach to resolving issues.
<!-- - **Performance Tuning**: When optimizing application performance, Saved Views can track specific metrics over time, helping you gauge the impact of changes. -->
- **Security Oversight**: Set up views to monitor security logs, and access them quickly in case of a suspected breach to trace the source or impact.

By facilitating these use-cases, Saved Views not only saves time but also brings focus and precision to your data analysis workflows in SigNoz.


## How to Use Saved Views

### Step 1: Apply Filters

1. Navigate to the **Logs Explorer** or **Traces Explorer** page within your SigNoz dashboard.

2. Utilize the **Filter** search bar to select from a plethora of filtering options, tailoring your data view.

<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/saved-view/filter.jpg" alt="Filter Search Bar in the SigNoz Logs Explorer"/>
    <figcaption><i>Filter Search Bar in Logs Explorer of SigNoz</i></figcaption>
</figure>
<br></br>

3. Once you are done adding the filter, click on **Stage & Run Query** to apply the selected filters.


### Step 2: Save Your View

1. With your desired filters in place, click the **Save this view** button to preserve your current setup.
2. A dialog box will appear. Enter a distinct **Label** for your view for easy recall later.

   <figure data-zoomable align='center'>
    <img src="/img/docs/product-features/saved-view/label.jpg" alt="Adding a unique label for a view"/>
    <figcaption><i>Adding a unique label to save a view</i></figcaption>
   </figure>
   <br></br>


3. Confirm by selecting **Save this view**. A popup will confirm that your view has been saved successfully.

   <figure data-zoomable align='center'>
    <img src="/img/docs/product-features/saved-view/popup.jpg" alt="A Popup showing that the view is saved successfully"/>
    <figcaption><i>View saved successfully popup</i></figcaption>
   </figure>
   <br></br>

### Step 3: Access Anytime

Access your Saved Views from the **Logs Explorer** or **Traces Explorer** depending on where they were created.
Locate the dropdown at the bottom of the Explorer and you can select any of your saved views to apply the preset filters to your data instantly.

<figure data-zoomable align='center'>
    <img src="/img/docs/product-features/saved-view/access-view.jpg" alt="Accessing a saved view in Logs or Traces Explorer"/>
    <figcaption><i>Accessing a saved view</i></figcaption>
   </figure>
   <br></br>


<!-- ## Editing and Managing Views

- **Edit** a view by choosing it, modifying the filters, and resaving. You have the option to overwrite an existing view or save as a new one.
- **Delete** a view through the view management options, allowing you to maintain a clean and relevant set of views. -->

## Conclusion

The Saved Views feature streamlines the data analysis process across Logs and Traces Explorers in SigNoz. By delivering a unified and customizable user experience, it underscores our commitment to providing powerful yet accessible tools for data exploration. Ensure that insights from your logs and traces are always readily available with just a few clicks.
