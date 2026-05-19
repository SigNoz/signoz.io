import { transformComparison, transformGuide } from '@/utils/mdxUtils'

export type Comparison = ReturnType<typeof transformComparison>
export type Guide = ReturnType<typeof transformGuide>
