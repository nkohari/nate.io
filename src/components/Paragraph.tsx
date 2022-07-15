import React from 'react';
import classNames from 'classnames';

type ParagraphProps = {
  children: React.ReactNode;
  id: string;
};

export const Paragraph = ({ children, id }: ParagraphProps) => {
  const className = classNames('mb-6');
  return (
    <p id={id} className={className}>
      {children}
    </p>
  );
};
