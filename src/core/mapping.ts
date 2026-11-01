import { flags, type Event, type HDate } from '@hebcal/core';
import type { SvJewKey, SvJewMeta } from './types';

export interface Classification {
  key: SvJewKey;
  meta?: SvJewMeta;
}

// Description strings verified against @hebcal/core 6.x output for Hebrew years
// 5760–5830 in both Israel and diaspora modes. After upgrading hebcal, re-check
// with `npm run hebcal:descriptions`.
// Exact matches / anchored regexes on purpose, to avoid look-alikes such as
// "Rosh Hashana LaBehemot", "Pesach Sheni", "Purim Katan" and "Yom Kippur Katan …".
const EXACT: Record<string, SvJewKey> = {
  'Yom Kippur': 'yomKippur',
  'Shmini Atzeret': 'simchatTorah',
  'Simchat Torah': 'simchatTorah',
  'Tu BiShvat': 'tuBishvat',
  Purim: 'purim',
  'Shushan Purim': 'purim',
  'Purim Meshulash': 'purim',
  'Lag BaOmer': 'lagBaomer',
  "Yom HaAtzma'ut": 'yomHaatzmaut',
};

const PATTERNS: Array<[RegExp, SvJewKey]> = [
  [/^Rosh Hashana(?: \d+| II)?$/, 'roshHashana'],
  [/^Sukkot(?: [IVX]+(?: \(.*\))?)?$/, 'sukkot'],
  [/^Pesach(?: [IVX]+(?: \(CH''M\))?)?$/, 'pesach'],
  [/^Shavuot(?: I| II)?$/, 'shavuot'],
  [/^Chanukah(?::.*)?$/, 'chanukah'],
];

function keyFromDesc(desc: string): SvJewKey | undefined {
  const exact = EXACT[desc];
  if (exact) return exact;
  for (const [re, key] of PATTERNS) if (re.test(desc)) return key;
  return undefined;
}

function keyForEvent(ev: Event): SvJewKey | undefined {
  const byDesc = keyFromDesc(ev.getDesc());
  if (byDesc) return byDesc;
  const mask = ev.getFlags();
  if (mask & flags.ROSH_CHODESH) return 'roshChodesh';
  // Minor + major fasts. Yom Kippur is matched above; the customary
  // Yom Kippur Katan and BeHaB fasts (also flagged MINOR_FAST) are skipped.
  if (
    mask & (flags.MINOR_FAST | flags.MAJOR_FAST) &&
    !(mask & (flags.YOM_KIPPUR_KATAN | flags.BEHAB))
  ) {
    return 'fastDay';
  }
  return undefined;
}

function dayMeta(key: SvJewKey, hd: HDate, ev: Event): SvJewMeta | undefined {
  const d = hd.getDate();
  switch (key) {
    case 'roshHashana':
      return { day: d }; // 1–2 Tishrei
    case 'sukkot':
    case 'pesach':
      return { day: d - 14 }; // counted from the 15th
    case 'shavuot':
      return { day: d - 5 }; // counted from 6 Sivan
    case 'chanukah': {
      // hebcal's chanukahDay is the Hebrew day of Chanukah (25 Kislev = 1),
      // whose evening began with that night's candles.
      const n = (ev as Event & { chanukahDay?: number }).chanukahDay;
      return n ? { night: n, day: n } : undefined;
    }
    default:
      return undefined;
  }
}

/**
 * Map a single hebcal event to an svjew key, or `null` when it has no icon.
 * Erev events are classified as their holiday with `meta.erev = true`.
 */
export function classifyEvent(ev: Event, hd: HDate = ev.getDate()): Classification | null {
  if (ev.getFlags() & flags.EREV) {
    const key = keyFromDesc(ev.getDesc().replace(/^Erev /, '')) ?? keyForEvent(ev);
    if (!key) return null;
    // "Chanukah: 1 Candle" (24 Kislev) is the evening the first candle is lit.
    return { key, meta: key === 'chanukah' ? { night: 1, erev: true } : { erev: true } };
  }
  const key = keyForEvent(ev);
  if (!key) return null;
  const meta = dayMeta(key, hd, ev);
  return meta ? { key, meta } : { key };
}
