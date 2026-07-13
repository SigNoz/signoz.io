function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function chunk(array, size) {
  const chunks = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

function createRetryFn({ maxRetries = 5, initialDelayMs = 1000, sleepFn = sleep } = {}) {
  return async function withRetry(fn, label) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn()
      } catch (error) {
        if (attempt === maxRetries) {
          throw error
        }

        const status = error.response?.status
        const code = error.code

        let delayMs
        if (status === 429 && error.response?.headers?.['retry-after']) {
          delayMs = parseInt(error.response.headers['retry-after'], 10) * 1000
          if (isNaN(delayMs)) delayMs = initialDelayMs * Math.pow(2, attempt - 1)
        } else {
          delayMs = initialDelayMs * Math.pow(2, attempt - 1)
        }

        console.warn(
          `  ⚠️ [${label}] Attempt ${attempt}/${maxRetries} failed (${status || code || error.message}). Retrying in ${delayMs}ms...`
        )
        await sleepFn(delayMs)
      }
    }
  }
}

module.exports = { sleep, chunk, createRetryFn }
