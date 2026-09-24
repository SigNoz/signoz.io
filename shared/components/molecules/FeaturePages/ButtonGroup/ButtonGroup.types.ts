export type ButtonGroupVariant =
  'default' | 'secondary' | 'ghost' | 'tactilePrimary' | 'tactileSecondary'

export interface ButtonGroupButtonBase {
  text: string
  variant: ButtonGroupVariant
  size?: 'default' | 'sm' | 'lg'
  /** Defaults to the pill shape; pass 'default' for the squarer corner radius. */
  rounded?: 'default' | 'full'
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
