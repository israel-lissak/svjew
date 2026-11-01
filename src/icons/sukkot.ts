import { VIEWBOX, type IconDefinition } from './types';

/** The four species: lulav with hadass and aravah bound together, and an etrog. */
export const sukkot: IconDefinition = {
  key: 'sukkot',
  viewBox: VIEWBOX,
  title: 'סוכות',
  paths: [
    // lulav (palm frond)
    { d: 'M9 21.5V9.5c0-3 .4-5.4 1-7.5.6 2.1 1 4.5 1 7.5v12' },
    // hadass (myrtle) – left, short paired leaves
    { d: 'M6.5 21V8' },
    { d: 'M6.5 9.5c-1 0-1.8-.6-2-1.6M6.5 12.5c-1 0-1.8-.6-2-1.6M6.5 15.5c-1 0-1.8-.6-2-1.6' },
    // aravah (willow) – right, long leaves
    { d: 'M13 21V9' },
    { d: 'M13 10.5c1-.6 1.3-1.8 1.2-3.4M13 14c1-.6 1.3-1.8 1.2-3.4' },
    // binding
    { d: 'M5.5 18.5h8.5' },
    // etrog with pitam
    { d: 'M18.5 13c1.9 0 3 1.7 3 3.9s-1.4 4.3-3 4.3-3-2.1-3-4.3 1.1-3.9 3-3.9z' },
    { d: 'M18.5 13v-1.3' },
  ],
};
