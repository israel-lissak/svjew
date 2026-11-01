// Maintenance tool: lists every distinct event description @hebcal/core produces
// for a wide range of Hebrew years (Israel + diaspora). Run it after upgrading
// hebcal and compare against the EXACT/PATTERNS tables in src/core/mapping.ts.
//
//   npm run hebcal:descriptions
import { HDate, HebrewCalendar, months } from '@hebcal/core';

const FIRST_YEAR = 5760;
const LAST_YEAR = 5830;

const seen = new Set();
for (let year = FIRST_YEAR; year <= LAST_YEAR; year++) {
  const end = new HDate(1, months.TISHREI, year + 1).abs();
  for (const il of [true, false]) {
    for (let hd = new HDate(1, months.TISHREI, year); hd.abs() < end; hd = hd.next()) {
      for (const ev of HebrewCalendar.getHolidaysOnDate(hd, il) ?? []) {
        seen.add(ev.getDesc().replace(/\d{4}$/, 'NNNN'));
      }
    }
  }
}
console.log([...seen].sort().join('\n'));
