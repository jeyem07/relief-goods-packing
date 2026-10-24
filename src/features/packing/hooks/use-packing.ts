import { useMemo, useState } from 'react'

import type { Item, NewItem, PackMethod } from '@/features/packing/types/packing'
import { bestPack } from '@/features/packing/utils/best-pack'
import { quickPack } from '@/features/packing/utils/quick-pack'
import { SAMPLE_ITEMS } from '@/features/packing/utils/sample-items'
import { sumOf } from '@/features/packing/utils/totals'

const withId = (item: NewItem): Item => ({ ...item, id: crypto.randomUUID() })

export function usePacking() {
  const [items, setItems] = useState<Item[]>(() => SAMPLE_ITEMS.map(withId))
  const [capacityKg, setCapacityKg] = useState(50)
  const [method, setMethod] = useState<PackMethod>('best')

  const plans = useMemo(() => {
    const build = (packed: Item[]) => {
      const ids = new Set(packed.map((i) => i.id))
      return {
        packed,
        left: items.filter((i) => !ids.has(i.id)),
        kg: sumOf(packed, 'kg'),
        pts: sumOf(packed, 'pts'),
      }
    }
    return {
      quick: build(quickPack(items, capacityKg)),
      best: build(bestPack(items, capacityKg)),
    }
  }, [items, capacityKg])

  return {
    items,
    capacityKg,
    method,
    plans,
    setCapacityKg,
    setMethod,
    addItem: (item: NewItem) => setItems((prev) => [...prev, withId(item)]),
    removeItem: (id: string) => setItems((prev) => prev.filter((i) => i.id !== id)),
    loadSample: () => setItems(SAMPLE_ITEMS.map(withId)),
    clearItems: () => setItems([]),
  }
}
