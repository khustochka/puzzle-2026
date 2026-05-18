import type { EditorCategory } from "../types/editorTypes";

export function AddCategoryForm({ onAddCategory }: {
  onAddCategory: (category: EditorCategory) => void;
}) {

  const buildCategory = (title: string): EditorCategory => ({
    id: crypto.randomUUID(),
    title: title,
    entries: []
  })

  const handleNewCategoryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value.trim();
      if (!value) return;
      onAddCategory(buildCategory(value));
      e.currentTarget.value = '';
    }
    if (e.key === 'Escape') {
      e.currentTarget.value = '';
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-white/60 px-3 py-2">
      <label htmlFor="newCategory" className="text-sm font-medium text-slate-600 whitespace-nowrap">
        Add category:
      </label>
      <input
        defaultValue=""
        onKeyDown={handleNewCategoryKeyDown}
        className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
    </div>
  )
}
