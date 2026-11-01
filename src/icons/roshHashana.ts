import * as s from './shofar';
import { VIEWBOX, type IconDefinition } from './types';

/** A shofar with a blast of sound. */
export const roshHashana: IconDefinition = {
  key: 'roshHashana',
  viewBox: VIEWBOX,
  title: 'ראש השנה',
  paths: [
    { d: s.SHOFAR_BELL },
    { d: s.SHOFAR_BODY_INNER },
    { d: s.SHOFAR_BODY_OUTER },
    { d: s.SHOFAR_MOUTHPIECE },
    { d: s.SHOFAR_RIDGES },
    // sound
    { d: 'M20.9 2.4l1.3-1.1M22 5.6h1.2M21.7 9.1l1.4.4' },
  ],
};
