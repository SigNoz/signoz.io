// utils/github.js
const fetchGitHubReleaseData = async (owner, repo, tag, token) => {
    const API_URL = `https://api.github.com/repos/${owner}/${repo}/releases/tags/${tag}`;
    
    const response = await fetch(API_URL, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      cache: 'no-store', // Avoid caching
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    return data;
  };
  
  export { fetchGitHubReleaseData };
  