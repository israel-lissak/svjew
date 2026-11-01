import type { SvJewKey } from './types';

/** Default display order when several icons apply to the same day. */
export const DEFAULT_PRIORITY: readonly SvJewKey[] = Object.freeze([
  'yomKippur',
  'roshHashana',
  'pesach',
  'sukkot',
  'simchatTorah',
  'shavuot',
  'chanukah',
  'purim',
  'shabbat',
  'roshChodesh',
  'tuBishvat',
  'lagBaomer',
  'yomHaatzmaut',
  'fastDay',
] as const);

/** All supported keys. */
export const SVJEW_KEYS: readonly SvJewKey[] = DEFAULT_PRIORITY;
