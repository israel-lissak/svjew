import type { SvJewMeta } from '../core/types';
import { flame, VIEWBOX, type IconData, type IconDefinition, type IconPath } from './types';

const ORDINALS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שביעי', 'שמיני'];

// Candle x positions, viewer's left → right. The shamash stands in the middle.
const CANDLES = [3, 5.25, 7.5, 9.75, 14.25, 16.5, 18.75, 21];
const BAR_Y = 14.5;
const CANDLE_TOP = 10.5;
const SHAMASH_TOP = 7.5;

const clampNight = (n: number | undefined) => Math.min(8, Math.max(1, Math.round(n ?? 8)));

/**
 * A chanukiah for a given night. Candles are placed from the right, so on night `n`
 * the `n` right-most candles are lit, plus the shamash.
 */
export /* @__NO_SIDE_EFFECTS__ */ function chanukiah(night?: number): IconData {
  const n = clampNight(night);
  const paths: IconPath[] = [
    // base, stem and bar
    { d: 'M8.5 21h7M12 21v-6.5M2.5 14.5h19' },
    // shamash
    { d: `M12 ${BAR_Y}V${SHAMASH_TOP}` },
    { d: flame(12, SHAMASH_TOP - 4), fill: 'currentColor', stroke: 'none' },
  ];
  CANDLES.forEach((x, i) => {
    const lit = i >= CANDLES.length - n;
    paths.push({ d: `M${x} ${BAR_Y}V${CANDLE_TOP}`, opacity: lit ? 1 : 0.35 });
    if (lit)
      paths.push({ d: flame(x, CANDLE_TOP - 3.5, 0.8), fill: 'currentColor', stroke: 'none' });
  });
  return { viewBox: VIEWBOX, title: `חנוכה – נר ${ORDINALS[n - 1]}`, paths };
}

export const chanukah: IconDefinition = {
  key: 'chanukah',
  viewBox: VIEWBOX,
  title: 'חנוכה',
  // Default (no meta): all eight candles lit.
  get paths() {
    return chanukiah(8).paths;
  },
  render: (meta?: SvJewMeta) => chanukiah(meta?.night),
};
