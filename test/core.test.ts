import { flags, GeoLocation, HebrewCalendar, Zmanim } from '@hebcal/core';
import { describe, expect, it } from 'vitest';
import { getSvJewKey, getSvJewMatches, SVJEW_KEYS, type SvJewKey } from '../src/core';
import { findDay, findInYears, greg, HDate, isSaturday, keys, months, range } from './helpers';

const { TISHREI, CHESHVAN, KISLEV, TEVET, NISAN, SIVAN } = months;

describe('ordinary days', () => {
  it('ordinary weekday → []', () => {
    const hd = findDay(new HDate(8, CHESHVAN, 5787), 10, (d) => !isSaturday(d));
    expect(getSvJewMatches(hd.greg())).toEqual([]);
    expect(getSvJewKey(hd.greg())).toBeNull();
  });

  it('ignores hebcal events that have no icon (Yom HaShoah, Pesach Sheni, Purim Katan…)', () => {
    // [hebcal description, svjew key it must NOT be confused with]
    const lookAlikes: Array<[string, SvJewKey | null]> = [
      ['Yom HaShoah', null],
      ['Pesach Sheni', 'pesach'],
      ['Purim Katan', 'purim'],
      ['Shushan Purim Katan', 'purim'],
      ['Rosh Hashana LaBehemot', 'roshHashana'], // 1 Elul, which *is* Rosh Chodesh
      ["Yom Kippur Katan Sh'vat", 'yomKippur'],
    ];
    for (const [desc, notKey] of lookAlikes) {
      const hd = findInYears(
        range(5784, 5800),
        (y) => ({ from: new HDate(1, TISHREI, y), span: 385 }),
        (d) =>
          !isSaturday(d) &&
          (HebrewCalendar.getHolidaysOnDate(d, true) ?? []).some((e) => e.getDesc() === desc),
      );
      const k = keys(hd);
      if (notKey) expect(k, desc).not.toContain(notKey);
      else expect(k, desc).toEqual([]);
    }
  });

  it('skips customary Yom Kippur Katan and BeHaB fasts', () => {
    for (const flag of [flags.YOM_KIPPUR_KATAN, flags.BEHAB]) {
      const hd = findDay(new HDate(1, CHESHVAN, 5787), 300, (d) =>
        (HebrewCalendar.getHolidaysOnDate(d, true) ?? []).some(
          (e) => e.getFlags() & flag && !(e.getFlags() & flags.ROSH_CHODESH),
        ),
      );
      expect(keys(hd)).not.toContain('fastDay');
    }
  });
});

describe('Shabbat', () => {
  it('plain Shabbat → [shabbat] (no event attached)', () => {
    const hd = findDay(new HDate(8, CHESHVAN, 5787), 10, isSaturday);
    const m = getSvJewMatches(hd.greg());
    expect(m).toEqual([{ key: 'shabbat' }]);
  });

  it('accepts HDate as well as Date, and options object form', () => {
    const hd = findDay(new HDate(8, CHESHVAN, 5787), 10, isSaturday);
    expect(keys(hd)).toEqual(['shabbat']);
    expect(getSvJewMatches({ date: hd }).map((m) => m.key)).toEqual(['shabbat']);
  });
});

describe('High Holidays', () => {
  it('Rosh Hashana day 1 (weekday year) → [roshHashana] with day 1', () => {
    const hd = new HDate(1, TISHREI, 5786);
    expect(isSaturday(hd)).toBe(false);
    const m = getSvJewMatches(hd.greg());
    expect(m.map((x) => x.key)).toEqual(['roshHashana']);
    expect(m[0]!.meta).toEqual({ day: 1 });
    expect(m[0]!.event?.getDesc()).toBe('Rosh Hashana 5786');
  });

  it('Rosh Hashana day 2', () => {
    const m = getSvJewMatches(greg(2, TISHREI, 5786));
    expect(m[0]).toMatchObject({ key: 'roshHashana', meta: { day: 2 } });
  });

  it('Rosh Hashana on Shabbat → [roshHashana, shabbat]', () => {
    const hd = findInYears(
      range(5780, 5800),
      (y) => ({ from: new HDate(1, TISHREI, y), span: 1 }),
      isSaturday,
    );
    expect(keys(hd)).toEqual(['roshHashana', 'shabbat']);
  });

  it('Yom Kippur → [yomKippur], not also fastDay', () => {
    const hd = new HDate(10, TISHREI, 5786);
    expect(isSaturday(hd)).toBe(false);
    expect(keys(hd)).toEqual(['yomKippur']);
  });
});

describe('Chanukah', () => {
  it('Shabbat during Chanukah → [chanukah, shabbat] with correct meta.night', () => {
    const start = new HDate(25, KISLEV, 5787);
    const hd = findDay(start, 8, (d) => isSaturday(d) && d.getDate() !== 30 && d.getDate() !== 1);
    const night = hd.deltaDays(start) + 1;
    const m = getSvJewMatches(hd.greg());
    expect(m.map((x) => x.key)).toEqual(['chanukah', 'shabbat']);
    expect(m[0]!.meta).toEqual({ night, day: night });
  });

  it('every day of Chanukah has nights 1..8 in order', () => {
    const start = new HDate(25, KISLEV, 5787);
    const nights = range(0, 7).map(
      (i) => getSvJewMatches(start.add(i)).find((m) => m.key === 'chanukah')?.meta?.night,
    );
    expect(nights).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(keys(start.add(8))).not.toContain('chanukah');
  });

  it('Rosh Chodesh Tevet during Chanukah → chanukah + roshChodesh', () => {
    const hd = new HDate(1, TEVET, 5787);
    const m = getSvJewMatches(hd);
    const expected: SvJewKey[] = isSaturday(hd)
      ? ['chanukah', 'shabbat', 'roshChodesh']
      : ['chanukah', 'roshChodesh'];
    expect(m.map((x) => x.key)).toEqual(expected);
    expect(m[0]!.meta?.night).toBe(hd.deltaDays(new HDate(25, KISLEV, 5787)) + 1);
  });

  it('Erev Chanukah (24 Kislev) shows night 1 only with showErev', () => {
    const hd = new HDate(24, KISLEV, 5787);
    expect(keys(hd)).not.toContain('chanukah');
    const m = getSvJewMatches(hd, { showErev: true }).find((x) => x.key === 'chanukah');
    expect(m?.meta).toEqual({ night: 1, erev: true });
  });
});

describe('Sukkot & Simchat Torah', () => {
  it('Shabbat Chol HaMoed Sukkot → [sukkot, shabbat]', () => {
    const hd = findInYears(
      range(5780, 5800),
      (y) => ({ from: new HDate(17, TISHREI, y), span: 4 }),
      isSaturday,
    );
    for (const il of [true, false]) {
      const m = getSvJewMatches(hd, { il });
      expect(m.map((x) => x.key)).toEqual(['sukkot', 'shabbat']);
      expect(m[0]!.event!.getFlags() & flags.CHOL_HAMOED).toBeTruthy();
      expect(m[0]!.meta?.day).toBe(hd.getDate() - 14);
    }
  });

  it('Simchat Torah differs between Israel and diaspora', () => {
    const year = findInYears(
      range(5786, 5800),
      (y) => ({ from: new HDate(22, TISHREI, y), span: 1 }),
      (d) => !isSaturday(d) && !isSaturday(d.next()),
    ).getFullYear();
    const d22 = new HDate(22, TISHREI, year);
    const d23 = new HDate(23, TISHREI, year);
    // Israel: Shmini Atzeret and Simchat Torah are the same day (22 Tishrei).
    expect(keys(d22, { il: true })).toEqual(['simchatTorah']);
    expect(keys(d23, { il: true })).toEqual([]);
    // Diaspora: Shmini Atzeret on 22, Simchat Torah on 23.
    expect(keys(d23, { il: false })).toEqual(['simchatTorah']);
    expect(getSvJewMatches(d23, { il: false })[0]!.event!.getDesc()).toBe('Simchat Torah');
  });

  it('8th day of Pesach only in the diaspora', () => {
    const hd = findInYears(
      range(5786, 5800),
      (y) => ({ from: new HDate(22, NISAN, y), span: 1 }),
      (d) => !isSaturday(d),
    );
    expect(keys(hd, { il: true })).toEqual([]);
    const m = getSvJewMatches(hd, { il: false });
    expect(m.map((x) => x.key)).toEqual(['pesach']);
    expect(m[0]!.meta).toEqual({ day: 8 });
  });

  it('dedupes Pesach I + Pesach II (both days are a single matzah)', () => {
    for (const il of [true, false]) {
      for (const day of [15, 16]) {
        expect(
          keys(new HDate(day, NISAN, 5787), { il }).filter((k) => k === 'pesach'),
        ).toHaveLength(1);
      }
    }
  });
});

describe('options', () => {
  // A Shabbat during Chanukah which is not Rosh Chodesh: [chanukah, shabbat]
  const hd = findDay(
    new HDate(25, KISLEV, 5787),
    8,
    (d) => isSaturday(d) && d.getDate() > 1 && d.getDate() < 30,
  );

  it('include', () => {
    expect(keys(hd, { include: ['shabbat'] })).toEqual(['shabbat']);
    expect(keys(hd, { include: ['purim'] })).toEqual([]);
  });

  it('exclude', () => {
    expect(keys(hd, { exclude: ['chanukah'] })).toEqual(['shabbat']);
  });

  it('priority reorders but does not filter', () => {
    expect(keys(hd, { priority: ['shabbat'] })).toEqual(['shabbat', 'chanukah']);
    expect(keys(hd, { priority: ['purim'] })).toEqual(['chanukah', 'shabbat']);
    expect(getSvJewKey(hd, { priority: ['shabbat'] })).toBe('shabbat');
  });

  it('max', () => {
    expect(keys(hd, { max: 1 })).toEqual(['chanukah']);
    expect(keys(hd, { max: 0 })).toEqual([]);
    expect(keys(hd, { max: 10 })).toEqual(['chanukah', 'shabbat']);
  });

  it('include + exclude + priority + max compose', () => {
    expect(
      keys(hd, {
        include: ['chanukah', 'shabbat'],
        exclude: ['purim'],
        priority: ['shabbat'],
        max: 1,
      }),
    ).toEqual(['shabbat']);
  });

  it('showErev', () => {
    const erevYK = new HDate(9, TISHREI, 5786);
    expect(isSaturday(erevYK)).toBe(false);
    expect(keys(erevYK)).toEqual([]);
    const m = getSvJewMatches(erevYK, { showErev: true });
    expect(m).toHaveLength(1);
    expect(m[0]).toMatchObject({ key: 'yomKippur', meta: { erev: true } });

    const erevShavuot = new HDate(5, SIVAN, 5787);
    expect(keys(erevShavuot, { showErev: true })).toContain('shavuot');
    expect(keys(erevShavuot)).not.toContain('shavuot');

    // Erev Pesach coincides with Ta'anit Bechorot (unless moved for Shabbat)
    const erevPesach = findInYears(
      range(5786, 5800),
      (y) => ({ from: new HDate(14, NISAN, y), span: 1 }),
      (d) => !isSaturday(d) && d.getDay() !== 5,
    );
    expect(keys(erevPesach)).toEqual(['fastDay']);
    expect(keys(erevPesach, { showErev: true })).toEqual(['pesach', 'fastDay']);
  });
});

describe('location (day changes at sunset)', () => {
  const jerusalem = { lat: 31.778, lng: 35.235 };
  const friday = findDay(new HDate(8, CHESHVAN, 5787), 10, (d) => d.getDay() === 5);
  const civil = friday.greg();
  const sunset = new Zmanim(
    new GeoLocation(null, jerusalem.lat, jerusalem.lng, 0, 'Asia/Jerusalem'),
    civil,
    false,
  ).sunset();
  const HOUR = 3600_000;

  it('Friday 1 hour after sunset → includes shabbat', () => {
    const when = new Date(sunset.getTime() + HOUR);
    expect(keys(when, { location: jerusalem })).toContain('shabbat');
  });

  it('Friday 1 hour before sunset → not shabbat', () => {
    const when = new Date(sunset.getTime() - HOUR);
    expect(keys(when, { location: jerusalem })).not.toContain('shabbat');
  });

  it('without location the boundary is midnight', () => {
    const late = new Date(civil.getFullYear(), civil.getMonth(), civil.getDate(), 23, 30);
    expect(keys(late)).not.toContain('shabbat');
    const sat = new Date(civil.getFullYear(), civil.getMonth(), civil.getDate() + 1, 0, 30);
    expect(keys(sat)).toContain('shabbat');
  });

  it('Erev Pesach after sunset is Pesach', () => {
    const erev = new HDate(14, NISAN, 5787).greg();
    const ss = new Zmanim(
      new GeoLocation(null, jerusalem.lat, jerusalem.lng, 0, 'Asia/Jerusalem'),
      erev,
      false,
    ).sunset();
    expect(keys(new Date(ss.getTime() + HOUR), { location: jerusalem })).toContain('pesach');
  });
});

describe('invariants across many years', () => {
  const countDays = (year: number, il: boolean) => {
    const counts = Object.fromEntries(SVJEW_KEYS.map((k) => [k, 0])) as Record<SvJewKey, number>;
    const end = new HDate(1, TISHREI, year + 1).abs();
    for (let hd = new HDate(1, TISHREI, year); hd.abs() < end; hd = hd.next()) {
      for (const m of getSvJewMatches(hd, { il })) counts[m.key]++;
    }
    return counts;
  };

  it.each(range(5780, 5800))('year %i has the expected number of days per key', (year) => {
    const il = countDays(year, true);
    const chul = countDays(year, false);
    for (const [c, isIL] of [
      [il, true],
      [chul, false],
    ] as const) {
      expect(c.roshHashana).toBe(2);
      expect(c.yomKippur).toBe(1);
      expect(c.sukkot).toBe(7);
      expect(c.simchatTorah).toBe(isIL ? 1 : 2);
      expect(c.chanukah).toBe(8);
      expect(c.tuBishvat).toBe(1);
      expect(c.pesach).toBe(isIL ? 7 : 8);
      expect(c.lagBaomer).toBe(1);
      expect(c.shavuot).toBe(isIL ? 1 : 2);
      expect(c.yomHaatzmaut).toBe(1);
      // Tzom Gedaliah, Asara B'Tevet, Ta'anit Esther, Ta'anit Bechorot, 17 Tammuz, 9 Av
      expect(c.fastDay).toBe(6);
      expect(c.purim).toBeGreaterThanOrEqual(2);
      expect(c.purim).toBeLessThanOrEqual(3);
      expect(c.shabbat).toBeGreaterThanOrEqual(50);
      expect(c.roshChodesh).toBeGreaterThanOrEqual(14);
    }
  });
});
