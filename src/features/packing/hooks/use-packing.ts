import { useEffect, useMemo, useState } from 'react'

import type { Item, NewItem, PackMethod } from '@/features/packing/types/packing'
import { bestPack } from '@/features/packing/utils/best-pack'
import { quickPack } from '@/features/packing/utils/quick-pack'
import { SAMPLE_ITEMS } from '@/features/packing/utils/sample-items'
import { sumOf } from '@/features/packing/utils/totals'

const STORAGE_KEYS = {
  ITEMS: 'relief_goods_items',
  CAPACITY: 'relief_goods_capacity',
  METHOD: 'relief_goods_method',
} as const

const withId = (item: NewItem): Item => ({ ...item, id: crypto.randomUUID() })

export function usePacking() {
  const [items, setItems] = useState<Item[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ITEMS)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) return parsed
      }
    } catch {
    }
    return SAMPLE_ITEMS.map(withId)
  })

  const [capacityKg, setCapacityKg] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CAPACITY)
      if (saved) {
        const num = Number(saved)
        if (!isNaN(num) && num > 0) return num
      }
    } catch {
    }
    return 50
  })

  const [method, setMethod] = useState<PackMethod>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.METHOD)
      if (saved === 'best' || saved === 'quick') return saved
    } catch {
    }
    return 'best'
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items))
    } catch {
    }
  }, [items])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CAPACITY, String(capacityKg))
    } catch {
    }
  }, [capacityKg])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.METHOD, method)
    } catch {
    }
  }, [method])

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
