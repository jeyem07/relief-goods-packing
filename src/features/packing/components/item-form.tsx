import { useState } from 'react'
import type { FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { NewItem } from '@/features/packing/types/packing'

type Props = { onAdd: (item: NewItem) => void }

export function ItemForm({ onAdd }: Props) {
  const [name, setName] = useState('')
  const [kg, setKg] = useState('')
  const [pts, setPts] = useState('')
  const [error, setError] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    const weight = Number(kg)
    const importance = Number(pts)
    if (!name.trim()) return setError("Enter the item's name.")
    if (!(weight >= 0.1 && weight <= 1000)) return setError('Enter a weight between 0.1 and 1000 kg.')
    if (!Number.isInteger(importance) || importance < 1 || importance > 10)
      return setError('Enter an importance from 1 (nice to have) to 10 (urgent).')
    onAdd({ name: name.trim(), kg: weight, pts: importance })
    setName('')
    setKg('')
    setPts('')
    setError('')
  }

  return (
    <form onSubmit={submit} className="space-y-2" data-tour="item-form">
      <div className="grid gap-3 sm:grid-cols-[1fr_7rem_9rem_auto] sm:items-end">
        <div className="space-y-1.5">
          <Label htmlFor="name">Item</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rice sack" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="kg">Weight (kg)</Label>
          <Input id="kg" type="number" step="0.1" value={kg} onChange={(e) => setKg(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pts">Importance (1–10)</Label>
          <Input id="pts" type="number" value={pts} onChange={(e) => setPts(e.target.value)} />
        </div>
        <Button type="submit" className="px-8">
           Add
        </Button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </form>
  )
}
