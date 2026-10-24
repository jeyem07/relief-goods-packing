import type { Item } from '@/features/packing/types/packing'
import { toUnits } from '@/features/packing/utils/units'

// Quick pack: take the most important-per-kg items first (greedy shortcut).
export function quickPack(items: Item[], capKg: number): Item[] {
  const cap = toUnits(capKg)
  const sorted = [...items].sort(
    (a, b) => b.pts / b.kg - a.pts / a.kg || b.pts - a.pts,
  )
  let used = 0
  const taken: Item[] = []
  for (const item of sorted) {
    const w = toUnits(item.kg)
    if (used + w <= cap) {
      used += w
      taken.push(item)
    }
  }
  return taken
}
