const API_URL = process.env.SIGNOZ_CMS_API_URL;
const API_PATH = process.env.SIGNOZ_CMS_CHANGELOG_PATH;

export interface ChangelogEntry {
  id: string;
  documentId: string;
  title: string;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface ChangelogResponse {
  data: ChangelogEntry[];
}

export const fetchChangelogEntries = async (): Promise<ChangelogEntry[]> => {
  try {
    const response = await fetch(`${API_URL}${API_PATH}`, {
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

    const data: ChangelogResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching changelog entries:', error);
    throw error;
  }
};
