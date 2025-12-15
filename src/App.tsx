import type { JSX } from 'react'
import { CodeEditor } from './components/CodeEditor'
import { GlobalStyles } from './styles/GlobalStyles'
import { AppContainer, Title } from './styles/App.style'

function App(): JSX.Element {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Title>Code Executor</Title>
        <CodeEditor />
      </AppContainer>
    </>
  )
}

export default App
