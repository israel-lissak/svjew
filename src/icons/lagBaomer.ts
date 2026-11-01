import { VIEWBOX, type IconDefinition } from './types';

/** A bonfire: a flame over crossed logs. */
export const lagBaomer: IconDefinition = {
  key: 'lagBaomer',
  viewBox: VIEWBOX,
  title: 'ל״ג בעומר',
  paths: [
    {
      d: 'M12 2.5c3.3 2.9 5 5.8 5 8.7a5 5 0 0 1-10 0c0-1.7.7-3.2 1.9-4.6.3 1.5 1 2.5 2.1 3 0-2.6.3-4.9 1-7.1z',
    },
    { d: 'M12 16.2a2 2 0 0 0 2-2c0-1.2-.8-2.2-2-3.4-1.2 1.2-2 2.2-2 3.4a2 2 0 0 0 2 2z' },
    // crossed logs
    { d: 'M3.5 21.5l17-4M3.5 17.5l17 4' },
  ],
};
