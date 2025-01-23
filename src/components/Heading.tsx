import cx from 'classnames';
import React from 'react';

export type HeadingProps = {
  className?: string;
  children: React.ReactNode;
  id: string;
  level: number;
};

export function Heading({ className, children, id, level }: HeadingProps) {
  const tag = `h${level}`;

  const levelClasses: Record<number, string> = {
    1: 'text-4xl font-bold',
    2: 'text-3xl font-medium',
    3: 'text-xl font-semibold',
    4: 'text-xl',
  };

  const props = {
    className: cx('leading-loose mb-2', levelClasses[level], className),
    id,
  };

  return React.createElement(tag, props, children);
}
