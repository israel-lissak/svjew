import { circle, VIEWBOX, type IconDefinition } from './types';

/* @__NO_SIDE_EFFECTS__ */ function perforations(): string {
  const rows = [7.5, 12, 16.5];
  return rows.flatMap((y) => rows.map((x) => circle(x, y, 0.7))).join('');
}

/** A square of shmurah-style matzah with perforations. */
export const pesach: IconDefinition = {
  key: 'pesach',
  viewBox: VIEWBOX,
  title: 'פסח',
  paths: [
    {
      d: 'M3.5 4.5c3-.6 5.6.4 8.5-.2s5.6-.2 8.5.2c.4 3 -.4 5.6.1 8.4s.3 5.4-.1 7.1c-3 .4-5.6-.4-8.5.1s-5.6.3-8.5-.1c-.4-2.9.4-5.6-.1-8.4s-.3-5.2.1-7.1z',
    },
    { d: perforations(), fill: 'currentColor', stroke: 'none' },
  ],
};
