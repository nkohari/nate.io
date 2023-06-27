import cx from 'classnames';
import {Icon, IconType} from 'src/components';

export type BadgeProps = {
  className?: string;
  icon?: IconType;
  text: string;
};

export const Badge = ({className, icon, text}: BadgeProps) => {
  let iconElement;
  if (icon) {
    iconElement = <Icon type={icon} size="medium" />;
  }

  return (
    <div
      className={cx(
        'inline-flex flex-row items-center',
        'px-2 rounded-full bg-slate-200 dark:bg-slate-600',
        'capitalize font-semibold text-sm text-slate-600 dark:text-slate-300',
        className
      )}
    >
      {iconElement}
      <span className="ml-0.5">{text}</span>
    </div>
  );
};
