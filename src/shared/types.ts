export type Entry = {
  id: string
  value: string
}

export type Category = {
  id: string
  name: string
  entries: Entry[]
}
