// import type { Category } from './types/editorTypes'
// import { EditorBoard } from './components/EditorBoard'
// import { EditorProvider } from './components/EditorProvider'
// import { ErrorBoundary } from './components/ErrorBoundary'

import { BoardProvider } from "./components/BoardProvider";
import { PuzzleBoard } from "./components/PuzzleBoard";

// const initialCategories: Category[] = [
//   {
//     "id": crypto.randomUUID(),
//     "name": "Famous locomotives",
//     "entries": [
//       {
//         "id": crypto.randomUUID(),
//         "value": "Salamanca"
//       },
//       {
//         "id": crypto.randomUUID(),
//         "value": "CN-2747"
//       }
//     ]
//   },
//   {
//     "id": crypto.randomUUID(),
//     "name": "Famous ships",
//     "entries": [
//       {
//         "id": crypto.randomUUID(),
//         "value": "Santa Maria"
//       },
//       {
//         "id": crypto.randomUUID(),
//         "value": "Titanic"
//       }
//     ]
//   }
// ]

export default function EditorApp() {
  return (
    // <ErrorBoundary>
      <BoardProvider initialBoard={[]}>
        <PuzzleBoard />
      </BoardProvider>
    // </ErrorBoundary>
  )
}
