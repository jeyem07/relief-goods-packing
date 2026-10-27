import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Item } from '@/features/packing/types/packing'
import { kgText } from '@/features/packing/utils/format'

type Props = { items: Item[]; onRemove: (id: string) => void }

export function ItemTable({ items, onRemove }: Props) {
  if (items.length === 0) {
    return <p className="py-6 text-center text-sm text-muted-foreground">No items yet. Add one above or use the sample goods.</p>
  }
  return (
    <div data-tour="item-table">
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40%]">Item</TableHead>
          <TableHead className="w-[20%] text-right">Weight</TableHead>
          <TableHead className="w-[20%] text-right">Importance</TableHead>
          <TableHead className="w-[20%]" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium w-[40%]">{item.name}</TableCell>
            <TableCell className="text-right w-[20%]">{kgText(item.kg)}</TableCell>
            <TableCell className="text-right w-[20%]">{item.pts} / 10</TableCell>
            <TableCell className="text-right w-[20%]">
              <Button variant="ghost" size="sm" onClick={() => onRemove(item.id)}>
                <Trash2 /> Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}
