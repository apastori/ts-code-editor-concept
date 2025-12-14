import type { JSX } from 'react'
import { styled, keyframes } from 'styled-components'
import type { FourDigitString } from '../types/FourDigitString'

const glow = keyframes`
  0%, 100% {
    text-shadow: 0 0 10px rgba(6, 182, 212, 0.5),
                 0 0 20px rgba(6, 182, 212, 0.3),
                 0 0 30px rgba(6, 182, 212, 0.2);
  }
  50% {
    text-shadow: 0 0 20px rgba(6, 182, 212, 0.8),
                 0 0 30px rgba(6, 182, 212, 0.5),
                 0 0 40px rgba(6, 182, 212, 0.3);
  }
`

const borderPulse = keyframes`
  0%, 100% {
    border-color: rgba(0, 255, 255, 0.5);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  }
  50% {
    border-color: rgba(0, 255, 255, 0.8);
    box-shadow: 0 0 25px rgba(0, 255, 255, 0.5);
  }
`

const CopyrightSection = styled.footer`
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

const CopyrightText = styled.p`
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

export const Copyright = (): JSX.Element => {
  const currentYearNumber: number = new Date().getFullYear()
  const currentYear: FourDigitString = currentYearNumber.toString() as FourDigitString

  return (
    <CopyrightSection>
      <CopyrightText>© {currentYear} Code Executor. All Rights Reserved.</CopyrightText>
    </CopyrightSection>
  )
}
