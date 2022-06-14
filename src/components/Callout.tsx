import classNames from 'classnames';
import { Icon } from 'src/components';

export type CalloutType = 'info' | 'warning';

const TYPE_CLASSES: Record<CalloutType, string> = {
  info: 'bg-sky-100 border-sky-200 text-sky-700 dark:bg-slate-300 dark:border-slate-500 dark:text-slate-600',
  warning:
    'bg-red-100 border-red-300 text-red-800 dark:bg-red-200 dark:border-red-700 dark:text-red-900',
};

export type CalloutProps = {
  type: CalloutType;
  children: React.ReactNode;
};

export const Callout = ({ children, type }: CalloutProps) => {
  const classes = classNames(
    'flex justify-begin text-base leading-normal rounded-md border-b-2 p-4 mb-6',
    TYPE_CLASSES[type]
  );

  return (
    <div className={classes} role="alert">
      <div className="mr-4">
        <Icon type={type} />
      </div>
      <div>{children}</div>
    </div>
  );
};
