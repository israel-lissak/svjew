import { VIEWBOX, type IconDefinition } from './types';

/** An open Torah scroll on two rollers. */
export const simchatTorah: IconDefinition = {
  key: 'simchatTorah',
  viewBox: VIEWBOX,
  title: 'שמחת תורה',
  paths: [
    // rollers
    { d: 'M3.5 6a1.5 1.5 0 0 1 3 0v12a1.5 1.5 0 0 1-3 0z' },
    { d: 'M17.5 6a1.5 1.5 0 0 1 3 0v12a1.5 1.5 0 0 1-3 0z' },
    // handles
    { d: 'M5 2.5v2M5 19.5v2M19 2.5v2M19 19.5v2' },
    // parchment
    { d: 'M6.5 6.5h11M6.5 17.5h11' },
    // columns of text
    { d: 'M9 9.5h2M9 12h2M9 14.5h2M13 9.5h2M13 12h2M13 14.5h2', strokeWidth: 1.25 },
  ],
};
