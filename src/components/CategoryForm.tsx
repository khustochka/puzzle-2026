import type { EditorCategory } from "../types/editorTypes";
import { useState } from 'react';

export function CategoryForm({ initialCategory, onUpdateTitle }: {
  initialCategory: EditorCategory;
  onUpdateTitle: (id: string, newTitle: string) => void;
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
      </div>
    </li>
  )

}
