import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Props = { value: number; onChange: (kg: number) => void }

export function CapacityField({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3" data-tour="capacity">
      <Label htmlFor="capacity" className="whitespace-nowrap">
        Truck / box capacity (kg)
      </Label>
      <Input
        id="capacity"
        type="number"
        min={1}
        max={1000}
        step={1}
        value={value}
        onChange={(e) => onChange(Math.min(1000, Math.max(1, Number(e.target.value) || 1)))}
        className="w-24"
      />
    </div>
  )
}
