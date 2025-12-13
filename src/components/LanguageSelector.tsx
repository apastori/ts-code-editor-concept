import React, { useEffect, useRef, useState, type JSX } from 'react'
import { LANGUAGE_VERSIONS } from '../constants'
import type { LanguageSelectorProps } from './types/LanguageSelectorProps'
import type { languages } from '../types/languages'
import { styled, keyframes } from 'styled-components'

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
  }
`

const Container = styled.div`
  margin-bottom: 1.5rem;
`

const MenuWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`

const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(168, 85, 247, 0.1));
  border: 2px solid rgba(0, 255, 255, 0.5);
  border-radius: 8px;
  color: #e0e7ff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: left;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    border-color: rgba(0, 255, 255, 0.8);
    background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(168, 85, 247, 0.2));
    animation: ${pulse} 1.5s ease-in-out infinite;

    &::before {
      left: 100%;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 255, 255, 0.3);
  }
`

const Dropdown = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  background: rgba(15, 23, 42, 0.95);
  border: 2px solid rgba(0, 255, 255, 0.5);
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  z-index: 50;
  padding: 0.5rem 0;
  list-style: none;
  backdrop-filter: blur(10px);
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 255, 255, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 255, 255, 0.7);
  }
`

const MenuItem = styled.li<{ $isActive: boolean }>`
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ $isActive }) => ($isActive ? '#00ffff' : '#e0e7ff')};
  background: ${({ $isActive }) => ($isActive ? 'rgba(0, 255, 255, 0.1)' : 'transparent')};
  border-left: 3px solid ${({ $isActive }) => ($isActive ? '#00ffff' : 'transparent')};

  &:hover {
    background: rgba(0, 255, 255, 0.15);
    border-left-color: #00ffff;
    color: #00ffff;
  }
`

const Version = styled.span`
  color: #94a3b8;
  font-size: 0.875rem;
  margin-left: 0.5rem;
`

const languages_tuples: [languages, string][] = Object.entries(LANGUAGE_VERSIONS) as [languages, string][]

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onSelect }: LanguageSelectorProps): JSX.Element => {
  const [isOpen, setIsOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false)
  const menuRef: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null)

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
          </ Dropdown>
        )}
      </MenuWrapper>
    </Container>
  )
}

export { LanguageSelector }