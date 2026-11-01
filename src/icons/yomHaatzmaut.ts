import { VIEWBOX, type IconDefinition } from './types';

/** A flag with two stripes and a Star of David, on a pole. */
export const yomHaatzmaut: IconDefinition = {
  key: 'yomHaatzmaut',
  viewBox: VIEWBOX,
  title: 'יום העצמאות',
  paths: [
    { d: 'M3.5 21.5v-19' },
    { d: 'M3.5 4h17v11h-17' },
    { d: 'M3.5 6.3h17M3.5 12.7h17', strokeWidth: 1.25 },
    { d: 'M12 7.3l1.9 3.3h-3.8zM12 11.7l-1.9-3.3h3.8z', strokeWidth: 0.9 },
  ],
};
