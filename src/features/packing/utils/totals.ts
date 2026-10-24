import type { Item } from '@/features/packing/types/packing'

export const sumOf = (items: Item[], key: 'kg' | 'pts') =>
  items.reduce((total, item) => total + item[key], 0)
