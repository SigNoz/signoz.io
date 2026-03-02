export interface ButtonGroupProps {
  buttons: Array<{
    text: string
    href: string
    variant: 'default' | 'secondary' | 'ghost'
    icon?: React.ReactNode
    className?: string
    tracking?: {
      clickType: string
      clickName?: string
      clickLocation?: string
      clickText?: string
    }
  }>
  className?: string
}
