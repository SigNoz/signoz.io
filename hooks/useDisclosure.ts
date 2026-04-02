'use client'

import { useCallback, useState } from 'react'

export function useDisclosure(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const onOpen = useCallback(() => setIsOpen(true), [])
  const onClose = useCallback(() => setIsOpen(false), [])
  const onOpenChange = useCallback((open: boolean) => setIsOpen(open), [])

  return { isOpen, onOpen, onClose, onOpenChange }
}
