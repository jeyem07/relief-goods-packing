import { CheckCircle2, Info } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Item, PackMethod } from '@/features/packing/types/packing'
import { kgText, plural } from '@/features/packing/utils/format'

type Plan = { packed: Item[]; left: Item[]; kg: number; pts: number }
type Props = {
  method: PackMethod
  onMethodChange: (m: PackMethod) => void
  capacityKg: number
  plans: { quick: Plan; best: Plan }
}

const METHODS: { id: PackMethod; label: string; text: string }[] = [
  { id: 'best', label: 'Best pack', text: 'Checks the weight limit at every step to find the most useful load.' },
  { id: 'quick', label: 'Quick pack', text: 'Grabs the most useful-per-kg items first. Fast, but not always the best.' },
]

export function PackResult({ method, onMethodChange, capacityKg, plans }: Props) {
  const plan = plans[method]
  const percent = Math.min(100, Math.round((plan.kg / capacityKg) * 100))
  const gap = plans.best.pts - plans.quick.pts

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="px-5 pt-5 pb-0">
        <CardTitle>What to pack</CardTitle>
        <CardDescription>{METHODS.find((m) => m.id === method)?.text}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-5 pt-4 pb-5">
        <div className="inline-flex rounded-lg bg-muted p-1">
          {METHODS.map((m) => (
            <button
              key={m.id}
              onClick={() => onMethodChange(m.id)}
              className={`rounded-md px-3 py-1 text-sm font-medium transition ${
                method === m.id ? 'bg-background shadow-sm' : 'text-muted-foreground'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>{kgText(plan.kg)} of {kgText(capacityKg)}</span>
            <Badge variant="secondary">{percent}% full</Badge>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-green-600 transition-all dark:bg-green-500" style={{ width: `${percent}%` }} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="mb-2 text-sm font-medium">In the box ({plan.packed.length})</h3>
            <ul className="space-y-1 text-sm">
              {plan.packed.map((i) => (
                <li key={i.id} className="flex justify-between"><span>{i.name}</span><span className="text-muted-foreground">{kgText(i.kg)}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">Left behind ({plan.left.length})</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {plan.left.map((i) => (
                <li key={i.id} className="flex justify-between"><span>{i.name}</span><span>{kgText(i.kg)}</span></li>
              ))}
            </ul>
          </div>
        </div>

        <Alert>
          <CheckCircle2 className="text-green-700 dark:text-green-400" />
          <AlertTitle className="text-green-700 dark:text-green-400">Weight check passed</AlertTitle>
          <AlertDescription>
            {plural(plan.packed.length, 'item')} weigh {kgText(plan.kg)}, within the {kgText(capacityKg)} limit.
          </AlertDescription>
        </Alert>

        <Alert>
          <Info />
          <AlertTitle>Quick vs. Best</AlertTitle>
          <AlertDescription>
            {gap > 0
              ? `Best pack carries ${gap} more importance points than Quick pack (${plans.best.pts} vs ${plans.quick.pts}).`
              : 'For this list, Quick pack matches Best pack.'}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
