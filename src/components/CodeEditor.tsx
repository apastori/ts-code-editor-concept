import { Editor, type OnMount } from '@monaco-editor/react'
import type * as Monaco from 'monaco-editor'
import { type JSX, useRef, useState } from 'react'
import { CODE_SNIPPETS } from '../constants'
import type { languages } from '../types/languages'
import { CodeResult } from './CodeResult'
import { Copyright } from './Copyright'
import { LanguageSelector } from './LanguageSelector'
import {
  EditorContainer,
  EditorWrapper,
  PageContainer,
  Panel,
  SectionTitle,
  Title
} from './styles/CodeEditor.style'

const CodeEditor = (): JSX.Element => {
  const monacoEditorRef: React.RefObject<Monaco.editor.IStandaloneCodeEditor | null> =
    useRef<Monaco.editor.IStandaloneCodeEditor>(null)
  const [value, setValue]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>('')
  const [language, setLanguage]: [
    languages,
    React.Dispatch<React.SetStateAction<languages>>
  ] = useState<languages>('javascript')

  const handleEditorMount: OnMount = (
    editor: Monaco.editor.IStandaloneCodeEditor
  ) => {
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
                  enabled: false
                }
              }}
              height="60vh"
              theme="vs-dark"
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

export { CodeEditor }
