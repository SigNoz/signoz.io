import { transformBlog, transformComparison, transformGuide } from '@/utils/mdxUtils'

export type AuthorDetail = { name?: string; url?: string; image_url?: string }

export type Blog = ReturnType<typeof transformBlog>
export type Comparison = ReturnType<typeof transformComparison>
export type Guide = ReturnType<typeof transformGuide>
