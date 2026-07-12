import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import './index.css'
import App from './App.tsx'

function Fallback({ error }: { error: any }) {
  return (
    <div style={{ color: 'red', padding: '20px', background: '#000', height: '100vh', width: '100vw' }}>
      <h1>App crashed!</h1>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error?.message || String(error)}</pre>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error?.stack || ''}</pre>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={Fallback}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
