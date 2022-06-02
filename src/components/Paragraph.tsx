import React from 'react';
import classNames from 'classnames';

type ParagraphProps = {
  children: React.ReactNode;
};

export const Paragraph = ({ children }: ParagraphProps) => {
  const className = classNames('mb-6');
  return <p className={className}>{children}</p>;
};
