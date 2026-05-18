import type { EditorBoardState } from './types/editorTypes'
import { EditorBoard } from './components/EditorBoard'

const initialState: EditorBoardState = {
  categories: [
    {
      id: crypto.randomUUID(),
      title: "Pokémon",
      entries: [{
        id: crypto.randomUUID(),
        title: "Eevee"
      },
      {
        id: crypto.randomUUID(),
        title: "Picachu"
      }]
    },
    {
      id: crypto.randomUUID(),
      title: "Dinosaurs",
      entries: [{
        id: crypto.randomUUID(),
        title: "Tyranosaurus"
      },
      {
        id: crypto.randomUUID(),
        title: "Velociraptor"
      }]
    }
  ]
}

export default function App() {
  return (
    <EditorBoard initialState={initialState} />
  )
}
