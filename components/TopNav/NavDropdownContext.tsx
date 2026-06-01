'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

interface NavDropdownContextValue {
  activeId: string | null
  openDropdown: (id: string) => void
  closeDropdown: () => void
  cancelClose: () => void
  closeImmediate: () => void
  registerTrigger: (id: string, el: HTMLElement | null) => void
  getTriggerRect: (id: string) => DOMRect | null
}

const NavDropdownContext = createContext<NavDropdownContextValue | null>(null)

export function NavDropdownProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const triggerRefs = useRef<Record<string, HTMLElement>>({})
  const closeRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (closeRef.current) {
        clearTimeout(closeRef.current)
      }
    }
  }, [])

  const openDropdown = useCallback((id: string) => {
    closeRef.current && clearTimeout(closeRef.current)
    setActiveId(id)
  }, [])

  const closeDropdown = useCallback(() => {
    closeRef.current = setTimeout(() => {
      setActiveId(null)
    }, 100)
  }, [])

  const cancelClose = useCallback(() => {
    closeRef.current && clearTimeout(closeRef.current)
  }, [])

  const closeImmediate = useCallback(() => {
    closeRef.current && clearTimeout(closeRef.current)
    setActiveId(null)
  }, [])

  const registerTrigger = useCallback((id: string, el: HTMLElement | null) => {
    if (el) triggerRefs.current[id] = el
    else delete triggerRefs.current[id]
  }, [])

  const getTriggerRect = useCallback((id: string) => {
    const el = triggerRefs.current[id]
    return el ? el.getBoundingClientRect() : null
  }, [])

  const value = useMemo(
    () => ({
      activeId,
      openDropdown,
      closeDropdown,
      cancelClose,
      closeImmediate,
      registerTrigger,
      getTriggerRect,
    }),
    [
      activeId,
      openDropdown,
      closeDropdown,
      cancelClose,
      closeImmediate,
      registerTrigger,
      getTriggerRect,
    ]
  )

  return <NavDropdownContext.Provider value={value}>{children}</NavDropdownContext.Provider>
}

export function useNavDropdown(id: string) {
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
