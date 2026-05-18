import type { EditorCategory, EditorEntry } from "../types/editorTypes";

export function CategoryForm({ category, onUpdateTitle, onDelete, onAddWord, onDeleteWord }: {
  category: EditorCategory;
  onUpdateTitle: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
  onAddWord: (catId: string, word: EditorEntry) => void;
  onDeleteWord: (catId: string, wordId: string) => void;
}) {

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.currentTarget.blur();
    if (e.key === 'Escape') {
      e.currentTarget.value = category.title;
      e.currentTarget.blur();
    }
  }

  const handleNewWordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value.trim();
      if (!value) return;
      onAddWord(category.id, buildEntry(value));
      e.currentTarget.value = '';
    }
    if (e.key === 'Escape') {
      e.currentTarget.value = '';
    }
  };

  const buildEntry = (word: string): EditorEntry => ({
    id: crypto.randomUUID(),
    title: word
  })


  return (
    <li id={`category-${category.id}`}>
      <div>
        <input
          defaultValue={category.title}
          onBlur={(e) => onUpdateTitle(category.id, e.currentTarget.value)}
          onKeyDown={(e) => handleTitleKeyDown(e)}
        />
        <span className="cursor-pointer" onClick={() => onDelete(category.id)}>X</span>

        <ol>
          {
            category.entries.map((entry) => (
              <li key={entry.id} className="inline-block">
                <input defaultValue={entry.title} />

                <span className="cursor-pointer" onClick={() => onDeleteWord(category.id, entry.id)}>X</span>
              </li>
            ))
          }
        </ol>

        <label htmlFor='newWord'>Add word:</label>
        <input id='newWord' defaultValue=''
          onKeyDown={handleNewWordKeyDown}
        />
      </div>
    </li>
  )
}
