import cx from 'classnames';
import * as ICONS from '../icons';

export type IconType = keyof typeof ICONS;

export type IconProps = {
  className?: string;
  type: IconType;
  size?: string | number;
};

export function Icon({ className, type, size = '1em' }: IconProps) {
  const SvgComponent = ICONS[type] as React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  if (!SvgComponent) {
    throw new Error(`Unknown icon with type ${type}`);
  }

  return (
    <SvgComponent
      className={cx('flex-none inline-block fill-current', className)}
      style={{ width: size, height: size }}
    />
  );
}
