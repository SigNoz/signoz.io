import { Atom, Coins, DatabaseZap } from "lucide-react";

export const CLOUD_ICONS = [
  { src: "/img/icons/aws-icon.svg", alt: "AWS" },
  { src: "/img/icons/gcp-icon.svg", alt: "Google Cloud" },
  { src: "/img/icons/azure-icon.svg", alt: "Azure" }
];

export const CONTAINER_ICONS = [
  { src: "/img/icons/docker-icon.svg", alt: "Docker" },
  { src: "/img/icons/kubernetes-icon.svg", alt: "Kubernetes" }
];

export const POPULAR_TOOLS_ICONS = [
  { src: "/img/icons/heroku-icon.svg", alt: "Heroku" },
  { src: "/img/icons/fluentd-icon.svg", alt: "Fluentd" },
  { src: "/img/icons/vercel-icon.svg", alt: "Vercel" },
  { src: "/img/icons/redis-icon.svg", alt: "Redis" },
  { src: "/img/icons/mongo-icon.svg", alt: "Mongo" },
  { src: "/img/icons/nginx-icon.svg", alt: "Nginx" }
];

export const EXISTING_AGENTS_ICONS = [
  { src: "/img/icons/fluentd-icon.svg", alt: "Fluentd" },
  { src: "/img/icons/fluentbit-icon.svg", alt: "Fluentbit" },
  { src: "/img/icons/logstash-icon.svg", alt: "Logstash" }
];

export const DIRECT_INTEGRATIONS = [
  "HTTP Endpoints",
  "SDK Integrations", 
  "Legacy support"
];

export const CARDS = [
  {
    icon: <Atom />, 
    title: "Advanced Query Builder", 
    description: "Build ClickHouse queries visually with auto-complete for log attributes."
  }, 
  {
    icon: <Coins />, 
    title: "Transparent Pricing", 
    description: "Starts at $0.30 per GB with no user seat limitations or hidden retention fees."
  }, 
  {
    icon: <DatabaseZap />, 
    title: "Smart Tiered Storage", 
    description: "Configure hot retention periods to balance query performance with storage costs for compliance."
  }
];

export const QUERY_BUILDER_CARDS = [
  {
    icon: (
      <Atom />
    ),
    title: "Visual Query Builder",
    description: "Build complex filters with AND/OR logic using auto-complete for attributes and values. Supports operators like CONTAINS, REGEX, IN, and LIKE with real-time suggestions from your actual log data."
  },
  {
    icon: (
      <Atom />
    ),
    title: "Aggregations & Grouping",
    description: "Run COUNT, SUM, AVG, P50/P95/P99 across billions of logs. Group by multiple dimensions simultaneously and filter results with HAVING clauses for advanced analysis."
  },
  {
    icon: (
      <Atom />
    ),
    title: "JSON & Dashboard Creation",
    description: "Query nested JSON fields using dot notation like `attributes.user.id`. Create dashboard panels directly from query results or export to CSV for external analysis."
  }
];

export const CORRELATION_CAROUSEL_DATA = [
  {
    id: 0,
    title: "Logs → Metrics",
    description: "Jump from logs to relevant service metrics.",
    image: "/img/log-management/Logs-to-Metrics.png",
    isActive: true
  },
  {
    id: 1,
    title: "Logs → Traces",
    description: "Find traces using trace IDs in logs.",
    image: "/img/log-management/Logs-to-Trace.png",
    isActive: false
  },
  {
    id: 2,
    title: "APM → Logs",
    description: "Go from APM metrics to related logs.",
    image: "/img/log-management/APM-to-Logs.png",
    isActive: false
  }
];

export const STORAGE_DATA = {
  headers: {
    hot: "HOT STORAGE PERIOD",
    cold: "PERIOD IN COLD STORAGE AFTER HOT STORAGE"
  },
  subHeader: "$ / GB",
  coldPeriods: [
    { value: "0", unit: "days" },
    { value: "90", unit: "days" },
    { value: "180", unit: "days" },
    { value: "1", unit: "year" },
    { value: "2", unit: "years" }
  ],
  rows: [
    {
      period: { value: "15", unit: "days" },
      prices: [0.3, 0.45, 0.6, 0.9, 1.3]
    },
    {
      period: { value: "30", unit: "days" },
      prices: [0.4, 0.55, 0.7, 1.0, 1.4]
    },
    {
      period: { value: "90", unit: "days" },
      prices: [0.6, 0.75, 0.9, 1.2, 1.6]
    },
    {
      period: { value: "180", unit: "days" },
      prices: [0.8, 0.95, 1.1, 1.4, 1.8]
    }
  ]
};