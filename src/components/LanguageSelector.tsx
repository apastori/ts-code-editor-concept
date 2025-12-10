import React, { useEffect, useRef, useState, type CSSProperties, type JSX } from 'react'
import { LANGUAGE_VERSIONS } from '../constants'
import type { LanguageSelectorProps } from './types/LanguageSelectorPropts'
import type { languages } from '../types/languages'

const styles: Record<string, CSSProperties> = {
  container: {
    marginLeft: '8px',
    marginBottom: '16px',
  },
  label: {
    marginBottom: '8px',
    fontSize: '18px',
  },
  menuWrapper: {
    position: 'relative',
    display: 'inline-block',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#1a1a2e',
    border: '1px solid #333',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  },
  dropdown: {
    position: 'absolute',
    left: 0,
    marginTop: '4px',
    minWidth: '160px',
    backgroundColor: '#110c1b',
    border: '1px solid #333',
    borderRadius: '6px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    zIndex: 50,
    padding: '4px 0',
    listStyle: 'none',
  },
  menuItem: {
    padding: '8px 12px',
    cursor: 'pointer',
    transition: 'background-color 0.2s, color 0.2s',
    color: '#fff',
  },
  menuItemActive: {
    color: '#60a5fa',
    backgroundColor: '#1f1f2e',
  },
  version: {
    color: '#6b7280',
    fontSize: '12px',
    marginLeft: '4px',
  },
}

const languages_tuples: [languages, string][] = Object.entries(LANGUAGE_VERSIONS) as [languages, string][]

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onSelect }: LanguageSelectorProps): JSX.Element => {
  const [isOpen, setIsOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false)
  const [hoveredItem, setHoveredItem]: [string | null, React.Dispatch<React.SetStateAction<string | null>>]= useState<string | null>(null)
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
    <div style={styles.container}>
      <p style={styles.label}>Language:</p>
      <div ref={menuRef} style={styles.menuWrapper}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={styles.button}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2a2a3e')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1a1a2e')}
        >
          {language}
        </button>

        {isOpen && (
          <ul style={styles.dropdown}>
            {languages_tuples.map(([lang, version]: [languages, string]) => {
              const isActive: boolean = lang === language
              const isHovered: boolean = hoveredItem === lang
              return (
                <li
                  key={lang}
                  onClick={() => {
                    onSelect(lang)
                    setIsOpen(false)
                  }}
                  onMouseEnter={() => setHoveredItem(lang)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    ...styles.menuItem,
                    ...(isActive || isHovered ? styles.menuItemActive : {}),
                  }}
                >
                  {lang}
                  <span style={styles.version}>({version})</span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export { LanguageSelector }