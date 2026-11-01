// Compact contact sheet: every icon as a <symbol>, reused at several sizes.
import { SVJEW_KEYS } from '../dist/core.js';
import { iconData, resolveIcon, chanukiah, STROKE_WIDTH } from '../dist/icons.js';
const sym = (id, d) =>
  `<symbol id="${id}" viewBox="${d.viewBox}">${d.paths.map((p) => `<path d="${p.d}"${p.fill ? ` fill="${p.fill}"` : ''}${p.stroke ? ` stroke="${p.stroke}"` : ''}${p.strokeWidth ? ` stroke-width="${p.strokeWidth}"` : ''}${p.opacity ? ` opacity="${p.opacity}"` : ''}/>`).join('')}</symbol>`;
const defs =
  SVJEW_KEYS.map((k) => sym(k, resolveIcon(iconData[k]))).join('') +
  [1, 2, 3, 4, 5, 6, 7].map((n) => sym('n' + n, chanukiah(n))).join('');
const use = (id, s) => `<svg width="${s}" height="${s}"><use href="#${id}"/></svg>`;
const row = (ids, s, lab) =>
  `<div class=g>${ids.map((id, i) => `<div class=c>${use(id, s)}${lab ? `<small>${lab[i]}</small>` : ''}</div>`).join('')}</div>`;
const nights = [1, 2, 3, 4, 5, 6, 7].map((n) => 'n' + n);
process.stdout
  .write(`<!doctype html><meta charset=utf-8><style>body{font:11px system-ui;color:#1f2937;background:#fff;margin:8px}.g{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}.c{display:flex;flex-direction:column;align-items:center;width:84px}svg{background:#f1f5f9;border-radius:4px;fill:none;stroke:currentColor;stroke-width:${STROKE_WIDTH};stroke-linecap:round;stroke-linejoin:round;overflow:hidden}.d{background:#0f172a;color:#fbbf24;padding:8px}.d svg{background:#1e293b}</style><svg width=0 height=0 style=position:absolute>${defs}</svg>
${row(SVJEW_KEYS, 72, SVJEW_KEYS)}${row(SVJEW_KEYS, 24)}${row(
  nights,
  72,
  nights.map((n) => 'night ' + n.slice(1)),
)}`);
