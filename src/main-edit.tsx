import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EditApp from './EditApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EditApp />
  </StrictMode>,
)
