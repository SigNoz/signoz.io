import type { CustomersPageContent } from '@/components/Customers/Customers.types'

// Page-level content for /customers/ (featured videos, quote carousel, proof wall, blog story cards).
// Build-coupled by design: editing this file ships via a normal site deploy.
export const CUSTOMERS_PAGE_CONTENT: CustomersPageContent = {
  featuredVideos: [
    {
      company: 'Kernel',
      videoId: '0ZrTqonLE-I',
      title: 'Kernel customer video',
    },
    {
      company: 'Shaped',
      videoId: 'p4-dJkDtUbw',
      title: 'Shaped customer video',
    },
    {
      company: 'Alien Intelligence',
      videoId: '0-IRNacWDDA',
      title: 'Alien Intelligence customer video',
    },
  ],
  quoteCarousel: [
    {
      segments: [
        {
          text: 'We’ve transitioned from ',
        },
        {
          text: 'Grafana to SigNoz',
          emphasis: true,
        },
        {
          text: ', offering a simplified, unified monitoring, logging, and alerting experience.',
        },
      ],
      person: 'Mark Nelson',
      role: 'Oracle Backend for Microservices & AI',
      company: 'Oracle',
      logo: '/svgs/customer-logos/oracle.svg',
      href: 'https://www.linkedin.com/posts/marknelson6_oracle-backend-for-microservices-and-ai-activity-7366870519129731073-cgU2',
      sourceLabel: 'View the original post',
    },
    {
      segments: [
        {
          text: 'Without SigNoz, ',
        },
        {
          text: 'we cannot achieve what we promise to our users',
          emphasis: true,
        },
        {
          text: ', which is crazy reliable infrastructure.',
        },
      ],
      person: 'Hiro Tamada',
      role: 'Founding Engineer',
      company: 'Kernel',
      logo: '/img/case_study/logos/kernel-logo.svg',
      href: '/customers/kernel/',
      sourceLabel: 'Read the story',
    },
    {
      segments: [
        {
          text: 'Every single time we have an issue, ',
        },
        {
          text: 'SigNoz is always the first place to check',
          emphasis: true,
        },
        {
          text: '.',
        },
      ],
      person: 'Karl Lyons',
      role: 'Site Reliability Engineer',
      company: 'Shaped',
      logo: '/img/case_study/logos/shaped-logo.svg',
      href: '/customers/shaped/',
      sourceLabel: 'Read the story',
    },
  ],
  proofWall: {
    quotes: [
      {
        attribution: 'Mark Nelson · Oracle Backend for Microservices & AI',
        company: 'Oracle',
        href: 'https://www.linkedin.com/posts/marknelson6_oracle-backend-for-microservices-and-ai-activity-7366870519129731073-cgU2',
        logo: {
          cardWidth: 100,
          imageSrc: '/svgs/customer-logos/oracle.svg',
          isWordmark: true,
          name: 'Oracle',
          quoteWidth: 88,
        },
        quote:
          'We’ve transitioned from Grafana to SigNoz, offering a simplified, unified monitoring, logging, and alerting experience.',
        themes: ['Migration & consolidation', 'Unified observability'],
      },
      {
        attribution: 'Leo Blondel · CTO',
        company: 'Alien Intelligence',
        href: '/customers/alien-intelligence-ai-sre-workflow-signoz/',
        logo: {
          imageSrc: '/img/homepage/customer-logos/alien-intelligence.webp',
          name: 'Alien Intelligence',
        },
        quote:
          'Datadog came back and said, “The trial’s over — it’s going to cost you over $2K.” I was like, “Sorry, what?”',
        themes: ['Migration & consolidation'],
      },
      {
        attribution: 'Doug Drechsel · Oracle Developers',
        company: 'Oracle',
        href: 'https://medium.com/oracledevs/observability-the-smart-way-automating-metrics-in-java-microservices-2f82340114cb',
        logo: {
          cardWidth: 100,
          imageSrc: '/svgs/customer-logos/oracle.svg',
          isWordmark: true,
          name: 'Oracle',
          quoteWidth: 88,
        },
        quote: 'We chose SigNoz to tie it all together.',
        themes: ['Unified observability'],
      },
      {
        attribution: 'Akhil Sharma',
        company: 'Armur AI',
        href: 'https://www.linkedin.com/posts/akhilsails_at-armur-ai-we-removed-all-observability-activity-7363461664848957440-LbW2',
        logo: {
          imageSrc: '/img/homepage/customer-logos/armur-ai.webp',
          name: 'Armur AI',
        },
        quote:
          'At Armur AI, we removed all observability tools and have been using only one — SigNoz.',
        themes: ['Migration & consolidation', 'Unified observability'],
      },
      {
        attribution: 'The Inkeep team',
        company: 'Inkeep',
        href: '/customers/inkeep-ai-agent-monitoring/',
        logo: {
          cardWidth: 104,
          imageSrc: '/svgs/icons/inkeep.svg',
          isWordmark: true,
          name: 'Inkeep',
          quoteWidth: 96,
        },
        quote: 'We’ve been using SigNoz as a first-class dependency in our new agent framework.',
        themes: ['Agent-native observability'],
      },
      {
        attribution: 'Karl Lyons · Site Reliability Engineer',
        company: 'Shaped',
        href: '/customers/shaped/',
        logo: {
          cardWidth: 104,
          imageSrc: '/img/case_study/logos/shaped-logo.svg',
          isWordmark: true,
          name: 'Shaped',
          quoteWidth: 94,
        },
        quote: 'Every single time we have an issue, SigNoz is always the first place to check.',
        themes: ['Migration & consolidation', 'Debugging & scale'],
      },
      {
        attribution: 'Doug Drechsel',
        company: 'Oracle',
        href: 'https://www.linkedin.com/posts/dougdrechsel_streamlining-kafka-microservices-and-observability-activity-7457462317891588097-H8nC',
        logo: {
          cardWidth: 100,
          imageSrc: '/svgs/customer-logos/oracle.svg',
          isWordmark: true,
          name: 'Oracle',
          quoteWidth: 88,
        },
        quote: 'One environment variable. Full Kafka observability. Zero code changes.',
        themes: ['Setup & self-hosting', 'Unified observability'],
      },
      {
        attribution: 'Eugene Evenwel',
        company: 'The Website Engineer',
        href: 'https://thewebsiteengineer.com/blog/how-we-saved-90-on-our-monitoring-bill-by-dropping-new-relic-for-signoz/',
        logo: {
          imageSrc: '/img/homepage/customer-logos/website-engineer.webp',
          name: 'The Website Engineer',
        },
        quote: 'We made the switch to self-hosted SigNoz — and haven’t looked back since.',
        themes: ['Migration & consolidation', 'Setup & self-hosting'],
      },
      {
        attribution: 'Andrew · @buzahuza',
        href: 'https://x.com/buzahuza/status/1943072730825232893',
        quote:
          'We replaced our Grafana–Prometheus–Alertmanager–Loki stack with it and we are happy.',
        themes: ['Migration & consolidation', 'Unified observability'],
      },
      {
        attribution: 'Hiro Tamada · Founding Engineer',
        company: 'Kernel',
        href: '/customers/kernel/',
        logo: {
          cardWidth: 96,
          imageSrc: '/svgs/icons/kernel.svg',
          isWordmark: true,
          name: 'Kernel',
          quoteWidth: 88,
        },
        quote: 'SigNoz MCP has been a very big part of our engineering life.',
        themes: ['Agent-native observability', 'Debugging & scale'],
      },
      {
        attribution: 'Stelios Pavlidis · Founder, Whatoblock.com',
        href: 'https://www.linkedin.com/posts/steliospavlidis_observability-devops-sre-activity-7417883949152174080-vGcf',
        quote:
          'Without centralized tracing and logging, this would have taken much longer to isolate.',
        themes: ['Debugging & scale', 'Unified observability'],
      },
      {
        attribution: 'Shawn Zhu',
        company: 'Ariso',
        href: 'https://ariso.ai/blog/signoz-mcp-the-morning-after',
        logo: {
          imageSrc: '/img/homepage/customer-logos/ariso.webp',
          name: 'Ariso',
        },
        quote: 'Now I have a context-aware ops assistant.',
        themes: ['Agent-native observability'],
      },
      {
        attribution: 'Subomi Oluwalana · Founder & CEO',
        company: 'Convoy',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7212117589068591105/',
        quote:
          'We use OTel with SigNoz to spot redundant database connect calls. We found that our database driver wasn’t using the connection pool even though the documentation claimed otherwise.',
        themes: ['Debugging & scale'],
      },
      {
        attribution: 'Dhruv Garg · Tech Lead',
        company: 'Nudge',
        href: 'https://www.linkedin.com/posts/dhruv-garg79_signoz-docker-kubernetes-activity-7205163679028240384-Otlb/',
        quote: 'SigNoz is one of the best observability tools you can self-host hands down.',
        themes: ['Setup & self-hosting'],
      },
      {
        attribution: 'Vivek Bhakta · CTO',
        company: 'Wombo AI',
        href: 'https://x.com/notorious_VB/status/1701773119696904242',
        logo: {
          cardWidth: 104,
          imageSrc: '/img/case_study/logos/WomboLogo.svg',
          isWordmark: true,
          name: 'Wombo',
        },
        quote: 'We use SigNoz and have been loving it — can definitely handle scale.',
        themes: ['Debugging & scale'],
      },
      {
        attribution: 'Pranay Narang · Engineering',
        company: 'Azodha',
        href: 'https://x.com/PranayNarang/status/1676247073396752387',
        quote:
          'Recently moved metrics and logging to SigNoz. Gotta say, absolutely loving the tool.',
        themes: ['Migration & consolidation', 'Unified observability'],
      },
      {
        attribution: 'Sheheryar Sewani · Founder',
        company: 'HTTPScout',
        href: '/customers/observability-for-small-teams-and-solopreneurs/',
        logo: {
          cardWidth: 108,
          imageSrc: '/img/case_study/logos/HTTPSCOUT.svg',
          isWordmark: true,
          name: 'HTTPScout',
        },
        quote:
          'I’m glad I tried SigNoz. Setting up SigNoz was easy — they provide super helpful instructions along with a docker-compose file.',
        themes: ['Setup & self-hosting'],
      },
      {
        attribution: 'Daniel Schell · Founder & CTO',
        company: 'Airlock Digital',
        href: 'https://x.com/danonit/status/1749256583157284919',
        quote: 'Have been deep diving SigNoz. Seems like the new hotness for an all-in-one.',
        themes: ['Unified observability'],
      },
      {
        attribution: 'Go Frendi Gunawan · Data Engineer',
        company: 'Ctlyst.id',
        href: 'https://x.com/gofrendiasgard/status/1680139003658641408',
        quote:
          'Monitoring done. Thanks to SigNoz, I don’t have to deal with Grafana, Loki, Prometheus, and Jaeger separately.',
        themes: ['Migration & consolidation', 'Unified observability'],
      },
      {
        attribution: 'Anselm Eickhoff · Software Architect',
        href: 'https://x.com/ae_play/status/1572993932094472195',
        quote:
          'SigNoz can run locally, has a special tutorial for OpenTelemetry and Rust, and traces show up immediately.',
        themes: ['Setup & self-hosting', 'Debugging & scale'],
      },
      {
        attribution: 'Apoorva Kumar · Lead Backend Infrastructure Engineer',
        company: 'NuCash',
        href: 'https://www.linkedin.com/posts/apoorva-kumar_its-0319-am-ist-just-deployed-signoz-activity-6988981099896967168-c7yf',
        quote:
          'Just deployed SigNoz to an EKS cluster. Everything works like a charm. I am really impressed with the documentation and dashboard.',
        themes: ['Setup & self-hosting'],
      },
      {
        attribution: 'Pawan Bhadauria · VP Engineering',
        company: 'Outplay',
        href: '/customers/outplay/',
        logo: {
          cardWidth: 104,
          imageSrc: '/img/users/outplay.svg',
          isWordmark: true,
          name: 'Outplay',
        },
        quote: 'We are using SigNoz at Outplay and our experience has been great.',
        themes: ['Debugging & scale'],
      },
      {
        attribution: 'Faris Hassan · Lead Data Scientist',
        href: 'https://x.com/Iamfarisology/status/1553787074339381249',
        quote: 'What’s better than Datadog? Open source.',
        themes: ['Setup & self-hosting', 'Migration & consolidation'],
      },
      {
        attribution: 'Vijaya Perumal · Tech Lead',
        company: 'Outplay',
        href: '/customers/outplay/',
        logo: {
          cardWidth: 104,
          imageSrc: '/img/users/outplay.svg',
          isWordmark: true,
          name: 'Outplay',
        },
        quote:
          'We optimized our top endpoints and fine-tuned database calls to improve backend API response times by 35% using SigNoz.',
        themes: ['Debugging & scale'],
      },
      {
        attribution: 'Alexandre Moray · Senior Software Engineer',
        company: 'Linkcy',
        href: '/customers/linkcy/',
        logo: {
          cardWidth: 98,
          imageSrc: '/img/case_study/logos/linkcy-logo-white-1.png',
          isWordmark: true,
          name: 'Linkcy',
        },
        quote:
          'The open-source nature and OpenTelemetry support make SigNoz a perfect fit for our growing fintech infrastructure.',
        themes: ['Setup & self-hosting', 'Unified observability'],
      },
      {
        attribution: 'Avneesh Kumar · VP Engineering',
        company: 'Mailmodo',
        href: '/customers/mailmodo/',
        logo: {
          cardWidth: 108,
          imageSrc: '/img/case_study/mailmodo-logo-white.svg',
          isWordmark: true,
          name: 'Mailmodo',
        },
        quote:
          'The ingestion rates and search speeds with SigNoz have significantly improved our troubleshooting speed.',
        themes: ['Debugging & scale'],
      },
      {
        attribution: 'Rajdeep Singh',
        href: 'https://rajdeep01.medium.com/how-i-self-hosted-signoz-on-windows-one-nasty-segfault-and-all-d8ae3e8b0914',
        quote: 'The config it needs is almost embarrassingly small.',
        themes: ['Setup & self-hosting'],
      },
    ],
    logos: [
      {
        imageSrc: '/img/homepage/customer-logos/alien-intelligence.webp',
        name: 'Alien Intelligence',
      },
      {
        imageSrc: '/img/homepage/customer-logos/ariso.webp',
        name: 'Ariso',
      },
      {
        imageSrc: '/img/homepage/customer-logos/armur-ai.webp',
        name: 'Armur AI',
      },
      {
        cardWidth: 90,
        imageSrc: '/svgs/customer-logos/auvik.svg',
        isWordmark: true,
        name: 'Auvik',
      },
      {
        cardWidth: 116,
        imageSrc: '/svgs/icons/blackforestlabs.svg',
        isWordmark: true,
        name: 'Black Forest Labs',
      },
      {
        cardWidth: 92,
        imageSrc: '/svgs/icons/blaxel.svg',
        isWordmark: true,
        name: 'Blaxel',
      },
      {
        imageSrc: '/svgs/customer-logos/cisco.svg',
        name: 'Cisco',
      },
      {
        componentKey: 'eltropy',
        cardWidth: 92,
        name: 'Eltropy',
        viewBox: '72 170 1056 280',
      },
      {
        imageSrc: '/img/homepage/customer-logos/fiscalnote.webp',
        name: 'FiscalNote',
      },
      {
        cardWidth: 108,
        imageSrc: '/svgs/customer-logos/flutterwave.svg',
        imageClassName: 'brightness-0 invert',
        isWordmark: true,
        name: 'Flutterwave',
      },
      {
        cardWidth: 108,
        imageSrc: '/svgs/icons/formance.svg',
        isWordmark: true,
        name: 'Formance',
      },
      {
        cardWidth: 104,
        imageSrc: '/svgs/customer-logos/formstack.svg',
        isWordmark: true,
        name: 'Formstack',
      },
      {
        imageSrc: '/img/homepage/customer-logos/harmonic.webp',
        name: 'Harmonic Inc.',
      },
      {
        cardWidth: 110,
        imageSrc: '/svgs/customer-logos/harmonic-ai.svg',
        isWordmark: true,
        name: 'Harmonic.ai',
      },
      {
        cardWidth: 104,
        imageSrc: '/svgs/icons/inkeep.svg',
        isWordmark: true,
        name: 'Inkeep',
        quoteWidth: 96,
      },
      {
        cardWidth: 96,
        imageSrc: '/svgs/icons/kernel.svg',
        isWordmark: true,
        name: 'Kernel',
        quoteWidth: 88,
      },
      {
        cardWidth: 116,
        imageSrc: '/svgs/icons/kognitos.svg',
        isWordmark: true,
        name: 'Kognitos',
      },
      {
        cardWidth: 108,
        imageSrc: '/svgs/customer-logos/lenskart.svg',
        imageClassName: 'brightness-0 invert',
        isWordmark: true,
        name: 'Lenskart',
      },
      {
        cardWidth: 102,
        imageSrc: '/svgs/customer-logos/lg-electronics.svg',
        isWordmark: true,
        name: 'LG Electronics',
      },
      {
        imageSrc: '/img/homepage/customer-logos/moneyhub.webp',
        name: 'Moneyhub',
      },
      {
        cardWidth: 100,
        imageSrc: '/svgs/customer-logos/oracle.svg',
        isWordmark: true,
        name: 'Oracle',
        quoteWidth: 88,
      },
      {
        cardWidth: 92,
        imageSrc: '/svgs/icons/hedra.svg',
        isWordmark: true,
        name: 'Hedra',
      },
      {
        imageSrc: '/img/homepage/customer-logos/racing-and-sports.webp',
        name: 'Racing & Sports',
      },
      {
        cardWidth: 98,
        imageSrc: '/svgs/customer-logos/sail-research.svg',
        imageClassName: 'brightness-0 invert',
        isWordmark: true,
        name: 'Sail Research',
      },
      {
        cardWidth: 92,
        imageSrc: '/svgs/icons/salient.svg',
        isWordmark: true,
        name: 'Salient',
      },
      {
        cardWidth: 98,
        imageSrc: '/svgs/icons/sarvam.svg',
        isWordmark: true,
        name: 'Sarvam AI',
      },
      {
        cardWidth: 104,
        imageSrc: '/img/case_study/logos/shaped-logo.svg',
        isWordmark: true,
        name: 'Shaped',
        quoteWidth: 94,
      },
      {
        cardWidth: 108,
        imageSrc: '/svgs/customer-logos/structureflow.svg',
        isWordmark: true,
        name: 'StructureFlow',
      },
      {
        cardWidth: 88,
        imageSrc: '/svgs/icons/tavus.svg',
        isWordmark: true,
        name: 'Tavus',
      },
      {
        imageSrc: '/img/homepage/customer-logos/website-engineer.webp',
        name: 'The Website Engineer',
      },
      {
        imageSrc: '/svgs/customer-logos/xata.svg',
        name: 'Xata',
      },
      {
        cardWidth: 108,
        imageSrc: '/img/users/netapp.svg',
        isWordmark: true,
        name: 'NetApp',
      },
      {
        cardWidth: 108,
        imageSrc: '/img/users/samsung.svg',
        isWordmark: true,
        name: 'Samsung',
      },
      {
        cardWidth: 104,
        imageSrc: '/svgs/customer-logos/nexl.svg',
        isWordmark: true,
        name: 'NEXL',
      },
      {
        cardWidth: 112,
        imageClassName: 'brightness-0 invert',
        imageSrc: '/svgs/customer-logos/lantern.svg',
        isWordmark: true,
        name: 'Lantern',
      },
      {
        cardWidth: 110,
        imageSrc: '/svgs/customer-logos/igaming-platform.svg',
        isWordmark: true,
        name: 'iGamingPlatform',
      },
      {
        cardWidth: 104,
        imageSrc: '/svgs/customer-logos/limy.svg',
        isWordmark: true,
        name: 'Limy',
      },
      {
        cardWidth: 108,
        imageClassName: 'brightness-0 invert',
        imageSrc: '/svgs/customer-logos/argonaut.svg',
        isWordmark: true,
        name: 'Argonaut',
      },
      {
        imageSrc: '/svgs/customer-logos/plato.svg',
        name: 'Plato',
      },
      {
        cardWidth: 108,
        imageClassName: 'brightness-0 invert',
        imageSrc: '/svgs/customer-logos/sagepilot.svg',
        isWordmark: true,
        name: 'SagePilot',
      },
      {
        cardWidth: 108,
        imageSrc: '/svgs/customer-logos/avantis.svg',
        isWordmark: true,
        name: 'Avantis',
      },
      {
        imageSrc: '/svgs/customer-logos/digai.svg',
        name: 'DigAI',
      },
      {
        cardWidth: 112,
        imageSrc: '/svgs/customer-logos/mosaic-manufacturing.svg',
        isWordmark: true,
        name: 'Mosaic Manufacturing',
      },
      {
        cardWidth: 82,
        imageClassName: 'brightness-0 invert',
        imageSrc: '/svgs/customer-logos/cgs.svg',
        isWordmark: true,
        name: 'CGS',
      },
      {
        imageSrc: '/svgs/customer-logos/vetoai.svg',
        name: 'VetoAI',
      },
      {
        imageSrc: '/svgs/customer-logos/akuity.svg',
        name: 'Akuity',
      },
      {
        imageSrc: '/svgs/customer-logos/sundial.svg',
        name: 'Sundial',
      },
      {
        cardWidth: 108,
        imageClassName: 'brightness-0 invert',
        imageSrc: '/svgs/customer-logos/hamming-ai.svg',
        isWordmark: true,
        name: 'Hamming AI',
      },
      {
        cardWidth: 108,
        imageClassName: 'brightness-0 invert',
        imageSrc: '/svgs/customer-logos/portkey.svg',
        isWordmark: true,
        name: 'Portkey',
      },
      {
        cardWidth: 96,
        imageSrc: '/img/users/freo.svg',
        isWordmark: true,
        name: 'Freo',
      },
      {
        cardWidth: 112,
        imageSrc: '/img/users/salesforce.svg',
        isWordmark: true,
        name: 'Salesforce',
      },
      {
        cardWidth: 96,
        imageSrc: '/img/users/rattle.svg',
        isWordmark: true,
        name: 'Rattle',
      },
      {
        cardWidth: 96,
        imageSrc: '/img/users/gokiwi.svg',
        isWordmark: true,
        name: 'Kiwi',
      },
      {
        imageSrc: '/img/case_study/brainfish-icon.svg',
        name: 'Brainfish',
      },
      {
        cardWidth: 98,
        imageSrc: '/img/case_study/logos/linkcy-logo-white-1.png',
        isWordmark: true,
        name: 'Linkcy',
      },
      {
        cardWidth: 104,
        imageSrc: '/img/case_study/cedana-logo.svg',
        isWordmark: true,
        name: 'Cedana',
      },
      {
        cardWidth: 108,
        imageSrc: '/img/case_study/mailmodo-logo-white.svg',
        isWordmark: true,
        name: 'Mailmodo',
      },
      {
        cardWidth: 108,
        imageSrc: '/img/case_study/logos/tableflow-logo.png',
        isWordmark: true,
        name: 'TableFlow',
      },
      {
        cardWidth: 104,
        imageSrc: '/img/case_study/logos/instasafe-logo.png',
        isWordmark: true,
        name: 'InstaSafe',
      },
      {
        imageSrc: '/img/users/blip_logo.webp',
        name: 'Blip',
      },
      {
        cardWidth: 104,
        imageSrc: '/img/users/outplay.svg',
        isWordmark: true,
        name: 'Outplay',
      },
      {
        cardWidth: 104,
        imageSrc: '/img/case_study/logos/WomboLogo.svg',
        isWordmark: true,
        name: 'Wombo',
      },
      {
        cardWidth: 108,
        imageSrc: '/img/case_study/logos/HTTPSCOUT.svg',
        isWordmark: true,
        name: 'HTTPScout',
      },
    ],
  },
  blogStoryCards: [
    {
      company: 'Alien Intelligence',
      description:
        'Alien Intelligence built an AI SRE workflow on SigNoz to triage alerts, reduce noise, and keep humans in the loop.',
      featured: true,
      filters: ['AI & agent workflows', 'Logs & alerting'],
      href: '/customers/alien-intelligence-ai-sre-workflow-signoz/',
      logo: '/img/homepage/customer-logos/alien-intelligence.webp',
      logoAlt: 'Alien Intelligence',
      person: 'Leo Blondel',
      publishedAt: '2026-06-11',
      quote:
        'Datadog came back and said, “The trial’s over — it’s going to cost you over $2K.” I was like, “Sorry, what?”',
      role: 'CTO',
      showCompanyNameWithLogo: true,
      title: 'How Alien Intelligence built an AI SRE workflow with SigNoz',
      type: 'From the SigNoz blog',
    },
    {
      company: 'Inkeep',
      description:
        'Inkeep monitors its AI agent framework with SigNoz and OpenTelemetry, tracing agent runs, tool calls, and token usage.',
      featured: true,
      filters: ['AI & agent workflows', 'Tracing & performance'],
      href: '/customers/inkeep-ai-agent-monitoring/',
      logo: '/svgs/icons/inkeep.svg',
      logoAlt: 'Inkeep',
      person: 'Shagun Singh',
      publishedAt: '2025-12-15',
      quote: 'We’ve been using SigNoz as a first-class dependency in our new agent framework.',
      role: 'Software Engineer',
      title: 'How Inkeep monitors its AI agent framework with SigNoz',
      type: 'From the SigNoz blog',
    },
  ],
}
