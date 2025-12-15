import type { JSX } from 'react'
import { CodeEditor } from './components/CodeEditor'
import { AppContainer, Title } from './styles/App.style'
import { GlobalStyles } from './styles/GlobalStyles'

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
