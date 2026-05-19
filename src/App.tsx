import type { EditorCategory } from './types/editorTypes'
import { EditorBoard } from './components/EditorBoard'
import { EditorProvider } from './components/EditorProvider'

const initialCategories: EditorCategory[] = []

export default function App() {
  return (

    <EditorProvider initialCategories={initialCategories}>
      <EditorBoard />
    </EditorProvider>
  )
}
