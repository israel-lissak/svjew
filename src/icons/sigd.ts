import { VIEWBOX, type IconDefinition } from './types';

/** The ceremonial umbrella carried by the kessim at the Sigd. */
export const sigd: IconDefinition = {
  key: 'sigd',
  viewBox: VIEWBOX,
  title: 'חג הסיגד',
  paths: [
    // canopy with a scalloped edge
    { d: 'M3 12a9 7 0 0 1 18 0' },
    { d: 'M3 12q2.25 1.6 4.5 0t4.5 0 4.5 0 4.5 0' },
    { d: 'M7.5 12c0-3 1.7-5.5 4.5-7 2.8 1.5 4.5 4 4.5 7', strokeWidth: 1 },
    // tassels
    { d: 'M3 12.3v1.7M7.5 12.3v1.7M16.5 12.3v1.7M21 12.3v1.7', strokeWidth: 1 },
    // pole and finial
    { d: 'M12 12.4v9M12 5V3.5' },
  ],
};
