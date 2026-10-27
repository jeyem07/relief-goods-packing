import { useRef } from 'react'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import '@/features/tour/components/tour.css'

import type { TourContext } from '@/features/tour/types/tour'
import { buildTourSteps } from '@/features/tour/utils/tour-steps'

export function useTour(ctx: TourContext) {
  const ctxRef = useRef(ctx)
  ctxRef.current = ctx

  const start = () => {
    ctxRef.current.reset()
    
    // Wait one frame so React has rendered the reset state before highlighting
    requestAnimationFrame(() => {
      const tour = driver({
        showProgress: true,
        progressText: '{{current}} of {{total}}',
        allowClose: true,
        allowKeyboardControl: true,
        disableActiveInteraction: true,
        stagePadding: 6,
        popoverClass: 'tour-popover',
        nextBtnText: 'Next',
        prevBtnText: 'Back',
        doneBtnText: 'Finish',
        steps: buildTourSteps(ctxRef.current),
      })
      tour.drive()
    })
  }

  return { start }
}
