export type Item = { id: string; name: string; kg: number; pts: number }
export type NewItem = Omit<Item, 'id'>
export type PackMethod = 'best' | 'quick'
