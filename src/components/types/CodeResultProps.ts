import type * as Monaco from 'monaco-editor'
import type { languages } from '../../types/languages'

export interface CodeResultProps {
  language: languages
  editorRef: React.RefObject<Monaco.editor.IStandaloneCodeEditor | null>
}
