import classNames from 'classnames';
import { Icon, IconType } from 'src/components';

export type BadgeProps = {
  className?: string;
  icon?: IconType;
  text: string;
};

export const Badge = ({ className, icon, text }: BadgeProps) => {
  const classes = classNames(
    'inline-flex flex-row items-center capitalize text-sm font-semibold rounded-full px-2 text-slate-600 bg-slate-200 dark:text-slate-300 dark:bg-slate-600',
    className
  );

  let iconElement;
  if (icon) {
    iconElement = <Icon type={icon} size="medium" />;
  }

  return (
    <div className={classes}>
      {iconElement}
      <span className="ml-0.5">{text}</span>
    </div>
  );
};
