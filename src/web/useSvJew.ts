import { useMemo } from 'react';
import { getSvJewMatches } from '../core/resolve';
import type { SvJewMatch, SvJewOptions } from '../core/types';

function dateKey(date: SvJewOptions['date'], withLocation: boolean): string {
  if (date === undefined) {
    // "Now": recompute on re-render once the minute (with a location, sunset may pass)
    // or the day (without one) changes.
    const now = new Date();
    return withLocation
      ? `now:${Math.floor(now.getTime() / 60_000)}`
      : `now:${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  }
  return date instanceof Date ? `d:${date.getTime()}` : `h:${date.abs()}`;
}

/** Memoized `getSvJewMatches` for React. Options are compared by value, not identity. */
export function useSvJew(opts: SvJewOptions = {}): SvJewMatch[] {
  const { date, il, include, exclude, priority, max, showErev, location } = opts;
  const dk = dateKey(date, !!location);
  const inc = include?.join(',');
  const exc = exclude?.join(',');
  const pri = priority?.join(',');
  const lat = location?.lat;
  const lng = location?.lng;

  return useMemo(
    () => getSvJewMatches({ date, il, include, exclude, priority, max, showErev, location }),
    // Options are keyed by value so inline arrays/objects don't defeat memoization.
    [dk, il, inc, exc, pri, max, showErev, lat, lng],
  );
}
