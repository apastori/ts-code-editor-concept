import { StrictMode } from 'react'
import ReactDOM, { type Root } from 'react-dom/client'
import App from './App.tsx'
import { RootNotDivElementError } from './errors/RootNotDivError.ts'
import { RootNotFoundError } from './errors/RootNotFoundError.ts'

// Get the Root Element from the DOM
const rootElement: HTMLElement | null = document.getElementById('root')

//Check if Root Element was Found in DOM
if (!rootElement) throw new RootNotFoundError()

//Check if Root Element is a Classic Div Element
if (!(rootElement instanceof HTMLDivElement)) throw new RootNotDivElementError()

// Create a root using the container
const root: Root = ReactDOM.createRoot(rootElement as HTMLDivElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
