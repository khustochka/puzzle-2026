import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './board/App.tsx'

  createRoot(document.getElementById('root')!).render(
    import.meta.env.DEV ? (
      <StrictMode>
        <App />
      </StrictMode>
    ) : (
      <a
        href={import.meta.env.BASE_URL + "edit.html"}
        style={{
          display: 'inline-block',
          margin: '2rem',
          fontFamily: 'system-ui, sans-serif',
          fontSize: '1rem',
          color: '#4f46e5',
          textDecoration: 'underline',
        }}
      >
        Editor
      </a>
    )
  )
