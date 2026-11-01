import { VIEWBOX, type IconDefinition } from './types';

/** A masquerade mask on a stick. */
export const purim: IconDefinition = {
  key: 'purim',
  viewBox: VIEWBOX,
  title: 'פורים',
  paths: [
    {
      d: 'M2.5 8.5c3.2-1.6 6.3-1.3 9.5.4 3.2-1.7 6.3-2 9.5-.4 0 4.3-2.1 7.5-4.8 7.5-2.1 0-3.5-1.4-4.7-3.2-1.2 1.8-2.6 3.2-4.7 3.2-2.7 0-4.8-3.2-4.8-7.5z',
    },
    // eyes
    {
      d: 'M5.8 11c.9-.9 2.6-.9 3.5 0-.9.9-2.6.9-3.5 0zM14.7 11c.9-.9 2.6-.9 3.5 0-.9.9-2.6.9-3.5 0z',
    },
    // stick
    { d: 'M19.5 15.2l1.5 6.3' },
  ],
};
