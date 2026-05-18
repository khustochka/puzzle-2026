export type EditorEntry = {
  id: string
  title: string
}

export type EditorCategory = {
  id: string
  title: string
  entries: EditorEntry[]
}

export type EditBoardState = {
  categories: EditorCategory[]
}
