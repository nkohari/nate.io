import cx from 'classnames';
import * as ICONS from '../icons';

const SIZE_CLASSES = {
  default: 'w-[1em]',
  small: 'w-3',
  medium: 'w-4',
  large: 'w-8',
};

export type IconType = keyof typeof ICONS;
export type IconSize = 'default' | 'small' | 'medium' | 'large';

export type IconProps = {
  className?: string;
  type: IconType;
  size?: IconSize;
};

export const Icon = ({className, type, size = 'default'}: IconProps) => {
  const SvgComponent = ICONS[type] as React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  if (!SvgComponent) {
    throw new Error(`Unknown icon with type ${type}`);
  }

  return (
    <SvgComponent className={cx('inline-block fill-current', SIZE_CLASSES[size], className)} />
  );
};
