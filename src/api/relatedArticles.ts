const defaultOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

const cache = {};

export const fetchRelatedArticles = async (
  url,
  cacheKey,
  cacheTime,
  options
) => {
  const cachedResponse = getCachedResponse(cacheKey);
  if (cachedResponse) {
    const cacheAge = Date.now() - cachedResponse.timestamp;
    if (cacheAge < cacheTime) {
      return cachedResponse.data;
    } else {
      delete cache[cacheKey];
    }
  }

  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const requestOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    const relatedArticles = JSON.parse(
      responseData?.records[0]?.fields?.relatedArticles
    );

    cacheResponse(cacheKey, relatedArticles);

    return relatedArticles;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const cacheResponse = (cacheKey, responseData) => {
  const cachedResponse = {
    data: responseData,
    timestamp: Date.now(),
  };
  cache[cacheKey] = cachedResponse;
};

const getCachedResponse = (cacheKey) => {
  return cache[cacheKey] || null;
};
