import { styled } from 'styled-components'
import { borderPulse, glow } from './global'

export const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  padding: 2rem;
  color: #e0e7ff;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

export const Title = styled.h1`
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

export const EditorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

export const Panel = styled.div`
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

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #00ffff;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`

export const EditorWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(0, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  margin-top: 1rem;
`
