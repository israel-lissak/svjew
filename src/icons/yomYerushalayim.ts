import { VIEWBOX, type IconDefinition } from './types';

/** The Western Wall: stone courses growing larger toward the bottom, with a plant on top. */
export const yomYerushalayim: IconDefinition = {
  key: 'yomYerushalayim',
  viewBox: VIEWBOX,
  title: 'יום ירושלים',
  paths: [
    // wall outline and courses
    { d: 'M3 5h18v16H3z' },
    { d: 'M3 8h18M3 11.5h18M3 15.5h18' },
    // staggered joints
    {
      d: 'M7 5v3M11.5 5v3M16 5v3M5 8v3.5M9.5 8v3.5M14 8v3.5M18.5 8v3.5M8 11.5v4M14.5 11.5v4M5.5 15.5v5.5M11 15.5v5.5M17.5 15.5v5.5',
    },
    // plant growing from the top
    {
      d: 'M14 5c-.2-1.3.3-2.4 1.3-3M14 5c-.6-.9-1.6-1.3-2.7-1.2M14 5c.6-.7 1.6-1 2.7-.7',
      strokeWidth: 1,
    },
  ],
};
