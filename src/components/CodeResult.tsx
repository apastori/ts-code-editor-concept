import { useEffect, useState, type JSX } from 'react'
import type { CodeResultProps } from './types/CodeResultProps'
import { executeCode } from '../api'
import type { PistonRunResult } from '../types/PistonRunResult'
import type { ToastMessage } from './types/ToastMessage'
import type { ToastStatus } from './types/ToastStatus'
import { styled, keyframes } from 'styled-components'

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const RunButton = styled.button`
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

const ErrorBox = styled.div`
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 2px solid rgba(239, 68, 68, 0.5);
  color: #fca5a5;
  border-radius: 8px;
  backdrop-filter: blur(5px);
`

const ErrorContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`

const ErrorIcon = styled.svg`
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  color: #ef4444;
`

const OutputBox = styled.div<{ $isError: boolean }>`
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid ${({ $isError }) => ($isError ? 'rgba(239, 68, 68, 0.5)' : 'rgba(0, 255, 255, 0.3)')};
  background: ${({ $isError }) => ($isError ? 'rgba(239, 68, 68, 0.05)' : 'rgba(0, 255, 255, 0.05)')};
  backdrop-filter: blur(5px);
  box-shadow: ${({ $isError }) => ($isError ? '0 0 20px rgba(239, 68, 68, 0.2)' : '0 0 20px rgba(0, 255, 255, 0.2)')};
`

const OutputTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #00ffff;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.875rem;
`

const OutputPre = styled.pre`
  white-space: pre-wrap;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  color: #e0e7ff;
  line-height: 1.6;
`

const ToastContainer = styled.div<{ status: ToastStatus }>`
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

const ToastTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const ToastDescription = styled.div`
  font-size: 0.875rem;
`

const CodeResult: React.FC<CodeResultProps> = ({ editorRef, language }: CodeResultProps): JSX.Element => {
  const [output, setOutput] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [toast, setToast] = useState<ToastMessage | null>(null)

  const showToast = (title: string, description: string, status: ToastMessage['status']) => {
    setToast({ title, description, status })
  }

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 6000)
    return () => clearTimeout(timer)
  }, [toast])

  const runCode = async (): Promise<void> => {
    if (!editorRef.current) return
    const sourceCode = editorRef.current.getValue()
    if (!sourceCode) return

    try {
      setIsLoading(true)
      setIsError(false)
      setErrorMessage('')

      const { run }: { run: PistonRunResult } = await executeCode(language, sourceCode)
      setOutput(run.output.split('\n'))
      setIsError(Boolean(run.stderr))
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unable to run code'
      setErrorMessage(message)
      setIsError(true)
      showToast('An error occurred.', message, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Wrapper>
      <RunButton onClick={runCode} disabled={isLoading}>
        {isLoading ? 'Running...' : 'Run Code'}
      </RunButton>

      {errorMessage && (
        <ErrorBox>
          <ErrorContent>
            <ErrorIcon fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
              />
            </ErrorIcon>
            <div>
              <strong>Error:</strong> {errorMessage}
            </div>
          </ErrorContent>
        </ErrorBox>
      )}

      {output.length > 0 && (
        <OutputBox $isError={isError}>
          <OutputTitle>Output:</OutputTitle>
          <OutputPre>{output.join('\n')}</OutputPre>
        </OutputBox>
      )}

      {toast && (
        <ToastContainer status={toast.status}>
          <ToastTitle>{toast.title}</ToastTitle>
          <ToastDescription>{toast.description}</ToastDescription>
        </ToastContainer>
      )}
    </Wrapper>
  )
}

export { CodeResult }
