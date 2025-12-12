/**
 * Fetches a URL and returns parsed JSON with proper typing.
 * @template T - The expected type of the parsed JSON data
 * @param {Response} response - The Fetch API Response object
 * @returns {Promise<T>} A promise that resolves to the parsed JSON data typed as `T`
*/

async function parseJSON<T>(response: Response): Promise<T> {
  return response.json() as Promise<T>
}

export { parseJSON }