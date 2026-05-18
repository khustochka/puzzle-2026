import type { EditorBoardState, EditorCategory, EditorEntry } from "../types/editorTypes";
import { useState } from 'react';
import { CategoryForm } from "./CategoryForm";
import { AddCategoryForm } from "./AddCategoryForm"

export function EditorBoard({ initialState }: { initialState: EditorBoardState }) {

  const [state, setState] = useState(initialState);

  const totalCategories = state.categories.length;

  const completeCategories = state.categories.reduce(
    (count, cat) => count + (cat.entries.length >= 45 ? 1 : 0),
    0
  );

  const handleAddCategory = (category: EditorCategory) => {
    setState({ ...state, categories: [...state.categories, category] })
  }

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
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="w-full">

        <div>
          <div>Total categories: <span>{totalCategories}</span></div>
          <div>Complete: <span>{completeCategories}</span></div>
          <AddCategoryForm onAddCategory={handleAddCategory} />
        </div>

        <ol className="list-decimal pl-16 marker:text-3xl marker:font-bold marker:text-indigo-600 flex flex-col gap-6">
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


      </div>
    </div >
  )
}
