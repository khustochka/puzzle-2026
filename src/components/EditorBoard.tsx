import type { EditorBoardState, EditorCategory, EditorEntry } from "../types/editorTypes";
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
    if (e.key === 'Enter') {
      const value = e.currentTarget.value.trim();
      if (!value) return;
      addCategory(value);
      e.currentTarget.value = '';
    }
    if (e.key === 'Escape') {
      e.currentTarget.value = '';
    }
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

  const handleAddWord = (catId: string, word: EditorEntry) => {
    const updated = state.categories.map(category =>
      category.id === catId ? { ...category, entries: [...category.entries, word] } : category
    );
    setState({ ...state, categories: updated })
  }

  const handleDeleteWord = (catId: string, wordId: string) => {
    const updated = state.categories.map(category =>
      category.id === catId ?
        {
          ...category,
          entries: category.entries.filter((word) => (word.id !== wordId))
        } :
        category
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
              category={category}
              onUpdateTitle={updateCategoryTitle}
              onDelete={deleteCategory}
              onAddWord={handleAddWord}
              onDeleteWord={handleDeleteWord}
            />
          ))
        }
      </ol>

      <label htmlFor='newCategory'>Add category:</label>
      <input id='newCategory' defaultValue=''
        onKeyDown={handleNewCategoryKeyDown}
      />
    </div>
  )
}
