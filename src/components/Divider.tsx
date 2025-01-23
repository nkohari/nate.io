import cx from 'classnames';

export type DividerProps = {
  className?: string;
};

export function Divider({ className }: DividerProps) {
  return (
    <hr
      className={cx(
        'border-0 h-px my-12',
        'bg-gradient-to-r from-transparent to-transparent via-divider',
        className,
      )}
    />
  );
}
