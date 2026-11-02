import { VIEWBOX, type IconDefinition } from './types';

/** A dove of peace carrying an olive branch. */
export const yomRabin: IconDefinition = {
  key: 'yomRabin',
  viewBox: VIEWBOX,
  title: 'יום הזיכרון ליצחק רבין',
  paths: [
    // body, raised wing and tail
    {
      d: 'M21 8.5l-2.2-.4c-.5-1.6-2.4-2.3-3.7-1.2-1.2 1-1.1 2.6-1.8 3.8L9.5 6 3.5 3.5c.6 3.5 2.4 6.7 5.2 8.5L3 15.5c3 1.8 7.2 2 10.4.4 2.7-1.4 4.3-3.7 4.8-6.2z',
    },
    // eye
    { d: 'M16.3 8.3h.01', strokeWidth: 2 },
    // olive branch: stem and leaves
    { d: 'M20 8.6c.1 2.5-.6 4.6-2 6.2', strokeWidth: 1 },
    {
      d: 'M20.1 10.5c1 .1 1.6.6 1.9 1.4-1 .1-1.6-.4-1.9-1.4zM19.2 13c-1 .1-1.6.6-1.9 1.4 1 .1 1.6-.4 1.9-1.4zM19.9 12.2c.9.3 1.4.9 1.4 1.8-.9-.3-1.4-.9-1.4-1.8z',
      fill: 'currentColor',
      stroke: 'none',
    },
  ],
};
