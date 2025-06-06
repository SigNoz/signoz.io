import qs from 'qs';

const API_URL = process.env.SIGNOZ_CMS_API_URL;
const API_PATH = process.env.SIGNOZ_CMS_CHANGELOG_PATH;

enum DeploymentType {
  CLOUD_ONLY = 'Cloud Only',
  SELF_HOSTED = 'Self Hosted',
}

export type Media = {
  id: number;
  documentId: string;
  ext: string;
  url: string;
  mime: string;
  [key: string]: any; // Allow other fields (e.g., mime, size) to be flexible
};

export type Feature = {
  id: number;
  documentId: string;
  title: string;
  sort_order: number | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string;
  deployment_type: string | null;
  media: Media | null;
};

export type ReleaseChangelog = {
  id: number;
  documentId: string;
  version: string;
  release_date: string;
  bug_fixes: string[];
  maintenance: string[] | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  features: Feature[];
};

type ReleaseChangelogResponse = {
  data: ReleaseChangelog[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export const fetchChangelogEntries = async (deployment_type?: DeploymentType): Promise<ReleaseChangelog[]> => {
  try {
    const queryObject = {
      populate: {
        features: {
          sort: ['sort_order:asc'],
          populate: {
            media: {
              fields: 'id,ext,url,mime', // Specify the fields you want to include
            }
          },
        },    
      },
    };

    if (deployment_type && Object.values(DeploymentType).includes(deployment_type)) {
      queryObject.populate.features['filters'] = {
        ...queryObject.populate.features['filters'],
        deployment_type: {
          $eq: deployment_type,
        },
      }
    }

    const queryParams = qs.stringify(queryObject, {
      encode: false, // Prevent encoding of square brackets
      addQueryPrefix: true, // Add '?' at the beginning
      arrayFormat: 'repeat', // Use repeat format for arrays
    });

    const url = `http://localhost:1337/api/release-changelogs${queryParams}`;
    console.log('Fetching changelog entries from:', url);
    const response = await fetch(`http://localhost:1337/api/release-changelogs${queryParams}`, {
      headers: {
        'Cache-Control': 'no-store', // Avoid caching
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      cache: 'no-store', // For fetch requests
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Network response was not ok: ${errorMessage}`);
    }

    const data: ReleaseChangelogResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching changelog entries:', error);
    throw error;
  }
};
