import { styled, keyframes } from 'styled-components'
import type { ToastStatus } from '../types/ToastStatus'

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

const buttonGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.4), 0 0 30px rgba(0, 255, 255, 0.2);
  }
  50% {
    box-shadow: 0 0 25px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.3);
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const RunButton = styled.button`
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.8), rgba(138, 43, 226, 0.6));
  color: white;
  border-radius: 8px;
  border: 2px solid rgba(0, 255, 255, 0.6);
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, rgba(0, 255, 255, 1), rgba(138, 43, 226, 0.8));
    animation: ${buttonGlow} 1.5s ease-in-out infinite;
    transform: translateY(-2px);

    &::before {
      left: 100%;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: rgba(0, 255, 255, 0.3);
  }
`

export const ErrorBox = styled.div`
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 2px solid rgba(239, 68, 68, 0.5);
  color: #fca5a5;
  border-radius: 8px;
  backdrop-filter: blur(5px);
`

export const ErrorContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`

export const ErrorIcon = styled.svg`
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  color: #ef4444;
`

export const OutputBox = styled.div<{ $isError: boolean }>`
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid ${({ $isError }) => ($isError ? 'rgba(239, 68, 68, 0.5)' : 'rgba(0, 255, 255, 0.3)')};
  background: ${({ $isError }) => ($isError ? 'rgba(239, 68, 68, 0.05)' : 'rgba(0, 255, 255, 0.05)')};
  backdrop-filter: blur(5px);
  box-shadow: ${({ $isError }) => ($isError ? '0 0 20px rgba(239, 68, 68, 0.2)' : '0 0 20px rgba(0, 255, 255, 0.2)')};
`

export const OutputTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #00ffff;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.875rem;
`

export const OutputPre = styled.pre`
  white-space: pre-wrap;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  color: #e0e7ff;
  line-height: 1.6;
`

export const ToastContainer = styled.div<{ status: ToastStatus }>`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 999;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: 2px solid;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  color: white;
  animation: ${slideIn} 0.4s ease-out;
  backdrop-filter: blur(10px);

  background: ${({ status }) =>
    status === 'success'
      ? 'rgba(34, 197, 94, 0.9)'
      : status === 'error'
        ? 'rgba(239, 68, 68, 0.9)'
        : status === 'warning'
          ? 'rgba(251, 146, 60, 0.9)'
          : 'rgba(59, 130, 246, 0.9)'};

  border-color: ${({ status }) =>
    status === 'success'
      ? 'rgba(34, 197, 94, 1)'
      : status === 'error'
        ? 'rgba(239, 68, 68, 1)'
        : status === 'warning'
          ? 'rgba(251, 146, 60, 1)'
          : 'rgba(59, 130, 246, 1)'};
`

export const ToastTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`

export const ToastDescription = styled.div`
  font-size: 0.875rem;
`