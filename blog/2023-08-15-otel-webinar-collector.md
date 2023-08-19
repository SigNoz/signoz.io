---
title: OpenTelemetry Webinars - Gathering data with the OpenTelemetry Collector
slug: gathering-data-with-opentelemetry-collector
date: 2023-08-15
tags: [OpenTelemetry]
authors: priyansh
description: Join Nica and Pranay as we discuss architecting and collecting data with the OpenTelemetry Collector. We discuss using Apache Kafka queues to handle OTLP data, and why you probably shouldn't push OTel data straight to Postgres...
image: /img/blog/2023/08/scc_otel_collector_processor_cover.jpeg
keywords:
  - opentelemetry
  - webinar
  - collector
  - signoz
  - observability
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

<head>
  <link rel="canonical" href="https://signoz.io/blog/otel-webinar-collector/"/>
</head>

Join <a href="https://github.com/serverless-mom" rel="nofollow">Nočnica Mellifera</a> and <a href="https://twitter.com/pranay01" rel="nofollow">Pranay</a> as they discuss architecting and collecting data with the OpenTelemetry Collector. We discuss using Apache Kafka queues to handle OTLP data, and why you probably shouldn't push OTel data straight to Postgres.


Below is the recording and an edited transcript of the conversation.

<!--truncate-->


<LiteYoutubeEmbed id="sL6XvOOAEP0" mute={false} />

<p>&nbsp;</p>

*Find the conversation transcript below.👇*

**Nica:**  Hi everybody! If you're seeing this we're starting up we'll get started in just a moment here. 

This is the first series of OpenTelemetry webinars. This is going to be product agnostic, we're not going to come back and talk about SigNoz a bunch, so don't worry about that. I promise it's not an extended pitch, we're just going to talk about high-level concepts with engineering in OpenTelemetry. 

With me is Pranay (co-founder, CEO SigNoz) and we are going to be talking about some basic stuff with the OpenTelemetry collector today. So we drew a couple of questions mainly from the CNCF slack and those specific questions got answered, so we're not going to be replying to those specific people.

We're not going to get into the individual setup that people had in the questions but you know because we saw some similar questions like this, both on Reddit and obviously in CNCF Slack.

<!-- <figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/question_mike.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br> -->


We would like to talk about their kind of in general and what they kind of lead us to so the first one was from Mike on the CNCF Slack saying 

> "***I’m new to OpenTelemetry, I was thinking that the collector was backed by some sort of data storage but I'm not finding that, I'm just seeing statements here to the contrary if it just spans in the data and passes it on elsewhere***" 


and Pranay I think this is kind of one of the places that a beginner starts is saying "*Hey I thought that OpenTelemetry was a whole project from collecting data all the way to like presenting a cool dashboard with all your metrics and maybe even sending you like alert emails*" but that's not the reality. 

**Pranay:** That's true. So I think one thing which people don't realize is that OpenTelemetry is primarily focused on the instrumentation SDKs where how you send data from applications to the Collector and then basically send data from the collector to other backends. So that's where sort of the scope of the project stops and they don't get into things like data storage visualization

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/otel_basics.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br>


or how to set alerts. So all the things which SRE Engineers or DevOps Engineers use day to day like to sort of configure things out. So just to lay this out in the OpenTelemetry collector landscape, the OpenTelemetry collector can be thought of as a data pipeline processor. 

So you get some data and then basically you do some processing and then you format it and then export it to other backend sources. The three key components of the OpenTelemetry collector are receivers, processors, and exporters. There's a new component also coming up, we will not get there but receiver, processors and exporter - these are the three components. 

The receiver gets data from different sources which you want you can send traces from your applications, you can send logs, you can send metrics you can do some processing on that, for example, if you want to strip it out of PII data, you want to edit some fields, etc. 

So the processor helps you do that and then the exporter sends that data to other sources. It can be a vendor backend, it can be open source projects like SigNoz, or Grafana where you can visualize it or it can just be databases like clickhouse. 

So what OpenTelemetry collector doesn't do or what OpenTelemetry project as such doesn't do is it doesn't get into data storage. It gets data from applications, processes it and then makes the data ready but the onus of storing it, and making the frontend dashboards which projects like SigNoz and Grafana provide, is not part of the scope of the OpenTelemetry project. 

**Nica:** When we talk about OpenTelemetry protocol, it's not fuzzed with how that data is stored. The OTLP is just about encoding transported delivery and doesn't imply like "*Hey this will be stored relationally in the following way*", "*How rich logs or events are stored*", or "*How spans are collected and connected to the traces*", that's not part of the OTLP standard.

**Pranay:** Yeah, so OpenTelemetry specifies the wire format and then any backend or any storage layer which understands that, can sort of store that and play with that. I just wanted to make this clear because I think that is a sort of confusion for many people in the community "*Hey we have heard of OpenTelemetry, the project which does observability but can I get dashboards from it?"*

No, so you have to use some other open-source projects, or other vendor backends to do that part for you to store data. Does it take care of storing data? No, you have to use backends or data stores to do that and then visualize on top of that.

**Nica:** There are some opinionated things especially when we get into processes and those exporters, about how data is going to be stored and definitely can help with making sure that your data is like relatively efficient, both in how it's finally going to be stored and how much bandwidth it's using when it's sending data. 

So obviously this will help you with batch data or compress it, you do things like averaging metrics with processes as well, so you reduce the number of metric sends but it's not specific about how it's it's going to be stored at all.

So yes this is another question that we're not going to get into the specifics of but I think a little bit just about in general so Harsh Thakur asks on the CNCF Slack 

> "***I’d like to use OTLP Gateway but I have this issue on finding a fault-tolerant way of getting into Kafka if I set up an OpenTelemetry collector on the server side to receive OTLP and then export it, I'm afraid those OTel collectors would be a single point of failure***" 

and this is a fairly specific question but it is something that we like often get to when having these discussions about engineering with a collector where it's like "*Hey I'm starting to get worried about where the collector sits in the architecture*" and you know in the thread that follows up with this it sort of becomes a little clearer like it's quite an engineering thing to try to have like OTLP data go into Kafka and come back out. 

<!-- 
<figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/question_harsh.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br> -->


After these questions, we’ll come back to like "Hey I'm really worried about I have maybe somethings far away on my cluster and it's sending data to my collector that I already set up and I'm worried they're going to be errors there, there's gonna be lag there I'm worried about creating a bunch of internal Network traffic and can I set up a queue or some other service inside my architecture to do that" and my understanding is generally that's not necessary because generally, people don't realize like one collector can’t talk to another but can talk about some sort of basic architecture considerations with the collector?

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/otel_collector_data.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br>


**Pranay:** Yeah, so I think this is a good topic which you can dive deep into. So the idea is that we have OpenTelemetry collectors and then we are potentially using some storage backend for it, but what are the different ways in which the apps and nodes can interactively send it? 

So I'll try to cover some details on that and maybe discuss more on that it's more of an introduction to the patterns which we have seen and then maybe if there's more interest you can get into more advanced topics like gateways and load balances in one of the coming sessions.

So let's get started, one of the basic patterns which we have is like you have an OpenTelemetry collector and maybe you're using a storage backend and you have a visualization layer which you can talk data through that and then you can make dashboards around there. 

But, if you have for example applications, if you have a JavaScript application, one common pattern is to send data directly from that application to the OTel collector. So you install an OTel collector and then you get an endpoint for that and in your applications, you directly specify those endpoints and start sending data directly to that.  

Well so this is one of the patterns which people generally get started with, it looks pretty simple. but what are the pros and cons of this? 

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/other_tradeoff.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br>


One thing is that it's very simple, you can just get started in a Dev environment and then get moving. There are no other OTel collectors which you are operating in the application flow. 

The OTel collector is primarily at the observability layer, so you have one main Central OTel collector and that's where you're sending your data from. So it's simple in that way. 

But some of the disadvantages of this approach are that if you want to make any code changes, if you want to do any changes in collection ingestion, then you need to do changes in the code because that is directly tied to the application in the application logic. 

In some teams, the responsibility of managing applications is in a different team, the DevOps team or the SRE team is a different team. So generally what I've seen is this is a good approach to get started with to test. When to start testing and sending data to you, it is not generally used in production so because there's a strong coupling between application code and backend and so what's the next approach? 

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/otel_collector_as_agent.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br>


**Nica:** I just want to say I often think of this solution as being like the developer solution where it's like "*Hey I'm a developer, I'm excited about monitoring my application more closely with OpenTelemetry*" and you may have someone stand up a collector for you or you work your way through it but then you're able to experiment with your application code, instrument your code on your application side and kind of see the results pretty quickly and it's great for that kind of loop where it's like "*Oh I want to maybe do like a custom instrumentation thing and experiment with that quickly"*

But when you're saying "*Hey I want to I want to instrument all 23 microservices and have everybody get on board*", you don't want to be going to the entire Dev team being like "Hey everybody goes in and edits a bunch of code to send data in a different format, because we're not collecting it just because I can't do anything about that otherwise" that starts like a lot less clean and efficient. 

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/otel_collector_data.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br>


So a great place to get started but not too often do you see this, you see this almost as really as you see no OTel collector with just sending data to the backend.  


**Pranay:**  That's true. 

**Nica:**  So back to your slide now, we're back on your path.

**Pranay:**  Yeah so just sending data directly from applications is maybe you might have some issue, what else can you do? So one common partner which you have seen especially people who deploy things on Virtual machines is, you run an OTel collector in each virtual machine and that essentially acts as an agent. 

If you have multiple applications which are running on the virtual machines, the applications there send data to the OTel collector, the machines which are acting in this agent and then all such OTel collectors in the machine send data to the central collector. 

A couple of advantages of this approach are that one it's like simple to get started, you know that okay I have to install one OTel collector and there's a clear mapping between the applications and the OTel collectors, so you know okay this application is sending data to this OTel collector and if you want to do processing there or like do any things like PII data or sampling PII data remover, etc all sampling that can easily be set up on a node level.  

So one of the disadvantages of this approach is that because you are manually setting up OTel collectors in each node, you need to sort of manage that process yourself. I am setting applications and then these OTel collectors are running on these nodes and then they are sending data to this OTel collector. 

So this like the OTel collectors in the nodes needs to be set up by you and then configured properly, so that's sort of the one disadvantage but this is the pattern which is used a lot using agents and then using that to send data to the central collector.

I was just gonna say that even in many vendors you would generally see that they ask you to install an agent in the VM and then that sends data to their endpoint. So this is very similar to that sort of approach.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/otel_collector_as_agent.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br>


**Nica:** I think one of the things we're kind of eliding here but is usually present, is that the first Green Arrow this first screen send is often associated with some cost, so having these collectors left on these virtual machines gives you that chance to batch and debounce and compress and collate a little bit your data to save you a ton of money if you're spending on this end.

I think often these are kind of drawn to scale these three collectors where it's like the ones running on the virtual machines are usually pretty minimal, they may just be batching data and maybe have your most critical PII settings like "*Oh my God if you see you know a credit card number or a social security*" number go ahead and pull that out. 

But otherwise a lot of that config, a lot of that complexity is happening on the other side, here's how you stitch together traces or hear these other kinds of very sophisticated processing steps because you don't want to have to tell everyone with every virtual machine "*Hey, go in and add this config and have that config you just manage it on your Central Secondary collector"*

**Pranay:**  One reason why sometimes this approach is essential, is for example if you are interested in getting infrastructure metrics of the virtual machine, you need to run something on the Node level to get those metrics either, in terms of the node, for example, if you're running Prometheus or you're running host metric receiver, you run that at the node level and send data to this OTel collector which is running on a virtual machine at the node level.

Or if you want syslogs of a machine so generally the approach people take is, you forward all those logs to the OTel collector in the machine and then you send that to the main Center OTel collector. Sometimes this becomes essential.

Let's get to the next. 


<figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/sidecar_pattern.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br>



Let's get to some of the patterns which are also common in the Kubernetes world, there are a couple of patterns that are generally used. One of them is running the OTel collectors as side cards which each application pod, so in this approach with each application container you also run an OpenTelemetry collector container and that collector sends data to the OTel collector.  

What this helps you do is that for each application, there is an OTel collector associated with it and you essentially are agnostic of what the backend you use. If you have an OTel collector here then you can just configure that to point. 

Suppose you are using Jaeger today or SigNoz today as the backend and what you just need to do to change the backend is to change the endpoints or the exporters in this OTel collector. Whatever you have done in the application pod remains the same. 

That's one of the interesting parts of this type of OTel collector. By the way, I've just shown this in the sidecar pattern, for example, just take an example, the things which you see in the dotted green light are what comes with SigNoz, so if you are running an instance of SigNoz itself. 

It comes with a central OTel collector, storage backend which is clickhouse in our case and then the visualization and the query layer. So basically the OTel collectors which are running as sidecars point to the SigNoz OTel collector and then we take care from there. 

**Nica:**  I think this is one of the things where you see why maybe some vendors who are out vending previously maybe selling like closed Source SaaS observability are a little bit nervous about the existence of the OpenTelemetry project. 

There's there's definitely an effort to Embrace those standards but there's also a little bit of concern, I think one of the reasons is this very basic thing of like "*Hey you can just configure this to send to a different you know OpenTelemetry endpoint*" and so you know yes of course they're gonna have very different advantages and disadvantages and tools like Prometheus and tools like Jaeger are going to have different like use cases. 

But you know I think there is some nervousness in the SaaS world, it's like "*Hey if you get this running in a config like this it's very very easy to have all of these sidecars hitting the same point for a config file, this is where we're sending our data this is the side collector that we're sending to*" and then you know the process of migration should be pretty straightforward  because you can just say "*Hey I think this will do better visualizations this will take a better look at my traces, the storage makes more sense on this platform and then you can just configure away and be migrated onto somebody else*."

This is not to get all like industry insider but I think that that is one of the reasons why we say "*Hey this is worth exploring*" because it's not that fun, to be getting some nice observability data and then discover like no I am stuck with this vendor, there is no way to see anything like this with any other tool and certainly not with an open source tool. So that's one of the great things about using OpenTelemetry and the OTLP standard fully.

**Pranay:**  Yeah, I think essentially what the OpenTelemetry project has done is democratized the instrumentation layer and I think that's very fascinating and then a lot of projects can offer for example products like SigNoz can be as the backend and just relax built on top of the OpenTelemetry collector. 

Yeah just getting back on this topic of sidecar patterns, some of the things which also you can do because of each OTel collector being tied to an application, you can do much more better fine-tuning for how much OTel resource you want to allocate to the certain character. 

For example, if you have an application that is sending a lot of data or needs or is an important application and you want to monitor it well then you can assign more resources to those OTel collectors which are attached to that application part. 

And this pattern gives you much more configurability or way better configuration ability of the OTel collector for each of those applications separately and then because all of these OTel collectors are acting independently for each of these applications if you are running the system at a scale generally the load balancing is much easier because if the OTel collector in the observability system is scaling, what you want to do is ensure that all these systems or all these parts in the OpenTelemetry collector which are in the application pod can scale much faster. After all, they are independently sending data to the OTel collector and because the aggregation level happens at the application level, that traffic sorts of smoothen outs and it's much easier to handle higher workloads. 


<figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/sidecar_tradeoff.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br>


The other only disadvantage or one of the disadvantages of this is that because you are running an application pod with each, like an OTel collector with each of the application pods, you are just running so many of them and that is higher resource requirements. 

So generally the OTel collector should run within five to ten megabytes and then if you say are running 100 pods. that sort of scales up.


**Nica:**  If you're running nano-services maybe you need to start worrying about that you've pushed beyond the micro threshold. Let's talk about this let's talk about this last model here.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/daemonset_pattern.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br>


**Pranay:** I think this is a trade-off between the application sidecar pattern and sort of the first-second pattern which you saw in the VM world where an OTel collector is running at a node level.

So basically this is the daemon set patterns in Kubernetes where rather than running things with each application pod, you are running one OTel collector, each on each virtual machine and what it does, gives you flexibility enough to control things at the node level but at the same time they're like not as many application pods.   

The amount of resource requirement is not as much. The other Advantage is that because you're still running the OTel collector very close to the application pod, the application can just offload data much easier rather than sending it to the (say) Central OTel collector via Network. 

So you're still within the confines of your private net of the machine, the application offloads data very easily and then the OTel collector in the node has the responsibility of sending things to the central OTel collector. 

What do you lose with this setting? and the trade-off here is that because there is only one OTel collector in each node you lose the fine-tuning capability which you talked about, for example, you can't resource allocate for a particular OTel collector based on the particular application pod, it needs to be based on the whole node.

**Nica:** So if you have a single part that's like sending a crazy amount of data, you're like "*Oh I want to go in with the processor and clamp down on the amount of data that's being sent*", yeah theoretically possible maybe you can do it based on how the data is being tagged, but just not as easy to say "*We sort of have very different collection strategies for the different pods that are running in the within this cluster*", that's not as easy to do. 

**Pranay:** Yeah and like one other thing a set point here is that, because you are running things at the node level so it's difficult to do application-level multi-tenancy here, for example, if you want to run something where different applications belong to different tenants, that's difficult to do here because there's a single node here and hence you can't do different sampling for each tenant or different resource allocation for each tenant. So yeah basically that's the trade-off. 

**Nica:** We have a great question that just came in via chat I've put up thrown up on the screen here 

> "***How could we have a push-based system where the new pod will push the metrics and logs to a common collector***" 
 
So help me parse push-based system here because I want to make sure that we're answering this question well. 

<!-- <figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/question_vignesh2.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br> -->


**Pranay:** Well, two systems can happen either it's a pullback system or a push-based system.

**Nica:** Okay

**Pranay:** Generally Prometheus is one of the formats which is famous for the pull base system, basically what happens in the case of Prometheus is that you expose data at a particular endpoint and then you have a Prometheus scraper which goes ahead and then scrapes at the endpoint. 

So that's a pull-based system and a post-based system is you have some data and then you are sending the data to the OTel selector. For example, this is the default mode in which OpenTelemetry SDKs work, you have some data and then you have a queue in that and then you push that to the collector.

**Nica:**  In general, if you're going in and doing config on your new pods to say "*Hey here's the collective location, here's the OpenTelemetry SDK let's say it's a Java pod and it's running a job application and you go and configure it with the Java OpenTelemetry SDK*", that's going to work great I think another part of this question is discovery, but we want this to just happen when we split up a new pod we want to expect that it's going to be pushing data to the collector. 

**Pranay:** Yeah regarding this question, I am not very clear. How can we have a push space system where the new pod will push the metrics and logs to a common collector? I think the default way in which OpenTelemetry works is push. 

For example, if you are using a host Matrix receiver in OpenTelemetry then for example in this pattern (referring to OTel collector as Agent in a node image) where we have an OTel collector running in a virtual machine and you want to, for example, get the host metrics, that by default, as far as I understand, a push-based model where OTel collectors take these metrics and then push to the central OTel collector.

**Nica:** And you should be able to configure and this is something I've been thinking about writing about and so I promise commenter that we'll probably see some documentation about this in the next few weeks. It’s like you should be able to look up within your cluster and go and find your collector and like start reporting to it automatically with the new setup.

It's the whole process of auto-instrumentation and just adding open television the OpenTelemetry SDK as a dependency, that's gonna your mileage is gonna vary a little bit on that depending on your language and framework, but we may have a couple of use cases that I'm aware of where somebody says "*How I'm going to deploy my rails application*", for example, go to deploy to the new pod and it just goes ahead and grabs the rails SDK sets up auto-instrumentation and is immediately reporting to the right collector because you should be able to look up that that collector locally on your cluster.

**Pranay:** Yeah 

**Nica:** That's a great question thank you so much for running out of this very very topical so but by the way if anybody else has any other questions in chat we're gonna be wrapping up shortly so please drop them into chat and we will see them and respond to them.

**Pranay:**  Yeah I think let's try to finish. We have discussed the daemon set pattern and why sometimes multi-tenancy might be difficult to configure here. One thing which I want to point out here, especially for the Kubernetes world is an OpenTelemetric operator, I think many people are not aware of this.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/Otel_operator.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br>


**Nica:**  Yeah the OpenTelemetry operator is not the most well-understood or super popular thing, so worth talking about.

**Pranay:** If you are in the Kubernetes world, there is this concept called "*Operator*". So what OpenTelemetry has done, is has given out default operators which you can run in your Kubernetes cluster and currently it provides three deployment modes. 

One is the deployment mode, where it runs overall over the whole Kubernetes cluster, the second is the sidecar mode which we talked about where a collector is tied to a particular application pod and the third is a daemon set mode where it is tied to a node.

If you see this graph, 

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/daemonset_pattern.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br>


here we have a single pod and here we have multiple application pods, what happens is if you have multiple says 100 or such application pods, it becomes difficult to manage the OTel collector parts. 

So you have a bunch of OTel collectors running, how do we manage them?, How to ensure that they are if they are dying they are coming up again? And their resources are allocated properly, so that's what the OpenTelemetry operator does. You can specify if you want to run this OpenTelemetry operator in deployment mode, sidecar mode, or in daemon set mode. 

For example, in sidecar mode it can it will automatically inject the instrumentation SDKs and then start reporting data to you. So I've added a link to a tutorial that we have on our site also of how you can use this but if you're in the Kubernetes world and are exploring OpenTelemetry, you should check this out. For most of the languages at least for JavaScript, Java, and Python, the auto instrumentation works well and you should be able to get started very quickly.

**Nica:**  Yeah this is a very powerful tool that gets some real traction with what's possible and we have a couple more questions. 

<!-- <figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/question_rajesh.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br> -->


> "***Can you touch base please on the resiliency part? In OpenTelemetry collector down time we lose data even though we're running multiple pods, during the switch we lose some data***" 

At the top level, there's a single collector involved at one point so while that collector's down, in general, you're gonna be missing some data during that time other considerations about this I you know very often these like relatively quite short outages are not usually the biggest concern but can we talk a little bit about this.

**Pranay:**  For each OTel collector there's a queue on top of this and generally like I've called this just a single OTel collector like a single block but because the OTel collecter is horizontally scalable, you generally run a fleet of OTel collectors here, so in the observability section, the common OTel collector is not generally a single OTel collector, it's a fleet of OTel collectors running and you have queues in front of it. 

A lot of the resolutions come from the horizontal scalability of it and the queue that is associated with it, though sometimes, if the outages are much longer, one of the recommended patterns is to get a Kafka queue or some other sort of queue in front of the OTel collector, so that even though the OTel collector is down, you can have some data or the type of data which you have, so that is one of the patterns which you have seen.   

Nica, I think this might be a good topic to dive deeper into, like how this works, because here we have taken an example of a single OTel collector but the OTel collector is not generally a single OTel collector, it's like multiple OTel collectors running as a fleet. So even if one OTel collector is down you have a load balancer in front which redirects to the OTel other OTel.

**Nica:** Yeah and the next question that we have goes back to a question is,

> "***Is it possible to use Kafka in front of the central collector to provide some resiliency in case the backend (that central collector goes down to) goes down?"*** 

<!-- <figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/question_pranav.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br> -->


and so I think we're going to cover this more in-depth in the future, I think that the short version is yes, it is possible to use Kafka. There's a great deal of lift there because OTLP is not super native there, but there is a bit more resiliency than you see in this initial version of this chart.

Let's get back to that one about resiliency and the kind of advanced conceptualization. There's another great question 

> "***Is there any OpenTelemetry operator available for ec2 host metrics in specific?***" 

<!-- <figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/question_vignesh.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br> -->


and the answer to that is not exactly, it's not necessarily going to pick up or there's not like a build of the Kubernetes  OTeloperator for ec2. There is a collector which is the AWS distro for the OpenTelemetry collector which does grab some specific ec2 metrics directly and has a couple of other specified pieces including, a receiver for x-ray data and some other AWS-specific stuff. 

So I think that's probably what's worth checking out is that specific AWS distro of the OpenTelemetry collector. 

**Pranay:** Yeah just check this OpenTelemetry collector receiver or repo. It has listed out all the receivers, I'm not sure if any operators are specifically available but the host metrics receiver comes by default.

**Nica:** A lot of what you need for ec2 monitoring you're gonna get just sort of directly on host metrics from a default collector and then checking out the OTel collector's receiver libraries. There's going to be more there and then also this AWS version of the OTel collector which is a little more specialized into some of the cloud watch stuff that you want to adapt over to OpenTelemetry as well.

**Pranay:** Yeah 

**Nica:** If there are more questions on that especially we'd love you to hop into our Community Slack and discuss this a little bit further. 

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/follow_us_poster.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br>


We would love to talk about this a little, especially if there's a lot of interest in specifically doing this on AWS, that's its topic. 

If you're seeing this on LinkedIn do go ahead and give us a follow there, you can go ahead and subscribe and hit notifications on YouTube if you're watching this on YouTube and then also we'll share it in our community Slack and on CNCF events when we're when we're doing the next one of these sessions. Do we have other kind of final thoughts or stuff we wanted to share?

**Pranay:**  No I think this is great. We have had lots of good questions and we also have got some good questions on what you can chat about more. If anybody is interested like we are quite active in a Slack community, so just join us there and we can continue the conversation there.

**Nica:** Thank you so much for joining us, everybody. We're gonna wrap it here, again if you have questions feel free to add them as comments on the video especially for future episodes and we will talk soon.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/nica_and_pranay_end.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br>


**Pranay:** Yeah, thanks a lot bye. 


---

Thank you for taking out the time to read this transcript :) If you have any feedback or want any changes to the format, please create an <a href = "https://github.com/SigNoz/signoz/issues" rel="noopener noreferrer nofollow" target="_blank" >issue</a>

Feel free to join our Slack community and say hi! 👋 

[![SigNoz Slack community](/img/blog/common/join_slack_cta.png)](https://signoz.io/slack)