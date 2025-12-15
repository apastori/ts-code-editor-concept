import { styled } from 'styled-components'
import { glow } from './glow.style'

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

export { AppContainer, Title }
