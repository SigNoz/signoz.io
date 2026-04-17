import type { HubspotField } from '../../types/hubspotForm'

export type SelectVariant = 'pills' | 'radio'
export type FormTheme = 'dark' | 'light'

export const themeStyles = {
  dark: {
    input:
      'border-signoz_slate-400 bg-signoz_ink-400 text-signoz_vanilla-300 placeholder-gray-500/50 focus:border-signoz_robin-500 focus:ring-signoz_robin-500',
    label: 'text-gray-500',
    description: 'text-gray-500',
    text: 'text-signoz_vanilla-300',
    textMuted: 'text-gray-400',
    pillSelected: 'border-signoz_robin-500 bg-signoz_robin-500/10 text-signoz_robin-500',
    pillUnselected:
      'border-signoz_slate-400 bg-signoz_ink-400 text-gray-400 hover:border-signoz_slate-200 hover:text-signoz_vanilla-300',
    checkboxBorder: 'border-signoz_slate-100',
    radioBorder: 'border-signoz_slate-100',
    submitButton: 'bg-signoz_robin-500 text-white hover:bg-signoz_robin-500/90',
    error: 'text-red-400',
    submitError: 'border-red-900/50 bg-red-900/20 text-red-300',
    richText: 'text-signoz_vanilla-300',
    successText: 'text-signoz_vanilla-300',
    skeleton: 'bg-signoz_slate-400',
    errorPanel: 'border-signoz_slate-400 bg-signoz_ink-400 text-signoz_vanilla-300',
  },
  light: {
    input:
      'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-signoz_robin-500 focus:ring-signoz_robin-500',
    label: 'text-gray-700',
    description: 'text-gray-500',
    text: 'text-gray-900',
    textMuted: 'text-gray-600',
    pillSelected: 'border-signoz_robin-500 bg-signoz_robin-500/10 text-signoz_robin-500',
    pillUnselected:
      'border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900',
    checkboxBorder: 'border-gray-300',
    radioBorder: 'border-gray-300',
    submitButton: 'bg-signoz_robin-500 text-white hover:bg-signoz_robin-500/90',
    error: 'text-red-500',
    submitError: 'border-red-300 bg-red-50 text-red-600',
    richText: 'text-gray-900',
    successText: 'text-gray-900',
    skeleton: 'bg-gray-200',
    errorPanel: 'border-gray-300 bg-white text-gray-900',
  },
} as const

export type FieldRendererProps = {
  field: HubspotField
  value: string | string[] | boolean
  error?: string
  touched: boolean
  onChange: (value: string | string[] | boolean) => void
  onBlur: () => void
  disabled: boolean
  selectVariant?: SelectVariant
  theme?: FormTheme
}
