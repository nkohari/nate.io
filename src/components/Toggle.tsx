import {Switch} from '@headlessui/react';
import cx from 'classnames';

export type ToggleProps = {
  active: boolean;
  className?: string;
  label: React.ReactNode;
  onChange: (value: boolean) => unknown;
};

export const Toggle = ({active, className, label, onChange}: ToggleProps) => {
  const containerClasses = cx(
    'inline-flex items-center',
    'h-4 w-8 rounded-full cursor-pointer',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
    'transition-colors ease-in-out',
    active ? 'bg-blue-600 dark:bg-blue-600' : 'bg-slate-300 dark:bg-slate-600',
  );

  const innerClasses = cx(
    'block h-4 w-4 bg-white border-2 rounded-full pointer-events-none',
    'transform transition-all ease-in-out',
    active
      ? 'translate-x-4 border-blue-600'
      : 'translate-x-0 dark:bg-slate-300 border-slate-300 dark:border-slate-600',
  );

  return (
    <Switch.Group>
      <div className={cx('flex items-center', className)}>
        <Switch checked={active} onChange={onChange} className={containerClasses}>
          <span aria-hidden="true" className={innerClasses} />
        </Switch>
        <Switch.Label className="ml-2 cursor-pointer">{label}</Switch.Label>
      </div>
    </Switch.Group>
  );
};
