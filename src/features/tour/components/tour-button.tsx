import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Props = {
  onClick: () => void
}

export function TourButton({ onClick }: Props) {
  return (
    <Button variant="outline" size="sm" onClick={onClick} className="gap-2">
      <Play className="w-4 h-4" />
      <span className="hidden sm:inline">Start presentation</span>
    </Button>
  )
}
