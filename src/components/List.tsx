import classNames from 'classnames';

export type ListProps = {
  children: React.ReactNode;
  className?: string;
  ordered?: boolean;
};

export const List = ({ children, className, ordered }: ListProps) => {
  const Component = ordered ? 'ol' : 'ul';
  const classes = classNames(
    'ml-6 mb-6 list-outside',
    ordered ? 'list-decimal' : 'list-disc',
    className
  );

  return <Component className={classes}>{children}</Component>;
};
