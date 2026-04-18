export interface ButtonGroupButtonBase {
  text: string
  variant: 'default' | 'secondary' | 'ghost'
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
