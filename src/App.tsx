import type { EditBoardState } from './types/editTypes'
import { EditBoard } from './components/EditBoard'

const initialState: EditBoardState = {
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
    <EditBoard initialState={initialState} />
  )
}
