import * as s from './shofar';
import { VIEWBOX, type IconDefinition } from './types';

/** The single shofar blast that closes Yom Kippur. */
export const yomKippur: IconDefinition = {
  key: 'yomKippur',
  viewBox: VIEWBOX,
  title: 'יום כיפור',
  paths: [
    { d: s.SHOFAR_BELL },
    { d: s.SHOFAR_BODY_INNER },
    { d: s.SHOFAR_BODY_OUTER },
    { d: s.SHOFAR_MOUTHPIECE },
    { d: s.SHOFAR_RIDGES },
  ],
};
