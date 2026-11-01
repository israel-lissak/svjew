# svjew

React SVG icons for Hebrew calendar days. Give it a date and it renders an icon for every Jewish holiday or special day on that date: Shabbat, festivals, Chanukah (with the right number of candles), Rosh Chodesh, fasts and more. On an ordinary day it renders nothing.

Holiday data comes from [`@hebcal/core`](https://github.com/hebcal/hebcal-es6).

```tsx
import { SvJew } from 'svjew';

<SvJew />; // today's icons, or nothing
```

## Install

```sh
npm install svjew
```

`react` (≥17) is a peer dependency.

## Usage

### Component

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

// Day starts at sunset (Friday evening counts as Shabbat)
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

When there are no matches, `<SvJew>` renders `fallback` (default `null`) without any wrapper element. Otherwise it renders an inline-flex `<span role="img">` whose `aria-label` joins the Hebrew titles of every icon, for example `"חנוכה – נר שלישי, שבת"`.

### Hook

```tsx
import { useSvJew } from 'svjew';

function DayBadge({ date }: { date: Date }) {
  const matches = useSvJew({ date, il: true });
  return matches.length ? <span>{matches.map((m) => m.key).join(', ')}</span> : null;
}
```

The hook memoizes by option _values_, so inline arrays like `include={['shabbat']}` don't trigger recomputation.

### Pure functions (no React, SSR-safe)

```ts
import { getSvJewMatches, getSvJewKey } from 'svjew/core';
import { HDate } from '@hebcal/core';

getSvJewMatches(new HDate(25, 'Kislev', 5787));
// [{ key: 'chanukah', meta: { night: 1, day: 1 }, event: ChanukahEvent }, { key: 'shabbat' }]

getSvJewKey(new Date(), { il: false }); // 'shabbat' | 'pesach' | ... | null
```

Both functions accept either `(date, options)` or a single options object: `getSvJewMatches({ date, il: false })`.

### Individual icons

```tsx
import { ShabbatIcon, ChanukahIcon } from 'svjew';

<ShabbatIcon size={20} />
<ChanukahIcon meta={{ night: 3 }} color="goldenrod" />  // 3 candles + shamash
```

Each icon is its own module, so importing one icon bundles only that icon. All of them are also available as a registry, `SvJewIcons` (`Record<SvJewKey, IconComponent>`).

Icon components accept `size` (default `24`), `color` (default `currentColor`), `meta`, `title` (overrides the Hebrew title), and any other SVG prop.

## Options

| Option     | Type            | Default | Description                                                                |
| ---------- | --------------- | ------- | -------------------------------------------------------------------------- |
| `date`     | `Date \| HDate` | now     | Date to inspect                                                            |
| `il`       | `boolean`       | `true`  | Israel (`true`) or diaspora (`false`) holiday schedule                     |
| `include`  | `SvJewKey[]`    | all     | Only return these keys                                                     |
| `exclude`  | `SvJewKey[]`    | none    | Never return these keys                                                    |
| `priority` | `SvJewKey[]`    | default | Ordering only (does not filter). Unlisted keys follow in the default order |
| `max`      | `number`        | ∞       | Maximum number of matches                                                  |
| `showErev` | `boolean`       | `false` | Include Erev days (Erev Pesach, Erev Yom Kippur, first Chanukah candle…)   |
| `location` | `{ lat, lng }`  | none    | Day changes at local sunset instead of midnight                            |

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

## Keys and icons

Default priority order (top = first):

| Key            | Icon                  | Covers                                                                                 |
| -------------- | --------------------- | -------------------------------------------------------------------------------------- |
| `yomKippur`    | shofar                | Yom Kippur                                                                             |
| `roshHashana`  | shofar with sound     | both days (`meta.day` 1–2)                                                             |
| `pesach`       | matzah                | all days incl. Chol HaMoed (`meta.day` 1–7 / 1–8 in the diaspora)                      |
| `sukkot`       | four species          | all days incl. Chol HaMoed and Hoshana Raba (`meta.day` 1–7)                           |
| `simchatTorah` | Torah scroll          | Shmini Atzeret / Simchat Torah (one day in Israel, two in the diaspora)                |
| `shavuot`      | Torah scroll + flower | one day in Israel, two in the diaspora                                                 |
| `chanukah`     | chanukiah             | 8 days; `meta.night` 1–8 lights that many candles                                      |
| `purim`        | mask                  | Purim, Shushan Purim, Purim Meshulash                                                  |
| `shabbat`      | candles + challah     | every Saturday                                                                         |
| `roshChodesh`  | crescent moon         | every Rosh Chodesh day                                                                 |
| `tuBishvat`    | tree with fruit       | Tu BiShvat                                                                             |
| `lagBaomer`    | bonfire               | Lag BaOmer                                                                             |
| `yomHaatzmaut` | flag                  | Yom HaAtzma'ut (on its observed date)                                                  |
| `fastDay`      | plate / clock         | Tzom Gedaliah, Asara B'Tevet, Ta'anit Esther, Ta'anit Bechorot, 17 Tammuz, Tish'a B'Av |

Notes:

- Results are **deduplicated by key**: Pesach I and Pesach II on the same day give one matzah.
- **Chanukah nights.** The Hebrew day 25 Kislev began with the first candle the evening before, so it has `meta.night: 1`. With `showErev`, 24 Kislev (the evening the first candle is lit) is returned as `{ night: 1, erev: true }`.
- Erev matches have `meta.erev: true`, and their titles are prefixed with "ערב".
- Not included: Pesach Sheni, Purim Katan, Rosh Hashana LaBehemot, modern memorial days, and the customary Yom Kippur Katan and BeHaB fasts.

## Day boundary

Without `location`, the date is taken in the runtime's local time zone and the day changes at **midnight**. With `location`, the sunset for that civil date is computed via hebcal's `Zmanim`, and from sunset onward the **next Hebrew day** applies. So Friday after sunset is Shabbat and Erev Pesach after sunset is Pesach. Times are interpreted in the runtime's local time zone. `location` is ignored when `date` is an `HDate`, because an `HDate` has no time of day.

## Icon data

Icons are stored as renderer-agnostic data, which makes them reusable outside React:

```ts
import { iconData, resolveIcon } from 'svjew/icons';

const { viewBox, title, paths } = resolveIcon(iconData.chanukah, { night: 5 });
// paths: Array<{ d, fill?, stroke?, strokeWidth?, opacity? }>
```

All icons are original line drawings on a 24×24 grid with a 1.5px round stroke in `currentColor`.

## Entry points

| Import         | Contents                                           |
| -------------- | -------------------------------------------------- |
| `svjew`        | everything (core + icon data + React components)   |
| `svjew/core`   | `getSvJewMatches`, `getSvJewKey`, types (no React) |
| `svjew/icons`  | icon data (no React)                               |
| `svjew/native` | reserved for React Native (phase 2)                |

Both ESM and CommonJS builds ship. `@hebcal/core` is ESM-only, so the CommonJS build bundles its own copy. Use ESM where you can.

## Development

```sh
npm test          # vitest
npm run lint      # eslint
npm run typecheck
npm run build     # tsup → dist/
npm run demo      # Vite playground: every day of a Hebrew year
```

Test dates are always computed from Hebrew dates through hebcal, never hard-coded Gregorian dates. `test/__snapshots__/` contains full-year snapshots (Israel and diaspora) that are worth reviewing whenever you upgrade `@hebcal/core`.

## License

MIT
