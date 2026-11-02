import { circle, VIEWBOX, type IconDefinition } from './types';

/** "No food": a fork and knife inside a prohibition sign. */
export const fastDay: IconDefinition = {
  key: 'fastDay',
  viewBox: VIEWBOX,
  title: 'צום',
  paths: [
    // fork: tines, bowl and handle
    { d: 'M7.5 6v3.5M9 6v3.5M10.5 6v3.5M7.5 9.5a1.5 1.5 0 0 0 3 0M9 11v7' },
    // knife: blade and handle
    { d: 'M15 18V6c1.6.8 2.2 3.2 2.2 6H15' },
    // prohibition sign
    { d: circle(12, 12, 9.5) },
    { d: 'M5.3 5.3l13.4 13.4' },
  ],
};
