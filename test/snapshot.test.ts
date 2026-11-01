import { describe, expect, it } from 'vitest';
import { getSvJewMatches, type SvJewMatch } from '../src/core';
import { HDate, months } from './helpers';

const YEAR = 5787;

function fmtMeta(m: SvJewMatch): string {
  if (!m.meta) return m.key;
  const parts = Object.entries(m.meta).map(([k, v]) => `${k}=${String(v)}`);
  return `${m.key}(${parts.join(',')})`;
}

function yearTable(il: boolean): string {
  const lines: string[] = [];
  const end = new HDate(1, months.TISHREI, YEAR + 1).abs();
  for (let hd = new HDate(1, months.TISHREI, YEAR); hd.abs() < end; hd = hd.next()) {
    const matches = getSvJewMatches(hd, { il, showErev: true });
    if (!matches.length) continue;
    const g = hd.greg();
    const iso = `${g.getFullYear()}-${String(g.getMonth() + 1).padStart(2, '0')}-${String(g.getDate()).padStart(2, '0')}`;
    const events = matches.map((m) => m.event?.getDesc()).filter(Boolean);
    lines.push(
      `${iso} ${hd.toString().padEnd(18)} ${matches.map(fmtMeta).join(' ').padEnd(44)} ${events.join(' | ')}`,
    );
  }
  return lines.join('\n') + '\n';
}

describe(`full-year snapshot ${YEAR}`, () => {
  it('Israel', async () => {
    await expect(yearTable(true)).toMatchFileSnapshot(`__snapshots__/year-${YEAR}-il.txt`);
  });
  it('diaspora', async () => {
    await expect(yearTable(false)).toMatchFileSnapshot(`__snapshots__/year-${YEAR}-diaspora.txt`);
  });
});
