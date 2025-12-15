import React, { type JSX, useEffect, useRef, useState } from 'react'
import { LANGUAGE_VERSIONS } from '../constants'
import type { languages } from '../types/languages'
import {
  Button,
  Container,
  Dropdown,
  MenuItem,
  MenuWrapper,
  Version
} from './styles/LanguageSelector.style'
import type { LanguageSelectorProps } from './types/LanguageSelectorProps'

const languages_tuples: [languages, string][] = Object.entries(
  LANGUAGE_VERSIONS
) as [languages, string][]

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  onSelect
}: LanguageSelectorProps): JSX.Element => {
  const [isOpen, setIsOpen]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false)
  const menuRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <Container>
      <MenuWrapper ref={menuRef}>
        <Button onClick={() => setIsOpen(!isOpen)}>{language}</Button>
        {isOpen && (
          <Dropdown>
            {languages_tuples.map(([lang, version]: [languages, string]) => {
              const isActive: boolean = lang === language
              return (
                <MenuItem
                  key={lang}
                  onClick={() => {
                    onSelect(lang)
                    setIsOpen(false)
                  }}
                  $isActive={isActive}
                >
                  {lang}
                  <Version>({version})</Version>
                </MenuItem>
              )
            })}
          </Dropdown>
        )}
      </MenuWrapper>
    </Container>
  )
}

export { LanguageSelector }
