export type EditorEntry = {
  id: string;
  value: string;
}

export type EditorCategory = {
  id: string;
  name: string;
  entries: EditorEntry[];
}
