const API_URL = process.env.SIGNOZ_CMS_API_URL;

interface ChangelogEntry {
  id: string;
  attributes: {
    title: string;
    description: string;
    date: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface ChangelogResponse {
  data: ChangelogEntry[];
}

export const fetchChangelogEntries = async (): Promise<ChangelogEntry[]> => {
  try {
    const response = await fetch(`${API_URL}/api/changelogs?sort[0]=createdAt:desc&pagination[limit]=5`, {
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
