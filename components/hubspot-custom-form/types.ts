import type { HubspotField } from '../../types/hubspotForm'

export type SelectVariant = 'pills' | 'radio'
export type FormTheme = 'dark' | 'light'

export const themeStyles = {
  dark: {
    input:
      'border-border bg-card text-muted-foreground placeholder-gray-500/50 focus:border-primary focus:ring-ring',
    label: 'text-gray-500',
    description: 'text-gray-500',
    text: 'text-muted-foreground',
    textMuted: 'text-gray-400',
    pillSelected: 'border-primary bg-primary/10 text-primary',
    pillUnselected:
      'border-border bg-card text-gray-400 hover:border-l2-border hover:text-muted-foreground',
    checkboxBorder: 'border-l3-border',
    radioBorder: 'border-l3-border',
    submitButton: 'bg-primary text-white hover:bg-primary/90',
    error: 'text-red-400',
    submitError: 'border-red-900/50 bg-red-900/20 text-red-300',
    richText: 'text-muted-foreground',
    successText: 'text-muted-foreground',
    skeleton: 'bg-muted',
    errorPanel: 'border-border bg-card text-muted-foreground',
  },
  light: {
    input:
      'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-ring',
    label: 'text-gray-700',
    description: 'text-gray-500',
    text: 'text-gray-900',
    textMuted: 'text-gray-600',
    pillSelected: 'border-primary bg-primary/10 text-primary',
    pillUnselected:
      'border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900',
    checkboxBorder: 'border-gray-300',
    radioBorder: 'border-gray-300',
    submitButton: 'bg-primary text-white hover:bg-primary/90',
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
