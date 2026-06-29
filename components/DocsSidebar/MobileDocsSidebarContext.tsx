'use client'

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface MobileDocsSidebarState {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  openMainMenu: () => void
  onMainMenuRequest: (cb: () => void) => () => void
}

const MobileDocsSidebarContext = createContext<MobileDocsSidebarState | null>(null)

export function MobileDocsSidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mainMenuListeners] = useState(() => new Set<() => void>())

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  const openMainMenu = useCallback(() => {
    setIsOpen(false)
    mainMenuListeners.forEach((cb) => cb())
  }, [mainMenuListeners])

  const onMainMenuRequest = useCallback(
    (cb: () => void) => {
      mainMenuListeners.add(cb)
      return () => {
        mainMenuListeners.delete(cb)
      }
    },
    [mainMenuListeners]
  )

  return (
    <MobileDocsSidebarContext.Provider
      value={{ isOpen, open, close, toggle, openMainMenu, onMainMenuRequest }}
    >
      {children}
    </MobileDocsSidebarContext.Provider>
  )
}

const noop = () => {}
const noopUnsubscribe = () => noop

const defaultValue: MobileDocsSidebarState = {
  isOpen: false,
  open: noop,
  close: noop,
  toggle: noop,
  openMainMenu: noop,
  onMainMenuRequest: noopUnsubscribe,
}

export function useMobileDocsSidebar() {
  return useContext(MobileDocsSidebarContext) ?? defaultValue
}
