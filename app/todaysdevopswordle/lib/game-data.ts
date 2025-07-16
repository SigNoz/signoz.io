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
