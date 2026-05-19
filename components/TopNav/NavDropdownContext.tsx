'use client'

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'

interface NavDropdownContextValue {
  activeId: string | null
  openDropdown: (id: string) => void
  closeDropdown: (id: string) => void
}

const NavDropdownContext = createContext<NavDropdownContextValue | null>(null)

export function NavDropdownProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const closeRef = useRef<ReturnType<typeof setTimeout>>()

  const openDropdown = useCallback((id: string) => {
    clearTimeout(closeRef.current)
    setActiveId(id)
  }, [])

  const closeDropdown = useCallback((_id: string) => {
    closeRef.current = setTimeout(() => {
      setActiveId(null)
    }, 100)
  }, [])

  return (
    <NavDropdownContext.Provider value={{ activeId, openDropdown, closeDropdown }}>
      {children}
    </NavDropdownContext.Provider>
  )
}

export function useNavDropdown(id: string) {
  const ctx = useContext(NavDropdownContext)
  if (!ctx) throw new Error('useNavDropdown must be used within NavDropdownProvider')

  const isOpen = ctx.activeId === id
  const open = useCallback(() => ctx.openDropdown(id), [ctx, id])
  const close = useCallback(() => ctx.closeDropdown(id), [ctx, id])

  return { isOpen, open, close }
}
