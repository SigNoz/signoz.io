'use client'

import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCallback, useState, type ReactNode } from 'react'
import { cn } from 'app/lib/utils'

const sizeClass = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
} as const

export type AppModalSize = keyof typeof sizeClass

type AppModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  size?: AppModalSize
  panelClassName?: string
  backdrop?: 'blur' | 'default'
  showCloseButton?: boolean
}

export function AppModal({
  isOpen,
  onOpenChange,
  children,
  size = '2xl',
  panelClassName,
  backdrop = 'default',
  showCloseButton = true,
}: AppModalProps) {
  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-50 h-screen w-screen"
      open={isOpen}
      onClose={() => onOpenChange(false)}
      transition
    >
      <DialogBackdrop
        transition
        className={cn(
          'fixed inset-0 transition duration-200 ease-out data-[closed]:opacity-0',
          backdrop === 'blur' ? 'bg-black/30 backdrop-blur-md backdrop-saturate-150' : 'bg-black/55'
        )}
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
          <DialogPanel
            transition
            className={cn(
              'relative w-full transform overflow-hidden text-left align-middle shadow-xl transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0',
              sizeClass[size],
              panelClassName
            )}
          >
            {showCloseButton && (
              <button
                type="button"
                aria-label="Close modal"
                className="absolute right-1 top-1 z-10 rounded-full p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-signoz_robin-500"
                onClick={() => onOpenChange(false)}
              >
                <XMarkIcon className="h-5 w-5" aria-hidden />
              </button>
            )}
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export function useDisclosure(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const onOpen = useCallback(() => setIsOpen(true), [])
  const onClose = useCallback(() => setIsOpen(false), [])
  const onOpenChange = useCallback((open: boolean) => setIsOpen(open), [])

  return { isOpen, onOpen, onClose, onOpenChange }
}
