const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:1337';

export const fetchChangelogEntries = async () => {
  try {
    const response = await fetch(`${API_URL}/api/changelogs`, {
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

    const data = await response.json();
    return data.data; // Adjust according to Strapi v4 response structure
  } catch (error) {
    console.error('Error fetching changelog entries:', error);
    throw error;
  }
};
