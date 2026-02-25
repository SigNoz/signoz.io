import qs from 'qs'

const API_URL = process.env.NEXT_PUBLIC_SIGNOZ_CMS_API_URL
const API_PATH = process.env.SIGNOZ_CMS_CHANGELOG_PATH
const API_SUBSCRIPTION_PATH = process.env.NEXT_PUBLIC_SIGNOZ_CMS_SUBSCRIPTION_PATH

export const SupportedImageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
export const SupportedVideoTypes = ['.mp4', '.webm']

export enum DeploymentType {
  ALL = 'All',
  CLOUD_ONLY = 'Cloud Only',
  OSS_ONLY = 'OSS Only',
}

export const DeploymentTypeLabels = {
  [DeploymentType.ALL]: 'All',
  [DeploymentType.CLOUD_ONLY]: 'Cloud',
  [DeploymentType.OSS_ONLY]: 'Community Edition',
}

export const DeploymentTypeColors: Record<DeploymentType, string> = {
  [DeploymentType.ALL]: 'bg-signoz_robin-500',
  [DeploymentType.CLOUD_ONLY]: 'bg-signoz_sakura-500',
  [DeploymentType.OSS_ONLY]: 'bg-signoz_sienna-500',
}

export type Media = {
  id: number
  documentId: string
  ext: string
  url: string
  mime: string
  alternativeText: string
  [key: string]: any // Allow other fields (e.g., mime, size) to be flexible
}

export type Feature = {
  id: number
  documentId: string
  title: string
  sort_order: number | null
  createdAt: string
  updatedAt: string
  publishedAt: string
  description: string
  deployment_type: string | null
  media: Media | null
}

export type ReleaseChangelog = {
  id: number
  documentId: string
  version: string
  release_date: string
  bug_fixes: string
  maintenance: string | null
  createdAt: string
  updatedAt: string
  publishedAt: string
  features: Feature[]
}

type ChangelogApiResponse = {
  data: ReleaseChangelog[]
  meta: {
    pagination: TPagination
  }
}

export type ChangelogByIdApiResponse = {
  data: ReleaseChangelog
  meta: {}
}

export type TPagination = {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

type ChangelogEntriesResponse = {
  changelogs: ReleaseChangelog[]
  pagination: TPagination
}

interface FetchChangelogEntriesParams {
  deployment_type?: DeploymentType
  page?: number
  pageSize?: number
}

export const fetchChangelogEntries = async (
  params: FetchChangelogEntriesParams
): Promise<ChangelogEntriesResponse> => {
  try {
    const queryObject = {
      sort: {
        release_date: 'desc',
      },
      populate: {
        features: {
          sort: ['sort_order:asc'],
          populate: {
            media: {
              fields: 'id,ext,url,mime,alternativeText', // Specify the fields you want to include
            },
          },
        },
      },
      pagination: {
        page: params.page || 1, // Default to page 1 if not provided
        pageSize: params.pageSize || 2, // Default to page size of 10 if not provided
      },
    }

    // If a specific deployment type is provided, filter out the others, All will not be excluded
    if (
      params?.deployment_type &&
      Object.values(DeploymentType).includes(params?.deployment_type) &&
      params.deployment_type !== DeploymentType.ALL
    ) {
      const excludedDeploymentTypes = Object.values(DeploymentType).filter(
        (type) => type !== params?.deployment_type && type !== DeploymentType.ALL
      )
      queryObject.populate.features['filters'] = {
        ...queryObject.populate.features['filters'],
        deployment_type: {
          $notIn: excludedDeploymentTypes, // Exclude the specified deployment type
        },
      }
    }

    const queryParams = qs.stringify(queryObject, {
      encode: false, // Prevent encoding of square brackets
      addQueryPrefix: true, // Add '?' at the beginning
      arrayFormat: 'repeat', // Use repeat format for arrays
    })

    const response = await fetch(`${API_URL}${API_PATH}${queryParams}`, {
      headers: {
        'Cache-Control': 'no-store', // Avoid caching
        Pragma: 'no-cache',
        Expires: '0',
      },
      cache: 'no-store', // For fetch requests
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Network response was not ok: ${errorMessage}`)
    }

    const data: ChangelogApiResponse = await response.json()
    return {
      changelogs: data.data,
      pagination: data.meta.pagination,
    }
  } catch (error) {
    console.error('Error fetching changelog entries:', error)
    throw error
  }
}

export const saveChangelogSubscription = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}${API_SUBSCRIPTION_PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          email,
        },
      }),
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      console.error('Network response was not ok:', errorMessage)
      return false
    }
    return true
  } catch (error) {
    console.error('Error saving changelog subscription:', error)
    return false
  }
}

export const fetchChangelogById = async (
  changelogId: string
): Promise<ChangelogByIdApiResponse> => {
  try {
    const queryObject = {
      populate: {
        features: {
          sort: ['sort_order:asc'],
          populate: {
            media: {
              fields: 'id,ext,url,mime,alternativeText', // Specify the fields you want to include
            },
          },
        },
      },
    }
    const queryParams = qs.stringify(queryObject, {
      encode: false, // Prevent encoding of square brackets
      addQueryPrefix: true, // Add '?' at the beginning
      arrayFormat: 'repeat', // Use repeat format for arrays
    })

    const response = await fetch(`${API_URL}${API_PATH}/${changelogId}${queryParams}`, {
      headers: {
        'Cache-Control': 'no-store', // Avoid caching
        Pragma: 'no-cache',
        Expires: '0',
      },
      cache: 'no-store', // For fetch requests
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Network response was not ok: ${errorMessage}`)
    }
    const data: ChangelogByIdApiResponse = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching changelog by id ${changelogId}:`, error)
    throw error
  }
}

// MDX Content schema
export type MDXContent = {
  id: number
  documentId: string
  title: string
  slug: string
  path: string
  content: string
  excerpt?: string
  publishedAt: string
  createdAt: string
  updatedAt: string
  [key: string]: any
}

export type MDXContentApiResponse = {
  data: MDXContent[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type MDXContentByIdApiResponse = {
  data: MDXContent
  meta: {}
}

// Cache for storing paths to avoid repeated API calls - avoid later maybe
let pathsCache: string[] | null = null
let pathsCacheTimestamp: number = 0
const PATHS_CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// Fetch MDX content by path or all content for a collection
export const fetchMDXContentByPath = async (
  collectionName: string,
  path?: string,
  deployment_status?: string,
  fetchAll: boolean = false
): Promise<MDXContentByIdApiResponse | MDXContentApiResponse> => {
  try {
    const queryObject: any = {
      populate: '*',
      pagination: {
        page: 1,
        pageSize: 100,
      },
      sort: ['publishedAt:desc'],
    }

    // Add filters only if not fetching all
    if (!fetchAll) {
      if (!path) {
        throw new Error('Path is required when fetchAll is false')
      }
      // Ensure path starts with a slash and has no trailing slashes
      const normalizedPath = `/${path.replace(/^\/+|\/+$/g, '')}`

      queryObject.filters = {
        path: {
          $eq: normalizedPath,
        },
      }

      if (deployment_status) {
        queryObject.filters.deployment_status = {
          $eq: deployment_status,
        }
      }
    } else {
      // Optionally filter by deployment status for list views
      if (deployment_status) {
        queryObject.filters = {
          deployment_status: {
            $eq: deployment_status,
          },
        }
      }
    }

    if (!API_URL) {
      throw new Error('NEXT_PUBLIC_SIGNOZ_CMS_API_URL is not configured')
    }

    // If fetchAll is true, fetch all pages and combine results
    if (fetchAll) {
      let allData: MDXContent[] = []
      let currentPage = 1
      let totalPages = 1
      let finalMeta: any = {}

      do {
        queryObject.pagination.page = currentPage

        const queryParams = qs.stringify(queryObject, {
          encode: false,
          addQueryPrefix: true,
          arrayFormat: 'repeat',
        })

        const response = await fetch(`${API_URL}/api/${collectionName}${queryParams}`, {
          next: {
            tags: [`${collectionName}-list`],
          },
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
            Pragma: 'no-cache',
            Expires: '0',
          },
          cache: 'no-store',
        })

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Content not found')
          }
          const errorMessage = await response.text()
          throw new Error(`Network response was not ok: ${response.status} ${errorMessage}`)
        }

        const data: MDXContentApiResponse = await response.json()

        if (data.data && data.data.length > 0) {
          allData = allData.concat(data.data)
        }

        totalPages = data.meta.pagination.pageCount
        finalMeta = data.meta
        currentPage++
      } while (currentPage <= totalPages)

      // Update the pagination meta to reflect all data
      finalMeta.pagination = {
        page: 1,
        pageSize: allData.length,
        pageCount: 1,
        total: allData.length,
      }

      return {
        data: allData,
        meta: finalMeta,
      }
    }

    // Single content fetch
    const queryParams = qs.stringify(queryObject, {
      encode: false,
      addQueryPrefix: true,
      arrayFormat: 'repeat',
    })

    const response = await fetch(`${API_URL}/api/${collectionName}${queryParams}`, {
      next: {
        tags: [`${collectionName}-${path}`],
      },
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        Pragma: 'no-cache',
        Expires: '0',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Content not found')
      }
      const errorMessage = await response.text()
      throw new Error(`Network response was not ok: ${response.status} ${errorMessage}`)
    }

    const data: MDXContentApiResponse = await response.json()

    if (!data.data || data.data.length === 0) {
      throw new Error('Content not found')
    }

    return {
      data: data.data[0],
      meta: {},
    }
  } catch (error) {
    console.error(`Error fetching MDX content for ${collectionName}:`, error)
    throw error
  }
}

// Fetch Authors by key - has path nesting
export const fetchAuthorByKey = async (key: string): Promise<MDXContentByIdApiResponse> => {
  try {
    const queryObject = {
      filters: {
        key: {
          $eq: key,
        },
      },
    }

    const queryParams = qs.stringify(queryObject, {
      encode: false,
      addQueryPrefix: true,
      arrayFormat: 'repeat',
    })

    if (!API_URL) {
      throw new Error('NEXT_PUBLIC_SIGNOZ_CMS_API_URL is not configured')
    }

    const response = await fetch(`${API_URL}/api/authors${queryParams}`, {
      next: {
        // revalidate: 3600, // Same as export const revalidate = 3600; in the page - we need no-store, only one should be specified
        tags: [`authors-${key}`],
      },
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store', // Avoid caching
        Pragma: 'no-cache',
        Expires: '0',
      },
      cache: 'no-store', // For fetch requests
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Content not found')
      }
      const errorMessage = await response.text()
      throw new Error(`Network response was not ok: ${response.status} ${errorMessage}`)
    }

    const data: any = await response.json()

    if (!data.data || data.data.length === 0) {
      throw new Error('Content not found')
    }

    return {
      data: data.data[0],
      meta: {},
    }
  } catch (error) {
    console.error(`Error fetching Authors by key ${key}:`, error)
    throw error
  }
}

// Fetch all MDX content paths for static generation if needed
// This is unused for now, we can remove it later if needed
export const fetchAllMDXPaths = async (
  collectionName: string,
  useCache: boolean = true
): Promise<string[]> => {
  // Check cache first
  if (useCache && pathsCache && Date.now() - pathsCacheTimestamp < PATHS_CACHE_TTL) {
    return pathsCache
  }

  try {
    const queryObject = {
      fields: ['path'],
      pagination: {
        pageSize: 1000, // TODO: Adjust based on content volume
      },
      sort: ['publishedAt:desc'],
    }

    const queryParams = qs.stringify(queryObject, {
      encode: false,
      addQueryPrefix: true,
      arrayFormat: 'repeat',
    })

    const response = await fetch(`${API_URL}/api/${collectionName}${queryParams}`, {
      next: {
        // revalidate: 3600, // Same as export const revalidate = 3600; in the page - we need no-store, only one should be specified
        tags: [`${collectionName}-paths`],
      },
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store', // Avoid caching
        Pragma: 'no-cache',
        Expires: '0',
      },
      cache: 'no-store', // For fetch requests
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Network response was not ok: ${response.status} ${errorMessage}`)
    }

    const data: MDXContentApiResponse = await response.json()
    const paths = data.data.map((item) => item.path)

    // Update cache
    pathsCache = paths
    pathsCacheTimestamp = Date.now()

    return paths
  } catch (error) {
    console.error('Error fetching all MDX paths:', error)
    // Return cached data if available, otherwise empty array
    return pathsCache || []
  }
}

// Utility function to validate MDX content structure
export const validateMDXContent = (content: any): content is MDXContent => {
  return (
    content &&
    typeof content.id === 'number' &&
    typeof content.documentId === 'string' &&
    typeof content.title === 'string' &&
    typeof content.slug === 'string' &&
    typeof content.path === 'string' &&
    typeof content.content === 'string' &&
    typeof content.publishedAt === 'string' &&
    typeof content.createdAt === 'string' &&
    typeof content.updatedAt === 'string'
  )
}

// Clear the paths cache (useful for revalidation)
export const clearPathsCache = (): void => {
  pathsCache = null
  pathsCacheTimestamp = 0
}
