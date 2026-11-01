import { HDate } from '@hebcal/core';
import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { getSvJewMatches, SVJEW_KEYS, SvJew, SvJewIcons, type SvJewProps } from '../src';

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
type Layout = NonNullable<SvJewProps['layout']>;

function monthsOfYear(year: number): HDate[][] {
  const months: HDate[][] = [];
  const end = new HDate(1, 7, year + 1).abs();
  for (let hd = new HDate(1, 7, year); hd.abs() < end; hd = hd.next()) {
    if (hd.getDate() === 1) months.push([]);
    months[months.length - 1]!.push(hd);
  }
  return months;
}

function Day({
  hd,
  il,
  showErev,
  layout,
}: {
  hd: HDate;
  il: boolean;
  showErev: boolean;
  layout: Layout;
}) {
  const matches = getSvJewMatches(hd, { il, showErev });
  const g = hd.greg();
  return (
    <div
      className={`day${matches.length ? ' hit' : ''}`}
      title={matches.map((m) => m.event?.getDesc() ?? m.key).join(', ')}
    >
      <div className="d">
        <span dir="rtl">{hd.renderGematriya(true, true).split(' ')[0]}</span>
        <span className="g">
          {g.getDate()}/{g.getMonth() + 1}
        </span>
      </div>
      <div className="icons">
        <SvJew date={hd} il={il} showErev={showErev} layout={layout} size={22} />
      </div>
      <div className="names">{matches.map((m) => m.key).join(' · ')}</div>
    </div>
  );
}

function App() {
  const [year, setYear] = useState(() => new HDate().getFullYear());
  const [il, setIl] = useState(true);
  const [showErev, setShowErev] = useState(false);
  const [layout, setLayout] = useState<Layout>('row');
  const months = useMemo(() => monthsOfYear(year), [year]);

  return (
    <main>
      <h1>svjew playground</h1>
      <p className="sub">
        Every day of Hebrew year {year}. Today:{' '}
        <SvJew il={il} showErev={showErev} layout={layout} fallback={<em>an ordinary day</em>} />
      </p>

      <div className="controls">
        <label>
          Year
          <button onClick={() => setYear((y) => y - 1)}>‹</button>
          <strong>{year}</strong>
          <button onClick={() => setYear((y) => y + 1)}>›</button>
        </label>
        <label>
          <input type="checkbox" checked={il} onChange={(e) => setIl(e.target.checked)} /> Israel
          (il)
        </label>
        <label>
          <input
            type="checkbox"
            checked={showErev}
            onChange={(e) => setShowErev(e.target.checked)}
          />{' '}
          showErev
        </label>
        <label>
          Layout
          <select value={layout} onChange={(e) => setLayout(e.target.value as Layout)}>
            <option value="row">row</option>
            <option value="column">column</option>
            <option value="stack">stack</option>
          </select>
        </label>
      </div>

      <section className="legend">
        {SVJEW_KEYS.map((k) => {
          const Icon = SvJewIcons[k];
          return (
            <div key={k}>
              <Icon size={28} />
              <small>
                {k}
                <br />
                <span dir="rtl">{Icon.definition.title}</span>
              </small>
            </div>
          );
        })}
      </section>

      {months.map((days) => (
        <section className="month" key={days[0]!.getMonth()}>
          <h2>
            {days[0]!.getMonthName()}{' '}
            <span dir="rtl">{days[0]!.renderGematriya(true).split(' ')[1]}</span>
          </h2>
          <div className="grid">
            {DOW.map((d) => (
              <div className="dow" key={d}>
                {d}
              </div>
            ))}
            {Array.from({ length: days[0]!.getDay() }, (_, i) => (
              <div key={`pad${i}`} />
            ))}
            {days.map((hd) => (
              <Day key={hd.abs()} hd={hd} il={il} showErev={showErev} layout={layout} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
