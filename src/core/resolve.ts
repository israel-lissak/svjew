import { GeoLocation, HDate, HebrewCalendar, Zmanim } from '@hebcal/core';
import { DEFAULT_PRIORITY } from './constants';
import { classifyEvent } from './mapping';
import type { SvJewKey, SvJewLocation, SvJewMatch, SvJewOptions } from './types';

function isHDate(value: unknown): value is HDate {
  // Duck-typed so HDate instances from another copy of @hebcal/core also work.
  return (
    value instanceof HDate ||
    (typeof value === 'object' &&
      value !== null &&
      typeof (value as HDate).abs === 'function' &&
      typeof (value as HDate).getTishreiMonth === 'function')
  );
}

function localTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

/**
 * Resolve the Hebrew date for an input. Without `location` the local civil date is
 * used, i.e. the day changes at midnight. With `location`, moments at or after that
 * day's sunset roll over to the next Hebrew day.
 */
export function resolveHebrewDate(date?: Date | HDate, location?: SvJewLocation): HDate {
  if (isHDate(date)) return new HDate(date.abs());
  const when = date ?? new Date();
  const hd = new HDate(when);
  if (!location) return hd;
  const gloc = new GeoLocation(null, location.lat, location.lng, 0, localTimeZone());
  const sunset = new Zmanim(gloc, when, false).sunset().getTime();
  // Sunset can be undefined (NaN) near the poles; then keep the civil date.
  return !Number.isNaN(sunset) && when.getTime() >= sunset ? hd.next() : hd;
}

function keyOrder(priority?: SvJewKey[]): SvJewKey[] {
  if (!priority?.length) return [...DEFAULT_PRIORITY];
  const first = new Set<SvJewKey>(priority);
  return [...first, ...DEFAULT_PRIORITY.filter((k) => !first.has(k))];
}

type DateOrOptions = Date | HDate | SvJewOptions;

function normalizeArgs(dateOrOpts?: DateOrOptions, opts?: SvJewOptions): SvJewOptions {
  if (dateOrOpts instanceof Date || isHDate(dateOrOpts)) return { ...opts, date: dateOrOpts };
  return { ...dateOrOpts, ...opts };
}

/**
 * All svjew matches for a date, deduplicated by key and ordered by priority.
 * Pure and SSR-safe.
 *
 * @example getSvJewMatches(new Date(), { il: false })
 * @example getSvJewMatches({ date: new HDate(25, 'Kislev', 5787), showErev: true })
 */
export function getSvJewMatches(date?: DateOrOptions, opts?: SvJewOptions): SvJewMatch[] {
  const o = normalizeArgs(date, opts);
  const hd = resolveHebrewDate(o.date, o.location);

  const byKey = new Map<SvJewKey, SvJewMatch>();
  for (const ev of HebrewCalendar.getHolidaysOnDate(hd, o.il ?? true) ?? []) {
    const c = classifyEvent(ev, hd);
    if (!c || (c.meta?.erev && !o.showErev)) continue;
    const prev = byKey.get(c.key);
    if (prev && !prev.meta?.erev) continue; // dedupe: first non-erev event wins
    byKey.set(c.key, c.meta ? { key: c.key, meta: c.meta, event: ev } : { key: c.key, event: ev });
  }
  if (hd.getDay() === 6) byKey.set('shabbat', { key: 'shabbat' });

  const include = o.include ? new Set(o.include) : undefined;
  const exclude = new Set(o.exclude ?? []);
  const matches = keyOrder(o.priority)
    .filter((k) => byKey.has(k) && (!include || include.has(k)) && !exclude.has(k))
    .map((k) => byKey.get(k)!);

  return o.max !== undefined && o.max >= 0 ? matches.slice(0, o.max) : matches;
}

/** The highest-priority key for a date, or `null` on an ordinary day. */
export function getSvJewKey(date?: DateOrOptions, opts?: SvJewOptions): SvJewKey | null {
  return getSvJewMatches(date, opts)[0]?.key ?? null;
}
