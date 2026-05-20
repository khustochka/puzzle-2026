import type { EditorCategory } from './types/editorTypes'
import { EditorBoard } from './components/EditorBoard'
import { EditorProvider } from './components/EditorProvider'
import { ErrorBoundary } from './components/ErrorBoundary'

const initialCategories: EditorCategory[] = [
  {
    "id": "6c409d90-e9f0-4784-9933-168de39dcc77",
    "title": "Famous locomotives",
    "entries": [
      {
        "id": "f0302e3c-eee5-4f5a-a1d4-d7a4c3b6965d",
        "title": "Salamanca"
      },
      {
        "id": "cc0caa61-04fd-46ec-bb1c-9f4b2b5e7d5b",
        "title": "CN-2747"
      }
    ]
  },
  {
    "id": "fc8a2208-7b4a-4785-871a-f4980e452058",
    "title": "Famous ships",
    "entries": [
      {
        "id": "85160c28-1981-4fa5-a02a-a88393e553b8",
        "title": "Santa Maria"
      },
      {
        "id": "8b318e8e-1f3a-4abc-9a6b-fca7e35d744d",
        "title": "Titanic"
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
