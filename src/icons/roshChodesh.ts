import { VIEWBOX, type IconDefinition } from './types';

/** A new crescent moon with a small star. */
export const roshChodesh: IconDefinition = {
  key: 'roshChodesh',
  viewBox: VIEWBOX,
  title: 'ראש חודש',
  paths: [
    { d: 'M19.5 15.5A8.5 8.5 0 1 1 9 4.2a7 7 0 0 0 10.5 11.3z' },
    {
      d: 'M17.5 3.5l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z',
      fill: 'currentColor',
      strokeWidth: 0.5,
    },
  ],
};
