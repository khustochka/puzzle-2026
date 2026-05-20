import type { EditorCategory } from './types/editorTypes'
import { EditorBoard } from './components/EditorBoard'
import { EditorProvider } from './components/EditorProvider'
import { ErrorBoundary } from './components/ErrorBoundary'

const initialCategories: EditorCategory[] = []

export default function App() {
  return (
    <ErrorBoundary>
      <EditorProvider initialCategories={initialCategories}>
        <EditorBoard />
      </EditorProvider>
    </ErrorBoundary>
  )
}
