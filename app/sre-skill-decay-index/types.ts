export type Category = 'incident' | 'observability' | 'debugging' | 'architecture' | 'meta'

export type SeverityLevel = 'low' | 'mid' | 'high' | 'critical'

export type OllyType =
  | 'welding'
  | 'thinking'
  | 'professor'
  | 'hangglider'
  | 'welding-side'
  | 'jedi'
  | 'sleeping'
  | 'space'

export interface QuizOption {
  text: string
  score: number
  category: Category
}

export interface QuizQuestion {
  scenario: string
  question: string
  olly: OllyType
  options: QuizOption[]
}

export interface Answer {
  score: number
  category: Category
}

export interface RecentDiagnostic {
  role: string
  score: number
  roast: string
}

export interface CategoryScore {
  category: Category
  label: string
  score: number
  count: number
  average: number
  level: SeverityLevel
  percent: number
}

export type QuizPhase = 'hero' | 'quiz' | 'results'
