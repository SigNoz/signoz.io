import { useSyncExternalStore } from 'react'
import { getConsent, onConsentChange } from '@/utils/consent/client'
import { ConsentSnapshot, UNDECIDED_CONSENT } from '@/utils/consent/parse'

const getServerSnapshot = (): ConsentSnapshot => UNDECIDED_CONSENT

export const useConsent = (): ConsentSnapshot =>
  useSyncExternalStore(onConsentChange, getConsent, getServerSnapshot)
