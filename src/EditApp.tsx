import type { EditorCategory } from './types/editorTypes'
import { EditorBoard } from './components/EditorBoard'
import { EditorProvider } from './components/EditorProvider'
import { ErrorBoundary } from './components/ErrorBoundary'

const initialCategories: EditorCategory[] = [
  {
    "id": crypto.randomUUID(),
    "name": "Famous locomotives",
    "entries": [
      {
        "id": crypto.randomUUID(),
        "value": "Salamanca"
      },
      {
        "id": crypto.randomUUID(),
        "value": "CN-2747"
      }
    ]
  },
  {
    "id": crypto.randomUUID(),
    "name": "Famous ships",
    "entries": [
      {
        "id": crypto.randomUUID(),
        "value": "Santa Maria"
      },
      {
        "id": crypto.randomUUID(),
        "value": "Titanic"
      }
    ]
  }
]

export default function App() {
  return (
    <ErrorBoundary>
      <EditorProvider initialCategories={initialCategories}>
        <EditorBoard />
      </EditorProvider>
    </ErrorBoundary>
  )
}
