import type { Item } from '@/features/packing/types/packing'
import { toUnits } from '@/features/packing/utils/units'

// Best pack: dynamic programming over every weight from 0 to the capacity.
export function bestPack(items: Item[], capKg: number): Item[] {
  const cap = toUnits(capKg)
  const n = items.length
  const dp = new Float64Array(cap + 1)
  const keep = Array.from({ length: n }, () => new Uint8Array(cap + 1))

  for (let i = 0; i < n; i++) {
    const wi = toUnits(items[i].kg)
    const v = items[i].pts
    for (let w = cap; w >= wi; w--) {
      if (dp[w - wi] + v > dp[w]) {
        dp[w] = dp[w - wi] + v
        keep[i][w] = 1
      }
    }
  }

  let w = cap
  const taken: Item[] = []
  for (let i = n - 1; i >= 0; i--) {
    if (keep[i][w]) {
      taken.push(items[i])
      w -= toUnits(items[i].kg)
    }
  }
  return taken.reverse()
}
