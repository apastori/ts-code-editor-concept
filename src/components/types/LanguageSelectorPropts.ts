import type { languages } from '../../types/languages'

interface LanguageSelectorProps {
  language: string
  onSelect: (newLanguage: languages) => void
}

export type { LanguageSelectorProps }