import { flame, VIEWBOX, type IconDefinition } from './types';

/** Two Shabbat candles above a braided challah. */
export const shabbat: IconDefinition = {
  key: 'shabbat',
  viewBox: VIEWBOX,
  title: 'שבת',
  paths: [
    { d: 'M6.5 7.5h3v6.5h-3z' },
    { d: 'M14.5 7.5h3v6.5h-3z' },
    { d: flame(8, 2.4), fill: 'currentColor', stroke: 'none' },
    { d: flame(16, 2.4), fill: 'currentColor', stroke: 'none' },
    { d: 'M3.5 18.5c0-1.9 3.8-3.4 8.5-3.4s8.5 1.5 8.5 3.4-3.8 3-8.5 3-8.5-1.1-8.5-3z' },
    { d: 'M8.5 15.6c1 1.4 1 4.2 0 5.6' },
    { d: 'M12 15.1c1 1.6 1 4.8 0 6.4' },
    { d: 'M15.5 15.6c1 1.4 1 4.2 0 5.6' },
  ],
};
