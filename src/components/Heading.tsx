import React from 'react';
import cx from 'classnames';

export type HeadingProps = {
  className?: string;
  children: React.ReactNode;
  id: string;
  level: number;
};

export function Heading({ className, children, id, level }: HeadingProps) {
  const tag = `h${level}`;

  const levelClasses: Record<number, string> = {
    1: 'text-3xl font-extrabold',
    2: 'text-2xl font-bold',
    3: 'text-xl font-bold',
    4: 'text-xl',
  };

  const props = {
    className: cx('leading-loose mb-2', levelClasses[level], className),
    id,
  };

  return React.createElement(tag, props, children);
}
