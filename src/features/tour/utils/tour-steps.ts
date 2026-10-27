import type { DriveStep } from 'driver.js'
import type { TourContext } from '@/features/tour/types/tour'

const at = (id: string) => `[data-tour="${id}"]`
const ex = (text: string) => `<br/><br/><b>Example:</b> ${text}`

export function buildTourSteps(ctx: TourContext): DriveStep[] {
  return [
    // A
    {
      element: at('capacity'),
      popover: {
        title: 'A: Capacity',
        description:
          'Sets how much weight the truck or box can carry. Everything the app suggests stays within this limit.' +
          ex('a pickup carries 50 kg, so you type 50. If an 80 kg truck becomes available, type 80 and more items fit.'),
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: at('item-form'),
      popover: {
        title: 'A: Add item',
        description:
          'Adds one relief item with its name, its weight in kg, and how important it is, from 1 (nice to have) to 10 (urgent). Each new item doubles the number of possible loads.' +
          ex('Baby formula, 5 kg, importance 8.'),
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: at('ways-card'),
      popover: {
        title: 'A: Ways to pack',
        description:
          'Shows how many different loads are possible with the items you have. Every item is either in the truck or left out.' +
          ex('12 items give 4,096 loads. Add a 13th and it doubles to 8,192.'),
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: at('importance-card'),
      popover: {
        title: 'A: Importance packed',
        description:
          'Shows how many importance points you managed to pack. The goal is to get the highest number possible while staying within the weight limit.' +
          ex('Quick pack gets 48 points, but Best pack finds a way to get 51 points using the same weight limit.'),
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: at('sample-btn'),
      popover: {
        title: 'A: Sample goods',
        description:
          'Fills the list with 12 typical relief items so you can try the app right away.' +
          ex('rice, water, a medicine kit, blankets and a family tent, with a 50 kg truck.'),
        side: 'left',
        align: 'start',
      },
    },

    // B
    {
      element: at('tab-quick'),
      onHighlightStarted: () => ctx.setMethod('quick'),
      popover: {
        title: 'B: Quick pack',
        description:
          'A fast shortcut. It takes the items that give the most importance for their weight first, and stops when the truck is full.' +
          ex('the medicine kit (4 kg, importance 10) and the baby formula go in first. Result: 48 points.'),
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: at('weight-check'),
      popover: {
        title: 'B: Weight check',
        description:
          'Adds up the weight of the packed items and confirms they fit within the limit. It takes one quick pass over the list.' +
          ex('8 items weigh 45 kg, within the 50 kg limit.'),
        side: 'top',
        align: 'start',
      },
    },

    // C
    {
      element: at('item-table'),
      popover: {
        title: 'C: Item list',
        description:
          'Shows everything you entered in one table. If an item is no longer available, remove it and the plan updates.' +
          ex('the flashlights were given to another team, so you click Remove on Flashlights.'),
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: at('weight-check'),
      popover: {
        title: 'C: Easy to check',
        description:
          'Anyone can check a suggested load by adding up its weights. Checking is quick, even though finding the best load is hard.' +
          ex('rice sack 25 kg + medicine kit 4 kg + water 12 kg = 41 kg. That is under 50 kg, so it is allowed.'),
        side: 'top',
        align: 'start',
      },
    },

    // D
    {
      element: at('progress'),
      popover: {
        title: 'D: The best load',
        description:
          'Shows how full the truck is, what goes in the box and what stays behind. The app is looking for the most useful load that still fits.' +
          ex('Quick pack fills 45 of 50 kg (90% full) and leaves the rice sack behind.'),
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: at('progress'),
      popover: {
        title: 'D: Two ways to ask',
        description:
          'The same question can be asked two ways: "what is the best possible load?" or "is there a load worth at least a certain number of points?" The second needs only a yes or no.' +
          ex('"Is there a load worth at least 50 points that fits in 50 kg?" Yes or no.'),
        side: 'bottom',
        align: 'start',
      },
    },

    // E
    {
      element: at('notes'),
      popover: {
        title: 'E: Why it is hard',
        description:
          'A known hard puzzle can be turned into a packing problem. If packing were easy, the puzzle would be easy too.' +
          ex('numbers 3, 5, 7 and 9 become items of 3, 5, 7 and 9 kg, with a 14 kg truck. A load worth 14 points exists only if some numbers add up to 14: 5 + 9.'),
        side: 'top',
        align: 'start',
      },
    },
    {
      element: at('tab-best'),
      onHighlightStarted: () => ctx.setMethod('best'),
      popover: {
        title: 'E: Best pack',
        description:
          'Looks carefully through the choices and finds the most useful load that fits. It is slower than Quick pack, but always the best.' +
          ex('with the sample goods it fills all 50 kg for 51 points.'),
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: at('compare'),
      onHighlightStarted: () => ctx.setMethod('quick'),
      popover: {
        title: 'E: Quick vs. Best',
        description:
          'Tells you how much better Best pack is than the shortcut.' +
          ex('Best pack carries 3 more points than Quick pack (51 vs 48). Quick pack reaches about 94% of the best.'),
        side: 'top',
        align: 'start',
      },
    },
  ]
}
