'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

type DropdownId = string

interface NavDropdownContextValue {
  activeId: DropdownId | null
  openDropdown: (id: DropdownId) => void
  closeDropdown: () => void
  cancelClose: () => void
  closeImmediate: () => void
  registerTrigger: (id: DropdownId, el: HTMLElement | null) => void
  getTriggerRect: (id: DropdownId) => DOMRect | null
}

const NavDropdownContext = createContext<NavDropdownContextValue | null>(null)

export function NavDropdownProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<DropdownId | null>(null)
  const triggerRefs = useRef<Record<string, HTMLElement>>({})
  const closeRef = useRef<ReturnType<typeof setTimeout>>()

  const openDropdown = useCallback((id: DropdownId) => {
    clearTimeout(closeRef.current)
    setActiveId(id)
  }, [])

  const closeDropdown = useCallback(() => {
    closeRef.current = setTimeout(() => {
      setActiveId(null)
    }, 100)
  }, [])

  const cancelClose = useCallback(() => {
    clearTimeout(closeRef.current)
  }, [])

  const closeImmediate = useCallback(() => {
    clearTimeout(closeRef.current)
    setActiveId(null)
  }, [])

  const registerTrigger = useCallback((id: DropdownId, el: HTMLElement | null) => {
    if (el) triggerRefs.current[id] = el
    else delete triggerRefs.current[id]
  }, [])

  const getTriggerRect = useCallback((id: DropdownId) => {
    const el = triggerRefs.current[id]
    return el ? el.getBoundingClientRect() : null
  }, [])

  return (
    <NavDropdownContext.Provider
      value={{
        activeId,
        openDropdown,
        closeDropdown,
        cancelClose,
        closeImmediate,
        registerTrigger,
        getTriggerRect,
      }}
    >
      {children}
    </NavDropdownContext.Provider>
  )
}

export function useNavDropdown(id: DropdownId) {
  const ctx = useContext(NavDropdownContext)
  if (!ctx) throw new Error('useNavDropdown must be used within NavDropdownProvider')

  const isOpen = ctx.activeId === id
  const open = useCallback(() => ctx.openDropdown(id), [ctx, id])
  const close = useCallback(() => ctx.closeDropdown(), [ctx])

  const triggerRef = useCallback(
    (el: HTMLElement | null) => {
      ctx.registerTrigger(id, el)
    },
    [ctx, id]
  )

  return { isOpen, open, close, triggerRef }
}

export function useNavDropdownContext() {
  const ctx = useContext(NavDropdownContext)
  if (!ctx) throw new Error('useNavDropdownContext must be used within NavDropdownProvider')
  return ctx
}
