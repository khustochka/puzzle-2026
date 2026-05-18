import type { EditorCategory } from "../types/editorTypes";
import { useState } from 'react';

export function CategoryForm({ initialCategory, onUpdateTitle, onDelete }: {
  initialCategory: EditorCategory;
  onUpdateTitle: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}) {

  const [category] = useState(initialCategory);

  return (
    <li>
      <div>
        <input id={`title-${category.id}`}
          defaultValue={category.title}
          onBlur={(e) => onUpdateTitle(category.id, e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur();
            if (e.key === 'Escape') {
              e.currentTarget.value = category.title;
              e.currentTarget.blur();
            }
          }}
        />
        <span className="cursor-pointer" onClick={() => onDelete(category.id)}>X</span>

        <ol className="list-decimal ml-6">
          {
            category.entries.map((entry) => (
              < li key={entry.id}>{entry.title}</li>
            ))
          }
        </ol>
      </div>
    </li>
  )

}
