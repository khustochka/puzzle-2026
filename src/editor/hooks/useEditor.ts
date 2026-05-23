import { useContext } from 'react'
import { EditorContext } from '../contexts/EditorContext'

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error('useCategories must be used within CategoriesProvider');
  return ctx;
}
