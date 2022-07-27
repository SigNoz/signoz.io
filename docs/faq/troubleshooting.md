---
id: troubleshooting
title: FAQ - Troubleshooting
description: Frequently Asked Question for SigNoz Troubleshooting.

---

### 1. My services are not showing up in the Service Map section (but present in the services and traces tab), what should I do?

Service Map is in the Beta stages currently. 

If you zoom out the Service Map, your service should be visible. Since your service would not be connected to the current hotrod services, it’s appearing isolated.


### 2. How to run SigNoz in debug mode?

You might want to follow our troubleshooting docs. 

Refer here: 
- [SigNoz Troubleshooting Docs](https://signoz.io/docs/install/troubleshooting/#kubernetes)
- [SigNoz Troubleshoot Github Repository](https://github.com/SigNoz/troubleshoot)
- [SigNoz YouTube Video on Troubleshooting](https://www.youtube.com/watch?v=Y7OkvmuTRQ8)


### 3. How do I know if SigNoz is accessible from my Application?

We have a troubleshooting guide to check if  SigNoz is accessible from your application or not or, is the instrumentation not working or the application is not instrumented in the first place?

Set `OTEL_TRACES_EXPORTER=console` and observe. If it doesn’t output the traces to the stdout, the instrumentation is not working or your application isn’t correctly instrumented in the first place. 

Refer here: 
- [SigNoz Troubleshooting Docs](https://signoz.io/docs/install/troubleshooting/#kubernetes)
- [SigNoz Troubleshoot Github Repository](https://github.com/SigNoz/troubleshoot)
- [SigNoz YouTube Video on Troubleshooting](https://www.youtube.com/watch?v=Y7OkvmuTRQ8)



### 4. I have installed SigNoz on Windows Kubernetes, But I can't make it work. I followed the troubleshooting guide and there seems there are no problems. 

We don't support Microsoft Windows as of now. You could try this on Linux k8s or Mac k8s. 



### 5. I am not seeing all my services related to my application listed in the Services tab, what could be the potential reason? 

The Services tab currently shows/lists the services that are SERVER type, this is by design.









