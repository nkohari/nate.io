import classNames from 'classnames';
import * as ICONS from 'src/components/icons';

export type IconType = keyof typeof ICONS;
export type IconSize = 'small' | 'medium' | 'large';

export type IconProps = {
  className?: string;
  type: IconType;
  size?: IconSize;
};

export const Icon = ({ className, type, size = 'medium' }: IconProps) => {
  const SvgComponent = ICONS[type] as React.FunctionComponent;

  if (!SvgComponent) {
    throw new Error(`Unknown icon with type ${type}`);
  }

  const sizeClasses = {
    small: 'w-3',
    medium: 'w-4',
    large: 'w-8',
  };

  const classes = classNames('inline-block fill-current', className, sizeClasses[size]);

  return (
    <span className={classes}>
      <SvgComponent />
    </span>
  );
};
