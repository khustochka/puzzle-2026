import type { EditorBoardState, EditorCategory } from "../types/editorTypes";
import { useState } from 'react';
import { CategoryForm } from "./CategoryForm";

export function EditorBoard({ initialState }: { initialState: EditorBoardState }) {

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

  const updateCategoryTitle = (catId: string, newTitle: string) => {
    const updated = state.categories.map(category =>
      category.id === catId ? { ...category, title: newTitle } : category
    );
    setState({ ...state, categories: updated })
  }

  const deleteCategory = (catId: string) => {
    const updated = state.categories.filter(category =>
      category.id !== catId
    );
    setState({ ...state, categories: updated })
  }

  return (
    <div>
      <ol className='ml-8 list-decimal'>
        {
          state.categories.map((category: EditorCategory) => (
            <CategoryForm
              key={category.id}
              initialCategory={category}
              onUpdateTitle={updateCategoryTitle}
              onDelete={deleteCategory}
            />
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
