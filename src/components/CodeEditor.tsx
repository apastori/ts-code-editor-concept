import { useRef, useState, type JSX } from 'react'
import { CODE_SNIPPETS } from '../constants'
import { Editor, type OnMount } from '@monaco-editor/react'
import type * as Monaco from 'monaco-editor'
import type { languages } from '../types/languages'
import { LanguageSelector } from './LanguageSelector'
import { CodeResult } from './CodeResult'

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
    <div className='code-editor'>
      <LanguageSelector language={language} onSelect={handleOnSelect} />
      <Editor
        options={{
          minimap: {
            enabled: false,
          },
        }}
        height='75vh'
        theme='vs-dark'
        language={language}
        defaultValue={CODE_SNIPPETS[language]}
        onMount={handleEditorMount}
        value={value}
        onChange={handleChange}
      />
      <CodeResult 
        language={language} 
        editorRef={monacoEditorRef}  
      />
    </div>
  )
}
