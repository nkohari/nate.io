import { Switch } from '@headlessui/react';
import classNames from 'classnames';

export type ToggleProps = {
  active: boolean;
  className?: string;
  label: React.ReactNode;
  onChange: (value: boolean) => unknown;
};

export const Toggle = ({ active, className, label, onChange }: ToggleProps) => {
  const wrapperClasses = classNames(className, 'flex items-center');

  const containerClasses = classNames(
    'inline-flex items-center cursor-pointer rounded-full h-4 w-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition-colors ease-in-out',
    active ? 'bg-blue-600 dark:bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
  );

  const innerClasses = classNames(
    'pointer-events-none block h-4 w-4 bg-white border-2 rounded-full transform transition-all ease-in-out',
    active
      ? 'translate-x-4 border-blue-600'
      : 'translate-x-0 dark:bg-slate-300 border-slate-300 dark:border-slate-600'
  );

  return (
    <Switch.Group>
      <div className={wrapperClasses}>
        <Switch checked={active} onChange={onChange} className={containerClasses}>
          <span aria-hidden="true" className={innerClasses} />
        </Switch>
        <Switch.Label className="ml-2 cursor-pointer">{label}</Switch.Label>
      </div>
    </Switch.Group>
  );
};
