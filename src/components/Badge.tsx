import cx from 'classnames';
import { Icon, IconType } from 'src/components';

export type BadgeProps = {
  className?: string;
  icon?: IconType;
  text: string;
};

export function Badge({ className, icon, text }: BadgeProps) {
  let iconElement: React.ReactNode;

  if (icon) {
    iconElement = <Icon type={icon} size="medium" />;
  }

  return (
    <div
      className={cx(
        'inline-flex flex-row items-center gap-1',
        'px-2 py-0.5 rounded-full bg-background-alt',
        'capitalize text-xs text-secondary',
        className,
      )}
    >
      {iconElement}
      <span>{text}</span>
    </div>
  );
}
