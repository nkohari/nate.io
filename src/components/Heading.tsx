import React from 'react';
import classNames from 'classnames';

export type HeadingProps = {
  className?: string;
  children: React.ReactNode;
  level: number;
};

export const Heading = ({ className, children, level }: HeadingProps) => {
  const tag = `h${level}`;

  const levelClasses: Record<number, string> = {
    1: 'text-3xl font-extrabold',
    2: 'text-2xl font-bold',
    3: 'text-xl font-bold',
    4: 'text-xl',
  };

  const classes = classNames('mb-4', levelClasses[level], className);

  return React.createElement(tag, { className: classes }, children);
};
