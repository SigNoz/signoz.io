import { Atom, DatabaseZap, ListTree, TextSearch } from "lucide-react";
import {
  SiPython,
  SiGo,
  SiDotnet,
  SiSpringboot,
  SiExpress,
  SiFlask,
  SiDjango,
  SiApachekafka,
  SiRabbitmq,
} from 'react-icons/si'
import { BiLogoPostgresql } from "react-icons/bi";
import { GrMysql } from "react-icons/gr";
import { CarouselCard } from "@/shared/components/molecules/FeaturePages/CarouselCards";


export const CLOUD_ICONS = [
  { src: "/img/icons/aws-icon.svg", alt: "AWS" },
  { src: "/img/icons/gcp-icon.svg", alt: "Google Cloud" },
  { src: "/img/icons/azure-icon.svg", alt: "Azure" }
];

export const CONTAINER_ICONS = [
  { src: <SiDjango className="h-7 w-7 text-[#44B78B]" />, alt: "Django" },
  { src: <SiFlask className="h-7 w-7" />, alt: "Flask" },
  { src: <SiSpringboot className="h-7 w-7 text-[#6DB33F]" />, alt: "Springboot" },
  { src: <SiExpress className="h-7 w-7" />, alt: "Express" },
];

export const POPULAR_TOOLS_ICONS = [
  { src: <BiLogoPostgresql className="h-7 w-7 text-blue-600" />, alt: "Postgres" },
  { src: "/img/icons/redis-icon.svg", alt: "Redis" },
  { src: <SiApachekafka className="h-7 w-7" />, alt: "Apache Kafka" },
  { src: "/img/icons/grpc-icon.svg", alt: "gRPC"},
  { src: <GrMysql className="h-7 w-7 text-cyan-600" />, alt: "MySQL" },
  { src: "/img/icons/mongo-icon.svg", alt: "Mongo" },
  { src: <SiRabbitmq className="h-7 w-7 text-orange-600" />, alt: "RabbitMQ" },
  { src: "/img/icons/elastic-icon.svg", alt: "Elastic" }
];

export const LEGACY_FORMAT_SUPPORT_ICONS = [
  { src: "/img/icons/jaeger-stag-face-icon.svg", alt: "Jaeger" },
  { src: "/img/icons/zipkin-icon.svg", alt: "Zipkin" },
  { src: "/img/icons/opencensus-icon.svg", alt: "OpenCensus" }
];

export const LANGUAGES_ICONS = [
  { src: <SiPython className="h-5 w-5 text-blue-500" />, alt: "Python" },
  { src: "/img/icons/java-icon.svg", alt: "Java" },
  { src: <SiGo className="h-7 w-7 text-cyan-500" />, alt: "Golang" },
  { src: <SiDotnet className="h-7 w-7" />, alt: "Dotnet" }
];

export const DIRECT_INTEGRATIONS = [
  "OTLP",
  "gRPC", 
  "HTTP"
];

export const CARDS = [
  {
    icon: <DatabaseZap />, 
    title: "High-Volume Ingestion", 
    description: "Sustain 20,000 spans per second intake. Battle-tested architecture handles enterprise scale without forced sampling."
  }, 
  {
    icon: <ListTree />, 
    title: "Trace Funnels", 
    description: "Compare error vs success patterns across services. Industry-first feature for analyzing conversion through distributed systems."
  }, 
  {
    icon: <TextSearch />, 
    title: "Full-Text Search on Span Events", 
    description: "Query span events across structured and unstructured data with CONTAINS and wildcards, no pre-indexing required."
  }
];


export const FILTER_AND_ANALYZE_CARDS = [
  {
    icon: (
      <Atom />
    ),
    title: "Entry Points & Smart Filtering",
    description: "Toggle entry point spans to isolate where requests first enter each service, eliminating noise from internal downstream calls. Build complex AND/OR filter chains to pinpoint exact failure patterns across multiple services simultaneously."
  },
  {
    icon: (
      <Atom />
    ),
    title: "Latency & Error Analysis",
    description: "Calculate P95/P99 latencies between any two spans to identify slow handoffs between services. Group traces by deployment version, region, or customer segment to surface systemic issues. Compare error rates against success rates using multi-query formulas."
  },
  {
    icon: (
      <Atom />
    ),
    title: "Trace Funnels & Flow Analysis",
    description: "Trace Funnels reveal conversion rates through distributed workflows with unlimited steps, showing exactly where requests fail in multi-service journeys. Apply Direct/InDirect Descendant operators to map request propagation and validate service dependencies."
  }
];

export const CORRELATION_CAROUSEL_DATA: Array<CarouselCard> = [
  {
    id: 0,
    title: "Handle massive traces",
    description: "Smooth navigation through 1M+ spans.",
    image: "/img/distributed-tracing/handle-massive-traces.png",
    isActive: true
  },
  {
    id: 1,
    title: "Synchronized flame graph and waterfall",
    description: "Click one, see everywhere.",
    image: "/img/distributed-tracing/synchronized-flame-graph-and-waterfall.png",
    isActive: false
  },
  {
    id: 2,
    title: "Span events on timeline",
    description: "Event indicators directly on timelines.",
    image: "/img/distributed-tracing/span-events-on-timeline.png",
    isActive: false
  }
];
