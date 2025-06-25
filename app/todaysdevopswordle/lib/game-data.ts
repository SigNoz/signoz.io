export interface WordleGameData {
  word: string
  hint: string
  date: string
  info: string
  link: string
}

// Current game data - update this daily
const CURRENT_GAME_DATA: WordleGameData = {
  word: 'QUERY',
  hint: "I draw answers from your telemetry’s vault. I'm your friend and not your enemy.",
  info: "Todays word is 'QUERY' which points to the concept of querying telemetry data—searching logs, metrics, and traces for hidden insights—without stating it outright. In the observability world, a query is exactly that: a request you’d run to explore vast telemetry datasets or logs in platforms",
  link: 'https://docs.chronosphere.io/investigate/querying',
  date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
}

/**
 * Get the current wordle game data
 */
export function getCurrentGameData(): WordleGameData {
  return CURRENT_GAME_DATA
}

/**
 * Get today's hint
 */
export function getTodaysHint(): string {
  return CURRENT_GAME_DATA.hint
}

/**
 * Get today's target word
 */
export function getTodaysWord(): string {
  return CURRENT_GAME_DATA.word
}
