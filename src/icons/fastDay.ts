import { circle, VIEWBOX, type IconDefinition } from './types';

/** An empty plate whose rim doubles as a clock face. */
export const fastDay: IconDefinition = {
  key: 'fastDay',
  viewBox: VIEWBOX,
  title: 'צום',
  paths: [
    { d: circle(12, 12, 9.5) },
    { d: circle(12, 12, 6), strokeWidth: 1 },
    { d: 'M12 8.5V12l2.5 1.8' },
    { d: 'M12 2.5v1.4M21.5 12h-1.4M12 21.5v-1.4M2.5 12h1.4' },
  ],
};
