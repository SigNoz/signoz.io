export function getDateString(): string {
  return new Date().toISOString().split('T')[0]; // Returns YYYY-MM-DD
}

export function getEndOfDay(): Date {
  const date = new Date();
  date.setHours(23, 59, 59, 999);
  return date;
}

export function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/todayswordle; expires=${getEndOfDay().toUTCString()}`;
}

export function getCookie(name: string) {
  if (typeof window === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export const COOKIE_NAMES = {
  START_TIME: (date: string) => `sgz_start_${date}`,
  WON_SCORE: (date: string) => `sgz_won_score_${date}`,
  LOST: (date: string) => `sgz_lost_${date}`,
} as const;

export function initializeGameState() {
  const today = getDateString();
  const startTimeCookie = getCookie(COOKIE_NAMES.START_TIME(today));
  
  if (!startTimeCookie) {
    const startTime = Date.now().toString();
    setCookie(COOKIE_NAMES.START_TIME(today), startTime);
    return 0;
  }

  return Math.floor((Date.now() - parseInt(startTimeCookie)) / 1000);
}

export function setGameWon(score: number) {
  const today = getDateString();
  setCookie(COOKIE_NAMES.WON_SCORE(today), score.toString());
}

export function setGameLost() {
  const today = getDateString();
  setCookie(COOKIE_NAMES.LOST(today), 'true');
}

export function getGameState() {
  const today = getDateString();
  return {
    wonScore: getCookie(COOKIE_NAMES.WON_SCORE(today)),
    lost: getCookie(COOKIE_NAMES.LOST(today)),
    startTime: getCookie(COOKIE_NAMES.START_TIME(today)),
  };
} 