import classNames from 'classnames';

export type DividerProps = {
  className?: string;
};

export const Divider = ({ className }: DividerProps) => {
  const classes = classNames(
    'border-0 h-px my-12 bg-gradient-to-r from-transparent to-transparent via-slate-300 dark:via-slate-600',
    className
  );

  return <hr className={classes} />;
};
