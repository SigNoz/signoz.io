import { transformBlog, transformComparison, transformGuide } from '@/utils/mdxUtils'

export type Blog = ReturnType<typeof transformBlog>
export type Comparison = ReturnType<typeof transformComparison>
export type Guide = ReturnType<typeof transformGuide>
