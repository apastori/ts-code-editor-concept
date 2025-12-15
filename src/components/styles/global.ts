import { keyframes } from 'styled-components'

export const glow = keyframes`
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

export const borderPulse = keyframes`
  0%, 100% {
    border-color: rgba(0, 255, 255, 0.5);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  }
  50% {
    border-color: rgba(0, 255, 255, 0.8);
    box-shadow: 0 0 25px rgba(0, 255, 255, 0.5);
  }
`