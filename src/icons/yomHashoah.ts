import { VIEWBOX, type IconDefinition } from './types';

/** A memorial candle (ner neshama) in a glass. */
export const yomHashoah: IconDefinition = {
  key: 'yomHashoah',
  viewBox: VIEWBOX,
  title: 'יום הזיכרון לשואה ולגבורה',
  paths: [
    // glass and label band
    { d: 'M8 10.5h8v10a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z' },
    { d: 'M8 13.5h8' },
    // wick
    { d: 'M12 8.2v2.3' },
    // flame
    {
      d: 'M12 2c1.1 1.3 1.6 2.2 1.6 3.1a1.6 1.6 0 0 1-3.2 0c0-.9.5-1.8 1.6-3.1z',
      fill: 'currentColor',
      stroke: 'none',
    },
  ],
};
