import { HDate, HebrewCalendar } from '@hebcal/core';
const seen = new Map();
for (let y = 5760; y <= 5830; y++) for (const il of [true, false]) {
  let hd = new HDate(1, 7, y); const end = new HDate(1, 7, y + 1);
  for (; hd.abs() < end.abs(); hd = hd.next())
    for (const ev of HebrewCalendar.getHolidaysOnDate(hd, il) ?? []) {
      const d = ev.getDesc().replace(/\d{4}$/, 'NNNN');
      if (!seen.has(d)) seen.set(d, `${y} ${hd.toString()} il=${il}`);
    }
}
console.log([...seen.keys()].sort().join('\n'));
const k = new HDate(24, 9, 5787);
for (let i = 0; i < 10; i++) { const h = k.add(i); for (const ev of HebrewCalendar.getHolidaysOnDate(h, true) ?? []) if (ev.chanukahDay !== undefined || /Chanukah/.test(ev.getDesc())) console.log(h.toString(), ev.getDesc(), ev.chanukahDay); }
