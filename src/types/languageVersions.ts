import type { languages } from './languages'

export type LanguageVersions = {
  [key in languages]: string
}
