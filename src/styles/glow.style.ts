import { keyframes } from 'styled-components'

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

export { glow }
