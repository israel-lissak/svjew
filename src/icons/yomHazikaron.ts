import { VIEWBOX, type IconDefinition } from './types';

/** A flag with two stripes and a Star of David, lowered to half-mast. */
export const yomHazikaron: IconDefinition = {
  key: 'yomHazikaron',
  viewBox: VIEWBOX,
  title: 'יום הזיכרון לחללי מערכות ישראל ולנפגעי פעולות האיבה',
  paths: [
    // pole, base and finial
    { d: 'M5 21.5V3.5M3 21.5h4' },
    { d: 'M5 2.2h.01', strokeWidth: 2 },
    // flag at half-mast
    { d: 'M5 9h15v8H5' },
    { d: 'M5 10.6h15M5 15.4h15', strokeWidth: 1 },
    { d: 'M12.5 11.6l1.3 2.2h-2.6zM12.5 14.4l-1.3-2.2h2.6z', strokeWidth: 0.8 },
  ],
};
