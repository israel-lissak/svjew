import { circle, VIEWBOX, type IconDefinition } from './types';

/* @__NO_SIDE_EFFECTS__ */ function perforations(): string {
  const dots: [number, number][] = [
    [12, 13],
    [9.5, 15],
    [14.5, 15],
    [12, 17],
    [9.5, 19],
    [14.5, 19],
  ];
  return dots.map(([x, y]) => circle(x, y, 0.7)).join('');
}

/**
 * A round shmurah matzah in front of a pyramid.
 * The pyramid's lines stop at the matzah's edge, so it reads as standing behind it.
 */
export const pesach: IconDefinition = {
  key: 'pesach',
  viewBox: VIEWBOX,
  title: 'פסח',
  paths: [
    // pyramid: sides and the visible ends of the base (matzah circle spans x 6.08–17.92 at y 15)
    { d: 'M6.08 15H2L12 2.5 22 15h-4.08' },
    // pyramid: front edge, from the apex down to where it meets the matzah
    { d: 'M12 2.5l1.87 7.8' },
    // matzah
    { d: circle(12, 16, 6) },
    { d: perforations(), fill: 'currentColor', stroke: 'none' },
  ],
};
