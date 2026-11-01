import { Fragment, type CSSProperties, type ReactElement, type ReactNode } from 'react';
import type { SvJewMatch, SvJewOptions } from '../core/types';
import { resolveIcon } from '../icons/types';
import type { IconComponent } from './createIcon';
import { SvJewIcons } from './icons';
import { useSvJew } from './useSvJew';

export interface SvJewProps extends SvJewOptions {
  /** Icon size. Default 24. */
  size?: number | string;
  /** Icon color. Default `'currentColor'`. */
  color?: string;
  /** `row` (default), `column`, or `stack` (overlapping, RTL-safe). */
  layout?: 'row' | 'column' | 'stack';
  /** Space between icons for `row`/`column`. Default 4. */
  gap?: number | string;
  /** Custom rendering per match. Receives the match and its icon component. */
  renderItem?: (match: SvJewMatch, Icon: IconComponent) => ReactNode;
  /** Rendered when there are no matches. Default `null` (no wrapper is rendered). */
  fallback?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const css = (v: number | string) => (typeof v === 'number' ? `${v}px` : v);

/** Renders an icon for every Jewish holiday / special day that falls on the given date. */
export function SvJew({
  size = 24,
  color = 'currentColor',
  layout = 'row',
  gap = 4,
  renderItem,
  fallback = null,
  className,
  style,
  ...options
}: SvJewProps): ReactElement {
  const matches = useSvJew(options);
  if (!matches.length) return <>{fallback}</>;

  const label = matches
    .map((m) => resolveIcon(SvJewIcons[m.key].definition, m.meta).title)
    .join(', ');
  const stack = layout === 'stack';
  // Overlap by 40% of the icon size. marginInlineStart keeps this correct in RTL.
  const overlap = typeof size === 'number' ? `${-size * 0.4}px` : `calc(${size} * -0.4)`;

  return (
    <span
      role="img"
      aria-label={label}
      className={className}
      data-svjew-layout={layout}
      style={{
        display: 'inline-flex',
        flexDirection: layout === 'column' ? 'column' : 'row',
        alignItems: 'center',
        gap: stack ? undefined : css(gap),
        lineHeight: 0,
        ...style,
      }}
    >
      {matches.map((m, i) => {
        const Icon = SvJewIcons[m.key];
        if (renderItem) return <Fragment key={m.key}>{renderItem(m, Icon)}</Fragment>;
        return (
          <Icon
            key={m.key}
            size={size}
            color={color}
            meta={m.meta}
            aria-hidden
            style={stack && i > 0 ? { marginInlineStart: overlap } : undefined}
          />
        );
      })}
    </span>
  );
}
