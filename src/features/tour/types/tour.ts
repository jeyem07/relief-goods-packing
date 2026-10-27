export type TourContext = {
  reset: () => void // sample goods, 50 kg, Best pack selected
  setMethod: (method: 'best' | 'quick') => void
}
