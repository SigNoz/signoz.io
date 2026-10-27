'use client'

import { createContext, useContext } from 'react'

export interface NozPathWalkContextValue {
  registerSkyline: (canvas: HTMLCanvasElement | null) => void
  skylineAlt: string
}

export const NozPathWalkContext = createContext<NozPathWalkContextValue | null>(null)

export function useNozPathWalkContext(component: string) {
  const context = useContext(NozPathWalkContext)
  if (!context) throw new Error(`<${component}> must be rendered inside <NozPathWalk>`)
  return context
}
