import type { Event, HDate } from '@hebcal/core';

/** Every kind of day svjew can draw an icon for. */
export type SvJewKey =
  | 'shabbat'
  | 'roshHashana'
  | 'yomKippur'
  | 'sukkot'
  | 'simchatTorah'
  | 'chanukah'
  | 'tuBishvat'
  | 'purim'
  | 'pesach'
  | 'lagBaomer'
  | 'shavuot'
  | 'roshChodesh'
  | 'fastDay'
  | 'yomHaatzmaut';

export interface SvJewMeta {
  /** Chanukah: which night's candles are lit (1–8). */
  night?: number;
  /** Day number within a multi-day observance (Rosh Hashana, Sukkot, Pesach, Shavuot, Chanukah). */
  day?: number;
  /** `true` when the match comes from an Erev event (only returned with `showErev`). */
  erev?: boolean;
}

export interface SvJewMatch {
  key: SvJewKey;
  meta?: SvJewMeta;
  /** The original hebcal event (absent for Shabbat, which is derived from the weekday). */
  event?: Event;
}

export interface SvJewLocation {
  lat: number;
  lng: number;
}

export interface SvJewOptions {
  /** Date to inspect. Defaults to now. */
  date?: Date | HDate;
  /** Israel (`true`, default) or diaspora (`false`) holiday schedule. */
  il?: boolean;
  /** Only return these keys. */
  include?: SvJewKey[];
  /** Never return these keys. */
  exclude?: SvJewKey[];
  /** Ordering preference. Keys not listed keep their default relative order after the listed ones. */
  priority?: SvJewKey[];
  /** Maximum number of matches to return. Default: unlimited. */
  max?: number;
  /** Include Erev events (Erev Pesach, Erev Yom Kippur, the first Chanukah candle…). Default `false`. */
  showErev?: boolean;
  /**
   * When provided, the Hebrew day starts at sunset at this location
   * (so Friday after sunset is Shabbat). Without it, the day boundary is midnight.
   * Ignored when `date` is an `HDate`, which has no time of day.
   */
  location?: SvJewLocation;
}
