/**
 * Validates if a string is a valid URL
 * @param {string} url - The string to validate
 * @returns {boolean} true if valid URL, false otherwise
 */

function isValidURL(url: string): boolean {
  try {
    const urlObject: URL = new URL(url)
    // Check if protocol is http or https
    return urlObject.protocol === 'http:' || urlObject.protocol === 'https:'
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return false
  }
}

export { isValidURL }
