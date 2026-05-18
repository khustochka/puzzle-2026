import type { EditBoardState, EditorCategory } from "../types/editTypes";
import { useState } from 'react';

export function EditBoard({ initialState }: { initialState: EditBoardState }) {

  const [state, setState] = useState(initialState);

  const addCategory = (title: string) => {
    setState({ ...state, categories: [...state.categories, buildCategory(title)] })
  }

  const buildCategory = (title: string): EditorCategory => ({
    id: crypto.randomUUID(),
    title: title,
    entries: []
  })

  const handleNewCategoryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const value = e.currentTarget.value.trim();
    if (!value) return;
    addCategory(value);
    e.currentTarget.value = '';
  };

  const updateCategory = (id: string, value: string) => {
    const updated = state.categories.map(item =>
      item.id === id ? { ...item, title: value } : item
    );
    setState({ ...state, categories: updated })
  }

  return (
    <div>
      <ol className='ml-8 list-decimal'>
        {
          state.categories.map((category: EditorCategory) => (
            <li key={category.id}>
              <div>
                <input id={`title-${category.id}`}
                  defaultValue={category.title}
                  onBlur={(e) => updateCategory(category.id, e.currentTarget.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                    if (e.key === 'Escape') {
                      e.currentTarget.value = category.title;
                      e.currentTarget.blur();
                    }
                  }}
                />
              </div>
            </li>
          ))
        }
      </ol>

      <span>Add category:</span>
      <input id='newCategory' defaultValue=''
        onKeyDown={handleNewCategoryKeyDown}
      />
    </div>
  )
}
