import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EditorApp from './editor/EditorApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EditorApp />
  </StrictMode>,
)
