'use client'

import React, { createContext, useContext, useCallback } from 'react'
import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form'
import { AppModal as Modal } from '@/components/ui/Modal'
import { useDisclosure } from '@/hooks/useDisclosure'
import PricingForm from 'app/pricing-form'
import { ENTERPRISE_DEMO_HUBSPOT_DATA } from './EnterprisePage.constants'

type BookADemoModalContextValue = {
  openModal: () => void
}

const BookADemoModalContext = createContext<BookADemoModalContextValue | null>(null)

export function useBookADemoModal() {
  const ctx = useContext(BookADemoModalContext)
  if (!ctx) {
    throw new Error('useBookADemoModal must be used within BookADemoModalProvider')
  }
  return ctx
}

export function BookADemoModalProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const openModal = useCallback(() => onOpen(), [onOpen])

  return (
    <BookADemoModalContext.Provider value={{ openModal }}>
      {children}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        panelClassName="max-w-2xl rounded-3xl border border-signoz_slate-200 bg-signoz_vanilla-200 p-8 text-signoz_ink-500 shadow-[0_20px_60px_rgba(9,16,29,0.35)]"
      >
        <div className="flex min-h-96 items-center justify-center">
          <HubspotProvider>
            <PricingForm
              portalId={ENTERPRISE_DEMO_HUBSPOT_DATA.portalId}
              formId={ENTERPRISE_DEMO_HUBSPOT_DATA.formId}
              formName="Book a demo form"
            />
          </HubspotProvider>
        </div>
      </Modal>
    </BookADemoModalContext.Provider>
  )
}
