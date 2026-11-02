import type { SvJewKey } from '../core/types';
import { chanukah } from './chanukah';
import { fastDay } from './fastDay';
import { lagBaomer } from './lagBaomer';
import { pesach } from './pesach';
import { purim } from './purim';
import { roshChodesh } from './roshChodesh';
import { roshHashana } from './roshHashana';
import { shabbat } from './shabbat';
import { shavuot } from './shavuot';
import { sigd } from './sigd';
import { simchatTorah } from './simchatTorah';
import { sukkot } from './sukkot';
import { tuBishvat } from './tuBishvat';
import { yomHaatzmaut } from './yomHaatzmaut';
import { yomHashoah } from './yomHashoah';
import { yomHazikaron } from './yomHazikaron';
import { yomKippur } from './yomKippur';
import { yomRabin } from './yomRabin';
import { yomYerushalayim } from './yomYerushalayim';
import type { IconDefinition } from './types';

export type { IconData, IconDefinition, IconPath } from './types';
export { resolveIcon, STROKE_WIDTH, VIEWBOX } from './types';
export { chanukiah } from './chanukah';
export {
  chanukah,
  fastDay,
  lagBaomer,
  pesach,
  purim,
  roshChodesh,
  roshHashana,
  shabbat,
  shavuot,
  sigd,
  simchatTorah,
  sukkot,
  tuBishvat,
  yomHaatzmaut,
  yomHashoah,
  yomHazikaron,
  yomKippur,
  yomRabin,
  yomYerushalayim,
};

/** Icon data for every key. */
export const iconData: Readonly<Record<SvJewKey, IconDefinition>> = {
  shabbat,
  roshHashana,
  yomKippur,
  sukkot,
  simchatTorah,
  chanukah,
  tuBishvat,
  purim,
  pesach,
  lagBaomer,
  shavuot,
  roshChodesh,
  fastDay,
  yomHaatzmaut,
  yomHashoah,
  yomHazikaron,
  yomYerushalayim,
  yomRabin,
  sigd,
};
