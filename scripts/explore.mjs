import { HDate, HebrewCalendar, flags } from '@hebcal/core';
const year = Number(process.argv[2] ?? 5787);
const names = Object.entries(flags);
const fl = (m) => names.filter(([, v]) => m & v).map(([k]) => k).join('|');
const descs = new Map();
for (const il of [true, false]) {
  let hd = new HDate(1, 7, year); // 1 Tishrei
  const end = new HDate(1, 7, year + 1);
  while (hd.abs() < end.abs()) {
    for (const ev of HebrewCalendar.getHolidaysOnDate(hd, il) ?? []) {
      const k = ev.getDesc();
      const e = descs.get(k) ?? { flags: fl(ev.getFlags()), il: 0, chul: 0, cls: ev.constructor.name, extra: '' };
      il ? e.il++ : e.chul++;
      if (ev.chanukahDay !== undefined) e.extra = 'chanukahDay';
      if (ev.cholHaMoedDay !== undefined) e.extra = 'cholHaMoedDay';
      descs.set(k, e);
    }
    hd = hd.next();
  }
}
for (const [k, e] of descs) console.log(`${k.padEnd(28)} ${e.cls.padEnd(18)} il=${e.il} chul=${e.chul} ${e.flags} ${e.extra}`);
