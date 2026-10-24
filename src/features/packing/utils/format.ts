export const kgText = (kg: number) => `${Math.round(kg * 10) / 10} kg`

export const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`

// Number of ways to pack n items = 2^n (each item is either in or out).
export function waysText(n: number) {
  if (n <= 24) return (2 ** n).toLocaleString()
  return (2 ** n).toLocaleString('en', { notation: 'compact' })
}
