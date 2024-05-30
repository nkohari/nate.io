import cx from 'classnames';
import { Icon } from 'src/components';

export type CalloutType = 'info' | 'warning';

const TYPE_CLASSES: Record<CalloutType, string> = {
  info: cx(
    'bg-sky-100 dark:bg-slate-300 border-sky-200 dark:border-slate-500',
    'text-sky-700 dark:text-slate-600',
  ),
  warning: cx(
    'bg-red-100 dark:bg-red-200 border-red-300 dark:border-red-700',
    'text-red-800 dark:text-red-900',
  ),
};

export type CalloutProps = {
  children: React.ReactNode;
  className?: string;
  type: CalloutType;
};

export function Callout({ children, className, type }: CalloutProps) {
  return (
    <div
      role="alert"
      className={cx(
        'flex justify-begin',
        'p-4 mb-6 rounded-md border-b-2',
        'text-base leading-normal',
        TYPE_CLASSES[type],
        className,
      )}
    >
      <div className="flex flex-col flex-none pt-1 mr-4">
        <Icon type={type} />
      </div>
      <div>{children}</div>
    </div>
  );
}
