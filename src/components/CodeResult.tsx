import { useEffect, useState, type JSX } from 'react'
import type { CodeResultProps } from './types/CodeResultProps'
import { executeCode } from '../api'
import type { PistonRunResult } from '../types/PistonRunResult'
import type { ToastMessage } from './types/ToastMessage'
import type { ToastStatus } from './types/ToastStatus'
import { styled, keyframes } from 'styled-components'

// ----------------------
// Toast Animation
// ----------------------

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

// ----------------------
// Styled Components
// ----------------------

const ToastContainer = styled.div<{ status: ToastStatus }>`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 999;
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
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

const CodeResult: React.FC<CodeResultProps> = ({ editorRef, language }: CodeResultProps): JSX.Element => {
  const [output, setOutput]: [string[], React.Dispatch<React.SetStateAction<string[]>>] = useState<string[]>([])
  const [isLoading, setIsLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false)
  const [isError, setIsError]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false)
  const [errorMessage, setErrorMessage]: [string, React.Dispatch<React.SetStateAction<string>>] = useState<string>('')
  const [toast, setToast]: [ToastMessage | null, React.Dispatch<React.SetStateAction<ToastMessage | null>>]= useState<ToastMessage | null>(null)

  const showToast = (title: string, description: string, status: ToastMessage['status']) => {
    setToast({ title, description, status })
  }

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null)
      }, 6000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const runCode = async (): Promise<void> => {
    if (!editorRef.current) return
    const sourceCode: string = editorRef.current.getValue()
    if (!sourceCode) return
    try {
      setIsLoading(true)
      setErrorMessage('')
      setIsError(false) 
      const { run: result }: {
        run: PistonRunResult
      } = await executeCode(language, sourceCode)
      setOutput(result.output.split('\n'))
      setIsError(Boolean(result.stderr))
    } catch (error: unknown) {
      console.log(error)
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Unable to run code')
      }
      showToast(
        'An error occurred.',
        errorMessage || 'Unable to run code',
        'error'
      )
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='space-y-4'>
      <button 
        onClick={runCode}
        disabled={isLoading}
        className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isLoading ? 'Running...' : 'Run Code'}
      </button>

      {errorMessage && (
        <div className='p-4 bg-red-100 border border-red-400 text-red-700 rounded'>
          <div className='flex items-start'>
            <svg className='w-5 h-5 mr-2 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' />
            </svg>
            <div>
              <strong className='font-semibold'>Error:</strong> {errorMessage}
            </div>
          </div>
        </div>
      )}

      {output.length > 0 && (
        <div className={`p-4 rounded border ${isError ? 'bg-red-50 border-red-300' : 'bg-gray-50 border-gray-300'}`}>
          <h3 className='font-semibold mb-2'>Output:</h3>
          <pre className='whitespace-pre-wrap font-mono text-sm'>
            {output.join('\n')}
          </pre>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <ToastContainer status={toast.status}>
          <ToastTitle>{toast.title}</ToastTitle>
          <ToastDescription>{toast.description}</ToastDescription>
        </ToastContainer>
      )}
    </div>
  )
}

export { CodeResult }