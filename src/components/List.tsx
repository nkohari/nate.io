import cx from 'classnames';

export type ListProps = {
  children: React.ReactNode;
  compact?: boolean;
  className?: string;
  ordered?: boolean;
};

export function List({ children, compact = false, className, ordered = false }: ListProps) {
  const Component = ordered ? 'ol' : 'ul';
  const classes = cx(
    'ml-6 mb-6 list-outside',
    ordered ? 'list-decimal' : 'list-disc',
    compact ? 'space-y-0' : 'space-y-4',
    className,
  );

  return <Component className={classes}>{children}</Component>;
}
