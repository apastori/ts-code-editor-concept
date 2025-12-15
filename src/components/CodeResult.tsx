import { useEffect, useState, type JSX } from 'react'
import type { CodeResultProps } from './types/CodeResultProps'
import { executeCode } from '../api'
import type { PistonRunResult } from '../types/PistonRunResult'
import type { ToastMessage } from './types/ToastMessage'
import { Wrapper, RunButton, ErrorBox, ErrorContent, ErrorIcon, OutputBox, OutputTitle, OutputPre, ToastContainer, ToastTitle, ToastDescription } from './styles/CodeResult.style'

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
