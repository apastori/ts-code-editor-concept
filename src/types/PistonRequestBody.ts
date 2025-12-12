import type { languages } from './languages'

export interface PistonRequestBody {
  language: languages
  version: string
  files: Array<{ content: string }>
}