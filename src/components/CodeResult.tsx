import { useEffect, useState, type JSX } from 'react'
import type { CodeResultProps } from './types/CodeResultProps'
import { executeCode } from '../api'
import type { PistonRunResult } from '../types/PistonRunResult'
import type { ToastMessage } from './types/ToastMessage'
import type { ToastStatus } from './types/ToastStatus'
import { styled, keyframes } from 'styled-components'

/* ----------------------
   Animations
---------------------- */

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

/* ----------------------
   Styled Components
---------------------- */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const RunButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  font-weight: 500;

  &:hover:not(:disabled) {
    background-color: #1d4ed8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const ErrorBox = styled.div`
  padding: 1rem;
  background-color: #fee2e2;
  border: 1px solid #f87171;
  color: #b91c1c;
  border-radius: 0.375rem;
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
`

const OutputBox = styled.div<{ $isError: boolean }>`
  padding: 1rem;
  border-radius: 0.375rem;
  border: 1px solid ${({ $isError }) => ($isError ? '#fca5a5' : '#d1d5db')};
  background-color: ${({ $isError }) => ($isError ? '#fef2f2' : '#f9fafb')};
`

const OutputTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const OutputPre = styled.pre`
  white-space: pre-wrap;
  font-family: monospace;
  font-size: 0.875rem;
`

/* ----------------------
   Toast (unchanged)
---------------------- */

const ToastContainer = styled.div<{ status: ToastStatus }>`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 999;
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  color: white;
  animation: ${slideIn} 0.4s ease-out;

  background-color: ${({ status }) =>
    status === 'success'
      ? '#16a34a'
      : status === 'error'
        ? '#dc2626'
        : status === 'warning'
          ? '#d97706'
          : '#3b82f6'};
`

const ToastTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const ToastDescription = styled.div`
  font-size: 0.875rem;
`

/* ----------------------
   Component
---------------------- */

const CodeResult: React.FC<CodeResultProps> = ({ editorRef, language }): JSX.Element => {
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
