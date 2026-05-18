import type { EditBoardState, EditorCategory } from "../types/editTypes";
import { useState } from 'react';

export function EditBoard({ initialState }: { initialState: EditBoardState }) {

  const [state, setState] = useState(initialState);

  const handleAddCategory = () => {
    setState({...state, categories: [...state.categories, buildCategory()]})
  }

  const buildCategory = (): EditorCategory => ({
    id: crypto.randomUUID(),
    title: '',
    entries: []
  })

  return (
    <div>
      <ol className='ml-8 list-decimal'>
        {
          state.categories.map((category: EditorCategory) => (
            <li key={category.id}>
              <div>{category.title}</div>
            </li>
          ))
        }
      </ol>

      <span className="cursor-pointer" onClick={handleAddCategory}>+ Add category</span>
    </div>
  )
}
