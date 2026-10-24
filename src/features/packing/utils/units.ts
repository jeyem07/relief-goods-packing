// Weights are counted in 0.1 kg steps so the math stays exact.
export const toUnits = (kg: number) => Math.round(kg * 10)
