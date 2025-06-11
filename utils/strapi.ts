import qs from 'qs'

const API_URL = process.env.SIGNOZ_CMS_API_URL
const API_PATH = process.env.SIGNOZ_CMS_CHANGELOG_PATH

export enum DeploymentType {
  ALL = 'All',
  CLOUD_ONLY = 'Cloud Only',
  OSS_ONLY = 'OSS Only',
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
  bug_fixes: string[]
  maintenance: string[] | null
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

export type TPagination = {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

type ReleaseChangelogResponse = {
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
): Promise<ReleaseChangelogResponse> => {
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
              fields: 'id,ext,url,mime', // Specify the fields you want to include
            },
          },
        },
      },
      pagination: {
        page: params.page || 1, // Default to page 1 if not provided
        pageSize: params.pageSize || 2, // Default to page size of 10 if not provided
      },
    }

    if (
      params?.deployment_type &&
      Object.values(DeploymentType).includes(params?.deployment_type) &&
      params.deployment_type !== DeploymentType.ALL
    ) {
      queryObject.populate.features['filters'] = {
        ...queryObject.populate.features['filters'],
        deployment_type: {
          $eq: params.deployment_type,
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
