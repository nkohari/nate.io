import classNames from 'classnames';

export type GroupOrientation = 'horizontal' | 'vertical';

export type GroupProps = {
  children: React.ReactNode;
  orientation?: GroupOrientation;
  spacing?: number;
};

export const Group = ({ children, orientation = 'horizontal', spacing = 0 }: GroupProps) => {
  const className = classNames('flex', {
    'flex-col': orientation === 'vertical',
    [`space-x-${spacing}`]: spacing > 0 && orientation === 'horizontal',
    [`space-y-${spacing}`]: spacing > 0 && orientation === 'vertical',
  });

  return <div className={className}>{children}</div>;
};
