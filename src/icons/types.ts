import type { SvJewKey, SvJewMeta } from '../core/types';

/** One drawable path. Defaults come from the icon root: `fill="none"`, `stroke="currentColor"`. */
export interface IconPath {
  d: string;
  /** e.g. `'currentColor'` for solid shapes. Default: none. */
  fill?: string;
  /** Override stroke (`'none'` to disable). Default: currentColor. */
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
}

/** Renderer-agnostic icon description (plain data, usable by any SVG renderer). */
export interface IconData {
  viewBox: string;
  /** Accessible title, in Hebrew. */
  title: string;
  paths: IconPath[];
}

export interface IconDefinition extends IconData {
  key: SvJewKey;
  /** For dynamic icons (e.g. the chanukiah): build the icon for a given match meta. */
  render?: (meta?: SvJewMeta) => IconData;
}

/** Round to 2 decimals so generated path strings stay short and stable. */
const r2 = (n: number): number => Math.round(n * 100) / 100;

export const VIEWBOX = '0 0 24 24';
export const STROKE_WIDTH = 1.5;

/** Resolve the concrete icon data for a match (applies `render` and the Erev title prefix). */
export function resolveIcon(def: IconDefinition, meta?: SvJewMeta): IconData {
  const data = def.render ? def.render(meta) : def;
  const title = meta?.erev ? `ערב ${data.title}` : data.title;
  return { viewBox: data.viewBox, title, paths: data.paths };
}

/** SVG path for a circle (paths only, so every renderer handles it the same way). */
export /* @__NO_SIDE_EFFECTS__ */ function circle(cx: number, cy: number, r: number): string {
  return `M${r2(cx - r)} ${cy}a${r} ${r} 0 1 0 ${r2(2 * r)} 0a${r} ${r} 0 1 0 ${r2(-2 * r)} 0z`;
}

/** Small solid flame (teardrop) whose tip is at (x, top); `w` is the half-width. */
export /* @__NO_SIDE_EFFECTS__ */ function flame(x: number, top: number, w = 1): string {
  const [a, b, c, d, e] = [0.7 * w, 0.8 * w, 1.4 * w, 1.9 * w, 0.5 * w].map(r2) as [
    number,
    number,
    number,
    number,
    number,
  ];
  return `M${x} ${top}c${a} ${b} ${w} ${c} ${w} ${d}a${w} ${w} 0 0 1 ${-2 * w} 0c0 ${-e} ${r2(0.3 * w)} ${r2(-1.1 * w)} ${w} ${-d}z`;
}
