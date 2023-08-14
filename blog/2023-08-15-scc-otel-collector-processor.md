---
title: SigNoz Community Call - Using OpenTelemetry Collector Processor
slug: scc-otel-collector-processor
date: 2023-08-15
tags: [Talks]
authors: ankit_anand
description: Tune in to learn more about OpenTelemetry Collector processors and how you can use them effectively in SigNoz...
image: /img/blog/2023/08/scc_otel_collector_processor_cover.jpeg
keywords:
  - opentelemetry
  - community_call
  - signoz
  - observability
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

<head>
  <link rel="canonical" href="https://signoz.io/blog/scc-otel-collector-processor/"/>
</head>

Tune in to learn more about OpenTelemetry Collector processors and how you can use them effectively in SigNoz with <a href="https://twitter.com/pranay01" rel="nofollow">Pranay</a>, one of the the co-founders at <b>SigNoz</b> , and <a href="https://github.com/serverless-mom" rel="nofollow">Nočnica Mellifera</a>


Below is the recording and an edited transcript of the conversation.

<!--truncate-->


<LiteYoutubeEmbed id="7oqfqYFo1Zg" mute={false} />

<p>&nbsp;</p>

*Find the conversation transcript below.👇*

**Pranay:** Nica, if anybody wants to introduce themselves maybe they can just do it. 

**Nica:** Yeah, so if you have questions or pick things that are on your mind please feel free to drop that in the chat but if you want just to introduce yourself and say hello feel free to join with video or just audio.

Yeah, so if you have questions or pick things that are on your mind, please feel free to drop that in the chat but if you want just to introduce yourself and say hello, feel free to join with video or just audio. 

We don't all have the beautiful lighting rigs that Nika has so no complaints. I currently have one if in case anyone's curious, seven lights running in this little office. I built this office for live streaming from it, so there you go. 

If you just want to say hello either in chat or join the call, we'll do some quick introductions and then we're going to talk a little bit today about the collector. I'll save my funny stories until after we give people a chance to hop on about the collector and my initial confusion. 

**Pranay:** Yeah, those funny stories. Hey Yash thanks for joining in. 

**Yash:** Yeah hi everyone! 

**Pranay:** Hi, Yash. So do you want to quickly introduce yourself, just to see who all joined us? 

**Yash:** Yeah sure, I can go quick. So I'm the founder of a SaaS business and we've been looking at potentially using SigNoz. I'll be honest, I haven't used it yet in production but it's something that we're looking at very seriously. 

Whether we self-host or not that's another decision to be made but I'm right now just learning, looking at tools to capture metrics. We have a very complex SaaS with lots of data to capture, so SigNoz is something that's been on my radar for a while, so yeah I'm happy to learn more. 

**Pranay:** Yeah, nice thanks for dropping in.  

**Yash:** Yeah, of course. 

**Nica:** That's awesome! I'm writing something now about decisions like self-hosting observability and some of the considerations, so that's great that we're at that point. 

So let me introduce myself because I'm a new face in this little Community. My name is Nica,  I use she/ her pronouns, as you'll see in my little thing (referring to Zoom candidate name), but I was previously at New Relic and then worked with a team called TelemetryHub, which was also trying to do open-source observability here in the US. 

The whole time that was happening, I was watching SigNoz happen and watching the great SigNoz Community bloom and so I was very excited and so when I got picked by SigNoz, I was like "*Oh yes yes yes yes*".  

I'm super excited to join the community. I have been diving deep into Kubernetes observability that's not where we're going to be chatting about this time, unless somebody has specific questions about it but that's what I've been in the couple weeks since I joined. 

I spoke recently at the open-source Summit North America about the collector and about engineering a good process and so I've seen kind of the full range of the OTel experience, all the way from "*Hey we're a three-person development shop, and we just need to know if this side is up or down*", to you know there are hundreds of us that we're trying to you know. 

It takes us half an hour to coordinate a push to staging how could we be helped by OpenTelemetry, so kind of both ends of the spectrum. 

**Pranay:** Yeah

**Nica:**  My gosh first of all thank you so much, everybody, for coming out, that's nice, back at New Relic you didn't get people coming to your community events, so that's very special for me.

**Pranay:** Yeah, that's because you will see lots of people joining in and asking many questions, so be ready for that. 

**Nica:**  Also this is you know the degree that working with open-source feels like a team sport, has always been like a really basic thing for me, working in my first few roles in enterprise things where big teams had these huge purchases and they use your product and just never tell you anything about it and it was just like the coffee machine at their office, they could love it or hate it but they would never tell you that fact. Whereas you know working here and looking through issues and seeing people like diving deep and how is this engineered and stuff it's just fantastic.

**Pranay:** Yep

**Nica:** All right so shall we dive in a little bit into the collector, so I wonder Pranay if you'll get us started on How do you understand the collector?, How did you first come to interact with it and what are some special things about using it with SigNoz? 

**Pranay:** Yeah, I think the collector is the main orchestrator in OpenTelemetry, to make OpenTelemetry work, you need to send data to something and then the OTel collector processes it and then it sends data to the backend where data is stored or visualization happens. 

Primarily it has like three components: one is the receiver, where you can have different types of receivers, and you can listen to different sources like AWS Cloudwatch, Redis and the OTel Community has a whole set of receivers there.

The second component is the Processor, which does some processing on the data which is received and then there are exporters which export the data to the next thing for example, in SigNoz we have a SigNoz exporter which exports to SigNoz. 

I think that's the key way to understand collector that you receive data from some places, you process it and then you send it to the next data store or the frontend, where you want to do most things with it. 

Yeah, that's all I understand about the Collector as of now and I think the key piece is the modular architecture, that is, you can have these three stages and then for each stage, you can have different components which you can use and then tie your data pipeline together.

**Nica:** Yeah, I do think that's a key part. I think the two things that got me early on were starting with OpenTelemetry. The first was back in my corporate observabilities, the Collector was like the endpoint, it was the place that gathered all the data including the database and so I spent longer than I am confident enough to admit two months being "*Oh that's what the collector is*" and then someone said "*Oh no it runs the collector on every single lambda*" that it's running and I'm like "*Wait no that's wrong how could*!" Someone's talking about a stateless collector, and I was like "*That's not possible*" and something I learned the correct thing. 

The other part that surprised me is that since a collector is something that is passing information through and can be making semiological decisions based on that information, you can have one collector connected to another. So you can have multiple collectors running inside of sub-clusters.

And so that it can be reasonable to say before you hit the data backend, we’re going to have it hit yet another collector for some other final purpose, e.g like "*Hey you have like five subclusters and then you want to do an average between all of them"* because you have some very high-level metric that you want to see then that can make sense to say "*Hey we have one collector who is just speaking directly to another*."

**Pranay:** Yeah

**Nica:** So modular means you could be going anywhere, you could be doing many many possible things.


<figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/otel-collector.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br>


So there is this concept about the modularity thereof and the part that matters to me is I can see OTLP on both sides, you can be going in and out with the OpenTelemetry protocol, but some of the use cases that we're often talking about with a collector, the most common are some kind of aggregation and rate limiting, don't just send metrics every single moment.

**Pranay:** Yeah

**Nica:** So what I've seen in the past pre-OTel days is, things like implementations on mobile or implementations out at Edge where the large monolithic monitoring had nice batching and rate limiting, out on Edge, it didn't, and so just every time a transaction would occur, it would send a packet and that looked fine in staging and in the test but then when you got into production, it was a complete nightmare for just what the rate of data was that was sent.

Have you seen cases for anywhere you wish "*Oh, I wish we had some kind of batching here for this data that is sent?"*

**Pranay:** Yeah, I think batching is one of the key use cases. One of the many times that people want to use and essentially we want people to send batch things and start sending data. I think one thing you might want to also share, is the different receivers in OpenTelemetry, I don't know if many people are aware of that. 

**Nica:**  Yeah, if you have like a good image or list, thereof feel free to get that up. Something we were talking about this morning, as we were talking about this call, and just in general, was if you go and look at the matrix of what is supported in the different language projects for OpenTelemetry, you'll see that logs are not listed as ready in any of them. 

And so you think "*Oh my God that's not ready for prime time you got to have some logs*", but of course, we are already exporting logs, we're not going in and loading logs manually to the console to see our logs. So this is part of the real power of the collector, it's like "*Hey you're already exporting logs, there is probably already an ingest path to get those logs into OpenTelemetry*. "

**Pranay:**  So if you go to this OpenTelemetry Collector Contrib repo, this is the place where if anybody who builds a receiver or an exporter, can upstream it here and then anybody in the community can use it. So let's start with the receiver, if you see, there are like lots of receivers. 

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/contrib-receiver.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br>

AWS x-ray receiver, if you have Azure, then Azure event hub receiver and then there are receivers like file receiver, which is like the standard file log receiver and file receiver but then there are things like host metrics receiver, where you can start getting data from host metrics., JMX receiver, Kafka receiver, 

So there are a bunch of places where you can start receiving data, by default. This is kind of the modularity concept that you are seeing. If you have a MongoDB implemented you can just enable a MongoDB receiver in the OpenTelemetry collector and that will start getting data from MongoDB, like the metrics of MongoDB etc. 

So it's a very modular way to get data from different types of systems which you might be using, the second piece is the processor where like basically once you have the data, you have to do things like changing the attributes

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/contrib-processor.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br>

Yeah, if so you have to do attributes processing you can do, for example, Kubernetes attributes processor. We use this a lot where you have different attributes which are being sent and then you want to transform that attribute to something else or log transform receive processor where you're getting logs in some format and then you want to transform it to something else. 

**Nica:**  Yeah, and this section is a critical one, I don't mean to just skim over that one because both the logs and the metrics transform are key for a couple of things and most notably for filtering PII data. You're going to realize inevitably that there's some critical personal information that is getting monitored accidentally in a metric name, in something and so you want to make sure that you're familiar with that just as a basic level right when you Start.

**Pranay:**  Yeah, and then one key type of thing which is possible through processes is sampling. So basically for organizations that are sending lots of data, especially for traces, like OpenTelemetry has this thing called Tail Sampling Processor, Probabilistic Sampler Processor, which helps you reduce the amount of data that gets ingested into your data stores. 

So people can use this to save their costs and store what is important to them rather than storing everything. 

**Nica:**  Yeah, the tail sampling processor is really big for traces. I have not implemented a lot of this stuff but I've pointed people to here on the CNCF project. I know people have had a lot of success with it. When you say "*Hey you don't want to send a trace of every single thing that you do, that every user does"*. The generic way to do that is just "*Hey let's just send a percentage of those that go through"*. 

You can also say like "*Hey this user is more important, and has more trading cards on their account so let’s trace their interaction, head based*", but with tail based, you can say "*Hey like the traces that look the worst, I want to send*" and then if your collector is on your network, you're sending nothing over the wire that you're not interested in which is very nice.


**Pranay:** Yeah, and just to dive a little deep, one use case which I see here, especially for companies that are business to business (B2B) is that they want to sample based on particular customers, so if you're a business and then you have different customers, if you just do
probabilistic sampling or head-based sampling, then you don't know which customer is getting sampled how much, right? 

So what you can do in database sampling is that you can specify like use the customer as ID and then for each customer, I will sample 20% or 30% or whatever. So you know that for each customer you are getting a certain amount of data. So this is pretty fascinating. Nica, we can do a session on sampling itself, but not today.

**Nica:**  Yeah, two sessions we can plan now, one obviously on Kubernetes monitoring and one on sampling. 

**Pranay:** The first piece was for the receiver, the second is a processor and the third piece is the exporter where now you can export it to different places. You have got the data, you have processed it and then you can export it to different places. 

There is a clickhouse exporter, you can expose to clickhouse and then there are different vendors where you can export, we also have SigNoz as an exporter but it's not upstreamed yet, you can export to Prometheus, etc. 

These are the data syncs that store this data which we received in processed and then you want to export it later.

**Nica:** Yeah, this is one of the key things I think for really large organizations is just the ability to say "*Hey how locked-in are we to like a particular approach*" and even if you're not like actually changing your provider and you're just saying "*Hey I'm going to start sending you more OpenTelemetry data*", the more OTel you adopt, the more ready you are to say like "*Hey let's just get a different exporter and just send this data someplace else"*

**Pranay:** Yeah, let's talk a little bit and see if anybody has any questions or if anybody has tried implementing this and faced some issues.

**Nica:**  If people had questions about using the collector or if they have had like weird experiences I wanted to talk through that but I don't want to dive too far into sampling, I think it does matter but, people have other questions feel free to hop on.

Yash RV: I have one question, I was learning about OpenTelemetry or collector and I found a term there it's called Service Discovery, so if you could please let me know what is that?

**Nica:** Service Discovery is supposed to allow you to say "*Hey when something starts operating like new metrics to the collector endpoint?"*, we will go ahead and add it to our map automatically and there are a ton of ways to configure this, you can have it as part of like the resources that are available in a container to say "*Hey we want to instrument automatically and so, therefore, haven't grabbed and discovered new service names to report"*. Pranay, can you speak about this a little further?

**Pranay:** Yeah, so just to make this more concrete, service Discovery can be done in many ways. If you are in Kubernetes, you have different services and then based on the metrics you see, you can discover different Services which are there.  


<figure data-zoomable align='center'>
    <img src="/img/blog/2023/08/service-discovery.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

<br></br>

The other way you can do this is through tracing, for example, in this example what we are doing is, we are creating a service map for your infrastructure. If you have different services which are talking to each other, what we do is through the tracing data and because in tracing data we have the knowledge that okay this service is talking to this service and this service is talking to this service right? 

So, we use that data and extract and provide you with a bird's eye view of how your infrastructure is correct, is structured and here you can see details like how fast is the transaction volume between different services and then also if a service is healthy or not.  

Here, the error rate is zero, so this is green but here we are seeing some 18% error and so this is red. So what it helps you do, is it helps you get a bird's eye view on where you should focus your attention and like how your services are connected to each other.

Yash RV:  Thank you.

**Nica:**  Service discovery is super important as a piece of tooling because something that I've definitely seen, I've been working with observability tools for well since before we called it observability and there's kind of this dirty secret about trace data, which is like metrics data very often has a relatively high usage rate of like 50% of that data is accessed at some point. 

Now it might be aggregated, but you still actually look at it, you don't report a metric and then never chart it or never view it. But what is the percentage of traces that are never viewed? It's like the percentage of viewed traces in most systems is like the percentage of helium in the solar system, it's like you know 0.0001 per cent. 

If you think about individual traces like "*Hey the trace of this transaction, you have some rate maybe you're sending 25 traces a cycle and then when you have an outage you go flip through 10-15 traces*", so out of the whole day of maybe thousands of traces sent during a problem you're gonna look at a few of them. 

So what was interesting here and what we found back in open tracing days, was that the map was what people wanted. So we were explaining to people "*Hey here's how you track all these spans and the individual time chunks and maybe even the individual parameters on each of these spans*" and people would say "*Yeah, here's what I want*", you hear this phrase over and over again *"Just show me which services got hit by this request. 

That's all I want I don't care about what happened in each service I just want to know which service got hit"*.

The reality of microservice architecture is that there's just there's a lot of services running, a whole lot of services running and that leads to a feeling of "*I do not know which services are even affected by this"* so you get a call and you hear "*Hey service 21A is down and someone asks well can users still check out on the e-commerce site with service 21A down"* and the answer is always these days "*I don't know*". 

So you wish you could go look at a trace and just know *"Yes, a checkout event does hit service 21A"* and that's the question that way more people have than the actual details from a Trace.

**Pranay:** Yeah, but to be fair you are maybe not accessing a particular trace, but you are using that in an aggregate way to get inside. For example, you may not be accessing the detail of the trace, but you are using the service map to view it, you may not be accessing a specific trace but you are creating the P99 and the APM metrics through that.

In a way you're using trace but you're not opening the complete trace, but you are using the aggregate information from there and getting some insights there.

**Nica:** This is kind of an out-of-date example because, at the start of open tracing, it wasn't good at tagging spans, so you would get spans but you could not be like how long does this span normally take, in early implementation days. 

So this was part of the argument as to why that was important. People are not going to click through and look through individual traces, but yes if you can aggregate together how long is this span taking in general that, of course, was gonna be very useful and then yeah, the big thing was *"How can this inform a service map and do service discovery to show what nodes are being hit on that Network*".

**Pranay:** Cool, we are almost at the end.

**Nica:** We'll be doing these every two weeks I think is our as our target cadence for the next little while, but please do hit us up on the community slack if you have questions and I think that's what we'll start for the start next Monday as we'll just say "*Hey you hit us up with questions and start a thread of questions to answer as we go through it, here's our theme". *

But also just this is so nice to see everybody hop on thank you so much. This is nice and I'm super duper looking forward to it. I did not get together this time but we'll do it next time like most helpful community members, we'll be handing out little awards to the people who have helped other users.

I appreciate seeing that on Slack, so we'll be tracking that and I think there's even talk of maybe some kind of leaderboard that we want to be releasing on the site to say here's some people who are super helpful to those around them.

**Pranay:** Yeah, so I will ping in this link to our Slack group if anybody has any specific questions about SigNoz or if you try SigNoz and have any questions or just in general about OpenTelemetry. 

If you're trying to implement it and have any questions about it, we have been working with OpenTelemetry for the last two years now and have known some of the edge cases around OpenTelemetry, so just feel free to ping us there and we should be able to help you with it. 

**Nica:** And if you're watching this video, a little later than Monday, July 10th, do look down below in the description you'll see the links are attached there both to a couple of the points we're talking about the documentation and to join us on Slack enter RSVP for next time.

**Pranay:** Yeah, Okay 

**Nica:** Thanks so much everybody we're gonna call it there. Thank you so much for joining. 

**Pranay:**  Yeah, thanks. 

---

Thank you for taking out the time to read this transcript :) If you have any feedback or want any changes to the format, please create an <a href = "https://github.com/SigNoz/signoz/issues" rel="noopener noreferrer nofollow" target="_blank" >issue</a>

Feel free to join our Slack community and say hi! 👋 

[![SigNoz Slack community](/img/blog/common/join_slack_cta.png)](https://signoz.io/slack)