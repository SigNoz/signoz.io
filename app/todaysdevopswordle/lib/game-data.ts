export interface WordleGameData {
  word: string
  hint: string
  date: string
  info: string
  link: string
}

// Current game data - update this daily
const CURRENT_GAME_DATA: WordleGameData = {
  word: 'FLUSH',
  hint: "Forces out what's been waiting quietly in line.",
  info: "Today's word is 'FLUSH' which in observability and logging refers to the act of forcefully sending buffered data, such as logs or metrics—from local memory to its intended destination to ensure nothing is left unsent",
  link: 'https://launchdarkly.com/docs/sdk/features/flush',
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
