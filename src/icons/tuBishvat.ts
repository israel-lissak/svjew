import { circle, VIEWBOX, type IconDefinition } from './types';

/** A leafy tree bearing fruit. */
export const tuBishvat: IconDefinition = {
  key: 'tuBishvat',
  viewBox: VIEWBOX,
  title: 'ט״ו בשבט',
  paths: [
    // canopy
    {
      d: 'M12 2.5a5 5 0 0 1 4.8 3.6A3.8 3.8 0 0 1 16.5 13.5h-9A3.8 3.8 0 0 1 7.2 6.1 5 5 0 0 1 12 2.5z',
    },
    // trunk and branches
    { d: 'M12 21.5v-8M12 17l-2.5-2.5M12 16l2.5-2.5' },
    { d: 'M8 21.5h8' },
    // fruit
    {
      d: `${circle(9.5, 8.5, 1)}${circle(14.5, 7.5, 1)}${circle(12.5, 11, 1)}`,
      fill: 'currentColor',
      stroke: 'none',
    },
  ],
};
