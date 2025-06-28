export interface WordleGameData {
  word: string
  hint: string
  date: string
  info: string
  link: string
}

// Current game data - update this daily
const CURRENT_GAME_DATA: WordleGameData = {
  word: 'LINKS',
  hint: "Once-used ties between containers, now mostly phased out.",
  info: "Todays word is 'LINKS'. Docker’s --link flag allowed containers to share environment variables and /etc/hosts entries to enable communication, but this feature is now considered legacy and may be removed in future releases.",
  link: 'https://www.ameyalokare.com/docker/2017/09/14/docker-migrating-legacy-links.html',
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
