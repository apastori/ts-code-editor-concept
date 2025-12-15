import { LANGUAGE_VERSIONS } from './constants'
import { APIPistonError } from './errors/APIPistonError'
import { URLNotValidError } from './errors/URLNotValidError'
import type { languages } from './types/languages'
import type { PistonResponse } from './types/PistonAPIResult'
import type { PistonRequestBody } from './types/PistonRequestBody'
import { isValidURL } from './utils/isValidURL'
import { parseJSON } from './utils/parseJSON'

const BASE_URL: string = 'https://emkc.org/api/v2/piston'

if (!isValidURL(BASE_URL)) throw new URLNotValidError(BASE_URL)

export const executeCode = async (
  language: languages,
  sourceCode: string
): Promise<PistonResponse> => {
  const bodyAPIRequest: PistonRequestBody = {
    language,
    version: LANGUAGE_VERSIONS[language],
    files: [{ content: sourceCode }]
  }
  const response: Response = await fetch(`${BASE_URL}/execute`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyAPIRequest)
  })

  if (!response.ok) {
    throw new APIPistonError(response.status)
  }

  return parseJSON<PistonResponse>(response)
}
