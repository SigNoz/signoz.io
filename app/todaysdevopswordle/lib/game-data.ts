export interface WordleGameData {
  word: string
  hint: string
  date: string
}

// Current game data - update this daily
const CURRENT_GAME_DATA: WordleGameData = {
  word: 'BUILD',
  hint: 'The silent craft that shapes your vessel from lines of code.',
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
