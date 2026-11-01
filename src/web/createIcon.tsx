import type { CSSProperties, ReactElement, SVGProps } from 'react';
import type { SvJewMeta } from '../core/types';
import { resolveIcon, STROKE_WIDTH, type IconDefinition } from '../icons/types';

export interface SvJewIconProps extends Omit<SVGProps<SVGSVGElement>, 'ref' | 'children'> {
  /** Width and height. Default 24. */
  size?: number | string;
  /** Any CSS color. Default `'currentColor'` (inherits text color). */
  color?: string;
  /** Match meta, e.g. `{ night: 3 }` for the chanukiah. */
  meta?: SvJewMeta;
  /** Override the Hebrew `<title>`. */
  title?: string;
}

export type IconComponent = ((props: SvJewIconProps) => ReactElement) & {
  displayName?: string;
  definition: IconDefinition;
};

/** Build a React DOM component from renderer-agnostic icon data. */
export function createIcon(def: IconDefinition, displayName?: string): IconComponent {
  const Icon = ({
    size = 24,
    color = 'currentColor',
    meta,
    title,
    style,
    ...rest
  }: SvJewIconProps): ReactElement => {
    const data = resolveIcon(def, meta);
    const svgStyle: CSSProperties | undefined =
      color === 'currentColor' ? style : { color, ...style };
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={data.viewBox}
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        role="img"
        focusable="false"
        data-svjew-key={def.key}
        style={svgStyle}
        {...rest}
      >
        <title>{title ?? data.title}</title>
        {data.paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill={p.fill}
            stroke={p.stroke}
            strokeWidth={p.strokeWidth}
            opacity={p.opacity}
          />
        ))}
      </svg>
    );
  };
  return Object.assign(Icon, { displayName: displayName ?? `${def.key}Icon`, definition: def });
}
