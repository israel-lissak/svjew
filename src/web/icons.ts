import type { SvJewKey } from '../core/types';
import { chanukah } from '../icons/chanukah';
import { fastDay } from '../icons/fastDay';
import { lagBaomer } from '../icons/lagBaomer';
import { pesach } from '../icons/pesach';
import { purim } from '../icons/purim';
import { roshChodesh } from '../icons/roshChodesh';
import { roshHashana } from '../icons/roshHashana';
import { shabbat } from '../icons/shabbat';
import { shavuot } from '../icons/shavuot';
import { simchatTorah } from '../icons/simchatTorah';
import { sukkot } from '../icons/sukkot';
import { tuBishvat } from '../icons/tuBishvat';
import { yomHaatzmaut } from '../icons/yomHaatzmaut';
import { yomKippur } from '../icons/yomKippur';
import { createIcon, type IconComponent } from './createIcon';

// `@__PURE__` lets bundlers drop icons that are never imported.
export const ShabbatIcon = /* @__PURE__ */ createIcon(shabbat, 'ShabbatIcon');
export const RoshHashanaIcon = /* @__PURE__ */ createIcon(roshHashana, 'RoshHashanaIcon');
export const YomKippurIcon = /* @__PURE__ */ createIcon(yomKippur, 'YomKippurIcon');
export const SukkotIcon = /* @__PURE__ */ createIcon(sukkot, 'SukkotIcon');
export const SimchatTorahIcon = /* @__PURE__ */ createIcon(simchatTorah, 'SimchatTorahIcon');
export const ChanukahIcon = /* @__PURE__ */ createIcon(chanukah, 'ChanukahIcon');
export const TuBishvatIcon = /* @__PURE__ */ createIcon(tuBishvat, 'TuBishvatIcon');
export const PurimIcon = /* @__PURE__ */ createIcon(purim, 'PurimIcon');
export const PesachIcon = /* @__PURE__ */ createIcon(pesach, 'PesachIcon');
export const LagBaomerIcon = /* @__PURE__ */ createIcon(lagBaomer, 'LagBaomerIcon');
export const ShavuotIcon = /* @__PURE__ */ createIcon(shavuot, 'ShavuotIcon');
export const RoshChodeshIcon = /* @__PURE__ */ createIcon(roshChodesh, 'RoshChodeshIcon');
export const FastDayIcon = /* @__PURE__ */ createIcon(fastDay, 'FastDayIcon');
export const YomHaatzmautIcon = /* @__PURE__ */ createIcon(yomHaatzmaut, 'YomHaatzmautIcon');

/** React icon component for every key. */
export const SvJewIcons: Readonly<Record<SvJewKey, IconComponent>> = {
  shabbat: ShabbatIcon,
  roshHashana: RoshHashanaIcon,
  yomKippur: YomKippurIcon,
  sukkot: SukkotIcon,
  simchatTorah: SimchatTorahIcon,
  chanukah: ChanukahIcon,
  tuBishvat: TuBishvatIcon,
  purim: PurimIcon,
  pesach: PesachIcon,
  lagBaomer: LagBaomerIcon,
  shavuot: ShavuotIcon,
  roshChodesh: RoshChodeshIcon,
  fastDay: FastDayIcon,
  yomHaatzmaut: YomHaatzmautIcon,
};
