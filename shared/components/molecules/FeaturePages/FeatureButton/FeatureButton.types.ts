export interface FeatureButtonConfig {
  text: string
  href: string
  tracking?: {
    clickType: string
    clickName?: string
    clickLocation?: string
    clickText?: string
  }
}
