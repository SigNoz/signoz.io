export type ButtonGroupVariant = 'default' | 'secondary'

export interface ButtonGroupButtonBase {
  text: string
  variant: ButtonGroupVariant
  size?: 'default' | 'sm' | 'lg'
  icon?: React.ReactNode
  className?: string
  tracking?: {
    clickType: string
    clickName?: string
    clickLocation?: string
    clickText?: string
  }
}

export type ButtonGroupButton = ButtonGroupButtonBase & {
  href: string
}

export interface ButtonGroupProps {
  buttons: ButtonGroupButton[]
  className?: string
}
