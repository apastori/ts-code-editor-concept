import { type JSX } from 'react'
import { CodeEditor } from './components/CodeEditor'

function App(): JSX.Element {
  return (
    <div className='code-editor-app'>
      <CodeEditor />
    </div>
  )
}

export default App
