import { render, renderHook, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  ChanukahIcon,
  iconData,
  ShabbatIcon,
  SVJEW_KEYS,
  SvJew,
  SvJewIcons,
  useSvJew,
} from '../src';
import { findDay, HDate, isSaturday, months } from './helpers';

const { CHESHVAN, KISLEV, TISHREI } = months;

const ordinary = findDay(new HDate(8, CHESHVAN, 5787), 10, (d) => !isSaturday(d));
const chanukahStart = new HDate(25, KISLEV, 5787);
// Shabbat during Chanukah that isn't Rosh Chodesh → [chanukah, shabbat]
const shabbatChanukah = findDay(
  chanukahStart,
  8,
  (d) => isSaturday(d) && d.getDate() > 1 && d.getDate() < 30,
);
const night = shabbatChanukah.deltaDays(chanukahStart) + 1;
const ORD = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שביעי', 'שמיני'];

describe('<SvJew />', () => {
  it('renders nothing on an ordinary weekday', () => {
    const { container } = render(<SvJew date={ordinary.greg()} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders the fallback (and no wrapper) when there are no matches', () => {
    const { container } = render(<SvJew date={ordinary} fallback={<em>—</em>} />);
    expect(container.innerHTML).toBe('<em>—</em>');
  });

  it('renders all matches in priority order with a combined Hebrew aria-label', () => {
    render(<SvJew date={shabbatChanukah.greg()} />);
    const wrapper = screen.getByRole('img', { name: `חנוכה – נר ${ORD[night - 1]}, שבת` });
    expect(wrapper.tagName).toBe('SPAN');
    expect(wrapper.style.display).toBe('inline-flex');
    const svgs = wrapper.querySelectorAll('svg');
    expect([...svgs].map((s) => s.getAttribute('data-svjew-key'))).toEqual(['chanukah', 'shabbat']);
    expect(svgs[0]!.querySelector('title')?.textContent).toBe(`חנוכה – נר ${ORD[night - 1]}`);
    expect(svgs[1]!.querySelector('title')?.textContent).toBe('שבת');
    // inner icons are hidden from AT; the wrapper carries the label
    expect(svgs[0]!.getAttribute('aria-hidden')).toBe('true');
  });

  it('applies size, color and gap', () => {
    const { container } = render(<SvJew date={shabbatChanukah} size={40} color="red" gap={10} />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.gap).toBe('10px');
    const svg = wrapper.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('40');
    expect(svg.style.color).toBe('red');
    expect(svg.getAttribute('stroke')).toBe('currentColor');
  });

  it('column layout', () => {
    const { container } = render(<SvJew date={shabbatChanukah} layout="column" />);
    expect((container.firstElementChild as HTMLElement).style.flexDirection).toBe('column');
  });

  it('stack layout overlaps with marginInlineStart (RTL-safe), never marginLeft', () => {
    const { container } = render(<SvJew date={shabbatChanukah} layout="stack" size={20} />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs[0]!.style.marginInlineStart).toBe('');
    expect(svgs[1]!.style.marginInlineStart).toBe('-8px');
    expect(svgs[1]!.style.marginLeft).toBe('');
    expect((container.firstElementChild as HTMLElement).style.gap).toBe('');
  });

  it('renderItem overrides default rendering', () => {
    render(
      <SvJew
        date={shabbatChanukah}
        renderItem={(m, Icon) => (
          <b data-testid={`item-${m.key}`}>
            <Icon size={12} meta={m.meta} />
          </b>
        )}
      />,
    );
    expect(screen.getByTestId('item-chanukah').querySelector('svg')).not.toBeNull();
    expect(screen.getByTestId('item-shabbat').querySelector('svg')?.getAttribute('width')).toBe(
      '12',
    );
  });

  it('passes options through (exclude, max, il)', () => {
    const { container, rerender } = render(<SvJew date={shabbatChanukah} exclude={['shabbat']} />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
    rerender(<SvJew date={shabbatChanukah} max={1} priority={['shabbat']} />);
    expect(container.querySelector('svg')?.getAttribute('data-svjew-key')).toBe('shabbat');
    const d23 = new HDate(23, TISHREI, 5787);
    rerender(<SvJew date={d23} il={false} />);
    expect(container.querySelector('[data-svjew-key="simchatTorah"]')).not.toBeNull();
  });

  it('prefixes Erev titles with ערב', () => {
    render(<SvJew date={new HDate(9, TISHREI, 5786)} showErev />);
    expect(screen.getByRole('img', { name: 'ערב יום כיפור' })).toBeTruthy();
  });
});

describe('icon components', () => {
  it('every key has an icon with a Hebrew title on a 24×24 viewBox', () => {
    for (const key of SVJEW_KEYS) {
      const def = iconData[key];
      expect(def.key).toBe(key);
      expect(def.viewBox).toBe('0 0 24 24');
      expect(def.title).toMatch(/[֐-׿]/);
      expect(def.paths.length).toBeGreaterThan(0);
      expect(SvJewIcons[key].definition).toBe(def);
    }
  });

  it('standalone icon is an accessible img with its title', () => {
    render(<ShabbatIcon />);
    const svg = screen.getByRole('img', { name: 'שבת' });
    expect(svg.getAttribute('width')).toBe('24');
    expect(svg.getAttribute('viewBox')).toBe('0 0 24 24');
  });

  it.each([1, 2, 3, 4, 5, 6, 7, 8])(
    'chanukiah night %i lights that many candles + shamash',
    (n) => {
      const { container } = render(<ChanukahIcon meta={{ night: n }} />);
      const flames = container.querySelectorAll('path[fill="currentColor"]');
      expect(flames).toHaveLength(n + 1);
      expect(container.querySelector('title')?.textContent).toBe(`חנוכה – נר ${ORD[n - 1]}`);
    },
  );

  it('allows overriding the title and passing SVG props', () => {
    render(<ShabbatIcon title="Shabbat" className="x" />);
    expect(screen.getByRole('img', { name: 'Shabbat' }).getAttribute('class')).toBe('x');
  });
});

describe('useSvJew', () => {
  it('returns matches and memoizes across renders with inline option objects', () => {
    const date = shabbatChanukah.greg();
    const { result, rerender } = renderHook(() =>
      useSvJew({ date, exclude: ['purim'], priority: ['shabbat'] }),
    );
    const first = result.current;
    expect(first.map((m) => m.key)).toEqual(['shabbat', 'chanukah']);
    rerender();
    expect(result.current).toBe(first);
  });

  it('recomputes when options change', () => {
    const { result, rerender } = renderHook(
      (p: { il: boolean }) => useSvJew({ date: new HDate(23, TISHREI, 5787), il: p.il }),
      { initialProps: { il: true } },
    );
    expect(result.current).toEqual([]);
    rerender({ il: false });
    expect(result.current.map((m) => m.key)).toEqual(['simchatTorah']);
  });
});
