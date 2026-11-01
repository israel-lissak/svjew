import { HDate, months } from '@hebcal/core';
import { getSvJewMatches, type SvJewOptions } from '../src/core';

export { HDate, months };

/** Gregorian Date (local midnight) for a Hebrew date, computed by hebcal. */
export const greg = (day: number, month: number, year: number): Date =>
  new HDate(day, month, year).greg();

export const keys = (date: Date | HDate, opts?: SvJewOptions) =>
  getSvJewMatches(date, opts).map((m) => m.key);

/** First Hebrew date in [from, from + span) satisfying `pred`. */
export function findDay(from: HDate, span: number, pred: (hd: HDate) => boolean): HDate {
  for (let i = 0; i < span; i++) {
    const hd = from.add(i);
    if (pred(hd)) return hd;
  }
  throw new Error(`no matching day within ${span} days of ${from.toString()}`);
}

/** Search Hebrew years for one where `pred` finds a day; returns that day. */
export function findInYears(
  years: number[],
  build: (year: number) => { from: HDate; span: number },
  pred: (hd: HDate) => boolean,
): HDate {
  for (const y of years) {
    const { from, span } = build(y);
    for (let i = 0; i < span; i++) {
      const hd = from.add(i);
      if (pred(hd)) return hd;
    }
  }
  throw new Error('no year matched');
}

export const isSaturday = (hd: HDate) => hd.getDay() === 6;
export const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
