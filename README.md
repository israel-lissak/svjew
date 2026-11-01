# svjew

React SVG icons for Hebrew calendar days.

Give it a date and it renders an icon for every Jewish holiday or special day on that date: Shabbat, festivals, Chanukah (with the right number of candles), Rosh Chodesh, fasts and more. On an ordinary day it renders nothing. When days overlap (Shabbat during Chanukah, say), you get all of the icons, in priority order.

```tsx
import { SvJew } from 'svjew';

<SvJew />; // today's icons, or nothing
```

- **Accurate.** Holiday data comes from [`@hebcal/core`](https://github.com/hebcal/hebcal-es6), including both the Israel and diaspora schedules.
- **Accessible.** Every icon has a Hebrew `<title>`, and the wrapper has `role="img"` with a combined `aria-label`.
- **Themeable.** Icons are original 24×24 line drawings in `currentColor`.
- **Small.** Icons tree-shake individually, and the logic is also available without React (`svjew/core`).
- **Typed.** Written in TypeScript (strict), and ships ESM and CommonJS.

## Install

```sh
npm install svjew
```

Requires `react` ≥ 17 (peer dependency). For server-side use, Node ≥ 18.

## Usage

### `<SvJew />`

```tsx
import { SvJew } from 'svjew';

// A specific date, diaspora schedule, larger icons
<SvJew date={new Date(2026, 11, 12)} il={false} size={32} />

// Overlapping "stack" layout (RTL-safe), custom color
<SvJew layout="stack" color="#1d4ed8" />

// Something to show on ordinary days
<SvJew fallback={<span>—</span>} />

// Only some kinds of days, at most one icon, Shabbat first
<SvJew include={['shabbat', 'chanukah', 'roshChodesh']} priority={['shabbat']} max={1} />

// The day starts at sunset (Friday evening counts as Shabbat)
<SvJew location={{ lat: 31.778, lng: 35.235 }} />

// Full control over each item
<SvJew
  renderItem={(match, Icon) => (
    <a href={`/holidays/${match.key}`} title={match.event?.getDesc()}>
      <Icon size={20} meta={match.meta} />
    </a>
  )}
/>
```

When there are no matches, `<SvJew>` renders `fallback` (default `null`) with no wrapper element. Otherwise it renders an inline-flex `<span role="img">` whose `aria-label` joins the Hebrew titles of all the icons, for example `"חנוכה – נר שלישי, שבת"`.

### `useSvJew()`

```tsx
import { useSvJew } from 'svjew';

function DayBadge({ date }: { date: Date }) {
  const matches = useSvJew({ date, il: true });
  return matches.length ? <span>{matches.map((m) => m.key).join(', ')}</span> : null;
}
```

The hook memoizes by option _values_, so inline arrays such as `include={['shabbat']}` don't trigger recomputation.

### Without React

`svjew/core` has the same logic with no React import. Its functions are pure and SSR-safe.

```ts
import { getSvJewMatches, getSvJewKey } from 'svjew/core';
import { HDate } from '@hebcal/core';

getSvJewMatches(new HDate(25, 'Kislev', 5787));
// [
//   { key: 'chanukah', meta: { night: 1, day: 1 }, event: ChanukahEvent },
//   { key: 'shabbat' },
// ]

getSvJewKey(new Date(), { il: false }); // 'shabbat' | 'pesach' | … | null
```

Both functions take either `(date, options)` or a single options object: `getSvJewMatches({ date, il: false })`.

### Individual icons

```tsx
import { ShabbatIcon, ChanukahIcon } from 'svjew';

<ShabbatIcon size={20} />
<ChanukahIcon meta={{ night: 3 }} color="goldenrod" /> // 3 candles + shamash
```

Icon components accept `size` (default `24`), `color` (default `'currentColor'`), `meta`, `title` (replaces the Hebrew title), and any other SVG attribute. Importing a single icon bundles only that icon. All icons are also available through the `SvJewIcons` registry (`Record<SvJewKey, IconComponent>`).

## Options

These options are accepted by `<SvJew>`, `useSvJew`, `getSvJewMatches` and `getSvJewKey`:

| Option     | Type            | Default | Description                                                                  |
| ---------- | --------------- | ------- | ---------------------------------------------------------------------------- |
| `date`     | `Date \| HDate` | now     | Date to inspect                                                              |
| `il`       | `boolean`       | `true`  | Israel (`true`) or diaspora (`false`) holiday schedule                       |
| `include`  | `SvJewKey[]`    | all     | Only return these keys                                                       |
| `exclude`  | `SvJewKey[]`    | none    | Never return these keys                                                      |
| `priority` | `SvJewKey[]`    | default | Ordering only (does not filter). Unlisted keys follow in the default order   |
| `max`      | `number`        | ∞       | Maximum number of matches                                                    |
| `showErev` | `boolean`       | `false` | Include Erev days (Erev Pesach, Erev Yom Kippur, the first Chanukah candle…) |
| `location` | `{ lat, lng }`  | none    | Change the day at local sunset instead of midnight                           |

Additional `<SvJew>` props:

| Prop         | Type                           | Default          |
| ------------ | ------------------------------ | ---------------- |
| `size`       | `number \| string`             | `24`             |
| `color`      | `string`                       | `'currentColor'` |
| `layout`     | `'row' \| 'column' \| 'stack'` | `'row'`          |
| `gap`        | `number \| string`             | `4`              |
| `renderItem` | `(match, Icon) => ReactNode`   | none             |
| `fallback`   | `ReactNode`                    | `null`           |
| `className`  | `string`                       | none             |
| `style`      | `CSSProperties`                | none             |

### Matches

```ts
interface SvJewMatch {
  key: SvJewKey;
  meta?: {
    night?: number; // Chanukah: candles lit (1–8)
    day?: number; // day within a multi-day festival
    erev?: boolean; // only returned with showErev
  };
  event?: Event; // the original @hebcal/core event (absent for Shabbat)
}
```

## Keys and icons

Listed in the default priority order:

| Key            | Icon                  | Covers                                                                                 |
| -------------- | --------------------- | -------------------------------------------------------------------------------------- |
| `yomKippur`    | shofar                | Yom Kippur                                                                             |
| `roshHashana`  | shofar with sound     | both days (`meta.day` 1–2)                                                             |
| `pesach`       | matzah                | all days incl. Chol HaMoed (`meta.day` 1–7, or 1–8 in the diaspora)                    |
| `sukkot`       | four species          | all days incl. Chol HaMoed and Hoshana Raba (`meta.day` 1–7)                           |
| `simchatTorah` | Torah scroll          | Shmini Atzeret / Simchat Torah (one day in Israel, two in the diaspora)                |
| `shavuot`      | Torah scroll + flower | one day in Israel, two in the diaspora                                                 |
| `chanukah`     | chanukiah             | all 8 days; `meta.night` 1–8 lights that many candles                                  |
| `purim`        | mask                  | Purim, Shushan Purim, Purim Meshulash                                                  |
| `shabbat`      | candles + challah     | every Saturday                                                                         |
| `roshChodesh`  | crescent moon         | every Rosh Chodesh day                                                                 |
| `tuBishvat`    | tree with fruit       | Tu BiShvat                                                                             |
| `lagBaomer`    | bonfire               | Lag BaOmer                                                                             |
| `yomHaatzmaut` | flag                  | Yom HaAtzma'ut (on its observed date)                                                  |
| `fastDay`      | plate / clock         | Tzom Gedaliah, Asara B'Tevet, Ta'anit Esther, Ta'anit Bechorot, 17 Tammuz, Tish'a B'Av |

- Matches are **deduplicated by key**: Pesach I and Pesach II on the same day produce one matzah.
- **Chanukah nights:** the Hebrew day 25 Kislev begins with the first candle the evening before, so it has `meta.night: 1`. With `showErev`, 24 Kislev (the evening of the first candle) is returned as `{ night: 1, erev: true }`.
- Erev matches have `meta.erev: true`, and their titles are prefixed with "ערב".
- Not included: Pesach Sheni, Purim Katan, Rosh Hashana LaBehemot, modern memorial days, and the customary Yom Kippur Katan and BeHaB fasts.

## Day boundary

Without `location`, the date is read in the runtime's local time zone and the day changes at **midnight**.

With `location`, sunset for that date is computed with hebcal's `Zmanim`, and from sunset onward the **next Hebrew day** applies: Friday after sunset is Shabbat, and Erev Pesach after sunset is Pesach. `location` is ignored when `date` is an `HDate`, because an `HDate` has no time of day.

**SSR:** when `date` is omitted, the server and the browser each use their own "now" and time zone, which can cause a hydration mismatch near midnight or sunset. For server-rendered pages, pass an explicit `date`. Note also that `useSvJew` and `<SvJew>` without a `date` re-evaluate "today" only when the component re-renders; they don't set a timer.

## Icon data

The icons are plain data, so you can draw them with any SVG renderer:

```ts
import { iconData, resolveIcon } from 'svjew/icons';

const { viewBox, title, paths } = resolveIcon(iconData.chanukah, { night: 5 });
// viewBox: '0 0 24 24'
// title:   'חנוכה – נר חמישי'
// paths:   Array<{ d, fill?, stroke?, strokeWidth?, opacity? }>
```

Paths are drawn with `fill="none"`, `stroke="currentColor"`, `stroke-width="1.5"` and round caps/joins, unless a path overrides them. `createIcon(definition)` turns your own icon data into a component that behaves like the built-in ones.

## Entry points

| Import        | Contents                                                      |
| ------------- | ------------------------------------------------------------- |
| `svjew`       | everything: core functions, icon data, React components       |
| `svjew/core`  | `getSvJewMatches`, `getSvJewKey`, constants, types (no React) |
| `svjew/icons` | icon data and `resolveIcon` (no React)                        |

The ESM build depends on `@hebcal/core`. That package is ESM-only, so the CommonJS build bundles its own copy of it. Prefer ESM where you can.

## Development

```sh
npm install
npm test                    # vitest (unit, component and full-year snapshot tests)
npm run lint                # eslint
npm run typecheck           # tsc
npm run build               # tsup → dist/
npm run demo                # Vite playground: every day of a Hebrew year
npm run hebcal:descriptions # list every event name hebcal emits
```

Test dates are always derived from Hebrew dates through hebcal, never hard-coded Gregorian dates. After upgrading `@hebcal/core`:

1. Run `npm run hebcal:descriptions` and compare the output with the mapping in `src/core/mapping.ts`.
2. Review any changes to the full-year snapshots in `test/__snapshots__/`.

## License

[MIT](./LICENSE)
