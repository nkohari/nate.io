import cx from 'classnames';

type ParagraphProps = {
  children: React.ReactNode;
  id: string;
};

export const Paragraph = ({children, id}: ParagraphProps) => {
  return (
    <p id={id} className={cx('mb-6')}>
      {children}
    </p>
  );
};
