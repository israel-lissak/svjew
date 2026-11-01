import { circle, VIEWBOX, type IconDefinition } from './types';

/** A closed Torah scroll beside a flower. */
export const shavuot: IconDefinition = {
  key: 'shavuot',
  viewBox: VIEWBOX,
  title: 'שבועות',
  paths: [
    // closed scroll: two rollers side by side
    { d: 'M3 6.5a2 2 0 0 1 4 0v11a2 2 0 0 1-4 0z' },
    { d: 'M7 6.5a2 2 0 0 1 4 0v11a2 2 0 0 1-4 0z' },
    { d: 'M5 2.5v2M9 2.5v2M5 19.5v2M9 19.5v2' },
    // flower
    {
      d: `${circle(17, 4.8, 1.7)}${circle(19.7, 7.5, 1.7)}${circle(17, 10.2, 1.7)}${circle(14.3, 7.5, 1.7)}`,
    },
    { d: circle(17, 7.5, 0.9), fill: 'currentColor', stroke: 'none' },
    { d: 'M17 12v9.5' },
    {
      d: 'M17 18c0-2 1.3-3.2 3.5-3.2 0 2-1.3 3.2-3.5 3.2zM17 16.5c0-1.6-1-2.6-2.8-2.6 0 1.6 1 2.6 2.8 2.6z',
    },
  ],
};
