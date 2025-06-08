export enum LetterState {
  CORRECT = 'CORRECT',      // Letter is in correct position (red)
  PRESENT = 'PRESENT',      // Letter exists but wrong position (blue)
  ABSENT = 'ABSENT',        // Letter doesn't exist (no change/border only)
  PENDING = 'PENDING'       // Not yet evaluated
}

export enum GameStatus {
  NOT_STARTED = 'not_started',
  PLAYING = 'playing',
  WON = 'won',
  LOST = 'lost'
}

export interface GameConfig {
  wordLength: number;       // Number of letters in the word
  maxAttempts: number;      // Maximum number of attempts allowed
}

export interface GameState {
  currentRow: number;       // Current attempt number (0-based)
  currentCol: number;       // Current letter position in row (0-based)
  gameStatus: GameStatus;
  guesses: string[];       // Array of guessed words
  letterStates: Map<string, LetterState>; // Track letter states for keyboard
}

export interface LetterTile {
  letter: string;
  state: LetterState;
} 