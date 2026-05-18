import type { EditorCategory, EditorAction } from "../types/editorTypes";
import { useState, useRef, useEffect, useReducer } from 'react';
import { CategoryForm } from "./CategoryForm";
import { AddCategoryForm } from "./AddCategoryForm"

function reducer(state: EditorCategory[], action: EditorAction): EditorCategory[] {
  switch (action.type) {
    case 'addCategory':
      return [...state, { id: action.id, title: action.title, entries: [] }];
    case 'updateCategoryTitle':
      return state.map(c => c.id === action.id ? { ...c, title: action.title } : c);
    case 'deleteCategory':
      return state.filter(c => c.id !== action.id);
    case 'addEntry':
      return state.map(category =>
        category.id === action.categoryId ?
          { ...category,
            entries: [...category.entries, { id: action.entryId, title: action.title }]
          } :
          category
      );
    case 'deleteEntry':
      return state.map(category =>
      category.id === action.categoryId ?
        {
          ...category,
          entries: category.entries.filter((word) => (word.id !== action.entryId))
        } :
        category
    );
  }
}

export function EditorBoard({ initialState }: { initialState: EditorCategory[] }) {

  const [categories, dispatch] = useReducer(reducer, initialState);
  const [newlyAddedCategoryId, setNewlyAddedCategoryId] = useState<string | null>(null);
  const newlyAddedCategoryRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (newlyAddedCategoryId !== null) {
      newlyAddedCategoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [newlyAddedCategoryId]);

  const totalCategories = categories.length;

  const completeCategories = categories.reduce(
    (count, cat) => count + (cat.entries.length >= 45 ? 1 : 0),
    0
  );

  const handleAddCategory = (title: string) => {
    const id = crypto.randomUUID();
    dispatch({ type: 'addCategory', id: id, title: title });
    setNewlyAddedCategoryId(id)
  }

  const updateCategoryTitle = (catId: string, newTitle: string) => {
    dispatch({ type: 'updateCategoryTitle', id: catId, title: newTitle });
  }

  const deleteCategory = (catId: string) => {
    dispatch({ type: 'deleteCategory', id: catId });
  }

  const handleAddWord = (catId: string, title: string) => {
    const id = crypto.randomUUID();
    dispatch({ type: 'addEntry', categoryId: catId, entryId: id, title: title });
  }

  const handleDeleteWord = (catId: string, id: string) => {
    dispatch({ type: 'deleteEntry', categoryId: catId, entryId: id });
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur shadow-sm">
        <div className="flex flex-wrap items-center gap-8 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold tabular-nums text-amber-800 leading-none">
              {totalCategories}
            </span>
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Total<br />categories
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold tabular-nums text-emerald-600 leading-none">
              {completeCategories}
            </span>
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Complete
            </span>
          </div>
          <div className="ml-auto flex-1 min-w-65">
            <AddCategoryForm onAddCategory={handleAddCategory} />
          </div>
        </div>
      </div>

      <div className="w-full py-10 px-4">
        <ol className="list-decimal pl-16 marker:text-3xl marker:font-bold marker:text-indigo-600 flex flex-col gap-6">
          {
            categories.map((category: EditorCategory) => (
              <CategoryForm
                ref={category.id === newlyAddedCategoryId ? newlyAddedCategoryRef : null}
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
