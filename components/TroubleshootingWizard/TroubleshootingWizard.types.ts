import type { ReactNode } from 'react'

export type Signal = 'traces' | 'logs' | 'metrics'

export type SignalMeta = {
  label: string
  unit: string
  envExporter: string
  signalPath: string
}

export type Tone = 'danger' | 'warning' | 'info' | 'success'

export type WizardOption = { label: string; to: string }

export type QuestionNode = {
  kind: 'question'
  prompt: ReactNode
  hint?: ReactNode
  options: WizardOption[]
}

export type ResultNode = {
  kind: 'result'
  tone: Tone
  title: string
  body: ReactNode
}

export type WizardNode = QuestionNode | ResultNode
