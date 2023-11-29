---
title: SigNoz’s Technical Writing Guidelines
slug: technical-writing-guidelines
description: Before applying to SigNoz technical writing program, we encourage you to go through these guidelines. Most of our articles will be code-based tutorials that help developers accomplish a certain task. As a monitoring tool, we help developers optimize their application performance.
image: /img/website/signoz-technical-writing-guidelines-cover-min.jpg
keywords:
  - techincal writers
  - techincal writer program
  - technical writing
  - community
  - community writing
---

<head>
  <link rel="canonical" href="https://signoz.io/technical-writer-program/"/>
  <meta property="og:image" content="https://signoz.io/img/website/signoz-technical-writing-guidelines-cover-min.jpg"/>
  <meta name ="twitter:image" content="https://signoz.io/img/website/signoz-technical-writing-guidelines-cover-min.jpg"/>

</head>

<div className='announcementContainer'>

# SigNoz's Technical Writing Guidelines

At SigNoz, we are building an observability tool to help developers improve their application performance. As a part of that mission, we want to build a great library of content that helps developers build better applications.

<div align="center">
  <img src="/img/website/signoz-technical-writing-guidelines-cover.webp"
       height = "500" width = "800"
       alt = "Follow these guidelines while writing tech tutorials for SigNoz"/>
</div>

Our [Technical Writing Program](https://signoz.io/technical-writer-program/) is a part of that initiative. We welcome developer authors to participate in our writing program. 

Before applying to the program, we encourage you to go through these guidelines.

Most of our articles will be code-based tutorials that help developers accomplish a certain task. As a monitoring tool, we help developers optimize their application performance. So tutorials helping a developer optimize their application and monitor their application more efficiently can be a great fit.

We use **Notion** for writing articles and collaborating. Once your topic [proposal](https://forms.gle/2zxwVgajMWU5L1fHA) is accepted, you will be given access to a notion workspace to write your article.

Please go through the below-mentioned guidelines for different sections and components in an article.

## Guidelines on different sections of an article

### Introduction: Share the outcome

Explain clearly what the reader will accomplish after reading the article.  For code or monitoring setup tutorials, mention what the final outcome will look like. For example, mention the metrics about the specific technology they would be able to monitor after going through the article. This motivates readers to read through the article. 

If the article is about monitoring a MongoDB instance with OpenTelemetry, the introduction should have a brief overview of key metrics that they can start monitoring about MongoDB after following the article.

### Following Sections & Paragraphs

1. Explain the technology components.<br></br>
A brief introduction about the technology components involved. A lot of our articles involve a deployment of OpenTelemetry Collector to collect monitoring data from users’ applications or servers. In such articles, you should have a brief paragraph explaining what an OpenTelemetry collector is and why it is required.

2. Explain what metrics need to be monitored and why.<br></br>
For articles on monitoring a certain technology with SigNoz, have a section on which metrics can be monitored and why.

### Prerequisites before code samples

You should share all the prerequisites that are required to follow the article. If the article involves reading another article beforehand, then you should clearly mention it in the introduction. 

For code-based tutorials, you must have a prerequisite section mentioning all the components that will be needed to follow the article. If there is versioning involved in the components or for which the tutorial was written, you should mention it in the prerequisites section.

### Conclusion Section

The **Conclusion** of your tutorial should summarize what the reader has accomplished by following your tutorial. Instead of using phrases like “we learned how to,” use phrases like “you configured” or “you built.”

The conclusion should also describe what the reader can do next, which can include a description of use cases or features the reader can explore, links to other SigNoz tutorials with additional setup or configuration, and links to external documentation.

## Guidelines on Code Blocks

If a tutorial contains code blocks, we should enable our readers to trust that code. SigNoz is used for monitoring applications in production environments. To change or implement something in a production environment can be risky. So, the goal of our code tutorials should be to create trust with the readers.

Below are the guidelines for code blocks in SigNoz articles:

- Before every command, mention what the command does and why the user is required to run the command. This introduction should be brief.

- If the code block is lengthy and requires more explanation, then share more details about the code block.
    
- If most of a code file can be left with the default settings, then you can show just the section that needs to be changed.

- Every command should have a detailed explanation, including options and flags as necessary.

- If you’re asking the reader to make some changes in a configuration file, first explain what it does and why you’re asking the reader to make those changes.

This article is a [good reference](https://signoz.io/blog/opentelemetry-rabbitmq-metrics-monitoring/) for what a code tutorial should look like.

### Steps in code instructions

Each step begins with a level 3 heading.

The **Step** sections are the parts of your tutorial where you describe what the reader needs to do and why. A step contains commands, code listings, and files and provides explanations that not only explain **what to do** but also **why you’re doing it this way.**

All commands a reader must run should be on their own line in their own code block, and each command should be preceded by a description that explains what the command does. After the command, provide additional details about the command, such as what the arguments do and why your reader is using them.

## Guidelines on Images

Here are the guidelines for image assets in our articles:

- Share images in `webp` format.
- Share product screenshots in dark mode.
- We use [Excalidraw](https://excalidraw.com/) to create architecture diagrams or any diagram required to explain a concept.
- Only share pictures from the internet where it is absolutely required. Always mention the source of the image in those cases.

How to convert `png`, `jpg` and `jpeg` to `webp` format on macOS.

The below commands will convert all the images in a particular folder to `webp` format. 

Put all your image assets in a folder. From the macOS terminal, run the following commands inside that folder.

For `jpg`:

```bash
for file in *.jpg; do    
          cwebp -q 80 "$file" -o "${file%.jpg}.webp"
done
```

For `png`:

```bash
for file in *.png; do    
          cwebp -q 80 "$file" -o "${file%.png}.webp"
done
```

For `jpeg`:

```bash
for file in *.jpeg; do    
          cwebp -q 80 "$file" -o "${file%.jpeg}.webp"
done
```

## Guidelines for submitting proposals

You can submit your proposals with this [application form](https://signoz.io/technical-writer-program/). We evaluate two things when you submit a proposal in our technical writing program:

- **Quality of your sample writings**<br></br>
  Your sample writings should demonstrate a clear understanding of a concept. Code tutorials should have well-defined instructions that enable readers to level up their skills.

- **Outline of the proposed article**<br></br>
  Before submitting a proposal, please go through the details of our [technical writing program](https://signoz.io/technical-writer-program/) to get an idea of topics that we like. 

Let’s walk you through an example of how to come up with an outline for an article. The shared framework will help you create the outline. Let’s suppose that you are writing a “How-To” Guide with OpenTelemetry. 

### Define what you want readers to accomplish
First, decide on what you want to write about. OpenTelemetry can help you generate and collect three types of signals - logs, metrics, and traces. It provides SDKs in almost all major programming languages.<br></br>

There are also other components, like the OpenTelemetry Collector. But rather than focusing on what’s available in OpenTelemetry, you can focus on the learning outcome for readers. For example, the reader wants to collect Nginx logs, parse them, and create an alert on error logs. Once you have finalized the outcome, then decide on the components of technology needed.

### Decide the scope
It’s good to narrow down the scope of the article. You let readers accomplish a task well. We can do a series of articles if there are deeper use cases.

### List down the tasks and components required
Once you have narrowed down the outcome and scope of the article, think of what’s involved with the outcome you’re trying to achieve. Think of all the processes involved, like deploying an Opentelemetry collector, sending data to SigNoz, etc. Collect all the processes and components involved and write them down.

### Organizing the tasks and processes in an outline**
The previous step will give you the list of tasks and processes involved. The next step is to organize them. Finalize the outline and add some details about each section. Tell us in a few words what the reader will do with each section and why it is important.





</div>