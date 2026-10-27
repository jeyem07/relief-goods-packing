import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CapacityField } from '@/features/packing/components/capacity-field'
import { ItemForm } from '@/features/packing/components/item-form'
import { ItemTable } from '@/features/packing/components/item-table'
import type { Item, NewItem } from '@/features/packing/types/packing'

type Props = {
  items: Item[]
  capacityKg: number
  onCapacityChange: (kg: number) => void
  onAdd: (item: NewItem) => void
  onRemove: (id: string) => void
  onLoadSample: () => void
  onClear: () => void
}

const ITEMS_PER_PAGE = 5

export function ItemsCard(p: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(p.items.length / ITEMS_PER_PAGE))

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1))
  }

  // Reset to page 1 if current page exceeds total pages
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages)
  }

  // Calculate paginated items
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedItems = p.items.slice(startIndex, endIndex)

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="px-5 pt-5 pb-0">
        <CardTitle>Your items</CardTitle>
        <CardDescription>List what you have and how much room you've got.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-5 pt-4 pb-5">
        <CapacityField value={p.capacityKg} onChange={p.onCapacityChange} />
        <ItemForm onAdd={p.onAdd} />
        
        {/* Fixed height container for items table */}
        <div className="h-[300px] overflow-auto">
          <ItemTable items={paginatedItems} onRemove={p.onRemove} />
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={p.onLoadSample} data-tour="sample-btn">Use sample goods</Button>
            <Button variant="outline" size="sm" onClick={p.onClear}>Clear list</Button>
          </div>

          {/* Pagination - only show if there are items */}
          {p.items.length > 0 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-black dark:bg-white text-white dark:text-black'
                        : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
