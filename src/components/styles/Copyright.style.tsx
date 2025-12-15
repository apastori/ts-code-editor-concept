import { styled } from 'styled-components'
import { borderPulse, glow } from './global'


export const CopyrightSection = styled.footer`
  max-width: 1400px;
  margin: 3rem auto 0;
  padding: 2rem;
  text-align: center;
  background: rgba(15, 23, 42, 0.4);
  border: 2px solid rgba(0, 255, 255, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  animation: ${borderPulse} 4s ease-in-out infinite;

  @media (max-width: 768px) {
    margin: 2rem auto 0;
    padding: 1.5rem;
  }
`

export const CopyrightText = styled.p`
  color: #00ffff;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
  margin: 0;
  animation: ${glow} 3s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`