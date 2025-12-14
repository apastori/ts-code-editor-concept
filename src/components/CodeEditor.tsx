import { useRef, useState, type JSX } from 'react'
import { CODE_SNIPPETS } from '../constants'
import { Editor, type OnMount } from '@monaco-editor/react'
import type * as Monaco from 'monaco-editor'
import type { languages } from '../types/languages'
import { LanguageSelector } from './LanguageSelector'
import { CodeResult } from './CodeResult'
import { styled, keyframes } from 'styled-components'
import { Copyright } from './Copyright'

const glow = keyframes`
  0%, 100% {
    text-shadow: 0 0 10px rgba(6, 182, 212, 0.5),
                 0 0 20px rgba(6, 182, 212, 0.3),
                 0 0 30px rgba(6, 182, 212, 0.2);
  }
  50% {
    text-shadow: 0 0 20px rgba(6, 182, 212, 0.8),
                 0 0 30px rgba(6, 182, 212, 0.5),
                 0 0 40px rgba(6, 182, 212, 0.3);
  }
`

const borderPulse = keyframes`
  0%, 100% {
    border-color: rgba(0, 255, 255, 0.5);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  }
  50% {
    border-color: rgba(0, 255, 255, 0.8);
    box-shadow: 0 0 25px rgba(0, 255, 255, 0.5);
  }
`

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  padding: 2rem;
  color: #e0e7ff;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #06b6d4;
  animation: ${glow} 2s ease-in-out infinite;
  letter-spacing: 2px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`

const EditorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const Panel = styled.div`
  background: rgba(15, 23, 42, 0.6);
  border: 2px solid rgba(0, 255, 255, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  animation: ${borderPulse} 3s ease-in-out infinite;

  &:hover {
    border-color: rgba(0, 255, 255, 0.6);
  }
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #00ffff;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const EditorWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(0, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  margin-top: 1rem;
`

export const CodeEditor = (): JSX.Element => {
  const monacoEditorRef: React.RefObject<Monaco.editor.IStandaloneCodeEditor | null> = useRef<Monaco.editor.IStandaloneCodeEditor>(null)
  const [value, setValue]: [string, React.Dispatch<React.SetStateAction<string>>] = useState<string>('')
  const [language, setLanguage]: [languages, React.Dispatch<React.SetStateAction<languages>>] = useState<languages>('javascript')
  
  const handleEditorMount: OnMount = (editor: Monaco.editor.IStandaloneCodeEditor) => {
    console.log('Editor instance:', editor)
    monacoEditorRef.current = editor
    editor.focus()
  }

  const handleChange = (value?: string | undefined): void => {
    setValue(value ?? '')
  }

  const handleOnSelect = (newLanguage: languages): void => {
    setLanguage(newLanguage)
    setValue(CODE_SNIPPETS[newLanguage])
  }
  
  return (
    <PageContainer>
      <Title>Code Editor</Title>
      <EditorContainer>
        <Panel>
          <SectionTitle>Language</SectionTitle>
          <LanguageSelector language={language} onSelect={handleOnSelect} />
          <EditorWrapper>
            <Editor
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              height='60vh'
              theme='vs-dark'
              language={language}
              defaultValue={CODE_SNIPPETS[language]}
              onMount={handleEditorMount}
              value={value}
              onChange={handleChange}
            />
          </EditorWrapper>
        </Panel>
        <Panel>
          <SectionTitle>Output</SectionTitle>
          <CodeResult language={language} editorRef={monacoEditorRef} />
        </Panel>
      </EditorContainer>
      <Copyright />
    </PageContainer>
  )
}
