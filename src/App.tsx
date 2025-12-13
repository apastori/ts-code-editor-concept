import type { JSX } from 'react'
import { CodeEditor } from './components/CodeEditor'
import { styled, keyframes } from 'styled-components'

const glow = keyframes`
  0%, 100% {
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5),
                 0 0 20px rgba(0, 255, 255, 0.3),
                 0 0 30px rgba(0, 255, 255, 0.2);
  }
  50% {
    text-shadow: 0 0 20px rgba(0, 255, 255, 0.8),
                 0 0 30px rgba(0, 255, 255, 0.5),
                 0 0 40px rgba(0, 255, 255, 0.3);
  }
`

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  color: white;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #00ffff;
  animation: ${glow} 2s ease-in-out infinite;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`

const GlobalStyles = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

function App(): JSX.Element {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Title>Code Editor</Title>
        <CodeEditor />
      </AppContainer>
    </>
  )
}

export default App
