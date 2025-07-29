export interface WordleDayData {
  dayId: string
  word: string
  hint: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  date: string
  info: string
  link: string
  isAvailable: boolean
}

export interface GameDataMap {
  [dayId: string]: WordleDayData
}

// Dummy data for multiple wordle days
const GAME_DATA_MAP: GameDataMap = {
  'day-01': {
    dayId: 'day-01',
    word: 'LINKS',
    hint: "Once-used ties between containers, now mostly phased out.",
    difficulty: 'EASY',
    date: '2024-01-01',
    info: "Today's word is 'LINKS'. Docker's --link flag allowed containers to share environment variables and /etc/hosts entries to enable communication, but this feature is now considered legacy and may be removed in future releases.",
    link: 'https://www.ameyalokare.com/docker/2017/09/14/docker-migrating-legacy-links.html',
    isAvailable: true
  },
  'day-02': {
    dayId: 'day-02',
    word: 'TRACE',
    hint: "Following the path of requests across services.",
    difficulty: 'HARD',
    date: '2024-01-02',
    info: "Today's word is 'TRACE'. Distributed tracing is a method used to profile and monitor applications, especially those built using a microservices architecture. It helps developers understand the flow of requests through their system.",
    link: 'https://signoz.io/docs/usecases/distributed-tracing/',
    isAvailable: true
  },
  'day-03': {
    dayId: 'day-03',
    word: 'LOGIN',
    hint: "The gateway to access your digital workspace.",
    difficulty: 'MEDIUM',
    date: '2024-01-03',
    info: "Today's word is 'LOGIN'. Login is the process of authenticating and gaining access to a system, application, or service by providing credentials such as username and password.",
    link: 'https://signoz.io/docs/usecases/metrics/',
    isAvailable: true
  },
  'day-04': {
    dayId: 'day-04',
    word: 'ALERT',
    hint: "Notifications triggered when thresholds are exceeded.",
    difficulty: 'EASY',
    date: '2024-01-04',
    info: "Today's word is 'ALERT'. Alerts are notifications that are triggered when certain conditions or thresholds are met, helping teams respond to issues quickly.",
    link: 'https://signoz.io/docs/usecases/alerting/',
    isAvailable: true
  },
  'day-05': {
    dayId: 'day-05',
    word: 'QUERY',
    hint: "I draw answers from your telemetry's vault. I'm your friend and not your enemy.",
    difficulty: 'MEDIUM',
    date: '2024-01-05',
    info: "Today's word is 'QUERY' which points to the concept of querying telemetry data—searching logs, metrics, and traces for hidden insights—without stating it outright. In the observability world, a query is exactly that: a request you'd run to explore vast telemetry datasets or logs in platforms",
    link: 'https://docs.chronosphere.io/investigate/querying',
    isAvailable: true
  },
  'day-06': {
    dayId: 'day-06',
    word: 'FLUSH',
    hint: "Forces out what's been waiting quietly in line.",
    difficulty: 'MEDIUM',
    date: '2024-01-06',
    info: "Today's word is 'FLUSH' which in observability and logging refers to the act of forcefully sending buffered data, such as logs or metrics—from local memory to its intended destination to ensure nothing is left unsent",
    link: 'https://launchdarkly.com/docs/sdk/features/flush',
    isAvailable: true
  },
  'day-07': {
    dayId: 'day-07',
    word: 'BUILD',
    hint: "The silent craft that shapes your vessel from lines of code.",
    difficulty: 'EASY',
    date: '2024-01-07',
    info: "Today's word is 'BUILD' which is a command that reads a Dockerfile and creates an image by executing each instruction, packaging the application and its dependencies into layered, reusable artifacts.",
    link: 'https://www.cherryservers.com/blog/docker-build-command',
    isAvailable: true
  },
  'day-08': {
    dayId: 'day-08',
    word: 'PATCH',
    hint: "Alters the present without starting from scratch.",
    difficulty: 'EASY',
    date: '2024-01-08',
    info: "Today's word is 'PATCH' which is a command that allows you to apply small, precise updates to live Kubernetes resources—such as changing an image or updating labels—without replacing their entire YAML",
    link: 'https://komodor.com/learn/kubectl-patch-changing-kubernetes-objects-in-place',
    isAvailable: true
  },
  'day-09': {
    dayId: 'day-09',
    word: 'QUOTA',
    hint: "The rule that says, 'You've used up your share, no more.'",
    difficulty: 'MEDIUM',
    date: '2024-01-09',
    info: "Today's word is 'QUOTA' which is a K8s object that sets hard limits on the resources that can be consumed within a specific namespace. This helps control the total resource consumption and restricts how much CPU, memory, and other resources a namespace can request or consume.",
    link: 'https://www.perfectscale.io/blog/kubernetes-resource-quotas-limit-ranges',
    isAvailable: true
  },
  'day-10': {
    dayId: 'day-10',
    word: 'ADMIN',
    hint: "Holds authority to modify, create, and destroy at will.",
    difficulty: 'HARD',
    date: '2024-01-10',
    info: "Today's word is 'ADMIN' which permits unlimited read/write access to resources within a namespace. This role can create roles and role bindings within a particular namespace. It does not permit write access to the namespace itself.",
    link: 'https://medium.com/@maheshwar.ramkrushna/draining-and-uncordoning-in-kubernetes-managing-pod-eviction-and-node-scheduling-8a37ce15a3ae',
    isAvailable: true
  },
  'day-11': {
    dayId: 'day-11',
    word: 'DRAIN',
    hint: "A gentle way to empty a node before saying goodbye.",
    difficulty: 'MEDIUM',
    date: '2024-01-11',
    info: "Today's word is 'DRAIN' which marks a node unschedulable and gracefully evicts all pods, preparing it for maintenance or removal while minimizing downtime. You can use 'kubectl drain' to drain a node.",
    link: 'https://medium.com/@maheshwar.ramkrushna/draining-and-uncordoning-in-kubernetes-managing-pod-eviction-and-node-scheduling-8a37ce15a3ae',
    isAvailable: true
  },
  'day-12': {
    dayId: 'day-12',
    word: 'SPACE',
    hint: "Your Kubernetes resources live here.",
    difficulty: 'MEDIUM',
    date: '2024-01-12',
    info: "Today's word is 'SPACE'. In Kubernetes, a namespace provides a mechanism for isolating groups of resources within a single cluster, creating virtual spaces for different teams or applications.",
    link: 'https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/',
    isAvailable: true
  },
  'day-13': {
    dayId: 'day-13',
    word: 'CHART',
    hint: "The captain's blueprint for navigating Kubernetes deployments.",
    difficulty: 'MEDIUM',
    date: '2024-01-13',
    info: "Today's word is 'CHART'. Helm charts are packages of pre-configured Kubernetes resources that define, install, and upgrade complex Kubernetes applications in a templated and reusable way.",
    link: 'https://helm.sh/docs/topics/charts/',
    isAvailable: true
  },
  'day-14': {
    dayId: 'day-14',
    word: 'SCALE',
    hint: "Growing your system to handle increasing demand.",
    difficulty: 'MEDIUM',
    date: '2024-01-14',
    info: "Today's word is 'SCALE'. Scaling refers to the ability of a system to handle increased load by adding resources (horizontal scaling) or upgrading existing resources (vertical scaling).",
    link: 'https://kubernetes.io/docs/concepts/cluster-administration/manage-deployment/',
    isAvailable: true
  },
  'day-15': {
    dayId: 'day-15',
    word: 'PROXY',
    hint: "Acts as a middleman, forwarding requests on your behalf.",
    difficulty: 'MEDIUM',
    date: '2024-01-15',
    info: "Today's word is 'PROXY'. In microservices and observability, a proxy acts as an intermediary that forwards requests between clients and servers, often providing additional functionality like load balancing, security, and observability.",
    link: 'https://www.envoyproxy.io/docs/envoy/latest/intro/what_is_envoy',
    isAvailable: true
  },
  'day-16': {
    dayId: 'day-16',
    word: 'SPLIT',
    hint: "Dividing traffic between different versions of your service.",
    difficulty: 'MEDIUM',
    date: '2024-01-16',
    info: "Today's word is 'SPLIT'. Traffic splitting is a deployment strategy that divides incoming requests between different versions of a service, enabling canary deployments and A/B testing.",
    link: 'https://martinfowler.com/bliki/CanaryRelease.html',
    isAvailable: true
  },
  'day-17': {
    dayId: 'day-17',
    word: 'METER',
    hint: "Measures and records the pulse of your system.",
    difficulty: 'MEDIUM',
    date: '2024-01-17',
    info: "Today's word is 'METER'. In observability, a meter is an instrument that measures and records numeric values over time, such as counters, gauges, and histograms for monitoring system performance.",
    link: 'https://opentelemetry.io/docs/concepts/signals/metrics/',
    isAvailable: true
  },
  'day-18': {
    dayId: 'day-18',
    word: 'STAGE',
    hint: "A checkpoint in your deployment pipeline's journey.",
    difficulty: 'EASY',
    date: '2024-01-18',
    info: "Today's word is 'STAGE'. In CI/CD pipelines, a stage represents a phase in the deployment process, such as build, test, or deploy, where specific tasks are executed in sequence.",
    link: 'https://docs.gitlab.com/ee/ci/pipelines/',
    isAvailable: true
  },
  'day-19': {
    dayId: 'day-19',
    word: 'CACHE',
    hint: "Temporary storage for faster access to frequently used data.",
    difficulty: 'EASY',
    date: '2024-01-19',
    info: "Today's word is 'CACHE'. A cache is a temporary storage layer that stores frequently accessed data to reduce latency and improve application performance by avoiding repeated expensive operations.",
    link: 'https://redis.io/docs/manual/clients/client-side-caching/',
    isAvailable: true
  },
  'day-20': {
    dayId: 'day-20',
    word: 'PARSE',
    hint: "Breaking down logs into structured, meaningful pieces.",
    difficulty: 'MEDIUM',
    date: '2024-01-20',
    info: "Today's word is 'PARSE'. Parsing is the process of analyzing and converting raw log data or text into structured formats that can be easily searched, filtered, and analyzed.",
    link: 'https://www.elastic.co/guide/en/logstash/current/filter-plugins.html',
    isAvailable: true
  },
  'day-21': {
    dayId: 'day-21',
    word: 'QUEUE',
    hint: "Orderly line where messages wait their turn to be processed.",
    difficulty: 'EASY',
    date: '2024-01-21',
    info: "Today's word is 'QUEUE'. A queue is a data structure that follows FIFO (First In, First Out) principle, commonly used in message systems and task processing for reliable asynchronous communication.",
    link: 'https://aws.amazon.com/sqs/features/',
    isAvailable: true
  },
  'day-22': {
    dayId: 'day-22',
    word: 'AGENT',
    hint: "The spy that collects intelligence from your system.",
    difficulty: 'EASY',
    date: '2024-01-22',
    info: "Today's word is 'AGENT'. In observability, an agent is a lightweight program that runs on systems to collect telemetry data like metrics, logs, and traces, then forwards them to monitoring systems.",
    link: 'https://grafana.com/docs/agent/latest/',
    isAvailable: true
  },
  'day-23': {
    dayId: 'day-23',
    word: 'STACK',
    hint: "A collection of technologies working together as one.",
    difficulty: 'EASY',
    date: '2024-01-23',
    info: "Today's word is 'STACK'. In DevOps and observability, a stack refers to a collection of software tools and technologies that work together to provide a complete solution, like the ELK stack (Elasticsearch, Logstash, Kibana).",
    link: 'https://www.elastic.co/what-is/elk-stack',
    isAvailable: true
  },
  'day-24': {
    dayId: 'day-24',
    word: 'SPANS',
    hint: "Individual units of work in your distributed journey.",
    difficulty: 'HARD',
    date: '2024-01-24',
    info: "Today's word is 'SPANS'. In OpenTelemetry, spans represent individual units of work in a distributed system. Each span contains information about a single operation, including its name, start time, duration, and associated metadata.",
    link: 'https://opentelemetry.io/docs/concepts/signals/traces/',
    isAvailable: true
  },
  'day-25': {
    dayId: 'day-25',
    word: 'SHARD',
    hint: "Splitting data into smaller, manageable pieces.",
    difficulty: 'MEDIUM',
    date: '2024-01-25',
    info: "Today's word is 'SHARD'. Sharding is a method of horizontally partitioning data across multiple databases or storage systems to improve performance and scalability by distributing the load.",
    link: 'https://www.mongodb.com/docs/manual/sharding/',
    isAvailable: true
  },
  'day-26': {
    dayId: 'day-26',
    word: 'STORE',
    hint: "The repository where your data finds its home.",
    difficulty: 'EASY',
    date: '2024-01-26',
    info: "Today's word is 'STORE'. A data store is a repository for persistently storing and managing collections of data, which can include databases, file systems, or cloud storage solutions.",
    link: 'https://redis.io/docs/about/',
    isAvailable: true
  },
  'day-27': {
    dayId: 'day-27',
    word: 'VAULT',
    hint: "Secure storage for your most sensitive configuration data.",
    difficulty: 'MEDIUM',
    date: '2024-01-27',
    info: "Today's word is 'VAULT'. HashiCorp Vault is a tool for securely storing and accessing secrets like API keys, passwords, and certificates, essential for secure DevOps practices.",
    link: 'https://www.vaultproject.io/docs/what-is-vault',
    isAvailable: true
  },
  'day-28': {
    dayId: 'day-28',
    word: 'BENCH',
    hint: "Testing your system's limits under pressure.",
    difficulty: 'EASY',
    date: '2024-01-28',
    info: "Today's word is 'BENCH'. Benchmarking is the process of measuring and comparing the performance of your system under various conditions to understand its capabilities and limitations.",
    link: 'https://k6.io/docs/testing-guides/load-testing/',
    isAvailable: true
  },
  'day-29': {
    dayId: 'day-29',
    word: 'LAYER',
    hint: "Stacked abstractions that build your containerized world.",
    difficulty: 'MEDIUM',
    date: '2024-01-29',
    info: "Today's word is 'LAYER'. In containerization, layers are read-only file system changes that are stacked on top of each other to create a container image, enabling efficient storage and sharing.",
    link: 'https://docs.docker.com/build/guide/layers/',
    isAvailable: true
  },
  'day-30': {
    dayId: 'day-30',
    word: 'GRAPH',
    hint: "Visual network showing relationships between your services.",
    difficulty: 'HARD',
    date: '2024-01-30',
    info: "Today's word is 'GRAPH'. Service graphs are visual representations of the relationships and dependencies between different services in a distributed system, helping teams understand system architecture and data flow.",
    link: 'https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/node-graph/',
    isAvailable: true
  }
}

/**
 * Get all available game data
 */
export function getAllGameData(): GameDataMap {
  return GAME_DATA_MAP
}

/**
 * Get specific day's game data
 */
export function getGameDataByDay(dayId: string): WordleDayData | null {
  return GAME_DATA_MAP[dayId] || null
}

/**
 * Get the current wordle game data (for backward compatibility)
 */
export function getCurrentGameData(): WordleDayData {
  return GAME_DATA_MAP['day-01']
}

/**
 * Get today's hint (for backward compatibility)
 */
export function getTodaysHint(): string {
  return GAME_DATA_MAP['day-01'].hint
}

/**
 * Get today's target word (for backward compatibility)
 */
export function getTodaysWord(): string {
  return GAME_DATA_MAP['day-01'].word
}
