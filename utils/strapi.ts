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
