import { ChevronDown } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

const NOTES = [
  { q: 'Why not just try every combination?', a: 'Every item is either in or out, so n items give 2ⁿ ways to pack. Doubling with each new item, it quickly becomes too many to check one by one.' },
  { q: 'Why is Quick pack only an estimate?', a: 'It picks greedily by importance per kg and never reconsiders. It is fast and usually close, but can miss the best load.' },
  { q: 'How is Best pack still fast?', a: 'It builds the answer weight by weight (in 0.1 kg steps) and reuses earlier results. Checking a finished load against the limit is always easy.' },
]

export function HowItWorks() {
  return (
    <Card className="gap-0 py-0">
      <CardContent className="divide-y p-0">
        <p className="px-5 py-4 text-sm font-semibold">What this shows</p>
        {NOTES.map((n) => (
          <details key={n.q} className="group px-5 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
              {n.q}
              <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
            </summary>
            <p className="pt-2 text-sm text-muted-foreground">{n.a}</p>
          </details>
        ))}
      </CardContent>
    </Card>
  )
}
